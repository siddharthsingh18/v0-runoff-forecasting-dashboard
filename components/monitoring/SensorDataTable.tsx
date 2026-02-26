'use client'

import { SensorReading } from '@/lib/types'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Zap } from 'lucide-react'

interface SensorDataTableProps {
  sensors: SensorReading[]
  onSensorClick?: (sensor: SensorReading) => void
}

export function SensorDataTable({ sensors, onSensorClick }: SensorDataTableProps) {
  const getRiskColor = (riskScore: number) => {
    if (riskScore >= 80) return 'text-critical'
    if (riskScore >= 50) return 'text-warning'
    return 'text-safe'
  }

  const getRiskBg = (riskScore: number) => {
    if (riskScore >= 80) return 'bg-critical/10 border-critical'
    if (riskScore >= 50) return 'bg-warning/10 border-warning'
    return 'bg-safe/10 border-safe'
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-4 px-4 text-white/60 font-medium text-sm">Location</th>
            <th className="text-right py-4 px-4 text-white/60 font-medium text-sm">Rainfall</th>
            <th className="text-right py-4 px-4 text-white/60 font-medium text-sm">Drainage</th>
            <th className="text-right py-4 px-4 text-white/60 font-medium text-sm">Runoff Rate</th>
            <th className="text-right py-4 px-4 text-white/60 font-medium text-sm">Risk Score</th>
            <th className="text-right py-4 px-4 text-white/60 font-medium text-sm">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {sensors.map((sensor, idx) => (
            <motion.tr
              key={sensor.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => onSensorClick?.(sensor)}
              className="hover:bg-white/5 transition-colors cursor-pointer"
            >
              <td className="py-4 px-4">
                <div className="flex flex-col">
                  <p className="font-medium text-white">{sensor.location}</p>
                  <p className="text-xs text-white/40">
                    {sensor.latitude.toFixed(4)}, {sensor.longitude.toFixed(4)}
                  </p>
                </div>
              </td>
              <td className="text-right py-4 px-4">
                <div className="flex flex-col items-end">
                  <p className="text-white font-semibold">{sensor.rainfall.toFixed(1)}</p>
                  <p className="text-xs text-white/40">mm</p>
                </div>
              </td>
              <td className="text-right py-4 px-4">
                <div className="flex items-end justify-end gap-1">
                  <p className="text-white font-semibold">{sensor.drainage.toFixed(0)}%</p>
                  {sensor.drainage < 40 && (
                    <TrendingDown className="w-4 h-4 text-warning" />
                  )}
                  {sensor.drainage >= 40 && (
                    <TrendingUp className="w-4 h-4 text-safe" />
                  )}
                </div>
              </td>
              <td className="text-right py-4 px-4">
                <div className="flex flex-col items-end">
                  <p className="text-white font-semibold">{sensor.runoff_rate.toFixed(2)}</p>
                  <p className="text-xs text-white/40">mm/hr</p>
                </div>
              </td>
              <td className="text-right py-4 px-4">
                <motion.div
                  className={`inline-block px-3 py-1 rounded-full border ${getRiskBg(sensor.risk_score)}`}
                  animate={{
                    scale: sensor.risk_score >= 80 ? [1, 1.05, 1] : 1,
                  }}
                  transition={{
                    duration: 2,
                    repeat: sensor.risk_score >= 80 ? Infinity : 0,
                  }}
                >
                  <p className={`text-sm font-bold ${getRiskColor(sensor.risk_score)}`}>
                    {sensor.risk_score.toFixed(0)}
                  </p>
                </motion.div>
              </td>
              <td className="text-right py-4 px-4">
                {sensor.risk_score >= 80 && (
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    <Zap className="w-5 h-5 text-critical mx-auto" />
                  </motion.div>
                )}
                {sensor.risk_score >= 50 && sensor.risk_score < 80 && (
                  <div className="w-3 h-3 bg-warning rounded-full mx-auto" />
                )}
                {sensor.risk_score < 50 && (
                  <div className="w-3 h-3 bg-safe rounded-full mx-auto" />
                )}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
