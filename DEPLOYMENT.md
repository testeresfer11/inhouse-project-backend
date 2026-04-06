# Top SEO Services — Self-Hosted Deployment Guide

## Stack Overview

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| CMS / Admin | Payload CMS v3 (mounted at `/admin`) |
| Database | PostgreSQL 15+ |
| Package manager | pnpm 9 |
| Runtime | Node.js 20+ |
| Reverse proxy | Nginx |

---

## 1. Server Prerequisites

Install on your server (Ubuntu 22.04 / Debian 12 or similar):

```bash
# Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# pnpm
npm install -g pnpm@9

# PostgreSQL
sudo apt-get install -y postgresql postgresql-contrib

# Nginx
sudo apt-get install -y nginx

# Build tools (needed for sharp / image processing)
sudo apt-get install -y build-essential python3
```

Verify versions:

```bash
node -v      # must be >= 20
pnpm -v      # must be >= 9
psql --version
```

---

## 2. PostgreSQL Database Setup

```bash
# Switch to the postgres system user
sudo -u postgres psql
```

Inside `psql`, run:

```sql
-- Create a dedicated database user
CREATE USER seoagency WITH PASSWORD 'CHANGE_THIS_STRONG_PASSWORD';

-- Create the database
CREATE DATABASE seoagency_db OWNER seoagency;

-- Grant all privileges
GRANT ALL PRIVILEGES ON DATABASE seoagency_db TO seoagency;

-- Exit
\q
```

Your `DATABASE_URL` will be:

```
postgresql://seoagency:CHANGE_THIS_STRONG_PASSWORD@localhost:5432/seoagency_db
```

---

## 3. Upload and Install the Project

```bash
# Upload the zip to your server, then extract
unzip top-seo-services.zip -d /var/www/top-seo-services
cd /var/www/top-seo-services

# Install all dependencies (runs from monorepo root)
pnpm install
```

---

## 4. Environment Variables

Create the file `/var/www/top-seo-services/artifacts/nextjs-app/.env.production`:

```env
# ─── Database ───────────────────────────────────────────────────
DATABASE_URL=postgresql://seoagency:CHANGE_THIS_STRONG_PASSWORD@localhost:5432/seoagency_db

# ─── Payload CMS ────────────────────────────────────────────────
# Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
PAYLOAD_SECRET=REPLACE_WITH_64_CHAR_RANDOM_HEX_STRING

# ─── Next.js ────────────────────────────────────────────────────
# Your public domain (no trailing slash)
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Node environment
NODE_ENV=production

# Port the Next.js server listens on internally
PORT=3000
```

Generate a secure `PAYLOAD_SECRET`:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 5. Build the Application

```bash
cd /var/www/top-seo-services

# Build the shared DB library first, then the Next.js app
pnpm --filter @workspace/db run build
pnpm --filter @workspace/nextjs-app run build
```

This compiles TypeScript, runs `next build`, and generates the `.next` production bundle.

---

## 6. Database Migration (Payload runs this automatically)

Payload CMS automatically syncs its schema on first start. When you start the app for the first time, it will create all required tables in PostgreSQL.

If you ever need to push schema changes manually:

```bash
cd /var/www/top-seo-services/artifacts/nextjs-app
NODE_ENV=production node -e "require('./dist/payload.config')" 2>/dev/null || true
```

---

## 7. Create the First Admin User

Start the app once, navigate to `https://yourdomain.com/admin`, and Payload CMS will prompt you to create the first admin user on a fresh database.

---

## 8. Run with PM2 (Process Manager)

```bash
# Install PM2 globally
npm install -g pm2

# Start the Next.js app
cd /var/www/top-seo-services/artifacts/nextjs-app
NODE_ENV=production PORT=3000 pm2 start "pnpm start" --name "top-seo-services"

# Save PM2 config so it restarts on server reboot
pm2 save
pm2 startup
# (run the command it prints)
```

Useful PM2 commands:

```bash
pm2 status                          # check if running
pm2 logs top-seo-services          # live logs
pm2 restart top-seo-services       # restart
pm2 stop top-seo-services          # stop
```

---

## 9. Nginx Configuration

Create `/etc/nginx/sites-available/top-seo-services`:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Redirect HTTP → HTTPS (remove this block if you handle SSL elsewhere)
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # ── SSL Certificates (from Let's Encrypt / Certbot) ──
    ssl_certificate     /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # ── Recommended SSL settings ──
    ssl_protocols       TLSv1.2 TLSv1.3;
    ssl_ciphers         HIGH:!aNULL:!MD5;

    # ── Upload limit (for Payload Media uploads) ──
    client_max_body_size 50M;

    # ── Proxy to Next.js ──
    location / {
        proxy_pass         http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable and reload Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/top-seo-services /etc/nginx/sites-enabled/
sudo nginx -t        # test config
sudo systemctl reload nginx
```

---

## 10. Free SSL with Let's Encrypt

```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Certbot auto-renews every 90 days. Confirm auto-renewal is set up:

```bash
sudo systemctl status certbot.timer
```

---

## 11. Media Storage

By default, Payload stores uploaded media files in:

```
artifacts/nextjs-app/public/media/
```

This folder must be writable by the Node.js process:

```bash
sudo chown -R www-data:www-data /var/www/top-seo-services/artifacts/nextjs-app/public/media
# or whichever user runs your Node process
```

If you want media stored in S3/Cloud Storage instead, the Payload config can be updated to use `@payloadcms/storage-s3`.

---

## 12. Deployment Checklist

- [ ] Node.js 20+ and pnpm 9 installed
- [ ] PostgreSQL running with `seoagency_db` database created
- [ ] `.env.production` file created with real values
- [ ] `PAYLOAD_SECRET` is a unique 64-char random hex string
- [ ] `pnpm install` completed without errors
- [ ] `pnpm --filter @workspace/nextjs-app run build` succeeded
- [ ] PM2 process is running (`pm2 status`)
- [ ] Nginx site config enabled and tested (`nginx -t`)
- [ ] SSL certificate installed via Certbot
- [ ] First admin user created at `https://yourdomain.com/admin`
- [ ] `public/media/` directory is writable

---

## Troubleshooting

### App crashes on start
```bash
pm2 logs top-seo-services --lines 50
```
Most common cause: wrong `DATABASE_URL` or missing `PAYLOAD_SECRET` in `.env.production`.

### Payload says "could not connect to database"
Verify PostgreSQL is running and the credentials are correct:
```bash
psql postgresql://seoagency:YOUR_PASSWORD@localhost:5432/seoagency_db
```

### 502 Bad Gateway in browser
The Node.js process isn't running. Check:
```bash
pm2 status
curl http://localhost:3000   # should return HTML
```

### Build fails with TypeScript errors
```bash
cd /var/www/top-seo-services
pnpm --filter @workspace/nextjs-app exec tsc --noEmit
```

### Media uploads not working
Ensure `public/media/` exists and is writable, and `client_max_body_size` in Nginx is set to at least `50M`.
