"use client";

import { useState } from "react";
import Image from "next/image";
import { rivers, type River } from "../data/rivers";
import { partners } from "../data/partners";
import { useTranslation } from "@/i18n";

/* --------------------------------------------------------
   Coordinate helper: geographic → SVG
   Region: lon 11°E–23°E, lat 47°N–36.5°N
   ViewBox: 0 0 700 460
   -------------------------------------------------------- */
const LON_MIN = 11;
const LON_MAX = 23;
const LAT_MIN = 36.5;
const LAT_MAX = 47;
const W = 700;
const H = 460;

function geoToSvg(lon: number, lat: number): [number, number] {
  const x = ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * W;
  const y = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * H;
  return [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
}

/* Helper to build SVG path from geo coords array */
function geoPath(coords: [number, number][]): string {
  return coords
    .map(([lon, lat], i) => {
      const [x, y] = geoToSvg(lon, lat);
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");
}

/* --------------------------------------------------------
   Simplified coastline & country boundary data
   Points are [longitude, latitude] pairs
   -------------------------------------------------------- */

// Italy — eastern Adriatic coast (from north near Trieste down to heel/Otranto, then across to Ionian)
const italyCoast: [number, number][] = [
  [13.75, 45.7],  // Trieste area
  [13.6, 45.65],
  [13.5, 45.55],  // Gulf of Trieste
  [13.1, 44.95],  // Venice area
  [12.8, 44.85],
  [12.6, 44.6],   // Chioggia
  [12.3, 44.5],   // Ravenna area (Reno mouth)
  [12.2, 44.2],   // Rimini
  [12.4, 43.95],
  [13.5, 43.6],   // Ancona area
  [13.8, 43.3],
  [14.2, 42.45],
  [14.7, 42.1],   // Abruzzo
  [15.4, 41.9],
  [16.0, 41.8],   // Puglia
  [16.5, 41.5],
  [17.0, 41.1],   // Bari area
  [17.1, 40.8],
  [17.9, 40.5],
  [18.3, 40.3],
  [18.5, 40.15],  // Otranto strait
  [18.5, 40.0],
  [18.0, 39.8],   // Lecce/heel tip
  [17.1, 39.95],  // Taranto Gulf
  [16.6, 39.4],
  [16.1, 39.0],   // Calabria
  [15.7, 38.5],
  [15.65, 38.2],  // Strait of Messina area
];

// Slovenia coast (tiny)
const sloveniaCoast: [number, number][] = [
  [13.75, 45.7],  // Trieste/border
  [13.7, 45.56],
  [13.6, 45.52],  // Koper
  [13.55, 45.48], // Piran
];

// Croatia coast — Istria and down Dalmatian coast
const croatiaCoast: [number, number][] = [
  [13.55, 45.48], // Slovenia border
  [13.5, 45.3],   // Istria west
  [13.6, 45.0],   // Pula
  [14.0, 44.85],
  [14.2, 44.9],   // Rijeka area
  [14.4, 44.75],
  [14.6, 44.6],   // Islands start
  [14.8, 44.5],
  [15.0, 44.25],
  [15.2, 44.1],   // Zadar area
  [15.4, 43.85],
  [15.9, 43.5],   // Šibenik
  [16.2, 43.45],
  [16.45, 43.5],  // Split
  [16.7, 43.35],
  [16.9, 43.1],   // Makarska
  [17.2, 43.05],  // Ploče (Neretva delta)
  [17.65, 42.95], // Dubrovnik area
  [17.6, 42.65],
  [18.4, 42.65],  // Dubrovnik
  [18.5, 42.45],  // Border with Montenegro
];

// Bosnia-Herzegovina (tiny Neum corridor coast)
const bosniaCoast: [number, number][] = [
  [17.6, 42.95],
  [17.65, 42.95],
];

// Montenegro coast
const montenegroCoast: [number, number][] = [
  [18.5, 42.45],
  [18.7, 42.35],  // Kotor bay
  [18.8, 42.3],
  [19.0, 42.1],   // Bar
  [19.2, 42.0],   // Ulcinj
  [19.4, 41.87],  // Buna/Bojana mouth
];

// Albania coast
const albaniaCoast: [number, number][] = [
  [19.4, 41.87],
  [19.5, 41.3],   // Durrës
  [19.45, 41.1],
  [19.5, 40.65],  // Vlorë
  [19.4, 40.3],
  [19.3, 40.1],   // Sarandë
  [20.0, 39.8],   // Border with Greece
];

// Greece — Ionian coast down to Peloponnese
const greeceCoast: [number, number][] = [
  [20.0, 39.8],   // Albania border
  [20.7, 39.6],   // Ioannina area (inland but coast is complex)
  [20.7, 39.2],   // Preveza/Lefkada area
  [20.6, 38.7],   // Patras area
  [21.1, 38.3],   // Gulf of Patras
  [21.3, 38.1],
  [21.5, 37.8],   // Western Peloponnese
  [21.5, 37.6],   // Alfeios mouth area
  [21.7, 37.0],   // Southern Peloponnese tip
  [22.0, 36.8],
  [22.5, 36.5],   // Cape Matapan
  [23.0, 36.5],   // SE Peloponnese
];

/* River mouth positions [lon, lat] */
const riverGeo: Record<string, [number, number]> = {
  soca: [13.55, 45.82],       // Mouth near Monfalcone/Gorizia area
  reno: [12.25, 44.55],       // Mouth near Ravenna
  neretva: [17.45, 43.05],    // Delta near Ploče
  "buna-bojana": [19.37, 41.87], // Mouth near Ulcinj
  alfeios: [21.47, 37.63],    // Western Peloponnese
};

/* Country label positions [lon, lat] */
const countryLabelPositions: { lon: number; lat: number; code: string }[] = [
  { lon: 14.5, lat: 42.8, code: "IT" },
  { lon: 14.4, lat: 46.1, code: "SI" },
  { lon: 16.3, lat: 44.2, code: "HR" },
  { lon: 17.8, lat: 43.8, code: "BA" },
  { lon: 19.5, lat: 42.5, code: "ME" },
  { lon: 20.2, lat: 41.0, code: "AL" },
  { lon: 22.0, lat: 38.5, code: "GR" },
];

/* Partners grouped by country code for the legend below */
const partnersByCountry = partners.reduce(
  (acc, p) => {
    if (!acc[p.countryCode]) acc[p.countryCode] = [];
    acc[p.countryCode].push(p);
    return acc;
  },
  {} as Record<string, typeof partners>,
);

/* Country order for partner legend */
const countryOrder = ["SI", "IT", "HR", "BA", "ME", "AL", "GR"];
/* countryNames moved to translations */
const countryColors: Record<string, string> = {
  SI: "#2AABE0",
  IT: "#4A7C59",
  HR: "#D4A843",
  BA: "#8BAA7A",
  ME: "#6B9E78",
  AL: "#C0392B",
  GR: "#1A7BA3",
};

export default function RiversMap() {
  const { t } = useTranslation();
  const [activeRiver, setActiveRiver] = useState<River | null>(null);

  return (
    <div className="relative">
      {/* The SVG map */}
      <div className="relative max-w-4xl mx-auto">
        <svg
          viewBox="0 0 700 460"
          className="w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Sea gradient */}
            <radialGradient id="seaGrad" cx="45%" cy="40%">
              <stop offset="0%" stopColor="#2AABE0" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#1A7BA3" stopOpacity="0.18" />
            </radialGradient>
            {/* Land fill gradient */}
            <linearGradient id="landGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E8DCC8" />
              <stop offset="100%" stopColor="#D5C9B3" />
            </linearGradient>
            {/* Drop shadow for river markers */}
            <filter id="dotShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#0D1B2A" floodOpacity="0.2" />
            </filter>
          </defs>

          {/* Sea background */}
          <rect width="700" height="460" fill="url(#seaGrad)" rx="16" />

          {/* Sea pattern — subtle wave lines */}
          {[90, 155, 230, 300, 370].map((y, i) => (
            <path
              key={i}
              d={`M0,${y} Q${175},${y + (i % 2 === 0 ? 12 : -12)} ${350},${y} T${700},${y}`}
              fill="none"
              stroke="#2AABE0"
              strokeWidth="0.5"
              strokeOpacity="0.12"
            />
          ))}

          {/* Italy land mass (filled polygon) */}
          <path
            d={geoPath(italyCoast) + ` L0,${H} L0,0 Z`}
            fill="url(#landGrad)"
            stroke="#B8A98A"
            strokeWidth="1.5"
            strokeOpacity="0.6"
          />

          {/* Croatia + Slovenia coast — land on the east side */}
          <path
            d={
              geoPath([...sloveniaCoast, ...croatiaCoast]) +
              ` L${W},0 L${geoToSvg(13.75, 45.7)[0]},0 Z`
            }
            fill="url(#landGrad)"
            stroke="#B8A98A"
            strokeWidth="1.5"
            strokeOpacity="0.6"
          />

          {/* Montenegro coast — land east */}
          <path
            d={
              geoPath(montenegroCoast) +
              ` L${W},${geoToSvg(19.4, 41.87)[1]} L${W},${geoToSvg(18.5, 42.45)[1]} Z`
            }
            fill="url(#landGrad)"
            stroke="#B8A98A"
            strokeWidth="1.5"
            strokeOpacity="0.6"
          />

          {/* Albania coast — land east */}
          <path
            d={
              geoPath(albaniaCoast) +
              ` L${W},${geoToSvg(20.0, 39.8)[1]} L${W},${geoToSvg(19.4, 41.87)[1]} Z`
            }
            fill="url(#landGrad)"
            stroke="#B8A98A"
            strokeWidth="1.5"
            strokeOpacity="0.6"
          />

          {/* Greece coast — land south-east */}
          <path
            d={geoPath(greeceCoast) + ` L${W},${H} L${W},${geoToSvg(20.0, 39.8)[1]} Z`}
            fill="url(#landGrad)"
            stroke="#B8A98A"
            strokeWidth="1.5"
            strokeOpacity="0.6"
          />

          {/* Sea labels */}
          <text
            x={geoToSvg(15.5, 42.5)[0]}
            y={geoToSvg(15.5, 42.5)[1]}
            textAnchor="middle"
            fill="#1A7BA3"
            fontSize="13"
            fontWeight="700"
            opacity="0.25"
            letterSpacing="4"
          >
            {t.map.adriatic1}
          </text>
          <text
            x={geoToSvg(15.5, 41.8)[0]}
            y={geoToSvg(15.5, 41.8)[1]}
            textAnchor="middle"
            fill="#1A7BA3"
            fontSize="13"
            fontWeight="700"
            opacity="0.25"
            letterSpacing="4"
          >
            {t.map.adriatic2}
          </text>
          <text
            x={geoToSvg(19.0, 39.0)[0]}
            y={geoToSvg(19.0, 39.0)[1]}
            textAnchor="middle"
            fill="#1A7BA3"
            fontSize="11"
            fontWeight="700"
            opacity="0.2"
            letterSpacing="3"
          >
            {t.map.ionian}
          </text>

          {/* Country labels on land */}
          {countryLabelPositions.map((c) => {
            const [cx, cy] = geoToSvg(c.lon, c.lat);
            return (
              <text
                key={c.code}
                x={cx}
                y={cy}
                textAnchor="middle"
                fill="#7A6E5D"
                fontSize="10"
                fontWeight="600"
                opacity="0.55"
                letterSpacing="2"
              >
                {t.map.countries[c.code as keyof typeof t.map.countries]}
              </text>
            );
          })}

          {/* Country border lines (dashed) — SLO/HR border */}
          <line
            x1={geoToSvg(13.55, 45.48)[0]}
            y1={geoToSvg(13.55, 45.48)[1]}
            x2={geoToSvg(14.5, 45.5)[0]}
            y2={geoToSvg(14.5, 45.5)[1]}
            stroke="#7A6E5D"
            strokeWidth="0.8"
            strokeDasharray="4,3"
            strokeOpacity="0.4"
          />

          {/* River course lines (simplified) */}
          {/* Soča: from Julian Alps to Adriatic */}
          <path
            d={`M${geoToSvg(13.7, 46.35).join(",")} Q${geoToSvg(13.65, 46.0).join(",")} ${geoToSvg(13.55, 45.82).join(",")}`}
            fill="none"
            stroke="#2AABE0"
            strokeWidth="2"
            strokeOpacity="0.5"
            strokeLinecap="round"
          />
          {/* Reno: from Apennines to Adriatic */}
          <path
            d={`M${geoToSvg(11.3, 44.15).join(",")} Q${geoToSvg(11.8, 44.4).join(",")} ${geoToSvg(12.25, 44.55).join(",")}`}
            fill="none"
            stroke="#2AABE0"
            strokeWidth="2"
            strokeOpacity="0.5"
            strokeLinecap="round"
          />
          {/* Neretva: from BiH to Adriatic */}
          <path
            d={`M${geoToSvg(17.8, 43.6).join(",")} Q${geoToSvg(17.6, 43.3).join(",")} ${geoToSvg(17.45, 43.05).join(",")}`}
            fill="none"
            stroke="#2AABE0"
            strokeWidth="2"
            strokeOpacity="0.5"
            strokeLinecap="round"
          />
          {/* Buna/Bojana: from Skadar Lake to Adriatic */}
          <path
            d={`M${geoToSvg(19.5, 42.1).join(",")} Q${geoToSvg(19.45, 42.0).join(",")} ${geoToSvg(19.37, 41.87).join(",")}`}
            fill="none"
            stroke="#2AABE0"
            strokeWidth="2"
            strokeOpacity="0.5"
            strokeLinecap="round"
          />
          {/* Alfeios: across Peloponnese to Ionian */}
          <path
            d={`M${geoToSvg(22.2, 37.6).join(",")} Q${geoToSvg(21.8, 37.6).join(",")} ${geoToSvg(21.47, 37.63).join(",")}`}
            fill="none"
            stroke="#2AABE0"
            strokeWidth="2"
            strokeOpacity="0.5"
            strokeLinecap="round"
          />

          {/* River markers — pulsing dots with labels */}
          {rivers.map((river) => {
            const geo = riverGeo[river.id];
            if (!geo) return null;
            const [cx, cy] = geoToSvg(geo[0], geo[1]);
            const isActive = activeRiver?.id === river.id;
            const label = river.name.split("/")[0].trim();

            return (
              <g key={river.id}>
                {/* Outer pulsing ring — uses SVG-native r animation */}
                <circle
                  cx={cx}
                  cy={cy}
                  r="14"
                  fill="none"
                  stroke={isActive ? "#D4A843" : "#2AABE0"}
                  strokeWidth="2"
                  className="animate-pulse-ring"
                />
                {/* Static glow halo */}
                <circle
                  cx={cx}
                  cy={cy}
                  r="10"
                  fill={isActive ? "#D4A843" : "#2AABE0"}
                  opacity="0.15"
                />
                {/* Core dot */}
                <circle
                  cx={cx}
                  cy={cy}
                  r="6"
                  fill={isActive ? "#D4A843" : "#2AABE0"}
                  stroke="white"
                  strokeWidth="2.5"
                  className="cursor-pointer"
                  style={{ transition: "fill 0.2s" }}
                  onMouseEnter={() => setActiveRiver(river)}
                  onClick={() =>
                    setActiveRiver(isActive ? null : river)
                  }
                />
                {/* Label background pill */}
                <rect
                  x={cx - label.length * 3.2 - 6}
                  y={cy - 28}
                  width={label.length * 6.4 + 12}
                  height="16"
                  rx="8"
                  fill={isActive ? "#D4A843" : "#0D1B2A"}
                  fillOpacity={isActive ? 0.9 : 0.75}
                  className="pointer-events-none"
                />
                {/* Label text */}
                <text
                  x={cx}
                  y={cy - 17}
                  textAnchor="middle"
                  fill="white"
                  fontSize="9"
                  fontWeight="700"
                  className="pointer-events-none"
                  letterSpacing="0.5"
                >
                  {label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Info card — overlay on top of the map */}
        {activeRiver && (() => {
          const geo = riverGeo[activeRiver.id];
          if (!geo) return null;
          const [px, py] = geoToSvg(geo[0], geo[1]);
          // Convert SVG coords to % for positioning
          const leftPct = (px / W) * 100;
          const topPct = (py / H) * 100;
          // If marker is on the right half, show card to the left; otherwise to the right
          const onRight = leftPct > 50;

          return (
            <div
              className="absolute z-20 w-64 sm:w-72 transition-all"
              style={{
                top: `${topPct}%`,
                ...(onRight
                  ? { right: `${100 - leftPct + 3}%` }
                  : { left: `${leftPct + 3}%` }),
                transform: "translateY(-50%)",
              }}
            >
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-river-blue/20">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-river-blue animate-pulse flex-shrink-0" />
                    <h4 className="font-bold text-deep-navy text-sm">{activeRiver.name}</h4>
                  </div>
                  <button
                    onClick={() => setActiveRiver(null)}
                    className="text-slate-dark/40 hover:text-slate-dark text-lg leading-none p-0.5 -mt-0.5 -mr-0.5"
                  >
                    &times;
                  </button>
                </div>
                {(() => {
                  const rt = t.rivers[activeRiver.id as keyof typeof t.rivers];
                  return rt ? (
                    <>
                      <p className="text-[11px] text-river-blue font-semibold mb-1.5 ml-[18px]">
                        {rt.countries.join(" / ")}
                      </p>
                      <p className="text-xs text-slate-dark/70 leading-relaxed ml-[18px]">
                        {rt.description}
                      </p>
                      <div className="mt-2 ml-[18px] flex items-center gap-1.5 text-[11px] text-slate-dark/50">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {t.about.pilotPartner} <span className="font-medium text-slate-dark/70">{rt.pilotLead}</span>
                      </div>
                    </>
                  ) : null;
                })()}
              </div>
            </div>
          );
        })()}
      </div>

      {/* Partners — infinite scrolling logo carousel */}
      <div className="mt-6 max-w-5xl mx-auto">
        <h4 className="text-xs font-semibold text-slate-dark/40 uppercase tracking-widest mb-5 text-center">
          {t.about.partnersTitle}
        </h4>
        <div className="relative overflow-hidden mask-fade">
          <div className="flex w-max animate-scroll-logos gap-10 sm:gap-14 items-center py-4">
            {/* Duplicate the list for seamless infinite loop */}
            {[...partners, ...partners].map((p, i) => (
              <div
                key={`${p.id}-${i}`}
                className="flex-shrink-0 flex items-center justify-center h-12 sm:h-14 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
                title={p.name}
              >
                <Image
                  src={p.logo}
                  alt={p.name}
                  width={120}
                  height={56}
                  className="h-10 sm:h-12 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
