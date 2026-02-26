'use client'

import { motion } from 'framer-motion'
import { Button, ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface GlowButtonProps extends ButtonProps {
  glowIntensity?: 'low' | 'medium' | 'high'
  animated?: boolean
}

export function GlowButton({
  glowIntensity = 'medium',
  animated = true,
  className,
  children,
  ...props
}: GlowButtonProps) {
  const glowConfig = {
    low: 'shadow-lg shadow-cyan-500/30',
    medium: 'shadow-lg shadow-cyan-500/50',
    high: 'shadow-lg shadow-cyan-500/70',
  }

  const button = (
    <Button
      className={cn(
        'relative overflow-hidden bg-gradient-to-r from-cyan-500 to-purple-600',
        'hover:from-cyan-400 hover:to-purple-500',
        'text-white font-semibold',
        glowConfig[glowIntensity],
        'transition-all duration-300',
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 hover:opacity-20 transition-opacity duration-300" />
    </Button>
  )

  if (!animated) return button

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {button}
    </motion.div>
  )
}
