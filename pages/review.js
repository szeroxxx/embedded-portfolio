import Head from 'next/head'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { Footer, Header } from '../components/SiteChrome'

const initialForm = { project_name: '', client_name: '', rating: 5, review_text: '' }

export default function ReviewPage() {
  const router = useRouter()
  const [formData, setFormData] = useState(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (typeof router.query.project === 'string') {
      setFormData((current) => current.project_name ? current : { ...current, project_name: router.query.project })
    }
  }, [router.query.project])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setError('')
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data.error || 'Your review could not be submitted.')
      setSubmitted(true)
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (event) => setFormData((current) => ({ ...current, [event.target.name]: event.target.value }))

  return <div className="site">
    <Head><title>Share a review — Dhara Rajpura</title><meta name="description" content="Share feedback about your PCB or embedded hardware project with Dhara Rajpura." /><meta name="robots" content="noindex" /></Head>
    <Header />
    <main className="review-page grid-bg"><div className="shell review-page-grid">
      <section className="review-intro"><span className="tech-label text-cyan">Client feedback</span><h1>{submitted ? 'Thank you for the feedback.' : 'Share your project experience.'}</h1><p>{submitted ? 'Your review has been saved and is now connected to the portfolio.' : 'A short, honest review helps future clients understand the quality of the engineering process and handoff.'}</p>{submitted && <a className="button button-lime" href="/">Return to portfolio</a>}</section>
      {!submitted && <motion.form className="review-form" onSubmit={handleSubmit} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
        <label htmlFor="client-name">Your name</label><input id="client-name" name="client_name" value={formData.client_name} onChange={handleChange} maxLength={80} autoComplete="name" required />
        <label htmlFor="project-name">Project name</label><input id="project-name" name="project_name" value={formData.project_name} onChange={handleChange} maxLength={120} required />
        <fieldset><legend>Rating</legend><div className="rating-picker">{[1, 2, 3, 4, 5].map((star) => <button key={star} type="button" onClick={() => setFormData((current) => ({ ...current, rating: star }))} aria-label={`${star} star${star === 1 ? '' : 's'}`} aria-pressed={formData.rating === star}>{star <= formData.rating ? '★' : '☆'}</button>)}</div></fieldset>
        <label htmlFor="review-text">Your review</label><textarea id="review-text" name="review_text" value={formData.review_text} onChange={handleChange} maxLength={2000} rows={7} required />
        {error && <p className="form-message form-error" role="alert">{error}</p>}
        <button className="button button-lime" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting…' : 'Submit review'}</button>
      </motion.form>}
    </div></main>
    <Footer />
  </div>
}
