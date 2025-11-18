import type { GalleryImage, GalleryCategory } from "$lib/types";

export const galleryImages: GalleryImage[] = [

  {
    id: "food-1",
    src: "/images/gallery/khinkali-plate.jpg",
    thumbnail: "/images/gallery/thumbs/khinkali-plate.jpg",
    alt: "ხინკალი თეფშზე - ტრადიციული ქართული კერძი",
    category: "food",
    width: 1200,
    height: 800,
    caption: "ჩვენი ხელნაკეთი ხინკალი",
  },
  {
    id: "food-2",
    src: "/images/gallery/khachapuri-adjarian.jpg",
    thumbnail: "/images/gallery/thumbs/khachapuri-adjarian.jpg",
    alt: "აჭარული ხაჭაპური კვერცხით",
    category: "food",
    width: 1200,
    height: 800,
    caption: "აჭარული ხაჭაპური",
  },
  {
    id: "food-3",
    src: "/images/gallery/mtsvadi-grill.jpg",
    thumbnail: "/images/gallery/thumbs/mtsvadi-grill.jpg",
    alt: "მწვადი ღია ცეცხლზე",
    category: "food",
    width: 1200,
    height: 800,
    caption: "მწვადი ქართული ტრადიციით",
  },
  {
    id: "food-4",
    src: "/images/gallery/pkhali-assortment.jpg",
    thumbnail: "/images/gallery/thumbs/pkhali-assortment.jpg",
    alt: "ფხალის ასორტი",
    category: "food",
    width: 1200,
    height: 800,
    caption: "ფხალის ასორტი",
  },
  {
    id: "food-5",
    src: "/images/gallery/chakapuli.jpg",
    thumbnail: "/images/gallery/thumbs/chakapuli.jpg",
    alt: "ჩაქაფული - ბატკნის ხორცი ტარხუნით",
    category: "food",
    width: 1200,
    height: 800,
    caption: "ჩაქაფული",
  },

  {
    id: "interior-1",
    src: "/images/gallery/dining-room.jpg",
    thumbnail: "/images/gallery/thumbs/dining-room.jpg",
    alt: "რესტორნის სასადილო დარბაზი",
    category: "interior",
    width: 1200,
    height: 800,
    caption: "ჩვენი სასადილო დარბაზი",
  },
  {
    id: "interior-2",
    src: "/images/gallery/traditional-decor.jpg",
    thumbnail: "/images/gallery/thumbs/traditional-decor.jpg",
    alt: "ტრადიციული ქართული დეკორი",
    category: "interior",
    width: 1200,
    height: 800,
    caption: "ქართული ტრადიციული დეკორი",
  },
  {
    id: "interior-3",
    src: "/images/gallery/wine-cellar.jpg",
    thumbnail: "/images/gallery/thumbs/wine-cellar.jpg",
    alt: "ღვინის სარდაფი",
    category: "interior",
    width: 1200,
    height: 800,
    caption: "ღვინის სარდაფი",
  },
  {
    id: "interior-4",
    src: "/images/gallery/cozy-corner.jpg",
    thumbnail: "/images/gallery/thumbs/cozy-corner.jpg",
    alt: "მყუდრო კუთხე",
    category: "interior",
    width: 1200,
    height: 800,
    caption: "მყუდრო კუთხე",
  },

  {
    id: "atmosphere-1",
    src: "/images/gallery/family-dinner.jpg",
    thumbnail: "/images/gallery/thumbs/family-dinner.jpg",
    alt: "ოჯახური სადილი რესტორანში",
    category: "atmosphere",
    width: 1200,
    height: 800,
    caption: "ოჯახური ატმოსფერო",
  },
  {
    id: "atmosphere-2",
    src: "/images/gallery/chef-cooking.jpg",
    thumbnail: "/images/gallery/thumbs/chef-cooking.jpg",
    alt: "მზარეული კერძის მომზადებისას",
    category: "atmosphere",
    width: 1200,
    height: 800,
    caption: "ჩვენი მზარეულები",
  },
  {
    id: "atmosphere-3",
    src: "/images/gallery/wine-tasting.jpg",
    thumbnail: "/images/gallery/thumbs/wine-tasting.jpg",
    alt: "ღვინის დეგუსტაცია",
    category: "atmosphere",
    width: 1200,
    height: 800,
    caption: "ღვინის დეგუსტაცია",
  },
  {
    id: "atmosphere-4",
    src: "/images/gallery/evening-ambiance.jpg",
    thumbnail: "/images/gallery/thumbs/evening-ambiance.jpg",
    alt: "საღამოს ატმოსფერო",
    category: "atmosphere",
    width: 1200,
    height: 800,
    caption: "საღამოს ატმოსფერო",
  },
];

export function getImagesByCategory(category: GalleryCategory): GalleryImage[] {
  if (category === "all") {
    return galleryImages;
  }
  return galleryImages.filter((image) => image.category === category);
}

export function getRandomImages(count: number): GalleryImage[] {
  const shuffled = [...galleryImages].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function getImageById(id: string): GalleryImage | undefined {
  return galleryImages.find((image) => image.id === id);
}

export function getNextImage(currentId: string): GalleryImage | null {
  const currentIndex = galleryImages.findIndex((img) => img.id === currentId);
  if (currentIndex === -1 || currentIndex === galleryImages.length - 1) {
    return null;
  }
  return galleryImages[currentIndex + 1];
}

export function getPreviousImage(currentId: string): GalleryImage | null {
  const currentIndex = galleryImages.findIndex((img) => img.id === currentId);
  if (currentIndex <= 0) {
    return null;
  }
  return galleryImages[currentIndex - 1];
}

export const categoryCounts = {
  all: galleryImages.length,
  food: getImagesByCategory("food").length,
  interior: getImagesByCategory("interior").length,
  atmosphere: getImagesByCategory("atmosphere").length,
  events: getImagesByCategory("events").length,
};

export const totalImageCount = galleryImages.length;
