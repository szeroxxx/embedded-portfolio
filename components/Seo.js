import Head from 'next/head';
import { SITE_URL, personSchema, websiteSchema } from '../lib/site.mjs';

export default function Seo({ title, description, path = '/', image = '/media/pcb-workbench-hero.png', imageAlt = 'Dhara Rajpura — PCB and embedded hardware engineering', schema = [], type = 'website', noindex = false }) {
  const canonical = `${SITE_URL}${path === '/' ? '/' : path.replace(/\/$/, '')}`;
  const imageUrl = image.startsWith('https://') ? image : `${SITE_URL}${image}`;
  const extra = Array.isArray(schema) ? schema : [schema];
  const graph = { '@context': 'https://schema.org', '@graph': [
    personSchema, websiteSchema,
    { '@type': 'WebPage', '@id': `${canonical}#webpage`, url: canonical, name: title,
      description, isPartOf: { '@id': websiteSchema['@id'] }, about: { '@id': personSchema['@id'] }, inLanguage: 'en' },
    ...extra,
  ] };
  const preview = process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production';
  return <Head>
    <title>{title}</title>
    <meta name="description" content={description} key="description" />
    <meta name="robots" content={noindex || preview ? 'noindex,follow' : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'} key="robots" />
    <meta name="theme-color" content="#090b0b" />
    <meta name="author" content="Dhara Rajpura" />
    <link rel="canonical" href={canonical} key="canonical" />
    <meta property="og:type" content={type} />
    <meta property="og:site_name" content="Dhara Rajpura" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonical} />
    <meta property="og:image" content={imageUrl} />
    <meta property="og:image:alt" content={imageAlt} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={imageUrl} />
    <meta name="twitter:image:alt" content={imageAlt} />
    {process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION} />}
    {process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION && <meta name="msvalidate.01" content={process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION} />}
    <script type="application/ld+json" key="structured-data" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, '\\u003c') }} />
  </Head>;
}
