# Architecture Overview

Visual and structural overview of the AI Runoff Forecasting Dashboard.

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     USER BROWSER                                │
└────────────────────────┬────────────────────────────────────────┘
                         │ HTTP/HTTPS
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│              NEXT.JS 16 FRONTEND (This Project)                 │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    APP ROUTER                           │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │   │
│  │  │   Landing    │  │  Dashboard   │  │   Training   │  │   │
│  │  │   (/)        │  │  (/dashboard)│  │   (/train)   │  │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘  │   │
│  │  ┌──────────────┐  ┌──────────────┐                     │   │
│  │  │ Prediction   │  │  API Status  │                     │   │
│  │  │ (/predict)   │  │ (/api-status)│                     │   │
│  │  └──────────────┘  └──────────────┘                     │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │               SHARED COMPONENTS                         │   │
│  │  ┌────────────┐  ┌──────────────┐  ┌─────────────────┐ │   │
│  │  │  Navbar    │  │   Sidebar    │  │  MetricCard     │ │   │
│  │  │ (Navigation)│  │ (API Status) │  │ (Display)       │ │   │
│  │  └────────────┘  └──────────────┘  └─────────────────┘ │   │
│  │  ┌────────────┐  ┌──────────────┐  ┌─────────────────┐ │   │
│  │  │ModelCompar │  │PredictionChart  PredictionForm   │ │   │
│  │  │Table       │  │(Recharts)     │ (Inputs)        │ │   │
│  │  └────────────┘  └──────────────┘  └─────────────────┘ │   │
│  │  ┌────────────┐  ┌──────────────┐                     │   │
│  │  │TrainingForm│  │LoadingSpinner│                     │   │
│  │  │(Inputs)    │  │(Animation)   │                     │   │
│  │  └────────────┘  └──────────────┘                     │   │
│  │  ┌─────────────────────────────────────────────────┐  │   │
│  │  │     shadcn/ui Library (30+ components)          │  │   │
│  │  │  Button, Input, Label, Select, Dialog, etc.    │  │   │
│  │  └─────────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │               API CLIENT (lib/api.ts)                   │   │
│  │              ┌──────────────────────────┐               │   │
│  │              │   Axios Instance        │               │   │
│  │              │  - Error handling       │               │   │
│  │              │  - Request/Response     │               │   │
│  │              │  - Timeout management   │               │   │
│  │              └──────────────────────────┘               │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │           TYPE SYSTEM (lib/types.ts)                    │   │
│  │  ┌────────────┐ ┌──────────────┐ ┌────────────────────┤   │
│  │  │TrainRequest│ │TrainResponse │ │PredictRequest     │   │
│  │  └────────────┘ └──────────────┘ └────────────────────┤   │
│  │  ┌────────────┐ ┌──────────────┐ ┌────────────────────┤   │
│  │  │Prediction  │ │HealthResponse│ │ModelComparison    │   │
│  │  │Result      │ │              │ │                  │   │
│  │  └────────────┘ └──────────────┘ └────────────────────┤   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │         STYLING & ANIMATION                             │   │
│  │  ┌────────────────┐  ┌──────────────────────────────┐  │   │
│  │  │  Tailwind CSS  │  │  Framer Motion              │  │   │
│  │  │ - Dark theme   │  │  - Page transitions         │  │   │
│  │  │ - Responsive   │  │  - Component animations     │  │   │
│  │  │ - Glassmorphic │  │  - Hover effects            │  │   │
│  │  └────────────────┘  └──────────────────────────────┘  │   │
│  │  ┌────────────────────────────────────────────────────┐  │   │
│  │  │  Recharts - Data Visualization                     │  │   │
│  │  │  - Line charts for predictions                     │  │   │
│  │  │  - Responsive containers                          │  │   │
│  │  └────────────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                         │ HTTP/HTTPS
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   FASTAPI BACKEND                               │
│                (Your Python backend)                            │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                   API ENDPOINTS                         │   │
│  │  GET  /health          → Check backend status          │   │
│  │  POST /train/auto      → Auto-tune models              │   │
│  │  POST /predict         → Generate predictions          │   │
│  │  GET  /metrics/latest  → Get latest metrics            │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │            ML PIPELINE                                 │   │
│  │  ┌─────────────────────────────────────────────────┐   │   │
│  │  │  Random Forest Tuning                          │   │   │
│  │  │  └─────────────────────────────────────────────┘   │   │
│  │  ┌─────────────────────────────────────────────────┐   │   │
│  │  │  XGBoost Tuning                                │   │   │
│  │  │  └─────────────────────────────────────────────┘   │   │
│  │  ┌─────────────────────────────────────────────────┐   │   │
│  │  │  Model Comparison & Selection                  │   │   │
│  │  │  └─────────────────────────────────────────────┘   │   │
│  │  ┌─────────────────────────────────────────────────┐   │   │
│  │  │  Prediction Generation                         │   │   │
│  │  │  └─────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │            DATA & STORAGE                              │   │
│  │  ┌─────────────────────────────────────────────────┐   │   │
│  │  │  Runoff Data (CSV/Database)                   │   │   │
│  │  └─────────────────────────────────────────────────┘   │   │
│  │  ┌─────────────────────────────────────────────────┐   │   │
│  │  │  Trained Models (Artifacts)                   │   │   │
│  │  │  └─────────────────────────────────────────────┘   │   │
│  │  ┌─────────────────────────────────────────────────┐   │   │
│  │  │  Model Registry (JSON)                        │   │   │
│  │  │  └─────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📂 Directory Structure & Ownership

