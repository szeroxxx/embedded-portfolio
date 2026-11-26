import "@/styles/globals.css";
import "@/styles/blog.css";
import "@/styles/foundation.css";
import "@/styles/interiors.css";
import "@/styles/home.css";
import { usePortfolioHistory } from "../components/BackLink";
import GoogleAnalytics from "../components/GoogleAnalytics";

export default function App({ Component, pageProps }) {
  usePortfolioHistory();
  return <><GoogleAnalytics /><Component {...pageProps} /></>;
}
