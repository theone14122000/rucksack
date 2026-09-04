import { Destination, Package, Trek, Experience, Testimonial, FAQ, SiteSettings } from "./types";

export const initialSiteSettings: SiteSettings = {
  brandName: "Rucksack Adventures",
  tagline: "Curated Journeys Across the Himalayas and Beyond",
  location: "Mehli, Shimla, Himachal Pradesh, India",
  address: "Near Mehli Chowk, Mehli, Shimla, Himachal Pradesh 171013, India",
  phone: "+91 98160 34567",
  alternatePhone: "+91 94180 89123",
  whatsapp: "+91 98160 34567",
  email: "curate@rucksackadventures.com",
  experienceYears: "8+",
  rating: 4.6,
  ratingsCount: 242,
  curatedJourneysCount: "3,800+",
  socialLinks: {
    instagram: "https://instagram.com/rucksackadventures",
    facebook: "https://facebook.com/rucksackadventures",
    twitter: "https://x.com/rucksackadv",
  },
  seoDefaults: {
    title: "Rucksack Adventures | Premium Travel Agency in Shimla, Himachal Pradesh",
    description: "Explore curated Himalayan journeys, custom tour packages, trekking expeditions, Amarnath Yatra, and trusted taxi services from Mehli, Shimla with 8+ years of expertise.",
    keywords: [
      "travel agency in Shimla",
      "Himachal tour packages",
      "Kashmir tour packages",
      "Leh Ladakh tour packages",
      "Himalayan trekking expeditions",
      "Shimla taxi service",
      "Amarnath Yatra tour",
      "Rucksack Adventures",
    ],
  },
};

