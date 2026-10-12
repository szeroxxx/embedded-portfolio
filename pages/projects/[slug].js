import Link from "next/link";
import Image from "next/image";
import { Header, Footer, PageIntro } from "../../components/SiteChrome";
import Seo from "../../components/Seo";
import { projectsData } from "../../lib/projects.mjs";
import { servicesData } from "../../lib/services.mjs";
import { breadcrumbSchema, projectSchema } from "../../lib/site.mjs";

export default function ProjectPage({ project, relatedServices }) {
  const path = `/projects/${project.slug}`;
  const description = project.seoDescription || project.overview;
  return (
    <div className="site detail-page">
      <Seo title={project.seoTitle || `${project.title} — Dhara Rajpura`} description={description} path={path}
        image={project.images[0]} imageAlt={`${project.title} engineering concept`}
        schema={[projectSchema(project), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Projects", path: "/projects" }, { name: project.title, path }])]} />
      <Header />
      <main>
        <PageIntro eyebrow={`Case study / ${project.year}`} title={project.title} copy={project.overview} />
        <div className="shell detail-breadcrumb">
          <nav aria-label="Breadcrumb"><ol><li><Link href="/">Home</Link></li><li><Link href="/projects">Projects</Link></li><li aria-current="page">{project.title}</li></ol></nav>
        </div>
        <section className="section section-paper detail-scope" aria-labelledby="project-scope">
          <div className="shell detail-two-column">
            <div><div className="tech-label">Engineering contribution</div><h2 id="project-scope">Role &amp; scope</h2><dl className="detail-facts"><div><dt>Role</dt><dd>{project.role}</dd></div><div><dt>Year</dt><dd>{project.year}</dd></div></dl></div>
            <div className="detail-body"><p className="large-copy">{project.scope}</p><h3>Technical highlights</h3><ul className="detail-list">{project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul><h3>Tools &amp; skills</h3><div className="chip-row">{[...new Set([...project.tools, ...project.skills])].map((tool) => <span key={tool}>{tool}</span>)}</div></div>
          </div>
        </section>
        <section className="section section-ink detail-gallery-section" aria-labelledby="project-visuals">
          <div className="shell">
            <div className="section-title"><div className="tech-label text-cyan">Scope in context</div><h2 id="project-visuals">Engineering concepts.</h2><p>These visuals explain the project’s hardware scope. They are concept presentations, not photographs of fabricated client hardware.</p></div>
            <div className="detail-gallery">{project.images.map((image, index) => <figure key={image}><div className="detail-gallery-frame"><Image src={image} alt={`${project.title}: ${index === 0 ? "hardware overview" : index === 1 ? "system architecture" : "hardware design detail"} concept illustration`} width={1600} height={900} sizes="(max-width: 700px) 100vw, 50vw" /></div><figcaption><span className="tech-label">Concept / {String(index + 1).padStart(2, "0")}</span><span>{index === 0 ? "Hardware overview" : index === 1 ? "System architecture" : "Design detail"}</span></figcaption></figure>)}</div>
          </div>
        </section>
        {relatedServices.length > 0 && <section className="section section-dark" aria-labelledby="project-services"><div className="shell"><div className="section-title"><div className="tech-label text-cyan">Work with Dhara</div><h2 id="project-services">Related services.</h2></div><div className="detail-link-list">{relatedServices.map((service) => <Link href={`/services/${service.slug}`} key={service.slug}><span>{service.title}</span><span aria-hidden="true">↗</span></Link>)}</div></div></section>}
        <section className="contact-section"><div className="shell contact-grid"><div><div className="tech-label text-lime">Your next board</div><h2>Bring the requirements.<br />Let’s define the hardware.</h2></div><div><p>Share your product goal, current files and constraints to discuss a defined PCB or embedded hardware engagement.</p><Link href="/contact" className="button button-lime">Discuss your project ↗</Link></div></div></section>
      </main>
      <Footer />
    </div>
  );
}

export function getStaticPaths() {
  return { paths: projectsData.map((project) => ({ params: { slug: project.slug } })), fallback: false };
}

export function getStaticProps({ params }) {
  const project = projectsData.find((item) => item.slug === params.slug);
  if (!project) return { notFound: true };
  const relatedServices = servicesData.filter((service) => service.projectSlugs.includes(project.slug));
  return { props: { project, relatedServices } };
}
