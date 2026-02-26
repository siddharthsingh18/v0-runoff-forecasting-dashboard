'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/layout/Navbar'
import { Sidebar } from '@/components/layout/Sidebar'
import { SectionCard } from '@/components/ui/SectionCard'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import api from '@/lib/api'
import { Download } from 'lucide-react'

export default function ModelsPage() {
  const [models, setModels] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const data = await api.getModelRegistry()
        setModels(data.models || [])
      } catch (error) {
        console.error('Failed to fetch models:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchModels()
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar />
      <Sidebar />

      <main className="ml-64 px-8 py-12">
        <div className="max-w-7xl space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-white mb-2">Model Registry</h1>
            <p className="text-white/60">
              View all trained models and their performance metrics
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center min-h-96">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <SectionCard title="Trained Models" delay={0.1}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-white/10">
                    <tr>
                      <th className="text-left py-3 px-4 text-white/60">Model Name</th>
                      <th className="text-right py-3 px-4 text-white/60">Version</th>
                      <th className="text-right py-3 px-4 text-white/60">RMSE</th>
                      <th className="text-right py-3 px-4 text-white/60">MAE</th>
                      <th className="text-right py-3 px-4 text-white/60">R²</th>
                      <th className="text-right py-3 px-4 text-white/60">NSE</th>
                      <th className="text-center py-3 px-4 text-white/60">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {models.length > 0 ? (
                      models.map((model, idx) => (
                        <tr key={idx} className="hover:bg-white/5 transition-colors">
                          <td className="py-3 px-4 text-white">{model.model_name}</td>
                          <td className="text-right py-3 px-4 text-white/80">{model.version}</td>
                          <td className="text-right py-3 px-4 text-white/80">{model.rmse?.toFixed(4) || '—'}</td>
                          <td className="text-right py-3 px-4 text-white/80">{model.mae?.toFixed(4) || '—'}</td>
                          <td className="text-right py-3 px-4 text-white/80">{model.r2?.toFixed(4) || '—'}</td>
                          <td className="text-right py-3 px-4 text-white/80">{model.nse?.toFixed(4) || '—'}</td>
                          <td className="text-center py-3 px-4">
                            <button className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm flex items-center justify-center gap-1 w-full">
                              <Download className="w-4 h-4" />
                              Download
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="py-8 px-4 text-center text-white/60">
                          No models found. Train a model to get started.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </SectionCard>
          )}
        </div>
      </main>
    </div>
  )
}
