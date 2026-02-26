# Deployment Guide

Complete guide for deploying the AI Runoff Forecasting Dashboard to production.

## Deployment Platforms

### Vercel (Recommended)

Vercel is the optimal platform for Next.js applications and provides seamless integration.

#### Prerequisites

- Vercel account (sign up at [vercel.com](https://vercel.com))
- GitHub repository with your code
- Backend API deployed and accessible

#### Steps

1. **Connect Repository**:
   ```bash
   vercel link
   ```

2. **Configure Environment Variables**:
   In Vercel Dashboard → Settings → Environment Variables:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-api.com
   NODE_ENV=production
   ```

3. **Deploy**:
   ```bash
   vercel --prod
   ```
   Or push to main branch (auto-deploy enabled)

4. **Verify**:
   - Visit your Vercel deployment URL
   - Check API Status page to verify backend connectivity

#### Auto Deployment

Enable automatic deployments when pushing to main:

```bash
# Vercel automatically detects pushes and deploys
git push origin main
```

#### Preview Deployments

Each pull request gets a preview deployment automatically.

---

### Self-Hosted (Docker)

Deploy using Docker for more control.

#### Create Dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy source
COPY . .

# Build
RUN pnpm build

# Expose port
EXPOSE 3000

# Start
CMD ["pnpm", "start"]
```

#### Create docker-compose.yml

```yaml
version: '3.8'

services:
  frontend:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://backend:8000
    depends_on:
      - backend
    restart: always

  backend:
    image: your-backend:latest
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:pass@postgres:5432/db
    depends_on:
      - postgres
    restart: always

  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=runoff_db
      - POSTGRES_USER=admin
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: always

volumes:
  postgres_data:
```

#### Deploy

```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f frontend

# Stop
docker-compose down
```

---

### AWS (EC2 + S3)

Deploy on AWS for scalability.

#### Prerequisites

- AWS account
- EC2 instance (t3.medium or larger)
- S3 bucket for static assets
- Domain registered with Route 53 or external provider

#### Setup EC2

```bash
# SSH into instance
ssh -i key.pem ec2-user@your-instance.amazonaws.com

# Update system
sudo yum update -y

# Install Node.js
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo yum install -y nodejs

# Install pnpm
npm install -g pnpm

# Clone repository
git clone your-repo.git
cd your-project

# Install dependencies
pnpm install

# Build
pnpm build

# Create PM2 config (ecosystem.config.js)
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'runoff-dashboard',
    script: '.next/standalone/server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      NEXT_PUBLIC_API_URL: 'https://your-api.com'
    }
  }]
};
EOF

# Install PM2
npm install -g pm2

# Start application
pm2 start ecosystem.config.js

# Enable startup on reboot
pm2 startup
pm2 save
```

#### Setup Nginx

```bash
# Install Nginx
sudo yum install -y nginx

# Create config (/etc/nginx/conf.d/runoff.conf)
cat > /etc/nginx/conf.d/runoff.conf << 'EOF'
server {
    listen 80;
    server_name your-domain.com;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;
    
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# Start Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

#### Setup SSL with Let's Encrypt

```bash
# Install Certbot
sudo yum install -y certbot python3-certbot-nginx

# Get certificate
sudo certbot certonly --nginx -d your-domain.com

# Auto-renewal
sudo systemctl start certbot-renew
sudo systemctl enable certbot-renew
```

---

### Netlify

Alternative static/serverless hosting option.

#### Deploy Steps

1. **Connect Git Repository**:
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Choose your repository

2. **Configure Build Settings**:
   - Build command: `pnpm build`
   - Publish directory: `.next`

3. **Set Environment Variables**:
   ```
   NEXT_PUBLIC_API_URL=https://your-api.com
   ```

4. **Deploy**:
   - Netlify auto-deploys on push
   - Preview URLs for pull requests

---

## Environment Configuration

### Production Environment Variables

```env
# Required
NEXT_PUBLIC_API_URL=https://your-production-api.com

# Optional
NODE_ENV=production
LOG_LEVEL=info
ANALYTICS_ID=your-analytics-id
```

### Secrets Management

Never commit sensitive data. Use platform secrets:

**Vercel**:
- Settings → Environment Variables
- Automatic encryption

**AWS**:
- AWS Secrets Manager
- Reference in EC2 user data

**Docker**:
- Use `.env.production` (gitignored)
- Or Docker secrets in Swarm

---

## Build Optimization

### Production Build

```bash
# Optimized production build
pnpm build

# Analyze bundle size
ANALYZE=true pnpm build
```

### Output Settings

Update `next.config.js` for production:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  
  // Enable compression
  compress: true,
  
  // Optimize fonts
  optimizeFonts: true,
  
  // Generate static pages
  staticPageGenerationTimeout: 60,
};

module.exports = nextConfig;
```

---

## Performance Optimization

### Caching Strategy

```nginx
# In Nginx config
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

location / {
    expires -1;
    add_header Cache-Control "no-cache, no-store, must-revalidate";
}
```

### CDN Integration

Use CloudFront or similar for static assets:

```typescript
// next.config.js
const nextConfig = {
  assetPrefix: process.env.CDN_URL || '',
};
```

### Monitoring

Install monitoring tools:

```bash
# Vercel Analytics (included)
# Google Analytics
npm install gtag

# Sentry for error tracking
npm install @sentry/nextjs
```

---

## Health Checks & Monitoring

### Uptime Monitoring

Set up monitoring for your deployment:

**Vercel**: Built-in monitoring
**Custom**: Use monitoring services:

```bash
# Example: Uptimerobot
# Monitor: https://your-domain.com/api/health
# Interval: 5 minutes
```

### Log Aggregation

**Vercel**: Automatic logs in dashboard

**Self-hosted**: Use ELK stack or CloudWatch

```bash
# Example PM2 logs
pm2 logs runoff-dashboard

# View logs
pm2 show runoff-dashboard
```

---

## Security Checklist

- [ ] HTTPS enabled with valid SSL certificate
- [ ] Environment variables secured (not in code)
- [ ] CORS properly configured for backend
- [ ] Rate limiting enabled on backend
- [ ] Database backups configured
- [ ] Security headers set (CSP, X-Frame-Options, etc.)
- [ ] DDoS protection enabled (Cloudflare, AWS Shield)
- [ ] Regular security audits
- [ ] Dependency updates scheduled

### Security Headers

Add to Nginx:

```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self' https:" always;
```

---

## CI/CD Pipeline

### GitHub Actions Example

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      
      - uses: actions/setup-node@v3
        with:
          node-version: 20
          cache: 'pnpm'
      
      - run: pnpm install
      - run: pnpm build
      - run: pnpm test
      
      - name: Deploy to Vercel
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
        run: vercel --prod --token $VERCEL_TOKEN
```

---

## Rollback Procedures

### Vercel

```bash
# View deployments
vercel ls

# Promote previous deployment
vercel promote <deployment-url>
```

### Docker

```bash
# List images
docker images

# Run previous version
docker run -d your-image:previous-version
```

### Git

```bash
# Revert commit
git revert <commit-hash>
git push origin main
```

---

## Database Backup

If using a database:

```bash
# PostgreSQL backup
pg_dump dbname > backup.sql

# AWS RDS backup
# Automated in AWS console

# Restore
psql dbname < backup.sql
```

---

## Troubleshooting Deployment

### Build Fails

```bash
# Clear cache
pnpm clean
rm -rf .next

# Rebuild
pnpm build
```

### Blank Page

- Check browser console for errors
- Check API connectivity
- Verify environment variables
- Check server logs: `pm2 logs`

### Slow Performance

- Check API response times
- Monitor server resources
- Analyze bundle size
- Enable caching headers
- Consider CDN

### API Connection Issues

```bash
# Test API connectivity
curl https://your-api.com/health

# Check environment variable
echo $NEXT_PUBLIC_API_URL
```

---

## Cost Optimization

### Vercel
- Free tier: 100GB bandwidth/month
- Upgrade as needed
- Monitor usage in dashboard

### AWS
- Use EC2 spot instances for cost savings
- CloudWatch for monitoring
- Set up billing alerts

### Docker
- Use Alpine images for smaller size
- Multi-stage builds
- Optimize layer caching

---

## Post-Deployment

### Verify Deployment

1. ✅ Visit application URL
2. ✅ Check API Status page
3. ✅ Test Dashboard page
4. ✅ Test Train page
5. ✅ Test Predict page
6. ✅ Monitor error logs

### Performance Testing

```bash
# Lighthouse audit
npm install -g lighthouse
lighthouse https://your-domain.com

# Load testing
npm install -g artillery
artillery quick --count 100 --num 10 https://your-domain.com
```

### Analytics Setup

- Enable Vercel Analytics
- Configure Google Analytics
- Set up uptime monitoring
- Configure error tracking (Sentry)

---

## Support & Documentation

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **AWS Docs**: https://docs.aws.amazon.com
- **Nginx Docs**: https://nginx.org/en/docs

---

## Scaling

### Horizontal Scaling

- Use load balancer (AWS ELB, Nginx)
- Deploy multiple instances
- Use managed database (RDS, MongoDB Atlas)

### Vertical Scaling

- Upgrade instance size
- Increase memory/CPU
- Add caching layer (Redis)

### Auto Scaling

- AWS Auto Scaling Groups
- Kubernetes (EKS)
- Serverless (AWS Lambda, Vercel)

---

## Maintenance

### Regular Updates

```bash
# Check for updates
pnpm outdated

# Update dependencies
pnpm update

# Update Node.js
nvm install --lts
nvm use --lts
```

### Monitoring & Alerts

- Set up uptime alerts
- Monitor error rates
- Track performance metrics
- Review logs regularly

### Backup Strategy

- Daily automated backups
- Test restore procedures
- Keep 7+ days of backups
- Archive important data

---

## Summary

1. Choose deployment platform (Vercel recommended)
2. Set environment variables
3. Configure domain and SSL
4. Set up monitoring and alerts
5. Deploy and verify
6. Monitor and maintain
7. Scale as needed

For questions or issues, refer to the official documentation or community support.
