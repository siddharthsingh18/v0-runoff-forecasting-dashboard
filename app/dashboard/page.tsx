'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/layout/Navbar'
import { Sidebar } from '@/components/layout/Sidebar'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { SectionCard } from '@/components/ui/SectionCard'
import { RiskIndicator } from '@/components/monitoring/RiskIndicator'
import { SensorDataTable } from '@/components/monitoring/SensorDataTable'
import { AlertLevel1Banner } from '@/components/alerts/AlertLevel1Banner'
import { AlertLevel2Panel } from '@/components/alerts/AlertLevel2Panel'
import { AlertHistory } from '@/components/alerts/AlertHistory'
import api from '@/lib/api'
import { SensorReading, AlertEvent, RealtimeData } from '@/lib/types'
import { Droplets, CloudRain, Activity, MapPin } from 'lucide-react'
import { toast } from 'sonner'
import { useModelStore } from '@/store/useModelStore'

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<RealtimeData | null>(null)
  const [sensors, setSensors] = useState<SensorReading[]>([])
  const [alerts, setAlerts] = useState<AlertEvent[]>([])
  const { setRiskLevel, addAlert, currentRiskLevel } = useModelStore()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const monitoring = await api.getRealtimeMonitoring()
        setData({
          current_runoff: monitoring.current_runoff,
          rainfall_24h: monitoring.rainfall_24h,
          drainage_rate: monitoring.drainage_rate,
          risk_percentage: monitoring.risk_percentage,
          alert_count: monitoring.alert_count,
          last_update: monitoring.last_update,
        })
        setSensors(monitoring.sensors)

        // Determine risk level
        const riskPercent = monitoring.risk_percentage
        let riskLevel: 'low' | 'medium' | 'high' | 'critical'
        if (riskPercent >= 85) riskLevel = 'critical'
        else if (riskPercent >= 70) riskLevel = 'high'
        else if (riskPercent >= 50) riskLevel = 'medium'
        else riskLevel = 'low'

        setRiskLevel(riskLevel, riskPercent)

        // Generate alerts based on risk
        const now = new Date()
        if (riskPercent >= 85) {
          const alert: AlertEvent = {
            id: `alert-${now.getTime()}`,
            timestamp: now.toISOString(),
            location: 'Sector 12 - Northern Basin',
            severity: 'level2',
            message: 'CRITICAL FLOOD RISK DETECTED',
            runoff_value: monitoring.current_runoff,
            risk_percentage: riskPercent,
            status: 'active',
            recommendations: [
              'Activate emergency drainage systems immediately',
              'Issue evacuation orders for low-lying areas',
              'Deploy emergency response teams to Sector 12',
              'Close all non-essential roads in affected zones',
            ],
          }
          setAlerts([alert])
          addAlert(alert)
        } else if (riskPercent >= 50) {
          const alert: AlertEvent = {
            id: `alert-${now.getTime()}`,
            timestamp: now.toISOString(),
            location: 'Sector 8 & 12',
            severity: 'level1',
            message: 'Flood risk elevated - monitor situation',
            runoff_value: monitoring.current_runoff,
            risk_percentage: riskPercent,
            status: 'active',
            recommendations: [
              'Prepare emergency response resources',
              'Increase drainage capacity if available',
            ],
          }
          setAlerts([alert])
          addAlert(alert)
        }
      } catch (error: any) {
        console.error('Failed to fetch monitoring data:', error)
        toast.error('Failed to load real-time data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 30000) // Update every 30 seconds
    return () => clearInterval(interval)
  }, [setRiskLevel, addAlert])

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

  const criticalAlert = alerts.find((a) => a.severity === 'level2')
  const warningAlert = alerts.find((a) => a.severity === 'level1')

  return (
    <div className="min-h-screen">
      {criticalAlert && (
        <AlertLevel2Panel
          message={criticalAlert.message}
          location={criticalAlert.location}
          runoffValue={criticalAlert.runoff_value}
          riskPercentage={criticalAlert.risk_percentage}
          recommendations={criticalAlert.recommendations}
        />
      )}

      {warningAlert && !criticalAlert && (
        <AlertLevel1Banner
          message={warningAlert.message}
          location={warningAlert.location}
          runoffValue={warningAlert.runoff_value}
        />
      )}

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
              Real-Time Flood Monitoring
            </h1>
            <p className="text-white/60 flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-safe rounded-full animate-pulse" />
              Last updated: {data ? new Date(data.last_update).toLocaleTimeString() : 'N/A'}
            </p>
          </motion.div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm mb-1">Current Runoff</p>
                  <p className="text-3xl font-bold text-aqua">{data?.current_runoff.toFixed(1)}</p>
                  <p className="text-xs text-white/40 mt-1">mm/hour</p>
                </div>
                <Droplets className="w-12 h-12 text-aqua/30" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm mb-1">Rainfall (24h)</p>
                  <p className="text-3xl font-bold text-white">{data?.rainfall_24h.toFixed(1)}</p>
                  <p className="text-xs text-white/40 mt-1">mm</p>
                </div>
                <CloudRain className="w-12 h-12 text-white/30" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm mb-1">Drainage Rate</p>
                  <p className="text-3xl font-bold text-safe">{data?.drainage_rate.toFixed(0)}</p>
                  <p className="text-xs text-white/40 mt-1">%</p>
                </div>
                <Activity className="w-12 h-12 text-safe/30" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm mb-1">Active Alerts</p>
                  <p className="text-3xl font-bold text-warning">{data?.alert_count}</p>
                  <p className="text-xs text-white/40 mt-1">ongoing</p>
                </div>
                <MapPin className="w-12 h-12 text-warning/30" />
              </div>
            </motion.div>
          </div>

          {/* Risk Indicator and Sensors */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <SectionCard title="Flood Risk Assessment" delay={0.3}>
                {data && (
                  <RiskIndicator
                    riskPercentage={data.risk_percentage}
                    riskLevel={currentRiskLevel}
                    showTrend={true}
                    trendDirection={data.risk_percentage > 50 ? 'up' : 'down'}
                  />
                )}
              </SectionCard>
            </div>

            <div className="lg:col-span-2">
              <SectionCard title="Live Sensor Readings" delay={0.3}>
                <SensorDataTable sensors={sensors} />
              </SectionCard>
            </div>
          </div>

          {/* Alert History */}
          {alerts.length > 0 && (
            <SectionCard title="Alert History" delay={0.4}>
              <AlertHistory alerts={alerts} />
            </SectionCard>
          )}
        </div>
      </main>
    </div>
  )
}
