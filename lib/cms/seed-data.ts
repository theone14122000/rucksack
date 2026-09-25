import { Destination, Package, Trek, Experience, Testimonial, FAQ, SiteSettings } from "./types";

export const initialSiteSettings: SiteSettings = {
  brandName: "Rucksack Adventures",
  tagline: "Curated Journeys Across the Himalayas and Beyond",
  location: "Kasumpti, Shimla, Himachal Pradesh, India",
  address: "Chotta Shimla to Kusumpti Rd, SDA Complex, Kasumpti, Shimla, Himachal Pradesh 171009",
  phone: "7018678064",
  alternatePhone: "7018678064",
  whatsapp: "7018678064",
  email: "curate@rucksackadventures.com",
  experienceYears: "8+",
  rating: 4.6,
  ratingsCount: 242,
  curatedJourneysCount: "3,800+",
  socialLinks: {
    instagram: "https://www.instagram.com/realitywithriss/",
    facebook: "https://www.facebook.com/adventuresrucksack/",
    youtube: "https://www.youtube.com/@rucksackadventures6559",
    linkedin: "https://in.linkedin.com/in/rucksack-adventures-2a7198179",
  },
  seoDefaults: {
    title: "Rucksack Adventures | Premium Travel Agency in Shimla, Himachal Pradesh",
    description: "Explore curated Himalayan journeys, custom tour packages, trekking expeditions, Pilgrimage Tour packages, Nepal and Bhutan holidays, and trusted taxi services from Kasumpti, Shimla with 8+ years of expertise.",
    keywords: [
      "travel agency in Shimla",
      "Himachal tour packages",
      "Kashmir tour packages",
      "Leh Ladakh tour packages",
      "Himalayan trekking expeditions",
      "Shimla taxi service",
      "Pilgrimage Tour packages",
      "Nepal tour packages",
      "Bhutan tour packages",
      "Rucksack Adventures",
    ],
  },
};

