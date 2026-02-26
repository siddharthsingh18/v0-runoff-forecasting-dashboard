'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart3, Brain, Database, Zap, Settings, Home, Map, AlertTriangle, Droplets, CheckSquare, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigationItems = [
  {
    icon: Home,
    label: 'Dashboard',
    href: '/dashboard',
  },
  {
    icon: Map,
    label: 'Flood Map',
    href: '/map',
  },
  {
    icon: AlertTriangle,
    label: 'Alerts',
    href: '/alerts',
  },
  {
    icon: Droplets,
    label: 'Impact',
    href: '/impact',
  },
  {
    icon: BarChart3,
    label: 'Analytics',
    href: '/analytics',
  },
  {
    icon: Brain,
    label: 'Predictions',
    href: '/predict',
  },
  {
    icon: CheckSquare,
    label: 'Solutions',
    href: '/solutions',
  },
  {
    icon: Users,
    label: 'Reports',
    href: '/citizen-report',
  },
  {
    icon: Database,
    label: 'Models',
    href: '/models',
  },
  {
    icon: Settings,
    label: 'Settings',
    href: '/settings',
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="glass-dark fixed left-0 top-0 h-screen w-64 border-r border-white/10 pt-24 overflow-y-auto">
      <div className="space-y-1 px-4 py-6">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                isActive
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </aside>
  )
}
