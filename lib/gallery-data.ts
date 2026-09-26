export interface GalleryVideo {
  id: number;
  title: string;
  description: string;
  // Future: add youtubeId + thumbnail when real videos are ready.
  // youtubeId?: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

export const galleryVideos: GalleryVideo[] = [
  {
    id: 1,
    title: "Journey Through the Mountains",
    description: "A glimpse into our mountain journeys.",
  },
  {
    id: 2,
    title: "Moments From Our Adventures",
    description: "Travel memories from the road.",
  },
  {
    id: 3,
    title: "Exploring Himachal",
    description: "Valleys, passes and trails of Himachal.",
  },
  {
    id: 4,
    title: "Travel With Rucksack Adventures",
    description: "How we curate every Rucksack journey.",
  },
  {
    id: 5,
    title: "Memories From the Road",
    description: "Scenes and stories collected along the way.",
  },
  {
    id: 6,
    title: "Discover Your Next Adventure",
    description: "A look at what could be your next trip.",
  },
];

export const galleryImages: GalleryImage[] = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  src: `/gallery/gallery${i + 1}.jpeg`,
  alt: `Rucksack Adventures moment ${i + 1}`,
}));
