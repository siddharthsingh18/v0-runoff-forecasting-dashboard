'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Droplets, Eye, EyeOff } from 'lucide-react'

interface MapRegion {
  id: string
  name: string
  lat: number
  lng: number
  riskLevel: 'safe' | 'moderate' | 'high' | 'critical'
  rainfall: number
  runoff: number
  riverLevel: number
}

interface FloodMapProps {
  regions?: MapRegion[]
  onRegionClick?: (region: MapRegion) => void
  height?: string
}

const defaultRegions: MapRegion[] = [
  {
    id: '1',
    name: 'Northern Region',
    lat: 28.7041,
    lng: 77.1025,
    riskLevel: 'critical',
    rainfall: 125,
    runoff: 48,
    riverLevel: 8.5,
  },
  {
    id: '2',
    name: 'Central Region',
    lat: 23.1815,
    lng: 79.9864,
    riskLevel: 'high',
    rainfall: 95,
    runoff: 38,
    riverLevel: 6.2,
  },
  {
    id: '3',
    name: 'Eastern Region',
    lat: 25.5941,
    lng: 88.2435,
    riskLevel: 'moderate',
    rainfall: 65,
    runoff: 22,
    riverLevel: 4.1,
  },
  {
    id: '4',
    name: 'Southern Region',
    lat: 13.0827,
    lng: 80.2707,
    riskLevel: 'safe',
    rainfall: 25,
    runoff: 8,
    riverLevel: 1.5,
  },
  {
    id: '5',
    name: 'Western Region',
    lat: 19.0176,
    lng: 72.8479,
    riskLevel: 'high',
    rainfall: 110,
    runoff: 42,
    riverLevel: 7.1,
  },
  {
    id: '6',
    name: 'North-Eastern Region',
    lat: 26.1445,
    lng: 91.7362,
    riskLevel: 'critical',
    rainfall: 155,
    runoff: 58,
    riverLevel: 9.8,
  },
]

