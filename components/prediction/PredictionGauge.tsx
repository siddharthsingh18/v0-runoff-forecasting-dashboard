'use client'

import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

interface PredictionGaugeProps {
  probability: number // 0-100
  label?: string
  severity?: 'low' | 'medium' | 'high' | 'critical'
}

export function PredictionGauge({
  probability = 45,
  label = '24h Flood Probability',
  severity = 'medium',
}: PredictionGaugeProps) {
  const getColor = () => {
    if (probability < 20) return '#22c55e' // green
    if (probability < 40) return '#eab308' // yellow
    if (probability < 60) return '#f97316' // orange
    return '#dc2626' // red
  }

  const getSeverityLabel = () => {
    if (probability < 20) return 'Low Risk'
    if (probability < 40) return 'Moderate Risk'
    if (probability < 60) return 'High Risk'
    return 'Critical Risk'
  }

  const radius = 70
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (probability / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Circular Gauge */}
      <div className="relative w-48 h-48">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
          {/* Background circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
          />

          {/* Progress circle */}
          <motion.circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke={getColor()}
            strokeWidth="8"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            strokeLinecap="round"
          />

          {/* Animated glow */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke={getColor()}
            strokeWidth="8"
            opacity="0.2"
            filter="url(#glow)"
          />

          {/* Glow filter */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            </filter>
          </defs>
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <p className="text-white/60 text-sm mb-1">Probability</p>
            <p className="text-4xl font-bold text-white">{probability}%</p>
          </motion.div>
        </div>
      </div>

      {/* Label and Severity */}
      <div className="text-center w-full">
        <p className="text-white/70 text-sm mb-2">{label}</p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
            probability < 40
              ? 'bg-safe/20 text-safe'
              : probability < 60
              ? 'bg-warning/20 text-warning'
              : 'bg-critical/20 text-critical'
          }`}
        >
          {probability < 40 ? (
            <CheckCircle2 className="w-4 h-4" />
          ) : (
            <AlertCircle className="w-4 h-4" />
          )}
          <span className="font-semibold text-sm">{getSeverityLabel()}</span>
        </motion.div>
      </div>

      {/* Risk Description */}
      <div className="w-full p-4 bg-white/5 rounded-lg border border-white/10 text-center">
        <p className="text-white/70 text-xs">
          {probability < 20 &&
            'Conditions are favorable. Continue regular monitoring.'}
          {probability >= 20 && probability < 40 &&
            'Watch weather patterns closely. Increase monitoring frequency.'}
          {probability >= 40 && probability < 60 &&
            'Significant risk present. Prepare response procedures.'}
          {probability >= 60 &&
            'Critical threat level. Activate emergency protocols.'}
        </p>
      </div>
    </div>
  )
}
