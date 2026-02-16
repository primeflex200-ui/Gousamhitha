# 🔧 Supabase Auth Debug Guide

## Problem: Users not appearing in Supabase after signup

This is almost always caused by **email confirmation being enabled**.

## Quick Fix Steps:

### Step 1: Disable Email Confirmation

1. Go to: https://supabase.com/dashboard/project/hdlgqdjmleezidpvakjd/auth/providers

2. Click on **"Email"** provider

3. Look for these settings:
   - **"Enable email confirmations"** - Turn this OFF
   - **"Confirm email"** - Uncheck this box
   - **"Secure email change"** - Can leave as is

4. Click **"Save"**

### Step 2: Test with Debug Page

1. Open: `test-supabase-auth.html` in your browser

2. Try signing up with a test email:
   - Email: `test@example.com`
   - Password: `test123` (min 6 characters)

3. Click "Test Signup"

4. Check the result:
   - ✅ **"User created and logged in"** = Email confirmation is OFF (GOOD!)
   - ⚠️ **"Email confirmation required"** = Email confirmation is ON (BAD!)

### Step 3: Verify in Supabase Dashboard

1. Go to: https://supabase.com/dashboard/project/hdlgqdjmleezidpvakjd/auth/users

2. You should see your test user in the list

3. Check "Email Confirmed" column:
   - Should show a checkmark ✓ or timestamp

### Step 4: Test Login

1. In `test-supabase-auth.html`, scroll to "Test Login"

2. Enter the same credentials you used for signup

3. Click "Test Login"

4. Should show: ✅ "Login successful!"

## Common Issues:

### Issue 1: "Invalid login credentials"
**Cause:** Email confirmation is enabled, and you haven't confirmed your email

**Fix:** 
- Disable email confirmation (Step 1 above)
- Delete the test user from Supabase
- Sign up again

### Issue 2: "User already registered"
**Cause:** You tried signing up with the same email multiple times

**Fix:**
- Go to Supabase Auth Users
- Delete the existing user
- Try signing up again

### Issue 3: No users showing in Supabase
**Cause:** Signup is failing silently

**Fix:**
- Open browser console (F12)
- Try signing up
- Look for error messages in console
- Check the error details

## How to Check Email Confirmation Status:

### Method 1: Check Auth Settings
1. Go to: https://supabase.com/dashboard/project/hdlgqdjmleezidpvakjd/auth/providers
2. Click "Email"
3. Look at "Enable email confirmations" toggle

### Method 2: Test Signup Response
When you sign up, check the console logs:
```javascript
// If email confirmation is DISABLED:
Session: EXISTS  // ✅ Good!

// If email confirmation is ENABLED:
Session: NULL    // ❌ Bad!
```

## Expected Behavior (After Fix):

### Signup:
1. User fills signup form
2. Clicks "Create Account"
3. Console shows: "User created: [user-id]"
4. Console shows: "Session: EXISTS"
5. User appears in Supabase Auth Users immediately
6. User is redirected to home page

### Login:
1. User fills login form
2. Clicks "Sign In"
3. Console shows: "User signed in: [user-id]"
4. Console shows: "Session: EXISTS"
5. User is redirected based on role

## Debug Checklist:

- [ ] Email confirmation is disabled in Supabase
- [ ] Supabase client initializes (check console: "Supabase client initialized: SUCCESS")
- [ ] Signup creates user in Supabase Auth Users
- [ ] Signup returns a session (not null)
- [ ] Login works with same credentials
- [ ] Session persists after page reload

## Test Files:

1. **test-supabase-auth.html** - Simple test page with detailed logging
2. **index.html** - Main website with full auth system
3. **supabase-auth.js** - Auth implementation with console logging

## Console Logs to Look For:

### Successful Signup:
```
=== SIGNUP ATTEMPT ===
Email: test@example.com
Password length: 7
Calling supabase.auth.signUp...
Signup response: { data: {...}, error: null }
User created: abc-123-def
User email confirmed: 2024-01-15T10:30:00Z
Session: EXISTS
Assigned role: customer
Creating profile...
Profile created successfully
```

### Successful Login:
```
=== SIGNIN ATTEMPT ===
Email: test@example.com
Password length: 7
Calling supabase.auth.signInWithPassword...
Signin response: { data: {...}, error: null }
User signed in: abc-123-def
Session: EXISTS
Fetching profile...
Profile fetch result: { profile: {...}, profileError: null }
Final profile: { id: "...", email: "...", role: "customer" }
Redirecting to home page
```

## Still Not Working?

1. Open browser console (F12)
2. Try signing up
3. Copy ALL console logs
4. Check for any red error messages
5. Share the error details

## Quick Test Command:

Open console and run:
```javascript
// Test Supabase connection
console.log('Supabase client:', supabaseClient);

// Test signup
await supabaseClient.auth.signUp({
    email: 'test@example.com',
    password: 'test123'
});

// Check result in console
```

## Summary:

The main issue is **email confirmation**. Once disabled:
- Signup creates user immediately
- User appears in Supabase Auth Users
- Login works right away
- No email confirmation needed

**Disable email confirmation and everything will work!** ✅
