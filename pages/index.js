import { useEffect, useState } from "react";
import Seo from "../components/Seo";
import Image from "next/image";
import { servicesData } from "../lib/services.mjs";
import { getReviews } from "../lib/db";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { Header, Footer } from "../components/SiteChrome";
import { projectsData, ProjectCard, ProjectModal } from "../components/ProjectDetails";
import { normalizeReview } from "../lib/reviews.mjs";

const experience=[
  ["2025 — now","Freelance Embedded Systems Consultant","PCB, embedded hardware and manufacturing documentation for product teams worldwide."],
  ["2024 — 2025","Embedded System Engineer · DosePacker","Robotic control hardware, motors, sensors and mixed-signal measurement for automation."],
  ["2023 — 2024","Embedded Hardware Engineer · Teq Diligent","Multilayer PCB implementation, CAM checks and production-ready fabrication releases."],
];
const capability=[
  ["PCB engineering",["Schematic capture","2–8 layer routing","Power & ground planes","Impedance control","DFM / DFA"]],
  ["Connected hardware",["ESP32 / nRF52","LoRa / BLE / Wi-Fi","USB / Ethernet / CAN","Low-power systems","Battery management"]],
  ["Hardware implementation",["Altium Designer","KiCad","Library creation","BOM / pick-and-place","Assembly drawings"]],
];
function SectionTitle({number,label,title,copy}){return <div className="section-title"><div className="tech-label text-cyan">{number} / {label}</div><h2>{title}</h2>{copy&&<p>{copy}</p>}</div>}
function ReviewCard({review}){const item=normalizeReview(review);return <blockquote><div className="review-rating" aria-label={`${item.rating} out of 5 stars`}><span aria-hidden="true">{item.stars}</span><b>{item.rating}/5</b></div><p>“{item.reviewText}”</p><footer>{item.clientName}</footer></blockquote>}
export default function Home({initialReviews=[],initialReviewState="loading"}){const [selected,setSelected]=useState(null);const [reviews,setReviews]=useState(initialReviews);const [reviewState,setReviewState]=useState(initialReviewState);useEffect(()=>{fetch('/api/reviews',{cache:'no-store'}).then(r=>r.ok?r.json():Promise.reject()).then(d=>{setReviews(Array.isArray(d)?d:[]);setReviewState('ready')}).catch(()=>{if(!initialReviews.length)setReviewState('error')})},[initialReviews.length]);const pageDescription="Hire Dhara Rajpura for freelance PCB design, embedded hardware, Altium and KiCad layout, DFM reviews and manufacturing documentation. Remote worldwide.";return <div className="site"><Seo title="Freelance PCB Design & Embedded Hardware | Dhara Rajpura" description={pageDescription} path="/" /><Header/><main>
<section className="hero grid-bg"><div className="hero-art"><Image src="/media/pcb-workbench-hero.png" alt="Concept illustration of an electronics workbench, PCB and schematic" fill sizes="(max-width: 700px) 100vw, 65vw" priority /><div className="hero-art-wash"/></div><div className="shell hero-grid"><div className="hero-copy"><div className="availability"><i/>Available for selected hardware projects</div><p className="hero-kicker">PCB DESIGN · EMBEDDED HARDWARE · DFM</p><h1>Production-ready PCBs, <em>from schematic to fab files.</em></h1><p className="hero-lead">I’m Dhara Rajpura, a freelance PCB design and embedded hardware engineer. I help product teams with schematics, multilayer layout, low-power wireless hardware and manufacturing documentation—working remotely with clients worldwide.</p><div className="hero-actions"><Link href="/projects" className="button button-lime focus-ring">View projects <span>↗</span></Link><Link href="/services" className="button button-ghost focus-ring">Explore services</Link></div></div><aside className="proof-card"><div><span>LAYERS</span><strong>2–8</strong></div><div><span>TOOLS</span><strong>Altium · KiCad</strong></div><div><span>HANDOFF</span><strong>Manufacturing-ready</strong></div></aside></div></section>
<section className="proof-rail"><div className="shell"><span>Schematic capture</span><span>Multilayer PCB</span><span>RF-aware layout</span><span>DFM / DFA</span><span>Production files</span></div></section>
<section className="section section-dark" id="services"><div className="shell"><SectionTitle number="01" label="Services" title="Engineering support where products become real." copy="Focused engagements for teams that need rigorous hardware implementation and a clean manufacturing handoff."/><div className="service-list">{servicesData.map(({n,title,summary:copy,image:img,slug})=><Link href={`/services/${slug}`} className="service-row focus-ring" key={n}><span className="service-number">{n}</span><div><h3>{title}</h3><p>{copy}</p></div><div className="service-thumb"><Image src={img} alt="" width={640} height={480} sizes="180px" /></div><span className="service-arrow">↗</span></Link>)}</div></div></section>
<section className="section section-paper about-section" id="about">
  <div className="shell">
    <div className="about-grid">
      <div className="about-heading">
        <div className="tech-label">02 / About</div>
        <h2>Hardware decisions made for the bench—and the build floor.</h2>
      </div>
      <div className="about-narrative">
        <p className="large-copy">I translate product concepts and existing schematics into clear, manufacturable electronics: deliberate power architecture, readable schematics, disciplined placement and routing, and complete release documentation.</p>
        <p>The work is grounded in constraints first—mechanical envelope, interfaces, power tree, stack-up, fabrication limits and component availability—so problems are resolved before they become expensive.</p>
        <Link href="/about" className="text-link focus-ring">Meet Dhara and see my experience <span aria-hidden="true">↗</span></Link>
      </div>
    </div>

    <div className="about-media" aria-label="Meet Dhara Rajpura">
      <figure className="about-portrait">
        <div className="about-portrait-frame">
          <Image src="/media/dhara-rajpura-profile.jpg" alt="Dhara Rajpura, freelance PCB and embedded hardware engineer" width={720} height={900} sizes="(max-width: 700px) 100vw, 40vw" />
          <span className="portrait-index" aria-hidden="true">DR / 01</span>
        </div>
        <figcaption>
          <span className="tech-label">PCB + Embedded Hardware</span>
          <strong>Dhara Rajpura</strong>
          <span>Engineer · Designer · Manufacturing partner</span>
        </figcaption>
      </figure>

      <article className="about-video">
        <header className="about-video-heading">
          <div>
            <span className="tech-label">Meet Dhara</span>
            <h3>Introduction</h3>
          </div>
          <span className="video-duration">VIDEO / PROFILE</span>
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
          <p>Introduction · approach, experience and how I work.</p>
          <a href="https://youtu.be/p653SDWZQ6g" target="_blank" rel="noreferrer" className="video-link focus-ring">Watch on YouTube <span aria-hidden="true">↗</span></a>
        </footer>
      </article>
    </div>
  </div>
</section>
<section className="section section-dark" id="projects"><div className="shell"><SectionTitle number="03" label="Selected work" title="Seven systems. One production mindset." copy="Case studies across wireless, control, mixed-signal and high-density PCB implementation."/><div className="projects-grid">{projectsData.map((p,i)=><ProjectCard key={p.slug} project={p} index={i} onOpen={setSelected}/>)}</div><div className="section-action"><Link href="/projects" className="button button-ghost">View the complete project index</Link></div></div></section>
<section className="section section-paper" id="experience"><div className="shell"><SectionTitle number="04" label="Experience" title="Product-focused hardware practice."/><div className="timeline">{experience.map(([date,title,copy])=><article key={title}><span>{date}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>
<section className="section section-ink" id="skills"><div className="shell"><SectionTitle number="05" label="Capabilities" title="Across the schematic, board and handoff."/><div className="capability-grid">{capability.map(([title,items],i)=><article key={title}><span className="cap-number">0{i+1}</span><h3>{title}</h3><ul>{items.map(x=><li key={x}>{x}</li>)}</ul></article>)}</div></div></section>
<section className="section section-paper" id="reviews"><div className="shell"><SectionTitle number="06" label="Client feedback" title="What collaborators say."/><div className="reviews-wrap">{reviewState==='loading'&&<p className="status-copy">Loading feedback…</p>}{reviewState==='error'&&<p className="status-copy">Feedback is temporarily unavailable. The rest of the portfolio is ready to explore.</p>}{reviewState==='ready'&&reviews.length===0&&<p className="status-copy">No public reviews yet. Have we worked together? <Link href="/review">Share your experience.</Link></p>}{reviews.map(r=><ReviewCard key={r.id||`${r.client_name}-${r.created_at}`} review={r}/>)}</div></div></section>
<section className="contact-section" id="contact"><div className="shell contact-grid"><div><div className="tech-label text-lime">07 / Start a conversation</div><h2>Bring the constraints.<br/><em>I’ll bring the board into focus.</em></h2></div><div><p>Need a PCB review, a new design, a clean schematic rebuild or a production-ready handoff? Send the product context and current design state.</p><div className="hero-actions"><a href="mailto:dharaxrajpura@gmail.com" className="button button-lime focus-ring">Email Dhara ↗</a><a href="https://wa.me/919725417323" className="button button-ghost focus-ring" target="_blank" rel="noreferrer">WhatsApp</a></div></div></div></section>
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