export const initialDestinations: Destination[] = [
  {
    id: "dest-dharamshala",
    name: "Dharamshala",
    slug: "dharamshala",
    region: "Himachal Pradesh",
    isDomestic: true,
    shortDescription: "Spectacular Dhauladhar views and a distinctive blend of Himalayan landscapes, adventure and Tibetan culture.",
    fullDescription: "A picturesque hill station in Himachal Pradesh, Dharamshala offers spectacular views of the Dhauladhar range and a distinctive blend of Himalayan landscapes, adventure and Tibetan culture. Rucksack Adventures offers adventure experiences and travel packages around Dharamshala, giving travelers opportunities to explore the region while experiencing its natural beauty and cultural character. Dharamshala and McLeod Ganj are also known for their strong Tibetan cultural influence, making the region an especially interesting destination for travelers looking for a combination of nature, adventure and culture.",
    bestTimeToVisit: "March to June & September to November",
    highlights: ["Triund Trek & Night Camping", "McLeod Ganj Tibetan Culture", "Bhagsu Waterfall & Temple", "Namgyal Monastery & Tsuglagkhang Complex", "Dal Lake Forest Trails"],
    attractions: [
      { name: "Cricket Stadium", description: "" },
      { name: "Triund", description: "Triund Hill is located near McLeod Ganj at the foot of the Dhauladhar ranges. The destination is accessible through a popular trek and offers beautiful mountain views. Visitors can camp at the top and enjoy the night sky. Shops are available along parts of the route and around the hill, although travelers should plan their supplies responsibly and avoid littering." },
      { name: "Bhagsu Naag", description: "Bhagsu Naag is known for its waterfall and temple near McLeod Ganj. The area is a popular stop for travelers exploring the region." },
      { name: "McLeod Ganj", description: "McLeod Ganj, often associated with the nickname \u201cLittle Lhasa\u201d, is known for its Tibetan cultural influence, markets, caf\u00e9s, restaurants and local handicrafts. Visitors can explore Tibetan and Himachali products, clothing, souvenirs and a variety of food experiences." },
      { name: "Dal Lake", description: "Dal Lake near McLeod Ganj is a small lake surrounded by forested Himalayan landscapes and is a peaceful stop while exploring the region." },
      { name: "Namgyal Monastery", description: "Namgyal Monastery is an important Tibetan Buddhist monastery associated with the Dalai Lama and the Tibetan Buddhist tradition in McLeod Ganj." },
      { name: "Tsuglagkhang Temple Complex", description: "Tsuglagkhang Temple Complex is an important Tibetan Buddhist complex in McLeod Ganj and an important cultural and spiritual landmark in the region." },
    ],
    packagesCount: 0,
    featured: true,
    seoTitle: "Dharamshala Tour Packages | McLeod Ganj, Triund Trek & Tibetan Culture",
    seoDescription: "Curated Dharamshala holidays with Rucksack Adventures. Triund trek, McLeod Ganj monasteries, Bhagsu waterfall and Tibetan cultural experiences.",
  },
  {
    id: "dest-dalhousie",
    name: "Dalhousie",
    slug: "dalhousie",
    region: "Himachal Pradesh",
    isDomestic: true,
    shortDescription: "Forested ridges, the meadows of Khajjiar and panoramic Himalayan viewpoints.",
    fullDescription: "Dalhousie is a peaceful hill destination in Himachal Pradesh surrounded by forests, meadows and mountain viewpoints. Rucksack Adventures crafts unhurried Dalhousie itineraries combining forest trails, meadow excursions and scenic ridge walks.",
    bestTimeToVisit: "March to June; December to February for snow",
    highlights: ["Khajjiar Meadows", "Kalatop Forest Trails", "Dainkund Panoramic Views"],
    attractions: [
      { name: "Kalatop", description: "Kalatop is a forested wildlife area near Khajjiar known for its natural landscapes, trekking opportunities and Himalayan scenery. The area offers a network of trails and opportunities to experience the region's forests and wildlife." },
      { name: "Khajjiar", description: "Khajjiar is known for its beautiful meadow landscapes and is often referred to as the \u201cMini Switzerland of Himachal Pradesh\u201d. The destination offers basic adventure experiences and is particularly attractive during the winter months when snow transforms the surrounding landscape." },
      { name: "Dainkund", description: "Dainkund Peak rises to approximately 2,800 metres and offers panoramic views of the surrounding mountains and valleys. It is an excellent destination for travelers looking for scenic walks, mountain views and time away from busy city life." },
    ],
    packagesCount: 0,
    featured: true,
    seoTitle: "Dalhousie Tour Packages | Khajjiar, Kalatop & Dainkund",
    seoDescription: "Curated Dalhousie holidays with Rucksack Adventures. Khajjiar meadows, Kalatop forest trails and Dainkund panoramic walks.",
  },
  {
    id: "dest-kinnaur",
    name: "Kinnaur",
    slug: "kinnaur",
    region: "Himachal Pradesh",
    isDomestic: true,
    shortDescription: "High mountains, dramatic valleys and a blend of Buddhist and Hindu cultural traditions.",
    fullDescription: "Kinnaur is a spectacular Himalayan district known for its high mountains, dramatic valleys, Buddhist and Hindu cultural traditions, and distinctive landscapes. The region offers opportunities for adventure, mountain exploration and cultural travel. Major rivers including the Baspa and Sutlej flow through the region, while apples, chilgoza and other dry fruits are important parts of the local landscape and economy.",
    bestTimeToVisit: "April to October",
    highlights: ["Kinner Kailash Views from Kalpa", "Sangla Valley & Chitkul", "Nako Lake & High Villages", "Baspa & Sutlej River Landscapes"],
    attractions: [
      { name: "Kalpa & Reckong Peo", description: "Kalpa and Reckong Peo are located close to each other, with Reckong Peo serving as the district headquarters. Kalpa is particularly known for its spectacular views of the Kinner Kailash mountain range, especially around sunrise and sunset." },
      { name: "Sangla & Chitkul", description: "Sangla Valley is known for its dramatic Himalayan landscapes and traditional villages. Chitkul is one of the last inhabited villages near the India-China border and is famous for its remote setting, traditional character and spectacular mountain scenery." },
      { name: "Nako", description: "Nako is a high-altitude village known for its beautiful lake, mountain scenery and peaceful surroundings. During colder months, the lake can freeze, creating a striking winter landscape." },
      { name: "Chango", description: "Chango is a remote Himalayan village known for its distinctive local culture and high-altitude environment." },
      { name: "Kaurik", description: "Kaurik is located near the India-China border and is a highly restricted area. Access to sensitive border areas may require special permissions. Travelers must follow all applicable government regulations and restrictions." },
    ],
    packagesCount: 0,
    featured: true,
    seoTitle: "Kinnaur Tour Packages | Kalpa, Sangla, Chitkul & Nako",
    seoDescription: "Curated Kinnaur journeys with Rucksack Adventures. Kinner Kailash views, Sangla Valley, Chitkul and high-altitude Himalayan villages.",
  },
  {
    id: "dest-leh-ladakh",
    name: "Leh Ladakh",
    slug: "leh-ladakh",
    region: "Ladakh",
    isDomestic: true,
    shortDescription: "High passes, monasteries, valleys, lakes and dramatic high-altitude landscapes.",
    fullDescription: "Ladakh is a high-altitude Himalayan region known for its dramatic mountains, high passes, monasteries, valleys, lakes and distinctive landscapes. Rucksack Adventures offers opportunities to explore Ladakh through adventure-oriented journeys, road trips, camping, mountain experiences and trekking. Zanskar, a remote Himalayan region within the Ladakh landscape, is known for dramatic mountain terrain, high-altitude landscapes and challenging adventure routes.",
    bestTimeToVisit: "May to September (Road passes open)",
    highlights: ["Pangong Lake & High-Altitude Lakes", "Nubra Valley & Diskit Monastery", "Khardung La High Pass Route", "Thiksey & Leh Monasteries", "Magnetic Hill & Zanskar Routes"],
    attractions: [
      { name: "Khardung La", description: "Khardung La is one of Ladakh's famous high mountain passes and serves as an important route toward the Nubra Valley. The journey offers dramatic mountain landscapes and a memorable high-altitude road experience." },
      { name: "Nubra Valley", description: "Nubra Valley is known for its high-altitude desert landscapes, monasteries, villages and spectacular mountain scenery." },
      { name: "Diskit Monastery", description: "Diskit Monastery is one of the most prominent Buddhist monasteries in Nubra Valley and is known for its hilltop location and large Maitreya Buddha statue." },
      { name: "Pangong Lake", description: "Pangong Lake is one of Ladakh's most famous high-altitude lakes, known for its striking blue waters and dramatic mountain surroundings. The landscape changes dramatically with weather and light, making it a popular destination for photographers and travelers." },
      { name: "Shanti Stupa", description: "Shanti Stupa in Leh offers panoramic views of Leh and the surrounding mountains and is an important Buddhist monument." },
      { name: "Leh Palace", description: "Leh Palace is a historic palace overlooking Leh and is known for its traditional Himalayan architecture and connection to Ladakh's royal history." },
      { name: "Thiksey Monastery", description: "Thiksey Monastery is a prominent Tibetan Buddhist monastery located near Leh and is known for its multi-level architecture, murals, Buddhist artwork and statues." },
      { name: "Hall of Fame", description: "Hall of Fame in Leh is a museum and memorial dedicated to the Indian Armed Forces and includes military history, exhibits and memorabilia." },
      { name: "Shey", description: "Shey is known for its historic palace and monastery and its views over the surrounding Ladakh landscape." },
      { name: "Upshi", description: "Upshi is a village and important road junction southeast of Leh, surrounded by striking Himalayan scenery." },
      { name: "Gya", description: "Gya is a traditional Himalayan village offering opportunities to experience local landscapes, mountain scenery and village life." },
      { name: "Magnetic Hill", description: "Magnetic Hill is a well-known roadside attraction near Leh associated with an optical illusion that can make vehicles appear to move uphill." },
      { name: "Zanskar River", description: "The Zanskar River is known for its dramatic landscapes and adventure opportunities, including rafting experiences in suitable conditions." },
      { name: "Zanskar Treks", description: "Zanskar is known for demanding trekking routes, including the famous Chadar Trek during suitable winter conditions. These routes can involve challenging terrain, extreme cold and rapidly changing conditions, so travelers should choose routes appropriate to their experience and fitness." },
    ],
    packagesCount: 1,
    featured: true,
    seoTitle: "Leh Ladakh Tour Packages & Expeditions | Rucksack Adventures",
    seoDescription: "Curated Ladakh road trips and expeditions. Carefully paced acclimatization, verified boutique camps, and seasoned mountain drivers.",
  },
  {
    id: "dest-lahaul-spiti",
    name: "Lahaul & Spiti",
    slug: "lahaul-spiti",
    region: "Himachal Pradesh",
    isDomestic: true,
    shortDescription: "Remote villages, ancient monasteries and stark high-altitude desert landscapes.",
    fullDescription: "Lahaul & Spiti is a high-altitude Himalayan region known for dramatic landscapes, remote villages, Buddhist monasteries and challenging terrain. The region combines spectacular mountain scenery with distinctive cultural traditions and is particularly attractive to travelers interested in adventure, photography, remote villages and Himalayan culture.",
    bestTimeToVisit: "June to September (high passes open)",
    highlights: ["Key Monastery & Dhankar Gompa", "Tabo & Gue Monasteries", "Chandratal Lake & Kunzum Pass", "Kibber Wildlife Landscapes", "Kaza & Pin Valley Trails"],
    attractions: [
      { name: "Tabo & Gue Monastery", description: "Tabo is known for its historic Buddhist monastery and remarkable Himalayan setting. Gue is known for its remote location and monastery, as well as its unusual historical and cultural significance." },
      { name: "Dhankar Gompa", description: "Dhankar Gompa is dramatically positioned on a cliff above the Spiti Valley and is one of the region's historic Buddhist monasteries." },
      { name: "Key Monastery", description: "Key Monastery is one of Spiti's most recognizable Buddhist monasteries and is located near the Spiti River. Its multi-level structure, murals and Buddhist artwork make it one of the region's major cultural landmarks." },
      { name: "Kibber", description: "Kibber is a high-altitude village known for its surrounding wildlife and dramatic Himalayan landscapes. The region is associated with opportunities to spot wildlife such as the Himalayan ibex and, with considerable luck and appropriate guidance, the elusive snow leopard." },
      { name: "Langza", description: "Langza is a scenic high-altitude village known for its mountain views, traditional homes and fossil-rich surroundings." },
      { name: "Komic", description: "Komic is one of the high-altitude villages in the Spiti region and is known for its spectacular mountain surroundings and remote Himalayan character." },
      { name: "Hikkim", description: "Hikkim is a high-altitude village near Kaza known for its remote setting and famous post office." },
      { name: "Mud Village", description: "Mud Village is an important starting point for trekking routes including the Pin Parvati Trek and Bhaba Pass Trek. The surrounding region is part of the Pin Valley landscape and offers opportunities for experienced trekkers and adventure travelers." },
      { name: "Pin Parvati Trek", description: "The Pin Parvati Trek is a demanding Himalayan trekking route connecting the Pin Valley and Parvati Valley regions. It involves challenging terrain and should be undertaken with appropriate preparation, experienced guides and suitable equipment." },
      { name: "Chandratal", description: "Chandratal, meaning \u201cLake of the Moon\u201d, is a spectacular high-altitude lake known for its crescent-like shape and crystal-clear surroundings." },
      { name: "Kunzum Pass", description: "Kunzum Pass is a high mountain pass connecting the Lahaul and Spiti regions and offers dramatic Himalayan landscapes." },
      { name: "Kaza", description: "Kaza is the main town and administrative centre of Spiti and serves as an important base for exploring the surrounding villages, monasteries and mountain landscapes." },
      { name: "Lahaul", description: "Lahaul offers a combination of mountain valleys, villages, monasteries and less-explored landscapes." },
      { name: "Udaipur & Trilokinath", description: "Udaipur is known for its traditional temples and cultural heritage. Trilokinath Temple is an important religious site located near the Chandrabhaga River and attracts visitors interested in the region's cultural and spiritual traditions." },
      { name: "Keylong", description: "Keylong is the administrative centre of Lahaul and Spiti district and an important stop in the Lahaul region. Nearby monasteries include Kardang, Shashur and Tayul, each offering insight into the region's Buddhist heritage." },
      { name: "Jispa", description: "Jispa is a scenic village in the Bhaga Valley and a popular overnight stop along the Manali-Leh route. Its mountain setting makes it suitable for travelers looking for a peaceful Himalayan stopover." },
      { name: "Sarchu", description: "Sarchu is a well-known high-altitude halt on the Manali-Leh route, surrounded by dramatic mountain landscapes." },
      { name: "Suraj Tal", description: "Suraj Tal is a high-altitude glacial lake near Baralacha La and is one of the scenic highlights of the Lahaul region." },
    ],
    packagesCount: 1,
    featured: true,
    seoTitle: "Lahaul Spiti Tour Packages | Key Monastery, Chandratal & Kaza",
    seoDescription: "Curated Lahaul & Spiti expeditions with Rucksack Adventures. Ancient monasteries, high villages, Chandratal lake and 4x4 mountain routes.",
  },
  {
    id: "dest-manali",
    name: "Manali",
    slug: "manali",
    region: "Himachal Pradesh",
    isDomestic: true,
    shortDescription: "Snow-covered peaks, forests and rivers \u2014 adventure, culture and natural beauty.",
    fullDescription: "Manali is one of Himachal Pradesh's most popular mountain destinations, surrounded by snow-covered peaks, forests, rivers and valleys. Known for its combination of adventure, culture and natural beauty, Manali provides access to a wide range of experiences across the Kullu and surrounding Himalayan regions.",
    bestTimeToVisit: "March to June; December to February for snow",
    highlights: ["Solang Valley Adventures", "Rohtang Pass Mountain Scenery", "Hidimba Temple Cedar Forests", "Parvati Valley: Kasol & Manikaran", "Bijli Mahadev Panoramic Trek"],
    attractions: [
      { name: "Rohtang Pass", description: "Rohtang Pass is a high mountain pass connecting the Kullu Valley with the Lahaul region. Depending on seasonal conditions and government regulations, visitors can experience dramatic snow-covered landscapes and mountain scenery." },
      { name: "Solang Valley", description: "Solang Valley is known for adventure activities and spectacular mountain scenery. Depending on the season, activities may include paragliding, skiing and other outdoor experiences." },
      { name: "Hidimba Temple", description: "Hidimba Temple is a historic wooden temple in Manali dedicated to Hidimba Devi and is surrounded by dense cedar forests." },
      { name: "Manu Temple", description: "Manu Temple is associated with the sage Manu and is located in Old Manali amid a scenic mountain environment." },
      { name: "Vashisht", description: "Vashisht is a village near Manali known for its temple, traditional character and hot springs." },
      { name: "Parvati Valley", description: "Parvati Valley stretches through a spectacular Himalayan landscape and includes destinations such as Kasol, Manikaran and Tosh. The region is also known for trekking routes and scenic mountain villages." },
      { name: "Kasol", description: "Kasol is a popular Himalayan village known for its riverside setting, caf\u00e9s, surrounding forests and access to nearby trekking routes." },
      { name: "Manikaran", description: "Manikaran is known for its religious sites and natural hot springs along the Parvati River." },
      { name: "Malana", description: "Malana is a remote Himalayan village known for its distinctive local culture, traditions and surrounding trekking routes." },
      { name: "Kheerganga", description: "Kheerganga is a popular trekking destination in the Parvati Valley known for its mountain scenery and trekking experience." },
      { name: "Bijli Mahadev", description: "Bijli Mahadev is a mountain temple near Kullu accessible by a scenic trek and known for its panoramic views of the surrounding valleys." },
    ],
    packagesCount: 0,
    featured: true,
    seoTitle: "Manali Tour Packages | Solang Valley, Rohtang & Parvati Valley",
    seoDescription: "Curated Manali holidays with Rucksack Adventures. Solang adventures, Rohtang scenery, temples and Parvati Valley explorations.",
  },
  {
    id: "dest-shimla",
    name: "Shimla",
    slug: "shimla",
    region: "Himachal Pradesh",
    isDomestic: true,
    shortDescription: "Colonial heritage, mountain scenery, local culture and outdoor experiences.",
    fullDescription: "Shimla has evolved from a small Himalayan settlement into one of India's most well-known hill stations and was historically associated with the British colonial summer administration. Today, Shimla combines colonial heritage, mountain scenery, local culture, shopping and access to numerous outdoor experiences.",
    bestTimeToVisit: "March to June; December to January for snow",
    highlights: ["The Mall & The Ridge", "Jakhoo Temple Panoramas", "Viceregal Lodge Heritage", "Kufri & Mashobra Outdoors", "Chail & Naldehra Excursions"],
    attractions: [
      { name: "The Mall & The Ridge", description: "The Mall and The Ridge form the heart of central Shimla and are surrounded by historic buildings, shops, caf\u00e9s, restaurants and cultural landmarks." },
      { name: "Lakkar Bazaar", description: "Lakkar Bazaar is known for local wooden handicrafts, souvenirs and traditional shopping." },
      { name: "Ice Skating Rink", description: "Shimla's historic ice skating rink is known for seasonal natural ice skating." },
      { name: "Jakhoo Temple", description: "Jakhoo Temple is dedicated to Lord Hanuman and is located on Jakhoo Hill, offering panoramic views over Shimla." },
      { name: "Viceregal Lodge", description: "The Viceregal Lodge is an important colonial-era heritage building in Shimla and is known for its distinctive architecture and historical significance." },
      { name: "Mahasu Peak", description: "Mahasu Peak near Kufri offers mountain scenery and trekking opportunities." },
      { name: "Kufri", description: "Kufri is a popular destination near Shimla known for mountain scenery, winter activities and outdoor experiences. Depending on season and local regulations, activities may include skiing and other recreational experiences." },
      { name: "Mashobra", description: "Mashobra is a peaceful Himalayan destination near Shimla surrounded by forests and mountain landscapes. Adventure and outdoor experiences may include camping, rappelling, Burma Bridge, valley crossing, rock climbing and hiking." },
      { name: "Chail", description: "Chail is a historic hill destination known for the Chail Palace, forests, hiking opportunities and its famous cricket ground." },
      { name: "Naldehra", description: "Naldehra is known for its scenic golf course, forested surroundings and horse-riding experiences." },
      { name: "Water Catchment Sanctuary", description: "Shimla's water catchment forest area is known for its dense Himalayan forests, flora and wildlife. Visitors should follow all sanctuary rules and responsible wildlife-viewing practices." },
    ],
    packagesCount: 0,
    featured: true,
    seoTitle: "Shimla Tour Packages | Mall Road, Kufri, Chail & Mashobra",
    seoDescription: "Curated Shimla holidays with Rucksack Adventures, based in Kasumpti, Shimla. Heritage walks, Kufri excursions and outdoor experiences.",
  },
];

