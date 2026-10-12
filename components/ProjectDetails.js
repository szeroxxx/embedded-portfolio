import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { projectsData } from "../lib/projects.mjs";
export { projectsData };

export function ProjectCard({ project, onOpen, index=0 }) {
  return <article className="project-card group">
    <Link href={`/projects/${project.slug}`} className="block focus-ring" aria-label={`Read ${project.title} case study`}>
      <div className="project-frame"><Image src={project.images[0]} alt={`${project.title} concept presentation`} className="project-image" width={1600} height={900} sizes="(max-width: 700px) 100vw, (max-width: 1024px) 50vw, 33vw" /></div>
      <div className="project-copy"><div className="tech-label text-cyan">{project.kicker}</div><h3>{project.title}</h3><div className="project-meta"><span>{project.role}</span><span>0{index+1}</span></div><span className="text-link">Read case study ↗</span></div>
    </Link>
    {onOpen && <button className="project-preview focus-ring" onClick={()=>onOpen(project)} aria-label={`Quick preview of ${project.title}`}>Quick preview</button>}
  </article>;
}

export function ProjectModal({project,onClose}) {
  const [active,setActive]=useState(0); const closeRef=useRef(null);
  const dialogRef=useRef(null); const returnFocusRef=useRef(null);
  useEffect(()=>{returnFocusRef.current=document.activeElement;const background=[...document.querySelectorAll('.site > header, .site > main, .site > footer')];background.forEach(el=>{el.inert=true;el.setAttribute('aria-hidden','true')});const key=e=>{if(e.key==='Escape'){e.preventDefault();onClose();return}if(e.key!=='Tab'||!dialogRef.current)return;const focusable=[...dialogRef.current.querySelectorAll('button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')].filter(el=>!el.hasAttribute('hidden'));if(!focusable.length)return;const first=focusable[0],last=focusable[focusable.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}};document.addEventListener('keydown',key);document.body.style.overflow='hidden';closeRef.current?.focus();return()=>{document.removeEventListener('keydown',key);document.body.style.overflow='';background.forEach(el=>{el.inert=false;el.removeAttribute('aria-hidden')});returnFocusRef.current?.focus?.()}},[onClose]);
  return <motion.div className="modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={onClose}><motion.div ref={dialogRef} className="case-modal" role="dialog" aria-modal="true" aria-labelledby="case-title" initial={{y:30,opacity:0}} animate={{y:0,opacity:1}} exit={{y:30,opacity:0}} onMouseDown={e=>e.stopPropagation()}><div className="modal-bar"><span className="tech-label">Project case study</span><button ref={closeRef} className="modal-close focus-ring" onClick={onClose} aria-label="Close project details">Close <span aria-hidden>×</span></button></div><div className="case-gallery"><div className="case-stage"><AnimatePresence mode="wait"><motion.div key={project.images[active]} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><Image src={project.images[active]} alt={`${project.title}, gallery image ${active+1}`} width={1600} height={900} sizes="(max-width: 700px) 100vw, 85vw" /></motion.div></AnimatePresence></div><div className="case-thumbs">{project.images.map((image,i)=><button key={image} onClick={()=>setActive(i)} className={`focus-ring ${active===i?"active":""}`} aria-label={`Show gallery image ${i+1}`} aria-pressed={active===i}><img src={image} alt="" /></button>)}</div><p className="concept-note">Concept visuals created to explain the engineering scope; not photographs of fabricated client hardware.</p></div><div className="case-content"><div className="tech-label text-lime">{project.kicker} · {project.year}</div><h2 id="case-title">{project.title}</h2><p className="case-lead">{project.overview}</p><div className="case-grid"><section><h3>Role & scope</h3><p><strong>{project.role}</strong></p><p>{project.scope}</p></section><section><h3>Technical highlights</h3><ul>{project.highlights.map(x=><li key={x}>{x}</li>)}</ul></section></div><section><h3>Tools & skills</h3><div className="chip-row">{[...project.tools,...project.skills].map(x=><span key={x}>{x}</span>)}</div></section></div></motion.div></motion.div>;
}
