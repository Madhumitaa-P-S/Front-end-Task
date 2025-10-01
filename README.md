# Scalable Web App - Frontend Developer Intern Assignment

A modern, scalable web application with authentication and dashboard features built with React/Next.js frontend and Node.js/Express backend.

## 🚀 Features

### ✅ Frontend (Primary Focus)
- **React.js with Next.js** - Modern React framework with App Router
- **Responsive Design** - Built with TailwindCSS for mobile-first design
- **Form Validation** - Client-side validation with react-hook-form
- **Protected Routes** - JWT-based authentication with protected dashboard
- **Modern UI/UX** - Clean, intuitive interface with smooth animations

### ✅ Backend (Supportive)
- **Node.js/Express** - Lightweight and scalable backend
- **JWT Authentication** - Secure token-based authentication
- **MongoDB Integration** - NoSQL database with Mongoose ODM
- **RESTful APIs** - Well-structured API endpoints
- **Security Middleware** - Helmet, CORS, rate limiting

### ✅ Dashboard Features
- **User Profile Management** - View and edit user information
- **Task CRUD Operations** - Create, read, update, delete tasks
- **Search & Filter** - Advanced filtering and search functionality
- **Statistics Dashboard** - Task statistics and analytics
- **Responsive Design** - Works seamlessly on all devices

### ✅ Security & Scalability
- **Password Hashing** - bcrypt for secure password storage
- **JWT Middleware** - Token validation and user authentication
- **Input Validation** - Both client and server-side validation
- **Error Handling** - Comprehensive error handling and logging
- **Modular Architecture** - Scalable project structure

## 🛠️ Tech Stack

### Frontend
- **Next.js 13** - React framework with App Router
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first CSS framework
- **React Hook Form** - Form handling and validation
- **Axios** - HTTP client for API requests
- **React Hot Toast** - Toast notifications
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Express Validator** - Input validation

## 📁 Project Structure

```
scalable-web-app/
├── client/                 # Next.js Frontend
│   ├── src/
│   │   ├── app/           # App Router pages
│   │   ├── components/    # Reusable components
│   │   ├── contexts/      # React contexts
│   │   ├── services/      # API services
│   │   ├── utils/         # Utility functions
│   │   └── types/         # TypeScript types
│   ├── package.json
│   └── tailwind.config.js
├── server/                 # Node.js Backend
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── package.json
│   └── index.js
├── package.json           # Root package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd scalable-web-app
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Environment Setup**
   
   Create `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/scalable-web-app
   JWT_SECRET=your-super-secret-jwt-key-here
   NODE_ENV=development
   ```

4. **Start the application**
   ```bash
   npm run dev
   ```

   This will start both frontend (http://localhost:3000) and backend (http://localhost:5000) servers.

### Alternative Setup

**Start servers separately:**

Backend:
```bash
cd server
npm install
npm run dev
```

Frontend:
```bash
cd client
npm install
npm run dev
```

## 📚 API Documentation

### Authentication Endpoints

#### POST `/api/auth/register`
Register a new user
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### POST `/api/auth/login`
Login user
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### GET `/api/auth/me`
Get current user (requires authentication)

### Task Endpoints

#### GET `/api/tasks`
Get user's tasks with optional filtering
Query parameters: `page`, `limit`, `status`, `priority`, `search`

#### POST `/api/tasks`
Create a new task
```json
{
  "title": "Complete project",
  "description": "Finish the web application",
  "status": "pending",
  "priority": "high",
  "dueDate": "2024-01-15",
  "tags": ["work", "urgent"]
}
```

#### PUT `/api/tasks/:id`
Update a task

#### DELETE `/api/tasks/:id`
Delete a task (soft delete)

#### GET `/api/tasks/stats/summary`
Get task statistics for dashboard

### User Endpoints

#### GET `/api/users/profile`
Get user profile

#### PUT `/api/users/profile`
Update user profile

#### PUT `/api/users/change-password`
Change user password

## 🔒 Security Features

- **Password Hashing** - bcrypt with salt rounds
- **JWT Authentication** - Secure token-based auth
- **Input Validation** - Server-side validation with express-validator
- **CORS Protection** - Configured for production
- **Rate Limiting** - Prevents abuse
- **Helmet.js** - Security headers
- **XSS Protection** - Input sanitization

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Mobile devices** (320px and up)
- **Tablets** (768px and up)
- **Desktop** (1024px and up)
- **Large screens** (1280px and up)

## 🚀 Production Deployment

### Frontend Deployment (Vercel/Netlify)
1. Build the frontend: `cd client && npm run build`
2. Deploy to Vercel or Netlify
3. Set environment variables for API URL

### Backend Deployment (Railway/Heroku)
1. Set up MongoDB Atlas or similar cloud database
2. Configure environment variables
3. Deploy to Railway, Heroku, or similar platform

### Environment Variables for Production
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/scalable-web-app
JWT_SECRET=your-production-jwt-secret
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
```

## 🔧 Development Scripts

```bash
# Install all dependencies
npm run install-all

# Start both frontend and backend
npm run dev

# Start only backend
npm run server

# Start only frontend
npm run client

# Build frontend for production
npm run build

# Start production server
npm start
```

## 📊 Scalability Considerations

### Frontend Scalability
- **Code Splitting** - Automatic with Next.js
- **Component Architecture** - Reusable, modular components
- **State Management** - Context API for global state
- **Performance Optimization** - Image optimization, lazy loading
- **SEO Ready** - Server-side rendering with Next.js

### Backend Scalability
- **Modular Routes** - Organized API structure
- **Database Indexing** - Optimized queries
- **Middleware Stack** - Reusable middleware functions
- **Error Handling** - Centralized error management
- **API Versioning** - Ready for future API versions

### Database Scalability
- **MongoDB Atlas** - Cloud database for scaling
- **Indexes** - Optimized for common queries
- **Data Validation** - Mongoose schemas with validation
- **Aggregation** - Efficient data processing

## 🧪 Testing

The application is structured for easy testing:
- **Component Testing** - React components with Jest
- **API Testing** - Express routes with Supertest
- **Integration Testing** - End-to-end testing setup
- **Postman Collection** - Available for API testing

## 📈 Performance Optimizations

- **Image Optimization** - Next.js automatic image optimization
- **Bundle Analysis** - Webpack bundle analyzer
- **Caching** - HTTP caching headers
- **Compression** - Gzip compression
- **CDN Ready** - Static asset optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support or questions, please contact:
- Email: support@example.com
- GitHub Issues: Create an issue in the repository

---

**Note**: This is a demonstration project for the Frontend Developer Intern position. It showcases modern web development practices, security considerations, and scalable architecture patterns.
