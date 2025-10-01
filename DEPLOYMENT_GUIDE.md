# Deployment Guide

This guide covers how to deploy the Scalable Web App to production environments.

## 🚀 Production Deployment Strategy

### Architecture Overview
```
Internet → CDN → Frontend (Vercel/Netlify) → Backend (Railway/Heroku) → Database (MongoDB Atlas)
```

## 📱 Frontend Deployment (Vercel - Recommended)

### Prerequisites
- Vercel account
- GitHub repository

### Steps

1. **Connect Repository**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Build Settings**
   - Framework Preset: `Next.js`
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `.next`

3. **Environment Variables**
   ```env
   NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically deploy on every push to main branch

### Alternative: Netlify

1. **Connect Repository**
   - Go to [Netlify](https://netlify.com)
   - Connect GitHub repository

2. **Build Settings**
   - Base Directory: `client`
   - Build Command: `npm run build`
   - Publish Directory: `client/.next`

3. **Environment Variables**
   ```env
   NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api
   ```

## 🔧 Backend Deployment (Railway - Recommended)

### Prerequisites
- Railway account
- MongoDB Atlas account

### Steps

1. **Connect Repository**
   - Go to [Railway Dashboard](https://railway.app)
   - Click "New Project"
   - Connect GitHub repository

2. **Configure Service**
   - Select the repository
   - Railway will auto-detect Node.js

3. **Environment Variables**
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/scalable-web-app?retryWrites=true&w=majority
   JWT_SECRET=your-super-secure-jwt-secret-key-here
   NODE_ENV=production
   ```

4. **Deploy**
   - Railway will automatically deploy
   - Get the deployment URL

### Alternative: Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login and Create App**
   ```bash
   heroku login
   heroku create your-app-name
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/scalable-web-app
   heroku config:set JWT_SECRET=your-super-secure-jwt-secret-key-here
   heroku config:set NODE_ENV=production
   ```

4. **Deploy**
   ```bash
   git subtree push --prefix server heroku main
   ```

## 🗄️ Database Setup (MongoDB Atlas)

### Steps

