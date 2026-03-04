"use client";

import { useEffect, useMemo } from "react";
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

        {/* Markers at latest positions */}
        {trackers.map((tracker, i) => (
          <Marker
            key={tracker.tracker_id}
            position={[tracker.latest.lat, tracker.latest.lon]}
            icon={createIcon(tracker, i)}
          >
            <Popup>
              <div style={{ minWidth: "200px" }}>
                <h3
                  style={{
                    margin: "0 0 8px",
                    fontSize: "16px",
                    fontWeight: 700,
                  }}
                >
                  {t.trackers.tracker} #{i + 1}
                </h3>
                <p
                  style={{
                    margin: "0 0 4px",
                    fontSize: "12px",
                    color: "#666",
                  }}
                >
                  <strong>Lat:</strong> {tracker.latest.lat.toFixed(5)},{" "}
                  <strong>Lon:</strong> {tracker.latest.lon.toFixed(5)}
                </p>
                <p
                  style={{
                    margin: "0 0 4px",
                    fontSize: "12px",
                    color: "#666",
                  }}
                >
                  <strong>{t.trackers.speed}</strong>{" "}
                  {tracker.latest.speed.toFixed(1)} km/h
                </p>
                <p
                  style={{
                    margin: "0 0 4px",
                    fontSize: "12px",
                    color: "#666",
                  }}
                >
                  <strong>{t.trackers.updated}</strong>{" "}
                  {formatTimestamp(tracker.latest.timestamp)}
                </p>
                <p
                  style={{
                    margin: "0 0 4px",
                    fontSize: "12px",
                    color: "#666",
                  }}
                >
                  <strong>{t.trackers.points}</strong> {tracker.path.length}
                </p>
                <div
                  style={{
                    marginTop: "8px",
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
            </Popup>
          </Marker>
        ))}
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
    </>
  );
}
