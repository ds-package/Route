import React from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";

export function MetaTag({
  title,
  description,
  name,
  url,
  customUrl,
  type,
  ogImage,
}) {
  return (
    <HelmetProvider>
      <Helmet>
        {/* Standard metadata tags */}
        <title>{title}</title>
        <meta name="description" content={description} />

        {/* Facebook tags */}
        <meta property="og:title" content={title} />
        <meta property="og:site_name" content={name} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content={type} />

        {/* Twitter tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta property="twitter:domain" content={customUrl} />
        <meta property="twitter:url" content={url} />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>
    </HelmetProvider>
  );
}

export default MetaTag;
