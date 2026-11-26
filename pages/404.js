import Head from "next/head";
import Link from "next/link";
import { Header, Footer, PageIntro } from "../components/SiteChrome";

export default function NotFound() {
  return <div className="site">
    <Head><title>Page not found | Dhara Rajpura</title></Head>
    <Header />
    <main><PageIntro title="Page not found" copy="The page may have moved. You can browse my projects or return to the homepage.">
      <div className="hero-actions"><Link href="/projects" className="button button-lime">View projects</Link><Link href="/" className="button button-ghost">Home</Link></div>
    </PageIntro></main>
    <Footer />
  </div>;
}
