'use client'

import Link from 'next/link'
import { useModelStore } from '@/store/useModelStore'
import { GlowButton } from '@/components/ui/GlowButton'
import { motion } from 'framer-motion'
import { BarChart3, Brain, Zap, TrendingUp } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Forecasting',
    description: 'Advanced machine learning models trained on historical runoff data',
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Comprehensive dashboards and visualizations for data-driven insights',
  },
  {
    icon: Zap,
    title: 'Real-Time Predictions',
    description: '3-day ahead runoff predictions with confidence intervals',
  },
  {
    icon: TrendingUp,
    title: 'Model Performance',
    description: 'Track RMSE, MAE, R², and NSE metrics across multiple models',
  },
]

export default function HomePage() {
  const isAuthenticated = useModelStore((state) => state.isAuthenticated)

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative px-6 py-24 overflow-hidden">
          {/* Animated background elements */}
          <motion.div
            animate={{
              x: [0, 100, -100, 0],
              y: [0, -100, 100, 0],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -100, 100, 0],
              y: [0, 100, -100, 0],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -bottom-40 -right-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl"
          />

          <div className="relative z-10 max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                  Advanced Runoff Forecasting
                </span>
              </h1>
              <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                Predict water runoff 3 days in advance with state-of-the-art machine learning models
              </p>
              <div className="flex gap-4 justify-center">
                {isAuthenticated ? (
                  <Link href="/dashboard">
                    <GlowButton size="lg" glowIntensity="high">
                      Go to Dashboard
                    </GlowButton>
                  </Link>
                ) : (
                  <>
                    <Link href="/login">
                      <GlowButton size="lg" glowIntensity="high">
                        Sign In
                      </GlowButton>
                    </Link>
                    <Link href="/login">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <button className="px-8 py-3 rounded-lg border border-cyan-500/50 text-white font-semibold hover:bg-cyan-500/10 transition-colors">
                          Learn More
                        </button>
                      </motion.div>
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-20 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Powerful Features for Runoff Forecasting
            </h2>
            <p className="text-white/60 text-lg">
              Everything you need for accurate water runoff prediction
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass rounded-lg p-8 border border-white/10 hover:border-cyan-500/30 transition-colors"
                >
                  <Icon className="w-12 h-12 text-cyan-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-white/60">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* CTA Section */}
        {!isAuthenticated && (
          <section className="px-6 py-20 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="glass rounded-lg p-12 border border-cyan-500/20 text-center"
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to get started?
              </h2>
              <p className="text-white/60 mb-8">
                Join thousands of users using RunoffAI for accurate runoff forecasting
              </p>
              <Link href="/login">
                <GlowButton size="lg" glowIntensity="high">
                  Sign In Now
                </GlowButton>
              </Link>
            </motion.div>
          </section>
        )}
      </main>

      <Footer />
    </>
  )
}
