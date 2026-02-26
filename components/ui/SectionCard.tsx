'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionCardProps {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
  delay?: number
}

export function SectionCard({
  title,
  description,
  children,
  className,
  delay = 0,
}: SectionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        'glass rounded-lg border border-white/10 p-6',
        'hover:border-cyan-500/30 transition-colors duration-300',
        className
      )}
    >
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white mb-1">{title}</h2>
        {description && (
          <p className="text-sm text-white/60">{description}</p>
        )}
      </div>
      {children}
    </motion.div>
  )
}
