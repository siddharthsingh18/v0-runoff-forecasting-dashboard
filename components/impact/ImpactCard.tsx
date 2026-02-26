'use client'

import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'

interface ImpactCardProps {
  title: string
  metric: number
  unit: string
  trend: 'up' | 'down' | 'stable'
  trendValue: number
  description: string
  icon: React.ReactNode
  color: string
  bgColor: string
}

export function ImpactCard({
  title,
  metric,
  unit,
  trend,
  trendValue,
  description,
  icon,
  color,
  bgColor,
}: ImpactCardProps) {
  const trendColor = trend === 'up' ? '#dc2626' : trend === 'down' ? '#22c55e' : '#eab308'
  const trendIcon = trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white/5 border border-white/10 rounded-lg p-6 hover:border-white/20 transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: bgColor }}
        >
          <div style={{ color }}>{icon}</div>
        </div>
        <motion.div
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-sm font-semibold px-2 py-1 rounded-full"
          style={{ backgroundColor: `${trendColor}20`, color: trendColor }}
        >
          {trendIcon} {trendValue}%
        </motion.div>
      </div>

      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>

      <div className="mb-4">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-3xl font-bold text-white">{metric}</span>
          <span className="text-white/60 text-sm">{unit}</span>
        </div>
        <p className="text-white/70 text-sm">{description}</p>
      </div>

      {/* Visual Progress Bar */}
      <div className="space-y-2">
        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${metric * 2}%` }}
            transition={{ duration: 0.8 }}
            className="h-full rounded-full"
            style={{ backgroundColor: color }}
          />
        </div>
        <p className="text-xs text-white/50 text-right">
          {Math.min(metric * 2, 100)}% of threshold
        </p>
      </div>
    </motion.div>
  )
}
