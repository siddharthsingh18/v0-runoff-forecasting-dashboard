'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/layout/Navbar'
import { Sidebar } from '@/components/layout/Sidebar'
import { SectionCard } from '@/components/ui/SectionCard'
import { GlowButton } from '@/components/ui/GlowButton'
import api from '@/lib/api'
import { Upload, CheckCircle, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

export default function DatasetPage() {
  const [uploading, setUploading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      await handleUpload(files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      handleUpload(files[0])
    }
  }

  const handleUpload = async (file: File) => {
    if (!file.name.endsWith('.csv')) {
      toast.error('Please upload a CSV file')
      return
    }

    setUploading(true)
    setUploadComplete(false)

    try {
      const formData = new FormData()
      formData.append('file', file)
      
      await api.uploadDataset(formData)
      setUploadComplete(true)
      toast.success('Dataset uploaded successfully!')
    } catch (error: any) {
      toast.error(error.message || 'Upload failed')
    } finally {
      setUploading(false)
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
            <h1 className="text-4xl font-bold text-white mb-2">Dataset Management</h1>
            <p className="text-white/60">
              Upload and manage training datasets
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Upload Section */}
            <SectionCard title="Upload Dataset" delay={0.1}>
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive
                    ? 'border-cyan-400 bg-cyan-500/10'
                    : 'border-white/20 bg-white/5'
                }`}
              >
                <Upload className="w-12 h-12 text-cyan-400/60 mx-auto mb-4" />
                <p className="text-white/80 mb-2">Drag and drop your CSV file here</p>
                <p className="text-white/40 text-sm mb-4">or</p>
                <label>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileInput}
                    className="hidden"
                    disabled={uploading}
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      const input = e.currentTarget.parentElement?.querySelector('input')
                      input?.click()
                    }}
                    className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
                  >
                    Browse files
                  </button>
                </label>
              </div>

              {uploading && (
                <div className="mt-6 p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg flex items-center gap-3">
                  <div className="w-4 h-4 bg-blue-400 rounded-full animate-pulse" />
                  <span className="text-sm text-blue-300">Uploading...</span>
                </div>
              )}

              {uploadComplete && !uploading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-green-300">Upload complete</span>
                </motion.div>
              )}
            </SectionCard>

            {/* Dataset Info */}
            <div className="lg:col-span-2 space-y-6">
              <SectionCard title="Dataset Information" delay={0.2}>
                <div className="space-y-4">
                  <div>
                    <p className="text-white/60 text-sm mb-1">Total Rows</p>
                    <p className="text-2xl font-bold text-white">1,250</p>
                  </div>
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-white/60 text-sm mb-1">Features</p>
                    <p className="text-2xl font-bold text-white">4</p>
                  </div>
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-white/60 text-sm mb-1">Last Updated</p>
                    <p className="text-sm text-white">2024-01-15 10:30 AM</p>
                  </div>
                </div>
              </SectionCard>

              <SectionCard title="Feature List" delay={0.3}>
                <div className="space-y-2">
                  {['Rainfall', 'Temperature', 'Humidity', 'Previous Runoff'].map((feature, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2 px-3 bg-white/5 rounded">
                      <span className="text-white text-sm">{feature}</span>
                      <span className="text-white/60 text-xs">numeric</span>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
