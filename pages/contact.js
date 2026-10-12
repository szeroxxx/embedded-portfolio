import Link from "next/link";
import { Header, Footer, PageIntro } from "../components/SiteChrome";
import Seo from "../components/Seo";
import { SITE_URL, PERSON_ID, breadcrumbSchema } from "../lib/site.mjs";

const briefItems = [
  ["Product goal", "What does the product need to do, and who will use it?"],
  ["Existing files", "Share the block diagram, schematic, PCB files or circuit notes you already have."],
  ["Mechanical constraints", "Board dimensions, enclosure space, mounting points and connector locations."],
  ["Interfaces", "Controllers, sensors, motors, radios, displays and external connections."],
  ["Power budget", "Supply voltage, battery requirements, charging needs and current targets."],
  ["Deadline & manufacturer", "Your intended timeline and any fabrication or assembly requirements."],
];

export default function ContactPage() {
  const schema = { "@context": "https://schema.org", "@type": "ContactPage", "@id": `${SITE_URL}/contact#webpage`, url: `${SITE_URL}/contact`, name: "Contact Dhara Rajpura", about: { "@id": PERSON_ID } };
  return (
    <div className="site detail-page">
      <Seo title="Hire Dhara Rajpura — Freelance PCB & Embedded Hardware Engineer" description="Contact Dhara Rajpura for freelance PCB design, schematic capture, design reviews and wireless embedded hardware. Remote collaboration with product teams worldwide." path="/contact" schema={[schema, breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])]} />
      <Header />
      <main>
        <PageIntro eyebrow="Contact / Remote collaboration worldwide" title="Let’s discuss your hardware." copy="A new PCB, a layout that needs support, or a design review before manufacturing: share where your project stands and the engineering help you need." />
        <div className="shell detail-breadcrumb"><nav aria-label="Breadcrumb"><ol><li><Link href="/">Home</Link></li><li aria-current="page">Contact</li></ol></nav></div>
        <section className="section section-dark" aria-labelledby="contact-options"><div className="shell detail-two-column"><div><div className="tech-label text-cyan">Start a conversation</div><h2 id="contact-options">Direct contact.<br />A clear next step.</h2><p className="detail-support-copy">Available for remote freelance and contract projects with startups and product teams worldwide.</p></div><div className="detail-contact-options"><a href="mailto:dharaxrajpura@gmail.com"><span className="tech-label text-cyan">Email</span><strong>dharaxrajpura@gmail.com</strong><span>Send your brief and available design files <span aria-hidden="true">↗</span></span></a><a href="https://wa.me/919725417323" target="_blank" rel="noreferrer"><span className="tech-label text-cyan">WhatsApp</span><strong>+91 97254 17323</strong><span>Discuss your requirements <span aria-hidden="true">↗</span></span></a><p>Start with the information you have. We can clarify the scope, responsibilities and deliverables before work begins.</p></div></div></section>
        <section className="section section-paper" aria-labelledby="contact-brief"><div className="shell"><div className="section-title"><div className="tech-label">A useful starting brief</div><h2 id="contact-brief">What to include.</h2><p>These details help turn a product idea or existing design into a focused engineering engagement.</p></div><ol className="detail-brief-list">{briefItems.map(([title, description], index) => <li key={title}><span className="detail-brief-number">0{index + 1}</span><h3>{title}</h3><p>{description}</p></li>)}</ol></div></section>
        <section className="section section-ink"><div className="shell detail-two-column"><div><div className="tech-label text-cyan">Explore before you enquire</div><h2>Find the right<br />hardware scope.</h2></div><div className="detail-body"><p className="large-copy">Review the service boundaries and project contributions to see where my experience fits your requirements.</p><div className="detail-link-list"><Link href="/services"><span>PCB &amp; embedded hardware services</span><span aria-hidden="true">↗</span></Link><Link href="/projects"><span>Hardware project case studies</span><span aria-hidden="true">↗</span></Link><Link href="/blog/what-to-send-pcb-designer-for-quote"><span>Prepare a PCB project brief</span><span aria-hidden="true">↗</span></Link><Link href="/about"><span>About Dhara Rajpura</span><span aria-hidden="true">↗</span></Link></div></div></div></section>
      </main>
      <Footer />
    </div>
  );
}