```
runoff-dashboard/
│
├── app/                          ← PAGE COMPONENTS (Next.js App Router)
│   ├── page.tsx                 ← Landing page /
│   ├── layout.tsx               ← Root layout (dark theme, metadata)
│   ├── globals.css              ← Global styles & animations
│   ├── dashboard/
│   │   └── page.tsx             ← Dashboard page /dashboard
│   ├── train/
│   │   └── page.tsx             ← Training page /train
│   ├── predict/
│   │   └── page.tsx             ← Prediction page /predict
│   └── api-status/
│       └── page.tsx             ← API Status page /api-status
│
├── components/                   ← REUSABLE COMPONENTS
│   ├── Navbar.tsx               ← Navigation bar (all pages)
│   ├── Sidebar.tsx              ← API status sidebar (dashboard pages)
│   ├── MetricCard.tsx           ← Metric display component
│   ├── ModelComparisonTable.tsx ← Model comparison matrix
│   ├── PredictionChart.tsx      ← Recharts visualization
│   ├── TrainingForm.tsx         ← Training configuration form
│   ├── PredictionForm.tsx       ← Prediction input form
│   ├── LoadingSpinner.tsx       ← Loading animation
│   ├── theme-provider.tsx       ← Theme setup (default)
│   └── ui/                      ← shadcn/ui COMPONENT LIBRARY
│       ├── button.tsx           ├─ 30+ components
│       ├── input.tsx            ├─ Button, Input, Label, etc.
│       ├── select.tsx           ├─ Auto-generated from CLI
│       └── ...                  └─ Ready to use
│
├── lib/                         ← UTILITIES & TYPES
│   ├── api.ts                   ← Axios HTTP client
│   ├── types.ts                 ← TypeScript interfaces
│   └── utils.ts                 ← Helper functions (default)
│
├── docs/                        ← DOCUMENTATION
│   ├── INDEX.md                ← Documentation index
│   ├── QUICKSTART.md           ← 5-minute setup
│   ├── API_INTEGRATION.md      ← API reference
│   ├── COMPONENTS.md           ← Component guide
│   ├── DEPLOYMENT.md           ← Deployment guide
│   └── ARCHITECTURE.md         ← This file
│
├── public/                      ← STATIC ASSETS
│   └── (icons, fonts, images)
│
├── GETTING_STARTED.md          ← Start here!
├── PROJECT_SUMMARY.md          ← Project overview
├── README.md                   ← Full documentation
├── .env.local                  ← Environment variables
├── .gitignore                  ← Git configuration
├── package.json                ← Dependencies & scripts
├── tsconfig.json               ← TypeScript configuration
├── tailwind.config.ts          ← Tailwind CSS configuration
├── next.config.mjs             ← Next.js configuration
└── postcss.config.js           ← PostCSS configuration
```

