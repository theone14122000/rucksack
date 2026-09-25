/**
 * Adventure activities — data-driven catalogue.
 *
 * Three difficulty levels (basic / moderate / extreme) with activity
 * descriptions. Images reuse the project's existing Himalayan photo library.
 * Add new activities here; the UI renders from this data with no rewrites.
 */

export type AdventureLevelKey = "basic" | "moderate" | "extreme";

export interface AdventureLevel {
  key: AdventureLevelKey;
  label: string;
  tagline: string;
  description: string;
}

export interface Activity {
  slug: string;
  name: string;
  level: AdventureLevelKey;
  tagline: string;
  paragraphs: string[];
  image: string;
}

export const ADVENTURE_LEVELS: AdventureLevel[] = [
  {
    key: "basic",
    label: "Basic Adventure",
    tagline: "Gentle discovery, minimal exertion",
    description:
      "It is the least demanding adventure. It comprises journeys of discovery and involves little or no extended activity. These experiences are suitable for people with a basic level of fitness and good health. They may include walks to remote areas with basic facilities, long travelling days and sightseeing conducted on foot. Participants should be capable of carrying their own luggage where required.",
  },
  {
    key: "moderate",
    label: "Moderate Adventure",
    tagline: "Active days, good fitness required",
    description:
      "These trips involve activities such as trekking, walking, cycling and rafting. Participants should have a good level of fitness and be prepared for physically demanding activities. Some adventures may involve carrying a full pack and dealing with changing weather conditions.",
  },
  {
    key: "extreme",
    label: "Extreme Adventure",
    tagline: "Remote terrain, excellent fitness required",
    description:
      "These adventures can involve challenging activities in remote areas. Participants may encounter difficult terrain and variable weather conditions and should have an excellent level of fitness and be comfortable operating in remote environments where evacuation may be difficult.",
  },
];

