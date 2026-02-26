# AI SaaS Runoff Forecasting Platform - Setup Guide

## Project Overview

This is a production-ready, enterprise-grade AI SaaS dashboard built with modern web technologies for advanced 3-day runoff forecasting using machine learning.

## Tech Stack

- **Frontend**: Next.js 16 with App Router
- **UI Framework**: React 19.2 with TypeScript
- **Styling**: Tailwind CSS v4 + Shadcn UI components
- **State Management**: Zustand
- **Data Fetching**: Axios + React Query
- **Form Handling**: React Hook Form + Zod validation
- **Charts & Visualization**: Recharts
- **Animations**: Framer Motion
- **Authentication**: JWT-based (localStorage)

## Project Structure

```
app/
├── page.tsx                 # Landing page with hero
├── login/page.tsx           # Authentication page
├── dashboard/page.tsx       # Main metrics dashboard
├── analytics/page.tsx       # Advanced analytics charts
├── train/page.tsx          # Model training interface
├── predict/page.tsx        # Prediction generator
├── models/page.tsx         # Model registry viewer
├── dataset/page.tsx        # Dataset management
└── settings/page.tsx       # User settings

components/
├── layout/
│   ├── Navbar.tsx          # Top navigation bar
│   ├── Sidebar.tsx         # Left sidebar navigation
│   └── Footer.tsx          # Footer component
├── ui/
│   ├── MetricCard.tsx      # Metric display card
│   ├── StatusBadge.tsx     # Status indicator
│   ├── LoadingSpinner.tsx  # Loading state
│   ├── GlowButton.tsx      # Animated CTA button
│   └── SectionCard.tsx     # Content container
└── forms/
    └── LoginForm.tsx       # Login form component

lib/
├── api.ts                  # Axios API client
├── types.ts               # TypeScript interfaces
└── validators.ts          # Zod validation schemas

store/
└── useModelStore.ts       # Zustand state store
```

## Key Features Implemented

### 1. Authentication System
- JWT-based login with email/password
- Protected routes with Zustand state management
- Automatic token refresh in API interceptors
- Logout functionality with localStorage cleanup

### 2. Dark Futuristic Design
- Glassmorphism panels with backdrop blur
- Neon cyan accent colors with glow effects
- Smooth fade-in and slide animations
- Responsive gradient backgrounds
- Dark theme (indigo → violet gradient)

### 3. Dashboard Pages

**Landing Page** (`/`)
- Hero section with animated backgrounds
- Feature showcase grid
- Call-to-action buttons
- Authentication state awareness

**Dashboard** (`/dashboard`)
- 6-column metrics grid (Best Model, RMSE, MAE, R², NSE, CV Score)
- Model comparison table with sortable columns
- API health status indicator
- Real-time data fetching with auto-refresh

**Analytics** (`/analytics`)
- Actual vs Predicted line chart
- Feature importance bar chart
- Learning curve visualization
- Residual distribution scatter plot
- All charts responsive with Recharts

**Training** (`/train`)
- Hyperparameter configuration panel
- Real-time training progress indicator
- Results display with metrics and parameters
- Error handling and validation

**Prediction** (`/predict`)
- Dynamic input form with validation
- Rainfall, temperature, humidity, previous runoff inputs
- Animated result display with confidence bar
- Session prediction history tracking

**Models** (`/models`)
- Full model registry table
- Sortable columns (Name, Version, RMSE, MAE, R², NSE)
- Download model artifacts
- Pagination support

**Dataset** (`/dataset`)
- Drag-and-drop file upload UI
- CSV validation
- Dataset statistics display
- Feature list and metadata

**Settings** (`/settings`)
- Account information management
- Notification preferences with toggles
- Security settings (2FA, password change)
- User preferences (animations, theme)

### 4. API Integration

The API client (`lib/api.ts`) includes:
- Authentication endpoint: `/auth/login`
- Health check: `/health`
- Model training: `/train/auto`
- Predictions: `/predict`
- Metrics: `/metrics/latest`
- Model registry: `/models/registry`
- Dataset upload: `/dataset/upload`

