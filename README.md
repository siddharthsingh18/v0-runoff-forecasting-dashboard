# AI-Based Runoff Forecasting Platform

A production-grade AI dashboard frontend for a 3-day ahead runoff forecasting system with advanced machine learning model training and real-time predictions.

## 🎯 Features

- **Model Auto-Tuning**: Automatically tune hyperparameters for Random Forest and XGBoost models
- **Hyperparameter Optimization**: Grid search and randomized search capabilities
- **Interactive Visualizations**: Real-time charts and metric comparisons
- **3-Day Forecast API**: Generate predictions with confidence scores
- **API Health Monitoring**: Real-time backend status and diagnostics
- **Dark Theme Design**: Modern AI SaaS aesthetic with glassmorphism effects

## 📋 Project Structure

```
app/
├── page.tsx                 # Landing page with feature overview
├── dashboard/page.tsx       # Main analytics dashboard
├── train/page.tsx          # Model training interface
├── predict/page.tsx        # Prediction generation
├── api-status/page.tsx     # API health monitoring
└── layout.tsx              # Root layout with dark theme

components/
├── Navbar.tsx              # Main navigation
├── Sidebar.tsx             # API status sidebar
├── MetricCard.tsx          # Performance metric cards
├── ModelComparisonTable.tsx # Model comparison matrix
├── PredictionChart.tsx     # Recharts visualization
├── TrainingForm.tsx        # Model training form
├── PredictionForm.tsx      # Prediction input form
└── LoadingSpinner.tsx      # Custom loading animation

lib/
├── api.ts                  # Axios API client
└── types.ts                # TypeScript interfaces
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (recommended 20+)
- npm or pnpm package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-runoff-dashboard
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Configure environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Running the Development Server

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## 📡 API Integration

The frontend expects a FastAPI backend with the following endpoints:

### Health Check
```
GET /health
```
Returns: `{ status: string, timestamp: string, uptime?: number }`

### Train Models
```
POST /train/auto
```
Request body:
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

### Generate Prediction
```
POST /predict
```
Request body:
```json
{
  "rainfall": 10.5,
  "temperature": 25.3,
  "humidity": 65,
  "previous_runoff": 5.2
}
```

### Get Latest Metrics
```
GET /metrics/latest
```

## 🎨 Design System

### Colors
- **Primary Gradient**: Indigo → Purple
- **Accent Color**: Cyan
- **Background**: Slate 950 with gradient
- **Cards**: Glassmorphic white/5 with backdrop blur

### Typography
- **Headings**: Geist (default font)
- **Body**: Geist (default font)
- **Monospace**: Geist Mono

### Components
- Shadcn UI components for base elements
- Framer Motion for smooth animations
- Recharts for data visualization
- Lucide React for icons

## 📊 Pages

### Landing Page (`/`)
Hero section with feature showcase and CTA buttons for dashboard and training.

### Dashboard (`/dashboard`)
- Best model metrics (RMSE, MAE, R², NSE)
- Model comparison table
- Prediction history chart
- Model parameters display
- API status sidebar

### Training (`/train`)
- Training configuration form
- Real-time training progress
- Best model results display
- Model comparison metrics
- Best parameters visualization

### Prediction (`/predict`)
- Environmental input form (rainfall, temperature, humidity, previous runoff)
- Predicted runoff value with confidence score
- Prediction history chart
- Confidence level indicator

### API Status (`/api-status`)
- Real-time health status
- Response time metrics
- Available endpoints documentation
- Configuration display

## 🔧 Configuration

### Environment Variables

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8000

# Next.js Environment (development/production)
NODE_ENV=development
```

## 🛠️ Technologies Used

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Charts**: Recharts
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Toast Notifications**: Sonner

## 📦 Dependencies

### Core
- next@16.1.6
- react@19.2.4
- react-dom@19.2.4

### UI & Styling
- tailwindcss@^4.2.0
- @radix-ui/* (comprehensive UI components)
- lucide-react@^0.564.0

### Data & Visualization
- recharts@2.15.0
- axios@^1.7.7

### Animation & Motion
- framer-motion@^11.11.17

### Form & Validation
- react-hook-form@^7.54.1
- zod@^3.24.1

## 🚀 Build & Deployment

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel
```bash
vercel
```

The project is optimized for Vercel deployment with automatic builds and previews.

## 🔒 Security Notes

- All API calls use HTTPS in production
- Environment variables are never exposed to the client (only `NEXT_PUBLIC_*` prefixed vars)
- Axios interceptors handle error responses
- Input validation on all forms using Zod schemas

## 📝 Performance Optimizations

- Next.js Server Components for layout
- Client Components only where necessary
- Recharts with responsive containers
- Framer Motion with performant transitions
- Tailwind CSS with purging in production

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For issues and questions:
- Check existing GitHub issues
- Create a new issue with detailed description
- Provide environment and reproduction steps

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Framer Motion](https://www.framer.com/motion)

---

Built with ❤️ using modern web technologies
