export interface River {
  id: string;
  name: string;
  countries: string[];
  description: string;
  lat: number;
  lng: number;
  pilotLead: string;
}

export const rivers: River[] = [
  {
    id: "soca",
    name: "Soča / Isonzo",
    countries: ["Slovenija", "Italija"],
    description:
      "Smaragdno zelena reka, ki izvira v Julijskih Alpah in se izliva v Jadransko morje. V njej bo nameščenih 12 GPS sledilnikov.",
    lat: 45.93,
    lng: 13.63,
    pilotLead: "Inštitut za vode RS",
  },
  {
    id: "reno",
    name: "Reno",
    countries: ["Italija"],
    description:
      "Reka v severni Italiji, ki teče skozi Emilijo-Romanjo in se izliva v Jadransko morje.",
    lat: 44.62,
    lng: 12.27,
    pilotLead: "ISPRA",
  },
  {
    id: "alfeios",
    name: "Alfeios",
    countries: ["Grčija"],
    description:
      "Najdaljša reka na Peloponezu, ki se izliva v Jonsko morje. Pomemben vir sladke vode v regiji.",
    lat: 37.63,
    lng: 21.47,
    pilotLead: "HCMR",
  },
  {
    id: "buna-bojana",
    name: "Buna / Bojana",
    countries: ["Albanija", "Črna Gora"],
    description:
      "Čezmejna reka med Albanijo in Črno Goro, ki se izliva v Jadransko morje pri mestu Ulcinj.",
    lat: 41.87,
    lng: 19.37,
    pilotLead: "Univerza v Tirani",
  },
  {
    id: "neretva",
    name: "Neretva",
    countries: ["Hrvaška", "Bosna in Hercegovina"],
    description:
      "Najdaljša reka na vzhodnem Jadranu. Njen delta je eno najpomembnejših mokrišč v Sredozemlju.",
    lat: 43.02,
    lng: 17.44,
    pilotLead: "Mesto Metković",
  },
];
