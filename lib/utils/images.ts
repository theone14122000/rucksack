const destinationImageMap: Record<string, string> = {
  "himachal-pradesh": "/images/destinations/himachal-pradesh.jpg",
  "kashmir": "/images/destinations/kashmir.jpg",
  "leh-ladakh": "/images/destinations/leh-ladakh.jpg",
  "dharamshala": "/images/himachal4.jpg",
  "dalhousie": "/images/landscape.jpg",
  "kinnaur": "/images/destinations/kinnaur.jpg",
  "lahaul-spiti": "/images/leh4.jpg",
  "manali": "/images/himachal2.jpg",
  "shimla": "/images/destinations/himachal-pradesh.jpg",
  "uttarakhand": "/images/destinations/uttarakhand.jpg",
  "north-east": "/images/destinations/north-east.jpg",
  "andaman-nicobar": "/images/destinations/andaman.jpg",
  "bali": "/images/destinations/bali.jpg",
  "dubai": "/images/destinations/dubai.jpg",
  "thailand": "/images/destinations/thailand.jpg",
  "singapore": "/images/destinations/singapore.jpg",
  "malaysia": "/images/destinations/malaysia.jpg",
  "nepal": "/images/destinations/nepal.jpg",
  "bhutan": "/images/destinations/bhutan.jpg",
};

const packageImageMap: Record<string, string> = {
  "spiti-valley-expedition": "/images/gallery/himachal-1.jpg",
  "kashmir-luxury-valley-retreat": "/images/gallery/kashmir-1.jpg",
  "ladakh-turquoise-lakes-odyssey": "/images/gallery/leh-1.jpg",
  "bali-jungle-and-coastal-reverie": "/images/destinations/bali.jpg",
  "dubai-skyline-and-desert-escapade": "/images/destinations/dubai.jpg",
};

const trekImageMap: Record<string, string> = {
  "chopta-chandrashila-trek": "/images/gallery/uttarakhand-1.jpg",
  "bhaba-pass-trek": "/images/gallery/kinnaur-1.jpg",
  "indrahar-pass-trek": "/images/gallery/himachal-2.jpg",
  "triund-trek": "/images/gallery/himachal-3.jpg",
  "giriganga-trek-kuppar-peak": "/images/gallery/himachal-1.jpg",
  "churdhar": "/images/gallery/himachal-2.jpg",
  "chanshal-valley": "/images/gallery/himachal-3.jpg",
  "bashal-peak": "/images/gallery/kinnaur-1.jpg",
  "hampta-pass": "/images/gallery/leh-1.jpg",
  "jalori-pass": "/images/gallery/uttarakhand-1.jpg",
  "prashar-lake": "/images/gallery/uttarakhand-2.jpg",
  "serolsar-lake": "/images/gallery/uttarakhand-3.jpg",
  "shirai-koti-temple": "/images/gallery/kashmir-1.jpg",
  "tanujubbar": "/images/gallery/kashmir-2.jpg",
  "yula-lake": "/images/gallery/leh-2.jpg",
};

export function getDestinationImage(slug: string): string {
  return destinationImageMap[slug] || "/images/destinations/himachal-pradesh.jpg";
}

export function getPackageImage(slug: string): string {
  return packageImageMap[slug] || "/images/gallery/himachal-1.jpg";
}

export function getTrekImage(slug: string): string {
  return trekImageMap[slug] || "/images/gallery/himachal-1.jpg";
}
