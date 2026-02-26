'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface MetricCardProps {
  label: string
  value: string | number
  unit?: string
  icon?: React.ReactNode
  trend?: 'up' | 'down' | 'neutral'
}

export function MetricCard({
  label,
  value,
  unit,
  icon,
  trend = 'neutral',
}: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, boxShadow: '0 0 30px rgba(34, 211, 238, 0.3)' }}
      className="glass rounded-lg p-6 border border-white/10 hover:border-cyan-500/30 transition-colors duration-300"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-white/60 mb-2">{label}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{value}</span>
            {unit && <span className="text-sm text-white/40">{unit}</span>}
          </div>
        </div>

        {icon && (
          <div className="text-cyan-400/60 ml-4">
            {icon}
          </div>
        )}
      </div>

      {trend !== 'neutral' && (
        <div className="mt-4 flex items-center gap-2 pt-4 border-t border-white/5">
          {trend === 'up' ? (
            <>
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-xs text-green-400">Improving</span>
            </>
          ) : (
            <>
              <TrendingDown className="w-4 h-4 text-red-400" />
              <span className="text-xs text-red-400">Declining</span>
            </>
          )}
        </div>
      )}
    </motion.div>
  )
}
