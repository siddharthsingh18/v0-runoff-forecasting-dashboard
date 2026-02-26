'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/layout/Navbar'
import { Sidebar } from '@/components/layout/Sidebar'
import { SectionCard } from '@/components/ui/SectionCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Upload, MapPin, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'

interface FloodReport {
  id: string
  location: string
  latitude: number
  longitude: number
  description: string
  waterLevel: number
  imageUrl?: string
  timestamp: string
  status: 'pending' | 'verified' | 'resolved'
  userEmail: string
}

export default function CitizenReportPage() {
  const [reports, setReports] = useState<FloodReport[]>([
    {
      id: '1',
      location: 'Main Street, Central District',
      latitude: 28.6139,
      longitude: 77.209,
      description: 'Severe waterlogging on main road. Traffic blocked.',
      waterLevel: 45,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      status: 'verified',
      userEmail: 'citizen1@example.com',
    },
    {
      id: '2',
      location: 'Residential Colony, North Zone',
      latitude: 28.65,
      longitude: 77.25,
      description: 'Drainage overflow causing property damage',
      waterLevel: 60,
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      status: 'pending',
      userEmail: 'citizen2@example.com',
    },
  ])

  const [formData, setFormData] = useState({
    location: '',
    latitude: '',
    longitude: '',
    description: '',
    waterLevel: '50',
    email: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newReport: FloodReport = {
        id: Date.now().toString(),
        location: formData.location,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
        description: formData.description,
        waterLevel: parseInt(formData.waterLevel),
        timestamp: new Date().toISOString(),
        status: 'pending',
        userEmail: formData.email,
      }

      setReports([newReport, ...reports])
      toast.success('Report submitted successfully! Our team will verify shortly.')
      setFormData({
        location: '',
        latitude: '',
        longitude: '',
        description: '',
        waterLevel: '50',
        email: '',
      })
    } catch (error) {
      toast.error('Failed to submit report. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

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
            <h1 className="text-4xl font-bold text-white mb-2">Citizen Flood Reporting</h1>
            <p className="text-white/60">
              Help us monitor flood conditions by reporting waterlogging and flood incidents in your area
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Report Form */}
            <SectionCard title="Submit a Flood Report" delay={0.1}>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="location" className="text-white mb-2 block text-sm">
                    Location Description
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="e.g., Main Street near Market"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="latitude" className="text-white mb-2 block text-sm">
                      Latitude
                    </Label>
                    <Input
                      id="latitude"
                      name="latitude"
                      type="number"
                      placeholder="28.6139"
                      step="0.0001"
                      value={formData.latitude}
                      onChange={handleInputChange}
                      required
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="longitude" className="text-white mb-2 block text-sm">
                      Longitude
                    </Label>
                    <Input
                      id="longitude"
                      name="longitude"
                      type="number"
                      placeholder="77.2090"
                      step="0.0001"
                      value={formData.longitude}
                      onChange={handleInputChange}
                      required
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description" className="text-white mb-2 block text-sm">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe the flood situation, water level, and any damages..."
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    className="bg-white/5 border-white/10 text-white resize-none"
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="waterLevel" className="text-white mb-2 block text-sm">
                    Water Level (0-100 cm)
                  </Label>
                  <Input
                    id="waterLevel"
                    name="waterLevel"
                    type="range"
                    min="0"
                    max="100"
                    value={formData.waterLevel}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                  <p className="text-white/60 text-xs mt-1">{formData.waterLevel} cm</p>
                </div>

                <div>
                  <Label htmlFor="email" className="text-white mb-2 block text-sm">
                    Your Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  {isSubmitting ? 'Submitting...' : 'Submit Report'}
                </Button>
              </form>
            </SectionCard>

            {/* Reports List */}
            <div className="lg:col-span-2">
              <SectionCard title={`Recent Reports (${reports.length})`} delay={0.2}>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {reports.length === 0 ? (
                    <p className="text-white/60 text-center py-8">No reports yet.</p>
                  ) : (
                    reports.map((report, idx) => (
                      <motion.div
                        key={report.id}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="bg-white/5 border border-white/10 rounded-lg p-4 hover:border-white/20 transition-colors"
                      >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start gap-3 flex-1">
                            <MapPin className="w-5 h-5 text-aqua flex-shrink-0 mt-1" />
                            <div className="flex-1">
                              <h3 className="text-white font-semibold">{report.location}</h3>
                              <p className="text-xs text-white/50">
                                {new Date(report.timestamp).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          {report.status === 'verified' ? (
                            <CheckCircle2 className="w-5 h-5 text-safe flex-shrink-0" />
                          ) : report.status === 'resolved' ? (
                            <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                          ) : (
                            <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0" />
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-white/80 text-sm mb-3">{report.description}</p>

                        {/* Water Level */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-white/60 text-sm">Water Level:</span>
                          <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-safe via-warning to-critical"
                              style={{ width: `${report.waterLevel}%` }}
                            />
                          </div>
                          <span className="text-white font-semibold text-sm w-12">
                            {report.waterLevel}cm
                          </span>
                        </div>

                        {/* Status Badge */}
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${
                              report.status === 'verified'
                                ? 'bg-safe/20 text-safe'
                                : report.status === 'resolved'
                                ? 'bg-cyan-400/20 text-cyan-400'
                                : 'bg-warning/20 text-warning'
                            }`}
                          >
                            {report.status === 'verified'
                              ? 'Verified'
                              : report.status === 'resolved'
                              ? 'Resolved'
                              : 'Pending Verification'}
                          </span>
                          <span className="text-xs text-white/50">
                            {report.userEmail}
                          </span>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </SectionCard>
            </div>
          </div>

          {/* Impact Section */}
          <SectionCard title="Community Impact" delay={0.3}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="bg-white/5 rounded-lg p-4 text-center border border-white/10"
              >
                <p className="text-3xl font-bold text-aqua">{reports.length}</p>
                <p className="text-white/60 text-sm mt-2">Total Reports</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="bg-white/5 rounded-lg p-4 text-center border border-white/10"
              >
                <p className="text-3xl font-bold text-safe">
                  {reports.filter((r) => r.status === 'verified').length}
                </p>
                <p className="text-white/60 text-sm mt-2">Verified</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/5 rounded-lg p-4 text-center border border-white/10"
              >
                <p className="text-3xl font-bold text-warning">
                  {reports.filter((r) => r.status === 'pending').length}
                </p>
                <p className="text-white/60 text-sm mt-2">Pending</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-white/5 rounded-lg p-4 text-center border border-white/10"
              >
                <p className="text-3xl font-bold text-cyan-400">
                  {Math.round(reports.reduce((sum, r) => sum + r.waterLevel, 0) / reports.length)}
                </p>
                <p className="text-white/60 text-sm mt-2">Avg Water Level</p>
              </motion.div>
            </div>
          </SectionCard>
        </div>
      </main>
    </div>
  )
}
