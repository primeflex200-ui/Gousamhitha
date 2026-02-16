# Change Google OAuth Display Name to "gousamhitha.com"

## What You're Seeing Now

Currently, Google shows:
- "Sign in to hdlgqdjmleezidpvakjd.supabase.co"
- "Google will allow hdlgqdjmleezidpvakjd.supabase.co to access..."

## What You Want

You want it to show:
- "Sign in to gousamhitha.com"
- "Google will allow gousamhitha.com to access..."

## How to Change It

### Step 1: Go to Google Cloud Console OAuth Consent Screen

**Direct Link:**
https://console.cloud.google.com/apis/credentials/consent

### Step 2: Edit OAuth Consent Screen

1. Click "EDIT APP" button at the top
2. You'll see the "OAuth consent screen" configuration

### Step 3: Update Application Information

Find these fields and update:

**Application name:**
```
gousamhitha.com
```
(This is what users will see in the consent screen)

**Application home page:**
```
https://gousamhitha.com
```

**Application privacy policy link:**
```
https://gousamhitha.com/privacy
```
(Create a simple privacy page or use your main page)

**Application terms of service link:**
```
https://gousamhitha.com/terms
```
(Create a simple terms page or use your main page)

**Authorized domains:**
Add these domains:
```
gousamhitha.com
supabase.co
```

### Step 4: Update Logo (Optional)

Upload your logo (120x120 pixels minimum)
- This will show on the consent screen
- Makes it look more professional

### Step 5: Save Changes

Click "SAVE AND CONTINUE" at the bottom

## Update Redirect URIs

### Step 6: Go to Credentials

**Direct Link:**
https://console.cloud.google.com/apis/credentials

### Step 7: Edit Your OAuth Client

1. Find: `488030012275-q24mqkugm2l0t6hgbc0uvd5lf0lj155q`
2. Click the edit icon (pencil)

### Step 8: Add Your Domain Redirect URIs

Under "Authorized redirect URIs", add:
```
https://gousamhitha.com/auth/callback
https://gousamhitha.com/
https://hdlgqdjmleezidpvakjd.supabase.co/auth/v1/callback
```

Keep the Supabase one - you need both!

### Step 9: Add Authorized JavaScript Origins

Under "Authorized JavaScript origins", add:
```
https://gousamhitha.com
https://hdlgqdjmleezidpvakjd.supabase.co
```

### Step 10: Save

Click "SAVE"

## Update Supabase Settings

### Step 11: Go to Supabase Auth Settings

**Direct Link:**
https://supabase.com/dashboard/project/hdlgqdjmleezidpvakjd/auth/url-configuration

### Step 12: Update Site URL

**Site URL:**
```
https://gousamhitha.com
```

### Step 13: Add Redirect URLs

**Redirect URLs** (add these):
```
https://gousamhitha.com/*
https://gousamhitha.com/index.html
https://gousamhitha.com/auth/callback
```

### Step 14: Save

Click "Save"

## Update Your Code (Already Done!)

I've already updated `google-auth-supabase.js` to use `gousamhitha.com` as the site URL.

## Domain Setup

### If You Don't Have gousamhitha.com Set Up Yet:

1. **Buy the domain** (if you haven't)
   - GoDaddy, Namecheap, Google Domains, etc.

2. **Point it to your hosting**
   - If using Vercel/Netlify: Add custom domain in dashboard
   - If using your own server: Point A record to your IP

3. **Set up SSL certificate**
   - Most hosting providers do this automatically
   - Use Let's Encrypt if self-hosting

4. **Deploy your site to gousamhitha.com**

## Testing

After all changes:

1. Go to https://gousamhitha.com
2. Click "Sign In"
3. Click "Sign in with Google"
4. You should now see:
   - "Sign in to gousamhitha.com" ✅
   - "Google will allow gousamhitha.com to access..." ✅

## Important Notes

### Why Keep Supabase URL?

You need BOTH URLs because:
- Supabase handles the OAuth callback
- Then redirects to your domain
- Both need to be authorized

### Verification Status

If your app is not verified, users will see:
- "This app isn't verified"
- "Google hasn't verified this app"

To remove this warning:
1. Go through Google's verification process
2. Or keep it in testing mode (up to 100 test users)

### Testing Mode

While in testing mode:
- Add test users in OAuth consent screen
- Only those users can sign in
- No verification warning for test users

## Quick Links

**OAuth Consent Screen:**
https://console.cloud.google.com/apis/credentials/consent

**OAuth Credentials:**
https://console.cloud.google.com/apis/credentials

**Supabase URL Config:**
https://supabase.com/dashboard/project/hdlgqdjmleezidpvakjd/auth/url-configuration

## Summary

To change the name from "hdlgqdjmleezidpvakjd.supabase.co" to "gousamhitha.com":

1. ✅ Update OAuth consent screen → Application name
2. ✅ Add gousamhitha.com to authorized domains
3. ✅ Add redirect URIs for gousamhitha.com
4. ✅ Update Supabase site URL
5. ✅ Deploy your site to gousamhitha.com
6. ✅ Test the flow

The display name comes from the "Application name" field in OAuth consent screen!
