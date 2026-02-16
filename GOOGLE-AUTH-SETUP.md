# Google Authentication Setup Guide

## Overview
This guide explains how to set up Google Sign In / Sign Up for the CB Organic Store.

## Features Added
- ✓ "Sign in with Google" button on Sign In form
- ✓ "Sign up with Google" button on Sign Up form
- ✓ Google OAuth 2.0 integration
- ✓ Automatic user creation/login
- ✓ Secure token exchange on backend

## Step 1: Get Google OAuth Credentials

### 1.1 Go to Google Cloud Console
1. Visit https://console.cloud.google.com
2. Create a new project or select existing one
3. Name it "CB Organic Store" (or your preferred name)

### 1.2 Enable Google+ API
1. Go to "APIs & Services" > "Library"
2. Search for "Google+ API"
3. Click "Enable"

### 1.3 Create OAuth Credentials
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Choose "Web application"
4. Configure:
   - Name: "CB Organic Web Client"
   - Authorized JavaScript origins:
     - http://localhost:3000 (for development)
     - https://yourdomain.com (for production)
   - Authorized redirect URIs:
     - http://localhost:3000/auth/google/callback
     - https://yourdomain.com/auth/google/callback
5. Click "Create"
6. Copy your Client ID and Client Secret

## Step 2: Configure Backend

### 2.1 Update .env file
Add these variables to `backend/.env`:

```env
# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
```

### 2.2 Install Dependencies
```bash
cd backend
npm install google-auth-library
```

### 2.3 Update Database
Run the updated schema to add Google auth fields:

```sql
ALTER TABLE users ADD COLUMN google_id TEXT UNIQUE;
ALTER TABLE users ADD COLUMN picture TEXT;
ALTER TABLE users ADD COLUMN name TEXT;
```

Or drop and recreate the users table with the new schema from `database.sql`.

## Step 3: Configure Frontend

### 3.1 Update Google Client ID
Edit `google-auth.js` and replace the placeholder:

```javascript
const GOOGLE_CONFIG = {
    clientId: 'YOUR_ACTUAL_CLIENT_ID_HERE', // Replace this
    redirectUri: window.location.origin + '/auth/google/callback',
    // ... rest of config
};
```

### 3.2 Files Already Added
The following files have been created and linked:
- ✓ `google-auth.css` - Styling for Google button
- ✓ `google-auth.js` - Frontend OAuth logic
- ✓ `backend/controllers/googleAuthController.js` - Backend logic
- ✓ `backend/routes/googleAuthRoutes.js` - API routes

## Step 4: Test the Integration

### 4.1 Start Backend
```bash
cd backend
npm start
```

### 4.2 Open Website
1. Open `index.html` in browser
2. Click "Sign In" button
3. You should see "Sign in with Google" button

### 4.3 Test Sign In Flow
1. Click "Sign in with Google"
2. Should redirect to Google login page
3. Select your Google account
4. Should redirect back to your site
5. Should be logged in automatically

### 4.4 Test Sign Up Flow
1. Click "Sign Up" tab
2. Click "Sign up with Google"
3. Should redirect to Google
4. Should create new account and log in

## How It Works

### Frontend Flow
```
User clicks "Sign in with Google"
    ↓
Redirect to Google OAuth page
    ↓
User authorizes
    ↓
Google redirects back with code
    ↓
Frontend sends code to backend
    ↓
Backend exchanges code for user info
    ↓
Backend creates/finds user in database
    ↓
User is logged in
```

### Backend API Endpoints

**POST /api/auth/google**
- Exchanges authorization code for user info
- Request: `{ code: "auth_code" }`
- Response: `{ success: true, user: {...} }`

**POST /api/auth/google/signin**
- Signs in existing user with Google
- Request: `{ email, name, googleId, picture }`
- Response: `{ success: true, user: {...} }`

**POST /api/auth/google/signup**
- Creates new user with Google
- Request: `{ email, name, googleId, picture }`
- Response: `{ success: true, user: {...} }`

## Security Features

### CSRF Protection
- Random state parameter generated
- Verified on callback
- Prevents cross-site request forgery

### Token Exchange
- Authorization code exchanged on backend
- Client secret never exposed to frontend
- Secure token validation

### User Verification
- Email verification from Google
- Google ID stored for future logins
- Profile picture saved

## Customization

### Change Button Text
Edit `index.html`:
```html
<button type="button" class="btn-google" onclick="handleGoogleSignIn()">
    <!-- SVG icon -->
    Your Custom Text Here
</button>
```

### Change Button Style
Edit `google-auth.css`:
```css
.btn-google {
    background: your-color;
    border: your-border;
    /* ... */
}
```

### Add More OAuth Providers
Follow similar pattern:
1. Create `facebook-auth.js`
2. Add button to forms
3. Create backend controller
4. Add routes

## Troubleshooting

### "redirect_uri_mismatch" Error
- Check Google Console redirect URIs match exactly
- Include protocol (http/https)
- Include port if using localhost

### "invalid_client" Error
- Verify Client ID and Secret in .env
- Check they match Google Console

### User Not Created
- Check backend logs
- Verify database connection
- Check users table has google_id column

### Button Not Showing
- Check browser console for errors
- Verify google-auth.css is loaded
- Check google-auth.js is loaded

## Production Deployment

### 1. Update Redirect URIs
In Google Console, add production URLs:
```
https://yourdomain.com
https://yourdomain.com/auth/google/callback
```

### 2. Update Environment Variables
```env
GOOGLE_REDIRECT_URI=https://yourdomain.com/auth/google/callback
```

### 3. Update Frontend Config
In `google-auth.js`:
```javascript
redirectUri: 'https://yourdomain.com/auth/google/callback'
```

### 4. Enable HTTPS
- Google OAuth requires HTTPS in production
- Use Let's Encrypt or similar for SSL certificate

## Additional Resources

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Google Sign-In Branding Guidelines](https://developers.google.com/identity/branding-guidelines)
- [OAuth 2.0 Security Best Practices](https://tools.ietf.org/html/rfc6749#section-10)

## Support

If you encounter issues:
1. Check browser console for errors
2. Check backend logs
3. Verify all configuration steps
4. Test with different Google accounts
5. Check Google Cloud Console for API quotas

## Next Steps

After Google Auth is working:
- [ ] Add Facebook Login
- [ ] Add Apple Sign In
- [ ] Add Two-Factor Authentication
- [ ] Add Email Verification
- [ ] Add Password Reset
