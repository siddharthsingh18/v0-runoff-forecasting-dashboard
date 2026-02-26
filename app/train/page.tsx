'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/layout/Navbar'
import { Sidebar } from '@/components/layout/Sidebar'
import { SectionCard } from '@/components/ui/SectionCard'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { GlowButton } from '@/components/ui/GlowButton'
import { MetricCard } from '@/components/ui/MetricCard'
import api from '@/lib/api'
import { TrainResponse } from '@/lib/types'
import { CheckCircle, AlertCircle, Zap } from 'lucide-react'
import { toast } from 'sonner'

export default function TrainPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<TrainResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleTraining = async () => {
    try {
      setLoading(true)
      setError(null)
      setResult(null)

      const response = await api.trainModels({
        train_end_year: 2020,
        test_start_year: 2021,
        search_type: 'grid',
        n_iter: 20,
        cv_splits: 5,
      })
      setResult(response)
      toast.success('Model training completed successfully!')
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to train models'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

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
            <h1 className="text-4xl font-bold text-white mb-2">Model Training</h1>
            <p className="text-white/60">
              Train and auto-tune machine learning models with hyperparameter optimization
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Training Control */}
            <SectionCard title="Training Control" delay={0.1}>
              <div className="space-y-6">
                <p className="text-sm text-white/60">
                  Start training with optimized hyperparameters for best model performance.
                </p>

                <GlowButton
                  onClick={handleTraining}
                  disabled={loading}
                  className="w-full"
                  glowIntensity="high"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <LoadingSpinner size="sm" />
                      <span>Training...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      <span>Start Training</span>
                    </div>
                  )}
                </GlowButton>

                {error && !loading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-start gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-300">{error}</p>
                  </motion.div>
                )}

                {!loading && !result && !error && (
                  <p className="text-xs text-white/40 text-center">
                    Ready to start training
                  </p>
                )}
              </div>
            </SectionCard>

            {/* Results Section */}
            <div className="lg:col-span-2 space-y-6">
              {result && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <motion.div
                    className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-green-300 font-semibold">Training Completed</p>
                      <p className="text-xs text-green-200">Model saved successfully</p>
                    </div>
                  </motion.div>

                  <div className="grid grid-cols-2 gap-4">
                    <MetricCard
                      label="Best Model"
                      value={result.best_model.model_name.replace('_', ' ')}
                    />
                    <MetricCard
                      label="RMSE"
                      value={result.best_model.rmse.toFixed(4)}
                    />
                    <MetricCard
                      label="MAE"
                      value={result.best_model.mae.toFixed(4)}
                    />
                    <MetricCard
                      label="R² Score"
                      value={result.best_model.r2.toFixed(4)}
                    />
                  </div>

                  <SectionCard title="Best Parameters" delay={0.2}>
                    <pre className="text-xs bg-black/30 p-4 rounded text-cyan-300 overflow-x-auto max-h-48">
                      {JSON.stringify(result.best_model.best_params, null, 2)}
                    </pre>
                  </SectionCard>
                </motion.div>
              )}

              {!loading && !result && !error && (
                <SectionCard title="Status" delay={0.2}>
                  <p className="text-white/60 text-sm text-center py-8">
                    Click "Start Training" to begin model training and optimization
                  </p>
                </SectionCard>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
