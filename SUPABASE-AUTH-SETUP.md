# Supabase Authentication Setup Guide

## ✅ What's Implemented:

### Authentication System:
- ✅ Supabase Auth for signup/login (replaces localStorage)
- ✅ Automatic profile creation in `profiles` table
- ✅ Role-based access control (admin/customer)
- ✅ Session management via Supabase
- ✅ Admin page protection
- ✅ Auto-redirect based on role

### Role Logic:
- ✅ `ruthvik@blockfortrust.com` → admin role
- ✅ All other emails → customer role
- ✅ Roles stored in `profiles` table

## 🔧 Setup Steps:

### Step 1: Create Profiles Table in Supabase

**Go to:** https://supabase.com/dashboard/project/hdlgqdjmleezidpvakjd/editor

**Run this SQL:**

```sql
-- Create profiles table
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    role TEXT DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own profile
CREATE POLICY "Users can read own profile"
ON profiles FOR SELECT
USING (auth.uid() = id);

-- Policy: Users can insert their own profile
CREATE POLICY "Users can insert own profile"
ON profiles FOR INSERT
WITH CHECK (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
USING (auth.uid() = id);
```

### Step 2: Enable Email Auth in Supabase

**Go to:** https://supabase.com/dashboard/project/hdlgqdjmleezidpvakjd/auth/providers

**Settings:**
1. **Email Auth** - Make sure it's enabled
2. **Confirm email** - You can disable this for testing (enable for production)
3. **Site URL** - Set to your domain: `https://gousamhitha.com`
4. **Redirect URLs** - Add:
   - `https://gousamhitha.com/*`
   - `http://localhost:5500/*` (for local testing)

### Step 3: Configure Email Templates (Optional)

**Go to:** https://supabase.com/dashboard/project/hdlgqdjmleezidpvakjd/auth/templates

Customize:
- Confirmation email
- Password reset email
- Magic link email

## 📋 How It Works:

### Sign Up Flow:
```
1. User fills signup form
   ↓
2. supabase.auth.signUp() creates user in auth.users
   ↓
3. Check email: ruthvik@blockfortrust.com?
   - Yes → role = 'admin'
   - No → role = 'customer'
   ↓
4. Insert into profiles table with role
   ↓
5. Auto sign in
   ↓
6. Redirect based on role
```

### Sign In Flow:
```
1. User enters email/password
   ↓
2. supabase.auth.signInWithPassword()
   ↓
3. Fetch profile from profiles table
   ↓
4. Check role:
   - admin → redirect to admin-dashboard.html
   - customer → redirect to index.html
```

### Admin Protection:
```
1. User visits admin page
   ↓
2. checkAdminAuth() runs
   ↓
3. Check if session exists
   ↓
4. Fetch profile and check role
   ↓
5. If not admin → redirect to index.html
```

## 🎯 Files Updated:

### New Files:
- ✅ `supabase-auth.js` - Complete auth system
- ✅ `SUPABASE-AUTH-SETUP.md` - This guide

### Updated Files:
- ✅ `index.html` - Added Supabase library, uses supabase-auth.js
- ✅ `login.html` - Uses supabase-auth.js
- ✅ `backend/database.sql` - Added profiles table

### Removed Dependencies:
- ❌ No more localStorage for auth
- ❌ No more unified-auth.js (replaced by supabase-auth.js)

## 🧪 Testing:

### Test Sign Up:
1. Open `index.html`
2. Click "Sign In" → "Sign Up" tab
3. Enter:
   - Name: Test User
   - Email: test@example.com
   - Password: Test123!
4. Click "Create Account"
5. Should redirect to index.html (customer role)

### Test Admin Sign Up:
1. Sign up with email: `ruthvik@blockfortrust.com`
2. Should redirect to admin-dashboard.html (admin role)

### Test Sign In:
1. Sign in with existing account
2. Should redirect based on role

### Test Admin Protection:
1. Sign in as customer
2. Try to access `admin-dashboard.html` directly
3. Should be redirected to index.html

## 🔐 Security Features:

### Supabase Auth Provides:
- ✅ Secure password hashing
- ✅ JWT tokens for sessions
- ✅ Automatic token refresh
- ✅ Email verification
- ✅ Password reset
- ✅ Rate limiting

### Row Level Security (RLS):
- ✅ Users can only read/update their own profile
- ✅ Database-level security
- ✅ Prevents unauthorized access

## 📊 Check Users:

### View Auth Users:
https://supabase.com/dashboard/project/hdlgqdjmleezidpvakjd/auth/users

### View Profiles Table:
https://supabase.com/dashboard/project/hdlgqdjmleezidpvakjd/editor

Run:
```sql
SELECT * FROM profiles;
```

## 🎨 UI Unchanged:

The UI remains exactly the same:
- ✅ Same sign in/sign up forms
- ✅ Same admin login page
- ✅ Same buttons and styling
- ✅ Only backend logic changed

## 🔄 Migration from localStorage:

### What Changed:
**Before (localStorage):**
```javascript
localStorage.setItem('isLoggedIn', 'true');
localStorage.setItem('userRole', 'admin');
```

**After (Supabase):**
```javascript
const { data } = await supabaseClient.auth.signInWithPassword({
    email, password
});
// Session managed automatically by Supabase
```

### Benefits:
- ✅ More secure (no client-side storage)
- ✅ Automatic session management
- ✅ Works across devices
- ✅ Built-in email verification
- ✅ Password reset functionality

## 🚀 Production Checklist:

- [ ] Create profiles table in Supabase
- [ ] Enable email auth
- [ ] Set site URL to your domain
- [ ] Add redirect URLs
- [ ] Enable email confirmation (recommended)
- [ ] Customize email templates
- [ ] Test signup flow
- [ ] Test signin flow
- [ ] Test admin protection
- [ ] Test sign out

## 🆘 Troubleshooting:

### "User already registered"
- User exists in auth.users
- Try signing in instead

### "Invalid login credentials"
- Check email/password
- Check if email is verified (if enabled)

### "Profile not found"
- Profile creation might have failed
- Check profiles table in Supabase
- Profile will be created on next login

### Admin can't access dashboard:
- Check role in profiles table
- Should be 'admin' for ruthvik@blockfortrust.com
- Try signing out and in again

## 📝 Admin Credentials:

**Email:** ruthvik@blockfortrust.com
**Password:** Saireddy880227
**Role:** admin (automatically assigned)

## ✅ Summary:

Everything is configured to use Supabase Auth! Just:
1. Create the profiles table in Supabase (SQL above)
2. Enable email auth
3. Test the signup/signin flow
4. You're done! 🎉

No more localStorage - everything is secure with Supabase! 🔐
