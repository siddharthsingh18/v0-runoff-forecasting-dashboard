'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useModelStore } from '@/store/useModelStore'
import { Button } from '@/components/ui/button'
import { LogOut, Settings } from 'lucide-react'

export function Navbar() {
  const router = useRouter()
  const { isAuthenticated, logout } = useModelStore()

  const handleLogout = () => {
    logout()
    localStorage.removeItem('auth_token')
    router.push('/login')
  }

  return (
    <nav className="glass sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:to-purple-500 transition-all duration-300">
            RunoffAI
          </div>
        </Link>

        <div className="flex items-center gap-6">
          {isAuthenticated && (
            <>
              <Link href="/dashboard" className="text-sm text-white/80 hover:text-cyan-400 transition-colors">
                Dashboard
              </Link>
              <Link href="/analytics" className="text-sm text-white/80 hover:text-cyan-400 transition-colors">
                Analytics
              </Link>
              <Link href="/train" className="text-sm text-white/80 hover:text-cyan-400 transition-colors">
                Train
              </Link>
              <Link href="/predict" className="text-sm text-white/80 hover:text-cyan-400 transition-colors">
                Predict
              </Link>
              <Link href="/models" className="text-sm text-white/80 hover:text-cyan-400 transition-colors">
                Models
              </Link>
            </>
          )}

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <>
                <Link href="/settings">
                  <Button variant="ghost" size="icon" className="text-white/60 hover:text-cyan-400">
                    <Settings className="w-5 h-5" />
                  </Button>
                </Link>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  size="icon"
                  className="text-white/60 hover:text-red-400"
                >
                  <LogOut className="w-5 h-5" />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
