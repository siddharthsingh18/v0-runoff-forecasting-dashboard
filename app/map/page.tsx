'use client'

import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FloodMap } from '@/components/monitoring/FloodMap'
import { motion } from 'framer-motion'
import { MapPin, AlertTriangle } from 'lucide-react'

export default function MapPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-950">
        {/* Header */}
        <section className="px-6 py-8 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-white/10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-8 h-8 text-aqua" />
                <h1 className="text-4xl font-bold text-white">Interactive Flood Monitoring Map</h1>
              </div>
              <p className="text-white/70 max-w-2xl">
                Real-time monitoring of rainfall, runoff, and flood risk across all regions. Click on any location to view detailed metrics.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Map Container */}
        <div className="relative h-screen">
          <FloodMap />
        </div>

        {/* Info Footer */}
        <section className="px-6 py-12 bg-gradient-to-t from-slate-950 to-slate-900 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="bg-white/5 border border-white/10 rounded-lg p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  <h3 className="text-white font-semibold">Real-Time Updates</h3>
                </div>
                <p className="text-white/60 text-sm">
                  Data refreshes every 5 minutes with latest sensor readings from monitoring stations
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/5 border border-white/10 rounded-lg p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="w-5 h-5 text-aqua" />
                  <h3 className="text-white font-semibold">250+ Monitoring Stations</h3>
                </div>
                <p className="text-white/60 text-sm">
                  Distributed across the country collecting rainfall, runoff, and river level data
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/5 border border-white/10 rounded-lg p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle className="w-5 h-5 text-safe" />
                  <h3 className="text-white font-semibold">24/7 Monitoring</h3>
                </div>
                <p className="text-white/60 text-sm">
                  Continuous flood risk assessment and automatic alerts for critical situations
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
