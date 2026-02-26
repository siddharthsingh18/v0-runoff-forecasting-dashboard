'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, X } from 'lucide-react'
import { useState } from 'react'

interface AlertLevel1BannerProps {
  message: string
  location?: string
  runoffValue?: number
  onDismiss?: () => void
  autoClose?: boolean
}

export function AlertLevel1Banner({
  message,
  location,
  runoffValue,
  onDismiss,
  autoClose = false,
}: AlertLevel1BannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  const handleDismiss = () => {
    setIsVisible(false)
    onDismiss?.()
  }

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-warning/20 border-b-2 border-warning"
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-warning animate-pulse" />
          <div>
            <p className="font-semibold text-warning text-sm">Warning Alert</p>
            <p className="text-white/80 text-sm">{message}</p>
            {location && (
              <p className="text-white/60 text-xs mt-1">Location: {location}</p>
            )}
            {runoffValue !== undefined && (
              <p className="text-white/60 text-xs">Runoff: {runoffValue.toFixed(2)} mm</p>
            )}
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="text-warning hover:text-warning/80 transition-colors p-1"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  )
}
