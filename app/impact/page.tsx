'use client'

import { useEffect, useState } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Sidebar } from '@/components/layout/Sidebar'
import { SectionCard } from '@/components/ui/SectionCard'
import { motion } from 'framer-motion'
import api from '@/lib/api'
import { EnvironmentalImpact } from '@/lib/types'
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

interface ImpactMetric {
  label: string
  value: number
  unit: string
  color: string
  trend?: 'up' | 'down' | 'stable'
  description: string
}

export default function ImpactPage() {
  const [data, setData] = useState<EnvironmentalImpact | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const impact = await api.getEnvironmentalImpact()
        setData(impact)
      } catch (error) {
        console.error('Failed to fetch impact data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    )
  }

  const metrics: ImpactMetric[] = [
    {
      label: 'Soil Erosion',
      value: data?.soil_erosion ?? 0,
      unit: '%',
      color: 'from-orange-400 to-red-400',
      trend: data?.trends.soil_erosion_trend as 'up' | 'down' | undefined,
      description: 'Topsoil loss and degradation rate',
    },
    {
      label: 'Water Pollution',
      value: data?.water_pollution ?? 0,
      unit: '%',
      color: 'from-blue-400 to-cyan-400',
      trend: data?.trends.pollution_trend as 'up' | 'down' | undefined,
      description: 'Surface water contamination level',
    },
    {
      label: 'Crop Destruction Risk',
      value: data?.crop_destruction_risk ?? 0,
      unit: '%',
      color: 'from-green-400 to-emerald-400',
      trend: data?.trends.crop_risk_trend as 'up' | 'down' | undefined,
      description: 'Risk of agricultural damage',
    },
    {
      label: 'Infrastructure Damage Risk',
      value: data?.infrastructure_damage_risk ?? 0,
      unit: '%',
      color: 'from-purple-400 to-pink-400',
      trend: data?.trends.infrastructure_trend as 'up' | 'down' | 'stable',
      description: 'Risk to buildings and infrastructure',
    },
  ]

  return (
    <div className="min-h-screen">
      <Navbar />
      <Sidebar />

      <main className="ml-64 px-8 py-12">
        <div className="max-w-7xl space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-white mb-2">
              Environmental & Social Impact
            </h1>
            <p className="text-white/60">Assessment of flood-related risks and damages</p>
          </motion.div>

          {/* Human Risk Alert */}
          {data?.human_life_risk === 'High' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-critical/20 border border-critical rounded-lg p-6 flex items-start gap-4"
            >
              <AlertCircle className="w-6 h-6 text-critical flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-critical mb-1">Critical Human Life Risk</h3>
                <p className="text-white/80">
                  Current flood conditions pose a {data.human_life_risk} risk to human life.
                  Immediate evacuation and emergency response measures are recommended.
                </p>
              </div>
            </motion.div>
          )}

          {/* Impact Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {metrics.map((metric, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <SectionCard title={metric.label} delay={0}>
                  <div className="space-y-6">
                    {/* Metric Value */}
                    <div className="text-center">
                      <p className="text-5xl font-bold mb-2">
                        <span className={`bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                          {metric.value.toFixed(1)}
                        </span>
                        <span className="text-2xl text-white/60 ml-2">{metric.unit}</span>
                      </p>
                      <p className="text-white/70">{metric.description}</p>
                    </div>

                    {/* Trend */}
                    {metric.trend && (
                      <div className="flex items-center justify-center gap-2 text-sm">
                        {metric.trend === 'up' ? (
                          <TrendingUp className="w-4 h-4 text-warning" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-safe" />
                        )}
                        <span className={metric.trend === 'up' ? 'text-warning' : 'text-safe'}>
                          {metric.trend === 'up' ? 'Increasing' : 'Decreasing'}
                        </span>
                      </div>
                    )}

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-white/60">
                        <span>Risk Level</span>
                        <span>
                          {metric.value > 75
                            ? 'Critical'
                            : metric.value > 50
                            ? 'High'
                            : metric.value > 25
                            ? 'Medium'
                            : 'Low'}
                        </span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${metric.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${metric.value}%` }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  </div>
                </SectionCard>
              </motion.div>
            ))}
          </div>

          {/* Impact Summary */}
          <SectionCard title="Impact Assessment Summary" delay={0.5}>
            <div className="space-y-4">
              <p className="text-white/80">
                Current flood conditions present a {data?.human_life_risk} risk to human safety and
                significant threats to agricultural, infrastructure, and environmental resources.
              </p>
              <ul className="space-y-3 text-white/70 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-warning mt-1">•</span>
                  <span>Soil erosion at {data?.soil_erosion.toFixed(1)}% will require long-term
                    land rehabilitation efforts</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Water pollution levels at {data?.water_pollution.toFixed(1)}% require
                    immediate water quality management</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Crop destruction risk of {data?.crop_destruction_risk.toFixed(1)}%
                    threatens food security and farmer livelihoods</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Infrastructure damage risk at {data?.infrastructure_damage_risk.toFixed(1)}%
                    requires preventive structural measures</span>
                </li>
              </ul>
            </div>
          </SectionCard>
        </div>
      </main>
    </div>
  )
}
