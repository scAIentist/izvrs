export interface EventPhoto {
  id: string;
  file: string;
}

export interface EventData {
  slug: string;
  date: string;
  location: string;
  videos: string[];
  photos: EventPhoto[];
}

const FIRST_EVENT_FILES = [
  "0", "1", "2", "3", "4", "5", "6", "7", "8", "8b", "8c", "8d", "9",
  "10", "11", "12", "13", "13b", "13d", "14", "15", "16", "17", "18", "19",
  "20", "21", "23", "23b", "24", "24b", "25", "27", "28", "29",
  "30", "31", "32", "33", "34", "35", "36", "37", "38", "39",
  "40", "41", "42", "43", "44", "45", "45.1", "45c", "45d", "46", "47", "48", "49",
  "50c", "51", "52", "53", "54", "54b", "55", "56", "57", "58", "59", "60",
];

function buildPhotos(slug: string, files: string[]): EventPhoto[] {
  return files.map((f) => ({
    id: f,
    file: `/dogodek/${slug}/${f}.webp`,
  }));
}

export const events: EventData[] = [
  {
    slug: "6-3-2026-sotocje",
    date: "6. 3. 2026",
    location: "Sotočje Tolminke in Soče",
    videos: [
      "https://www.youtube.com/embed/MaNZdROt0xo",
      "https://www.youtube.com/embed/fkEaznBikoQ",
    ],
    photos: buildPhotos("6-3-2026-sotocje", FIRST_EVENT_FILES),
  },
];

export function getEvent(slug: string): EventData | undefined {
  return events.find((e) => e.slug === slug);
}