export const initialPackages: Package[] = [
  {
    id: "pkg-spiti-circuit",
    title: "The Great Spiti Valley 4x4 Expedition",
    slug: "spiti-valley-expedition",
    destination: "Lahaul & Spiti",
    destinationSlug: "lahaul-spiti",
    duration: "9 Days / 8 Nights",
    travelStyle: "Overland 4x4 & Cultural Immersion",
    price: 34500,
    shortDescription: "Traverse high trans-Himalayan passes, 1,000-year-old Key Monastery, Kunzum La, and the jewel lake of Chandratal.",
    overview: "An overland odyssey crafted for those who revere raw mountain topography. Starting from Shimla through the lush fruit valleys of Kinnaur, crossing the barren heights of Nako and Tabo, and reaching Kaza and Chandratal before descending into Manali.",
    itinerary: [
      { day: 1, title: "Shimla to Sarahan via Narkanda", description: "Ascend past Hatu Peak through apple orchards along the Sutlej river gorge to Sarahan. Evening visit to the 800-year-old wooden Bhimakali Temple.", stay: "Sarahan Heritage Homestay", meals: "Dinner" },
      { day: 2, title: "Sarahan to Sangla & Chitkul", description: "Drive into the breathtaking Baspa Valley. Explore Chitkul, the last inhabited Indian village on the Indo-Tibetan border.", stay: "Sangla River Camp", meals: "Breakfast, Dinner" },
      { day: 3, title: "Sangla to Kalpa with Kinner Kailash Views", description: "Ascend to Kalpa. Watch the afternoon light turn Kinner Kailash peak golden across the Sutlej valley.", stay: "Kalpa Mountain Retreat", meals: "Breakfast, Dinner" },
      { day: 4, title: "Kalpa to Nako & Tabo Monastery", description: "Cross Khab where Spiti and Sutlej meet. Visit Nako lake and proceed to Tabo, home to UNESCO-recognized 996 AD monastery frescoes.", stay: "Tabo Traditional Inn", meals: "Breakfast, Dinner" },
      { day: 5, title: "Tabo to Dhankar & Kaza", description: "Visit the cliff-perched Dhankar monastery overlooking the Spiti river. Continue to Kaza, the administrative heart of the valley.", stay: "Kaza Boutique Lodge", meals: "Breakfast, Dinner" },
      { day: 6, title: "Kaza - Hikkim, Komic & Langza Fossil Village", description: "Send a postcard from the world's highest post office at Hikkim (14,567 ft). Marvel at Buddha statue in Langza against Chau Chau Kang Nilda.", stay: "Kaza Boutique Lodge", meals: "Breakfast, Dinner" },
      { day: 7, title: "Key Monastery, Kibber & Chandratal Lake", description: "Visit iconic Key Gompa. Cross high Kunzum Pass (14,931 ft) to reach the sacred crescent-shaped Moon Lake (Chandratal).", stay: "Chandratal Luxury Dome Camp", meals: "Breakfast, Dinner" },
      { day: 8, title: "Chandratal to Manali via Atal Tunnel", description: "Drive across the rugged boulder fields of Batal and Gramphu, crossing through the engineering marvel of Atal Tunnel to lush Manali.", stay: "Manali Alpine Resort", meals: "Breakfast, Dinner" },
      { day: 9, title: "Departure from Manali / Shimla", description: "Morning breakfast with pine forest views. Transfer back to Chandigarh or Shimla for your onward journey.", stay: "Departure", meals: "Breakfast" },
    ],
    inclusions: [
      "Dedicated 4x4 Toyota Innova / Mahindra Scorpio with experienced mountain chauffeur",
      "8 Nights accommodation in handpicked boutique retreats and verified luxury camps",
      "Daily breakfast and artisanal Himalayan dinners",
      "All inner line permits, environmental fees, and green tax",
      "High-altitude first aid kit and emergency portable oxygen canister",
      "Local Himalayan trip coordinator from Kasumpti, Shimla office"
    ],
    exclusions: [
      "Airfare / Train tickets to and from Chandigarh or Shimla",
      "Personal expenses, laundry, and beverage orders",
      "Monument and monastery entry tickets (approx. INR 300 total)",
      "Travel and medical insurance (available on request)"
    ],
    faqs: [
      { question: "Is Spiti suitable for families with children?", answer: "Spiti reaches altitudes above 14,000 ft. We recommend this circuit for children aged 8 and above due to acclimatization needs. Our itinerary is specifically paced from Shimla to ensure gradual altitude gain." },
      { question: "What is mobile connectivity like in Spiti?", answer: "Jio and BSNL have good connectivity in Kaza and Tabo. Airtel works intermittently. Other networks will have no signal beyond Sangla." }
    ],
    featured: true,
    isInternational: false,
    seoTitle: "Spiti Valley Tour Package from Shimla | 9 Days 4x4 Overland",
    seoDescription: "Experience the real Spiti Valley expedition curated by Shimla-based Rucksack Adventures. Chandratal, Key Monastery, and Chitkul.",
  },
  {
    id: "pkg-kashmir-paradise",
    title: "Kashmir Serenade — Luxury Valley Retreat",
    slug: "kashmir-luxury-valley-retreat",
    destination: "Kashmir",
    destinationSlug: "kashmir",
    duration: "6 Days / 5 Nights",
    travelStyle: "Luxury Leisure & Romantic Escapes",
    price: 28900,
    shortDescription: "Private cedar houseboats on Nigeen Lake, Gulmarg meadow vistas, and pine sanctuaries of Pahalgam.",
    overview: "A graceful exploration of Kashmir's timeless romance. Stay in carved heritage houseboats away from the tourist crowd, glide in private shikaras through water lilies, and gaze at snow-clad Pir Panjal peaks.",
    itinerary: [
      { day: 1, title: "Arrival in Srinagar & Nigeen Houseboat", description: "Warm reception at Srinagar airport. Transfer to luxury carved cedar houseboat on serene Nigeen Lake. Sunset Shikara ride.", stay: "Nigeen Heritage Houseboat", meals: "Dinner" },
      { day: 2, title: "Srinagar Heritage & Mughal Terraces", description: "Explore Shalimar and Nishat Bagh with blooming floral terraces. Afternoon heritage walk through downtown Srinagar woodcraft lanes.", stay: "Srinagar Boutique Hotel", meals: "Breakfast, Dinner" },
      { day: 3, title: "Srinagar to Gulmarg Alpine Meadows", description: "Scenic drive to Gulmarg. Board the famous Phase-1 & Phase-2 Gondola ascending to 13,780 ft above Apharwat Peak.", stay: "Gulmarg Mountain Resort", meals: "Breakfast, Dinner" },
      { day: 4, title: "Gulmarg to Pahalgam Valley of Shepherds", description: "Drive past saffron fields of Pampore and Awantipora ruins to picturesque Pahalgam along the roaring Lidder River.", stay: "Pahalgam Riverside Lodge", meals: "Breakfast, Dinner" },
      { day: 5, title: "Pahalgam - Betaab, Aru & Chandanwari", description: "Private local excursion to the rolling green meadows of Aru Valley, scenic Betaab Valley, and Chandanwari.", stay: "Pahalgam Riverside Lodge", meals: "Breakfast, Dinner" },
      { day: 6, title: "Pahalgam to Srinagar Airport Departure", description: "Breakfast overlooking pine groves. Seamless transfer to Srinagar Airport for your scheduled return flight.", stay: "Departure", meals: "Breakfast" },
    ],
    inclusions: [
      "1 Night on Premium Carved Houseboat (Nigeen Lake) & 4 Nights in 4-Star Mountain Resorts",
      "Private climate-controlled vehicle for the entire itinerary",
      "1-Hour Sunset Shikara Ride on Nigeen Lake",
      "Daily gourmet breakfasts and chef-curated dinners",
      "Airport assistance and round-the-clock ground support"
    ],
    exclusions: [
      "Gondola tickets in Gulmarg (we can pre-book Phase 1 & 2 upon confirmation)",
      "Pony rides and local union taxi in Pahalgam (Aru/Betaab valley)",
      "Personal tips and flight tickets"
    ],
    faqs: [
      { question: "Is Kashmir safe for solo and family travelers?", answer: "Yes, Kashmir welcomes thousands of domestic and global travelers every week. Our vetted private chauffeurs and handpicked luxury stays guarantee utmost safety and comfort throughout." }
    ],
    featured: true,
    isInternational: false,
    seoTitle: "Kashmir Tour Package | 6 Days Luxury Srinagar, Gulmarg, Pahalgam",
    seoDescription: "Book a premium Kashmir vacation with Rucksack Adventures. Private shikara, verified heritage houseboats, and mountain resort stays.",
  },
  {
    id: "pkg-leh-monuments",
    title: "Ladakh Heights & Turquoise Lakes Odyssey",
    slug: "ladakh-turquoise-lakes-odyssey",
    destination: "Leh Ladakh",
    destinationSlug: "leh-ladakh",
    duration: "7 Days / 6 Nights",
    travelStyle: "High Altitude Expedition & Photography",
    price: 38500,
    shortDescription: "Acclimatize in Leh, conquer Khardung La, ride double-humped camels in Nubra, and witness Pangong Tso at sunrise.",
    overview: "Designed with medical-grade acclimatization intervals, this itinerary balances iconic wonders with mindful travel. Stay in boutique Leh heritage suites, luxury glamping tents in Nubra Valley, and lakeside cottages at Pangong.",
    itinerary: [
      { day: 1, title: "Leh Arrival & Mandatory Acclimatization", description: "Fly into Leh Kushok Bakula Rimpochee Airport (11,500 ft). Complete rest in hotel to adapt to altitude.", stay: "Leh Grand Heritage", meals: "Dinner" },
      { day: 2, title: "Leh Sham Valley Monasteries & Hall of Fame", description: "Visit Shey Palace, Thiksey Monastery, and peaceful Shanti Stupa at dusk.", stay: "Leh Grand Heritage", meals: "Breakfast, Dinner" },
      { day: 3, title: "Leh to Nubra Valley via Khardung La (17,982 ft)", description: "Ascend through one of the highest motorable passes in the world. Descend into Nubra Valley; enjoy double-humped camel ride at Hunder sand dunes.", stay: "Nubra Organic Luxury Camp", meals: "Breakfast, Dinner" },
      { day: 4, title: "Diskit Monastery & Turtuk Border Hamlet", description: "Visit 106 ft Maitreya Buddha at Diskit. Excursion to Turtuk, a picturesque Balti village close to the Line of Control.", stay: "Nubra Organic Luxury Camp", meals: "Breakfast, Dinner" },
      { day: 5, title: "Nubra to Pangong Tso via Shyok River Route", description: "Travel along the roaring Shyok river to the majestic Pangong Tso. Watch the waters transform into seven shades of blue.", stay: "Pangong Lakeside Cottages", meals: "Breakfast, Dinner" },
      { day: 6, title: "Pangong Sunrise to Leh via Chang La Pass", description: "Early morning lakeside photography. Cross Chang La (17,590 ft) returning to Leh for last-minute shopping at the Tibetan market.", stay: "Leh Grand Heritage", meals: "Breakfast, Dinner" },
      { day: 7, title: "Leh Airport Departure", description: "Early breakfast and scenic transfer to Leh airport with mountain memories.", stay: "Departure", meals: "Breakfast" },
    ],
    inclusions: [
      "6 Nights accommodation in premium hotels, Swiss luxury camps, and lakeside cottages",
      "Dedicated Toyota Innova Crysta for all transfers and sightseeing",
      "All Inner Line Wildlife and Environmental Permits",
      "Breakfast and Dinner daily at all properties",
      "Dedicated oxygen cylinder and oximeter in vehicle throughout"
    ],
    exclusions: [
      "Flight tickets to/from Leh",
      "Camel rides, ATV quad biking, or river rafting fees",
      "Monument fees and personal camera permits"
    ],
    faqs: [
      { question: "How do I prevent Acute Mountain Sickness (AMS)?", answer: "Our first 24-36 hours are strictly planned for rest in Leh. Drink plenty of water (3-4 liters), avoid alcohol, and consult your doctor for Diamox prior to arrival." }
    ],
    featured: true,
    isInternational: false,
    seoTitle: "Leh Ladakh Tour Package 7 Days | Nubra, Pangong, Khardung La",
    seoDescription: "Premium Leh Ladakh tour with medical-grade acclimatization, luxury camps at Pangong and Nubra, and expert local chauffeurs.",
  },
  {
    id: "pkg-bali-luxury",
    title: "Bali Reverie — Jungle Sanctuaries & Coastal Cliffs",
    slug: "bali-jungle-and-coastal-reverie",
    destination: "Bali",
    destinationSlug: "bali",
    duration: "7 Days / 6 Nights",
    travelStyle: "International Luxury & Wellness",
    price: 52000,
    shortDescription: "Private pool villas in Ubud's rainforest, sacred water temples, Uluwatu sunsets, and Nusa Penida marine cliffs.",
    overview: "An exquisite international escape tailored for couples and relaxed luxury seekers. Experience private jungle breakfasts, artisan silver and batik workshops, secluded beach clubs, and personalized private chauffeur services throughout.",
    itinerary: [
      { day: 1, title: "Arrival in Denpasar & Ubud Villa Check-in", description: "VIP airport reception and private transfer to your secluded luxury jungle villa in Ubud.", stay: "Ubud Private Pool Villa", meals: "Dinner" },
      { day: 2, title: "Tegalalang Rice Terraces & Coffee Plantation", description: "Walk through green tiered paddies of Tegalalang, try the famous Bali swing, and taste fresh Luwak roast coffee.", stay: "Ubud Private Pool Villa", meals: "Breakfast, Dinner" },
      { day: 3, title: "Tirta Empul Cleansing & Kintamani Volcano", description: "Participate in water purification blessings at Tirta Empul. Panoramic lunch overlooking Mount Batur caldera.", stay: "Ubud Private Pool Villa", meals: "Breakfast, Lunch" },
      { day: 4, title: "Ubud to Seminyak Coastal Transition", description: "Transfer to southern Bali's vibrant Seminyak beach strip. Sunset cocktails at premier beachside lounge.", stay: "Seminyak Beach Resort", meals: "Breakfast" },
      { day: 5, title: "Full-Day Nusa Penida Island Excursion", description: "Speedboat to Nusa Penida. Visit Kelingking 'T-Rex' cliff, Angel's Billabong, and Broken Beach.", stay: "Seminyak Beach Resort", meals: "Breakfast, Lunch" },
      { day: 6, title: "Uluwatu Clifftop Temple & Kecak Dance", description: "Leisure morning. Afternoon visit to dramatic 70-meter cliff temple in Uluwatu with sunset Kecak fire dance.", stay: "Seminyak Beach Resort", meals: "Breakfast, Dinner" },
      { day: 7, title: "Departure from Bali", description: "Relaxed breakfast and final souvenir shopping before private transfer to Ngurah Rai International Airport.", stay: "Departure", meals: "Breakfast" },
    ],
    inclusions: [
      "3 Nights in Private Pool Villa (Ubud) + 3 Nights in 5-Star Beach Resort (Seminyak)",
      "Daily gourmet breakfasts and selected specialty dinners",
      "All private airport and inter-destination transfers in air-conditioned van",
      "Private full-day Nusa Penida speedboat tour with lunch",
      "Sim card with high-speed data & English-speaking chauffeur-guide"
    ],
    exclusions: [
      "International flights (India - Bali return)",
      "Bali tourist levy (payable online/on arrival)",
      "Personal expenses and spa treatments"
    ],
    faqs: [
      { question: "Do Indian passport holders need a visa for Bali?", answer: "Indian citizens can obtain a Visa on Arrival (VoA) valid for 30 days, or apply for an e-VoA online before departure. We assist our clients with documentation." }
    ],
    featured: true,
    isInternational: true,
    seoTitle: "Bali Luxury Holiday Package | Ubud Private Pool Villa & Seminyak",
    seoDescription: "Book a curated luxury international vacation to Bali with Rucksack Adventures. Ubud private pool villas, Nusa Penida tour, and VIP transfers.",
  },
  {
    id: "pkg-dubai-opulence",
    title: "Dubai Skyline & Desert Starlight Escapade",
    slug: "dubai-skyline-and-desert-escapade",
    destination: "Dubai",
    destinationSlug: "dubai",
    duration: "5 Days / 4 Nights",
    travelStyle: "International Glamour & Private Safari",
    price: 46500,
    shortDescription: "Stay in 5-star downtown luxury, dine atop the clouds at Burj Khalifa, and glamp in a private desert conservation reserve.",
    overview: "A refined Dubai journey that skips the tourist traps for authentic desert luxury and architectural marvels. Features private yacht cruises along the Marina and tailored shopping itineraries.",
    itinerary: [
      { day: 1, title: "Arrival in Dubai & Private Marina Yacht Cruise", description: "Chauffeur arrival transfer to hotel. Evening private 2-hour luxury yacht cruise admiring illuminated Dubai Marina towers.", stay: "Downtown Dubai 5-Star Luxury", meals: "Dinner" },
      { day: 2, title: "Burj Khalifa VIP 148th Floor & Dubai Mall", description: "Fast-track access to Burj Khalifa At The Top SKY on 148th floor. Watch the famous fountain show from reserved terrace dining.", stay: "Downtown Dubai 5-Star Luxury", meals: "Breakfast, Dinner" },
      { day: 3, title: "Old Dubai Heritage & Luxury Desert Safari", description: "Morning Abra boat ride across Dubai Creek and spice souks. Afternoon 4x4 dune drive in Dubai Desert Conservation Reserve followed by starlit BBQ dinner.", stay: "Downtown Dubai 5-Star Luxury", meals: "Breakfast, Dinner" },
      { day: 4, title: "Museum of the Future & Palm Jumeirah", description: "Entry to architectural wonder Museum of the Future. Afternoon monorail exploration of Palm Jumeirah and Atlantis The Royal promenade.", stay: "Downtown Dubai 5-Star Luxury", meals: "Breakfast" },
      { day: 5, title: "Departure from Dubai", description: "Leisure morning for duty-free shopping. Private airport transfer for onward flight.", stay: "Departure", meals: "Breakfast" },
    ],
    inclusions: [
      "4 Nights in 5-Star Downtown / Marina Hotel",
      "Private Airport Chauffeur Transfers",
      "VIP Access Tickets to Burj Khalifa & Museum of the Future",
      "Private 2-Hour Yacht Charter in Dubai Marina",
      "Heritage Desert Safari with BBQ Dinner & Stargazing",
      "UAE Tourist Visa and Insurance Processing"
    ],
    exclusions: [
      "International flights",
      "Tourism Dirham fee (payable directly to hotel)",
      "Lunches and discretionary tipping"
    ],
    faqs: [
      { question: "Is visa processing included?", answer: "Yes! We handle the complete UAE e-visa processing with guaranteed fast turnaround as part of our tour package." }
    ],
    featured: true,
    isInternational: true,
    seoTitle: "Dubai Holiday Package 5 Days | Burj Khalifa & Desert Safari",
    seoDescription: "Luxury Dubai holiday package curated by Rucksack Adventures. 5-star accommodations, private yacht cruise, and desert safari.",
  }
];

