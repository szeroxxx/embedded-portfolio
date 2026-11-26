import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

// The first history entry in this document may have come from another site.
const entries = new Map();

export function usePortfolioHistory() {
  const { events } = useRouter();
  useEffect(() => {
    let current = window.history.state?.key;
    if (current) entries.set(current, false);
    function rememberEntry() {
      const next = window.history.state?.key;
      if (next && !entries.has(next)) entries.set(next, Boolean(current));
      current = next;
    }
    events.on("routeChangeComplete", rememberEntry);
    events.on("hashChangeComplete", rememberEntry);
    return () => {
      events.off("routeChangeComplete", rememberEntry);
      events.off("hashChangeComplete", rememberEntry);
    };
  }, [events]);
}

const parents = {
  "/projects/[slug]": "/projects",
  "/services/[slug]": "/services",
  "/blog/[slug]": "/blog",
  "/device-lab/[slug]": "/device-lab",
  "/blog": "/resources",
  "/device-lab": "/resources",
  "/review": "/#reviews"
};

export default function BackLink() {
  const router = useRouter();
  if (router.pathname === "/") return null;
  function goBack(event) {
    const navigation = window.navigation;
    const previous = navigation?.entries()[navigation.currentEntry.index - 1];
    if (entries.get(window.history.state?.key) || (previous?.url && new URL(previous.url).origin === window.location.origin)) {
      event.preventDefault();
      router.back();
    }
  }
  return <Link href={parents[router.pathname] || "/"} replace onNavigate={goBack} className="nav-back focus-ring"><span aria-hidden="true">←</span> Back</Link>;
}
