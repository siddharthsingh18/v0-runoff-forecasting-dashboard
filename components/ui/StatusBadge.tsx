import { cn } from '@/lib/utils'

interface StatusBadgeProps {
  status: 'online' | 'offline' | 'loading' | 'error'
  label?: string
  className?: string
}

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const statusConfig = {
    online: {
      bg: 'bg-green-500/20',
      border: 'border-green-500/30',
      dot: 'bg-green-400',
      text: 'text-green-400',
      label: 'Online',
    },
    offline: {
      bg: 'bg-red-500/20',
      border: 'border-red-500/30',
      dot: 'bg-red-400',
      text: 'text-red-400',
      label: 'Offline',
    },
    loading: {
      bg: 'bg-yellow-500/20',
      border: 'border-yellow-500/30',
      dot: 'bg-yellow-400 animate-pulse',
      text: 'text-yellow-400',
      label: 'Loading',
    },
    error: {
      bg: 'bg-red-500/20',
      border: 'border-red-500/30',
      dot: 'bg-red-400',
      text: 'text-red-400',
      label: 'Error',
    },
  }

  const config = statusConfig[status]

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1 rounded-full',
        config.bg,
        config.border,
        'border',
        className
      )}
    >
      <div className={cn('w-2 h-2 rounded-full', config.dot)} />
      <span className={cn('text-xs font-medium', config.text)}>
        {label || config.label}
      </span>
    </div>
  )
}