---

## 🔄 Data Flow Diagram

### Training Flow
```
User fills TrainingForm
    ↓
Form submits with parameters
    ↓
API client sends POST /train/auto
    ↓
Backend trains models (5-30 minutes)
    ↓
Returns best model + comparison
    ↓
UI displays results with animations
    ↓
User can export/save metrics
```

### Prediction Flow
```
User fills PredictionForm
    ↓
Form submits with 4 features:
  - Rainfall
  - Temperature
  - Humidity
  - Previous Runoff
    ↓
API client sends POST /predict
    ↓
Backend generates prediction
    ↓
Returns predicted value + confidence
    ↓
UI displays result with chart
    ↓
Prediction added to history
```

### Dashboard Update Flow
```
Dashboard page mounts
    ↓
useEffect triggers immediately
    ↓
GET /metrics/latest call
    ↓
Metrics loaded into state
    ↓
Components render with data
    ↓
Re-fetch every 60 seconds
```

---

## 🎨 Component Hierarchy

```
RootLayout
├── Navbar (on every page)
├── Main Content Page
│   ├── Sidebar (dashboard pages only)
│   └── Page Content
│       ├── Header
│       ├── Section 1
│       │   ├── MetricCard
│       │   ├── MetricCard
│       │   └── MetricCard
│       ├── Section 2
│       │   ├── ModelComparisonTable
│       │   └── PredictionChart
│       └── Section 3
│           └── Form Component
│               ├── TrainingForm or
│               └── PredictionForm
```

---

## 🌊 State Management Pattern

```
Page Component
├── Local State (useState)
│   ├── loading: boolean
│   ├── data: Response | null
│   ├── error: string | null
│   └── history: Array
│
└── Effects (useEffect)
    ├── Fetch data on mount
    ├── Auto-refresh on interval
    └── Cleanup on unmount
```

**No Redux/Context** - Pages manage their own state, components receive props

---

## 🔌 API Contract

```
Frontend Request → Backend Processing → Frontend Response

┌──────────────────────────────────────────────────────────┐
│                    REQUEST FLOW                          │
│                                                          │
│  Page Component → API Client → Axios → Backend          │
│  (React)         (api.ts)     (HTTP)   (FastAPI)        │
│                                                          │
│  Headers:                                                │
│    Content-Type: application/json                        │
│    Accept: application/json                             │
│                                                          │
│  Body: TypeScript interface → JSON                      │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│                   RESPONSE FLOW                          │
│                                                          │
│  Backend → Axios → API Client → Page → Components       │
│  (JSON)     (HTTP)  (api.ts)     (React) (Display)      │
│                                                          │
│  Body: JSON → TypeScript interface                      │
│                                                          │
│  Error: AxiosError → ApiError → Toast Notification     │
└──────────────────────────────────────────────────────────┘
```

---

## 💾 Data Structures

### Training Request
```typescript
{
  train_end_year: number;       // e.g., 2000
  test_start_year: number;      // e.g., 2006
  search_type: 'grid' | 'randomized';
  n_iter: number;               // e.g., 20
  cv_splits?: number;           // optional
  n_jobs?: number;              // optional
}
```

### Training Response
```typescript
{
  best_model: ModelComparison;      // Best model metrics
  all_models: ModelComparison[];    // All model metrics
  artifact_path: string;            // Path to saved model
  registry_path: string;            // Path to registry
}
```

### Model Comparison
```typescript
{
  model_name: string;               // "xgboost" | "random_forest"
  rmse: number;                    // Root mean square error
  mae: number;                     // Mean absolute error
  r2: number;                      // R-squared score
  nse: number;                     // Nash-Sutcliffe efficiency
  cv_score_rmse: number;           // Cross-validation RMSE
  best_params: Record<string, unknown>; // Hyperparameters
}
```

### Prediction Request
```typescript
{
  rainfall: number;                 // mm
  temperature: number;              // °C
  humidity: number;                 // %
  previous_runoff: number;          // mm
}
```

