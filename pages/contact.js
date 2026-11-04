import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Header, Footer } from "../components/SiteChrome";
import Seo from "../components/Seo";
import { servicesData } from "../lib/services.mjs";
import { SITE_URL, PERSON_ID, breadcrumbSchema } from "../lib/site.mjs";

const email = "dharaxrajpura@gmail.com";
const briefItems = [
  ["Product goal", "What does the product need to do, and who will use it?"],
  ["Existing files", "Share the block diagram, schematic, PCB files or circuit notes you already have."],
  ["Mechanical constraints", "Board dimensions, enclosure space, mounting points and connector locations."],
  ["Interfaces", "Controllers, sensors, motors, radios, displays and external connections."],
  ["Power budget", "Supply voltage, battery requirements, charging needs and current targets."],
  ["Deadline & manufacturer", "Your intended timeline and any fabrication or assembly requirements."],
];
const nextSteps = [
  ["Share the starting point", "Send your product goal, current files and the engineering support you need."],
  ["Agree the scope", "We clarify responsibilities, deliverables, review points, timeline and quotation before work begins."],
  ["Review and release", "We work through the agreed checkpoints and hand over the files included in your scope."],
];

export default function ContactPage() {
  const router = useRouter();
  const [copyState, setCopyState] = useState("idle");
  const serviceSlug = router.isReady && typeof router.query.service === "string" ? router.query.service : null;
  const service = servicesData.find(item => item.slug === serviceSlug);
  const subject = service ? `Project enquiry — ${service.title}` : "PCB & embedded hardware project enquiry";
  const emailHref = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
  const schema = { "@context": "https://schema.org", "@type": "ContactPage", "@id": `${SITE_URL}/contact#webpage`, url: `${SITE_URL}/contact`, name: "Contact Dhara Rajpura", about: { "@id": PERSON_ID } };

  async function copyEmail() {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(email);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }

  return (
    <div className="site detail-page contact-page">
      <Seo title="Hire Dhara Rajpura — Freelance PCB & Embedded Hardware Engineer" description="Contact Dhara Rajpura for freelance PCB design, schematic capture, design reviews and wireless embedded hardware. Remote collaboration with product teams worldwide." path="/contact" schema={[schema, breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])]} />
      <Header />
      <main>
        <section className="contact-intro grid-bg" aria-labelledby="contact-title">
          <div className="shell contact-intro-grid">
            <div className="contact-intro-copy">
              <div className="tech-label text-lime">Contact / Remote collaboration worldwide</div>
              <h1 id="contact-title">Let’s discuss<br />your hardware.</h1>
              <p>A new PCB, layout support, or a review before manufacturing: tell me where your project stands and what you need.</p>
              {service && <div className="contact-service-context"><span className="tech-label text-cyan">Your selected service</span><strong>{service.title}</strong><Link href={`/services/${service.slug}`}>View service details ↗</Link></div>}
            </div>
            <div className="contact-direct" aria-label="Contact options">
              <a href={emailHref} className="contact-direct-link"><span className="tech-label text-cyan">Email your brief</span><strong>{email}</strong><span>What are you building, what stage is it at, and what help do you need? <span aria-hidden="true">↗</span></span></a>
              <div className="contact-copy-row"><button type="button" onClick={copyEmail}>Copy email</button><span role="status">{copyState === "copied" ? "Email copied." : copyState === "error" ? "Select and copy the address below." : ""}</span></div>
              {copyState === "error" && <input className="contact-copy-fallback" aria-label="Email address to copy" readOnly value={email} onFocus={event => event.target.select()} />}
              <a href="https://wa.me/919725417323" className="contact-direct-link contact-whatsapp" target="_blank" rel="noreferrer"><span className="tech-label text-cyan">WhatsApp</span><strong>+91 97254 17323</strong><span>Discuss your requirements <span aria-hidden="true">↗</span></span></a>
            </div>
          </div>
        </section>
        <div className="shell detail-breadcrumb"><nav aria-label="Breadcrumb"><ol><li><Link href="/">Home</Link></li><li aria-current="page">Contact</li></ol></nav></div>
        <section className="section section-paper" aria-labelledby="contact-next"><div className="shell"><div className="section-title"><div className="tech-label">What happens next</div><h2 id="contact-next">A clear path<br />from enquiry.</h2><p>Start with the information you have. Revision rounds and delivery dates are agreed for your project.</p></div><ol className="contact-next-steps">{nextSteps.map(([title, description], index) => <li key={title}><span className="tech-label">0{index + 1}</span><h3>{title}</h3><p>{description}</p></li>)}</ol></div></section>
        <section className="section section-paper contact-brief-section" aria-labelledby="contact-brief"><div className="shell"><div className="section-title"><div className="tech-label">A useful starting brief</div><h2 id="contact-brief">What to include.</h2><p>These details help turn a product idea or existing design into a focused engineering engagement.</p></div><ol className="detail-brief-list">{briefItems.map(([title, description], index) => <li key={title}><span className="detail-brief-number">0{index + 1}</span><h3>{title}</h3><p>{description}</p></li>)}</ol></div></section>
        <section className="section section-ink"><div className="shell detail-two-column"><div><div className="tech-label text-cyan">Explore before you enquire</div><h2>Find the right<br />hardware scope.</h2></div><div className="detail-body"><p className="large-copy">Review the service boundaries and project contributions to see where my experience fits your requirements.</p><div className="detail-link-list"><Link href="/services"><span>PCB &amp; embedded hardware services</span><span aria-hidden="true">↗</span></Link><Link href="/projects"><span>Hardware project case studies</span><span aria-hidden="true">↗</span></Link><Link href="/blog/what-to-send-pcb-designer-for-quote"><span>Prepare a PCB project brief</span><span aria-hidden="true">↗</span></Link><Link href="/about"><span>About Dhara Rajpura</span><span aria-hidden="true">↗</span></Link></div></div></div></section>
      </main>
      <Footer />
    </div>
  );
}
