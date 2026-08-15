import { Helmet } from 'react-helmet-async';

export default function Seo({ title, description, canonical }) {
  const fullTitle = title ? `${title} | KK Global Trade` : 'KK Global Trade | Indian Agricultural Exporter';
  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {canonical && <link rel="canonical" href={canonical} />}
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content="website" />
    </Helmet>
  );
}
