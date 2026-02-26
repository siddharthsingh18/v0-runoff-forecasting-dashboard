# How to Sign In

## Mock Authentication Setup

The application now uses **mock authentication** - no backend server is required. You can sign in with any email and the demo password.

## Sign In Credentials

**Email:** Any email address (e.g., `admin@example.com`, `test@test.com`, `you@example.com`)  
**Password:** `password123`

## Step-by-Step Instructions

1. **Visit the login page** at `http://localhost:3000/login`
2. **Enter any email** in the email field
3. **Type `password123`** in the password field
4. **Click "Sign In"**
5. **Wait 1 second** for the mock authentication to process
6. You'll be automatically **redirected to the dashboard**

## What You Can Do After Signing In

Once authenticated, you have full access to:

- ✅ **Dashboard** - View model metrics, performance comparisons, and system status
- ✅ **Analytics** - Explore charts showing predictions, feature importance, and learning curves
- ✅ **Training** - Train models with mock hyperparameter optimization
- ✅ **Predictions** - Generate 3-day runoff forecasts with confidence intervals
- ✅ **Models** - Browse the model registry
- ✅ **Dataset** - Upload and manage datasets
- ✅ **Settings** - Configure account preferences

## How Mock Authentication Works

The login system uses client-side mock authentication:

- Any valid email address is accepted
- Password must be exactly: `password123`
- A mock JWT token is generated and stored in localStorage
- All API calls return simulated data with realistic metrics
- Network delays are simulated for a more realistic experience

## Testing Different Credentials

Try signing in with different emails to test:
- `admin@example.com`
- `engineer@company.com`
- `scientist@research.org`
- Or any email you prefer!

All will work with password: `password123`

## Troubleshooting

**Problem:** Sign in button doesn't respond
- **Solution:** Make sure you're using password `password123` (case-sensitive)

**Problem:** Shows "Invalid email or password" error
- **Solution:** Double-check the password is exactly `password123`

**Problem:** Page doesn't redirect after signing in
- **Solution:** Check browser console (F12) for errors and refresh the page

**Problem:** Shows error about API_URL
- **Solution:** This is normal with mock auth. All data is generated locally.

## Ready to Connect a Real Backend?

When you have a real backend API server running:

1. Update `.env.local`:
   ```
   NEXT_PUBLIC_API_URL=http://your-backend-url:8000
   ```

2. Replace the mock methods in `lib/api.ts` with real API calls

3. Update the `login` method to call your actual auth endpoint:
   ```typescript
   async login(email: string, password: string) {
     const response = await apiClient.post('/auth/login', { email, password });
     return response.data;
   }
   ```

Enjoy exploring the application! 🚀
