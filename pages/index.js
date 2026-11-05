import { useEffect, useState } from "react";
import Seo from "../components/Seo";
import BlogCards from "../components/BlogCards";
import Image from "next/image";
import { servicesData } from "../lib/services.mjs";
import { getReviews } from "../lib/db";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { Header, Footer } from "../components/SiteChrome";
import { projectsData, ProjectCard, ProjectModal } from "../components/ProjectDetails";
import TestimonialsColumns from "../components/ui/TestimonialsColumns";
import { experienceTimeline } from "../lib/experience.mjs";

const capability=[
  ["PCB engineering",["Schematic capture","2–8 layer routing","Power & ground planes","Impedance control","DFM / DFA"]],
  ["Connected hardware",["ESP32 / nRF52","LoRa / BLE / Wi-Fi","USB / Ethernet / CAN","Low-power systems","Battery management"]],
  ["Hardware implementation",["Altium Designer","KiCad","Library creation","BOM / pick-and-place","Assembly drawings"]],
];
const selectedProjects = ['nrf52840-navigation', 'pharmacy-bottle-sorter', 'tmr-actuator-driver']
  .map(slug => projectsData.find(project => project.slug === slug));

function SectionTitle({title,copy}){return <div className="section-title"><h2>{title}</h2>{copy&&<p>{copy}</p>}</div>}
export default function Home({initialReviews=[],initialReviewState="loading"}){const [selected,setSelected]=useState(null);const [reviews,setReviews]=useState(initialReviews);const [reviewState,setReviewState]=useState(initialReviewState);useEffect(()=>{fetch('/api/reviews',{cache:'no-store'}).then(r=>r.ok?r.json():Promise.reject()).then(d=>{setReviews(Array.isArray(d)?d:[]);setReviewState('ready')}).catch(()=>{if(!initialReviews.length)setReviewState('error')})},[initialReviews.length]);const pageDescription="Hire Dhara Rajpura for freelance PCB design, embedded hardware, Altium and KiCad layout, DFM reviews and manufacturing documentation. Remote worldwide.";return <div className="site"><Seo title="Freelance PCB Design & Embedded Hardware | Dhara Rajpura" description={pageDescription} path="/" /><Header/><main>
<section className="hero">
  <div className="shell hero-grid">
    <div className="hero-copy">
      <h1>PCB design, from schematic to manufacture.</h1>
      <p className="hero-lead">I’m Dhara Rajpura, designing embedded hardware for product teams worldwide.</p>
      <div className="hero-actions">
        <Link href="/contact" className="button button-lime focus-ring">Start a project</Link>
        <Link href="/projects" className="button button-ghost focus-ring">View projects</Link>
      </div>
      <p className="availability">Available for selected hardware projects</p>
    </div>
    <figure className="hero-visual">
      <div className="hero-image"><Image src="/media/pcb-workbench-hero.png" alt="Concept illustration of an electronics workbench, PCB and schematic" fill sizes="(max-width: 760px) 100vw, 52vw" priority /></div>
      <figcaption>Workbench concept illustration</figcaption>
    </figure>
    <dl className="hero-facts">
      <div><dt>PCB layers</dt><dd>2–8</dd></div>
      <div><dt>Design tools</dt><dd>Altium and KiCad</dd></div>
      <div><dt>Handoff</dt><dd>Manufacturing-ready files</dd></div>
    </dl>
  </div>
</section>
<section className="proof-rail"><div className="shell"><span>Schematic capture</span><span>Multilayer PCB</span><span>RF-aware layout</span><span>DFM / DFA</span><span>Production files</span></div></section>
<section className="section section-dark" id="services"><div className="shell"><SectionTitle number="01" label="Services" title="PCB & embedded hardware services." copy="Focused engagements for teams that need rigorous hardware implementation and a clean manufacturing handoff."/><div className="service-list">{servicesData.map(({n,title,summary:copy,image:img,slug})=><Link href={`/services/${slug}`} className="service-row focus-ring" key={n}><div><h3>{title}</h3><p>{copy}</p></div><div className="service-thumb"><Image src={img} alt="" width={640} height={480} sizes="180px" /></div><span className="service-arrow" aria-hidden="true">+</span></Link>)}</div></div></section>
<section className="section section-paper about-section" id="about">
  <div className="shell">
    <div className="about-grid">
      <div className="about-heading">
        <h2>Hardware decisions, grounded in the build.</h2>
      </div>
      <div className="about-narrative">
        <p className="large-copy">I translate product concepts and existing schematics into clear, manufacturable electronics: deliberate power architecture, readable schematics, disciplined placement and routing, and complete release documentation.</p>
        <p>The work is grounded in constraints first—mechanical envelope, interfaces, power tree, stack-up, fabrication limits and component availability—so problems are resolved before they become expensive.</p>
        <Link href="/about" className="text-link focus-ring">Meet Dhara and see my experience </Link>
      </div>
    </div>

    <div className="about-media" aria-label="Meet Dhara Rajpura">
      <figure className="about-portrait">
        <div className="about-portrait-frame">
          <Image src="/media/dhara-rajpura-profile.jpg" alt="Dhara Rajpura, freelance PCB and embedded hardware engineer" width={720} height={900} sizes="(max-width: 700px) 100vw, 40vw" />

        </div>
        <figcaption>
          <span className="tech-label">PCB and embedded hardware</span>
          <strong>Dhara Rajpura</strong>
          <span>Engineer and manufacturing partner</span>
        </figcaption>
      </figure>

      <article className="about-video">
        <header className="about-video-heading">
          <div>
            <h3>Meet Dhara</h3>
          </div>

        </header>
        <div className="video-frame">
          <iframe
            src="https://www.youtube-nocookie.com/embed/p653SDWZQ6g"
            title="Meet Dhara Rajpura — approach, experience and how I work"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        <footer className="about-video-footer">
          <p>My approach, experience and how I work.</p>
          <a href="https://youtu.be/p653SDWZQ6g" target="_blank" rel="noreferrer" className="video-link focus-ring">Watch on YouTube </a>
        </footer>
      </article>
    </div>
  </div>
</section>
<section className="section section-dark" id="projects"><div className="shell">
  <SectionTitle number="03" label="Selected work" title="Selected work." copy="A selection of wireless, mixed-signal, and control projects, with the design decisions and my role in each." />
  <div className="selected-projects">
    {selectedProjects.map((project, index) => (
      <ProjectCard key={project.slug} project={project} presentation={index === 0 ? "lead" : "support"} onOpen={setSelected} />
    ))}
  </div>
  <div className="section-action"><Link href="/projects" className="button button-ghost focus-ring">Explore case studies </Link></div>
</div></section>
<section className="section section-paper" id="experience"><div className="shell"><SectionTitle number="04" label="Experience" title="Engineering experience."/><div className="timeline">{experienceTimeline.map(({id,period,title,description})=><article key={id}><span>{period}</span><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>
<section className="section section-ink" id="skills"><div className="shell"><SectionTitle number="05" label="Capabilities" title="From circuit to release."/><div className="capability-grid">{capability.map(([title,items],i)=><article key={title}><h3>{title}</h3><ul>{items.map(x=><li key={x}>{x}</li>)}</ul></article>)}</div></div></section>
<section className="section section-paper" id="reviews"><div className="shell"><SectionTitle number="06" label="Client feedback" title="Client feedback."/><div className="reviews-content">{reviewState==='loading'&&<p className="status-copy">Loading feedback…</p>}{reviewState==='error'&&<p className="status-copy">Feedback is temporarily unavailable. The rest of the portfolio is ready to explore.</p>}{reviewState==='ready'&&reviews.length===0&&<p className="status-copy">No public reviews yet. Have we worked together? <Link href="/review">Share your experience.</Link></p>}{reviews.length>0&&<TestimonialsColumns reviews={reviews}/>}</div></div></section>
<section className="section blog-library home-guides" aria-labelledby="home-guides"><div className="shell"><div className="blog-library-heading"><div><h2 id="home-guides">Engineering notes.</h2></div><Link href="/blog" className="blog-all-link">All practical guides</Link></div><BlogCards /></div></section>
<section className="contact-section" id="contact"><div className="shell contact-grid"><div><h2>Let’s discuss your next board.</h2></div><div><p>Need a PCB review, a new design, a clean schematic rebuild or a production-ready handoff? Send the product context and current design state.</p><div className="hero-actions"><a href="mailto:dharaxrajpura@gmail.com" className="button button-lime focus-ring">Email Dhara</a><a href="https://wa.me/919725417323" className="button button-ghost focus-ring" target="_blank" rel="noreferrer">WhatsApp</a></div></div></div></section>
</main><Footer/><AnimatePresence>{selected&&<ProjectModal project={selected} onClose={()=>setSelected(null)}/>}</AnimatePresence></div>}


export async function getServerSideProps({res}) {
  res.setHeader('Cache-Control','public, s-maxage=60, stale-while-revalidate=120');
  try {
    const reviews = await getReviews();
    return {props:{initialReviews:reviews.filter(review=>review.visible===true),initialReviewState:'ready'}};
  } catch {
    return {props:{initialReviews:[],initialReviewState:'loading'}};
  }
}
