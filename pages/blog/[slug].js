import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import Seo from '../../components/Seo';
import BlogCards from '../../components/BlogCards';
import { Header, Footer } from '../../components/SiteChrome';
import { articles, articleSchema, blogSchema, readingMinutes, displayDate } from '../../lib/blog.mjs';
import { breadcrumbSchema } from '../../lib/site.mjs';
import { projectsData } from '../../lib/projects.mjs';

function ArticleSection({ section }) {
  return <section id={section.id} className="article-section" aria-labelledby={`${section.id}-title`}>
    <h2 id={`${section.id}-title`}>{section.title}</h2>
    {section.paragraphs?.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
    {section.checklist && <ul className="article-checklist">{section.checklist.map(item => <li key={item}>{item}</li>)}</ul>}
    {section.table && <div className="article-table-scroll" role="region" tabIndex={0} aria-label={section.table.caption}><table><caption>{section.table.caption}</caption><thead><tr>{section.table.headers.map(header => <th scope="col" key={header}>{header}</th>)}</tr></thead><tbody>{section.table.rows.map(row => <tr key={row[0]}><th scope="row">{row[0]}</th>{row.slice(1).map(cell => <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div>}
    {section.template && <div className="article-template"><div className="tech-label">Copy into your project notes</div><pre>{section.template}</pre><a href="/resources/pcb-project-brief.txt" download className="article-download focus-ring">Download the blank brief (.txt) <span aria-hidden="true">↓</span></a></div>}
    {section.source && <p className="article-source">Reference: <a href={section.source.href}>{section.source.label} <span aria-hidden="true">↗</span></a></p>}
    {section.links && <div className="article-related-links">{section.links.map(link => <Link key={link.href} href={link.href}>{link.label} <span aria-hidden="true">↗</span></Link>)}</div>}
  </section>;
}

export default function ArticlePage({ article, project }) {
  const path = `/blog/${article.slug}`;
  const date = article.date;
  return <div className="site blog-page">
    <Seo title={article.seoTitle} description={article.description} path={path} image={article.image} imageAlt={article.imageAlt} type="article" schema={[blogSchema, articleSchema(article), breadcrumbSchema([{name:'Home',path:'/'},{name:'Blog',path:'/blog'},{name:article.title,path}])]} />
    <Head><meta property="article:published_time" content={date} /><meta property="article:modified_time" content={date} /><meta property="article:author" content="https://www.dhara.website/about" /></Head>
    <Header /><main>
      <article>
        <header className="article-hero"><div className="shell"><nav className="article-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/blog">Engineering notes</Link></nav><div className="article-hero-grid"><div><div className="tech-label">{article.category}</div><h1>{article.title}</h1><p className="article-deck">{article.deck}</p><div className="article-byline"><Image src="/media/dhara-rajpura-profile.jpg" alt="" width={48} height={48} /><div><Link href="/about">Dhara Rajpura</Link><span>PCB &amp; embedded hardware engineer</span></div></div><div className="article-date"><time dateTime={article.date}>{displayDate(article.date)}</time><span aria-hidden="true">·</span><span>{readingMinutes(article)} min read</span></div></div><figure><Image src={article.image} alt={article.imageAlt} width={1774} height={887} sizes="(max-width: 900px) 100vw, 50vw" priority /><figcaption>Editorial concept illustration; not a photograph of a client board.</figcaption></figure></div></div></header>
        <div className="article-reading"><div className="shell article-reading-grid"><aside className="article-toc"><nav aria-label="On this page"><span className="tech-label">On this page</span><ol>{article.sections.map(section => <li key={section.id}><a href={`#${section.id}`}>{section.title.replace(/^\d+\. /, '')}</a></li>)}</ol></nav><Link className="article-toc-service" href={`/services/${article.serviceSlug}`}>Explore the service <span aria-hidden="true">↗</span></Link></aside>
          <div className="article-prose">{article.intro.map(paragraph => <p key={paragraph}>{paragraph}</p>)}<aside className="article-takeaway" aria-label="The practical starting point"><span className="tech-label">The practical starting point</span><p>{article.takeaway}</p></aside>{article.sections.map(section => <ArticleSection key={section.id} section={section} />)}
            {article.references.length > 0 && <section className="article-references" aria-labelledby="article-references"><h2 id="article-references">Technical references</h2><p>Use the documentation for your installed EDA version and the datasheets for your selected components alongside this checklist.</p><ul>{article.references.map(reference => <li key={reference.href}><a href={reference.href}>{reference.label} <span aria-hidden="true">↗</span></a></li>)}</ul></section>}
            <section className="article-author" aria-label="About the author"><Image src="/media/dhara-rajpura-profile.jpg" alt="Dhara Rajpura" width={72} height={72} /><div><span className="tech-label">About the author</span><h2>Dhara Rajpura</h2><p>Freelance PCB design and embedded hardware engineer working with Altium Designer and KiCad. Explore my documented project scope and engineering services.</p><Link href="/about">About Dhara ↗</Link></div></section>
          </div>
        </div></div>
      </article>
      <section className="article-project-strip"><div className="shell"><span className="tech-label">Related documented work</span><h2><Link href={`/projects/${project.slug}`}>{project.title} <span aria-hidden="true">↗</span></Link></h2><p>{project.scope}</p></div></section>
      <section className="contact-section"><div className="shell contact-grid"><div><div className="tech-label text-lime">Your next engineering step</div><h2>{article.ctaTitle}</h2></div><div><p>{article.ctaCopy}</p><Link href="/contact" className="button button-lime focus-ring">Discuss your project ↗</Link></div></div></section>
      <section className="section blog-library" aria-labelledby="article-next-guide"><div className="shell"><div className="blog-library-heading"><div><span className="tech-label">Keep reading</span><h2 id="article-next-guide">The next useful guide.</h2></div><Link href="/blog" className="blog-all-link">All engineering notes ↗</Link></div><BlogCards items={articles.filter(item => item.slug !== article.slug)} /></div></section>
    </main><Footer />
  </div>;
}

export function getStaticPaths() { return { paths: articles.map(article => ({params:{slug:article.slug}})), fallback:false }; }
export function getStaticProps({ params }) {
  const article = articles.find(item => item.slug === params.slug);
  if (!article) return { notFound:true };
  return { props:{article, project:projectsData.find(item => item.slug === article.relatedProjectSlug)} };
}
