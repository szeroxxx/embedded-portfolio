import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { SITE_URL, PERSON_ID } from '../lib/site.mjs';
import { projectsData } from '../lib/projects.mjs';
import { servicesData } from '../lib/services.mjs';

const base = (process.argv[2] || 'http://localhost:4300').replace(/\/$/, '');
const paths = ['/', '/about', '/services', '/projects', '/contact', ...servicesData.map(s => `/services/${s.slug}`), ...projectsData.map(p => `/projects/${p.slug}`)];
const results = [], titles = new Set(), localLinks = new Set();
for (const path of paths) {
  const response = await fetch(base + path, { signal: AbortSignal.timeout(20000) });
  assert.equal(response.status, 200, `${path} must load`);
  const html = await response.text();
  const body = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
  const title = html.match(/<title[^>]*>(.*?)<\/title>/)?.[1];
  assert(title && !titles.has(title), `Unique title: ${path}`); titles.add(title);
  const head = html.slice(0, html.indexOf('</head>'));
  assert(head.includes(`href="${SITE_URL}${path}"`), `Canonical URL: ${path}`);
  assert(head.match(/name="description"[^>]+content="[^"\n]+"/), `Description: ${path}`);
  assert(head.includes('property="og:url"') && head.includes('name="twitter:card"'), `Share metadata: ${path}`);
  assert(!/noindex/.test(head.match(/name="robots"[^>]+>/)?.[0] || ''), `Indexable public page: ${path}`);
  assert.equal((body.match(/<h1\b/g) || []).length, 1, `Single h1: ${path}`);
  const json = html.match(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/)?.[1];
  assert(json, `Structured data: ${path}`);
  const graph = JSON.parse(json)['@graph'];
  assert(graph.some(item => item['@id'] === PERSON_ID && item.name === 'Dhara Rajpura'), `Shared identity: ${path}`);
  assert(!graph.some(item => item.aggregateRating || item['@type'] === 'Review'), `No unsupported review rich-result claims: ${path}`);
  if (path.startsWith('/projects/')) {
    const p = projectsData.find(p => path.endsWith(p.slug));
    assert(body.includes(p.title.replaceAll('&', '&amp;')), `Server-rendered case study: ${path}`);
    assert(body.includes('Role &amp; scope') && body.includes('not photographs'), `Scope and visual disclosure: ${path}`);
  }
  if (path.startsWith('/services/')) {
    const s = servicesData.find(s => path.endsWith(s.slug));
    assert(body.includes(s.faqs[0].question), `Visible FAQ without JS: ${path}`);
  }
  for (const match of body.matchAll(/href="(\/[^"?#]*)(?:[?#][^"]*)?"/g)) if (!match[1].startsWith('/_next/')) localLinks.add(match[1]);
  if (path === '/') {
    assert(!body.includes('opacity:0'), 'Homepage critical text must remain visible without JavaScript');
    assert(body.includes('/projects/esp32-s3-smart-gst-calculator'), 'Homepage exposes crawlable project links');
    const hasReviews = body.includes('Sarvesh');
    if (process.argv.includes('--require-reviews')) assert(hasReviews, 'Client feedback is present in initial HTML');
    results.push({ path, status: response.status, title, reviewsInHtml: hasReviews });
  } else results.push({ path, status: response.status, title });
}
const sitemapResponse = await fetch(base + '/sitemap.xml');
assert.equal(sitemapResponse.status, 200); assert(sitemapResponse.headers.get('content-type').includes('xml'));
const sitemap = await sitemapResponse.text();
assert.equal((sitemap.match(/<loc>/g) || []).length, paths.length);
for (const path of paths) assert(sitemap.includes(`<loc>${SITE_URL}${path}</loc>`), `Sitemap entry: ${path}`);
assert(!sitemap.includes('reviewmanagement') && !sitemap.includes('/workexperience'));
const robots = await (await fetch(base + '/robots.txt')).text();
assert(robots.includes('User-agent: OAI-SearchBot') && robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`));
assert(!robots.includes('Disallow: /\n'), 'No blanket crawler block');
for (const [oldPath, destination] of [['/projects/esp32-s3-terminal','/projects/esp32-s3-smart-gst-calculator'],['/workexperience','/about#experience']]) {
  const r = await fetch(base + oldPath, {redirect:'manual'});
  assert.equal(r.status, 308, `Permanent redirect: ${oldPath}`); assert(r.headers.get('location').endsWith(destination));
}
for (const path of ['/review', '/reviewmanagement', '/api/reviews']) {
  const r = await fetch(base + path); assert(r.headers.get('x-robots-tag')?.includes('noindex'), `Exclude utility page: ${path}`);
}
assert.equal((await fetch(base + '/projects/not-a-real-project')).status, 404);
for (const path of localLinks) { const r = await fetch(base + path, {signal:AbortSignal.timeout(15000)}); assert(r.ok, `Internal link: ${path}`); }
const image = await fetch(base + '/_next/image?url=%2Fmedia%2Fdhara-rajpura-profile.jpg&w=640&q=75', {signal:AbortSignal.timeout(20000)});
assert(image.ok && image.headers.get('content-type').startsWith('image/'), 'Optimized profile image loads');
const report = { checkedAt: new Date().toISOString(), base, publicPages: paths.length, internalLinksChecked: localLinks.size, status:'PASS', results };
await fs.writeFile(new URL('../docs/seo-validation.json', import.meta.url), JSON.stringify(report,null,2)+'\n');
console.log(`PASS: ${paths.length} public pages, ${localLinks.size} internal links, sitemap, crawler rules, schemas, redirects, noindex headers and optimized images.`);
console.log(`Client feedback in initial HTML: ${results[0].reviewsInHtml}`);
