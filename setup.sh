#!/bin/bash

# Scalable Web App Setup Script
# This script sets up the development environment for the Scalable Web App

echo "🚀 Setting up Scalable Web App Development Environment"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js (v18 or higher) first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm $(npm -v) detected"

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating server .env file..."
    cp env.example .env
    echo "⚠️  Please update server/.env with your MongoDB URI and JWT secret"
fi

# Install client dependencies
echo "📦 Installing client dependencies..."
cd ../client
npm install

# Create .env.local file if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating client .env.local file..."
    echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local
fi

cd ..

echo ""
echo "✅ Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Update server/.env with your MongoDB connection string and JWT secret"
echo "2. Make sure MongoDB is running (local or MongoDB Atlas)"
echo "3. Start the development servers:"
echo "   npm run dev"
echo ""
echo "🌐 The application will be available at:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5000"
echo ""
echo "📚 Documentation:"
echo "   README.md - Project overview and setup"
echo "   API_DOCUMENTATION.md - API endpoints and usage"
echo "   DEPLOYMENT_GUIDE.md - Production deployment guide"
echo "   postman-collection.json - Postman collection for API testing"
echo ""
echo "🎉 Happy coding!"
