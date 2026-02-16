# Quick Fix: Change OAuth Name to "gousamhitha.com"

## The Problem

Google shows: "Sign in to hdlgqdjmleezidpvakjd.supabase.co"
You want: "Sign in to gousamhitha.com"

## The Solution (2 Minutes)

### Step 1: Edit OAuth Consent Screen

**Go here:**
https://console.cloud.google.com/apis/credentials/consent

**Click:** "EDIT APP"

**Change this field:**
```
Application name: gousamhitha.com
```

**Click:** "SAVE AND CONTINUE"

### Step 2: Add Authorized Domain

On the same page, scroll to "Authorized domains"

**Add:**
```
gousamhitha.com
```

**Click:** "SAVE AND CONTINUE"

### Step 3: Update Redirect URIs

**Go here:**
https://console.cloud.google.com/apis/credentials

**Find your OAuth client:** `488030012275-q24mqkugm2l0t6hgbc0uvd5lf0lj155q`

**Click the edit icon (pencil)**

**Under "Authorized redirect URIs", add:**
```
https://gousamhitha.com/auth/callback
https://gousamhitha.com/
```

**Keep the existing Supabase one!**

**Click:** "SAVE"

### Step 4: Update Supabase

**Go here:**
https://supabase.com/dashboard/project/hdlgqdjmleezidpvakjd/auth/url-configuration

**Site URL:**
```
https://gousamhitha.com
```

**Redirect URLs (add):**
```
https://gousamhitha.com/*
```

**Click:** "Save"

## Done! ✅

Now when users sign in with Google, they'll see:
- "Sign in to gousamhitha.com" ✅
- "Google will allow gousamhitha.com to access..." ✅

## Important

You need to have gousamhitha.com actually set up and pointing to your site for this to work properly!

## Code Already Updated

I've already updated your code to use gousamhitha.com as the redirect URL.

## Test It

1. Deploy your site to https://gousamhitha.com
2. Click "Sign in with Google"
3. You should see "gousamhitha.com" instead of the Supabase URL

---

**The key is changing "Application name" in OAuth consent screen!**
