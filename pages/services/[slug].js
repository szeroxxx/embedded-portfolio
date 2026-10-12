import Link from "next/link";
import Image from "next/image";
import { Header, Footer, PageIntro } from "../../components/SiteChrome";
import Seo from "../../components/Seo";
import { articles } from "../../lib/blog.mjs";
import { servicesData } from "../../lib/services.mjs";
import { projectsData } from "../../lib/projects.mjs";
import { breadcrumbSchema, serviceSchema } from "../../lib/site.mjs";

export default function ServicePage({ service, relevantProjects }) {
  const path = `/services/${service.slug}`;
  const guide = articles.find(article => article.serviceSlug === service.slug);
  return (
    <div className="site detail-page">
      <Seo title={service.seoTitle} description={service.description} path={path} image={service.image}
        imageAlt={`${service.title} service concept`}
        schema={[serviceSchema(service), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: service.title, path }])]} />
      <Header />
      <main>
        <PageIntro eyebrow={`Engineering service / ${service.n}`} title={service.title} copy={service.summary} />
        <div className="shell detail-breadcrumb"><nav aria-label="Breadcrumb"><ol><li><Link href="/">Home</Link></li><li><Link href="/services">Services</Link></li><li aria-current="page">{service.title}</li></ol></nav></div>
        <section className="section section-dark" aria-labelledby="service-overview"><div className="shell service-detail"><div><figure className="detail-service-art"><Image src={service.image} alt={`${service.title}: illustrative engineering service overview`} width={1200} height={900} sizes="(max-width: 700px) 100vw, 45vw" /><figcaption>Concept illustration of the service scope.</figcaption></figure></div><div className="detail-body"><div className="tech-label text-cyan">A defined engagement</div><h2 id="service-overview">Where I can help.</h2><p className="large-copy">{service.intro}</p>{guide && <p className="guide-service-link"><Link href={`/blog/${guide.slug}`}>Practical guide: {guide.title} ↗</Link></p>}<h3>Who this is for</h3><p>{service.audience}</p><div className="service-columns"><section><h3>What I handle</h3><ul>{service.work.map((item) => <li key={item}>{item}</li>)}</ul></section><section><h3>Deliverables</h3><ul>{service.deliverables.map((item) => <li key={item}>{item}</li>)}</ul></section></div><div className="boundary"><strong>Scope boundary</strong><p>{service.boundary}</p></div><Link href="/contact" className="button button-lime detail-inline-cta">Discuss this service ↗</Link></div></div></section>
        <section className="section section-paper" aria-labelledby="service-questions"><div className="shell detail-two-column"><div><div className="tech-label">Before we begin</div><h2 id="service-questions">Useful questions.<br />Clear answers.</h2></div><div className="detail-faq">{service.faqs.map((faq) => <article key={faq.question}><h3>{faq.question}</h3><p>{faq.answer}</p></article>)}</div></div></section>
        {relevantProjects.length > 0 && <section className="section section-ink" aria-labelledby="service-projects"><div className="shell"><div className="section-title"><div className="tech-label text-cyan">Documented work</div><h2 id="service-projects">Related case studies.</h2><p>Explore the hardware, design decisions and scope of my contribution.</p></div><div className="detail-project-list">{relevantProjects.map((project) => <article key={project.slug}><div className="tech-label text-cyan">{project.kicker} · {project.year}</div><h3><Link href={`/projects/${project.slug}`}>{project.title} <span aria-hidden="true">↗</span></Link></h3><p>{project.overview}</p><span className="detail-project-role">{project.role}</span></article>)}</div></div></section>}
        <section className="contact-section"><div className="shell contact-grid"><div><div className="tech-label text-lime">Remote collaboration / Worldwide</div><h2>Let’s define<br />your next step.</h2></div><div><p>Send your product requirements, current design stage and available files. We can agree on the engineering scope and deliverables before work begins.</p><Link href="/contact" className="button button-lime">Start a project ↗</Link></div></div></section>
      </main>
      <Footer />
    </div>
  );
}

export function getStaticPaths() {
  return { paths: servicesData.map((service) => ({ params: { slug: service.slug } })), fallback: false };
}

export function getStaticProps({ params }) {
  const service = servicesData.find((item) => item.slug === params.slug);
  if (!service) return { notFound: true };
  const relevantProjects = projectsData.filter((project) => service.projectSlugs.includes(project.slug));
  return { props: { service, relevantProjects } };
}
