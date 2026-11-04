import Link from 'next/link';
import Image from 'next/image';
import { Header, Footer } from '../components/SiteChrome';
import Seo from '../components/Seo';
import { breadcrumbSchema } from '../lib/site.mjs';
import { studies } from '../lib/device-lab.mjs';
import { articles } from '../lib/blog.mjs';
import styles from '../styles/resources.module.css';

export default function Resources() {
  const shelves = [
    { title: 'Blog', href: '/blog', label: 'Engineering notes', image: articles[0].image,
      alt: articles[0].imageAlt, copy: 'Practical guides to planning a PCB, reviewing a schematic and handing a design to manufacturing.', action: 'Browse the blog' },
    { title: 'Device Lab', href: '/device-lab', label: 'Animated build guides', image: studies[0]?.cover,
      alt: 'ESP32 smart curtain concept model on a workbench', copy: 'Follow a working mechanism from the motor to the code. Each study includes a schematic, firmware and downloadable build files.', action: 'Explore Device Lab' },
  ];
  return <div className="site">
    <Seo title="Resources | PCB Design Blog & Device Lab | Dhara Rajpura" description="Browse Dhara’s PCB design articles and animated device studies with source code, schematics and project downloads." path="/resources" schema={breadcrumbSchema([{name:'Home',path:'/'},{name:'Resources',path:'/resources'}])} />
    <Header />
    <main className={styles.page}><div className="shell">
      <header className={styles.intro}><span className="tech-label">Dhara Rajpura / Engineering library</span><h1>Resources</h1></header>
      <div className={styles.shelves}>{shelves.map(shelf=><article key={shelf.href}>
        <Link href={shelf.href} className={styles.card}>
          {shelf.image && <Image src={shelf.image} width={720} height={405} sizes="(max-width: 680px) 100vw, 48vw" alt={shelf.alt || ''} />}
          <div className={styles.copy}><span className="tech-label">{shelf.label}</span><h2>{shelf.title}</h2><p>{shelf.copy}</p><strong>{shelf.action} ↗</strong></div>
        </Link>
      </article>)}</div>
    </div></main>
    <Footer />
  </div>;
}
