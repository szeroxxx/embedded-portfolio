import { useEffect, useRef, useState } from "react";
import BackLink from "./BackLink";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const links = [
  ["About", "/about"],
  ["Services", "/services"],
  ["Projects", "/projects"],
  ["Notes & Lab", "/resources"],
  ["Reviews", "/#reviews"],
];

function Brand({ tagline = false }) {
  return (
    <>
      <Image className="brand-mark nav-portrait" src="/media/dhara-nav-portrait.webp" width={40} height={40} alt="" />
      <span className="brand-type">
        <span className="wordmark-name">Dhara Rajpura</span>
        {tagline && <i>PCB and embedded hardware</i>}
      </span>
    </>
  );
}

function currentSection(pathname, href) {
  if (href === "/resources") {
    return ["/resources", "/blog", "/device-lab"].some(path => pathname.startsWith(path));
  }
  return !href.includes("#") && pathname.startsWith(href);
}

export function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useRouter();
  const menuToggle = useRef(null);
  const header = useRef(null);

  useEffect(() => {
    if (!open) return;
    function dismissOnEscape(event) {
      if (event.key === "Escape") {
        setOpen(false);
        menuToggle.current?.focus();
      }
    }
    function dismissOutside(event) {
      if (!header.current?.contains(event.target)) setOpen(false);
    }
    document.addEventListener("keydown", dismissOnEscape);
    document.addEventListener("pointerdown", dismissOutside);
    document.addEventListener("focusin", dismissOutside);
    return () => {
      document.removeEventListener("keydown", dismissOnEscape);
      document.removeEventListener("pointerdown", dismissOutside);
      document.removeEventListener("focusin", dismissOutside);
    };
  }, [open]);

  function navigationLinks() {
    return links.map(([label, href]) => (
      <Link key={href} href={href} className={currentSection(pathname, href) ? "nav-link active" : "nav-link"}
        aria-current={currentSection(pathname, href) ? "page" : undefined} onClick={() => setOpen(false)}>
        {label}
      </Link>
    ));
  }

  return (
    <header ref={header} className="site-header">
      <div className="shell nav-shell">
        <BackLink />
        <Link href="/#top" className="wordmark focus-ring" aria-label="Dhara Rajpura home" aria-current={pathname === "/" ? "page" : undefined} onClick={() => setOpen(false)}>
          <Brand tagline />
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigationLinks()}
          <Link href="/contact" className="button button-lime focus-ring">Start a project</Link>
        </nav>
        <button type="button" ref={menuToggle} className="menu-button focus-ring" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-nav">
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile navigation" className="mobile-nav">
          {navigationLinks()}
          <Link href="/contact" className="button button-lime" onClick={() => setOpen(false)}>Start a project</Link>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <Link href="/" className="wordmark footer-wordmark" aria-label="Dhara Rajpura home"><Brand /></Link>
          <p>Production-minded PCB and embedded hardware engineering.</p>
        </div>
        <div>
          <span className="tech-label">Navigate</span>
          <Link href="/about">About Dhara</Link>
          <Link href="/services">Services</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/resources">Notes &amp; Lab</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div>
          <span className="tech-label">Contact</span>
          <a href="mailto:dharaxrajpura@gmail.com">dharaxrajpura@gmail.com</a>
          <a href="https://wa.me/919725417323" target="_blank" rel="noreferrer">WhatsApp</a>
          <a href="https://www.linkedin.com/in/dhara-profile/" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
      <div className="shell footer-base">
        <span>© {new Date().getFullYear()} Dhara Rajpura</span>
        <span>PCB design, embedded hardware and manufacturing handoff</span>
      </div>
    </footer>
  );
}

export function PageIntro({title, copy, children}) {
  return (
    <section className="page-intro grid-bg">
      <div className="shell">
        <h1>{title}</h1>
        <p>{copy}</p>
        {children}
      </div>
    </section>
  );
}
