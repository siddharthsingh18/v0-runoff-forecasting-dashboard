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

export interface MetricCardProps {
  label: string
  value: string | number
  unit?: string
  icon?: React.ReactNode
  trend?: 'up' | 'down' | 'neutral'
}

export interface DatasetStats {
  rows: number
  columns: number
  missing_values: number
  feature_count: number
}

export interface ChartDataPoint {
  date: string
  actual: number
  predicted: number
  residual?: number
}

export interface FeatureImportance {
  feature: string
  importance: number
}

export interface TrainingStatus {
  status: 'completed' | 'running' | 'failed' | 'pending'
  progress: number
  message: string
}

export interface AuthResponse {
  token: string
  user: {
    id: string
    email: string
  }
}

export interface LoginCredentials {
  email: string
  password: string
}

// Flood & Runoff Monitoring Types
export interface SensorReading {
  id: string
  location: string
  latitude: number
  longitude: number
  rainfall: number
  drainage: number
  runoff_rate: number
  risk_score: number
  timestamp: string
  water_level?: number
  soil_saturation?: number
  temperature?: number
}

export interface AlertEvent {
  id: string
  timestamp: string
  location: string
  severity: 'level1' | 'level2'
  message: string
  runoff_value: number
  risk_percentage: number
  status: 'active' | 'dismissed' | 'resolved'
  recommendations?: string[]
}

export interface EnvironmentalImpact {
  soil_erosion: number
  water_pollution: number
  crop_destruction_risk: number
  infrastructure_damage_risk: number
  human_life_risk: 'Low' | 'Medium' | 'High'
  timestamp: string
}

export interface FloodSolution {
  id: string
  title: string
  category: 'structural' | 'nature_based' | 'technology'
  description: string
  effectiveness: number
  cost: 'Low' | 'Medium' | 'High'
  implementation_time: string
  impact_description: string
  co_benefits?: string[]
}

export interface FloodPrediction {
  probability_6h: number
  probability_24h: number
  probability_7d: number
  severity_level: 'low' | 'medium' | 'high'
  timestamp: string
  trend: 'increasing' | 'decreasing' | 'stable'
}

export interface AuditLog {
  id: string
  timestamp: string
  user_email: string
  action: string
  resource: string
  details: string
  status: 'success' | 'failure'
}

export interface RealtimeData {
  current_runoff: number
  rainfall_24h: number
  drainage_rate: number
  risk_percentage: number
  alert_count: number
  last_update: string
}
