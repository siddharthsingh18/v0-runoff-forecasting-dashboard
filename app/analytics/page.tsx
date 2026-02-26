'use client'

import { motion } from 'framer-motion'
import { Navbar } from '@/components/layout/Navbar'
import { Sidebar } from '@/components/layout/Sidebar'
import { SectionCard } from '@/components/ui/SectionCard'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts'

const predictionData = [
  { date: '2024-01-01', actual: 45, predicted: 42 },
  { date: '2024-01-02', actual: 52, predicted: 51 },
  { date: '2024-01-03', actual: 48, predicted: 50 },
  { date: '2024-01-04', actual: 61, predicted: 58 },
  { date: '2024-01-05', actual: 55, predicted: 56 },
]

const featureImportance = [
  { feature: 'Rainfall', importance: 0.45 },
  { feature: 'Temperature', importance: 0.28 },
  { feature: 'Humidity', importance: 0.18 },
  { feature: 'Prev. Runoff', importance: 0.09 },
]

const learningCurve = [
  { iteration: 1, train: 0.65, val: 0.58 },
  { iteration: 2, train: 0.72, val: 0.68 },
  { iteration: 3, train: 0.78, val: 0.75 },
  { iteration: 4, train: 0.82, val: 0.80 },
  { iteration: 5, train: 0.85, val: 0.83 },
]

export default function AnalyticsPage() {
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
            <h1 className="text-4xl font-bold text-white mb-2">Analytics</h1>
            <p className="text-white/60">
              Detailed model analysis and performance visualization
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Actual vs Predicted */}
            <SectionCard
              title="Actual vs Predicted"
              description="Comparison of actual and predicted runoff values"
              delay={0.1}
            >
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={predictionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="date" stroke="rgba(255,255,255,0.6)" />
                  <YAxis stroke="rgba(255,255,255,0.6)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(15, 23, 42, 0.95)',
                      border: '1px solid rgba(34, 211, 238, 0.3)',
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="actual" stroke="#06b6d4" strokeWidth={2} />
                  <Line type="monotone" dataKey="predicted" stroke="#a855f7" strokeWidth={2} strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </SectionCard>

            {/* Feature Importance */}
            <SectionCard
              title="Feature Importance"
              description="Relative importance of input features"
              delay={0.2}
            >
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={featureImportance} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis type="number" stroke="rgba(255,255,255,0.6)" />
                  <YAxis dataKey="feature" type="category" stroke="rgba(255,255,255,0.6)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(15, 23, 42, 0.95)',
                      border: '1px solid rgba(34, 211, 238, 0.3)',
                    }}
                  />
                  <Bar dataKey="importance" fill="#06b6d4" />
                </BarChart>
              </ResponsiveContainer>
            </SectionCard>

            {/* Learning Curve */}
            <SectionCard
              title="Learning Curve"
              description="Model performance across training iterations"
              delay={0.3}
            >
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={learningCurve}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="iteration" stroke="rgba(255,255,255,0.6)" />
                  <YAxis stroke="rgba(255,255,255,0.6)" domain={[0, 1]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(15, 23, 42, 0.95)',
                      border: '1px solid rgba(34, 211, 238, 0.3)',
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="train" stroke="#06b6d4" strokeWidth={2} />
                  <Line type="monotone" dataKey="val" stroke="#a855f7" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </SectionCard>

            {/* Residual Distribution */}
            <SectionCard
              title="Residual Analysis"
              description="Distribution of prediction errors"
              delay={0.4}
            >
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart data={predictionData.map((d, i) => ({
                  ...d,
                  residual: d.actual - d.predicted,
                  index: i,
                }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="index" stroke="rgba(255,255,255,0.6)" name="Sample" />
                  <YAxis stroke="rgba(255,255,255,0.6)" name="Residual" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(15, 23, 42, 0.95)',
                      border: '1px solid rgba(34, 211, 238, 0.3)',
                    }}
                  />
                  <Scatter dataKey="residual" fill="#06b6d4" />
                </ScatterChart>
              </ResponsiveContainer>
            </SectionCard>
          </div>
        </div>
      </main>
    </div>
  )
}
