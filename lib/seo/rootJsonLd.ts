export const ROOT_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Coolinarka",
  url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  description:
    "Coolinarka je platforma za ljubitelje kuhanja. Pronađite recepte, savjete i ideje za pripremu jela.",
  publisher: {
    "@type": "Organization",
    name: "Enterwell Team",
    logo: {
      "@type": "ImageObject",
      url: `${process.env.NEXT_PUBLIC_CDN_BASE_URL}/logo.png`,
    },
  },
  potentialAction: {
    "@type": "SearchAction",
    target: `${process.env.NEXT_PUBLIC_BASE_URL}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};
