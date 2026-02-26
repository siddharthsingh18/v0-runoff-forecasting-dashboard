'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/layout/Navbar'
import { Sidebar } from '@/components/layout/Sidebar'
import { SectionCard } from '@/components/ui/SectionCard'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, AreaChart, Area, ComposedChart } from 'recharts'
import { Button } from '@/components/ui/button'
import { Download, TrendingUp } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Slider } from '@/components/ui/slider'

const predictionData = [
  { date: '2024-01-01', actual: 45, predicted: 42, confidence: 0.92 },
  { date: '2024-01-02', actual: 52, predicted: 51, confidence: 0.94 },
  { date: '2024-01-03', actual: 48, predicted: 50, confidence: 0.91 },
  { date: '2024-01-04', actual: 61, predicted: 58, confidence: 0.88 },
  { date: '2024-01-05', actual: 55, predicted: 56, confidence: 0.93 },
  { date: '2024-01-06', actual: 67, predicted: 65, confidence: 0.90 },
  { date: '2024-01-07', actual: 58, predicted: 60, confidence: 0.89 },
]

const rainfallRunoffData = [
  { month: 'Jan', rainfall: 125, runoff: 48, drainage: 77 },
  { month: 'Feb', rainfall: 145, runoff: 62, drainage: 83 },
  { month: 'Mar', rainfall: 165, runoff: 75, drainage: 90 },
  { month: 'Apr', rainfall: 210, runoff: 95, drainage: 115 },
  { month: 'May', rainfall: 245, runoff: 118, drainage: 127 },
  { month: 'Jun', rainfall: 280, runoff: 155, drainage: 125 },
]

const historicalFloodData = [
  { year: 2000, events: 2, severity: 3, damage: 45 },
  { year: 2005, events: 3, severity: 4, damage: 78 },
  { year: 2010, events: 5, severity: 5, damage: 125 },
  { year: 2015, events: 7, severity: 6, damage: 185 },
  { year: 2020, events: 9, severity: 7, damage: 245 },
  { year: 2025, events: 12, severity: 8, damage: 320 },
]

const extremeEventData = [
  { decade: '1990s', frequency: 2, avgIntensity: 4 },
  { decade: '2000s', frequency: 4, avgIntensity: 5 },
  { decade: '2010s', frequency: 7, avgIntensity: 6 },
  { decade: '2020s', frequency: 12, avgIntensity: 7 },
]

