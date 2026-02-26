'use client'

import { useEffect, useState } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Sidebar } from '@/components/layout/Sidebar'
import { SectionCard } from '@/components/ui/SectionCard'
import { motion } from 'framer-motion'
import api from '@/lib/api'
import { FloodSolution } from '@/lib/types'
import { CheckCircle, Clock, DollarSign, Zap } from 'lucide-react'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export default function SolutionsPage() {
  const [solutions, setSolutions] = useState<FloodSolution[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'structural' | 'nature_based' | 'technology'>('all')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.getSolutions()
        setSolutions(data.solutions)
      } catch (error) {
        console.error('Failed to fetch solutions:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const filteredSolutions = solutions.filter(
    (sol) => selectedCategory === 'all' || sol.category === selectedCategory
  )

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'structural':
        return 'Structural Solutions'
      case 'nature_based':
        return 'Nature-Based Solutions'
      case 'technology':
        return 'Technology Solutions'
      default:
        return 'All Solutions'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <Sidebar />

      <main className="ml-64 px-8 py-12">
        <div className="max-w-7xl space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-white mb-2">
              Flood Prevention & Solutions
            </h1>
            <p className="text-white/60">
              Explore structural, nature-based, and technology solutions for flood management
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <div className="flex gap-2 flex-wrap">
            {(['all', 'structural', 'nature_based', 'technology'] as const).map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-aqua text-black'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {getCategoryLabel(category)}
              </motion.button>
            ))}
          </div>

          {/* Solutions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSolutions.map((solution, idx) => (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <SectionCard title={solution.title} delay={0}>
                  <div className="space-y-4">
                    {/* Description */}
                    <p className="text-white/80">{solution.description}</p>

                    {/* Impact */}
                    <div className="bg-aqua/10 border border-aqua/30 rounded-lg p-4">
                      <p className="text-sm text-white/60 mb-1">Expected Impact</p>
                      <p className="text-white font-semibold">{solution.impact_description}</p>
                    </div>

                    {/* Co-benefits */}
                    {solution.co_benefits && solution.co_benefits.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm text-white/60">Co-benefits:</p>
                        <ul className="space-y-1 text-sm">
                          {solution.co_benefits.map((benefit, bidx) => (
                            <li key={bidx} className="flex items-center gap-2 text-white/80">
                              <CheckCircle className="w-4 h-4 text-safe flex-shrink-0" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
                      {/* Effectiveness */}
                      <div className="text-center">
                        <div className="text-2xl font-bold text-aqua mb-1">
                          {solution.effectiveness}%
                        </div>
                        <p className="text-xs text-white/60">Effectiveness</p>
                        <div className="mt-2 w-full bg-white/10 rounded-full h-1 overflow-hidden">
                          <div
                            className="bg-aqua h-full"
                            style={{ width: `${solution.effectiveness}%` }}
                          />
                        </div>
                      </div>

                      {/* Cost */}
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <DollarSign className="w-4 h-4 text-warning" />
                          <span className="text-sm font-bold text-warning">
                            {solution.cost}
                          </span>
                        </div>
                        <p className="text-xs text-white/60">Cost</p>
                      </div>

                      {/* Timeline */}
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Clock className="w-4 h-4 text-cyan-400" />
                        </div>
                        <p className="text-xs text-white/60">{solution.implementation_time}</p>
                      </div>
                    </div>
                  </div>
                </SectionCard>
              </motion.div>
            ))}
          </div>

          {/* Recommendation Engine */}
          <SectionCard title="AI-Powered Recommendation Engine" delay={0.5}>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-aqua/10 border border-aqua/30 rounded-lg">
                <Zap className="w-5 h-5 text-aqua flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-white mb-1">Current Conditions Assessment</p>
                  <p className="text-white/80 text-sm">
                    Based on current flood risk (68%) and soil erosion levels (72%), we recommend
                    implementing Smart Drainage Systems as a priority for immediate flood mitigation,
                    combined with Green Corridors for long-term environmental restoration.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-white/70 text-sm font-medium">Recommended Action Priority:</p>
                <ol className="space-y-2 text-sm">
                  <li className="flex gap-3 text-white/80">
                    <span className="text-aqua font-bold">1.</span>
                    <span>Deploy smart drainage system to reduce immediate flood risk</span>
                  </li>
                  <li className="flex gap-3 text-white/80">
                    <span className="text-aqua font-bold">2.</span>
                    <span>Plant green corridors to improve soil retention (12-24 months)</span>
                  </li>
                  <li className="flex gap-3 text-white/80">
                    <span className="text-aqua font-bold">3.</span>
                    <span>Install rainwater harvesting to manage excess runoff</span>
                  </li>
                  <li className="flex gap-3 text-white/80">
                    <span className="text-aqua font-bold">4.</span>
                    <span>Maintain AI prediction system for real-time monitoring</span>
                  </li>
                </ol>
              </div>
            </div>
          </SectionCard>
        </div>
      </main>
    </div>
  )
}