export const initialTreks: Trek[] = [
  {
    id: "trek-chopta-chandrashila",
    name: "Chopta Chandrashila & Deoriatal Trek",
    slug: "chopta-chandrashila-trek",
    region: "Garhwal, Uttarakhand",
    duration: "4 Days / 3 Nights",
    difficulty: "Moderate",
    altitude: "13,123 ft (4,000 m)",
    bestSeason: "April to June & September to December",
    shortDescription: "Climb through rhododendron forests to the highest Shiva shrine at Tungnath and summit Chandrashila for 360-degree Himalayan peaks.",
    overview: "Known as the 'Switzerland of India', Chopta offers emerald alpine meadows framed by towering deodar forests. Ascending beyond the ancient 1000-year-old Tungnath Temple brings you to the summit of Chandrashila, offering staggering vistas of Nanda Devi, Trishul, Kedar Dome, and Chaukhamba.",
    itinerary: [
      { day: 1, title: "Rishikesh to Sari Village & Trek to Deoriatal", description: "Scenic drive alongside the Alaknanda and Mandakini rivers to Sari village. A gentle 2.5 km ascent brings you to the mirror lake of Deoriatal reflecting Mount Chaukhamba.", distance: "2.5 km", altitudeGain: "+1,200 ft" },
      { day: 2, title: "Deoriatal to Chopta through Rhododendron Forests", description: "Trek along the scenic ridge trail traversing thick oak and rhododendron canopies with continuous mountain views.", distance: "14 km", altitudeGain: "+800 ft" },
      { day: 3, title: "Chopta to Tungnath & Chandrashila Summit (13,123 ft)", description: "Pre-dawn start. Ascend stone-paved trail to Tungnath Temple. Continue up the rocky ridge to Chandrashila summit for an unforgettable sunrise.", distance: "8 km round-trip", altitudeGain: "+3,200 ft" },
      { day: 4, title: "Chopta to Rishikesh Return", description: "Post breakfast, descend to base and drive back along Devprayag confluence to Rishikesh for departure.", distance: "Drive" },
    ],
    inclusions: [
      "All trekking permits, forest entry fees, and camping charges",
      "Certified Wilderness First Aid & mountaineering lead guide",
      "All meals on trek (wholesome vegetarian high-energy mountain food)",
      "High-altitude 4-season alpine tents, sleeping bags, and insulated mats",
      "Safety gear: Oxygen cylinder, first aid kit, oximeter, and walkie-talkies"
    ],
    exclusions: [
      "Transport from Delhi to Rishikesh",
      "Backpack offloading charges (INR 1,200 for full trek if needed)",
      "Personal trekking gear (boots, thermal wear, trekking poles)"
    ],
    requirements: [
      "Good cardiovascular fitness (ability to jog 4 km comfortably)",
      "Waterproof trekking shoes with deep lug sole",
      "Warm layered clothing: 2 thermal layers, 1 fleece, 1 down jacket"
    ],
    faqs: [
      { question: "Can beginners do the Chandrashila trek?", answer: "Yes! Chopta Chandrashila is one of the best treks for fit beginners looking to experience high-altitude summits without technical climbing." }
    ],
    featured: true,
    seoTitle: "Chopta Chandrashila Trek 4 Days | Tungnath Summit Uttarakhand",
    seoDescription: "Join Rucksack Adventures for Chopta Chandrashila & Deoriatal trek. Experienced Himalayan guides, premium alpine camping, and safety standards.",
  },
  {
    id: "trek-bhaba-pass",
    name: "Bhaba Pass Trek — Kinnaur to Spiti",
    slug: "bhaba-pass-trek",
    region: "Himachal Pradesh",
    duration: "8 Days / 7 Nights",
    difficulty: "Challenging",
    altitude: "16,105 ft (4,910 m)",
    bestSeason: "July to September",
    shortDescription: "A dramatic crossover trek transitioning from the emerald pine valleys of Kinnaur to the stark trans-Himalayan desert of Spiti.",
    overview: "Few Himalayan routes offer such a startling geographical transition. Starting in Kafnu amidst the lush apple groves and cedar forests of Kinnaur, you climb alongside roaring glacial rivers, cross the 16,105 ft Bhaba Pass, and emerge into the Martian landscape of Spiti Valley at Mudh.",
    itinerary: [
      { day: 1, title: "Shimla to Kafnu via Rampur (Drive)", description: "Meet our expedition team in Shimla. Drive along Hindustan-Tibet road into Kinnaur to reach Kafnu basecamp (7,874 ft).", distance: "200 km drive" },
      { day: 2, title: "Kafnu to Mulling Meadows", description: "Begin trekking through fragrant silver birch and pine forests alongside Bhaba river to reach the picturesque meadow campsite of Mulling.", distance: "11 km", altitudeGain: "+2,750 ft" },
      { day: 3, title: "Mulling to Kara Meadow", description: "Cross glacial streams and ascend over a natural rock bridge. Camp at Kara, a wide valley where Kinnauri horses graze peacefully.", distance: "6 km", altitudeGain: "+1,900 ft" },
      { day: 4, title: "Kara to Phutsirang (Pass Base Camp)", description: "Gradual ascent toward the high moraine. Camp at Phutsirang at the base of Bhaba Pass, surrounded by glaciers.", distance: "5 km", altitudeGain: "+1,800 ft" },
      { day: 5, title: "Phutsirang across Bhaba Pass (16,105 ft) to Baldar", description: "Summit day. Steep push over snowfields and scree to the prayer-flag adorned Bhaba Pass. Dramatic entry into Spiti's Pin Valley.", distance: "12 km", altitudeGain: "+2,000 ft / -3,100 ft" },
      { day: 6, title: "Baldar to Mudh Village & Drive to Kaza", description: "Gentle descent into the scenic mud-brick hamlet of Mudh in Pin Valley. Drive to Kaza for hot showers and comfortable beds.", distance: "6 km trek + 50 km drive" },
      { day: 7, title: "Kaza Local Exploration (Key & Kibber)", description: "Rest and exploration in Spiti. Visit Key Monastery and scenic high-altitude villages.", distance: "Day tour" },
      { day: 8, title: "Kaza to Manali / Shimla Departure", description: "Cross high Kunzum and Rohtang/Atal Tunnel to conclude this epic crossover.", distance: "Drive" },
    ],
    inclusions: [
      "Transport from Shimla to Kafnu and Kaza to Manali",
      "Full alpine camp crew: Mountain Guide, High-altitude Cook, Porters/Mules",
      "All camping gear, dining tent, toilet tents, and sleeping bags",
      "All meals from Day 1 dinner to Day 8 breakfast",
      "Wildlife entry permits and environmental fees"
    ],
    exclusions: [
      "Travel insurance covering high-altitude trekking up to 5,000m",
      "Personal porter for backpack (available at INR 1,500/day)"
    ],
    requirements: [
      "Prior trekking experience above 12,000 ft recommended",
      "High level of physical fitness and endurance",
      "Trekking boots with ankle support and water resistance"
    ],
    faqs: [
      { question: "How difficult is the Bhaba Pass crossover?", answer: "Rated challenging due to crossing a 16,105 ft pass with snow and boulder sections. Pacing and hydration are critical, and our team maintains a 1:4 guide-to-trekker ratio for safety." }
    ],
    featured: true,
    seoTitle: "Bhaba Pass Trek Himachal Pradesh | Kinnaur to Spiti Crossover",
    seoDescription: "Book the Bhaba Pass crossover trek with Shimla's local mountain specialists. Premium gear, experienced local Pahari guides, and safety protocols.",
  },
  {
    id: "trek-indrahar-pass",
    name: "Indrahar Pass Trek — Dhauladhar Crest",
    slug: "indrahar-pass-trek",
    region: "Kangra, Himachal Pradesh",
    duration: "5 Days / 4 Nights",
    difficulty: "Challenging",
    altitude: "14,245 ft (4,342 m)",
    bestSeason: "May to June & September to November",
    shortDescription: "Ascend past Triund and Snowline Cafe over the jagged granite ridgeline of Dhauladhar into the ancient Chamba valley.",
    overview: "Rising dramatically above the Tibetan town of McLeod Ganj, Indrahar Pass is an ancient shepherd trail cutting across the sheer rock face of the Dhauladhar range. At the pass, gaze down onto the lush Kangra Valley on one side and the dramatic Pir Panjal and Mani Mahesh Kailash on the other.",
    itinerary: [
      { day: 1, title: "McLeod Ganj to Triund (9,350 ft)", description: "Start from Bhagsu Nag. Trek through rhododendron and deodar forests to the famous grassy meadow of Triund overlooking Kangra valley.", distance: "9 km", altitudeGain: "+3,200 ft" },
      { day: 2, title: "Triund to Laka Got / Snowline", description: "Ascend toward the snowline ridge. Camp at Laka Got under the towering granite walls of Moon Peak.", distance: "6 km", altitudeGain: "+1,800 ft" },
      { day: 3, title: "Laka Got across Indrahar Pass (14,245 ft) & Return", description: "Alpine pre-dawn push across boulder fields and steep rock gullies to Indrahar Pass. Panoramic summit views before returning to Laka Got.", distance: "11 km round-trip", altitudeGain: "+3,100 ft" },
      { day: 4, title: "Laka Got to Triund / Bhagsu Nag", description: "Descend leisurely through oak forests back toward McLeod Ganj.", distance: "12 km", altitudeGain: "-4,000 ft" },
      { day: 5, title: "Rest Day & McLeod Ganj Departure", description: "Visit Dalai Lama Temple complex and Norbulingka Institute before departure.", distance: "Local" },
    ],
    inclusions: [
      "Experienced certified mountain guide from Dharamshala",
      "High altitude alpine tents, warm sleeping bags, and crampons (if needed for snow)",
      "Freshly prepared meals on trek",
      "Permits and medical safety support"
    ],
    exclusions: [
      "Transport to/from McLeod Ganj",
      "Personal porter services"
    ],
    requirements: [
      "Good leg strength and balance over rocky boulder terrain",
      "Sturdy high-ankle trekking shoes"
    ],
    faqs: [
      { question: "Is there snow on Indrahar Pass?", answer: "Snow remains on the pass until early June. Autumn (September-November) offers crisp clear weather with dry rock scrambling." }
    ],
    featured: true,
    seoTitle: "Indrahar Pass Trek | McLeod Ganj Dhauladhar Range",
    seoDescription: "Challenging Dhauladhar mountain trek from McLeod Ganj to Indrahar Pass. Expert local guides and small-group safety standards.",
  },
  {
    id: "trek-triund",
    name: "Triund Panoramic Ridge Trek",
    slug: "triund-trek",
    region: "Dharamshala, Himachal Pradesh",
    duration: "2 Days / 1 Night",
    difficulty: "Easy",
    altitude: "9,350 ft (2,850 m)",
    bestSeason: "March to December (Except peak monsoon July-August)",
    shortDescription: "The crown jewel trek of Dharamshala. Perfect weekend escape offering front-row seats to the sheer granite Dhauladhar cliffs.",
    overview: "If you have just a weekend in Himachal, the Triund trek delivers unmatched mountain drama in short time. Climb through serene rhododendron woodlands to camp atop a grassy ridge where the snow peaks feel close enough to touch.",
    itinerary: [
      { day: 1, title: "Bhagsu Nag to Triund Ridge", description: "Start from McLeod Ganj. Ascend through oak and deodar canopy with panoramic views of Kangra valley below. Sunset camping on Triund top.", distance: "9 km", altitudeGain: "+3,200 ft" },
      { day: 2, title: "Triund Sunrise & Descent to McLeod Ganj", description: "Witness morning sunlight illumination of Moon Peak. Descend back to McLeod Ganj by early afternoon.", distance: "9 km", altitudeGain: "-3,200 ft" },
    ],
    inclusions: [
      "Alpine dome tent on twin sharing with sleeping bag and mat on Triund ridge",
      "Warm dinner on Day 1 and mountain breakfast on Day 2",
      "Local licensed guide from Dharamshala",
      "Forest department camping permits"
    ],
    exclusions: [
      "Bottled water or soft drinks purchased along the trail cafes",
      "Transport to the starting point in Dharamshala"
    ],
    requirements: [
      "Basic physical fitness; comfortable sneakers or light trail shoes"
    ],
    faqs: [
      { question: "Is Triund open in winter?", answer: "Yes, Triund is accessible in winter and receives snow in January and February. We provide sub-zero sleeping bags and gaiters for snow conditions." }
    ],
    featured: true,
    seoTitle: "Triund Trek Dharamshala | Weekend Camping Package",
    seoDescription: "Experience the famous Triund trek in McLeod Ganj with Rucksack Adventures. Tents, meals, and mountain guide included.",
  }
];

