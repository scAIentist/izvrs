"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useTrackers } from "@/lib/useTrackers";
import { useTranslation } from "@/i18n";
import type { LiveTracker } from "@/lib/wfs-types";

// Tracker names that have drawing files in /zmag/
const KNOWN_DRAWINGS = new Set([
  "Rosalind", "Herse", "Euporie", "Helike", "Orthosie", "Sunflower",
  "Medusa", "Metone", "Thyone", "Proxima", "Cyllene", "Chiron",
]);

const statusColors: Record<string, string> = {
  active: "#27AE60",
  inactive: "#888888",
};

// Rotating palette for tracker path polylines
const PATH_COLORS = [
  "#2AABE0",
  "#E67E22",
  "#9B59B6",
  "#1ABC9C",
  "#E74C3C",
  "#3498DB",
];

function createIcon(tracker: LiveTracker, index: number) {
  return L.divIcon({
    className: "custom-tracker-marker",
    html: `<div style="
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: ${statusColors[tracker.status]};
      border: 3px solid white;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 11px;
      font-weight: 700;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    ">${index + 1}</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -20],
  });
}

function createGroupIcon(count: number) {
  return L.divIcon({
    className: "custom-tracker-marker",
    html: `<div style="
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #2AABE0;
      border: 3px solid white;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 14px;
      font-weight: 700;
      box-shadow: 0 2px 10px rgba(0,0,0,0.35);
    ">${count}</div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -24],
  });
}

