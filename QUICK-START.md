# Quick Start Guide - Database Backend

## Prerequisites
- PostgreSQL installed OR Supabase account
- Node.js installed
- Web browser

## 5-Minute Setup

### Step 1: Database (Choose One)

**Option A: Supabase (Recommended)**
1. Go to https://supabase.com
2. Create new project
3. Go to SQL Editor
4. Copy all content from `backend/database.sql`
5. Execute the SQL
6. Copy your project URL and anon key

**Option B: Local PostgreSQL**
```bash
createdb cborganic
psql -d cborganic -f backend/database.sql
```

### Step 2: Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```
PORT=5000
SUPABASE_URL=your_project_url_here
SUPABASE_ANON_KEY=your_anon_key_here
```

Start server:
```bash
npm start
```

You should see: `Server running on port 5000`

### Step 3: Update HTML Files

Add these script tags to your HTML files:

**Admin Pages** (admin-dashboard.html, admin-products.html, admin-orders.html, admin-add-product.html):
```html
<!-- Add BEFORE closing </body> tag -->
<script src="admin-db.js"></script>
```

**Main Website** (index.html):
```html
<!-- Add BEFORE closing </body> tag -->
<script src="frontend-db.js"></script>
```

**Comment out old scripts:**
```html
<!-- <script src="admin-script.js"></script> -->
<!-- <script src="data-manager.js"></script> -->
```

### Step 4: Test

1. Open `admin.html` in browser
2. Login with existing credentials
3. Go to "Add Product"
4. Add a test product
5. Open `index.html`
6. You should see the product!

## Verify It's Working

### Test 1: Categories Loaded
- Open browser console (F12)
- Go to Network tab
- Refresh page
- Look for request to `http://localhost:5000/api/categories`
- Should return 7 categories

### Test 2: Add Product
- Login to admin
- Add a product with name "Test Product"
- Check database: `SELECT * FROM products;`
- Should see your product

### Test 3: View on Website
- Open main website
- Should see "Test Product" displayed
- This confirms database → frontend flow works

## Common Issues

### "Failed to fetch"
- Backend not running → Run `npm start` in backend folder
- Wrong URL → Check API_BASE_URL in scripts

### "CORS error"
- Backend has CORS enabled, but check browser console
- Verify backend is on http://localhost:5000

### "Products not showing"
- Check browser console for errors
- Verify backend is running
- Check database has products: `SELECT * FROM products;`

### "Cannot connect to database"
- Check .env file has correct credentials
- Verify Supabase project is active
- Test connection: `node test-connection.js`

## What's Different Now?

**Before (localStorage):**
```javascript
localStorage.setItem('products', JSON.stringify(products));
```

**After (Database):**
```javascript
await fetch('http://localhost:5000/api/products', {
    method: 'POST',
    body: JSON.stringify(product)
});
```

## File Structure

```
ecommerce-main/
├── backend/
│   ├── database.sql          ← Database schema
│   ├── server.js             ← Express server
│   ├── db.js                 ← Database connection
│   ├── controllers/          ← Business logic
│   ├── routes/               ← API endpoints
│   └── .env                  ← Configuration
├── admin-db.js               ← Admin panel integration
├── frontend-db.js            ← Website integration
└── index.html                ← Main website
```

## Next Steps

1. ✓ Database setup complete
2. ✓ Backend running
3. ✓ Frontend connected
4. → Add more products
5. → Test order placement
6. → Deploy to production

## Support

Check these files for more details:
- `DATABASE-SETUP.md` - Detailed setup guide
- `CONVERSION-SUMMARY.md` - What changed
- `backend/test-api.js` - API testing script
