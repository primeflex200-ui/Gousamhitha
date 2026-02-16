# CB Organic Store - Ecommerce Platform

A full-featured ecommerce platform for organic products with Google Sign In integration and database backend.

## 🌟 Features

### Authentication
- ✅ Google Sign In / Sign Up
- ✅ Traditional email/password login
- ✅ Admin authentication
- ✅ Custom domain OAuth (gousamhitha.com)

### Frontend
- ✅ Product catalog with categories
- ✅ Shopping cart
- ✅ Checkout process
- ✅ Order management
- ✅ Responsive design
- ✅ Google OAuth integration

### Backend
- ✅ PostgreSQL database (Supabase)
- ✅ RESTful API
- ✅ Product management
- ✅ Order processing
- ✅ Category management
- ✅ Vendor management

### Admin Panel
- ✅ Product CRUD operations
- ✅ Order management
- ✅ Category management
- ✅ Vendor management
- ✅ Dashboard analytics

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL or Supabase account
- Google OAuth credentials

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd ecommerce-main
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Configure environment variables**

Create `backend/.env`:
```env
PORT=5000

# Database
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=https://yourdomain.com/auth/google/callback
```

4. **Set up database**
```bash
# Run the SQL schema
psql -U username -d database -f backend/database.sql
```

5. **Start backend server**
```bash
npm start
```

6. **Open frontend**
```bash
# Open index.html in browser or use a local server
```

## 📁 Project Structure

```
ecommerce-main/
├── backend/
│   ├── controllers/      # Business logic
│   ├── routes/          # API routes
│   ├── middleware/      # Auth middleware
│   ├── database.sql     # Database schema
│   ├── server.js        # Express server
│   └── .env            # Environment variables
├── auth/
│   └── google/
│       └── callback.html # OAuth callback
├── index.html           # Main page
├── cart.html           # Shopping cart
├── checkout.html       # Checkout page
├── admin-*.html        # Admin pages
├── google-auth-direct.js # Google OAuth
├── api-client.js       # API wrapper
├── admin-db.js         # Admin integration
├── frontend-db.js      # Frontend integration
└── styles.css          # Styles
```

## 🔧 Configuration

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create OAuth 2.0 credentials
3. Add authorized redirect URIs:
   - `https://yourdomain.com/auth/google/callback`
4. Add authorized JavaScript origins:
   - `https://yourdomain.com`
5. Update `.env` with credentials

### Database Setup

1. Create Supabase project or PostgreSQL database
2. Run `backend/database.sql`
3. Update connection details in `.env`

## 📚 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create order
- `PUT /api/orders/:id/status` - Update order status

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category
- `DELETE /api/categories/:id` - Delete category

### Vendors
- `GET /api/vendors` - Get all vendors
- `POST /api/vendors` - Create vendor

### Google Auth
- `POST /api/auth/google` - Exchange code for user info
- `POST /api/auth/google/signin` - Sign in with Google
- `POST /api/auth/google/signup` - Sign up with Google

## 🎨 Features

### User Features
- Browse products by category
- Add to cart
- Checkout with order summary
- Google Sign In for quick access
- Order tracking

### Admin Features
- Add/edit/delete products
- Manage categories
- View and update orders
- Manage vendors
- Dashboard analytics

## 🔐 Security

- OAuth 2.0 for Google authentication
- Environment variables for sensitive data
- CSRF protection with state parameter
- Secure token exchange
- Input validation

## 📖 Documentation

- `DATABASE-SETUP.md` - Database configuration
- `GOOGLE-AUTH-GOUSAMHITHA.md` - Google OAuth setup
- `CONVERSION-SUMMARY.md` - localStorage to database conversion
- `QUICK-START.md` - Quick start guide

## 🚀 Deployment

### Frontend
Deploy to:
- Vercel
- Netlify
- GitHub Pages
- Your own hosting

### Backend
Deploy to:
- Heroku
- Railway
- Render
- Your own server

### Environment Variables
Make sure to set all environment variables in your hosting platform.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Google OAuth for authentication
- Supabase for database hosting
- Express.js for backend framework

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ for CB Organic Store**
