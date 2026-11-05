import Link from 'next/link';
import Image from 'next/image';
import { Header, Footer } from '../components/SiteChrome';
import Seo from '../components/Seo';
import { breadcrumbSchema } from '../lib/site.mjs';
import styles from '../styles/resources.module.css';

const sections = [
  {
    title: 'Engineering Notes',
    href: '/blog',
    image: '/media/notes-and-lab/board-routing.svg',
    caption: 'Signal routing',
    copy: 'Practical notes on PCB design, schematic review, and manufacturing handoff.',
    action: 'Read engineering notes',
  },
  {
    title: 'Device Lab',
    href: '/device-lab',
    image: '/media/notes-and-lab/motor-travel.svg',
    caption: 'End of travel',
    copy: 'Explore working mechanisms through diagrams, firmware, and downloadable build files.',
    action: 'Explore the lab',
  },
];

export default function NotesAndLab() {
  return (
    <div className="site">
      <Seo
        title="Notes & Lab | PCB Design Guides & Device Studies | Dhara Rajpura"
        description="Explore Dhara’s engineering notes on PCB design and hands-on Device Lab studies with diagrams, firmware, and build files."
        path="/resources"
        schema={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Notes & Lab', path: '/resources' }])}
      />
      <Header />
      <main className={styles.page}>
        <div className="shell">
          <header className={styles.intro}>

            <h1>Notes &amp; Lab</h1>
          </header>
          <div className={styles.shelves}>
            {sections.map(section => (
              <article key={section.href}>
                <Link href={section.href} className={styles.card}>
                  <figure className={styles.cover}>
                    <Image src={section.image} width={800} height={450} alt="" />
                    <figcaption className={styles.figure}>{section.caption}</figcaption>
                  </figure>
                  <h2>{section.title}</h2>
                  <p>{section.copy}</p>
                  <span className={styles.action}>
                    {section.action}
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
