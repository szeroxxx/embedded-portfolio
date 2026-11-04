import Image from 'next/image';
import Link from 'next/link';
import Seo from '../../components/Seo';
import { Header, Footer } from '../../components/SiteChrome';
import { studies } from '../../lib/device-lab.mjs';
import { breadcrumbSchema } from '../../lib/site.mjs';
import s from '../../styles/device-lab.module.css';

export default function DeviceLab() {
  const [latest, ...earlier] = studies;
  return <div className="site">
    <Seo title="Device Lab | Animated DIY Electronics by Dhara Rajpura"
      description="Explore animated DIY devices with Dhara Rajpura. Follow each mechanism, read the firmware, and download the schematic and source files."
      path="/device-lab" image={latest?.cover} imageAlt="Illustrated cover of the latest Device Lab study"
      schema={breadcrumbSchema([{name:'Home',path:'/'},{name:'Device Lab',path:'/device-lab'}])} />
    <Header />
    <main className={s.paper}>
      <div className={s.shell}>
        <header className={s.masthead}>
          <div className={s.eyebrow}>An engineering notebook <span>/</span> Dhara Rajpura</div>
          <div className={s.mastGrid}>
            <h1>Device <em>Lab</em></h1>
            <p>Small machines, opened up. Explore the mechanism in each animation, then follow it into the schematic and code.</p>
          </div>
        </header>
        {latest && <section className={s.lead} aria-labelledby="latest-title">
          <div className={s.sectionRule}><span>Latest study</span><span>No. {String(latest.number).padStart(2,'0')}</span></div>
          <div className={s.feature}>
            <Link href={`/device-lab/${latest.slug}`} className={s.coverLink} aria-label={`Read ${latest.title}`}>
              <Image src={latest.cover} alt={`Illustrated cover of ${latest.title}`} width={1280} height={720} sizes="(max-width: 800px) 100vw, 56vw" priority />
            </Link>
            <div className={s.featureCopy}>
              <div className={s.eyebrow}>{latest.platform}</div>
              <h2 id="latest-title"><Link href={`/device-lab/${latest.slug}`}>{latest.title}</Link></h2>
              <p>{latest.summary}</p>
              <Link className={s.action} href={`/device-lab/${latest.slug}`}>Read the study <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </section>}
        {earlier.length > 0 && <section className={s.archive} aria-labelledby="archive-title">
          <h2 id="archive-title">Earlier studies</h2>
          {earlier.map(study => <Link key={study.slug} href={`/device-lab/${study.slug}`} className={s.archiveRow}>
            <span className={s.eyebrow}>{String(study.number).padStart(2,'0')}</span><span>{study.title}</span><span aria-hidden="true">↗</span>
          </Link>)}
        </section>}
        {!latest && <p className={s.empty}>The first study will appear here.</p>}
      </div>
    </main>
    <Footer />
  </div>;
}
