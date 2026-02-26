import { create } from 'zustand'
import { AlertEvent, EnvironmentalImpact } from '@/lib/types'

interface ModelStore {
  isAuthenticated: boolean
  token: string | null
  userRole: 'admin' | 'researcher' | 'public'
  darkMode: boolean
  
  // Alert system
  activeAlerts: AlertEvent[]
  alertHistory: AlertEvent[]
  currentRiskLevel: 'low' | 'medium' | 'high' | 'critical'
  currentRiskPercentage: number
  
  // Environmental data
  environmentalImpact: EnvironmentalImpact | null
  
  // Auth actions
  setAuth: (token: string, role?: string) => void
  logout: () => void
  
  // Alert actions
  addAlert: (alert: AlertEvent) => void
  dismissAlert: (alertId: string) => void
  setRiskLevel: (level: 'low' | 'medium' | 'high' | 'critical', percentage: number) => void
  
  // Theme actions
  toggleDarkMode: () => void
  
  // Data actions
  setEnvironmentalImpact: (impact: EnvironmentalImpact) => void
}

export const useModelStore = create<ModelStore>((set) => ({
  isAuthenticated: false,
  token: null,
  userRole: 'public',
  darkMode: true,
  
  activeAlerts: [],
  alertHistory: [],
  currentRiskLevel: 'low',
  currentRiskPercentage: 0,
  
  environmentalImpact: null,

  setAuth: (token: string, role = 'public') => set({ 
    isAuthenticated: true, 
    token,
    userRole: role as 'admin' | 'researcher' | 'public'
  }),
  logout: () => set({ 
    isAuthenticated: false, 
    token: null,
    userRole: 'public'
  }),

  addAlert: (alert: AlertEvent) =>
    set((state) => ({
      activeAlerts: [...state.activeAlerts, alert],
      alertHistory: [...state.alertHistory, alert],
    })),
  dismissAlert: (alertId: string) =>
    set((state) => ({
      activeAlerts: state.activeAlerts.filter((a) => a.id !== alertId),
    })),
  setRiskLevel: (level, percentage) =>
    set({ currentRiskLevel: level, currentRiskPercentage: percentage }),
  
  toggleDarkMode: () =>
    set((state) => ({ darkMode: !state.darkMode })),
  
  setEnvironmentalImpact: (impact: EnvironmentalImpact) =>
    set({ environmentalImpact: impact }),
}))
