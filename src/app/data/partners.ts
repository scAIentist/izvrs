export interface Partner {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  role?: string;
  logo: string;
}

export const partners: Partner[] = [
  {
    id: "ki",
    name: "Kemijski inštitut",
    country: "Slovenija",
    countryCode: "SI",
    role: "Vodilni partner",
    logo: "/partners/ki.png",
  },
  {
    id: "izvrs",
    name: "Inštitut za vode Republike Slovenije",
    country: "Slovenija",
    countryCode: "SI",
    logo: "/partners/izvrs.png",
  },
  {
    id: "iof",
    name: "Institute of Oceanography and Fisheries",
    country: "Hrvaška",
    countryCode: "HR",
    logo: "/partners/iof.png",
  },
  {
    id: "ut",
    name: "University of Tirana",
    country: "Albanija",
    countryCode: "AL",
    logo: "/partners/ut.png",
  },
  {
    id: "ispra",
    name: "Italian Institute for Environmental Protection and Research",
    country: "Italija",
    countryCode: "IT",
    logo: "/partners/ispra.png",
  },
  {
    id: "mio",
    name: "Mediterranean Information Office for Environment, Culture and Sustainable Development",
    country: "Grčija",
    countryCode: "GR",
    logo: "/partners/mio.png",
  },
  {
    id: "hcmr",
    name: "Hellenic Centre for Marine Research",
    country: "Grčija",
    countryCode: "GR",
    logo: "/partners/hcmr.png",
  },
  {
    id: "imbm",
    name: "Institute of Marine Biology, University of Montenegro",
    country: "Črna Gora",
    countryCode: "ME",
    logo: "/partners/imbm.png",
  },
  {
    id: "metkovic",
    name: "Mesto Metković",
    country: "Hrvaška",
    countryCode: "HR",
    logo: "/partners/metkovic.png",
  },
  {
    id: "capljina",
    name: "Mesto Čapljina",
    country: "Bosna in Hercegovina",
    countryCode: "BA",
    logo: "/partners/capljina.png",
  },
];
