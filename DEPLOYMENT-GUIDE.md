# Website Deployment Guide

## Overview
This guide provides multiple options for deploying and sharing your architectural firm website over the internet.

---

## Option 1: Quick Share with ngrok (Fastest - 5 minutes)

### What is ngrok?
ngrok creates a secure tunnel to your local machine, giving you a public URL instantly.

### Steps:

1. **Install ngrok:**
   ```bash
   # macOS
   brew install ngrok
   
   # Or download from https://ngrok.com/download
   ```

2. **Create free account:**
   - Visit https://ngrok.com/signup
   - Get your auth token from dashboard

3. **Configure ngrok:**
   ```bash
   ngrok config add-authtoken YOUR_AUTH_TOKEN
   ```

4. **Start your website:**
   ```bash
   cd architectural-firm-website
   docker-compose up -d
   ```

5. **Create public tunnel:**
   ```bash
   ngrok http 80
   ```

6. **Share the URL:**
   - ngrok will display a public URL like: `https://abc123.ngrok.io`
   - Share this URL with anyone for review
   - URL stays active as long as ngrok is running

### Pros:
- ✅ Instant setup (5 minutes)
- ✅ Free tier available
- ✅ HTTPS included
- ✅ No server setup needed

### Cons:
- ❌ URL changes each time you restart (unless paid plan)
- ❌ Requires keeping your computer running
- ❌ Free tier has bandwidth limits

---

## Option 2: Cloudflare Tunnel (Free, Permanent URL)

### What is Cloudflare Tunnel?
Free service that creates a secure tunnel with a permanent subdomain.

### Steps:

1. **Install cloudflared:**
   ```bash
   # macOS
   brew install cloudflare/cloudflare/cloudflared
   ```

2. **Login to Cloudflare:**
   ```bash
   cloudflared tunnel login
   ```

3. **Create a tunnel:**
   ```bash
   cloudflared tunnel create arch-firm-website
   ```

4. **Configure the tunnel:**
   ```bash
   cat > ~/.cloudflared/config.yml << EOF
   tunnel: arch-firm-website
   credentials-file: /Users/aa/.cloudflared/TUNNEL_ID.json

   ingress:
     - hostname: arch-firm.YOUR_DOMAIN.com
       service: http://localhost:80
     - service: http_status:404
   EOF
   ```

5. **Create DNS record:**
   ```bash
   cloudflared tunnel route dns arch-firm-website arch-firm.YOUR_DOMAIN.com
   ```

6. **Run the tunnel:**
   ```bash
   cloudflared tunnel run arch-firm-website
   ```

### Pros:
- ✅ Free forever
- ✅ Permanent URL
- ✅ HTTPS included
- ✅ DDoS protection

### Cons:
- ❌ Requires Cloudflare account
- ❌ Requires keeping your computer running

---

## Option 3: Deploy to Cloud (Production-Ready)

### A. Deploy to DigitalOcean (Recommended)

**Cost:** $12-24/month for droplet

1. **Create DigitalOcean account:**
   - Visit https://www.digitalocean.com
   - Get $200 free credit for 60 days

2. **Create a Droplet:**
   - Choose Ubuntu 22.04
   - Select $12/month plan (2GB RAM)
   - Add your SSH key

3. **Connect to droplet:**
   ```bash
   ssh root@YOUR_DROPLET_IP
   ```

4. **Install Docker:**
   ```bash
   curl -fsSL https://get.docker.com -o get-docker.sh
   sh get-docker.sh
   apt install docker-compose-plugin
   ```

