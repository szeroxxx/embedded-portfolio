import { articles } from '../lib/blog.mjs';
import { SITE_URL } from '../lib/site.mjs';
import { projectsData } from '../lib/projects.mjs';
import { servicesData } from '../lib/services.mjs';
const escapeXml = value => value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
export default function Sitemap() { return null; }
export async function getServerSideProps({res}) {
  const paths=['/','/about','/services','/projects','/contact','/blog',...articles.map(article=>'/blog/'+article.slug),...servicesData.map(s=>'/services/'+s.slug),...projectsData.map(p=>'/projects/'+p.slug)];
  const lastModified = new Map(articles.map(article => ['/blog/' + article.slug, article.date]));
  const xml='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+paths.map(p=>'<url><loc>'+escapeXml(SITE_URL+p)+'</loc>'+(lastModified.has(p)?'<lastmod>'+lastModified.get(p)+'</lastmod>':'')+'</url>').join('')+'</urlset>';
  res.setHeader('Content-Type','application/xml; charset=utf-8');
  res.setHeader('Cache-Control','public, s-maxage=3600, stale-while-revalidate=86400');
  res.write(xml);res.end();return {props:{}};
}
