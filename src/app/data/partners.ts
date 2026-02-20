export interface Partner {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  role?: string;
}

export const partners: Partner[] = [
  {
    id: "ki",
    name: "Kemijski inštitut",
    country: "Slovenija",
    countryCode: "SI",
    role: "Vodilni partner",
  },
  {
    id: "izvrs",
    name: "Inštitut za vode Republike Slovenije",
    country: "Slovenija",
    countryCode: "SI",
  },
  {
    id: "iof",
    name: "Institute of Oceanography and Fisheries",
    country: "Hrvaška",
    countryCode: "HR",
  },
  {
    id: "ut",
    name: "University of Tirana",
    country: "Albanija",
    countryCode: "AL",
  },
  {
    id: "ispra",
    name: "Italian Institute for Environmental Protection and Research",
    country: "Italija",
    countryCode: "IT",
  },
  {
    id: "mio",
    name: "Mediterranean Information Office for Environment, Culture and Sustainable Development",
    country: "Grčija",
    countryCode: "GR",
  },
  {
    id: "hcmr",
    name: "Hellenic Centre for Marine Research",
    country: "Grčija",
    countryCode: "GR",
  },
  {
    id: "imbm",
    name: "Institute of Marine Biology, University of Montenegro",
    country: "Črna Gora",
    countryCode: "ME",
  },
  {
    id: "metkovic",
    name: "Mesto Metković",
    country: "Hrvaška",
    countryCode: "HR",
  },
  {
    id: "capljina",
    name: "Mesto Čapljina",
    country: "Bosna in Hercegovina",
    countryCode: "BA",
  },
];
