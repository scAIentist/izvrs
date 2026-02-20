export interface GalleryItem {
  id: number;
  file: string;
  grade: 3 | 4 | 5;
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
