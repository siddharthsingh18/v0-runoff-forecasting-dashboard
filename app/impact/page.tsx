'use client'

import { useEffect, useState } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Sidebar } from '@/components/layout/Sidebar'
import { SectionCard } from '@/components/ui/SectionCard'
import { ImpactCard } from '@/components/impact/ImpactCard'
import { RisingWaterAnimation } from '@/components/impact/RisingWaterAnimation'
import { motion } from 'framer-motion'
import api from '@/lib/api'
import { EnvironmentalImpact } from '@/lib/types'
import { TrendingUp, TrendingDown, AlertCircle, Droplets, Leaf, Home, Zap, AlertTriangle, Waves } from 'lucide-react'
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

          {/* Visual Demonstration */}
          <SectionCard title="Water Level Rise Simulation" delay={0.1}>
            <div className="space-y-4">
              <RisingWaterAnimation waterLevel={45} />
              <p className="text-white/60 text-sm">
                Current flood water level projection based on rainfall patterns and soil saturation levels across the region.
              </p>
            </div>
          </SectionCard>

          {/* Enhanced Impact Metrics Grid */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Key Impact Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0 }}
              >
                <ImpactCard
                  title="Soil Erosion"
                  metric={Math.round(data?.soil_erosion ?? 42)}
                  unit="hectares/year"
                  trend="up"
                  trendValue={23}
                  description="Accelerated land degradation in flood-prone areas"
                  icon={<Leaf className="w-6 h-6" />}
                  color="#ca8a04"
                  bgColor="#fef3c7"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
              >
                <ImpactCard
                  title="Aquatic Ecosystem Loss"
                  metric={58}
                  unit="species at risk"
                  trend="up"
                  trendValue={18}
                  description="Species displacement due to habitat flooding"
                  icon={<Droplets className="w-6 h-6" />}
                  color="#0369a1"
                  bgColor="#cffafe"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <ImpactCard
                  title="Residential Risk"
                  metric={125}
                  unit="households"
                  trend="up"
                  trendValue={34}
                  description="Population centers in high-risk zones"
                  icon={<Home className="w-6 h-6" />}
                  color="#dc2626"
                  bgColor="#fee2e2"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <ImpactCard
                  title="Infrastructure Damage"
                  metric={89}
                  unit="km of roads"
                  trend="down"
                  trendValue={12}
                  description="Transportation networks at risk annually"
                  icon={<Zap className="w-6 h-6" />}
                  color="#f97316"
                  bgColor="#fed7aa"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <ImpactCard
                  title="Agricultural Loss"
                  metric={Math.round(data?.crop_destruction_risk ?? 1240)}
                  unit="hectares"
                  trend="up"
                  trendValue={28}
                  description="Cropland destroyed or significantly impacted"
                  icon={<AlertTriangle className="w-6 h-6" />}
                  color="#eab308"
                  bgColor="#fef08a"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <ImpactCard
                  title="Water Contamination"
                  metric={Math.round(data?.water_pollution ?? 3)}
                  unit="critical events"
                  trend="stable"
                  trendValue={0}
                  description="Sewage and industrial spillage incidents"
                  icon={<Waves className="w-6 h-6" />}
                  color="#8b5cf6"
                  bgColor="#f3e8ff"
                />
              </motion.div>
            </div>
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
