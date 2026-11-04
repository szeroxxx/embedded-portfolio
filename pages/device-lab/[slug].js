import { readFile } from 'node:fs/promises';
import path from 'node:path';
import Image from 'next/image';
import Link from 'next/link';
import Seo from '../../components/Seo';
import { Header, Footer } from '../../components/SiteChrome';
import { studies } from '../../lib/device-lab.mjs';
import { breadcrumbSchema, PERSON_ID, SITE_URL } from '../../lib/site.mjs';
import s from '../../styles/device-lab.module.css';

function Files({ study, source }) {
  const downloads = [
    { label:'Arduino sketch', type:'.ino', href:study.firmware },
    { label:'Circuit schematic', type:'.png', href:study.schematic },
    { label:'Complete study kit', type:'.zip', href:study.kit },
  ];
  return <section id="files" className={s.readSection}>
    <div className={s.eyebrow}>Project resources</div>
    <h2>Build files</h2>
    <p>Open the sketch in Arduino IDE or download the kit to keep the files together.</p>
    <div className={s.fileShelf}>{downloads.map(file => <a key={file.href} href={file.href} download>
      <span className={s.fileType}>{file.type}</span><span>{file.label}</span><span className={s.fileArrow} aria-hidden="true">↓</span>
    </a>)}</div>
    <details className={s.source}><summary>Read the complete firmware</summary><pre tabIndex={0} aria-label="Arduino firmware source code"><code>{source}</code></pre></details>
  </section>;
}

function Film({ study }) {
  return <section id="film" className={s.readSection}>
    <div className={s.eyebrow}>Watch the study</div>
    <h2>The film</h2>
    <div className={s.slot} aria-label={study.youtubeId ? undefined : 'Reserved space for the YouTube film'}>
      {study.youtubeId && <iframe src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(study.youtubeId)}`} title={study.title} loading="lazy" allow="encrypted-media; picture-in-picture" allowFullScreen />}
    </div>
  </section>;
}

export default function DeviceStudy({ study, source }) {
  const route = `/device-lab/${study.slug}`;
  const entries = [{ id:'parts', title:'Hardware' }, ...study.sections, { id:'schematic', title:'Schematic' }, { id:'files', title:'Build files' }, { id:'film', title:'The film' }];
  const meta = {
    '@type':'TechArticle', '@id':`${SITE_URL}${route}#article`, headline:study.title, description:study.summary,
    url:SITE_URL+route, mainEntityOfPage:{'@id':`${SITE_URL}${route}#webpage`}, author:{'@id':PERSON_ID}, image:SITE_URL+study.cover, inLanguage:'en',
  };
  return <div className="site">
    <Seo title={`${study.title} | Device Lab by Dhara Rajpura`} description={study.summary} path={route}
      image={study.cover} imageAlt={`Illustrated cover of ${study.title}`} type="article"
      schema={[meta,breadcrumbSchema([{name:'Home',path:'/'},{name:'Device Lab',path:'/device-lab'},{name:study.title,path:route}])]} />
    <Header />
    <main className={s.paper}><article className={s.shell}>
      <header className={s.articleHero}>
        <nav aria-label="Breadcrumb" className={s.crumb}><Link href="/device-lab">← Device Lab</Link><span>Study {String(study.number).padStart(2,'0')}</span></nav>
        <div className={s.articleGrid}><div>
          <div className={s.eyebrow}>{study.platform}</div>
          <h1>{study.title}</h1><p className={s.deck}>{study.deck}</p>
          <div className={s.byline}>A device study by <Link href="/about">Dhara Rajpura</Link></div>
          <div className={s.tags}>{study.tags.map(tag=><span key={tag}>{tag}</span>)}</div>
        </div><figure className={s.figure}><Image src={study.cover} alt={`Illustrated cover of ${study.title}`} width={1280} height={720} sizes="(max-width:800px) 100vw, 47vw" priority /><figcaption>Fig. 01 <span>/</span> Study illustration</figcaption></figure></div>
      </header>
      <div className={s.readGrid}>
        <aside className={s.contents}><nav aria-label="Study contents"><div className={s.eyebrow}>In this study</div><ol>{entries.map(item=><li key={item.id}><a href={`#${item.id}`}>{item.title}</a></li>)}</ol></nav></aside>
        <div className={s.prose}>
          <section id="parts" className={s.readSection}><div className={s.eyebrow}>On the bench</div><h2>Hardware</h2><ul className={s.parts}>{study.parts.map(part=><li key={part}>{part}</li>)}</ul></section>
          {study.sections.map(section=><section id={section.id} key={section.id} className={s.readSection}><h2>{section.title}</h2>{section.paragraphs.map(p=><p key={p}>{p}</p>)}{section.steps?.length > 0 && <ol className={s.steps}>{section.steps.map(step=><li key={step}>{step}</li>)}</ol>}</section>)}
          <section id="schematic" className={s.readSection}><div className={s.eyebrow}>Circuit reference</div><h2>Schematic</h2>
            <figure className={s.schematic}><a href={study.schematic} aria-label="Open full-size schematic">
              <Image src={study.schematic} alt={`Circuit schematic for ${study.title}`} width={1006} height={534} sizes="(max-width: 800px) 100vw, 750px" unoptimized />
            </a><figcaption><span>Fig. 02 <span>/</span> Circuit drawing</span><a href={study.schematic}>Open full size ↗</a></figcaption></figure>
          </section>
          <Files study={study} source={source} />
          <Film study={study} />
          {study.referenceUrl && <p className={s.reference}>Project reference <a href={study.referenceUrl}>Original smart-device video ↗</a></p>}
          <Link href="/device-lab" className={s.return}>← All device studies</Link>
        </div>
      </div>
    </article></main>
    <Footer />
  </div>;
}

export function getStaticPaths() {
  return { paths:studies.map(({slug})=>({params:{slug}})), fallback:false };
}

export async function getStaticProps({ params }) {
  const study = studies.find(item=>item.slug === params.slug);
  if (!study) return { notFound:true };
  const source = await readFile(path.join(process.cwd(),'public',study.firmware),'utf8');
  return { props:{study,source} };
}
