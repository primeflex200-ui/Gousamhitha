@echo off
echo ========================================
echo  Pushing Changes to GitHub
echo ========================================
echo.

echo Step 1: Checking Git status...
git status
echo.

echo Step 2: Adding all changes...
git add .
echo.

echo Step 3: Committing changes...
git commit -m "Add Google Sign In with gousamhitha.com domain - Implemented Google OAuth with custom domain - Added Google Sign In/Sign Up buttons - Created database-backed backend (PostgreSQL/Supabase) - Added API endpoints for products, orders, categories - Configured OAuth callback to use gousamhitha.com - Added comprehensive documentation"
echo.

echo Step 4: Pushing to GitHub...
git push origin main
echo.

echo ========================================
echo  Done! Check your GitHub repository
echo ========================================
pause
