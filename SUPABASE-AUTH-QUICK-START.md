# 🚀 Supabase Auth - Quick Start (2 Minutes)

## ✅ What's Done:

Your authentication now uses Supabase instead of localStorage!

## 🔧 One SQL Command to Run:

**Go here:**
https://supabase.com/dashboard/project/hdlgqdjmleezidpvakjd/editor

**Paste and run this:**

```sql
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    role TEXT DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
```

## ✅ That's It!

Now test:
1. Open `index.html`
2. Click "Sign In" → "Sign Up"
3. Create account
4. Should auto-login!

## 🎯 Role Assignment:

- `ruthvik@blockfortrust.com` → admin (goes to admin dashboard)
- Any other email → customer (goes to main page)

## 📚 More Details:

- `SUPABASE-AUTH-SETUP.md` - Complete guide
- `AUTH-MIGRATION-COMPLETE.md` - What changed

## 🎉 Done!

Authentication is now secure with Supabase! No more localStorage! 🔐
