# API Integration Guide

This document explains how to integrate the frontend with the FastAPI backend for the Runoff Forecasting system.

## Backend Requirements

The backend must be a FastAPI application running on `http://localhost:8000` (configurable via `NEXT_PUBLIC_API_URL`).

## API Endpoints

### 1. Health Check

**Endpoint**: `GET /health`

**Purpose**: Verify backend is operational and get server status

**Response**:
```json
{
  "status": "ok",
  "timestamp": "2025-02-26T12:00:00Z",
  "uptime": 3600
}
```

**Usage in Frontend**:
```typescript
const response = await api.getHealth();
```

**Displayed in**: API Status page, Sidebar status indicator

---

### 2. Auto-Train Models

**Endpoint**: `POST /train/auto`

**Purpose**: Automatically train and tune Random Forest and XGBoost models

**Request Body**:
```json
{
  "train_end_year": 2000,
  "test_start_year": 2006,
  "search_type": "randomized",
  "n_iter": 20,
  "cv_splits": 3,
  "n_jobs": -1
}
```

**Parameters**:
- `train_end_year` (int): Year to end training data split
- `test_start_year` (int): Year to start test data split
- `search_type` (string): "grid" or "randomized" search
- `n_iter` (int): Number of iterations for randomized search
- `cv_splits` (int, optional): Cross-validation splits (default: 3)
- `n_jobs` (int, optional): Number of parallel jobs (default: -1)

**Response**:
```json
{
  "best_model": {
    "model_name": "xgboost",
    "rmse": 2.5431,
    "mae": 1.8234,
    "r2": 0.8932,
    "nse": 0.8821,
    "cv_score_rmse": 2.6112,
    "best_params": {
      "n_estimators": 600,
      "learning_rate": 0.05,
      "max_depth": 7,
      "subsample": 0.85
    }
  },
  "all_models": [
    { /* best model */ },
    { /* second model */ }
  ],
  "artifact_path": "models/best_xgboost.json",
  "registry_path": "model_registry.json"
}
```

**Usage in Frontend**:
```typescript
const result = await api.trainModels({
  train_end_year: 2000,
  test_start_year: 2006,
  search_type: "randomized",
  n_iter: 20
});
```

**Displayed in**: Training page

---

### 3. Generate Prediction

**Endpoint**: `POST /predict`

**Purpose**: Generate a runoff prediction based on environmental features

**Request Body**:
```json
{
  "rainfall": 10.5,
  "temperature": 25.3,
  "humidity": 65.0,
  "previous_runoff": 5.2
}
```

**Parameters**:
- `rainfall` (float): Rainfall in mm
- `temperature` (float): Temperature in °C
- `humidity` (float): Humidity percentage (0-100)
- `previous_runoff` (float): Previous runoff value in mm

**Response**:
```json
{
  "predicted_runoff": 12.3456,
  "confidence": 0.92,
  "timestamp": "2025-02-26T12:00:00Z"
}
```

**Usage in Frontend**:
```typescript
const prediction = await api.predict({
  rainfall: 10.5,
  temperature: 25.3,
  humidity: 65,
  previous_runoff: 5.2
});
```

**Displayed in**: Prediction page, prediction history

---

### 4. Get Latest Metrics

**Endpoint**: `GET /metrics/latest`

**Purpose**: Retrieve the latest trained model metrics

**Response**:
```json
{
  "best_model": {
    "model_name": "xgboost",
    "rmse": 2.5431,
    "mae": 1.8234,
    "r2": 0.8932,
    "nse": 0.8821,
    "cv_score_rmse": 2.6112,
    "best_params": { /* params */ }
  },
  "all_models": [ /* model array */ ],
  "artifact_path": "models/best_xgboost.json",
  "registry_path": "model_registry.json"
}
```

**Usage in Frontend**:
```typescript
const metrics = await api.getLatestMetrics();
```

**Displayed in**: Dashboard page (loaded on mount and every 60 seconds)

---

## API Client Configuration

