# Getting Started with the AI Runoff Forecasting Dashboard

Welcome! This is a production-ready Next.js frontend for a 3-day runoff forecasting system with AI-powered model training and predictions.

## 🚀 Start Here (3 Steps)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Backend URL
Create `.env.local` file:
```bash
echo 'NEXT_PUBLIC_API_URL=http://localhost:8000' > .env.local
```

Update the URL if your backend is on a different port or server.

### Step 3: Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser! 🎉

---

## 📖 Documentation Map

Choose what you need:

| If you want to... | Read this |
|-------------------|-----------|
| Get running in 5 minutes | [docs/QUICKSTART.md](docs/QUICKSTART.md) |
| Understand the API | [docs/API_INTEGRATION.md](docs/API_INTEGRATION.md) |
| Learn about components | [docs/COMPONENTS.md](docs/COMPONENTS.md) |
| Deploy to production | [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) |
| See the big picture | [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) |

---

## 🎯 What You Have

### 5 Complete Pages
- ✅ **Landing** - Feature overview with CTAs
- ✅ **Dashboard** - Real-time metrics and model comparison
- ✅ **Training** - Model auto-tuning interface
- ✅ **Prediction** - 3-day runoff forecast generator
- ✅ **API Status** - Backend health monitoring

### 8 Custom Components
- Navigation (Navbar, Sidebar)
- Display (MetricCard, ModelComparisonTable, PredictionChart)
- Forms (TrainingForm, PredictionForm)
- Utilities (LoadingSpinner)

### 30+ UI Components
From shadcn/ui: buttons, inputs, forms, dialogs, tables, and more

### Professional Features
- Dark theme with glassmorphism
- Smooth animations with Framer Motion
- Responsive design (mobile to desktop)
- Type-safe with TypeScript
- Error handling and loading states
- Real-time API integration

---

## 🔧 Key Technologies

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Recharts** - Data visualization
- **Axios** - HTTP client
- **shadcn/ui** - Component library

---

## 🌐 Available Pages

Navigate using the top menu or directly:

| Page | URL | What it does |
|------|-----|-------------|
| Landing | `/` | Welcome & features |
| Dashboard | `/dashboard` | View metrics & models |
| Training | `/train` | Train ML models |
| Prediction | `/predict` | Get runoff forecast |
| API Status | `/api-status` | Check backend health |

---

## 🔌 Backend Integration

The frontend expects a FastAPI backend with these endpoints:

### Required Endpoints

**1. Health Check**
```
GET /health
→ { status: "ok", timestamp: "...", uptime: 3600 }
```

**2. Train Models**
```
POST /train/auto
← { train_end_year, test_start_year, search_type, n_iter }
→ { best_model: {...}, all_models: [...], artifact_path, registry_path }
```

**3. Generate Prediction**
```
POST /predict
← { rainfall, temperature, humidity, previous_runoff }
→ { predicted_runoff, confidence, timestamp }
```

**4. Get Latest Metrics**
```
GET /metrics/latest
→ { best_model: {...}, all_models: [...], artifact_path, registry_path }
```

**See [docs/API_INTEGRATION.md](docs/API_INTEGRATION.md) for full details**

---

## 📁 Project Structure

```
runoff-dashboard/
├── app/                    # Next.js pages
│   ├── page.tsx           # Landing page
│   ├── dashboard/page.tsx # Dashboard
│   ├── train/page.tsx     # Training
│   ├── predict/page.tsx   # Predictions
│   └── api-status/page.tsx # API status
│
├── components/            # React components
│   ├── Navbar.tsx        # Navigation
│   ├── Sidebar.tsx       # API status
│   ├── MetricCard.tsx    # Metrics display
│   ├── PredictionChart.tsx # Charts
│   ├── TrainingForm.tsx  # Training form
│   └── ...              # Other components
│
├── lib/
│   ├── api.ts           # API client
│   └── types.ts         # TypeScript types
│
├── docs/                # Documentation
├── .env.local          # Environment config
├── package.json        # Dependencies
└── README.md          # Full documentation
```

---

## 💡 Quick Tips

### Change Backend URL
Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=https://your-api.com
```

### Run Tests/Linting
```bash
npm run lint          # Check code style
npx tsc --noEmit    # Type check
```

### Build for Production
```bash
npm run build        # Create optimized build
npm start           # Start production server
```

### Debug API Calls
1. Open DevTools (F12)
2. Go to Network tab
3. Try making API calls
4. See requests and responses

### Add a New Page
1. Create `app/newpage/page.tsx`
2. Add your component
3. It's automatically routed to `/newpage`

---

## 🚀 Deploy Quickly

### To Vercel (Recommended)
```bash
npm i -g vercel
vercel
vercel --prod
```

### To Docker
```bash
docker build -t runoff-dashboard .
docker run -p 3000:3000 runoff-dashboard
```

**See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for full deployment guides**

---

## 🆘 Troubleshooting

### Port 3000 Already in Use
```bash
npm run dev -- -p 3001
```

### API Not Connecting
1. Check backend is running: `curl http://localhost:8000/health`
2. Verify `.env.local` has correct URL
3. Open DevTools Network tab to see errors

### Build Errors
```bash
rm -rf node_modules .next
npm install
npm run build
```

### TypeScript Errors
```bash
npx tsc --noEmit
npm install --save-dev @types/react @types/react-dom
```

**More help: See [docs/QUICKSTART.md](docs/QUICKSTART.md)**

---

## 📚 Learning Path

### Beginner (You are here!)
- Read this file ✓
- Run `npm run dev`
- Explore all pages
- Try the API Status page

### Intermediate
- Read [docs/COMPONENTS.md](docs/COMPONENTS.md)
- Modify form fields
- Change colors in tailwind.config.ts
- Add a new page

### Advanced
- Read [docs/API_INTEGRATION.md](docs/API_INTEGRATION.md)
- Create custom components
- Implement caching
- Add authentication

---

## 🎓 Resources

- **Next.js Docs**: https://nextjs.org/docs
- **React Docs**: https://react.dev
- **Tailwind Docs**: https://tailwindcss.com
- **shadcn/ui**: https://ui.shadcn.com
- **Framer Motion**: https://www.framer.com/motion

---

## ✅ Next Steps

1. **Run the app**: `npm run dev`
2. **Visit the site**: http://localhost:3000
3. **Check API Status**: Click "Status" in navigation
4. **Read more docs**: Start with [docs/QUICKSTART.md](docs/QUICKSTART.md)
5. **Deploy**: Follow [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

---

## 📞 Support

- 📖 Check the documentation in `/docs`
- 🐛 Review error messages in browser console
- 🔍 Check network requests in DevTools
- 💬 See [docs/QUICKSTART.md](docs/QUICKSTART.md) troubleshooting section

---

## 🎉 You're All Set!

You now have a professional, production-ready AI dashboard. 

**Next: Run `npm run dev` and visit http://localhost:3000**

---

**Happy building!** 🚀

For detailed information, see [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) or any of the documentation files in the `docs/` folder.
