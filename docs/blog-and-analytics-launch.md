# Blog and Analytics launch

Prepared for Dhara Rajpura on 12 October 2026. These changes are local until you push and deploy the repository.

## Included in this update

- Blog index: https://www.dhara.website/blog
- Project brief guide: https://www.dhara.website/blog/what-to-send-pcb-designer-for-quote
- Review checklist: https://www.dhara.website/blog/pcb-design-review-before-manufacturing-checklist
- Two original brand illustrations, optimized as WebP (1774 × 887).
- A downloadable plain-text project brief.
- Blog navigation, homepage cards, service links and article-to-case-study links.
- Server-rendered article content, unique page metadata, canonical URLs, author details, breadcrumbs and BlogPosting structured data.
- An expanded sitemap and IndexNow URL list: 19 public pages.
- Google Analytics 4 using the supplied measurement ID G-W3WQRY8JL2.

## Before pushing

Read both articles and confirm that the engineering advice reflects your approach. Portfolio examples use the documented scope already in the website; no new client results, credentials or performance claims have been added.

The initial article publication dates are 12 October 2026. If the first deployment happens on a different day, change each article's `date` in `lib/blog.mjs` before publishing. For later edits, preserve the original publication date and add a separate modification date if needed. Do not refresh publication dates to make unchanged content look new.

Review the repository diff, then commit and push using your usual workflow. The Analytics measurement ID is public and does not need an account password or a private key. The site defaults to the supplied ID; `NEXT_PUBLIC_GA_MEASUREMENT_ID` can override it. Do not paste GA account credentials into the repository.

## After the deployment succeeds

1. Open both article URLs and /blog on the live site. Check images, navigation, the brief download and mobile reading.
2. Open https://www.dhara.website/sitemap.xml and confirm /blog and both article URLs are present. It should contain 19 URLs. If the sitemap is cached, check again after its one-hour cache interval.
3. In Google Search Console, inspect the four priority URLs already identified. If each live test succeeds, request indexing once. Also inspect and request indexing for the two newly published articles. There is no need to manually request every URL or repeatedly request the same URL. Never use the sitemap XML address as an article indexing request.
4. In the Sitemaps report, check the submitted sitemap's processing status and error details. A successful live URL test does not establish that the submitted sitemap has been processed. Do not repeatedly remove and resubmit a correct sitemap solely because processing is pending.
5. In Bing Webmaster Tools, check the manually submitted sitemap's status. Importing the site and submitting its sitemap are complete; no second import is required. Use URL Inspection for important new pages if needed.
6. From the deployed repository, run `npm run seo:indexnow -- --submit` to notify IndexNow of the updated URLs. The script verifies the public ownership file and that every URL is in the live sitemap before sending anything. Acceptance is not a guarantee of indexing. Dry run: `npm run seo:indexnow`.

## Configure Google Analytics

In GA4, go to Admin → Data streams → your Web stream. Confirm the measurement ID is G-W3WQRY8JL2 and that the stream belongs to dhara.website.

Enable Enhanced measurement. Under Page views → Show advanced settings, enable both Page loads and Page changes based on browser history events. Save. This is Google's recommended approach for a site with client-side navigation. The code does not send additional manual page_view events, so do not add a second GA tag through Tag Manager or another integration.

Open the live website in another browser tab and check GA4 Realtime. Navigate from /blog to an article and then to a service. Verify page views change when the route changes. DebugView can provide a closer inspection if you enable Google's debug tooling. A local or Vercel preview hostname intentionally does not send Analytics traffic.

The custom event is `contact_click`, with `contact_method` equal to `email` or `whatsapp` and `page_path` identifying the page. The custom event does not send the visitor's email, phone number, message or the destination link. A contact click shows intent; it does not prove an enquiry or a booked project. If useful, create a custom dimension for `contact_method`. Decide whether to mark this event as a key event once it is visible in GA4.

Connect Search Console to GA4: Admin → Product links → Search Console links. Select the verified dhara.website property and the matching Web stream using an account with the required permissions. Publish the Search Console report collection in GA4 if you want those reports in the navigation. Search Console remains the source for Google search impressions and queries; Analytics measures visits and interactions after arrival.

## Keep improving the content

Share each article on LinkedIn with a useful excerpt and its website link. Ask readers to save the brief or checklist and contact you with an actual board requirement. Do not post two near-identical promotional articles on the same day just to create volume.

After data accumulates, review Search Console's Performance report: search terms, impressions, clicks and the pages receiving them. Compare this with article visits, contact clicks and actual enquiries. These article topics target practical customer questions; no search-volume figures or first-position promises are claimed.

Update an article when readers ask a question it does not answer or when relevant technical guidance changes. The next useful topics are choosing between schematic design and layout-only support, what a manufacturing release package contains, and preparing an ESP32 battery-powered PCB brief. Publish examples only when their scope and claims can be substantiated.

## Primary references for the launch steps

- Google: request a recrawl — https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl
- Google Analytics: measure single-page applications — https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications
- Google Analytics: Search Console integration — https://support.google.com/analytics/answer/10737381
- Google Search: article structured data — https://developers.google.com/search/docs/appearance/structured-data/article
- Bing: sitemap documentation — https://www.bing.com/webmasters/help/Sitemaps-3b5cf6ed
- IndexNow: getting started — https://www.indexnow.org/documentation
