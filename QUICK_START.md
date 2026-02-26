# Quick Start Guide

## 30-Second Setup

```bash
# 1. Install dependencies
npm install
# or pnpm install

# 2. Run development server
npm run dev

# 3. Open browser
open http://localhost:3000
```

## Test the App (2 minutes)

1. **Landing Page** (`/`) - See the hero section with animated background
2. **Login** (`/login`) - Use credentials:
   - Email: `admin@example.com`
   - Password: `password123`
3. **Dashboard** (`/dashboard`) - View 6 key metrics and model comparison table
4. **Analytics** (`/analytics`) - Explore 4 interactive Recharts visualizations
5. **Training** (`/train`) - Click "Start Training" to see mock training flow
6. **Predictions** (`/predict`) - Enter values and generate predictions
7. **Models** (`/models`) - Browse model registry table
8. **Dataset** (`/dataset`) - Try drag-and-drop file upload UI
9. **Settings** (`/settings`) - Explore account and notification settings

## Key Features to Explore

✨ **Design**
- Dark futuristic theme with cyan/purple neon accents
- Glassmorphism cards with backdrop blur effects
- Smooth animations on every interaction
- Responsive layout (mobile-friendly)

🔐 **Authentication**
- Login with email/password
- JWT tokens stored in localStorage
- Protected routes require authentication
- Logout clears all session data

📊 **Dashboard**
- Real-time metrics display
- Model comparison table (sortable)
- API health status indicator
- Auto-refresh functionality

📈 **Analytics**
- Actual vs Predicted chart
- Feature importance ranking
- Learning curve visualization
- Residual distribution analysis

🚀 **Training**
- Configure hyperparameters
- Real-time training progress
- Detailed results with best parameters
- Error handling and validation

🎯 **Predictions**
- Dynamic input form validation
- Confidence interval display
- Session history tracking
- Beautiful result visualization

💾 **Models & Data**
- Full model registry with metrics
- Downloadable artifacts
- Dataset upload and management
- Feature list and metadata

⚙️ **Settings**
- Account management
- Notification preferences
- Security settings
- User preferences

## File Structure Quick Reference

```
📁 App Pages
├── app/page.tsx              → Landing page
├── app/login/page.tsx        → Login page
├── app/dashboard/page.tsx    → Main dashboard
├── app/analytics/page.tsx    → Analytics charts
├── app/train/page.tsx        → Training interface
├── app/predict/page.tsx      → Prediction form
├── app/models/page.tsx       → Model registry
├── app/dataset/page.tsx      → Dataset upload
└── app/settings/page.tsx     → User settings

📁 Components
├── components/layout/        → Navbar, Sidebar, Footer
├── components/ui/            → MetricCard, GlowButton, etc.
└── components/forms/         → LoginForm

📁 Configuration
├── lib/api.ts               → API client with interceptors
├── lib/types.ts             → TypeScript interfaces
├── lib/validators.ts        → Zod validation schemas
├── store/useModelStore.ts   → Zustand state management
└── app/globals.css          → Tailwind + custom styles
```

## Environment Setup

Create `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
JWT_SECRET=your-secret-key
```

## Common Tasks

### Change API Endpoint
Edit `.env.local`:
```
NEXT_PUBLIC_API_URL=https://your-api-domain.com
```

### Change Primary Color
Edit `app/globals.css`, find `--primary` in the `.dark` theme section.

### Add New Page
1. Create `app/yourpage/page.tsx`
2. Copy layout from existing page (Dashboard template recommended)
3. Import Navbar, Sidebar, and SectionCard components
4. Add route to Navbar navigation

### Connect Real Backend
1. Update API endpoints in `lib/api.ts`
2. Add authentication logic
3. Implement proper JWT token management
4. Test all API calls with backend

## Authentication Flow

1. User enters credentials on `/login`
2. LoginForm calls `api.login()`
3. Backend returns JWT token
4. Token stored in localStorage via Zustand
5. Token injected in all API requests
6. Zustand state updated with user data
7. Redirect to `/dashboard` on success

## Build & Deploy

```bash
# Build for production
npm run build

# Start production server locally
npm start

# Deploy to Vercel
# Push to GitHub → Connect in Vercel → Auto-deploy
```

## API Endpoints Used

The app expects these endpoints to be available:

```
POST   /auth/login          → User authentication
GET    /health              → Health check
POST   /train/auto          → Model training
POST   /predict             → Generate prediction
GET    /metrics/latest      → Latest metrics
GET    /models/registry     → Model list
POST   /dataset/upload      → Upload dataset
```

## Customization Examples

### Theme Colors
Edit `.dark` theme in `app/globals.css` to change:
- Primary color (cyan)
- Secondary color (purple)
- Background colors
- Text colors

### Button Text/Icons
All button text and icons are editable in component files. Search for the text you want to change.

### Form Validation Rules
Edit `lib/validators.ts` to update Zod schemas for stricter/looser validation.

### Chart Data
Edit the mock data in chart components or connect to real API data.

## Performance Tips

- App uses React 19.2 with built-in optimizations
- Framer Motion animations are GPU-accelerated
- Recharts components are optimized for large datasets
- Zustand provides minimal re-render overhead
- Next.js provides automatic code splitting

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Need Help?

1. Check `SETUP_GUIDE.md` for detailed documentation
2. Review component files for usage examples
3. Check `lib/api.ts` for API integration patterns
4. Check `lib/validators.ts` for form validation patterns

## Next Steps

1. ✅ Run the app locally
2. ✅ Explore all pages and features
3. ✅ Review the code structure
4. ✅ Connect to your backend API
5. ✅ Customize colors and branding
6. ✅ Deploy to production

Enjoy your AI SaaS dashboard! 🚀