export const initialDestinations: Destination[] = [
  {
    id: "dest-himachal",
    name: "Himachal Pradesh",
    slug: "himachal-pradesh",
    region: "Western Himalayas",
    isDomestic: true,
    shortDescription: "Cedar-clad slopes, glacial valleys, historic hill stations, and sacred trans-Himalayan high passes.",
    fullDescription: "From the colonial grandeur of Shimla and the apple orchards of Kinnaur to the stark high-altitude deserts of Spiti Valley and alpine meadows of Kullu-Manali, Himachal Pradesh is the home ground of Rucksack Adventures. Having lived and traveled here for over eight years, our local team crafts immersive itineraries away from tourist congestion.",
    bestTimeToVisit: "March to June (Summer) & September to November (Autumn / Clear Skies)",
    highlights: ["Spiti Valley Monasteries", "Kinnaur Apple Valleys", "Shimla Heritage Walks", "Jibhi & Tirthan Trout Streams", "Chanshal Pass Exploration"],
    packagesCount: 8,
    treksCount: 6,
    featured: true,
    seoTitle: "Himachal Pradesh Tour Packages | Local Shimla Tour Operator",
    seoDescription: "Customized Himachal Pradesh holidays curated by local experts in Shimla. Spiti Valley, Kinnaur, Manali, Dharamshala, and offbeat valley journeys.",
  },
  {
    id: "dest-kashmir",
    name: "Kashmir",
    slug: "kashmir",
    region: "Northern Himalayas",
    isDomestic: true,
    shortDescription: "Reflective waters of Dal Lake, saffron fields of Pampore, alpine pine groves, and snow peaks of Gulmarg.",
    fullDescription: "Known as paradise on earth, Kashmir captivates with historic Mughal gardens, quiet shikaras gently rippling on morning waters, world-renowned powder snow in Gulmarg, and the pastoral beauty of Pahalgam and Betaab Valley. Our Kashmir journeys emphasize verified luxury stays and vetted local drivers.",
    bestTimeToVisit: "April to October for pleasant weather, December to February for snow",
    highlights: ["Private Houseboat Stays in Nigeen Lake", "Gulmarg Gondola & Alpine Skiing", "Pahalgam Betaab Valley Traverses", "Old Srinagar Artisan Heritage Trails", "Doodhpathri Meadow Walks"],
    packagesCount: 6,
    treksCount: 2,
    featured: true,
    seoTitle: "Kashmir Tour Packages | Curated Srinagar, Gulmarg & Pahalgam",
    seoDescription: "Handcrafted Kashmir tours by Rucksack Adventures. Authentic houseboats, private luxury transfers, and curated mountain excursions.",
  },
  {
    id: "dest-ladakh",
    name: "Leh Ladakh",
    slug: "leh-ladakh",
    region: "Trans-Himalayan Plateau",
    isDomestic: true,
    shortDescription: "High mountain passes, turquoise lakes at 14,000 feet, centuries-old gompas, and dramatic moonscapes.",
    fullDescription: "Leh Ladakh represents the summit of adventure in the subcontinent. Journey across Khardung La and Chang La, witness the sunset shifting colors across Pangong Tso, navigate the sand dunes of Hunder in Nubra Valley, and experience ancient Buddhist chanting inside Hemis and Thiksey monasteries.",
    bestTimeToVisit: "May to September (Road passes open)",
    highlights: ["Pangong Tso & Tso Moriri High Lakes", "Nubra Valley Double-Humped Camel Trails", "Khardung La Pass (17,982 ft)", "Ancient Monasteries of Hemis & Diskit", "Zanskar Valley Hidden Villages"],
    packagesCount: 5,
    treksCount: 4,
    featured: true,
    seoTitle: "Leh Ladakh Tour Packages & Expeditions | Rucksack Adventures",
    seoDescription: "Curated Ladakh road trips and expeditions. Carefully paced acclimatization, verified boutique camps, and seasoned mountain drivers.",
  },
  {
    id: "dest-uttarakhand",
    name: "Uttarakhand",
    slug: "uttarakhand",
    region: "Central Himalayas",
    isDomestic: true,
    shortDescription: "Sacred confluences of the Ganga, bugyals of Auli and Chopta, and dramatic Himalayan sanctuaries.",
    fullDescription: "Devbhoomi Uttarakhand holds a rare balance of quiet spirituality and rugged alpine drama. From tranquil ashrams on the banks of Rishikesh to the pristine meadows of Chopta, the mirror lake of Deoriatal, and the ski slopes of Auli gazing upon Nanda Devi.",
    bestTimeToVisit: "March to June & September to November",
    highlights: ["Chopta & Tungnath Ridge Walks", "Auli Ski Slopes & Nanda Devi Panoramas", "Rishikesh Riverside Retreats", "Valley of Flowers UNESCO Biosphere", "Char Dham Spiritual Circuits"],
    packagesCount: 5,
    treksCount: 5,
    featured: true,
    seoTitle: "Uttarakhand Holiday Packages & High Mountain Treks",
    seoDescription: "Bespoke Uttarakhand travel packages. Auli, Rishikesh, Mussoorie, Chopta, and spiritual Himalayan journeys.",
  },
  {
    id: "dest-northeast",
    name: "North East India",
    slug: "north-east",
    region: "Eastern Himalayas",
    isDomestic: true,
    shortDescription: "Living root bridges of Meghalaya, tea hills of Assam, monasteries of Sikkim, and cloud valleys of Arunachal.",
    fullDescription: "North East India is an uncharted wilderness of extraordinary biodiversity and indigenous traditions. Our curated journeys span Sikkim's Kanchenjunga vistas, Meghalaya's crystal-clear Umngot river in Dawki, Assam's UNESCO rhinos in Kaziranga, and the dramatic monasteries of Tawang in Arunachal Pradesh.",
    bestTimeToVisit: "October to April",
    highlights: ["Meghalaya Double Decker Living Root Bridges", "Kaziranga One-Horned Rhino Safaris", "Tawang Monastery & Sela Pass (Arunachal)", "Pelling & Gangtok Kanchenjunga Horizons (Sikkim)", "Majuli River Island Cultural Immersion"],
    packagesCount: 4,
    treksCount: 3,
    featured: true,
    seoTitle: "North East India Tour Packages | Sikkim, Meghalaya & Assam",
    seoDescription: "Discover North East India with Rucksack Adventures. Tailored itineraries across Sikkim, Meghalaya, Assam, and Arunachal Pradesh.",
  },
  {
    id: "dest-bali",
    name: "Bali",
    slug: "bali",
    region: "Southeast Asia",
    isDomestic: false,
    shortDescription: "Emerald rice terraces in Ubud, clifftop temples of Uluwatu, and secluded volcanic shores.",
    fullDescription: "An island of deep spirituality, world-class private pool villas, and lush jungle sanctuaries. Our Bali escapes balance cultural immersion in Ubud with coastal leisure in Seminyak, Uluwatu, and day excursions to Nusa Penida's iconic cliffs.",
    bestTimeToVisit: "April to October",
    highlights: ["Ubud Hanging Gardens & Jungle Villas", "Nusa Penida Kelingking Coastal Excursion", "Tirta Empul Holy Water Blessings", "Uluwatu Clifftop Sunset & Kecak Dance", "Mount Batur Sunrise Trek"],
    packagesCount: 3,
    featured: true,
    seoTitle: "Bali Luxury & Adventure Tour Packages | Rucksack Adventures",
    seoDescription: "Curated international holidays to Bali. Boutique resort bookings, private transfers, and personalized island itineraries.",
  },
  {
    id: "dest-dubai",
    name: "Dubai",
    slug: "dubai",
    region: "Middle East",
    isDomestic: false,
    shortDescription: "Desert dunes under starlight, architectural marvels, super-yacht marinas, and Arabian hospitality.",
    fullDescription: "Experience modern opulence intertwined with Arabian heritage. From private desert glamping beneath starlit skies to panoramic dining in Burj Khalifa and luxury yacht cruises along Dubai Marina.",
    bestTimeToVisit: "November to March",
    highlights: ["Private Conservation Reserve Desert Safari", "Burj Khalifa At The Top VIP Experience", "Dubai Marina Yacht Charter", "Old Dubai Gold & Spice Souk Walking Trails", "Museum of the Future Interactive Access"],
    packagesCount: 3,
    featured: true,
    seoTitle: "Dubai Luxury Holiday Packages | Rucksack Adventures",
    seoDescription: "Tailored Dubai tours featuring premier desert resorts, skyline panoramas, and seamless visa assistance.",
  },
  {
    id: "dest-thailand",
    name: "Thailand",
    slug: "thailand",
    region: "Southeast Asia",
    isDomestic: false,
    shortDescription: "Karst limestone islands in Krabi, turquoise Andaman coves, serene Buddhist temples, and culinary artistry.",
    fullDescription: "Whether seeking island solitude in Koh Samui, sea-kayaking among the towering limestone sea-stacks of Phang Nga Bay, or exploring the historic canal communities of Bangkok, our Thailand journeys are designed for discerning travelers.",
    bestTimeToVisit: "November to April",
    highlights: ["Private Longtail Boat Charters in Krabi", "Phuket Luxury Villa Stays", "Bangkok Historic Riverfront Boutique Hotels", "Phi Phi Islands Early-Access Excursion", "Elephant Sanctuaries in Chiang Mai"],
    packagesCount: 4,
    featured: true,
    seoTitle: "Thailand Bespoke Island & Cultural Packages",
    seoDescription: "Customized Thailand tour packages from India. Phuket, Krabi, Bangkok, and private island hopping.",
  },
  {
    id: "dest-singapore",
    name: "Singapore",
    slug: "singapore",
    region: "Southeast Asia",
    isDomestic: false,
    shortDescription: "Futuristic supertrees, Michelin dining, lush garden city sanctuaries, and curated island entertainment.",
    fullDescription: "A modern metropolis surrounded by rainforest preserves. Discover Gardens by the Bay, luxury shopping along Orchard Road, and family adventures at Sentosa Island, all curated with seamless hotel and transport arrangements.",
    bestTimeToVisit: "Year-Round",
    highlights: ["Gardens by the Bay Cloud Forest", "Marina Bay Sands SkyPark", "Sentosa Island VIP Access", "Night Safari Wildlife Tour", "Peranakan Heritage & Culinary Walks"],
    packagesCount: 2,
    featured: false,
    seoTitle: "Singapore City & Family Holiday Packages",
    seoDescription: "Tailored Singapore vacation packages with hotel, transfer, and attraction passes included.",
  },
  {
    id: "dest-malaysia",
    name: "Malaysia",
    slug: "malaysia",
    region: "Southeast Asia",
    isDomestic: false,
    shortDescription: "Ancient rainforests of Langkawi, colonial charms of Penang, and twin towers of Kuala Lumpur.",
    fullDescription: "From the dramatic skyline of Kuala Lumpur to the UNESCO heritage streets of George Town in Penang and the geoparks of Langkawi, Malaysia offers a rich tapestry of natural beauty and culinary distinction.",
    bestTimeToVisit: "March to October",
    highlights: ["Langkawi Geopark & Mangrove Cruises", "Petronas Twin Towers & Skybridge", "Penang Street Art & Heritage Walk", "Batu Caves Cultural Site", "Genting Highlands Cable Car"],
    packagesCount: 2,
    featured: false,
    seoTitle: "Malaysia Tour Packages | Kuala Lumpur & Langkawi",
    seoDescription: "Curated Malaysia holiday packages. Island leisure, city breaks, and seamless transit.",
  },
  {
    id: "dest-andaman",
    name: "Andaman & Nicobar",
    slug: "andaman-nicobar",
    region: "Bay of Bengal",
    isDomestic: true,
    shortDescription: "Radhanagar beach sunsets, coral reef dives in Havelock, and historical maritime sanctuaries.",
    fullDescription: "Pristine white sand beaches, vibrant coral reefs, and calm azure waters. Experience Havelock's famed dive sites, Neil Island's tranquility, and Port Blair's historic Cellular Jail.",
    bestTimeToVisit: "October to May",
    highlights: ["Radhanagar Beach Sunset Sanctuary", "Elephant Beach Snorkeling & Scuba", "Private Catamaran Transfers (Makruzz)", "Neil Island Coral Bridges", "Cellular Jail Sound & Light Memorial"],
    packagesCount: 3,
    featured: false,
    seoTitle: "Andaman Islands Holiday Packages | Havelock & Neil",
    seoDescription: "Exquisite island vacations in Andaman. Verified beach resorts, scuba excursions, and luxury ferry tickets.",
  }
];

