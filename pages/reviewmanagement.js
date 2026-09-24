import Head from 'next/head'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Footer, Header } from '../components/SiteChrome'

export default function ReviewManagement() {
  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(false)
  const [workingId, setWorkingId] = useState(null)
  const [message, setMessage] = useState('')

  const adminRequest = async (options = {}, credential = password) => {
    const response = await fetch('/api/admin/reviews', {
      ...options,
      headers: {
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        'x-admin-password': credential,
        ...options.headers,
      },
      cache: 'no-store',
    })
    const data = await response.json().catch(() => ({}))
    if (!response.ok) throw new Error(data.error || 'The request could not be completed.')
    return data
  }

  const fetchReviews = async (credential = password) => {
    setLoading(true)
    setMessage('')
    try {
      const data = await adminRequest({}, credential)
      setReviews(Array.isArray(data) ? data : [])
      setAuthenticated(true)
    } catch (error) {
      setAuthenticated(false)
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    await fetchReviews(password)
  }

  const toggleVisibility = async (review) => {
    setWorkingId(review.id)
    setMessage('')
    try {
      const updated = await adminRequest({
        method: 'PATCH',
        body: JSON.stringify({ id: review.id, visible: !review.visible }),
      })
      setReviews((items) => items.map((item) => item.id === review.id ? updated : item))
      setMessage(`Review is now ${updated.visible ? 'visible' : 'hidden'} on the portfolio.`)
    } catch (error) {
      setMessage(error.message)
    } finally {
      setWorkingId(null)
    }
  }

  const removeReview = async (review) => {
    if (!window.confirm(`Permanently delete the review from ${review.client_name}?`)) return
    setWorkingId(review.id)
    setMessage('')
    try {
      await adminRequest({ method: 'DELETE', body: JSON.stringify({ id: review.id }) })
      setReviews((items) => items.filter((item) => item.id !== review.id))
      setMessage('Review deleted permanently.')
    } catch (error) {
      setMessage(error.message)
    } finally {
      setWorkingId(null)
    }
  }

  const logout = () => {
    setPassword('')
    setReviews([])
    setMessage('')
    setAuthenticated(false)
  }

  return <div className="site">
    <Head><title>Review management — Dhara Rajpura</title><meta name="robots" content="noindex,nofollow" /></Head>
    <Header />
    <main className="admin-page grid-bg"><div className="shell admin-shell">
      {!authenticated ? <motion.section className="admin-login" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
        <span className="tech-label text-cyan">Private workspace</span>
        <h1>Review management</h1>
        <p>Enter the admin password configured in Vercel to manage Google Sheet reviews.</p>
        <form onSubmit={handleLogin} className="review-form compact-form">
          <label htmlFor="admin-password">Admin password</label>
          <input id="admin-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required />
          {message && <p className="form-message form-error" role="alert">{message}</p>}
          <button className="button button-lime" type="submit" disabled={loading}>{loading ? 'Checking…' : 'Open dashboard'}</button>
        </form>
      </motion.section> : <section>
        <div className="admin-heading"><div><span className="tech-label text-cyan">Private workspace</span><h1>Review management</h1><p>{reviews.length} review{reviews.length === 1 ? '' : 's'} in the connected Sheet.</p></div><div className="admin-actions"><button className="button button-ghost" onClick={() => fetchReviews()} disabled={loading}>Refresh</button><button className="button button-ghost" onClick={logout}>Log out</button></div></div>
        {message && <p className="form-message" role="status">{message}</p>}
        {loading ? <p className="admin-empty">Loading reviews…</p> : reviews.length === 0 ? <p className="admin-empty">No reviews are stored yet.</p> : <div className="admin-review-list">
          {reviews.map((review) => <article key={review.id} className="admin-review-card">
            <div className="admin-review-top"><div><div className="review-rating" aria-label={`${review.rating} out of 5 stars`}><span aria-hidden="true">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span><b>{review.rating}/5</b></div><h2>{review.client_name}</h2><p>{review.project_name}</p></div><span className={`visibility-pill ${review.visible ? 'is-visible' : 'is-hidden'}`}>{review.visible ? 'Visible' : 'Hidden'}</span></div>
            <blockquote>“{review.review_text}”</blockquote>
            <div className="admin-review-meta"><span>{review.created_at ? new Date(review.created_at).toLocaleDateString() : 'Date unavailable'}</span><div><button onClick={() => toggleVisibility(review)} disabled={workingId === review.id}>{workingId === review.id ? 'Saving…' : review.visible ? 'Hide review' : 'Show review'}</button><button className="danger-action" onClick={() => removeReview(review)} disabled={workingId === review.id}>Delete</button></div></div>
          </article>)}
        </div>}
      </section>}
    </div></main>
    <Footer />
  </div>
}
