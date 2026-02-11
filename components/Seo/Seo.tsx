import { Metadata } from "next";
import Script from "next/script";

interface SeoProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  twitterHandle?: string;
  jsonLd?: Record<string, any>;
}

export default function Seo({
  title,
  description,
  canonical,
  ogImage,
  twitterHandle,
  jsonLd,
}: SeoProps) {
  const defaultOgImage = "/og-image-default.png";
  const defaultTwitterHandle = "@coolinarika";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage || defaultOgImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage || defaultOgImage} />
      <meta
        name="twitter:site"
        content={twitterHandle || defaultTwitterHandle}
      />

      {jsonLd && (
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="afterInteractive"
        />
      )}
    </>
  );
}
