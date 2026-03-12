import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'

export default function ReviewPage() {
  const router = useRouter()
  const { project } = router.query
  
  const [formData, setFormData] = useState({
    project_name: project || '',
    client_name: '',
    rating: 5,
    review_text: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        alert('Error submitting review. Please try again.')
      }
    } catch (error) {
      alert('Error submitting review. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (submitted) {
    return (
      <Layout>
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-4">Thank You!</h1>
            <p className="text-gray-400 mb-8">Your review has been submitted successfully. It will appear on the portfolio shortly.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors"
            >
              Back to Portfolio
            </motion.button>
          </motion.div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="min-h-screen bg-[#0a0a0a] py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Share Your Experience
            </h1>
            <p className="text-gray-400 text-lg">
              Your feedback helps me improve and showcases the quality of work to future clients.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-gray-800"
          >
            <div className="space-y-6">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="client_name"
                  value={formData.client_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Project Name *
                </label>
                <input
                  type="text"
                  name="project_name"
                  value={formData.project_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors"
                  placeholder="Enter project name"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Rating *
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className={`text-3xl ${
                        star <= formData.rating ? 'text-yellow-400' : 'text-gray-600'
                      } hover:text-yellow-300 transition-colors`}
                    >
                      ★
                    </motion.button>
                  ))}
                  <span className="ml-2 text-gray-400 self-center">
                    ({formData.rating} star{formData.rating !== 1 ? 's' : ''})
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Your Review *
                </label>
                <textarea
                  name="review_text"
                  value={formData.review_text}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-white/10 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors resize-none"
                  placeholder="Share your experience working with me..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>
    </Layout>
  )
}