const climateProjection = [
  { year: 2025, temp: 28.5, rainfall: 1200, confidence: 0.95 },
  { year: 2030, temp: 28.8, rainfall: 1250, confidence: 0.92 },
  { year: 2035, temp: 29.1, rainfall: 1320, confidence: 0.88 },
  { year: 2040, temp: 29.5, rainfall: 1400, confidence: 0.85 },
  { year: 2050, temp: 30.2, rainfall: 1520, confidence: 0.82 },
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
  const [timeRange, setTimeRange] = useState([2020, 2026])

  const handleExportChart = () => {
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent('Analytics Report\n' + JSON.stringify({timeRange, generatedAt: new Date().toLocaleString()})))
    element.setAttribute('download', 'analytics_report.txt')
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
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
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Advanced Analytics</h1>
                <p className="text-white/60">
                  Comprehensive flood prediction analysis and historical trend visualization
                </p>
              </div>
              <Button onClick={handleExportChart} className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export Report
              </Button>
            </div>
          </motion.div>

          {/* Time Range Selector */}
          <SectionCard title="Analysis Period" delay={0.05}>
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-white/60">
                <span>Years: {timeRange[0]} - {timeRange[1]}</span>
              </div>
              <Slider
                defaultValue={timeRange}
                min={2000}
                max={2026}
                step={1}
                onValueChange={setTimeRange}
                className="w-full"
              />
            </div>
          </SectionCard>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white/5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="advanced">Advanced Analysis</TabsTrigger>
              <TabsTrigger value="trends">Climate Trends</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Rainfall vs Runoff */}
                <SectionCard
                  title="Rainfall vs Runoff Analysis"
                  description="Relationship between rainfall and runoff rates"
                  delay={0.1}
                >
                  <ResponsiveContainer width="100%" height={300}>
                    <ComposedChart data={rainfallRunoffData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="month" stroke="rgba(255,255,255,0.6)" />
                      <YAxis stroke="rgba(255,255,255,0.6)" />
                      <Tooltip contentStyle={{backgroundColor: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(34, 211, 238, 0.3)'}} />
                      <Legend />
                      <Bar dataKey="rainfall" fill="#06b6d4" />
                      <Line type="monotone" dataKey="runoff" stroke="#f97316" strokeWidth={2} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </SectionCard>

                {/* Historical Flood Comparison */}
                <SectionCard
                  title="Historical Flood Frequency"
                  description="Flood events and severity over 25 years"
                  delay={0.2}
                >
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={historicalFloodData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="year" stroke="rgba(255,255,255,0.6)" />
                      <YAxis stroke="rgba(255,255,255,0.6)" />
                      <Tooltip contentStyle={{backgroundColor: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(34, 211, 238, 0.3)'}} />
                      <Area type="monotone" dataKey="events" fill="#dc2626" stroke="#b91c1c" />
                    </AreaChart>
                  </ResponsiveContainer>
                </SectionCard>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Actual vs Predicted with Confidence */}
                <SectionCard
                  title="Prediction Accuracy with Confidence Bands"
                  description="Model predictions with confidence intervals"
                  delay={0.1}
                >
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={predictionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="date" stroke="rgba(255,255,255,0.6)" />
                      <YAxis stroke="rgba(255,255,255,0.6)" />
                      <Tooltip contentStyle={{backgroundColor: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(34, 211, 238, 0.3)'}} />
                      <Legend />
                      <Line type="monotone" dataKey="actual" stroke="#06b6d4" strokeWidth={2} />
                      <Line type="monotone" dataKey="predicted" stroke="#a855f7" strokeWidth={2} strokeDasharray="5 5" />
                    </LineChart>
                  </ResponsiveContainer>
                </SectionCard>

                {/* Extreme Event Frequency */}
                <SectionCard
                  title="Extreme Event Analysis"
                  description="Frequency of extreme flood events by decade"
                  delay={0.2}
                >
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={extremeEventData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="decade" stroke="rgba(255,255,255,0.6)" />
                      <YAxis stroke="rgba(255,255,255,0.6)" />
                      <Tooltip contentStyle={{backgroundColor: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(34, 211, 238, 0.3)'}} />
                      <Legend />
                      <Bar dataKey="frequency" fill="#f97316" />
                      <Bar dataKey="avgIntensity" fill="#dc2626" />
                    </BarChart>
                  </ResponsiveContainer>
                </SectionCard>
              </div>
            </TabsContent>

            <TabsContent value="trends" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Climate Projection */}
                <SectionCard
                  title="Climate Change Impact Projection"
                  description="Temperature and rainfall projections (2025-2050)"
                  delay={0.1}
                >
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={climateProjection}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="year" stroke="rgba(255,255,255,0.6)" />
                      <YAxis stroke="rgba(255,255,255,0.6)" yAxisId="left" />
                      <YAxis stroke="rgba(255,255,255,0.6)" yAxisId="right" orientation="right" />
                      <Tooltip contentStyle={{backgroundColor: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(34, 211, 238, 0.3)'}} />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="temp" stroke="#f97316" strokeWidth={2} name="Temp (°C)" />
                      <Line yAxisId="right" type="monotone" dataKey="rainfall" stroke="#06b6d4" strokeWidth={2} name="Rainfall (mm)" />
                    </LineChart>
                  </ResponsiveContainer>
                </SectionCard>

                {/* Model Performance */}
                <SectionCard
                  title="Feature Importance"
                  description="Relative importance of input features in predictions"
                  delay={0.2}
                >
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={featureImportance} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis type="number" stroke="rgba(255,255,255,0.6)" />
                      <YAxis dataKey="feature" type="category" stroke="rgba(255,255,255,0.6)" />
                      <Tooltip contentStyle={{backgroundColor: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(34, 211, 238, 0.3)'}} />
                      <Bar dataKey="importance" fill="#06b6d4" />
                    </BarChart>
                  </ResponsiveContainer>
                </SectionCard>
              </div>
            </TabsContent>
          </Tabs>

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
