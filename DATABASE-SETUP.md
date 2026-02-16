# Database Setup Guide - CB Organic Store

## Overview
This guide explains how to convert the ecommerce prototype from localStorage to PostgreSQL database.

## Database Schema

The system uses 5 main tables:

### 1. users
```sql
- id (uuid primary key)
- email (text unique)
- password (text)
- role (text)
- created_at (timestamp)
```

### 2. vendors
```sql
- id (uuid primary key)
- vendor_name (text)
- business_name (text)
- email (text)
- phone (text)
- created_at (timestamp)
```

### 3. categories
```sql
- id (uuid primary key)
- name (text unique)
- created_at (timestamp)
```

### 4. products
```sql
- id (uuid primary key)
- name (text)
- category (text)
- price (numeric)
- stock (int)
- image_url (text)
- created_at (timestamp)
```

### 5. orders
```sql
- id (text primary key)
- customer_email (text)
- total (numeric)
- status (text)
- created_at (timestamp)
```

### 6. order_items
```sql
- id (uuid primary key)
- order_id (text)
- product_id (uuid)
- product_name (text)
- quantity (int)
- price (numeric)
```

## Setup Instructions

### Step 1: Database Setup

1. Create a PostgreSQL database (or use Supabase)
2. Run the SQL schema from `backend/database.sql`

```bash
psql -U your_username -d your_database -f backend/database.sql
```

Or in Supabase:
- Go to SQL Editor
- Copy contents of `backend/database.sql`
- Execute the SQL

### Step 2: Backend Configuration

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env`:
```
PORT=5000
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the backend server:
```bash
npm start
```

The server will run on `http://localhost:5000`

### Step 3: Frontend Integration

1. Add the database scripts to your HTML files:

For admin pages (admin-dashboard.html, admin-products.html, admin-orders.html, admin-add-product.html):
```html
<script src="admin-db.js"></script>
```

For main website (index.html):
```html
<script src="frontend-db.js"></script>
```

2. Remove or comment out old localStorage scripts:
```html
<!-- <script src="admin-script.js"></script> -->
<!-- <script src="data-manager.js"></script> -->
```

### Step 4: Testing

1. Start the backend server:
```bash
cd backend
npm start
```

2. Open the website in a browser

3. Test the following:
   - View products on homepage (should load from database)
   - Admin: Add a product (should save to database)
   - Admin: View products list (should show database products)
   - Admin: Add a category (should save to database)
   - Place an order (should save to database)
   - Admin: View orders (should show database orders)

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category
- `DELETE /api/categories/:id` - Delete category

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create order
- `PUT /api/orders/:id/status` - Update order status

### Vendors
- `GET /api/vendors` - Get all vendors
- `POST /api/vendors` - Create vendor

## Changes Made

### Removed from localStorage:
- Demo product arrays
- Mock order data
- localStorage product lists
- localStorage category management

### Now using Database:
- Products stored in `products` table
- Categories stored in `categories` table
- Orders stored in `orders` and `order_items` tables
- Vendors stored in `vendors` table

### Kept as-is:
- Admin login logic (still uses localStorage)
- Cart functionality (still uses localStorage for now)
- UI layout (no changes)

## Troubleshooting

### Backend won't start
- Check if PostgreSQL/Supabase is running
- Verify `.env` file has correct credentials
- Check if port 5000 is available

### Products not loading
- Check browser console for errors
- Verify backend is running on http://localhost:5000
- Check CORS settings in backend

### Orders not saving
- Verify products have sufficient stock
- Check order_items table for foreign key constraints
- Review backend logs for errors

## Next Steps

1. Implement user authentication with JWT
2. Move cart to database
3. Add image upload to cloud storage
4. Implement vendor-specific product management
5. Add order tracking and notifications
