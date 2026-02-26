'use client'

import Link from 'next/link'
import { useModelStore } from '@/store/useModelStore'
import { GlowButton } from '@/components/ui/GlowButton'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import {
  AlertTriangle,
  Cloud,
  TrendingUp,
  Shield,
  Droplets,
  Zap,
  Map,
} from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

// Live counter component
function LiveCounter({ label, value, color, icon: Icon }: { label: string; value: number; color: string; icon: any }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let start = 0
    const duration = 2000
    const increment = value / (duration / 16)
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.floor(current))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [value])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center gap-2 p-4"
    >
      <Icon className={`w-8 h-8 ${color}`} />
      <div className={`text-3xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
        {displayValue.toLocaleString()}
      </div>
      <p className="text-white/60 text-sm text-center">{label}</p>
    </motion.div>
  )
}

const features = [
  {
    icon: AlertTriangle,
    title: 'Real-Time Alerts',
    description: 'Instant notifications for flood risk with automatic level assessment',
  },
  {
    icon: Cloud,
    title: 'AI Predictions',
    description: 'Advanced ML models forecast floods 24 hours in advance',
  },
  {
    icon: TrendingUp,
    title: 'Live Monitoring',
    description: 'Real-time sensor data from multiple monitoring stations',
  },
  {
    icon: Shield,
    title: 'Emergency Response',
    description: 'Integrated action recommendations and resource coordination',
  },
]

const stats = [
  { label: 'Monitoring Stations', value: '250+', color: 'from-aqua to-cyan-400' },
  { label: 'Data Points/Hour', value: '15K+', color: 'from-cyan-400 to-blue-400' },
  { label: 'Accuracy', value: '94%', color: 'from-blue-400 to-purple-400' },
  { label: 'Response Time', value: '<5min', color: 'from-purple-400 to-pink-400' },
]

export default function HomePage() {
  const isAuthenticated = useModelStore((state) => state.isAuthenticated)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-blue-950 via-slate-950 to-slate-900">
        {/* Hero Section */}
        <section className="relative px-6 py-24 overflow-hidden">
          <motion.div
            animate={{
              x: [0, 100, -100, 0],
              y: [0, -100, 100, 0],
            }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute -top-40 -left-40 w-80 h-80 bg-aqua/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -100, 100, 0],
              y: [0, 100, -100, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, delay: 5 }}
            className="absolute -bottom-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"
          />

          <div className="relative z-10 max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-4 py-2 bg-warning/20 border border-warning/30 rounded-full mb-6">
                <p className="text-warning text-sm font-semibold">
                  Government-Grade Flood Monitoring System
                </p>
              </div>

              <h1 className="text-6xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-aqua via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Smart Runoff Monitoring
                </span>
                <br />
                <span className="text-white">& Flood Risk Alert System</span>
              </h1>

              <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
                Real-time monitoring, AI-powered predictions, and automated emergency
                response for communities facing flood risks
              </p>

              <div className="flex gap-4 justify-center flex-wrap">
                {isAuthenticated ? (
                  <>
                    <Link href="/dashboard">
                      <GlowButton size="lg" glowIntensity="high">
                        Go to Dashboard
                      </GlowButton>
                    </Link>
                    <Link href="/map">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <button className="px-8 py-4 rounded-lg border border-aqua/50 text-white font-semibold hover:bg-aqua/10 transition-colors text-lg flex items-center gap-2">
                          <Map className="w-5 h-5" />
                          View Interactive Map
                        </button>
                      </motion.div>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <GlowButton size="lg" glowIntensity="high">
                        Enter System
                      </GlowButton>
                    </Link>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <button className="px-8 py-4 rounded-lg border border-aqua/50 text-white font-semibold hover:bg-aqua/10 transition-colors text-lg">
                        View Demo
                      </button>
                    </motion.div>
                  </>
                )}
              </div>
            </motion.div>

            {/* Live Counters */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 bg-white/5 border border-white/10 rounded-2xl p-8"
            >
              <LiveCounter label="Active Stations" value={250} color="from-aqua to-cyan-400" icon={Droplets} />
              <LiveCounter label="Data Points/Hour" value={15000} color="from-cyan-400 to-blue-400" icon={TrendingUp} />
              <LiveCounter label="Model Accuracy" value={94} color="from-blue-400 to-purple-400" icon={Shield} />
              <LiveCounter label="Response Time (sec)" value={5} color="from-purple-400 to-pink-400" icon={Zap} />
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-6 py-16 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-lg p-6 text-center"
              >
                <p className="text-white/60 text-sm mb-2">{stat.label}</p>
                <p className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </p>
              </motion.div>
            ))}
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
              Comprehensive Flood Management Solution
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Everything communities need to monitor, predict, and respond to flood risks
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
                  className="bg-white/5 border border-white/10 rounded-lg p-8 hover:border-aqua/30 transition-colors group"
                >
                  <Icon className="w-12 h-12 text-aqua mb-4 group-hover:text-cyan-400 transition-colors" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-white/60">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* Capabilities Section */}
        <section className="px-6 py-20 max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-aqua/20 to-cyan-500/20 border border-aqua/30 rounded-lg p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div>
                <Droplets className="w-10 h-10 text-aqua mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Environmental Impact</h3>
                <p className="text-white/70 text-sm">
                  Track soil erosion, water pollution, crop damage, and infrastructure risk
                </p>
              </div>
              <div>
                <Zap className="w-10 h-10 text-warning mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Emergency Response</h3>
                <p className="text-white/70 text-sm">
                  Auto-generated action recommendations and integrated incident management
                </p>
              </div>
              <div>
                <Shield className="w-10 h-10 text-safe mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Solutions Hub</h3>
                <p className="text-white/70 text-sm">
                  Structural, nature-based, and technology solutions with cost/benefit analysis
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        {!isAuthenticated && (
          <section className="px-6 py-20 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-aqua/20 to-cyan-500/20 border border-aqua/30 rounded-lg p-12 text-center"
            >
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Protect Your Community?</h2>
              <p className="text-white/60 mb-8 max-w-2xl mx-auto">
                Join government agencies and communities using our flood monitoring system
              </p>
              <Link href="/login">
                <GlowButton size="lg" glowIntensity="high">
                  Get Started Now
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
