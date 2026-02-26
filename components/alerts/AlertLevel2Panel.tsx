'use client'

import { motion } from 'framer-motion'
import { AlertCircle, X } from 'lucide-react'
import { useState } from 'react'

interface AlertLevel2PanelProps {
  message: string
  location?: string
  runoffValue?: number
  riskPercentage?: number
  recommendations?: string[]
  onDismiss?: () => void
}

export function AlertLevel2Panel({
  message,
  location,
  runoffValue,
  riskPercentage,
  recommendations = [],
  onDismiss,
}: AlertLevel2PanelProps) {
  const [isVisible, setIsVisible] = useState(true)

  const handleDismiss = () => {
    setIsVisible(false)
    onDismiss?.()
  }

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
    >
      <motion.div
        className="alert-level2 w-full max-w-2xl p-8 rounded-lg border-2 border-critical relative"
        animate={{
          boxShadow: [
            '0 0 20px rgba(239, 68, 68, 0.4)',
            '0 0 40px rgba(239, 68, 68, 0.8)',
            '0 0 20px rgba(239, 68, 68, 0.4)',
          ],
        }}
        transition={{ duration: 0.8, repeat: Infinity }}
      >
        {/* Siren Icon */}
        <motion.div
          className="absolute -top-6 left-1/2 -translate-x-1/2 alert-siren"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          <div className="w-12 h-12 bg-critical rounded-full flex items-center justify-center">
            <AlertCircle className="w-7 h-7 text-white" />
          </div>
        </motion.div>

        <div className="mt-8">
          <h2 className="text-3xl font-bold text-critical mb-2">CRITICAL FLOOD ALERT</h2>
          <p className="text-white text-lg mb-4">{message}</p>

          <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-critical/10 rounded">
            {location && (
              <div>
                <p className="text-white/60 text-sm">Location</p>
                <p className="text-white font-semibold">{location}</p>
              </div>
            )}
            {runoffValue !== undefined && (
              <div>
                <p className="text-white/60 text-sm">Runoff Rate</p>
                <p className="text-white font-semibold">{runoffValue.toFixed(2)} mm</p>
              </div>
            )}
            {riskPercentage !== undefined && (
              <div>
                <p className="text-white/60 text-sm">Risk Level</p>
                <p className="text-critical font-bold text-xl">{riskPercentage}%</p>
              </div>
            )}
          </div>

          {recommendations.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-white mb-3">Recommended Actions:</h3>
              <ul className="space-y-2">
                {recommendations.map((rec, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-white/90 text-sm p-2 bg-white/5 rounded"
                  >
                    <span className="text-warning font-bold">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={handleDismiss}
            className="w-full py-3 px-4 bg-critical text-white font-semibold rounded hover:bg-critical/90 transition-colors flex items-center justify-center gap-2"
          >
            <X className="w-5 h-5" />
            Acknowledge Alert
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
