import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  fullScreen?: boolean
}

export function LoadingSpinner({
  size = 'md',
  className,
  fullScreen = false,
}: LoadingSpinnerProps) {
  const sizeConfig = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4',
  }

  const container = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-black/50'
    : 'flex items-center justify-center'

  return (
    <div className={container}>
      <div
        className={cn(
          'rounded-full border-white/20',
          'border-t-cyan-400',
          'animate-spin',
          sizeConfig[size],
          className
        )}
      />
    </div>
  )
}
