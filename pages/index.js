import { useEffect, useState } from "react";
import Seo from "../components/Seo";
import BlogCards from "../components/BlogCards";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import { servicesData } from "../lib/services.mjs";
import { getReviews } from "../lib/db";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { Header, Footer } from "../components/SiteChrome";
import { projectsData, ProjectCard, ProjectModal } from "../components/ProjectDetails";
import TestimonialsColumns from "../components/ui/TestimonialsColumns";
import SkillsList from "../components/SkillsList";
import ExperienceTimeline from "../components/ExperienceTimeline";

const capability=[
  { title: "PCB engineering", image: "/media/hardware/layout.webp", items: ["Schematic capture","Multilayer routing","Power & ground planes","Impedance control","DFM / DFA"] },
  { title: "Connected hardware", image: "/media/hardware/wireless.webp", items: ["ESP32, nRF52, STM32 and LoRa boards","BLE, Wi-Fi and LoRa wireless designs","USB, HDMI, PCIe, LVDS, camera, Ethernet and CAN interfaces","Sensors, encoders and motors","Battery-powered and low-power designs","Battery management"] },
  { title: "Hardware implementation", image: "/media/hardware/libraries.webp", items: ["Altium Designer and KiCad","PADS Professional and PADS Layout","OrCAD and Allegro","Library creation","Fabrication files and Gerbers","BOM, pick-and-place and assembly files","Assembly drawings"] },
];
const selectedProjects = ['nrf52840-navigation', 'pharmacy-bottle-sorter', 'tmr-actuator-driver']
  .map(slug => projectsData.find(project => project.slug === slug));

function SectionTitle({title,copy}){return <div className="section-title"><h2>{title}</h2>{copy&&<p>{copy}</p>}</div>}
export default function Home({initialReviews=[],initialReviewState="loading"}){const [selected,setSelected]=useState(null);const [reviews,setReviews]=useState(initialReviews);const [reviewState,setReviewState]=useState(initialReviewState);useEffect(()=>{fetch('/api/reviews',{cache:'no-store'}).then(r=>r.ok?r.json():Promise.reject()).then(d=>{setReviews(Array.isArray(d)?d:[]);setReviewState('ready')}).catch(()=>{if(!initialReviews.length)setReviewState('error')})},[initialReviews.length]);const pageDescription="Explore Dhara Rajpura’s PCB designs for medical, industrial and IoT products, from power and wireless circuits to multilayer layout and manufacturing files.";return <div id="top" className="site portfolio-home"><Seo image="/media/dhara-rajpura-portfolio-card.jpg" imageAlt="Dhara Rajpura, PCB design and embedded hardware engineer" title="Dhara Rajpura | PCB Design & Embedded Hardware" description={pageDescription} path="/" /><Header/><main>
<section className="home-opening">
  <div className="shell">
    <div className="home-intro">
      <h1>PCB design, <span>from schematic to manufacture.</span></h1>
      <div className="home-intro-copy">
        <p>I’m Dhara Rajpura, designing embedded hardware for product teams worldwide. I’ve worked on boards for medical, industrial and IoT products.</p>
        <div className="hero-actions">
          <Link href="/contact" className="button button-lime focus-ring">Start a project <FiArrowUpRight aria-hidden="true" /></Link>
          <Link href="/projects" className="button button-ghost focus-ring">View projects</Link>
        </div>
        <p className="home-availability">Available for selected hardware projects</p>
      </div>
    </div>
    <div className="home-atlas">
      <figure className="home-workbench">
        <Image src="/media/hardware/workbench.webp" alt="Illustration of a populated PCB and meter probes on an inspection bench" fill sizes="(max-width: 700px) 100vw, 52vw" priority />
        <figcaption>
          <dl><dt>Design tools</dt><dd>Altium Designer, KiCad, PADS Professional, PADS Layout, OrCAD and Allegro</dd></dl>
          <span>PCB inspection bench</span>
        </figcaption>
      </figure>
      <dl className="home-layer-tile">
        <dt>PCB layers</dt><dd>Multilayer</dd>
      </dl>
      <div className="home-handoff-tile">
        <dl><dt>Handoff</dt><dd>Manufacturing-ready files</dd></dl>
      </div>
    </div>
    <ul className="home-proof" aria-label="Engineering capabilities">
      {["Schematic capture", "Multilayer PCB", "RF-aware layout", "DFM / DFA", "Production files"].map(item => <li key={item}>{item}</li>)}
    </ul>
  </div>
</section>
<section className="section section-dark" id="projects"><div className="shell">
  <SectionTitle number="03" label="Selected work" title="Selected work." copy="Three boards I worked on, from a battery-powered navigation module to industrial control hardware." />
  <div className="selected-projects">
    {selectedProjects.map((project, index) => (
      <ProjectCard key={project.slug} project={project} presentation={index === 0 ? "lead" : "support"} onOpen={setSelected} />
    ))}
  </div>
  <div className="section-action"><Link href="/projects" className="button button-ghost focus-ring">Explore case studies </Link></div>
</div></section>
<section className="section section-dark" id="services"><div className="shell"><SectionTitle number="01" label="Services" title="PCB & embedded hardware services." copy="I review existing designs, route new boards and prepare the files your manufacturer needs."/><div className="service-list">{servicesData.map(({n,title,summary:copy,image:img,slug})=><Link href={`/services/${slug}`} className="service-row focus-ring" key={n}><div><h3>{title}</h3><p>{copy}</p></div><div className="service-thumb"><Image src={img} alt="" width={640} height={480} sizes="(max-width: 680px) 84px, 160px" /></div><span className="service-arrow" aria-hidden="true"><FiArrowUpRight /></span></Link>)}</div></div></section>
<section className="section section-paper about-section" id="about">
  <div className="shell">
    <div className="about-grid">
      <div className="about-heading">
        <h2>How I design a board.</h2>
      </div>
      <div className="about-narrative">
        <p className="large-copy">I start with your product requirements or an existing schematic. I plan the power supplies, place and route the components, and prepare the board files and assembly drawings.</p>
        <p>Before routing, I check the enclosure, interfaces, power tree, stack-up, fabrication limits and component availability.</p>
        <Link href="/about" className="text-link focus-ring">Meet Dhara and see my experience </Link>
      </div>
    </div>

    <div className="about-media" aria-label="Meet Dhara Rajpura">
      <figure className="about-portrait">
        <div className="about-portrait-frame">
          <Image src="/media/dhara-portrait.webp" alt="Dhara Rajpura, freelance PCB and embedded hardware engineer" width={1000} height={1000} sizes="(max-width: 700px) 100vw, 40vw" />

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
<section className="section section-paper" id="experience"><div className="shell"><SectionTitle number="04" label="Experience" title="Engineering experience."/><ExperienceTimeline /></div></section>
<section className="section section-ink" id="skills"><div className="shell"><SectionTitle number="05" label="Capabilities" title="From circuit to release."/><SkillsList groups={capability} /></div></section>
<section className="section section-paper" id="reviews"><div className="shell"><SectionTitle number="06" label="Client feedback" title="Client feedback."/><div className="reviews-content">{reviewState==='loading'&&<p className="status-copy">Loading feedback…</p>}{reviewState==='error'&&<p className="status-copy">Client feedback is temporarily unavailable.</p>}{reviewState==='ready'&&reviews.length===0&&<p className="status-copy">No public reviews yet. Have we worked together? <Link href="/review">Share your experience.</Link></p>}{reviews.length>0&&<TestimonialsColumns reviews={reviews}/>}</div></div></section>
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
