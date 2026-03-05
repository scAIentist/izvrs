import { NextResponse } from "next/server";
import type {
  WFSFeatureCollection,
  LiveTracker,
  TrackerPosition,
  TrackersAPIResponse,
} from "@/lib/wfs-types";

const WFS_BASE_URL = process.env.WFS_BASE_URL!;
const WFS_AUTH_TOKEN = process.env.WFS_AUTH_TOKEN!;

// In-memory cache (persists across requests within the same serverless instance)
let cache: { data: TrackersAPIResponse; expires: number } | null = null;
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

// Tracker is "active" if latest fix is within this window
const ACTIVE_THRESHOLD_MS = 48 * 60 * 60 * 1000; // 48 hours (updates once/day)

// Only show trackers within Slovenia
const SLOVENIA_BOUNDS = {
  minLat: 45.42, maxLat: 46.88,
  minLon: 13.38, maxLon: 16.61,
};

// IMEI → tracker name (matches drawing filenames in /zmag/)
const TRACKER_NAMES: Record<string, string> = {
  "863738070300455": "Rosalind",
  "863738070353835": "Herse",
  "863738070357695": "Euporie",
  "863738070358222": "Helike",
  "863738070362372": "Orthosie",
  "863738070362752": "Sunflower",
  "863738070365391": "Medusa",
  "863738070403994": "Metone",
  "863738070405007": "Thyone",
  "863738070405031": "Proxima",
  "863738070408605": "Cyllene",
  "863738070408811": "Chiron",
};

function buildWFSUrl(): string {
  const params = new URLSearchParams({
    SERVICE: "WFS",
    VERSION: "1.0.0",
    REQUEST: "GetFeature",
    TYPENAME: "adrion_locations",
    OUTPUTFORMAT: "GeoJSON",
  });
  return `${WFS_BASE_URL}?repository=adrion&project=adrion&${params.toString()}`;
}

function processFeatures(fc: WFSFeatureCollection): LiveTracker[] {
  const groups = new Map<string, TrackerPosition[]>();

  for (const feature of fc.features) {
    const p = feature.properties;

    // Skip points outside Slovenia
    if (
      p.lat < SLOVENIA_BOUNDS.minLat || p.lat > SLOVENIA_BOUNDS.maxLat ||
      p.lon < SLOVENIA_BOUNDS.minLon || p.lon > SLOVENIA_BOUNDS.maxLon
    ) continue;

    const tid = String(p.tracker_id);

    // Only show known/named trackers
    if (!TRACKER_NAMES[tid]) continue;
    const pos: TrackerPosition = {
      lat: p.lat,
      lon: p.lon,
      speed: p.speed,
      angle: p.angle,
      timestamp: p.timestamp,
    };

    const existing = groups.get(tid);
    if (existing) {
      existing.push(pos);
    } else {
      groups.set(tid, [pos]);
    }
  }

  const now = Date.now();
  const trackers: LiveTracker[] = [];

  for (const [tracker_id, positions] of groups) {
    // Sort chronologically (oldest first)
    positions.sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    const latest = positions[positions.length - 1];
    const age = now - new Date(latest.timestamp).getTime();

    trackers.push({
      tracker_id,
      name: TRACKER_NAMES[tracker_id] || `Tracker ${tracker_id.slice(-4)}`,
      latest,
      path: positions,
      status: age <= ACTIVE_THRESHOLD_MS ? "active" : "inactive",
    });
  }

  return trackers;
}

export async function GET() {
  // Return cached data if fresh
  if (cache && Date.now() < cache.expires) {
    return NextResponse.json(cache.data, {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
      },
    });
  }

  try {
    const url = buildWFSUrl();
    const response = await fetch(url, {
      headers: {
        Authorization: `Basic ${WFS_AUTH_TOKEN}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `WFS responded with ${response.status}: ${response.statusText}`
      );
    }

    const fc: WFSFeatureCollection = await response.json();
    const trackers = processFeatures(fc);

    const result: TrackersAPIResponse = {
      trackers,
      fetchedAt: new Date().toISOString(),
      source: "live",
    };

    // Update in-memory cache
    cache = { data: result, expires: Date.now() + CACHE_TTL_MS };

    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
      },
    });
  } catch (error) {
    console.error("[WFS Proxy] Fetch failed:", error);

    // Return stale cache if available
    if (cache) {
      return NextResponse.json(
        { ...cache.data, source: "cache" as const },
        {
          status: 200,
          headers: { "Cache-Control": "public, s-maxage=3600" },
        }
      );
    }

    // No cache: return error
    return NextResponse.json(
      {
        error: "WFS service unavailable",
        trackers: [],
        fetchedAt: new Date().toISOString(),
        source: "fallback",
      },
      { status: 503 }
    );
  }
}
