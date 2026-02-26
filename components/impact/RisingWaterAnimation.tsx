'use client'

import { motion } from 'framer-motion'

interface RisingWaterAnimationProps {
  waterLevel: number // 0-100
  height?: string
}

export function RisingWaterAnimation({ waterLevel = 45, height = 'h-64' }: RisingWaterAnimationProps) {
  return (
    <div className={`${height} w-full relative bg-gradient-to-b from-sky-950 to-slate-900 rounded-lg overflow-hidden border border-white/10`}>
      {/* Background buildings */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
        {/* House 1 */}
        <rect x="20" y="60" width="80" height="100" fill="#94a3b8" opacity="0.8" />
        <rect x="30" y="40" width="60" height="20" fill="#dc2626" opacity="0.9" />
        <rect x="40" y="70" width="15" height="20" fill="#1e293b" />
        <rect x="65" y="70" width="15" height="20" fill="#1e293b" />

        {/* House 2 */}
        <rect x="130" y="50" width="90" height="110" fill="#cbd5e1" opacity="0.8" />
        <polygon points="130,50 175,20 220,50" fill="#ca8a04" />
        <rect x="150" y="75" width="18" height="20" fill="#1e293b" />
        <rect x="185" y="75" width="18" height="20" fill="#1e293b" />

        {/* House 3 */}
        <rect x="250" y="70" width="70" height="90" fill="#a0aec0" opacity="0.8" />
        <rect x="260" y="55" width="50" height="15" fill="#b91c1c" />
        <rect x="270" y="85" width="12" height="15" fill="#1e293b" />
        <rect x="290" y="85" width="12" height="15" fill="#1e293b" />

        {/* Water wave lines */}
        <defs>
          <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0369a1" stopOpacity="0.6" />
          </linearGradient>
        </defs>
      </svg>

      {/* Animated Water */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-x-0 bg-gradient-to-b from-cyan-500/40 to-blue-600/30"
        style={{
          bottom: 0,
          height: `${waterLevel}%`,
          boxShadow: '0 -20px 40px rgba(6, 182, 212, 0.2)',
        }}
      />

      {/* Wave SVG */}
      <svg
        className="absolute inset-x-0 w-full"
        style={{ bottom: `${waterLevel}%`, height: '40px' }}
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="shadow">
            <feDropShadow dx="0" dy="-2" stdDeviation="3" floodOpacity="0.4" />
          </filter>
        </defs>
        <motion.path
          d="M0,50 Q300,0 600,50 T1200,50 L1200,100 L0,100 Z"
          fill="rgba(6, 182, 212, 0.6)"
          filter="url(#shadow)"
          animate={{ d: ['M0,50 Q300,0 600,50 T1200,50 L1200,100 L0,100 Z', 'M0,50 Q300,20 600,30 T1200,50 L1200,100 L0,100 Z', 'M0,50 Q300,0 600,50 T1200,50 L1200,100 L0,100 Z'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>

      {/* Water Level Indicator */}
      <div className="absolute right-4 top-4 bg-black/50 px-3 py-2 rounded text-white text-sm font-semibold">
        {waterLevel}%
      </div>

      {/* Animated particles/droplets */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-cyan-300 rounded-full"
          animate={{
            y: [300, -50],
            x: [Math.sin(i) * 100, Math.sin(i) * 100 + 50],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.5,
            ease: 'easeIn',
          }}
          style={{
            left: `${30 + i * 35}%`,
            bottom: 0,
          }}
        />
      ))}
    </div>
  )
}
