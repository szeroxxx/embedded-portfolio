import { useState } from "react";
import { normalizeReview } from "../../lib/reviews.mjs";

function ReviewCard({ review }) {
  const item = normalizeReview(review);
  const initials = item.clientName.trim().split(/\s+/).slice(0, 2).map(part => part[0]).join("");

  return (
    <blockquote className="testimonial-card">
      <div className="review-rating" aria-label={`${item.rating} out of 5 stars`}>
        <span aria-hidden="true">{item.stars}</span>
        <b aria-hidden="true">{item.rating}/5</b>
      </div>
      <p>“{item.reviewText}”</p>
      <footer><span className="testimonial-initials" aria-hidden="true">{initials}</span><span>{item.clientName}</span></footer>
    </blockquote>
  );
}

function Columns({ reviews, count, className }) {
  const baseSize = Math.floor(reviews.length / count);
  const remainder = reviews.length % count;
  const groups = Array.from({ length: count }, (_, index) => {
    const size = baseSize + (index >= count - remainder ? 1 : 0);
    const start = index * baseSize + Math.max(0, index - (count - remainder));
    return reviews.slice(start, start + size);
  }).filter(group => group.length);

  return (
    <div className={`testimonial-columns ${className}`} style={{ "--review-columns": groups.length }} aria-hidden="true">
      {groups.map((group, column) => (
        <div className="testimonial-column" key={column}>
          <div className="testimonial-track" style={{ "--review-duration": `${76 + column * 11}s` }}>
            {[0, 1].map(copy => (
              <div className="testimonial-track-group" key={copy}>
                {Array.from({ length: Math.ceil(4 / group.length) }, () => group).flat().map((review, index) => <ReviewCard key={`${review.id || "review"}-${index}-${copy}`} review={review} />)}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function TestimonialsColumns({ reviews }) {
  const [paused, setPaused] = useState(false);
  const [reading, setReading] = useState(false);

  return (
    <div className={`testimonial-showcase${paused ? " is-paused" : ""}${reading ? " is-reading" : ""}`}>
      <div className="testimonial-toolbar">
        <p>Pause the columns or read every review at your own pace.</p>
        <div className="testimonial-controls">
          <button type="button" className="testimonial-pause" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? "Resume reviews" : "Pause reviews"}</button>
          <button type="button" className="testimonial-read-all" aria-pressed={reading} aria-controls="all-client-reviews" onClick={() => setReading(!reading)}>{reading ? "Show moving columns" : "Read all reviews"}</button>
        </div>
      </div>
      <div className="testimonial-motion">
        <Columns reviews={reviews} count={3} className="testimonial-desktop" />
        <Columns reviews={reviews} count={2} className="testimonial-tablet" />
        <Columns reviews={reviews} count={1} className="testimonial-mobile" />
      </div>
      <ol id="all-client-reviews" className="testimonial-originals">
        {reviews.map((review, index) => <li key={review.id || index}><ReviewCard review={review} /></li>)}
      </ol>
      <noscript><style>{`.testimonial-motion,.testimonial-toolbar{display:none!important}.testimonial-originals{position:static!important;width:auto!important;height:auto!important;overflow:visible!important;clip-path:none!important;margin:0!important}`}</style></noscript>
    </div>
  );
}
