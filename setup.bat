@echo off
echo 🚀 Setting up Scalable Web App Development Environment
echo ==================================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js (v18 or higher) first.
    pause
    exit /b 1
)

echo ✅ Node.js detected

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo ✅ npm detected

REM Install root dependencies
echo 📦 Installing root dependencies...
npm install

REM Install server dependencies
echo 📦 Installing server dependencies...
cd server
npm install

REM Create .env file if it doesn't exist
if not exist .env (
    echo 📝 Creating server .env file...
    copy env.example .env
    echo ⚠️  Please update server/.env with your MongoDB URI and JWT secret
)

REM Install client dependencies
echo 📦 Installing client dependencies...
cd ..\client
npm install

REM Create .env.local file if it doesn't exist
if not exist .env.local (
    echo 📝 Creating client .env.local file...
    echo NEXT_PUBLIC_API_URL=http://localhost:5000/api > .env.local
)

cd ..

echo.
echo ✅ Setup completed successfully!
echo.
echo 📋 Next steps:
echo 1. Update server/.env with your MongoDB connection string and JWT secret
echo 2. Make sure MongoDB is running (local or MongoDB Atlas)
echo 3. Start the development servers:
echo    npm run dev
echo.
echo 🌐 The application will be available at:
echo    Frontend: http://localhost:3000
echo    Backend:  http://localhost:5000
echo.
echo 📚 Documentation:
echo    README.md - Project overview and setup
echo    API_DOCUMENTATION.md - API endpoints and usage
echo    DEPLOYMENT_GUIDE.md - Production deployment guide
echo    postman-collection.json - Postman collection for API testing
echo.
echo 🎉 Happy coding!
pause