export const initialExperiences: Experience[] = [
  {
    id: "exp-himalayan-adventures",
    name: "High Altitude Himalayan Adventures",
    slug: "himalayan-adventures",
    category: "Adventure",
    shortDescription: "4x4 expeditions across rugged terrain, remote pass crossings, mountain biking, and white-water rapids.",
    fullDescription: "Designed for adrenaline seekers, our adventure portfolio connects you with remote glacial valleys, technical pass treks, and trans-Himalayan cross-country journeys tailored with precision safety.",
    highlights: ["Spiti & Ladakh 4x4 Off-Roading", "Zanskar River Expedition", "High Pass Trekking with Certified Mountaineers", "Chanshal Pass Mountain Biking"],
    featured: true,
  },
  {
    id: "exp-family-holidays",
    name: "Bespoke Family Holidays",
    slug: "family-holidays",
    category: "Family",
    shortDescription: "Comfortable, carefully paced mountain retreats with spacious luxury suites, gentle nature walks, and reliable transport.",
    fullDescription: "Traveling with multiple generations requires thoughtfulness. We craft family itineraries with verified child-friendly stays, private luxury vehicles, relaxed morning schedules, and engaging cultural experiences.",
    highlights: ["Heritage Shimla Toy Train Journey", "Private Apple Orchard Stays in Thanedar", "Safe Shikara & Houseboat Stays in Kashmir", "Dedicated Child-Friendly Sightseeing Pacing"],
    featured: true,
  },
  {
    id: "exp-couple-getaways",
    name: "Romantic Escapes & Honeymoons",
    slug: "couple-getaways",
    category: "Romance",
    shortDescription: "Private pool villas, candlelit forest dinners, panoramic mountain chalets, and secluded valley sanctuaries.",
    fullDescription: "Escape to tranquil hideaways crafted for two. From cliff-side chalets in Himachal gazing at snowcapped peaks to private over-water villas in Bali and tranquil lakeside glamping in Kashmir.",
    highlights: ["Secluded Himalayan Pine Chalets", "Private Sunset Shikara Rides", "Private Candlelit Forest Dinners", "Complimentary Honeymoon Cake & Flower Bed Arrangements"],
    featured: true,
  },
  {
    id: "exp-luxury-escapes",
    name: "Curated Luxury Escapes",
    slug: "luxury-escapes",
    category: "Luxury",
    shortDescription: "Five-star heritage palaces, premier boutique eco-lodges, private helicopter transfers, and dedicated concierge.",
    fullDescription: "For the discerning traveler who values privacy, exceptional architecture, and bespoke culinary mastery. We partner with the finest heritage properties across India and abroad.",
    highlights: ["Wildflower Hall & Oberoi Shimla Stays", "Private Helicopter Transfers for Pilgrimage Circuits", "Boutique Tea Estate Bungalows in Darjeeling", "Personal 24/7 Travel Concierge"],
    featured: true,
  },
  {
    id: "exp-spiritual-journeys",
    name: "Sacred Spiritual Pilgrimages",
    slug: "spiritual-journeys",
    category: "Spiritual",
    shortDescription: "Mindfully planned Pilgrimage Tour circuits to Char Dham, Vaishno Devi, and sacred monastic trails.",
    fullDescription: "Pilgrimages should be seamless, peaceful, and spiritually uplifting. Rucksack Adventures handles all mandatory registrations, medical advisories, VIP passes, helicopter bookings, and comfortable lodgings.",
    highlights: ["Pilgrimage Tour by Helicopter & Trek", "Uttarakhand Char Dham Yatra (Kedarnath, Badrinath, Gangotri, Yamunotri)", "Buddhist Monastic Circuits in Ladakh & Spiti", "Varanasi & Rishikesh Ganga Aarti VIP Access"],
    featured: true,
  },
  {
    id: "exp-road-trips",
    name: "Scenic Himalayan Road Trips",
    slug: "road-trips",
    category: "Road Trips",
    shortDescription: "Curated drive itineraries with seasoned mountain chauffeurs, guaranteed 4x4 vehicles, and scenic photo stops.",
    fullDescription: "The journey is as profound as the destination. Our road trips take you across the most magnificent highway corridors in the world — Manali to Leh, Shimla to Kaza, and Guwahati to Tawang.",
    highlights: ["Shimla to Kinnaur & Spiti 4x4 Loop", "Manali to Leh Highway Traverse", "Shillong to Cherrapunji Waterfall Route", "Flexible Photo & Chai Stops at Scenic Vistas"],
    featured: true,
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: "test-1",
    customerName: "Vikram & Neha Malhotra",
    review: "Rucksack Adventures organized our 9-day Spiti Valley expedition from Shimla. Everything was flawless — the Toyota Innova was immaculate, our driver Bobby was an experienced mountain maestro, and the homestays in Tabo and Kaza were warm and authentic. 8 years of experience shows in every detail.",
    rating: 5,
    date: "October 2025",
    destination: "Spiti Valley",
    tripType: "Family Road Trip"
  },
  {
    id: "test-2",
    customerName: "Dr. Arvind Swaminathan",
    review: "We booked our Pilgrimage Tour package with Rucksack Adventures from Kasumpti, Shimla. The helicopter slots for Kedarnath, the medical paperwork guidance, and the stay arrangements en route were handled with extraordinary diligence. Highly trustworthy team.",
    rating: 5,
    date: "July 2025",
    destination: "Pilgrimage Tour",
    tripType: "Pilgrimage"
  },
  {
    id: "test-3",
    customerName: "Ananya & Rohan Sengupta",
    review: "Our Kashmir honeymoon was beyond magical. The private houseboat in Nigeen Lake was far more peaceful than Dal Lake, and the resort in Gulmarg was world-class. Rucksack Adventures takes the stress completely out of mountain travel.",
    rating: 5,
    date: "September 2025",
    destination: "Kashmir",
    tripType: "Honeymoon"
  },
  {
    id: "test-4",
    customerName: "Captain Alok Rawat (Retd.)",
    review: "Used Rucksack Adventures for multiple taxi transfers between Chandigarh, Shimla, and Kinnaur. Clean vehicles, punctual drivers, no hidden fares, and genuine local knowledge. Best taxi operator in Shimla.",
    rating: 4.8,
    date: "December 2025",
    destination: "Shimla & Kinnaur",
    tripType: "Taxi & Cab Services"
  }
];