5. **Clone your repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/architectural-firm-website.git
   cd architectural-firm-website
   ```

6. **Update environment variables:**
   ```bash
   cp .env.example .env
   nano .env
   # Update with your droplet IP
   ```

7. **Start the application:**
   ```bash
   docker compose up -d
   ```

8. **Configure domain (optional):**
   - Point your domain's A record to droplet IP
   - Update nginx configuration
   - Add SSL with Let's Encrypt

### B. Deploy to AWS EC2

**Cost:** Free tier eligible (12 months free)

Similar steps to DigitalOcean but using AWS console.

### C. Deploy to Vercel + Railway

**Frontend (Vercel):** Free
**Backend (Railway):** $5/month

1. **Deploy Frontend to Vercel:**
   ```bash
   cd frontend
   npm install -g vercel
   vercel
   ```

2. **Deploy Backend to Railway:**
   - Visit https://railway.app
   - Connect GitHub repository
   - Deploy backend folder
   - Add PostgreSQL database

---

## Option 4: Local Network Share (Free, LAN only)

### For reviewers on same network:

1. **Find your local IP:**
   ```bash
   ifconfig | grep "inet " | grep -v 127.0.0.1
   ```

2. **Share the URL:**
   - Share: `http://YOUR_LOCAL_IP` (e.g., `http://192.168.1.100`)
   - Works only on same WiFi/network

### Pros:
- ✅ Completely free
- ✅ Fast
- ✅ No external services

### Cons:
- ❌ Only works on same network
- ❌ Not accessible from internet

---

## Recommended Approach

### For Quick Review (Today):
**Use ngrok** - Get a public URL in 5 minutes

### For Extended Review (This Week):
**Use Cloudflare Tunnel** - Free permanent URL

### For Production Deployment:
**Use DigitalOcean** - Professional hosting with custom domain

---

## Quick Start: ngrok Setup

Here's the fastest way to share your site right now:

```bash
# 1. Install ngrok
brew install ngrok

# 2. Sign up and get auth token from https://dashboard.ngrok.com/get-started/your-authtoken
ngrok config add-authtoken YOUR_TOKEN_HERE

# 3. Make sure your site is running
cd architectural-firm-website
docker-compose up -d

# 4. Create public tunnel
ngrok http 80

# 5. Share the https URL that appears!
```

The URL will look like: `https://abc123.ngrok-free.app`

---

## Security Considerations

### For Public Deployment:

1. **Change default credentials:**
   ```bash
   # Update Strapi admin password
   # Update database passwords in .env
   ```

2. **Enable HTTPS:**
   - Use Let's Encrypt for free SSL
   - Or use ngrok/Cloudflare (includes HTTPS)

3. **Configure firewall:**
   ```bash
   # On cloud server
   ufw allow 80/tcp
   ufw allow 443/tcp
   ufw allow 22/tcp
   ufw enable
   ```

4. **Set up backups:**
   - Database backups
   - File uploads backups

---

## Monitoring & Maintenance

### Check if site is running:
```bash
curl -I http://localhost
docker-compose ps
docker-compose logs -f
```

### Restart services:
```bash
docker-compose restart
```

### Update application:
```bash
git pull
docker-compose build
docker-compose up -d
```

---

## Support & Troubleshooting

### Common Issues:

1. **Port 80 already in use:**
   ```bash
   # Find what's using port 80
   lsof -i :80
   # Kill the process or change nginx port
   ```

2. **Can't access from internet:**
   - Check firewall settings
   - Verify port forwarding (if behind router)
   - Check cloud provider security groups

3. **Slow performance:**
   - Increase server resources
   - Enable caching
   - Use CDN for static assets

---

## Cost Comparison

| Option | Setup Time | Monthly Cost | Best For |
|--------|------------|--------------|----------|
| ngrok | 5 min | Free/$8 | Quick demos |
| Cloudflare Tunnel | 15 min | Free | Extended review |
| DigitalOcean | 30 min | $12-24 | Production |
| AWS EC2 | 45 min | Free/varies | Enterprise |
| Vercel + Railway | 20 min | $5 | Scalable apps |

---

## Next Steps

1. Choose your deployment method
2. Follow the setup steps
3. Test the public URL
4. Share with reviewers
5. Collect feedback
6. Iterate and improve

For production deployment, I recommend starting with DigitalOcean's $200 free credit to test everything before committing to monthly costs.