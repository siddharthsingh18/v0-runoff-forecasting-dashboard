# Component Documentation

## Overview

This document provides a detailed guide to all custom components used in the AI Runoff Forecasting Dashboard.

## Table of Contents

1. [Navigation Components](#navigation-components)
2. [Display Components](#display-components)
3. [Form Components](#form-components)
4. [Utility Components](#utility-components)

---

## Navigation Components

### Navbar

**File**: `components/Navbar.tsx`

**Purpose**: Main navigation bar visible on all pages

**Features**:
- Logo with animated icon
- Desktop navigation with active state indicators
- Mobile hamburger menu with smooth transitions
- Responsive design

**Props**: None (uses `usePathname` hook)

**Usage**:
```typescript
import { Navbar } from '@/components/Navbar';

export default function Layout() {
  return (
    <>
      <Navbar />
      {/* Page content */}
    </>
  );
}
```

**Design**:
- Sticky positioning (top-0 z-50)
- Glassmorphic background (bg-white/5 backdrop-blur-md)
- Height: 64px (h-16)

---

### Sidebar

**File**: `components/Sidebar.tsx`

**Purpose**: Right sidebar showing API status and quick info

**Features**:
- Real-time API health monitoring
- Response time tracking
- Status indicator with color coding
- Auto-refresh every 30 seconds
- Responsive (hidden on mobile, visible on lg screens)

**Props**: None (manages own state)

**Usage**:
```typescript
import { Sidebar } from '@/components/Sidebar';

export default function Page() {
  return (
    <>
      <main>{/* Content */}</main>
      <Sidebar />
    </>
  );
}
```

**Status Indicators**:
- **Healthy**: Green icon, shows response time
- **Error**: Red icon, shows error message
- **Loading**: Yellow icon, shows checking status

**Auto-Update**: Pings `/health` endpoint every 30 seconds

---

## Display Components

### MetricCard

**File**: `components/MetricCard.tsx`

**Purpose**: Display individual metrics with labels and icons

**Props**:
```typescript
interface MetricCardProps {
  label: string;           // Metric label
  value: string | number;  // Metric value
  icon?: ReactNode;        // Optional icon
  highlighted?: boolean;   // Highlight style (default: false)
}
```

**Usage**:
```typescript
import { MetricCard } from '@/components/MetricCard';
import { Zap } from 'lucide-react';

<MetricCard
  label="RMSE"
  value={2.5431}
  icon={<Zap className="w-6 h-6" />}
/>

<MetricCard
  label="Best Model"
  value="XGBoost"
  highlighted={true}
/>
```

**Features**:
- Smooth fade-in animation on mount
- Hover effect with elevation
- Auto-formats numeric values to 4 decimals
- Supports highlighted (bright) variant

**Styling**:
- Normal: `bg-white/5 border-white/10`
- Highlighted: `bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border-indigo-500/40`

---

### ModelComparisonTable

**File**: `components/ModelComparisonTable.tsx`

**Purpose**: Display tabular comparison of multiple trained models

**Props**:
```typescript
interface ModelComparisonTableProps {
  models: ModelComparison[];  // Array of model data
  loading?: boolean;          // Show loading skeleton
}
```

**Columns**:
- Model Name (with "Best" badge)
- RMSE
- MAE
- R²
- NSE
- CV Score

**Usage**:
```typescript
import { ModelComparisonTable } from '@/components/ModelComparisonTable';

<ModelComparisonTable
  models={[
    {
      model_name: "xgboost",
      rmse: 2.5431,
      mae: 1.8234,
      r2: 0.8932,
      nse: 0.8821,
      cv_score_rmse: 2.6112,
      best_params: { /* ... */ }
    },
    // ... more models
  ]}
/>
```

**Features**:
- Best model row highlighted with indigo background
- Staggered fade-in animation
- Loading skeleton with shimmer effect
- Responsive overflow with horizontal scroll on mobile
- Auto-formats numeric values to 4 decimals
- Handles NaN values gracefully

---

### PredictionChart

**File**: `components/PredictionChart.tsx`

**Purpose**: Line chart showing actual vs predicted runoff values

**Props**:
```typescript
interface PredictionChartProps {
  data: ChartDataPoint[];  // Array of [index, actual, predicted]
  loading?: boolean;       // Show loading skeleton
}

interface ChartDataPoint {
  index: number;
  actual: number;
  predicted: number;
}
```

**Usage**:
```typescript
import { PredictionChart } from '@/components/PredictionChart';

const data = [
  { index: 0, actual: 10.5, predicted: 10.2 },
  { index: 1, actual: 12.3, predicted: 11.9 },
  // ...
];

<PredictionChart data={data} />
```

**Features**:
- Dual-line chart (actual vs predicted)
- Indigo line for actual values
- Dashed cyan line for predicted values
- Auto-generates dummy data if empty
- Smooth animations on mount
- Responsive container sizing
- Interactive legend and tooltip

**Chart Settings**:
- X-axis: Sample index
- Y-axis: Runoff value (mm)
- Grid: Subtle with 10% opacity

---

### LoadingSpinner

**File**: `components/LoadingSpinner.tsx`

**Purpose**: Animated loading indicator with optional text

**Props**:
```typescript
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';  // Spinner size (default: 'md')
  text?: string;              // Optional loading text
}
```

**Sizes**:
- `sm`: 24px (w-6 h-6)
- `md`: 48px (w-12 h-12)
- `lg`: 64px (w-16 h-16)

**Usage**:
```typescript
import { LoadingSpinner } from '@/components/LoadingSpinner';

<LoadingSpinner size="lg" text="Loading dashboard..." />

<LoadingSpinner size="sm" />
```

**Features**:
- Rotating gradient border
- Pulsing blur effect
- Smooth text fade animation
- Indigo/purple color scheme

---

## Form Components

### TrainingForm

**File**: `components/TrainingForm.tsx`

**Purpose**: Form for configuring and triggering model training

**Props**:
```typescript
interface TrainingFormProps {
  onSubmit: (data: TrainRequest) => Promise<void>;
  loading?: boolean;  // Disable form during training
}
```

**Form Fields**:
- **Training End Year**: Number input (e.g., 2000)
- **Test Start Year**: Number input (e.g., 2006)
- **Search Type**: Select dropdown (Grid / Randomized)
- **Iterations**: Number input (e.g., 20)

**Usage**:
```typescript
import { TrainingForm } from '@/components/TrainingForm';
import api from '@/lib/api';

const [loading, setLoading] = useState(false);

const handleTraining = async (data: TrainRequest) => {
  try {
    setLoading(true);
    const result = await api.trainModels(data);
    console.log('Training complete:', result);
  } finally {
    setLoading(false);
  }
};

<TrainingForm onSubmit={handleTraining} loading={loading} />
```

**Features**:
- Smooth fade-in animation
- Form inputs disabled during loading
- Submit button shows loading state
- Gradient button styling (indigo to purple)
- 2-column grid on desktop, stacked on mobile

**Validation**:
- All fields are required
- Numeric inputs have reasonable defaults

---

### PredictionForm

**File**: `components/PredictionForm.tsx`

**Purpose**: Form for inputting environmental features and generating predictions

**Props**:
```typescript
interface PredictionFormProps {
  onSubmit: (data: PredictRequest) => Promise<void>;
  loading?: boolean;  // Disable form during prediction
}
```

**Form Fields**:
- **Rainfall**: Float input in mm (default: 10)
- **Temperature**: Float input in °C (default: 25)
- **Humidity**: Float input 0-100% (default: 60)
- **Previous Runoff**: Float input in mm (default: 5)

**Usage**:
```typescript
import { PredictionForm } from '@/components/PredictionForm';
import api from '@/lib/api';

const [loading, setLoading] = useState(false);

const handlePrediction = async (data: PredictRequest) => {
  try {
    setLoading(true);
    const result = await api.predict(data);
    console.log('Prediction:', result);
  } finally {
    setLoading(false);
  }
};

<PredictionForm onSubmit={handlePrediction} loading={loading} />
```

**Features**:
- Smooth fade-in animation
- Step values for decimal inputs (0.1)
- Submit button shows loading state
- Gradient button styling (cyan to blue)
- 2-column grid on desktop, stacked on mobile
- Reasonable default values

---

## Utility Components

### Layout Patterns

All main pages follow this layout pattern:

```typescript
export default function PageName() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Navbar />
      <Sidebar />
      
      <main className="lg:mr-64 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Page content */}
        </div>
      </main>
    </div>
  );
}
```

**Key Classes**:
- `lg:mr-64`: Right margin for sidebar space on desktop
- `max-w-6xl`: Content max width
- `space-y-8`: Vertical spacing between sections

---

## Styling & Theme

### Color Palette

**Primary**:
- Indigo: `#4f46e5`
- Purple: `#9333ea`

**Accent**:
- Cyan: `#06b6d4`

**Neutral**:
- Background: `#0f172a` (slate-950)
- Card: `bg-white/5`
- Border: `border-white/10`

### Animation Patterns

**Fade In**:
```typescript
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}
```

**Hover Lift**:
```typescript
whileHover={{ y: -4, boxShadow: '0 20px 25px -5rgba(0, 0, 0, 0.2)' }}
```

**Spin**:
```typescript
animate={{ rotate: 360 }}
transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
```

---

## Accessibility

All components follow accessibility best practices:

- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Color contrast compliance
- Screen reader friendly text

---

## Performance Tips

1. **Use Client Components Sparingly**: Only `'use client'` where needed
2. **Memoize Props**: For frequently re-rendered components
3. **Optimize Animations**: Use `will-change` for smooth 60fps
4. **Lazy Load Charts**: Recharts handles this automatically

---

## Component Import Guide

```typescript
// Navigation
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';

// Display
import { MetricCard } from '@/components/MetricCard';
import { ModelComparisonTable } from '@/components/ModelComparisonTable';
import { PredictionChart } from '@/components/PredictionChart';
import { LoadingSpinner } from '@/components/LoadingSpinner';

// Forms
import { TrainingForm } from '@/components/TrainingForm';
import { PredictionForm } from '@/components/PredictionForm';

// UI (shadcn/ui)
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
```

---

## Common Patterns

### Loading States

```typescript
const [loading, setLoading] = useState(false);

if (loading) {
  return <LoadingSpinner size="lg" text="Loading..." />;
}
```

### Error Handling

```typescript
const { toast } = useSonner();

try {
  const result = await api.trainModels(data);
} catch (error) {
  toast.error(error.message);
}
```

### Animation on Mount

```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

---

## Creating New Components

When creating new components, follow these patterns:

1. **Use TypeScript**: Define prop interfaces
2. **Use Client Component**: Add `'use client'` if needed
3. **Use Motion**: Add Framer Motion animations
4. **Use Tailwind**: Style with utility classes
5. **Document Props**: Add JSDoc comments

Example:

```typescript
'use client';

import { motion } from 'framer-motion';

interface NewComponentProps {
  title: string;
  loading?: boolean;
}

export function NewComponent({ title, loading = false }: NewComponentProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 rounded-2xl bg-white/5 border border-white/10"
    >
      {title}
    </motion.div>
  );
}
```