export const initialFAQs: FAQ[] = [
  {
    id: "faq-1",
    question: "Where is Rucksack Adventures located?",
    answer: "Our office is at Chotta Shimla to Kusumpti Rd, SDA Complex, Kasumpti, Shimla, Himachal Pradesh 171009. You can visit us in person, or reach out via WhatsApp at 7018678064 or email at curate@rucksackadventures.com.",
    category: "general"
  },
  {
    id: "faq-2",
    question: "What is the best time to visit Himachal Pradesh?",
    answer: "March to June is ideal for pleasant weather, apple orchards, and outdoor activities. September to November offers crystal-clear mountain views and autumn colors. December to February is perfect for snow lovers in Shimla, Manali, and Kufri. Spiti Valley is best from May to September when road passes are open.",
    category: "general"
  },
  {
    id: "faq-3",
    question: "How do custom package bookings work?",
    answer: "After you submit an enquiry, our destination planner contacts you within 4 hours to understand your dates, group size, budget, and preferences. We then craft a day-wise itinerary with transparent pricing. Once confirmed, we share a detailed booking voucher and handle all logistics end-to-end.",
    category: "booking"
  },
  {
    id: "faq-4",
    question: "What payment methods do you accept?",
    answer: "We accept UPI (Google Pay, PhonePe, Paytm), bank NEFT/RTGS transfers, credit and debit cards, and cash at our Shimla office. For advance bookings, we typically request a 30% deposit with the balance due 7 days before travel.",
    category: "booking"
  },
  {
    id: "faq-5",
    question: "What is included in a tour package?",
    answer: "Our packages typically include accommodation in verified hotels or homestays, all ground transfers in private vehicles, daily breakfast and dinner, sightseeing as per itinerary, applicable permits and entry fees, and a dedicated trip coordinator. International packages also include visa assistance and airport transfers.",
    category: "booking"
  },
  {
    id: "faq-6",
    question: "Do you provide taxi and intercity cab services from Shimla?",
    answer: "Yes. We manage a fleet of sedans (Dzire/Etios), premium SUVs (Innova Crysta, Scorpio), and tempo travelers for Chandigarh-Shimla, Kinnaur, Spiti, Manali, and local sightseeing. All vehicles are commercially licensed with experienced mountain chauffeurs.",
    category: "cabs"
  },
  {
    id: "faq-7",
    question: "How do I reach Shimla from Delhi or Chandigarh?",
    answer: "From Delhi, you can take an overnight Volvo bus (approx. 8 hours), the Kalka-Shimla toy train (approx. 10 hours), or fly to Shimla airport. From Chandigarh, it is a 4-hour drive by taxi or bus. We can arrange pick-up from any of these points.",
    category: "general"
  },
  {
    id: "faq-8",
    question: "What safety equipment is provided on high-altitude treks?",
    answer: "Every trek is led by certified mountaineering guides. We carry portable oxygen cylinders, pulse oximeters, high-altitude medical kits, and satellite communication devices. Our guide-to-trekker ratio is 1:4 on challenging routes.",
    category: "treks"
  },
  {
    id: "faq-9",
    question: "What should I pack for a Himalayan trek?",
    answer: "Essentials include waterproof trekking boots with ankle support, 2-3 thermal layers, a fleece jacket, down jacket, rain poncho, sunscreen SPF 50+, sunglasses, headlamp, reusable water bottle, and personal medication. We share a detailed packing list after booking confirmation.",
    category: "treks"
  },
  {
    id: "faq-10",
    question: "What is the typical group size for treks and tours?",
    answer: "Our small-group treks have 8-12 participants for a personalized experience. Private tours can be arranged for solo travelers, couples, families, or groups of any size. We also offer exclusive luxury tours with dedicated guides and vehicles.",
    category: "treks"
  },
  {
    id: "faq-11",
    question: "Do I need travel insurance for Himalayan trips?",
    answer: "We strongly recommend travel insurance that covers high-altitude trekking up to 5,000 meters, medical emergencies, and trip cancellation. We can suggest suitable insurance providers upon request. It is mandatory for all our high-altitude trek expeditions.",
    category: "general"
  },
  {
    id: "faq-12",
    question: "Are your packages suitable for families with children?",
    answer: "Absolutely. We design family-friendly itineraries with comfortable pacing, child-safe accommodations, private vehicles, and gentle sightseeing. For high-altitude treks like Spiti or Ladakh, we recommend children aged 8 and above due to acclimatization requirements.",
    category: "booking"
  }
];
