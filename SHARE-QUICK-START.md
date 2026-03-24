# 🌐 Quick Start: Share Your Website

## Fastest Method (5 Minutes)

### Step 1: Install ngrok
```bash
brew install ngrok
```

### Step 2: Sign up & Get Token
1. Visit: https://dashboard.ngrok.com/signup
2. Copy your auth token from: https://dashboard.ngrok.com/get-started/your-authtoken

### Step 3: Configure ngrok
```bash
ngrok config add-authtoken YOUR_TOKEN_HERE
```

### Step 4: Run the Share Script
```bash
cd architectural-firm-website
./share-website.sh
```

### Step 5: Share the URL!
The script will display a public URL like:
```
https://abc123.ngrok-free.app
```

**Share this URL with anyone!** They can access your website from anywhere in the world.

---

## Alternative: Manual Method

If you prefer to do it manually:

```bash
# 1. Make sure website is running
cd architectural-firm-website
docker-compose up -d

# 2. Start ngrok
ngrok http 80

# 3. Share the URL that appears
```

---

## What Reviewers Will See

Your reviewers will be able to:
- ✅ Browse the homepage
- ✅ View all 4 service pages with full details
- ✅ See project portfolios
- ✅ Fill out the "Start Your Project" form
- ✅ Navigate the entire website

---

## Important Notes

### Keep Your Computer Running
- The website is accessible as long as:
  - Your computer is on
  - Docker is running
  - ngrok tunnel is active

### Free Tier Limits
- ngrok free tier includes:
  - 1 online ngrok process
  - 40 connections/minute
  - Random URL (changes each restart)

### To Stop Sharing
Press `Ctrl+C` in the terminal running ngrok

---

## Troubleshooting

### "ngrok not found"
```bash
brew install ngrok
```

### "Docker not running"
Open Docker Desktop application

### "Port 80 in use"
```bash
# Stop other services using port 80
lsof -i :80
# Or restart Docker
docker-compose restart
```

### "Website not loading"
```bash
# Check if containers are running
docker-compose ps

# Restart if needed
docker-compose restart
```

---

## For Longer-Term Sharing

See `DEPLOYMENT-GUIDE.md` for:
- Cloudflare Tunnel (free, permanent URL)
- DigitalOcean deployment (production hosting)
- AWS/Vercel options

---

## Need Help?

Check the full deployment guide:
```bash
cat DEPLOYMENT-GUIDE.md
```

Or review the main documentation:
```bash
cat QUICK-START.md