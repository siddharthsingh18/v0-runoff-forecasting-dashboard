'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, Phone, MapPin, Bell } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-8 right-8 z-40">
      {/* Sub-menu items */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute bottom-20 right-0 space-y-3 mb-2"
        >
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link
              href="/alerts"
              className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg shadow-lg transition-colors"
            >
              <AlertTriangle className="w-5 h-5" />
              <span className="text-sm font-semibold">Emergency</span>
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link
              href="/map"
              className="flex items-center gap-3 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-3 rounded-lg shadow-lg transition-colors"
            >
              <MapPin className="w-5 h-5" />
              <span className="text-sm font-semibold">Live Map</span>
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link
              href="/citizen-report"
              className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg shadow-lg transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="text-sm font-semibold">Report</span>
            </Link>
          </motion.div>
        </motion.div>
      )}

      {/* Main FAB */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all"
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Phone className="w-6 h-6" />
        </motion.div>
      </motion.button>

      {/* Emergency hotline hint */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-20 right-20 bg-black/80 text-white text-xs px-3 py-2 rounded whitespace-nowrap pointer-events-none"
        >
          Quick Access (Click)
        </motion.div>
      )}
    </div>
  )
}
