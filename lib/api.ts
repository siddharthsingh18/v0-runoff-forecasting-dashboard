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
   * Authenticate user
   */
  async login(email: string, password: string) {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  },

  /**
   * Check health status of the backend
   */
  async getHealth(): Promise<HealthResponse> {
    const response = await apiClient.get<HealthResponse>('/health');
    return response.data;
  },

  /**
   * Train models with auto-tuning
   */
  async trainModels(params: TrainRequest): Promise<TrainResponse> {
    const response = await apiClient.post<TrainResponse>('/train/auto', params);
    return response.data;
  },

  /**
   * Get prediction for given features
   */
  async predict(params: PredictRequest): Promise<PredictionResult> {
    const response = await apiClient.post<PredictionResult>('/predict', params);
    return response.data;
  },

  /**
   * Get latest metrics
   */
  async getLatestMetrics(): Promise<TrainResponse> {
    const response = await apiClient.get<TrainResponse>('/metrics/latest');
    return response.data;
  },

  /**
   * Get model registry
   */
  async getModelRegistry() {
    const response = await apiClient.get('/models/registry');
    return response.data;
  },

  /**
   * Upload dataset
   */
  async uploadDataset(formData: FormData) {
    const response = await apiClient.post('/dataset/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};

export default api;
