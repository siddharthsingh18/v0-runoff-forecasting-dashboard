export interface ModelMetrics {
  rmse: number;
  mae: number;
  r2: number;
  nse: number;
}

export interface ModelComparison {
  model_name: string;
  rmse: number;
  mae: number;
  r2: number;
  nse: number;
  cv_score_rmse: number;
  best_params: Record<string, unknown>;
}

export interface TrainRequest {
  train_end_year: number;
  test_start_year: number;
  search_type: 'grid' | 'randomized';
  n_iter: number;
  cv_splits?: number;
  n_jobs?: number;
}

export interface TrainResponse {
  best_model: ModelComparison;
  all_models: ModelComparison[];
  artifact_path: string;
  registry_path: string;
}

export interface PredictRequest {
  rainfall: number;
  temperature: number;
  humidity: number;
  previous_runoff: number;
}

export interface PredictionResult {
  predicted_runoff: number;
  confidence: number;
  timestamp: string;
}

export interface HealthResponse {
  status: string;
  timestamp: string;
  uptime?: number;
}

export interface ApiError {
  message: string;
  status: number;
}
