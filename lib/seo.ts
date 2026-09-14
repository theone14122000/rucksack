import { initialSiteSettings } from "./cms/seed-data";

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["TravelAgency", "LocalBusiness"],
    name: initialSiteSettings.brandName,
    description: initialSiteSettings.seoDefaults.description,
    url: "https://rucksackadventures.com",
    telephone: initialSiteSettings.phone,
    email: initialSiteSettings.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Chotta Shimla to Kusumpti Rd, SDA Complex, Kasumpti",
      addressLocality: "Shimla",
      addressRegion: "Himachal Pradesh",
      postalCode: "171009",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 31.0783,
      longitude: 77.1856,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: initialSiteSettings.rating.toString(),
      reviewCount: initialSiteSettings.ratingsCount.toString(),
      bestRating: "5",
      worstRating: "1",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "08:00",
        closes: "20:00",
      },
    ],
    sameAs: [
      initialSiteSettings.socialLinks.instagram,
      initialSiteSettings.socialLinks.facebook,
      initialSiteSettings.socialLinks.youtube,
      initialSiteSettings.socialLinks.linkedin,
    ].filter(Boolean),
  };
}

export function getTouristDestinationSchema(destination: {
  name: string;
  description: string;
  region: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: destination.name,
    description: destination.description,
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: destination.region,
    },
    url: destination.url,
  };
}

export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