export const ACTIVITIES: Activity[] = [
  {
    slug: "burma-bridge",
    name: "Burma Bridge",
    level: "basic",
    tagline: "A walk through the forest canopy",
    paragraphs: [
      "A Burma Bridge is a thin but sturdy structure made from two parallel ropes, one above the other, strung between poles or trees at a height of approximately 25 feet.",
      "Participants can be divided into teams, with participants climbing from opposite ends and walking across the ropes toward the center. Participants are secured with harnesses and guiding/belay ropes are handled by trained professionals.",
      "The experience can also be enjoyed simply as a walk across the bridge through the forest canopy.",
    ],
    image: "/images/kinnaur1.jpg",
  },
  {
    slug: "photography",
    name: "Photography",
    level: "basic",
    tagline: "Wildlife, landscapes and Himalayan light",
    paragraphs: [
      "Himachal Pradesh has long been a destination for wildlife and nature enthusiasts, offering diverse flora, fauna and landscapes that make it an ideal setting for photography.",
      "Rucksack Adventures can also help arrange a native professional tour guide where required.",
    ],
    image: "/images/kashmir.jpg",
  },
  {
    slug: "trail-running",
    name: "Trail Running",
    level: "basic",
    tagline: "Mountains, river banks and valleys at pace",
    paragraphs: [
      "Trail running takes you across mountains, river banks, streams and valleys, allowing you to combine physical activity with the natural beauty of Himachal Pradesh.",
      "Trail distances vary according to the natural length and terrain of each route.",
    ],
    image: "/images/himachal2.jpg",
  },
  {
    slug: "nature-village-walk",
    name: "Nature / Village Walk",
    level: "basic",
    tagline: "Forests, village life and local communities",
    paragraphs: [
      "Explore forests, natural landscapes and village life while connecting with local surroundings and communities.",
      "These experiences can be particularly suitable for students and travelers interested in learning more about nature and local life.",
    ],
    image: "/images/himachal3.jpg",
  },
  {
    slug: "rock-climbing",
    name: "Rock Climbing",
    level: "moderate",
    tagline: "Vertical ascents on Himalayan rock",
    paragraphs: [
      "Rock climbing is a popular adventure activity in the hills of Himachal Pradesh. Participants climb vertically, descend or navigate challenging sections while using appropriate climbing equipment and ropes.",
    ],
    image: "/images/leh1.jpg",
  },
  {
    slug: "rappelling",
    name: "Rappelling",
    level: "moderate",
    tagline: "Controlled descents with trained supervision",
    paragraphs: [
      "Rappelling involves descending from a cliff or elevated point using ropes and appropriate safety equipment under the supervision of trained professionals.",
    ],
    image: "/images/kinnaur2.jpg",
  },
  {
    slug: "valley-crossing",
    name: "Valley Crossing",
    level: "moderate",
    tagline: "Suspended crossings above the valley",
    paragraphs: [
      "Valley Crossing offers an adrenaline-filled experience where participants cross between elevated points while suspended above a valley and secured with appropriate climbing equipment.",
    ],
    image: "/images/leh2.jpg",
  },
  {
    slug: "hot-air-ballooning",
    name: "Hot Air Ballooning",
    level: "moderate",
    tagline: "Panoramic views from a bird's-eye perspective",
    paragraphs: [
      "Hot air ballooning offers a unique perspective of the landscape from above, allowing travelers to experience panoramic views from a bird's-eye perspective.",
    ],
    image: "/images/landscape.jpg",
  },
  {
    slug: "river-rafting",
    name: "River Rafting",
    level: "extreme",
    tagline: "Rapids, teamwork and mountain rivers",
    paragraphs: [
      "River rafting takes participants through moving river waters in an inflatable raft, combining teamwork, changing currents and the thrill of navigating rapids with experienced professionals.",
    ],
    image: "/images/himachal4.jpg",
  },
  {
    slug: "paragliding",
    name: "Paragliding",
    level: "extreme",
    tagline: "Glide through open Himalayan skies",
    paragraphs: [
      "Experience the sensation of gliding through the sky while taking in views of the surrounding landscape.",
    ],
    image: "/images/himachal5.jpg",
  },
  {
    slug: "mountain-biking",
    name: "Mountain Biking",
    level: "extreme",
    tagline: "Uphill grinds and downhill thrills",
    paragraphs: [
      "Mountain biking combines cycling with challenging uphill and downhill terrain while allowing riders to experience mountain landscapes, culture, flora and fauna.",
    ],
    image: "/images/leh3.jpg",
  },
  {
    slug: "skiing",
    name: "Skiing",
    level: "extreme",
    tagline: "Snow-covered Himalayan slopes",
    paragraphs: [
      "Experience skiing across snow-covered slopes with experienced adventure professionals.",
      "Skiing experiences are arranged around established winter destinations such as Chanshal and Narkanda, subject to season and snow conditions.",
    ],
    image: "/images/kashmir3.jpg",
  },
  {
    slug: "zip-line",
    name: "Zip Line",
    level: "extreme",
    tagline: "Fly along a suspended cable",
    paragraphs: [
      "Zip lining, also known as a flying fox, allows participants to travel along a suspended cable while secured in appropriate safety equipment.",
    ],
    image: "/images/himachal1.jpg",
  },
  {
    slug: "mountaineering",
    name: "Mountaineering",
    level: "extreme",
    tagline: "High Himalayan exploration",
    paragraphs: [
      "Himachal Pradesh offers numerous opportunities for mountaineering and mountain exploration. The mountain regions around areas such as Spiti provide challenging and memorable experiences for adventure enthusiasts.",
    ],
    image: "/images/leh4.jpg",
  },
  {
    slug: "trekking",
    name: "Trekking",
    level: "extreme",
    tagline: "The classic Himalayan journey",
    paragraphs: [
      "Trekking is one of the most popular adventure activities in Himachal Pradesh. Rucksack Adventures provides trekking experiences with route planning, guidance and appropriate safety considerations.",
    ],
    image: "/images/destinations/uttarakhand.jpg",
  },
  {
    slug: "camping",
    name: "Camping",
    level: "extreme",
    tagline: "Nights under the Himalayan sky",
    paragraphs: [
      "Spend time surrounded by nature under the night sky. Camping offers travelers the opportunity to disconnect from everyday routines, experience high-altitude environments and enjoy the natural landscape.",
      "Evenings can include stargazing, nature immersion and the simple pleasure of an outdoor stay, conditions permitting.",
    ],
    image: "/images/kashmir4.jpg",
  },
];

export function getLevelLabel(key: AdventureLevelKey): string {
  return ADVENTURE_LEVELS.find((l) => l.key === key)?.label ?? key;
}

export function getActivitiesByLevel(key: AdventureLevelKey): Activity[] {
  return ACTIVITIES.filter((a) => a.level === key);
}