All API calls include JWT token injection via interceptors.

### 5. Styling & Theme

**Color Palette**:
- Primary: Cyan-400 (#06b6d4)
- Secondary: Purple-600 (#a855f7)
- Background: Slate-950 (#030712)
- Dark cards: oklch(0.12 0 0)
- Text: White/95% opacity

**Effects**:
- Glassmorphism: `glass` and `glass-dark` classes
- Glow: `glow-cyan`, `glow-cyan-hover` classes
- Animations: `animate-fadeInUp`, `animate-slideInRight`, `animate-glowPulse`

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
# or
pnpm install
```

This installs:
- All required packages (Zustand, React Query, Framer Motion, etc.)
- Shadcn UI components
- TypeScript definitions

### 2. Environment Configuration

Update `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
JWT_SECRET=your-secret-key-change-in-production
```

Replace `http://localhost:8000` with your actual backend API URL.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Test Login

Use demo credentials:
- Email: `admin@example.com`
- Password: `password123`

(Configure actual credentials in your backend)

## Component Usage Examples

### Using MetricCard
```tsx
<MetricCard
  label="RMSE"
  value={0.85}
  unit="mm"
  icon={<TrendingDown className="w-6 h-6" />}
  trend="down"
/>
```

### Using GlowButton
```tsx
<GlowButton
  onClick={handleClick}
  glowIntensity="high"
  className="w-full"
>
  Generate Prediction
</GlowButton>
```

### Using SectionCard
```tsx
<SectionCard
  title="Model Performance"
  description="View detailed metrics"
  delay={0.1}
>
  {/* Content here */}
</SectionCard>
```

## API Integration Checklist

Before going to production, ensure your backend implements:

- [ ] `POST /auth/login` - User authentication
- [ ] `GET /health` - Health check endpoint
- [ ] `POST /train/auto` - Model training with hyperparameter tuning
- [ ] `POST /predict` - Generate predictions
- [ ] `GET /metrics/latest` - Latest model metrics
- [ ] `GET /models/registry` - Model registry JSON
- [ ] `POST /dataset/upload` - Dataset upload handling

All endpoints should return proper JSON responses with HTTP status codes.

## Customization Guide

### Changing Colors

Edit `app/globals.css`:
```css
.dark {
  --primary: oklch(0.5 0.2 262); /* Change primary color */
  --accent: oklch(0.6 0.25 262); /* Change accent color */
}
```

### Adding New Pages

1. Create `app/newpage/page.tsx`
2. Import Navbar and Sidebar
3. Use consistent layout with `ml-64` margin
4. Import UI components as needed

### Customizing Animations

Modify animation definitions in `app/globals.css`:
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

## Performance Optimizations

- Lazy loading with Next.js `dynamic()`
- Image optimization with Next.js Image component
- Route prefetching for faster navigation
- Memoized components with React
- Optimized Recharts rendering

## Accessibility Features

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Color contrast compliance
- Form validation with user feedback

## Deployment

### Vercel Deployment (Recommended)

1. Push code to GitHub
2. Import repository in Vercel
3. Set environment variables in project settings
4. Deploy with one click

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Troubleshooting

**Issue**: Login redirect not working
- Check localStorage for `auth_token`
- Verify API URL in `.env.local`
- Check browser console for errors

**Issue**: Charts not rendering
- Ensure Recharts is installed: `npm install recharts`
- Check data format matches chart requirements
- Verify ResponsiveContainer width/height

**Issue**: Styles not applied
- Clear browser cache and rebuild: `npm run build`
- Check Tailwind CSS in `globals.css`
- Verify custom CSS classes in components

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)
- [Framer Motion](https://www.framer.com/motion/)
- [Recharts](https://recharts.org/)
- [Zustand](https://github.com/pmndrs/zustand)

## Support & Maintenance

For questions or issues:
1. Check the documentation files in `/docs`
2. Review component examples in component files
3. Check API integration in `lib/api.ts`
4. Review validators in `lib/validators.ts`

## License

This project is provided as-is for commercial use.