export function FloodMap({
  regions = defaultRegions,
  onRegionClick,
  height = 'h-screen',
}: FloodMapProps) {
  const [activeLayers, setActiveLayers] = useState({
    rainfall: true,
    runoff: true,
    riverLevel: false,
    drainage: false,
    vegetation: false,
  })

  const [selectedRegion, setSelectedRegion] = useState<MapRegion | null>(null)
  const [heatmapData, setHeatmapData] = useState<MapRegion[]>(regions)

  useEffect(() => {
    setHeatmapData(regions)
  }, [regions])

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical':
        return '#dc2626' // red-600
      case 'high':
        return '#f97316' // orange-500
      case 'moderate':
        return '#eab308' // yellow-400
      case 'safe':
        return '#22c55e' // green-500
      default:
        return '#64748b' // slate-500
    }
  }

  const toggleLayer = (layer: keyof typeof activeLayers) => {
    setActiveLayers((prev) => ({
      ...prev,
      [layer]: !prev[layer],
    }))
  }

  const getMapPosition = (lat: number, lng: number) => {
    // Simple mercator-like projection for India map
    // India roughly spans 8°N to 35°N and 68°E to 97°E
    const minLat = 8,
      maxLat = 35,
      minLng = 68,
      maxLng = 97
    const x = ((lng - minLng) / (maxLng - minLng)) * 100
    const y = ((maxLat - lat) / (maxLat - minLat)) * 100
    return { x, y }
  }

  return (
    <div className={`${height} w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden`}>
      {/* Map Background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%22100%22%20height=%22100%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Crect%20fill=%22%23020617%22%20width=%22100%22%20height=%22100%22/%3E%3Cpath%20d=%22M0%200h100v100H0z%22%20fill=%22none%22%20stroke=%22%2364748b%22%20stroke-width=%220.5%22%20opacity=%220.1%22/%3E%3C/svg%3E')] opacity-30" />

      {/* Grid Background */}
      <div className="absolute inset-0 grid grid-cols-12 gap-8 opacity-5">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="border border-cyan-400" />
        ))}
      </div>

      {/* Gradient Overlay */}
      <motion.div
        animate={{
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 bg-gradient-to-br from-aqua/5 via-transparent to-purple-500/5"
      />

      {/* Heat Map Points */}
      <svg className="absolute inset-0 w-full h-full" style={{ mixBlendMode: 'screen' }}>
        {heatmapData.map((region) => {
          const { x, y } = getMapPosition(region.lat, region.lng)
          const color = getRiskColor(region.riskLevel)
          const showHeatmap = activeLayers.rainfall || activeLayers.runoff

          return (
            <g key={region.id}>
              {/* Heatmap glow */}
              {showHeatmap && (
                <>
                  <circle
                    cx={`${x}%`}
                    cy={`${y}%`}
                    r="80"
                    fill={color}
                    opacity="0.15"
                  />
                  <circle
                    cx={`${x}%`}
                    cy={`${y}%`}
                    r="50"
                    fill={color}
                    opacity="0.2"
                  />
                </>
              )}

              {/* Risk indicator */}
              <motion.circle
                cx={`${x}%`}
                cy={`${y}%`}
                r="12"
                fill={color}
                animate={region.riskLevel === 'critical' ? { r: [12, 18, 12] } : {}}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setSelectedRegion(region)
                  onRegionClick?.(region)
                }}
              />
            </g>
          )
        })}
      </svg>

      {/* Layer Controls */}
      <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 z-20">
        <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
          <Droplets className="w-4 h-4" />
          Monitoring Layers
        </h3>
        <div className="space-y-3 text-sm">
          {[
            { key: 'rainfall', label: 'Rainfall' },
            { key: 'runoff', label: 'Runoff' },
            { key: 'riverLevel', label: 'River Level' },
            { key: 'drainage', label: 'Drainage Stress' },
            { key: 'vegetation', label: 'Vegetation Loss' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => toggleLayer(key as keyof typeof activeLayers)}
              className="flex items-center gap-2 w-full p-2 rounded hover:bg-white/10 transition-colors text-white/80 hover:text-white"
            >
              {activeLayers[key as keyof typeof activeLayers] ? (
                <Eye className="w-4 h-4" />
              ) : (
                <EyeOff className="w-4 h-4" />
              )}
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Risk Legend */}
      <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 z-20">
        <h3 className="text-white font-semibold text-sm mb-3">Risk Levels</h3>
        <div className="space-y-2 text-xs">
          {[
            { level: 'critical', label: 'Critical', color: '#dc2626' },
            { level: 'high', label: 'High', color: '#f97316' },
            { level: 'moderate', label: 'Moderate', color: '#eab308' },
            { level: 'safe', label: 'Safe', color: '#22c55e' },
          ].map(({ level, label, color }) => (
            <div key={level} className="flex items-center gap-2 text-white/70">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color }}
              />
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Selected Region Info */}
      {selectedRegion && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute right-6 top-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 z-20 w-72"
        >
          <h2 className="text-white font-bold text-lg mb-4">{selectedRegion.name}</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-white/60">Risk Level:</span>
              <span
                className="font-semibold px-2 py-1 rounded text-white"
                style={{
                  backgroundColor: getRiskColor(selectedRegion.riskLevel),
                  opacity: 0.7,
                }}
              >
                {selectedRegion.riskLevel.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Rainfall (mm):</span>
              <span className="text-white font-semibold">{selectedRegion.rainfall}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Runoff Rate (%):</span>
              <span className="text-white font-semibold">{selectedRegion.runoff}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">River Level (m):</span>
              <span className="text-white font-semibold">{selectedRegion.riverLevel}</span>
            </div>
          </div>
          <button
            onClick={() => setSelectedRegion(null)}
            className="mt-4 w-full py-2 rounded bg-white/10 hover:bg-white/20 transition-colors text-white text-sm"
          >
            Close
          </button>
        </motion.div>
      )}
    </div>
  )
}