The API client is configured in `lib/api.ts`:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### Configuration via Environment Variables

Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://your-backend-url:8000
```

### Error Handling

All API errors are caught and formatted as `ApiError`:
```typescript
interface ApiError {
  message: string;
  status: number;
}
```

Errors are logged and displayed via toast notifications.

---

## Setting Up the FastAPI Backend

Here's a minimal FastAPI setup that implements these endpoints:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
from datetime import datetime
import time

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TrainRequest(BaseModel):
    train_end_year: int
    test_start_year: int
    search_type: str
    n_iter: int

class PredictRequest(BaseModel):
    rainfall: float
    temperature: float
    humidity: float
    previous_runoff: float

@app.get("/health")
async def health():
    return {
        "status": "ok",
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "uptime": int(time.time())
    }

@app.post("/train/auto")
async def train_models(request: TrainRequest):
    # Your training logic here
    # Import model_training_backend functions
    from model_training_backend import auto_train_best_model
    
    # Load your data
    df = pd.read_csv("data.csv")
    
    result = auto_train_best_model(
        df=df,
        feature_cols=['Rainfall', 'Temperature', 'Humidity', 'Previous_Runoff'],
        train_end_year=request.train_end_year,
        test_start_year=request.test_start_year,
        search_type=request.search_type,
        n_iter=request.n_iter
    )
    
    return result

@app.post("/predict")
async def predict(request: PredictRequest):
    # Your prediction logic here
    # Load best model and generate prediction
    
    return {
        "predicted_runoff": 12.3456,
        "confidence": 0.92,
        "timestamp": datetime.utcnow().isoformat() + "Z"
    }

@app.get("/metrics/latest")
async def get_latest_metrics():
    # Load from model_registry.json
    with open("model_registry.json") as f:
        registry = json.load(f)
    
    return {
        "best_model": registry["best_model"],
        "all_models": registry["model_comparison_rmse"],
        "artifact_path": registry["best_model"]["artifact_path"],
        "registry_path": "model_registry.json"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

---

## Testing the Integration

### Manual Testing with curl

```bash
# Test health
curl http://localhost:8000/health

# Test prediction
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "rainfall": 10.5,
    "temperature": 25.3,
    "humidity": 65,
    "previous_runoff": 5.2
  }'
```

### Frontend Testing

1. Start the backend on `http://localhost:8000`
2. Start the frontend: `npm run dev`
3. Navigate to `http://localhost:3000/api-status`
4. Verify API connection shows "Healthy"

---

## Troubleshooting

### Connection Refused

**Problem**: "Failed to connect to API"

**Solutions**:
1. Check backend is running: `curl http://localhost:8000/health`
2. Verify `NEXT_PUBLIC_API_URL` in `.env.local`
3. Check CORS is enabled on backend
4. Verify firewall settings

### CORS Errors

**Problem**: "Access to XMLHttpRequest has been blocked by CORS policy"

**Solution**: Enable CORS on FastAPI backend:
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Timeout Errors

**Problem**: "Request timeout"

**Solutions**:
1. Increase timeout in `lib/api.ts`: `timeout: 60000` for longer operations
2. Check backend performance
3. Verify network connectivity

---

## Type Definitions

All API types are defined in `lib/types.ts`:

```typescript
export interface TrainRequest {
  train_end_year: number;
  test_start_year: number;
  search_type: 'grid' | 'randomized';
  n_iter: number;
}

export interface ModelMetrics {
  rmse: number;
  mae: number;
  r2: number;
  nse: number;
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
```

---

## Performance Considerations

- **Training requests**: Can take 5-30+ minutes depending on data size and search type
- **Prediction requests**: Should complete in <1 second
- **Metrics requests**: Should complete in <100ms
- **Health checks**: Should complete in <50ms

Adjust timeouts in `lib/api.ts` accordingly for your backend performance.

---

## Data Format Notes

### Runoff Values
- Units: Millimeters (mm)
- Typical range: 0-50mm
- Format: Float with 2-4 decimal places

### Metrics Interpretation
- **RMSE**: Root Mean Square Error (lower is better)
- **MAE**: Mean Absolute Error (lower is better)
- **R²**: Coefficient of determination (0-1, higher is better)
- **NSE**: Nash-Sutcliffe Efficiency (-∞ to 1, higher is better)
- **CV Score**: Cross-validation RMSE (lower is better)
