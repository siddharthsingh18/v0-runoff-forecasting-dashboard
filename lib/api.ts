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
};

export default api;
