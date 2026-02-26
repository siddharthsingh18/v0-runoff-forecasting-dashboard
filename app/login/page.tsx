'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useModelStore } from '@/store/useModelStore'
import { LoginForm } from '@/components/forms/LoginForm'
import { motion } from 'framer-motion'

export default function LoginPage() {
  const router = useRouter()
  const isAuthenticated = useModelStore((state) => state.isAuthenticated)

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, -100, 0],
            y: [0, -100, 100, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 100, 0],
            y: [0, 100, -100, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -bottom-40 -right-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              RunoffAI
            </span>
          </div>
          <p className="text-white/60 text-sm">Advanced 3-Day Runoff Forecasting</p>
        </motion.div>

        <LoginForm />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-white/40 text-xs mt-8"
        >
          © 2024 RunoffAI. All rights reserved.
        </motion.p>
      </div>
    </div>
  )
}
