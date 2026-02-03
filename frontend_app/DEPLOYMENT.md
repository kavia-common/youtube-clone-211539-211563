# Deployment Guide

## 🚀 Production Build

The YouTube clone is ready for deployment. The production build has been verified and compiles successfully.

## Build Output

```bash
npm run build
```

### Build Stats
- ✅ Compiled successfully
- ✅ Optimized for production
- ✅ Minified and gzipped
- ✅ Ready for deployment

## Deployment Options

### 1. Static Hosting (Recommended)

#### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd youtube-clone-211539-211563/frontend_app
vercel
```

#### Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
cd youtube-clone-211539-211563/frontend_app
netlify deploy --prod
```

#### GitHub Pages
```bash
# Add to package.json
"homepage": "https://yourusername.github.io/youtube-clone"

# Install gh-pages
npm install --save-dev gh-pages

# Add deploy scripts to package.json
"predeploy": "npm run build",
"deploy": "gh-pages -d build"

# Deploy
npm run deploy
```

### 2. Docker Deployment

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Create `nginx.conf`:
```nginx
server {
    listen 80;
    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
}
```

Build and run:
```bash
docker build -t youtube-clone .
docker run -p 80:80 youtube-clone
```

### 3. AWS S3 + CloudFront

```bash
# Build the app
npm run build

# Install AWS CLI
# Configure AWS credentials
aws configure

# Create S3 bucket
aws s3 mb s3://your-bucket-name

# Upload build files
aws s3 sync build/ s3://your-bucket-name

# Enable static website hosting
aws s3 website s3://your-bucket-name \
  --index-document index.html \
  --error-document index.html

# Set up CloudFront distribution (optional)
```

### 4. Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase
firebase init hosting

# Select build directory: build
# Configure as single-page app: Yes
# Set up automatic builds: No

# Deploy
firebase deploy --only hosting
```

## Environment Variables

Before deployment, ensure environment variables are set:

### For Vercel
```bash
vercel env add REACT_APP_API_BASE
vercel env add REACT_APP_BACKEND_URL
# ... add other variables
```

### For Netlify
Add in Netlify Dashboard:
- Site Settings → Build & deploy → Environment

### For Docker
Use `.env` file or Docker environment variables:
```bash
docker run -p 80:80 \
  -e REACT_APP_API_BASE=https://api.example.com \
  youtube-clone
```

## Pre-Deployment Checklist

- ✅ Run `npm run build` successfully
- ✅ Test production build locally: `npx serve -s build`
- ✅ Set environment variables
- ✅ Configure domain/DNS
- ✅ Set up SSL certificate (HTTPS)
- ✅ Configure CORS if needed
- ✅ Test all routes work
- ✅ Verify assets load correctly
- ✅ Check console for errors
- ✅ Test on multiple browsers

## Local Production Testing

Test the production build locally:

```bash
# Build the app
npm run build

# Install serve (if not already installed)
npm install -g serve

# Serve the build folder
serve -s build

# Open http://localhost:3000
```

## Performance Optimization

### Already Implemented
- ✅ Tailwind CSS purging
- ✅ React production build
- ✅ Code minification
- ✅ Asset optimization
- ✅ Lazy loading images
- ✅ Efficient re-renders

### Additional Optimizations (Optional)

#### 1. Enable Compression
Most hosting platforms enable gzip/brotli automatically.

For nginx:
```nginx
gzip on;
gzip_types text/css application/javascript image/svg+xml;
```

#### 2. Add Service Worker
```bash
# Uncomment in src/index.js
serviceWorker.register();
```

#### 3. Add Bundle Analyzer
```bash
npm install --save-dev webpack-bundle-analyzer

# Analyze bundle
npm run build
npx webpack-bundle-analyzer build/static/js/*.js
```

## Monitoring

### Recommended Tools
- **Google Analytics**: User tracking
- **Sentry**: Error tracking
- **Lighthouse**: Performance monitoring
- **New Relic**: Application monitoring

### Setup Example (Sentry)
```bash
npm install @sentry/react

# Add to src/index.js
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: process.env.NODE_ENV,
});
```

## Continuous Deployment

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: |
        cd youtube-clone-211539-211563/frontend_app
        npm ci
        
    - name: Build
      run: |
        cd youtube-clone-211539-211563/frontend_app
        npm run build
        
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        working-directory: youtube-clone-211539-211563/frontend_app
```

## Troubleshooting

### Build Fails
```bash
# Clear cache
rm -rf node_modules
rm package-lock.json
npm install
npm run build
```

### Routes Don't Work (404)
Ensure server is configured for SPA:
- All routes should serve `index.html`
- Use `try_files` in nginx
- Use `_redirects` file in Netlify

### Assets Not Loading
- Check `homepage` field in package.json
- Verify asset paths are relative
- Check CORS headers

### Performance Issues
- Enable compression
- Use CDN for assets
- Implement code splitting
- Add service worker

## Security

### Best Practices
- ✅ HTTPS only
- ✅ Secure headers (CSP, X-Frame-Options)
- ✅ CORS configuration
- ✅ Environment variables (never commit)
- ✅ Regular dependency updates

### Security Headers (nginx example)
```nginx
add_header X-Frame-Options "SAMEORIGIN";
add_header X-Content-Type-Options "nosniff";
add_header X-XSS-Protection "1; mode=block";
add_header Content-Security-Policy "default-src 'self'";
```

## Cost Estimation

### Free Tier Options
- **Vercel**: Free for personal projects
- **Netlify**: 100GB bandwidth/month free
- **GitHub Pages**: Free for public repos
- **Firebase**: 10GB storage free

### Paid Options
- **AWS S3 + CloudFront**: ~$5-20/month
- **DigitalOcean**: $5/month (Droplet)
- **Google Cloud**: Pay-as-you-go

## Post-Deployment

### Verification Steps
1. ✅ Visit deployed URL
2. ✅ Test all routes
3. ✅ Check browser console
4. ✅ Test search functionality
5. ✅ Test video navigation
6. ✅ Verify mobile responsive
7. ✅ Run Lighthouse audit
8. ✅ Check load times

### Monitoring
- Set up uptime monitoring
- Configure error tracking
- Monitor performance metrics
- Track user analytics

## Rollback Plan

### Quick Rollback
Most platforms support instant rollback:

**Vercel**: Previous deployments page → Promote to production

**Netlify**: Deploys → Select previous → Publish deploy

**GitHub Pages**: Revert commit and re-deploy

## Support

For deployment issues:
1. Check platform documentation
2. Review build logs
3. Test locally with `serve -s build`
4. Check environment variables
5. Verify DNS/domain settings

---

**Ready to deploy!** 🚀

The YouTube clone is production-ready and successfully builds without errors.
