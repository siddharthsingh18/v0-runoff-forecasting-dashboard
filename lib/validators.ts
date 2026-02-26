import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export type LoginFormData = z.infer<typeof loginSchema>

export const trainingConfigSchema = z.object({
  search_type: z.enum(['random', 'grid']),
  cv_splits: z.number().min(2).max(10),
  n_iter: z.number().min(1).max(1000),
  train_test_split_year: z.number().min(1990).max(2024),
  auto_tuning: z.boolean(),
})

export type TrainingConfigData = z.infer<typeof trainingConfigSchema>

export const predictionSchema = z.object({
  rainfall: z.number().min(0),
  temperature: z.number().min(-50).max(60),
  humidity: z.number().min(0).max(100),
  previous_runoff: z.number().min(0),
})

export type PredictionData = z.infer<typeof predictionSchema>

export const datasetUploadSchema = z.object({
  file: z.instanceof(File).refine(
    (file) => file.size <= 50 * 1024 * 1024,
    'File size must be less than 50MB'
  ),
})

export type DatasetUploadData = z.infer<typeof datasetUploadSchema>
