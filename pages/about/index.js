import Link from "next/link";
import Image from "next/image";
import { Header, Footer, PageIntro } from "../../components/SiteChrome";
import Seo from "../../components/Seo";
import { SITE_URL, PERSON_ID, profiles, breadcrumbSchema } from "../../lib/site.mjs";
import SkillsList from "../../components/SkillsList";
import ExperienceTimeline from "../../components/ExperienceTimeline";

const skillGroups = [
  { title: "PCB implementation", image: "/media/hardware/libraries.webp", items: ["Altium Designer", "KiCad", "PADS Professional", "PADS Layout", "OrCAD", "Allegro", "Multilayer PCB design", "Schematic capture", "DFM / DFA", "Manufacturing documentation"] },
  { title: "Embedded hardware", image: "/media/hardware/controller.webp", items: ["STM32", "ESP32 / ESP32-S3", "nRF52 / nRF52840", "Motor and sensor interfaces", "Mixed-signal layout", "Power architecture"] },
  { title: "Connected products", image: "/media/hardware/wireless.webp", items: ["Battery-powered hardware", "LoRa", "Bluetooth Low Energy", "Wi-Fi", "USB-C charging", "RF-aware PCB layout"] },
];

export default function AboutPage() {
  const schema = { "@context": "https://schema.org", "@type": "ProfilePage", "@id": `${SITE_URL}/about#webpage`, url: `${SITE_URL}/about`, name: "About Dhara Rajpura", mainEntity: { "@id": PERSON_ID } };
  return (
    <div className="site detail-page">
      <Seo title="Dhara Rajpura — PCB & Embedded Hardware Engineer" description="Meet Dhara Rajpura, a freelance PCB and embedded hardware engineer working remotely with startups and product teams worldwide. Explore her experience, skills and approach." path="/about" image="/media/dhara-portrait.webp" imageAlt="Dhara Rajpura, PCB and embedded hardware engineer" schema={[schema, breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About Dhara", path: "/about" }])]} />
      <Header />
      <main>
        <PageIntro eyebrow="About / The engineer behind the board" title="Dhara Rajpura — PCB & Embedded Hardware Engineer" copy="I help startups and product teams develop PCB and embedded hardware, with a defined scope and a clear engineering handoff. Available for remote freelance and contract projects worldwide." />
        <div className="shell detail-breadcrumb"><nav aria-label="Breadcrumb"><ol><li><Link href="/">Home</Link></li><li aria-current="page">About Dhara</li></ol></nav></div>
        <section className="section section-paper" aria-labelledby="about-approach"><div className="shell detail-about-intro"><figure className="about-portrait"><div className="about-portrait-frame"><Image src="/media/dhara-portrait.webp" alt="Dhara Rajpura smiling, wearing glasses and a navy blazer" width={960} height={960} sizes="(max-width: 700px) 100vw, 40vw" /><span className="portrait-index">PCB / EMBEDDED</span></div><figcaption><span className="tech-label">Freelance engineering</span><strong>Dhara Rajpura</strong><span>Remote collaboration · Worldwide</span></figcaption></figure><div className="detail-body"><div className="tech-label">How I work</div><h2 id="about-approach">What I check before layout</h2><p className="large-copy">Good hardware starts with understanding the product: interfaces, power, mechanical limits and how the board will be manufactured.</p><p>My work spans schematic capture, component selection, PCB layout, battery and wireless hardware, and fabrication and assembly documentation. The engagement can be a focused design review, a layout implementation or a broader hardware design scope.</p><p>I agree on responsibilities and deliverables at the start, including which architecture, firmware, fabrication and testing tasks belong to the project.</p><div className="detail-about-links"><Link href="/services" className="text-link">Explore my services ↗</Link>{profiles.map(profile => <a key={profile.url} href={profile.url} className="text-link" target="_blank" rel="noreferrer">{profile.label} ↗</a>)}</div></div></div></section>
        <section id="experience" className="section section-paper detail-experience" aria-labelledby="about-experience"><div className="shell"><div className="section-title"><div className="tech-label">Professional background</div><h2 id="about-experience">Engineering experience</h2></div><ExperienceTimeline /></div></section>
        <section className="section section-dark" aria-labelledby="about-skills"><div className="shell"><div className="section-title"><div className="tech-label text-cyan">Tools & capabilities</div><h2 id="about-skills">From circuits<br />to board layout.</h2></div><SkillsList groups={skillGroups} /></div></section>
        <section className="section section-ink" aria-labelledby="about-introduction"><div className="shell detail-two-column"><div><div className="tech-label text-cyan">Meet Dhara</div><h2 id="about-introduction">My engineering<br />approach.</h2></div><div className="detail-body"><p className="large-copy">Watch my short introduction for more about my background and how I work with product teams.</p><a href="https://youtu.be/p653SDWZQ6g" className="button button-ghost" target="_blank" rel="noreferrer">Watch the introduction ↗</a><div className="boundary detail-disclosure"><strong>Reading the portfolio</strong><p>Each case study states my role and scope. The project visuals are concepts used to explain the work, rather than photographs of fabricated client hardware. A PCB layout engagement does not imply responsibility for the supplied architecture, product certification or operational validation.</p></div><Link href="/projects" className="detail-text-link">Read the project case studies ↗</Link></div></div></section>
        <section className="contact-section"><div className="shell contact-grid"><div><div className="tech-label text-lime">Work together</div><h2>Tell me about your board</h2></div><div><p>Tell me what you are building, what already exists and where you need engineering support.</p><Link href="/contact" className="button button-lime">Discuss your project ↗</Link></div></div></section>
      </main>
      <Footer />
    </div>
  );
}
