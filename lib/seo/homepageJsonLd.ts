export const homepageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Coolinarika",
  url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  description:
    "Coolinarika je platforma za ljubitelje kuhanja. Pronađite recepte, savjete i ideje za kuhanje.",
  publisher: {
    "@type": "Organization",
    name: "Enterwell Team",
    logo: {
      "@type": "ImageObject",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/public/cdn/logo.png`,
    },
  },
  potentialAction: {
    "@type": "SearchAction",
    target: `${process.env.NEXT_PUBLIC_BASE_URL}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};
