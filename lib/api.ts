import axios, { AxiosInstance, AxiosError } from 'axios';
import {
  TrainRequest,
  TrainResponse,
  PredictRequest,
  PredictionResult,
  HealthResponse,
  ApiError,
} from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const apiError: ApiError = {
      message: error.message || 'An error occurred',
      status: error.response?.status || 500,
    };
    return Promise.reject(apiError);
  }
);

export const api = {
  /**
   * Authenticate user (mock auth - no backend required)
   */
  async login(email: string, password: string) {
    // Mock authentication - works without backend
    // Valid credentials: any email with password "password123"
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    if (password !== 'password123') {
      throw new Error('Invalid email or password');
    }

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Return mock response
    return {
      token: `mock-jwt-token-${Date.now()}`,
      user: {
        id: 'user-123',
        email: email,
      },
    };
  },

  /**
   * Check health status of the backend (mock)
   */
  async getHealth(): Promise<HealthResponse> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return { status: 'healthy', timestamp: new Date().toISOString() };
  },

  /**
   * Train models with auto-tuning (mock)
   */
  async trainModels(params: TrainRequest): Promise<TrainResponse> {
    // Simulate training with network delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return {
      best_model: {
        model_name: 'random_forest',
        rmse: 12.45,
        mae: 8.92,
        r2: 0.8756,
        nse: 0.8712,
        cv_score_rmse: 13.21,
        best_params: { n_estimators: 100, max_depth: 15, min_samples_split: 5 },
      },
      all_models: [
        {
          model_name: 'random_forest',
          rmse: 12.45,
          mae: 8.92,
          r2: 0.8756,
          nse: 0.8712,
          cv_score_rmse: 13.21,
          best_params: { n_estimators: 100, max_depth: 15 },
        },
        {
          model_name: 'xgboost',
          rmse: 13.12,
          mae: 9.45,
          r2: 0.8621,
          nse: 0.8571,
          cv_score_rmse: 13.98,
          best_params: { max_depth: 7, learning_rate: 0.1 },
        },
        {
          model_name: 'gradient_boosting',
          rmse: 14.23,
          mae: 10.12,
          r2: 0.8345,
          nse: 0.8289,
          cv_score_rmse: 15.01,
          best_params: { n_estimators: 200, learning_rate: 0.05 },
        },
      ],
      artifact_path: '/models/best_model_v1.pkl',
      training_time_seconds: 45.2,
    };
  },

  /**
   * Get prediction for given features (mock)
   */
  async predict(params: PredictRequest): Promise<PredictionResult> {
    // Simulate prediction with network delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    const baseValue = params.rainfall * 0.65 + params.temperature * 0.3 + params.previous_runoff * 0.05;
    const predicted = Math.max(0, baseValue + (Math.random() - 0.5) * 5);

    return {
      predicted_runoff: parseFloat(predicted.toFixed(2)),
      confidence: 0.85 + Math.random() * 0.1,
      timestamp: new Date().toISOString(),
    };
  },

  /**
   * Get latest metrics (mock)
   */
  async getLatestMetrics(): Promise<TrainResponse> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
      best_model: {
        model_name: 'random_forest',
        rmse: 12.45,
        mae: 8.92,
        r2: 0.8756,
        nse: 0.8712,
        cv_score_rmse: 13.21,
        best_params: { n_estimators: 100, max_depth: 15, min_samples_split: 5 },
      },
      all_models: [
        {
          model_name: 'random_forest',
          rmse: 12.45,
          mae: 8.92,
          r2: 0.8756,
          nse: 0.8712,
          cv_score_rmse: 13.21,
          best_params: { n_estimators: 100, max_depth: 15 },
        },
        {
          model_name: 'xgboost',
          rmse: 13.12,
          mae: 9.45,
          r2: 0.8621,
          nse: 0.8571,
          cv_score_rmse: 13.98,
          best_params: { max_depth: 7, learning_rate: 0.1 },
        },
        {
          model_name: 'gradient_boosting',
          rmse: 14.23,
          mae: 10.12,
          r2: 0.8345,
          nse: 0.8289,
          cv_score_rmse: 15.01,
          best_params: { n_estimators: 200, learning_rate: 0.05 },
        },
      ],
      artifact_path: '/models/best_model_v1.pkl',
      training_time_seconds: 45.2,
    };
  },

  /**
   * Get model registry (mock)
   */
  async getModelRegistry() {
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
      models: [
        {
          id: 'model-1',
          name: 'Random Forest v1.0',
          type: 'random_forest',
          created_at: '2025-02-20T10:30:00Z',
          metrics: { rmse: 12.45, r2: 0.8756, mae: 8.92 },
          status: 'active',
        },
        {
          id: 'model-2',
          name: 'XGBoost v1.0',
          type: 'xgboost',
          created_at: '2025-02-19T14:20:00Z',
          metrics: { rmse: 13.12, r2: 0.8621, mae: 9.45 },
          status: 'active',
        },
      ],
    };
  },

  /**
   * Upload dataset (mock)
   */
  async uploadDataset(formData: FormData) {
    // Simulate file upload with network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return {
      success: true,
      filename: formData.get('file') || 'dataset.csv',
      rows: 1256,
      columns: 8,
    };
  },

  // Flood Monitoring Endpoints

  /**
   * Get real-time sensor data (mock)
   */
  async getRealtimeMonitoring() {
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
      current_runoff: 45.2,
      rainfall_24h: 82.5,
      drainage_rate: 35,
      risk_percentage: 68,
      alert_count: 2,
      last_update: new Date().toISOString(),
      sensors: [
        {
          id: 'sensor-1',
          location: 'Sector 12 - Northern Basin',
          latitude: 28.6139,
          longitude: 77.2090,
          rainfall: 65.3,
          drainage: 28,
          runoff_rate: 52.1,
          risk_score: 82,
          timestamp: new Date().toISOString(),
          water_level: 125,
          soil_saturation: 92,
          temperature: 28,
        },
        {
          id: 'sensor-2',
          location: 'Sector 8 - Central Basin',
          latitude: 28.6200,
          longitude: 77.2150,
          rainfall: 48.2,
          drainage: 45,
          runoff_rate: 35.2,
          risk_score: 56,
          timestamp: new Date().toISOString(),
          water_level: 98,
          soil_saturation: 68,
          temperature: 26,
        },
        {
          id: 'sensor-3',
          location: 'Sector 15 - Southern Basin',
          latitude: 28.6000,
          longitude: 77.2100,
          rainfall: 32.1,
          drainage: 62,
          runoff_rate: 15.3,
          risk_score: 28,
          timestamp: new Date().toISOString(),
          water_level: 65,
          soil_saturation: 42,
          temperature: 27,
        },
      ],
    };
  },

  /**
   * Get flood predictions (mock)
   */
  async getFloodPrediction() {
    await new Promise((resolve) => setTimeout(resolve, 400));

    return {
      probability_6h: 0.72,
      probability_24h: 0.85,
      probability_7d: 0.65,
      severity_level: 'high',
      timestamp: new Date().toISOString(),
      trend: 'increasing',
      forecast_data: [
        { time: '6h', probability: 72, severity: 'high' },
        { time: '12h', probability: 78, severity: 'high' },
        { time: '24h', probability: 85, severity: 'critical' },
        { time: '48h', probability: 72, severity: 'high' },
        { time: '7d', probability: 65, severity: 'medium' },
      ],
    };
  },

  /**
   * Get environmental impact (mock)
   */
  async getEnvironmentalImpact() {
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
      soil_erosion: 72,
      water_pollution: 58,
      crop_destruction_risk: 85,
      infrastructure_damage_risk: 64,
      human_life_risk: 'High',
      timestamp: new Date().toISOString(),
      trends: {
        soil_erosion_trend: 'up',
        pollution_trend: 'up',
        crop_risk_trend: 'up',
        infrastructure_trend: 'stable',
      },
    };
  },

  /**
   * Get available solutions (mock)
   */
  async getSolutions() {
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
      solutions: [
        {
          id: 'sol-1',
          title: 'Smart Drainage System',
          category: 'structural',
          description: 'Automated gates and pumps to manage water flow',
          effectiveness: 88,
          cost: 'High',
          implementation_time: '6-12 months',
          impact_description: 'Reduces flooding by 75%',
        },
        {
          id: 'sol-2',
          title: 'Green Corridors',
          category: 'nature_based',
          description: 'Tree planting and wetland restoration',
          effectiveness: 65,
          cost: 'Medium',
          implementation_time: '12-24 months',
          impact_description: 'Improves water absorption',
        },
        {
          id: 'sol-3',
          title: 'AI Prediction System',
          category: 'technology',
          description: 'Real-time monitoring and forecasting',
          effectiveness: 92,
          cost: 'Medium',
          implementation_time: '2-4 months',
          impact_description: 'Enables proactive response',
        },
        {
          id: 'sol-4',
          title: 'Rainwater Harvesting',
          category: 'structural',
          description: 'Capture and store excess rainfall',
          effectiveness: 60,
          cost: 'Medium',
          implementation_time: '3-6 months',
          impact_description: 'Reduces runoff and saves water',
        },
      ],
    };
  },

  /**
   * Get audit logs (mock)
   */
  async getAuditLogs() {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const now = new Date();
    return {
      logs: [
        {
          id: '1',
          timestamp: new Date(now.getTime() - 5 * 60000).toISOString(),
          user_email: 'admin@flood.gov',
          action: 'Viewed dashboard',
          resource: 'dashboard',
          details: 'Accessed real-time monitoring',
          status: 'success',
        },
        {
          id: '2',
          timestamp: new Date(now.getTime() - 15 * 60000).toISOString(),
          user_email: 'researcher@flood.gov',
          action: 'Exported report',
          resource: 'reports',
          details: 'Downloaded weekly summary',
          status: 'success',
        },
        {
          id: '3',
          timestamp: new Date(now.getTime() - 30 * 60000).toISOString(),
          user_email: 'admin@flood.gov',
          action: 'Updated alert threshold',
          resource: 'settings',
          details: 'Changed critical level to 75%',
          status: 'success',
        },
      ],
    };
  },
};

export default api;
