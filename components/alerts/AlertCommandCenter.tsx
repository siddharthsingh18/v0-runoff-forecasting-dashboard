'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, Bell, AlertCircle, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export interface AlertLevel {
  level: number
  name: string
  description: string
  color: string
  bgColor: string
  icon: React.ReactNode
}

const alertLevels: AlertLevel[] = [
  {
    level: 0,
    name: 'All Clear',
    description: 'No flood threats detected',
    color: '#22c55e',
    bgColor: '#dcfce7',
    icon: <CheckCircle2 className="w-8 h-8" />,
  },
  {
    level: 1,
    name: 'Caution',
    description: 'Monitor conditions - potential risk',
    color: '#eab308',
    bgColor: '#fef3c7',
    icon: <AlertTriangle className="w-8 h-8" />,
  },
  {
    level: 2,
    name: 'Warning',
    description: 'Significant flood risk - prepare response',
    color: '#f97316',
    bgColor: '#fed7aa',
    icon: <AlertTriangle className="w-8 h-8" />,
  },
  {
    level: 3,
    name: 'Emergency',
    description: 'Critical flood threat - activate emergency protocols',
    color: '#dc2626',
    bgColor: '#fecaca',
    icon: <AlertCircle className="w-8 h-8" />,
  },
]

interface AlertCommandCenterProps {
  currentLevel?: number
  onSimulateAlert?: (level: number) => void
}

export function AlertCommandCenter({
  currentLevel = 0,
  onSimulateAlert,
}: AlertCommandCenterProps) {
  const [displayLevel, setDisplayLevel] = useState(currentLevel)
  const [isBlinking, setIsBlinking] = useState(false)

  useEffect(() => {
    setDisplayLevel(currentLevel)
    setIsBlinking(currentLevel >= 2)
  }, [currentLevel])

  const current = alertLevels[displayLevel]

  return (
    <div className="w-full space-y-6">
      {/* Emergency Alert Banner */}
      {displayLevel >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="relative overflow-hidden rounded-lg"
        >
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="absolute inset-0 bg-red-600"
          />
          <div
            className="relative px-6 py-4 border border-red-500 rounded-lg"
            style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)' }}
          >
            <div className="flex items-center gap-4">
              <AlertCircle className="w-8 h-8 text-red-600 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-red-600 font-bold text-lg">FLOOD EMERGENCY ALERT</p>
                <p className="text-red-500/80 text-sm">Critical flood risk detected. Activate emergency protocols immediately.</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Alert Status Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {alertLevels.map((level) => (
          <motion.button
            key={level.level}
            onClick={() => onSimulateAlert?.(level.level)}
            className={`p-4 rounded-lg border-2 transition-all ${
              displayLevel === level.level
                ? 'border-white bg-white/10'
                : 'border-white/10 hover:border-white/30 hover:bg-white/5'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex flex-col items-center gap-2">
              <div style={{ color: level.color }}>{level.icon}</div>
              <p className="text-white font-semibold text-sm">{level.name}</p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Main Alert Display */}
      <motion.div
        key={displayLevel}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white/5 border border-white/10 rounded-lg p-8"
        style={
          isBlinking
            ? {
              borderColor: current.color,
              boxShadow: `0 0 20px ${current.color}20`,
            }
            : {}
        }
      >
        <AnimatePresence mode="wait">
          {isBlinking && (
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
              className="absolute inset-0 rounded-lg pointer-events-none"
              style={{
                border: `2px solid ${current.color}`,
                boxShadow: `inset 0 0 20px ${current.color}30`,
              }}
            />
          )}
        </AnimatePresence>

        <div className="flex items-start gap-4 mb-6">
          <div style={{ color: current.color }} className="flex-shrink-0">
            {current.icon}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-2">{current.name}</h2>
            <p className="text-white/70">{current.description}</p>
          </div>
        </div>

        {/* Alert Details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-white/60 text-sm mb-1">Risk Percentage</p>
            <p className="text-2xl font-bold text-white">{displayLevel * 30}%</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-white/60 text-sm mb-1">Affected Regions</p>
            <p className="text-2xl font-bold text-white">{displayLevel > 0 ? displayLevel + 2 : 0}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Alert Level Progression</span>
            <span className="text-white font-semibold">{displayLevel}/3</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(displayLevel / 3) * 100}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-aqua to-red-600"
            />
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white/5 rounded-lg p-4">
          <p className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Recommended Actions
          </p>
          <ul className="space-y-2 text-sm text-white/70">
            {displayLevel === 0 && (
              <>
                <li>✓ Continue regular monitoring</li>
                <li>✓ Maintain standby resources</li>
                <li>✓ Update weather forecasts</li>
              </>
            )}
            {displayLevel === 1 && (
              <>
                <li>✓ Increase monitoring frequency</li>
                <li>✓ Brief emergency teams</li>
                <li>✓ Prepare evacuation routes</li>
              </>
            )}
            {displayLevel === 2 && (
              <>
                <li>✓ Activate response teams</li>
                <li>✓ Issue public warnings</li>
                <li>✓ Prepare shelters and supplies</li>
              </>
            )}
            {displayLevel === 3 && (
              <>
                <li>✓ INITIATE EMERGENCY PROTOCOLS</li>
                <li>✓ EVACUATE HIGH-RISK AREAS</li>
                <li>✓ DEPLOY ALL AVAILABLE RESOURCES</li>
              </>
            )}
          </ul>
        </div>
      </motion.div>

      {/* Control Buttons */}
      <div className="flex gap-4">
        <Button
          onClick={() => onSimulateAlert?.(0)}
          variant="outline"
          className="flex-1"
        >
          Reset to Safe
        </Button>
        <Button
          onClick={() => onSimulateAlert?.(3)}
          variant="destructive"
          className="flex-1"
        >
          Simulate Emergency
        </Button>
      </div>
    </div>
  )
}
