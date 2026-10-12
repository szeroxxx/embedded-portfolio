import fs from 'node:fs/promises';
import { articles } from '../lib/blog.mjs';
import { SITE_URL } from '../lib/site.mjs';
import { projectsData } from '../lib/projects.mjs';
import { servicesData } from '../lib/services.mjs';

const { key } = JSON.parse(await fs.readFile(new URL('../lib/indexnow.json', import.meta.url), 'utf8'));
const urlList = ['/', '/about', '/services', '/projects', '/contact', '/blog', ...articles.map(article => `/blog/${article.slug}`), ...servicesData.map(s => `/services/${s.slug}`), ...projectsData.map(p => `/projects/${p.slug}`)].map(path => SITE_URL + path);
const keyLocation = `${SITE_URL}/${key}.txt`;
const payload = { host: new URL(SITE_URL).hostname, key, keyLocation, urlList };
if (!process.argv.includes('--submit')) {
  console.log(`Dry run: ${urlList.length} URLs. Nothing has been sent.\nAfter deployment run: npm run seo:indexnow -- --submit`);
  console.log(JSON.stringify(payload, null, 2));
} else {
  const liveKey = await fetch(keyLocation, { signal: AbortSignal.timeout(15000) });
  if (!liveKey.ok || (await liveKey.text()).trim() !== key) throw new Error('Publish the matching ownership file before submitting. No URLs were sent.');
  const sitemap = await fetch(`${SITE_URL}/sitemap.xml`, { signal: AbortSignal.timeout(15000) });
  const sitemapText = await sitemap.text();
  if (!sitemap.ok || !urlList.every(url => sitemapText.includes(`<loc>${url}</loc>`))) throw new Error('Deploy the complete updated sitemap, including the blog, before submitting. No URLs were sent.');
  const response = await fetch('https://api.indexnow.org/indexnow', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), signal: AbortSignal.timeout(15000) });
  console.log(`IndexNow response: ${response.status}`);
  if (![200, 202].includes(response.status)) throw new Error(`Submission failed: ${await response.text()}`);
  console.log('URLs received by IndexNow. Acceptance is not confirmation of indexing or ranking.');
}
