# Quick Start Guide

Get the AI Runoff Forecasting Dashboard up and running in 5 minutes.

## 1. Prerequisites

- **Node.js** 20+ (download from [nodejs.org](https://nodejs.org))
- **Backend API** running on `http://localhost:8000`
- **Git** for cloning the repository

## 2. Clone Repository

```bash
git clone https://github.com/yourusername/runoff-dashboard.git
cd runoff-dashboard
```

## 3. Install Dependencies

```bash
npm install
# or
pnpm install
```

## 4. Configure Environment

Create `.env.local` file:

```bash
echo 'NEXT_PUBLIC_API_URL=http://localhost:8000' > .env.local
```

## 5. Start Development Server

```bash
npm run dev
# or
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) 🎉

---

## Verify Setup

### ✅ Check Landing Page

Navigate to [http://localhost:3000](http://localhost:3000)

You should see:
- "AI-Based Runoff Forecasting Platform" title
- Feature cards
- "Go to Dashboard" button

### ✅ Check API Connection

1. Click "API Status" in navigation
2. You should see:
   - Green check if API is healthy
   - Green check if API is unhealthy (expected if no backend)

### ✅ Test Dashboard

1. Click "Dashboard" in navigation
2. You should see metric cards (will show loading if API unreachable)

---

## Next Steps

### 1. Connect Your Backend

Update `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://your-backend-url:8000
```

### 2. Test API Integration

Go to `/api-status` page and verify:
- API Status shows "Healthy"
- Response time displays

### 3. Test Training

1. Go to `/train` page
2. Adjust parameters:
   - Training End Year: `2000`
   - Test Start Year: `2006`
   - Search Type: `randomized`
   - Iterations: `10`
3. Click "Start Training"

### 4. Test Predictions

1. Go to `/predict` page
2. Enter values:
   - Rainfall: `15`
   - Temperature: `25`
   - Humidity: `70`
   - Previous Runoff: `5`
3. Click "Get Prediction"

---

## Project Structure

```
project-root/
├── app/                          # Next.js app directory
│   ├── page.tsx                 # Landing page
│   ├── dashboard/page.tsx       # Dashboard
│   ├── train/page.tsx           # Training
│   ├── predict/page.tsx         # Predictions
│   ├── api-status/page.tsx      # API status
│   └── layout.tsx               # Root layout
│
├── components/                   # React components
│   ├── Navbar.tsx               # Navigation
│   ├── Sidebar.tsx              # API status sidebar
│   ├── MetricCard.tsx           # Metric display
│   ├── ModelComparisonTable.tsx # Model table
│   ├── PredictionChart.tsx      # Recharts visualization
│   ├── TrainingForm.tsx         # Training form
│   ├── PredictionForm.tsx       # Prediction form
│   ├── LoadingSpinner.tsx       # Loading animation
│   └── ui/                      # shadcn/ui components
│
├── lib/
│   ├── api.ts                   # API client
│   └── types.ts                 # TypeScript interfaces
│
├── docs/                         # Documentation
│   ├── API_INTEGRATION.md       # API guide
│   ├── COMPONENTS.md            # Component docs
│   ├── DEPLOYMENT.md            # Deployment guide
│   └── QUICKSTART.md            # This file
│
├── .env.local                   # Environment variables
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

---

## Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Type check
npx tsc --noEmit

# Clean build cache
rm -rf .next node_modules
npm install
```

---

## Troubleshooting

### Port 3000 Already in Use

```bash
# Use different port
npm run dev -- -p 3001

# Or kill process on port 3000
# macOS/Linux:
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### API Connection Issues

1. **Check Backend is Running**:
   ```bash
   curl http://localhost:8000/health
   ```

2. **Verify Environment Variable**:
   ```bash
   cat .env.local
   ```

3. **Check Network**:
   - Open browser DevTools (F12)
   - Go to Network tab
   - Try API Status page
   - Look for failed requests
   - Check error messages

### Dependencies Won't Install

```bash
# Clear npm cache
npm cache clean --force

# Clear node_modules
rm -rf node_modules pnpm-lock.yaml

# Reinstall
npm install
```

### TypeScript Errors

```bash
# Check TypeScript
npx tsc --noEmit

# Fix common issues
npm install --save-dev @types/react @types/react-dom @types/node
```

---

## Development Tips

### Use DevTools

1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Use Network tab to debug API calls
4. Use React DevTools extension

### Hot Reload

Changes to code automatically refresh in browser - no restart needed!

### Environment Variables

- Must start with `NEXT_PUBLIC_` to be accessible in browser
- Changes require restart of dev server
- Local changes won't affect other developers

### TypeScript

- Full type checking in IDE
- IntelliSense autocomplete
- Catch errors before runtime

---

## API Response Examples

### Health Check Response

```json
{
  "status": "ok",
  "timestamp": "2025-02-26T12:00:00Z",
  "uptime": 3600
}
```

### Training Response

```json
{
  "best_model": {
    "model_name": "xgboost",
    "rmse": 2.54,
    "mae": 1.82,
    "r2": 0.893,
    "nse": 0.882,
    "cv_score_rmse": 2.61,
    "best_params": {
      "n_estimators": 600,
      "learning_rate": 0.05
    }
  },
  "all_models": [],
  "artifact_path": "models/best_xgboost.json",
  "registry_path": "model_registry.json"
}
```

### Prediction Response

```json
{
  "predicted_runoff": 12.34,
  "confidence": 0.92,
  "timestamp": "2025-02-26T12:00:00Z"
}
```

---

## Frontend Pages Reference

| Page | URL | Purpose |
|------|-----|---------|
| Landing | `/` | Introduction & features |
| Dashboard | `/dashboard` | Metrics & analysis |
| Training | `/train` | Train models |
| Prediction | `/predict` | Generate predictions |
| API Status | `/api-status` | Backend health |

---

## File Editing Quick Reference

### Add a New Page

1. Create file: `app/newpage/page.tsx`
2. Add component:
```typescript
export default function NewPage() {
  return <div>New Page</div>;
}
```
3. Navigate to `/newpage`

### Add a New Component

1. Create file: `components/MyComponent.tsx`
2. Define component:
```typescript
export function MyComponent() {
  return <div>Component</div>;
}
```
3. Import in page:
```typescript
import { MyComponent } from '@/components/MyComponent';
```

### Update Styling

- Edit `app/globals.css` for global styles
- Use Tailwind classes in components
- No need to restart server

---

## Learning Resources

- **Next.js**: https://nextjs.org/learn
- **React**: https://react.dev/learn
- **Tailwind**: https://tailwindcss.com/docs
- **shadcn/ui**: https://ui.shadcn.com
- **TypeScript**: https://www.typescriptlang.org/docs

---

## Backend Setup (Optional)

If you need to set up the backend locally:

### Python Backend

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # macOS/Linux
# or
venv\Scripts\activate  # Windows

# Install dependencies
pip install fastapi uvicorn scikit-learn xgboost pandas numpy

# Start backend
python backend.py
```

Backend should run on `http://localhost:8000`

---

## Deployment

### Deploy to Vercel (Easiest)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

For detailed deployment instructions, see [docs/DEPLOYMENT.md](./DEPLOYMENT.md)

---

## Get Help

- 📖 Read the [README.md](../README.md)
- 📚 Check [docs/](./docs)
- 🐛 Search [GitHub Issues](https://github.com/yourusername/runoff-dashboard/issues)
- 💬 Open a Discussion

---

## What's Next?

### Beginner
- [ ] Explore all pages
- [ ] Read component documentation
- [ ] Try changing styling

### Intermediate
- [ ] Modify form validation
- [ ] Add new metrics cards
- [ ] Create custom charts

### Advanced
- [ ] Add authentication
- [ ] Implement caching
- [ ] Add real-time updates with WebSockets
- [ ] Create admin dashboard

---

## Quick Links

- 🏠 [Landing Page](http://localhost:3000)
- 📊 [Dashboard](http://localhost:3000/dashboard)
- 🔧 [Training](http://localhost:3000/train)
- 🎯 [Predictions](http://localhost:3000/predict)
- 🏥 [API Status](http://localhost:3000/api-status)

---

## Summary

You now have:
✅ Local development environment
✅ All components and pages
✅ API integration layer
✅ TypeScript support
✅ Beautiful UI with Tailwind
✅ Smooth animations

**Happy coding!** 🚀
