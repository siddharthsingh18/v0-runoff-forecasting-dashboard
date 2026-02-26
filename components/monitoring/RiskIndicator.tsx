'use client'

import { motion } from 'framer-motion'

interface RiskIndicatorProps {
  riskPercentage: number
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  showTrend?: boolean
  trendDirection?: 'up' | 'down' | 'stable'
}

export function RiskIndicator({
  riskPercentage,
  riskLevel,
  showTrend = true,
  trendDirection = 'stable',
}: RiskIndicatorProps) {
  const getRiskColor = () => {
    switch (riskLevel) {
      case 'critical':
        return '#ef4444'
      case 'high':
        return '#fbbf24'
      case 'medium':
        return '#fbbf24'
      case 'low':
        return '#10b981'
      default:
        return '#06b6d4'
    }
  }

  const getRiskLabel = () => {
    switch (riskLevel) {
      case 'critical':
        return 'CRITICAL'
      case 'high':
        return 'HIGH'
      case 'medium':
        return 'MEDIUM'
      case 'low':
        return 'LOW'
      default:
        return 'NORMAL'
    }
  }

  const color = getRiskColor()
  const circumference = 2 * Math.PI * 90
  const strokeDashoffset = circumference - (riskPercentage / 100) * circumference

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-64 h-64">
        {/* Background circle */}
        <svg
          className="absolute inset-0 w-full h-full transform -rotate-90"
          viewBox="0 0 200 200"
        >
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="8"
          />
          {/* Animated progress circle */}
          <motion.circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{
              filter: `drop-shadow(0 0 8px ${color})`,
            }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-6xl font-bold text-white mb-2">{riskPercentage}%</p>
            <p
              className="text-2xl font-bold text-center"
              style={{ color }}
            >
              {getRiskLabel()}
            </p>

            {showTrend && (
              <motion.div
                className="mt-4 flex items-center gap-2 justify-center"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span
                  className="text-sm font-semibold"
                  style={{ color }}
                >
                  {trendDirection === 'up' && '↑ Increasing'}
                  {trendDirection === 'down' && '↓ Decreasing'}
                  {trendDirection === 'stable' && '→ Stable'}
                </span>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Status text */}
      <motion.p
        className="text-center text-white/70 mt-8 max-w-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {riskLevel === 'critical' &&
          'Immediate action required. Activate emergency protocols.'}
        {riskLevel === 'high' &&
          'High flood risk detected. Prepare emergency response.'}
        {riskLevel === 'medium' &&
          'Moderate flood risk. Monitor conditions closely.'}
        {riskLevel === 'low' && 'Low flood risk. Normal operations continue.'}
      </motion.p>
    </div>
  )
}
