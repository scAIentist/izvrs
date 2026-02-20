"use client";

import { useEffect } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { trackers } from "../data/trackers";

const statusColors: Record<string, string> = {
  active: "#27AE60",
  inactive: "#888888",
  stopped: "#C0392B",
};

const statusLabels: Record<string, string> = {
  active: "Aktiven",
  inactive: "Neaktiven",
  stopped: "Ustavljen",
};

function createIcon(tracker: (typeof trackers)[0]) {
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
    ">${tracker.id}</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -20],
  });
}

export default function MapContent() {
  useEffect(() => {
    // Fix Leaflet default icon paths
    delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
      iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    });
  }, []);

  return (
    <MapContainer
      center={[46.2, 13.65]}
      zoom={10}
      scrollWheelZoom={false}
      style={{ height: "500px", width: "100%", borderRadius: "12px" }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {trackers.map((tracker) => (
        <Marker
          key={tracker.id}
          position={[tracker.lat, tracker.lng]}
          icon={createIcon(tracker)}
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
                {tracker.name}
              </h3>
              <p
                style={{
                  margin: "0 0 4px",
                  fontSize: "13px",
                  color: "#666",
                }}
              >
                {tracker.kidName} &middot; {tracker.school}
              </p>
              <p
                style={{
                  margin: "0 0 4px",
                  fontSize: "13px",
                  color: "#666",
                }}
              >
                {tracker.grade}
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  marginTop: "8px",
                  fontSize: "12px",
                }}
              >
                <span>
                  <strong>Prepotovano:</strong> {tracker.distanceKm} km
                </span>
              </div>
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
  );
}
