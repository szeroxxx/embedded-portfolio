export function normalizeReview(review) {
  const rating = Math.max(0, Math.min(5, Math.round(Number(review?.rating) || 0)));
  return {
    id: review?.id,
    clientName: review?.client_name || "Verified client",
    reviewText: review?.review_text || "",
    rating,
    stars: `${"★".repeat(rating)}${"☆".repeat(5 - rating)}`,
  };
}
