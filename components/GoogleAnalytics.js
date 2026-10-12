import { useEffect, useState } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/router';

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-W3WQRY8JL2';
const isUtilityPage = path => /^\/(?:review(?:management)?|api)(?:\/|$)/.test(path);

export default function GoogleAnalytics() {
  const router = useRouter();
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const production = process.env.NODE_ENV === 'production' && ['dhara.website', 'www.dhara.website'].includes(window.location.hostname);
    if (!production || process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview' || !/^G-[A-Z0-9]+$/.test(measurementId)) return;
    // Set before a history change so private utility routes do not send page views.
    const updateTracking = url => { window[`ga-disable-${measurementId}`] = isUtilityPage(url.split(/[?#]/)[0]); };
    updateTracking(window.location.pathname);
    const trackContact = event => {
      const anchor = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (!anchor || window[`ga-disable-${measurementId}`] || typeof window.gtag !== 'function') return;
      const url = new URL(anchor.href, window.location.href);
      const method = url.protocol === 'mailto:' ? 'email' : ['wa.me', 'api.whatsapp.com'].includes(url.hostname) ? 'whatsapp' : null;
      if (method) window.gtag('event', 'contact_click', { contact_method: method, page_path: window.location.pathname });
    };
    router.events.on('routeChangeStart', updateTracking);
    document.addEventListener('click', trackContact, true);
    // Defer loading on utility pages; first navigation to a public page enables the tag.
    const enableForPublicPage = url => { if (!isUtilityPage(url.split(/[?#]/)[0])) setEnabled(true); };
    enableForPublicPage(window.location.pathname);
    router.events.on('routeChangeComplete', enableForPublicPage);
    return () => {
      router.events.off('routeChangeStart', updateTracking);
      router.events.off('routeChangeComplete', enableForPublicPage);
      document.removeEventListener('click', trackContact, true);
    };
  }, [router.events]);

  if (!enabled) return null;
  // GA4 enhanced measurement owns history page views; no duplicate manual page_view events.
  return <>
    <Script id="dhara-google-tag" src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
    <Script id="dhara-analytics-config" strategy="afterInteractive">{`
      window.dataLayer = window.dataLayer || [];
      window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
      window.gtag('js', new Date());
      window.gtag('config', '${measurementId}');
    `}</Script>
  </>;
}
