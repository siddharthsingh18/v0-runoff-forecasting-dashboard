'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { predictionSchema, type PredictionData } from '@/lib/validators'
import { Navbar } from '@/components/layout/Navbar'
import { Sidebar } from '@/components/layout/Sidebar'
import { SectionCard } from '@/components/ui/SectionCard'
import { GlowButton } from '@/components/ui/GlowButton'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { PredictionGauge } from '@/components/prediction/PredictionGauge'
import { motion } from 'framer-motion'
import { Zap, TrendingUp, AlertTriangle, Droplets, Thermometer, Wind } from 'lucide-react'
import { toast } from 'sonner'
import api from '@/lib/api'

export default function PredictPage() {
  const [isPredicting, setIsPredicting] = useState(false)
  const [prediction, setPrediction] = useState<number | null>(null)
  const [confidence, setConfidence] = useState<number | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PredictionData>({
    resolver: zodResolver(predictionSchema),
    defaultValues: {
      rainfall: 50,
      temperature: 20,
      humidity: 60,
      previous_runoff: 30,
    },
  })

  // Watch form values for real-time probability calculation
  const watchValues = watch()
  
  // Calculate flood probability based on inputs
  const calculateFloodProbability = (data: PredictionData) => {
    const rainfallFactor = Math.min((data.rainfall / 300) * 40, 40)
    const humiditySaturation = Math.max((data.humidity - 60) / 40, 0) * 30
    const runoffFactor = Math.min((data.previous_runoff / 100) * 30, 30)
    return Math.round(rainfallFactor + humiditySaturation + runoffFactor)
  }

  // Calculate probability directly from watched values (no state update to avoid loops)
  const floodProbability = calculateFloodProbability(watchValues as PredictionData)

  const onSubmit = async (data: PredictionData) => {
    setIsPredicting(true)
    setPrediction(null)
    setConfidence(null)

    try {
      const result = await api.predict(data)
      setPrediction(result.predicted_runoff)
      setConfidence(result.confidence)
      toast.success('Prediction successful!')
    } catch (error: any) {
      toast.error(error.message || 'Prediction failed')
    } finally {
      setIsPredicting(false)
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
            <h1 className="text-4xl font-bold text-white mb-2">Make Predictions</h1>
            <p className="text-white/60">
              Generate 3-day ahead runoff forecasts with confidence intervals
            </p>
          </motion.div>

          {/* Real-time Flood Probability */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionCard title="Real-Time Flood Risk Probability" delay={0.05}>
              <div className="flex flex-col items-center">
                <PredictionGauge
                  probability={floodProbability}
                  label="24h Flood Probability"
                  severity={
                    floodProbability < 20
                      ? 'low'
                      : floodProbability < 40
                      ? 'medium'
                      : floodProbability < 60
                      ? 'high'
                      : 'critical'
                  }
                />
              </div>
            </SectionCard>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <SectionCard title="Input Parameters" delay={0.1}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Rainfall */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Droplets className="w-4 h-4 text-cyan-400" />
                    <Label htmlFor="rainfall" className="text-white text-sm">
                      Rainfall (mm)
                    </Label>
                  </div>
                  <Input
                    id="rainfall"
                    type="number"
                    step="0.1"
                    {...register('rainfall', { valueAsNumber: true })}
                    className="bg-white/5 border-white/10 text-white"
                  />
                  {errors.rainfall && (
                    <p className="text-red-400 text-xs mt-1">{errors.rainfall.message}</p>
                  )}
                </div>

                {/* Temperature */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Thermometer className="w-4 h-4 text-orange-400" />
                    <Label htmlFor="temperature" className="text-white text-sm">
                      Temperature (°C)
                    </Label>
                  </div>
                  <Input
                    id="temperature"
                    type="number"
                    step="0.1"
                    {...register('temperature', { valueAsNumber: true })}
                    className="bg-white/5 border-white/10 text-white"
                  />
                  {errors.temperature && (
                    <p className="text-red-400 text-xs mt-1">{errors.temperature.message}</p>
                  )}
                </div>

                {/* Humidity */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Wind className="w-4 h-4 text-blue-400" />
                    <Label htmlFor="humidity" className="text-white text-sm">
                      Humidity (%)
                    </Label>
                  </div>
                  <Input
                    id="humidity"
                    type="number"
                    step="0.1"
                    {...register('humidity', { valueAsNumber: true })}
                    className="bg-white/5 border-white/10 text-white"
                  />
                  {errors.humidity && (
                    <p className="text-red-400 text-xs mt-1">{errors.humidity.message}</p>
                  )}
                </div>

                {/* Previous Runoff */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-400" />
                    <Label htmlFor="previous_runoff" className="text-white text-sm">
                      Previous Runoff (mm)
                    </Label>
                  </div>
                  <Input
                    id="previous_runoff"
                    type="number"
                    step="0.1"
                    {...register('previous_runoff', { valueAsNumber: true })}
                    className="bg-white/5 border-white/10 text-white"
                  />
                  {errors.previous_runoff && (
                    <p className="text-red-400 text-xs mt-1">{errors.previous_runoff.message}</p>
                  )}
                </div>

                <GlowButton
                  type="submit"
                  disabled={isPredicting}
                  className="w-full mt-6"
                  glowIntensity="high"
                >
                  {isPredicting ? (
                    <div className="flex items-center gap-2">
                      <LoadingSpinner size="sm" />
                      <span>Predicting...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      <span>Generate Prediction</span>
                    </div>
                  )}
                </GlowButton>
              </form>
            </SectionCard>

            <div className="lg:col-span-2">
              {prediction !== null && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  <SectionCard title="Prediction Result" delay={0.2}>
                    <div className="space-y-6">
                      <div className="text-center">
                        <p className="text-white/60 text-sm mb-2">Predicted Runoff</p>
                        <p className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                          {prediction.toFixed(2)}
                        </p>
                        <p className="text-white/60 text-sm mt-2">mm</p>
                      </div>

                      {confidence && (
                        <div className="pt-6 border-t border-white/10">
                          <p className="text-white/60 text-sm mb-3">Confidence Level</p>
                          <div className="flex items-center gap-3">
                            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-cyan-400 to-purple-600"
                                style={{ width: `${confidence * 100}%` }}
                              />
                            </div>
                            <p className="text-white font-semibold">{(confidence * 100).toFixed(1)}%</p>
                          </div>
                        </div>
                      )}

                      <div className="pt-6 border-t border-white/10">
                        <button
                          onClick={() => {
                            setPrediction(null)
                            setConfidence(null)
                          }}
                          className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                          Make another prediction
                        </button>
                      </div>
                    </div>
                  </SectionCard>
                </motion.div>
              )}

              {prediction === null && (
                <SectionCard title="Ready for Prediction" delay={0.2}>
                  <div className="text-center py-12">
                    <TrendingUp className="w-12 h-12 text-cyan-400/50 mx-auto mb-4" />
                    <p className="text-white/60 text-sm">
                      Fill in the input features and click Generate Prediction
                    </p>
                  </div>
                </SectionCard>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
