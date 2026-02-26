'use client'

import { useEffect, useState } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Sidebar } from '@/components/layout/Sidebar'
import { SectionCard } from '@/components/ui/SectionCard'
import { AlertHistory } from '@/components/alerts/AlertHistory'
import { AlertCommandCenter } from '@/components/alerts/AlertCommandCenter'
import { motion } from 'framer-motion'
import { AlertEvent } from '@/lib/types'
import { useModelStore } from '@/store/useModelStore'
import { AlertTriangle, AlertCircle, TrendingUp, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AlertsPage() {
  const { alertHistory, activeAlerts } = useModelStore()
  const [displayAlerts, setDisplayAlerts] = useState<AlertEvent[]>([])
  const [currentAlertLevel, setCurrentAlertLevel] = useState(0)

  useEffect(() => {
    // Combine active and historical alerts for display
    const allAlerts = [...activeAlerts, ...alertHistory]
    setDisplayAlerts(allAlerts.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ))
  }, [activeAlerts, alertHistory])

  const handleAlertLevelChange = (level: number) => {
    setCurrentAlertLevel(level)
  }

  const handleDownloadReport = () => {
    // PDF export functionality
    const reportContent = `
FLOOD RISK ALERT REPORT
Generated: ${new Date().toLocaleString()}

Current Alert Level: ${['All Clear', 'Caution', 'Warning', 'Emergency'][currentAlertLevel]}
Critical Alerts: ${activeAlerts.filter((a) => a.severity === 'level2').length}
Warning Alerts: ${activeAlerts.filter((a) => a.severity === 'level1').length}
Total 24h Alerts: ${displayAlerts.length}

RECENT ALERTS:
${displayAlerts.slice(0, 5).map((a) => `- ${a.timestamp}: ${a.message} (${a.severity})`).join('\n')}
    `
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(reportContent))
    element.setAttribute('download', 'flood_alert_report.txt')
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const criticalCount = activeAlerts.filter((a) => a.severity === 'level2').length
  const warningCount = activeAlerts.filter((a) => a.severity === 'level1').length

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
            <h1 className="text-4xl font-bold text-white mb-2">Alert Management</h1>
            <p className="text-white/60">Monitor and manage flood risk alerts</p>
          </motion.div>

          {/* Government Emergency Alert Command Center */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-aqua/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-aqua" />
              National Flood Alert Command Center
            </h2>
            <AlertCommandCenter
              currentLevel={currentAlertLevel}
              onSimulateAlert={handleAlertLevelChange}
            />
          </div>

          {/* Download Report */}
          <div className="flex justify-end">
            <Button
              onClick={handleDownloadReport}
              className="flex items-center gap-2"
              variant="outline"
            >
              <Download className="w-4 h-4" />
              Download Alert Report
            </Button>
          </div>

          {/* Active Alerts Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-critical/10 border-l-4 border-critical rounded-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm mb-1">Critical Alerts</p>
                  <p className="text-3xl font-bold text-critical">{criticalCount}</p>
                </div>
                <AlertCircle className="w-12 h-12 text-critical/30" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-warning/10 border-l-4 border-warning rounded-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm mb-1">Warning Alerts</p>
                  <p className="text-3xl font-bold text-warning">{warningCount}</p>
                </div>
                <AlertTriangle className="w-12 h-12 text-warning/30" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-safe/10 border-l-4 border-safe rounded-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm mb-1">Total Alerts (24h)</p>
                  <p className="text-3xl font-bold text-safe">{displayAlerts.length}</p>
                </div>
                <TrendingUp className="w-12 h-12 text-safe/30" />
              </div>
            </motion.div>
          </div>

          {/* Alert History */}
          <SectionCard title="Alert History" delay={0.25}>
            {displayAlerts.length > 0 ? (
              <AlertHistory alerts={displayAlerts} />
            ) : (
              <div className="py-12 text-center">
                <p className="text-white/60">No alerts recorded</p>
              </div>
            )}
          </SectionCard>

          {/* Alert Configuration */}
          <SectionCard title="Alert Thresholds" delay={0.3}>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-white font-medium">Level 1 (Warning) Threshold</label>
                  <span className="text-warning font-semibold">50% Risk</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                  <div className="bg-warning h-full" style={{ width: '50%' }} />
                </div>
                <p className="text-white/60 text-sm">
                  Triggered when runoff exceeds 80% OR rainfall increasing with low drainage
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-white font-medium">Level 2 (Critical) Threshold</label>
                  <span className="text-critical font-semibold">85% Risk</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                  <div className="bg-critical h-full" style={{ width: '85%' }} />
                </div>
                <p className="text-white/60 text-sm">
                  Triggered for critical flood conditions requiring immediate response
                </p>
              </div>
            </div>
          </SectionCard>
        </div>
      </main>
    </div>
  )
}
