'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/layout/Navbar'
import { Sidebar } from '@/components/layout/Sidebar'
import { MetricCard } from '@/components/ui/MetricCard'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { SectionCard } from '@/components/ui/SectionCard'
import api from '@/lib/api'
import { TrainResponse } from '@/lib/types'
import { TrendingUp, TrendingDown, Zap, Target, Activity, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

export default function DashboardPage() {
  const [data, setData] = useState<TrainResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [apiStatus, setApiStatus] = useState<'online' | 'offline' | 'error'>('offline')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const health = await api.getHealth()
        setApiStatus('online')

        const metrics = await api.getLatestMetrics()
        setData(metrics)
      } catch (error: any) {
        console.error('Failed to fetch data:', error)
        setApiStatus('error')
        toast.error('Failed to load dashboard metrics')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 60000)
    return () => clearInterval(interval)
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

  const bestModel = data?.best_model
  const allModels = data?.all_models || []

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
            <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-white/60">
              Real-time model metrics and performance analysis
            </p>
          </motion.div>

          {/* Top Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <MetricCard
              label="Best Model"
              value={bestModel?.model_name.replace('_', ' ') || 'N/A'}
              icon={<Zap className="w-6 h-6" />}
            />
            <MetricCard
              label="RMSE"
              value={bestModel?.rmse.toFixed(4) || '—'}
              icon={<TrendingDown className="w-6 h-6" />}
              trend="down"
            />
            <MetricCard
              label="MAE"
              value={bestModel?.mae.toFixed(4) || '—'}
              icon={<Target className="w-6 h-6" />}
              trend="down"
            />
            <MetricCard
              label="R² Score"
              value={bestModel?.r2.toFixed(4) || '—'}
              icon={<TrendingUp className="w-6 h-6" />}
              trend="up"
            />
            <MetricCard
              label="NSE"
              value={bestModel?.nse ? bestModel.nse.toFixed(4) : '—'}
              icon={<Activity className="w-6 h-6" />}
              trend="up"
            />
            <MetricCard
              label="CV Score"
              value={bestModel?.cv_score_rmse.toFixed(4) || '—'}
              icon={<AlertCircle className="w-6 h-6" />}
            />
          </div>

          {/* Right Panel: API Status */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Model Comparison Table */}
              <SectionCard
                title="Model Comparison"
                description="Performance metrics across all trained models"
                delay={0.1}
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-white/10">
                      <tr>
                        <th className="text-left py-3 px-4 text-white/60">Model</th>
                        <th className="text-right py-3 px-4 text-white/60">RMSE</th>
                        <th className="text-right py-3 px-4 text-white/60">MAE</th>
                        <th className="text-right py-3 px-4 text-white/60">R²</th>
                        <th className="text-right py-3 px-4 text-white/60">NSE</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {allModels.map((model, idx) => (
                        <tr key={idx} className="hover:bg-white/5 transition-colors">
                          <td className="py-3 px-4 text-white">{model.model_name}</td>
                          <td className="text-right py-3 px-4 text-white/80">{model.rmse.toFixed(4)}</td>
                          <td className="text-right py-3 px-4 text-white/80">{model.mae.toFixed(4)}</td>
                          <td className="text-right py-3 px-4 text-white/80">{model.r2.toFixed(4)}</td>
                          <td className="text-right py-3 px-4 text-white/80">{model.nse?.toFixed(4) || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </SectionCard>
            </div>

            {/* Status Panel */}
            <div className="space-y-4">
              <SectionCard title="System Status" delay={0.2}>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-white/60 mb-2">API Health</p>
                    <StatusBadge status={apiStatus} />
                  </div>

                  {bestModel && (
                    <>
                      <div className="pt-4 border-t border-white/10">
                        <p className="text-xs text-white/60 mb-3">Last Training</p>
                        <p className="text-sm text-white">Just now</p>
                      </div>

                      <div className="pt-4 border-t border-white/10">
                        <p className="text-xs text-white/60 mb-3">Parameters</p>
                        <pre className="text-xs bg-black/30 p-2 rounded text-cyan-300 overflow-x-auto max-h-32">
                          {JSON.stringify(bestModel.best_params, null, 2)}
                        </pre>
                      </div>
                    </>
                  )}
                </div>
              </SectionCard>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
