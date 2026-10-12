import Link from 'next/link';
import Image from 'next/image';
import { articles, readingMinutes } from '../lib/blog.mjs';

export default function BlogCards({ items = articles }) {
  return <div className="blog-cards">{items.map(article => <article className="blog-card" key={article.slug}>
    <Link className="blog-card-link focus-ring" href={`/blog/${article.slug}`}>
      <div className="blog-card-art"><Image src={article.image} alt={article.imageAlt} width={1774} height={887} sizes="(max-width: 700px) 100vw, 50vw" /></div>
      <div className="blog-card-copy"><div className="blog-card-meta"><span>{article.category}</span><span>{readingMinutes(article)} min read</span></div>
        <h3>{article.title}</h3><p>{article.deck}</p><span className="blog-read">Read the guide <span aria-hidden="true">↗</span></span>
      </div>
    </Link>
  </article>)}</div>;
}
