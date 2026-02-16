# Quick Configuration - Google Sign In

## What You Need to Provide

I've set up the complete Google Sign In infrastructure. You just need to provide your Google OAuth credentials.

## Step 1: Get Your Credentials

1. Go to: https://console.cloud.google.com
2. Create a project (or use existing)
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Copy your **Client ID** and **Client Secret**

## Step 2: Configure Backend

Edit `backend/.env` and add:

```env
GOOGLE_CLIENT_ID=paste_your_client_id_here
GOOGLE_CLIENT_SECRET=paste_your_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
```

## Step 3: Configure Frontend

Edit `google-auth.js` line 10:

```javascript
const GOOGLE_CONFIG = {
    clientId: 'paste_your_client_id_here', // ← Replace this
    // ... rest stays the same
};
```

## Step 4: Set Redirect URI in Google Console

In Google Cloud Console, add these authorized redirect URIs:
- `http://localhost:3000/auth/google/callback`
- `http://localhost:5000/auth/google/callback`
- Your production URL when ready

## Step 5: Install & Run

```bash
cd backend
npm install
npm start
```

## That's It!

Open your website and click "Sign in with Google" - it should work!

## What I've Already Done

✓ Created Google sign in button with official styling
✓ Added OAuth 2.0 flow (frontend + backend)
✓ Created API endpoints for authentication
✓ Updated database schema for Google users
✓ Added security (CSRF protection, token validation)
✓ Styled the button to match Google guidelines
✓ Added error handling and user feedback

## Files Created

**Frontend:**
- `google-auth.css` - Button styling
- `google-auth.js` - OAuth logic
- Updated `index.html` - Added buttons

**Backend:**
- `controllers/googleAuthController.js` - Auth logic
- `routes/googleAuthRoutes.js` - API routes
- Updated `server.js` - Added routes
- Updated `database.sql` - Added Google fields

**Documentation:**
- `GOOGLE-AUTH-SETUP.md` - Complete guide
- `CONFIGURE-GOOGLE.md` - This file
- `.env.example` - Configuration template

## When You Provide Your API Keys

Just tell me:
1. Your Google Client ID
2. Your Google Client Secret

And I'll update the configuration files for you!

## Testing

After configuration:
1. Open website
2. Click "Sign In"
3. Click "Sign in with Google"
4. Should redirect to Google
5. Select account
6. Should redirect back and log you in

## Need Help?

Check `GOOGLE-AUTH-SETUP.md` for detailed instructions and troubleshooting.
