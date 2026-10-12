import Link from 'next/link';
import Seo from '../../components/Seo';
import BlogCards from '../../components/BlogCards';
import { Header, Footer, PageIntro } from '../../components/SiteChrome';
import { blogSchema } from '../../lib/blog.mjs';
import { breadcrumbSchema } from '../../lib/site.mjs';

export default function BlogIndex() {
  return <div className="site blog-page">
    <Seo title="PCB Design & Embedded Hardware Blog | Dhara Rajpura" description="Practical PCB design guides by Dhara Rajpura: prepare a project brief, review a board before manufacturing and plan a clearer hardware handoff." path="/blog" image="/media/blog/pcb-design-quote-brief.webp" imageAlt="PCB project planning concept illustration" schema={[blogSchema, breadcrumbSchema([{name:'Home',path:'/'},{name:'Blog',path:'/blog'}])]} />
    <Header /><main><PageIntro eyebrow="Engineering notes / By Dhara Rajpura" title="Better questions. Better boards." copy="Practical guides for founders and hardware teams planning a PCB, preparing a design review or making a manufacturing handoff." />
      <section className="section blog-library" aria-labelledby="blog-guides"><div className="shell"><div className="blog-library-heading"><div><span className="tech-label">From the brief to the build</span><h2 id="blog-guides">Start with the decision<br />in front of you.</h2></div><p>Clear requirements and careful review make the next engineering step easier to define.</p></div><BlogCards /></div></section>
      <section className="contact-section"><div className="shell contact-grid"><div><div className="tech-label text-lime">Put the guide to work</div><h2>Let’s look at<br />your hardware.</h2></div><div><p>Send your product requirements and current design files. We can define the right scope for a new PCB or a focused review.</p><Link href="/contact" className="button button-lime focus-ring">Discuss a project ↗</Link></div></div></section>
    </main><Footer />
  </div>;
}