/** Haversine distance in metres (good enough for short ranges) */
function distanceMetres(
  a: { lat: number; lon: number },
  b: { lat: number; lon: number }
) {
  const R = 6_371_000;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLon = ((b.lon - a.lon) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
}

/** Group trackers whose latest positions are within `threshold` metres */
function groupNearby(trackers: LiveTracker[], threshold = 500) {
  const used = new Set<number>();
  const groups: LiveTracker[][] = [];

  for (let i = 0; i < trackers.length; i++) {
    if (used.has(i)) continue;
    const group = [trackers[i]];
    used.add(i);
    for (let j = i + 1; j < trackers.length; j++) {
      if (used.has(j)) continue;
      if (
        distanceMetres(trackers[i].latest, trackers[j].latest) < threshold
      ) {
        group.push(trackers[j]);
        used.add(j);
      }
    }
    groups.push(group);
  }
  return groups;
}

/** Auto-fit map bounds to all tracker path points */
function FitBounds({ trackers }: { trackers: LiveTracker[] }) {
  const map = useMap();

  useEffect(() => {
    if (trackers.length === 0) return;

    const allPoints: [number, number][] = [];
    for (const t of trackers) {
      for (const p of t.path) {
        allPoints.push([p.lat, p.lon]);
      }
    }
    if (allPoints.length === 0) return;

    const bounds = L.latLngBounds(allPoints);
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
  }, [map, trackers]);

  return null;
}

function formatTimestamp(iso: string): string {
  try {
    return new Date(iso).toLocaleString("sl-SI", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export default function MapContent() {
  const { t } = useTranslation();
  const { trackers, loading, error, fetchedAt, source } = useTrackers();
  const [selectedDrawing, setSelectedDrawing] = useState<{ name: string; src: string } | null>(null);

  const closeDrawing = useCallback(() => setSelectedDrawing(null), []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawing();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [closeDrawing]);

  useEffect(() => {
    delete (
      L.Icon.Default.prototype as unknown as Record<string, unknown>
    )._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
      iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    });
  }, []);

  // Build polyline positions per tracker
  const trackerPaths = useMemo(() => {
    return trackers.map((tr) =>
      tr.path.map((p) => [p.lat, p.lon] as [number, number])
    );
  }, [trackers]);

  // Group nearby trackers so overlapping ones get a combined popup
  const trackerGroups = useMemo(() => groupNearby(trackers), [trackers]);

  const statusLabels: Record<string, string> = {
    active: t.trackers.active,
    inactive: t.trackers.inactive,
  };

  if (loading) {
    return (
      <div className="h-[500px] rounded-xl bg-slate-dark/50 flex items-center justify-center">
        <span className="text-white/50 text-sm">{t.trackers.loadingMap}</span>
      </div>
    );
  }

  if (error && trackers.length === 0) {
    return (
      <div className="h-[500px] rounded-xl bg-slate-dark/50 flex items-center justify-center">
        <span className="text-white/50 text-sm">{error}</span>
      </div>
    );
  }

  // Default center: Soča river area
  const defaultCenter: [number, number] = [46.2, 13.65];

  /** Render popup content for a single tracker */
  const renderTrackerCard = (tracker: LiveTracker, compact = false) => (
    <div
      key={tracker.tracker_id}
      style={compact ? { marginBottom: "10px", paddingBottom: "10px", borderBottom: "1px solid #eee" } : {}}
    >
      <h3
        style={{
          margin: "0 0 8px",
          fontSize: compact ? "14px" : "16px",
          fontWeight: 700,
        }}
      >
        {tracker.name}
      </h3>

      {/* Winner's drawing */}
      {KNOWN_DRAWINGS.has(tracker.name) && (
        <div
          onClick={() =>
            setSelectedDrawing({
              name: tracker.name,
              src: `/zmag/${tracker.name.toUpperCase()}.webp`,
            })
          }
          style={{ display: "block", marginBottom: "8px", cursor: "pointer" }}
        >
          <img
            src={`/zmag/${tracker.name.toUpperCase()}.webp`}
            alt={`Risba – ${tracker.name}`}
            style={{
              width: "100%",
              borderRadius: "8px",
              border: "1px solid #eee",
            }}
          />
        </div>
      )}

      <p style={{ margin: "0 0 4px", fontSize: "12px", color: "#666" }}>
        <strong>{t.trackers.updated}</strong>{" "}
        {formatTimestamp(tracker.latest.timestamp)}
      </p>
      <p style={{ margin: "0 0 4px", fontSize: "12px", color: "#666" }}>
        <strong>{t.trackers.inWater}</strong>{" "}
        {(() => {
          const first = new Date(tracker.path[0].timestamp);
          const now = new Date();
          const days = Math.max(
            0,
            Math.floor(
              (now.getTime() - first.getTime()) / (1000 * 60 * 60 * 24)
            )
          );
          return `${days} ${days === 1 ? t.trackers.day : t.trackers.days}`;
        })()}
      </p>
      <div
        style={{
          marginTop: "6px",
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          padding: "2px 8px",
          borderRadius: "12px",
          fontSize: "11px",
          fontWeight: 600,
          background: statusColors[tracker.status] + "20",
          color: statusColors[tracker.status],
        }}
      >
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: statusColors[tracker.status],
          }}
        />
        {statusLabels[tracker.status]}
      </div>
    </div>
  );

  return (
    <>
      <MapContainer
        center={
          trackers.length > 0
            ? [trackers[0].latest.lat, trackers[0].latest.lon]
            : defaultCenter
        }
        zoom={10}
        scrollWheelZoom={false}
        style={{ height: "500px", width: "100%", borderRadius: "12px" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitBounds trackers={trackers} />

        {/* Polylines for tracker paths */}
        {trackerPaths.map(
          (positions, i) =>
            positions.length > 1 && (
              <Polyline
                key={`path-${trackers[i].tracker_id}`}
                positions={positions}
                pathOptions={{
                  color: PATH_COLORS[i % PATH_COLORS.length],
                  weight: 3,
                  opacity: 0.6,
                  dashArray: "8 4",
                }}
              />
            )
        )}

        {/* Markers — grouped when nearby, individual when far apart */}
        {trackerGroups.map((group) => {
          if (group.length === 1) {
            // ── Single tracker → normal marker ──
            const tracker = group[0];
            const globalIdx = trackers.indexOf(tracker);
            return (
              <Marker
                key={tracker.tracker_id}
                position={[tracker.latest.lat, tracker.latest.lon]}
                icon={createIcon(tracker, globalIdx)}
              >
                <Popup autoPan autoPanPadding={[60, 60]} maxWidth={280}>
                  <div style={{ minWidth: "200px", maxWidth: "260px" }}>
                    {renderTrackerCard(tracker)}
                  </div>
                </Popup>
              </Marker>
            );
          }

          // ── Multiple trackers at ~same location → combined marker ──
          const center = group[0].latest;
          return (
            <Marker
              key={`group-${group[0].tracker_id}`}
              position={[center.lat, center.lon]}
              icon={createGroupIcon(group.length)}
            >
              <Popup autoPan autoPanPadding={[60, 60]} maxWidth={300}>
                <div style={{ minWidth: "220px", maxWidth: "280px" }}>
                  {group.map((tracker, idx) =>
                    renderTrackerCard(tracker, idx < group.length - 1)
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Data freshness indicator */}
      {fetchedAt && (
        <p className="text-center mt-2 text-[11px] text-white/35">
          {source === "live"
            ? t.trackers.liveData
            : source === "cache"
              ? t.trackers.cachedData
              : t.trackers.fallbackData}{" "}
          &middot; {formatTimestamp(fetchedAt)}
        </p>
      )}

      {/* Drawing lightbox overlay */}
      {selectedDrawing && (
        <div
          className="fixed inset-0 z-[100] bg-deep-navy/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeDrawing}
        >
          <button
            onClick={closeDrawing}
            className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl z-10 w-10 h-10 flex items-center justify-center"
          >
            &times;
          </button>
          <div
            className="relative max-w-3xl max-h-[85vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedDrawing.src}
              alt={`Risba – ${selectedDrawing.name}`}
              className="w-full h-full object-contain rounded-xl"
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md rounded-full px-5 py-2 text-white text-sm">
              {selectedDrawing.name}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