1. **Create Cluster**
   - Go to [MongoDB Atlas](https://cloud.mongodb.com)
   - Create new cluster
   - Choose free tier (M0) for development

2. **Configure Access**
   - Create database user
   - Set up IP whitelist (0.0.0.0/0 for production)

3. **Get Connection String**
   ```
   mongodb+srv://username:password@cluster.mongodb.net/scalable-web-app?retryWrites=true&w=majority
   ```

4. **Update Environment Variables**
   - Use the connection string in your backend deployment

## 🔒 Security Configuration

### Environment Variables

#### Backend (.env)
```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/scalable-web-app?retryWrites=true&w=majority

# Security
JWT_SECRET=your-super-secure-jwt-secret-key-here-make-it-long-and-random
JWT_EXPIRES_IN=7d

# CORS
ALLOWED_ORIGINS=https://your-frontend-domain.com,https://www.your-frontend-domain.com
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api
```

### Security Headers

The application includes security headers via Helmet.js:
- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options
- Referrer Policy
- Permissions Policy

### CORS Configuration

Update CORS settings for production:
```javascript
app.use(cors({
  origin: [
    'https://your-frontend-domain.com',
    'https://www.your-frontend-domain.com'
  ],
  credentials: true
}));
```

## 📊 Monitoring and Logging

### Recommended Tools

1. **Application Monitoring**
   - Vercel Analytics (Frontend)
   - Railway Metrics (Backend)
   - Sentry (Error tracking)

2. **Database Monitoring**
   - MongoDB Atlas Monitoring
   - Database performance metrics

3. **Logging**
   - Winston (Structured logging)
   - Log aggregation services

### Error Tracking Setup

1. **Install Sentry**
   ```bash
   npm install @sentry/nextjs @sentry/node
   ```

2. **Configure Sentry**
   ```javascript
   // frontend/sentry.client.config.js
   import * as Sentry from "@sentry/nextjs";

   Sentry.init({
     dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
     tracesSampleRate: 1.0,
   });
   ```

## 🚀 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          working-directory: ./client

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Railway
        uses: railway-deploy@v1
        with:
          railway-token: ${{ secrets.RAILWAY_TOKEN }}
          service: backend
          working-directory: ./server
```

## 🔧 Performance Optimization

### Frontend Optimizations

1. **Image Optimization**
   ```javascript
   // next.config.js
   module.exports = {
     images: {
       domains: ['your-cdn-domain.com'],
       formats: ['image/webp', 'image/avif'],
     },
   }
   ```

2. **Bundle Analysis**
   ```bash
   npm install -D @next/bundle-analyzer
   ```

3. **Caching Strategy**
   - Static assets cached via CDN
   - API responses cached appropriately
   - Service worker for offline functionality

### Backend Optimizations

1. **Database Indexing**
   ```javascript
   // Ensure indexes are created
   taskSchema.index({ user: 1, status: 1 });
   taskSchema.index({ user: 1, priority: 1 });
   ```

2. **Response Compression**
   ```javascript
   const compression = require('compression');
   app.use(compression());
   ```

3. **Connection Pooling**
   ```javascript
   mongoose.connect(uri, {
     maxPoolSize: 10,
     serverSelectionTimeoutMS: 5000,
     socketTimeoutMS: 45000,
   });
   ```

## 📈 Scaling Considerations

### Horizontal Scaling

1. **Load Balancer**
   - Use Railway/Heroku's built-in load balancing
   - Consider AWS ALB for custom setups

2. **Database Scaling**
   - MongoDB Atlas auto-scaling
   - Read replicas for read-heavy workloads

3. **CDN Implementation**
   - Vercel Edge Network
   - CloudFlare for additional caching

### Vertical Scaling

1. **Resource Allocation**
   - Monitor CPU and memory usage
   - Scale up when needed

2. **Database Optimization**
   - Query optimization
   - Proper indexing strategy

## 🔍 Health Checks

### Backend Health Check
```javascript
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    version: process.env.npm_package_version,
    uptime: process.uptime(),
  });
});
```

### Frontend Health Check
```javascript
// pages/api/health.js
export default function handler(req, res) {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
}
```

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check CORS configuration
   - Verify allowed origins

2. **Database Connection Issues**
   - Verify connection string
   - Check IP whitelist
   - Confirm user permissions

3. **Environment Variables**
   - Ensure all required variables are set
   - Check variable names and values

4. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Review build logs

### Debugging Steps

1. **Check Logs**
   ```bash
   # Railway
   railway logs
   
   # Heroku
   heroku logs --tail
   ```

2. **Test Endpoints**
   ```bash
   curl -X GET https://your-backend-domain.com/api/health
   ```

3. **Database Connectivity**
   ```bash
   # Test MongoDB connection
   mongosh "mongodb+srv://username:password@cluster.mongodb.net/scalable-web-app"
   ```

## 📋 Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Database connection tested
- [ ] Security headers configured
- [ ] CORS settings updated
- [ ] Error tracking setup
- [ ] Monitoring configured
- [ ] SSL certificates valid
- [ ] Performance optimizations applied
- [ ] Health checks working
- [ ] Backup strategy implemented

## 🔄 Rollback Strategy

1. **Frontend Rollback**
   - Vercel: Use deployment history
   - Netlify: Use deploy previews

2. **Backend Rollback**
   - Railway: Use deployment history
   - Heroku: Use release management

3. **Database Rollback**
   - MongoDB Atlas: Point-in-time recovery
   - Manual data restoration if needed

## 📞 Support and Maintenance

### Regular Maintenance Tasks

1. **Security Updates**
   - Keep dependencies updated
   - Monitor security advisories
   - Regular security audits

2. **Performance Monitoring**
   - Monitor response times
   - Track error rates
   - Database performance metrics

3. **Backup Verification**
   - Test backup restoration
   - Verify data integrity
   - Document recovery procedures

### Support Contacts

- **Frontend Issues**: Vercel Support
- **Backend Issues**: Railway Support
- **Database Issues**: MongoDB Atlas Support
- **Application Issues**: Check logs and monitoring dashboards
