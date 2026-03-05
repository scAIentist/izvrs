export interface GalleryItem {
  id: number;
  file: string;
  thumb?: string;          // custom thumbnail (winners use /zmag/ files)
  grade: 3 | 4 | 5;
  winner?: boolean;
  name?: string;           // tracker name for winners
}

function generateGalleryItems(): GalleryItem[] {
  const items: GalleryItem[] = [];

  // 3. razred: files 1-47, 49 (no 48)
  const thirdGradeFiles = [
    ...Array.from({ length: 47 }, (_, i) => i + 1),
    49,
  ];
  for (const num of thirdGradeFiles) {
    items.push({
      id: num,
      file: `/gallery/3-razred/${num}.webp`,
      grade: 3,
    });
  }

  // 4. razred: files 50-78
  for (let i = 50; i <= 78; i++) {
    items.push({
      id: i,
      file: `/gallery/4-razred/${i}.webp`,
      grade: 4,
    });
  }

  // 5. razred: files 79-128
  for (let i = 79; i <= 128; i++) {
    items.push({
      id: i,
      file: `/gallery/5-razred/${i}.webp`,
      grade: 5,
    });
  }

  return items;
}

export const galleryItems = generateGalleryItems();

// ── 12 winning drawings (used on GPS tracker stickers) ──
// Naming: nXgY = winner number X from grade Y
export const winnerItems: GalleryItem[] = [
  // 3. razred
  { id: 201, file: "/zmag/SUNFLOWER.webp", thumb: "/zmag/SUNFLOWER.webp", grade: 3, winner: true, name: "Sunflower" },
  { id: 202, file: "/zmag/EUPORIE.webp",   thumb: "/zmag/EUPORIE.webp",   grade: 3, winner: true, name: "Euporie" },
  { id: 203, file: "/zmag/CHIRON.webp",    thumb: "/zmag/CHIRON.webp",    grade: 3, winner: true, name: "Chiron" },
  { id: 204, file: "/zmag/MEDUSA.webp",    thumb: "/zmag/MEDUSA.webp",    grade: 3, winner: true, name: "Medusa" },
  // 4. razred
  { id: 211, file: "/zmag/HERSE.webp",     thumb: "/zmag/HERSE.webp",     grade: 4, winner: true, name: "Herse" },
  { id: 212, file: "/zmag/HELIKE.webp",    thumb: "/zmag/HELIKE.webp",    grade: 4, winner: true, name: "Helike" },
  { id: 213, file: "/zmag/CYLLENE.webp",   thumb: "/zmag/CYLLENE.webp",   grade: 4, winner: true, name: "Cyllene" },
  { id: 214, file: "/zmag/ORTHOSIE.webp",  thumb: "/zmag/ORTHOSIE.webp",  grade: 4, winner: true, name: "Orthosie" },
  // 5. razred
  { id: 221, file: "/zmag/ROSALIND.webp",  thumb: "/zmag/ROSALIND.webp",  grade: 5, winner: true, name: "Rosalind" },
  { id: 222, file: "/zmag/PROXIMA.webp",   thumb: "/zmag/PROXIMA.webp",   grade: 5, winner: true, name: "Proxima" },
  { id: 223, file: "/zmag/METONE.webp",    thumb: "/zmag/METONE.webp",    grade: 5, winner: true, name: "Metone" },
  { id: 224, file: "/zmag/THYONE.webp",    thumb: "/zmag/THYONE.webp",    grade: 5, winner: true, name: "Thyone" },
];