### Prediction Response
```typescript
{
  predicted_runoff: number;         // mm
  confidence: number;               // 0-1
  timestamp: string;                // ISO timestamp
}
```

---

## 🎭 Component Lifecycle Example

### MetricCard Lifecycle
```
Mount
  ↓
Initial opacity=0, y=20
  ↓
Animate to opacity=1, y=0 (0.5s)
  ↓
Display with value formatted to 4 decimals
  ↓
On hover: lift up (-4px) with shadow
  ↓
On unmount: cleanup animations
```

---

## 🚀 Performance Optimizations

### Bundle Size
- Tree-shaking enabled
- Code splitting per route
- Dynamic imports for charts
- SVG icons (Lucide)

### Rendering
- Server Components for layout
- Client Components for interactivity
- Memoization where needed
- Lazy loading for images

### Network
- Axios timeout: 30s
- Auto-retry on failure
- Request deduplication
- Response caching

---

## 🔐 Security Architecture

```
User Input
    ↓
Form Validation (React Hook Form)
    ↓
Type Checking (TypeScript)
    ↓
Axios Request
    ↓
Environment Variable (NEXT_PUBLIC_API_URL)
    ↓
Backend API (CORS enabled)
    ↓
Response Error Handling
    ↓
User Notification (Toast)
```

---

## 🌐 API Endpoint Routing

```
Frontend Routes        Backend Endpoints
────────────────      ─────────────────

/                     (no API call)
/dashboard            GET /metrics/latest
/train                POST /train/auto
/predict              POST /predict
/api-status           GET /health
```

---

## 📊 Deployment Architecture

### Development
```
npm run dev
  ↓
Next.js dev server on :3000
  ↓
Hot Module Replacement enabled
  ↓
API calls to localhost:8000
```

### Production (Vercel)
```
npm run build
  ↓
Optimized bundle
  ↓
Deploy to Vercel CDN
  ↓
Environment variables configured
  ↓
API calls to production backend
```

### Self-Hosted (Docker)
```
Dockerfile build
  ↓
Multi-stage build
  ↓
Node image with app
  ↓
Express/Next.js server
  ↓
Docker container on port 3000
```

---

## 🔗 Integration Points

### Frontend → Backend
- 4 API endpoints
- Axios HTTP client
- Error handling
- Type-safe requests

### Frontend → Styling
- Tailwind CSS
- Framer Motion animations
- Recharts visualizations
- Dark theme

### Frontend → UI Library
- shadcn/ui components
- Radix UI primitives
- Lucide icons
- Responsive design

---

## 📈 Scaling Considerations

### Horizontal
- Multiple frontend instances
- Load balancer (Nginx, AWS ELB)
- CDN for static assets
- Stateless components

### Vertical
- Optimize bundle size
- Lazy load charts
- Cache API responses
- Compress assets

### Backend
- Scale FastAPI backend independently
- Use managed database
- Redis for caching
- Message queues for long jobs

---

## 🎯 Architecture Principles

1. **Separation of Concerns**
   - Pages handle routing
   - Components handle UI
   - API client handles HTTP
   - Types ensure safety

2. **Reusability**
   - Components used across pages
   - Shared API client
   - Common styling patterns
   - Utility functions

3. **Maintainability**
   - Clear file structure
   - Meaningful names
   - Documentation
   - Type safety

4. **Performance**
   - Lazy loading
   - Code splitting
   - Efficient re-renders
   - Optimized assets

5. **User Experience**
   - Smooth animations
   - Loading states
   - Error handling
   - Responsive design

---

## 📚 Further Reading

- Architecture decisions: See [PROJECT_SUMMARY.md](../PROJECT_SUMMARY.md)
- Component details: See [COMPONENTS.md](COMPONENTS.md)
- API contracts: See [API_INTEGRATION.md](API_INTEGRATION.md)
- Deployment: See [DEPLOYMENT.md](DEPLOYMENT.md)

---

This architecture supports:
- ✅ Real-time data updates
- ✅ Complex forms with validation
- ✅ Data visualization
- ✅ Responsive design
- ✅ Error handling
- ✅ Loading states
- ✅ Multi-page navigation
- ✅ API integration
- ✅ Type safety
- ✅ Production deployment
