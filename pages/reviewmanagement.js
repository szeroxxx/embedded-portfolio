import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/Layout'

export default function ReviewManagement() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === 'Loq@2202') {
      setIsAuthenticated(true)
      fetchReviews()
    } else {
      alert('Incorrect password')
    }
  }

  const fetchReviews = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/reviews', {
        headers: {
          'password': 'Loq@2202'
        }
      })
      if (response.ok) {
        const data = await response.json()
        setReviews(data)
      }
    } catch (error) {
      console.error('Error fetching reviews:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleVisibility = async (id, currentVisibility) => {
    try {
      const response = await fetch('/api/admin/reviews', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'password': 'Loq@2202'
        },
        body: JSON.stringify({
          id,
          visible: !currentVisibility
        })
      })

      if (response.ok) {
        setReviews(reviews.map(review => 
          review.id === id 
            ? { ...review, visible: !currentVisibility }
            : review
        ))
      }
    } catch (error) {
      console.error('Error updating review:', error)
    }
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}>
        ★
      </span>
    ))
  }

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full"
          >
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-gray-800">
              <h1 className="text-2xl font-bold text-white mb-6 text-center">
                Review Management
              </h1>
              <form onSubmit={handleLogin}>
                <div className="mb-6">
                  <label className="block text-white text-sm font-medium mb-2">
                    Admin Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors"
                    placeholder="Enter password"
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Login
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="min-h-screen bg-[#0a0a0a] py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex justify-between items-center">
              <h1 className="text-4xl font-bold text-white">Review Management</h1>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={fetchReviews}
                className="px-4 py-2 bg-white/10 text-white rounded-lg border border-gray-700 hover:bg-white/20 transition-colors"
              >
                Refresh
              </motion.button>
            </div>
            <p className="text-gray-400 mt-2">
              Manage review visibility on your portfolio
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              <p className="text-gray-400 mt-4">Loading reviews...</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {reviews.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-400">No reviews yet</p>
                </div>
              ) : (
                reviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-white/5 backdrop-blur-sm p-6 rounded-xl border ${
                      review.visible ? 'border-green-500/30' : 'border-red-500/30'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <h3 className="text-xl font-bold text-white">
                            {review.client_name}
                          </h3>
                          <div className="flex">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm mb-2">
                          Project: {review.project_name}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {new Date(review.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleVisibility(review.id, review.visible)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          review.visible
                            ? 'bg-green-500 text-white hover:bg-green-600'
                            : 'bg-red-500 text-white hover:bg-red-600'
                        }`}
                      >
                        {review.visible ? 'Visible' : 'Hidden'}
                      </motion.button>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      {review.review_text}
                    </p>
                  </motion.div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}