export const initialPackages: Package[] = [
  {
    id: "pkg-spiti-circuit",
    title: "The Great Spiti Valley 4x4 Expedition",
    slug: "spiti-valley-expedition",
    destination: "Himachal Pradesh",
    destinationSlug: "himachal-pradesh",
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
      "Local Himalayan trip coordinator from Mehli, Shimla office"
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
    highlights: ["Wildflower Hall & Oberoi Shimla Stays", "Private Helicopter Transfers to Kedarnath & Amarnath", "Boutique Tea Estate Bungalows in Darjeeling", "Personal 24/7 Travel Concierge"],
    featured: true,
  },
  {
    id: "exp-spiritual-journeys",
    name: "Sacred Spiritual Pilgrimages",
    slug: "spiritual-journeys",
    category: "Spiritual",
    shortDescription: "Mindfully planned pilgrimages to Amarnath Yatra, Char Dham, Vaishno Devi, and sacred monastic circuits.",
    fullDescription: "Pilgrimages should be seamless, peaceful, and spiritually uplifting. Rucksack Adventures handles all mandatory registrations, medical advisories, VIP passes, helicopter bookings, and comfortable lodgings.",
    highlights: ["Amarnath Yatra by Helicopter & Trek", "Uttarakhand Char Dham Yatra (Kedarnath, Badrinath, Gangotri, Yamunotri)", "Buddhist Monastic Circuits in Ladakh & Spiti", "Varanasi & Rishikesh Ganga Aarti VIP Access"],
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
    review: "We booked our Amarnath Yatra package with Rucksack Adventures from Mehli, Shimla. The helicopter slots from Baltal, the medical paperwork guidance, and the stay arrangements in Sonamarg were handled with extraordinary diligence. Highly trustworthy team.",
    rating: 5,
    date: "July 2025",
    destination: "Amarnath Yatra",
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
    answer: "Our physical operations center and office is based at Mehli Chowk, Mehli, Shimla, Himachal Pradesh (PIN 171013). We welcome travelers to visit us or reach out via WhatsApp and phone.",
    category: "general"
  },
  {
    id: "faq-2",
    question: "How do custom package bookings work?",
    answer: "Every journey is customized to your preferences. After you submit an enquiry, our senior destination planner contacts you within 4 hours to understand your travel dates, group size, and hotel preferences. We then provide a transparent day-wise itinerary and quote.",
    category: "booking"
  },
  {
    id: "faq-3",
    question: "Do you provide taxi and intercity cab services from Shimla?",
    answer: "Yes, taxi services are one of our core pillars. We manage a fleet of commercially licensed sedans (Dzire/Etios), premium SUVs (Innova Crysta), and tempo travelers for Chandigarh-Shimla transfers, Kinnaur, Spiti, local Shimla sightseeing, and Manali routes.",
    category: "cabs"
  },
  {
    id: "faq-4",
    question: "What safety equipment is provided on high-altitude treks?",
    answer: "Every mountain trek is led by certified mountaineering guides. We carry medical-grade portable oxygen cylinders, fingertip pulse oximeters, hyperbaric safety protocols, and comprehensive high-altitude medical kits.",
    category: "treks"
  },
  {
    id: "faq-5",
    question: "What is your cancellation and refund policy?",
    answer: "We maintain flexible, fair booking terms. Cancellations made 30+ days prior to travel receive an 85% refund; 15-29 days receive a 50% refund. High altitude permit and air/train tickets follow airline and government refund rules.",
    category: "cancellation"
  },
  {
    id: "faq-6",
    question: "How do you assist with the Amarnath Yatra?",
    answer: "We manage complete Amarnath Yatra packages including helicopter ticket booking (Pahalgam or Baltal), compulsory health certificate guidance, verified hotel and luxury tent bookings, and ground taxi transfers from Srinagar or Jammu.",
    category: "booking"
  }
];
