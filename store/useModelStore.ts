import { create } from 'zustand'
import { Model, TrainingStatus } from '@/lib/types'

interface ModelStore {
  isAuthenticated: boolean
  token: string | null
  bestModel: Model | null
  allModels: Model[]
  trainingStatus: TrainingStatus
  predictions: number[]
  selectedModel: Model | null

  // Auth actions
  setAuth: (token: string) => void
  logout: () => void

  // Model actions
  setBestModel: (model: Model) => void
  setAllModels: (models: Model[]) => void
  setSelectedModel: (model: Model | null) => void

  // Training actions
  setTrainingStatus: (status: TrainingStatus) => void
  addPrediction: (prediction: number) => void
  clearPredictions: () => void
}

export const useModelStore = create<ModelStore>((set) => ({
  isAuthenticated: false,
  token: null,
  bestModel: null,
  allModels: [],
  trainingStatus: { status: 'pending', progress: 0, message: 'Ready' },
  predictions: [],
  selectedModel: null,

  setAuth: (token: string) => set({ isAuthenticated: true, token }),
  logout: () => set({ isAuthenticated: false, token: null }),

  setBestModel: (model: Model) => set({ bestModel: model }),
  setAllModels: (models: Model[]) => set({ allModels: models }),
  setSelectedModel: (model: Model | null) => set({ selectedModel: model }),

  setTrainingStatus: (status: TrainingStatus) =>
    set({ trainingStatus: status }),
  addPrediction: (prediction: number) =>
    set((state) => ({ predictions: [...state.predictions, prediction] })),
  clearPredictions: () => set({ predictions: [] }),
}))
