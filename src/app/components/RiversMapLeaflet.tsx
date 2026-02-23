"use client";

import { useEffect } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { rivers } from "../data/rivers";
import { useTranslation } from "@/i18n";

/* Custom pulsing marker for each river */
function createRiverIcon(name: string, isActive = false) {
  const label = name.split("/")[0].trim();
  return L.divIcon({
    className: "river-marker",
    html: `
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
      ">
        <div style="
          background: ${isActive ? "#D4A843" : "#0D1B2A"};
          color: white;
          font-size: 11px;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 12px;
          white-space: nowrap;
          letter-spacing: 0.5px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          margin-bottom: 4px;
        ">${label}</div>
        <div style="
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
        ">
          <div style="
            position: absolute;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: ${isActive ? "#D4A843" : "#2AABE0"};
            opacity: 0.2;
            animation: pulse-marker 2.5s ease-out infinite;
          "></div>
          <div style="
            position: absolute;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: ${isActive ? "#D4A843" : "#2AABE0"};
            opacity: 0.15;
            animation: pulse-marker 2.5s ease-out 0.8s infinite;
          "></div>
          <div style="
            position: relative;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: ${isActive ? "#D4A843" : "#2AABE0"};
            border: 3px solid white;
            box-shadow: 0 2px 10px rgba(42,171,224,0.5);
          "></div>
        </div>
      </div>
    `,
    iconSize: [80, 66],
    iconAnchor: [40, 56],
    popupAnchor: [0, -55],
  });
}

export default function RiversMapLeaflet() {
  const { t } = useTranslation();

  useEffect(() => {
    /* Fix Leaflet default icon paths */
    delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
      iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    });

    /* Inject pulse animation for markers */
    if (!document.getElementById("river-marker-style")) {
      const style = document.createElement("style");
      style.id = "river-marker-style";
      style.textContent = `
        @keyframes pulse-marker {
          0% { transform: scale(0.6); opacity: 0.3; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        .river-marker { background: transparent !important; border: none !important; }
      `;
      document.head.appendChild(style);
    }
  }, []);

  /* Center of the Adriatic/Ionian region */
  const center: [number, number] = [41.5, 17.0];

  return (
    <MapContainer
      center={center}
      zoom={5}
      scrollWheelZoom={false}
      style={{ height: "450px", width: "100%", borderRadius: "16px" }}
      className="z-0"
      minZoom={4}
      maxZoom={10}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      {rivers.map((river) => {
        const rt = t.rivers[river.id as keyof typeof t.rivers];
        return (
          <Marker
            key={river.id}
            position={[river.lat, river.lng]}
            icon={createRiverIcon(river.name)}
          >
            <Popup>
              <div style={{ minWidth: "220px", fontFamily: "Roboto, sans-serif" }}>
                <h3 style={{
                  margin: "0 0 6px",
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#0D1B2A",
                  fontFamily: "'Cascadia Code', monospace",
                }}>
                  {river.name}
                </h3>
                {rt && (
                  <>
                    <p style={{
                      margin: "0 0 6px",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#2AABE0",
                    }}>
                      {rt.countries.join(" / ")}
                    </p>
                    <p style={{
                      margin: "0",
                      fontSize: "12px",
                      color: "#666",
                      lineHeight: "1.5",
                    }}>
                      {rt.description}
                    </p>
                  </>
                )}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
