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
const CACHE_TTL_MS = 2 * 60 * 1000; // 2 min

// Tracker is "active" if latest fix is within this window
const ACTIVE_THRESHOLD_MS = 48 * 60 * 60 * 1000; // 48 hours (updates once/day)

// Only show trackers within Slovenia
const SLOVENIA_BOUNDS = {
  minLat: 45.42, maxLat: 46.88,
  minLon: 13.38, maxLon: 16.61,
};

// ── Launch-day config (6.3.2026) ──────────────────────────────────────
// Only show these two trackers for the Soča launch
const LAUNCH_TRACKERS = new Set([
  "863738070365391", // Medusa
  "863738070405031", // Proxima
]);

// Ignore all GPS fixes recorded before this moment (test data)
const DATA_CUTOFF = new Date("2026-03-06T10:00:00Z").getTime(); // 11:00 CET

// Before this time: force inactive (gray). After: normal 48h threshold.
const ACTIVATION_TIME = new Date("2026-03-06T10:15:00Z").getTime(); // 11:15 CET

// Seed "drop" positions – left bank at sotočje Tolminke in Soče
const SEED_POSITIONS: Record<string, { lat: number; lon: number; timestamp: string }> = {
  "863738070365391": { lat: 46.173556, lon: 13.740111, timestamp: "2026-03-06T10:15:00Z" }, // Medusa  (46°10'24.8"N 13°44'24.4"E)
  "863738070405031": { lat: 46.173500, lon: 13.740139, timestamp: "2026-03-06T10:15:00Z" }, // Proxima (46°10'24.6"N 13°44'24.5"E)
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

    // Launch-day: only Medusa & Proxima
    if (!LAUNCH_TRACKERS.has(tid)) continue;

    // Skip test data recorded before launch
    if (new Date(p.timestamp).getTime() < DATA_CUTOFF) continue;

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

  // Ensure launch trackers appear even when WFS has no post-cutoff data yet
  for (const tid of LAUNCH_TRACKERS) {
    if (!groups.has(tid)) {
      groups.set(tid, []);
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

    // Prepend seed "drop" position so the starting point is always visible
    const seed = SEED_POSITIONS[tracker_id];
    if (seed) {
      positions.unshift({
        lat: seed.lat,
        lon: seed.lon,
        speed: 0,
        angle: 0,
        timestamp: seed.timestamp,
      });
    }

    if (positions.length === 0) continue;

    const latest = positions[positions.length - 1];
    const age = now - new Date(latest.timestamp).getTime();

    trackers.push({
      tracker_id,
      name: TRACKER_NAMES[tracker_id] || `Tracker ${tracker_id.slice(-4)}`,
      latest,
      path: positions,
      status: now < ACTIVATION_TIME
        ? "inactive"
        : age <= ACTIVE_THRESHOLD_MS ? "active" : "inactive",
    });
  }

  return trackers;
}

export async function GET() {
  // Return cached data if fresh
  if (cache && Date.now() < cache.expires) {
    return NextResponse.json(cache.data, {
      headers: {
        "Cache-Control": "public, s-maxage=120, stale-while-revalidate=30",
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
        "Cache-Control": "public, s-maxage=120, stale-while-revalidate=30",
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
          headers: { "Cache-Control": "public, s-maxage=120" },
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
