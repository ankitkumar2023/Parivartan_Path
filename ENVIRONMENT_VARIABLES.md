# 🔐 Environment Variables Guide - Parivartan Path

This document explains all environment variables used in the project and how to configure them.

---

## 📋 Overview

The project is fully refactored to use environment variables for all configuration:

✅ **Frontend**: Uses `VITE_*` prefixed variables (exposed to client)  
✅ **Backend**: Uses regular variables (server-side only)  
✅ **Security**: Secrets are never hardcoded  
✅ **Deployment-Ready**: Only `.env` files need to change for production

---

## 🎯 Frontend Environment Variables

**Location**: `Frontend/client/.env.local`

### Required Variables

```env
# Backend API URL
VITE_API_URL=http://localhost:5000

# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=service_xxxxx
VITE_EMAILJS_CONTACT_TEMPLATE_ID=template_contact_form
VITE_EMAILJS_BOOKING_TEMPLATE_ID=template_booking_notification
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

### How Frontend Uses These

```javascript
// ✅ Correct - Using environment variable
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const response = await fetch(`${API_BASE_URL}/api/appointments`);

// ✅ Correct - In Redux
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// ❌ Wrong - Hardcoded (should never do this)
const response = await fetch("http://localhost:5000/api/appointments");
```

### Frontend Files Using Environment Variables

| File | Variable | Usage |
|------|----------|-------|
| `src/redux/authSlice.js` | `VITE_API_URL` | API calls for login/register |
| `src/pages/ContactPage.jsx` | `VITE_API_URL` | Contact form submission |
| `src/pages/AppointmentBookingPage.jsx` | `VITE_API_URL` | Booking API calls |
| `src/pages/ServiceBookingPage.jsx` | `VITE_API_URL` | Service booking API calls |
| `src/pages/Dashboard.jsx` | `VITE_API_URL` | Fetch user appointments |
| `src/services/emailService.js` | `VITE_EMAILJS_*` | Email configuration |

---

## ⚙️ Backend Environment Variables

**Location**: `Backend/server/.env`

### Required Variables

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/parivartan

# Authentication
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_at_least_32_characters
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:3000,http://localhost:5173
```

### Optional Variables

```env
# Email (if sending from backend)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-specific-password

# Admin Setup
ADMIN_EMAIL=admin@parivartan.com
ADMIN_PASSWORD=Admin@123

# Logging
LOG_LEVEL=info

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### How Backend Uses These

```javascript
// ✅ Correct - Using process.env
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

// ✅ Correct - With fallback and validation
const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:3000";

// ❌ Wrong - Hardcoded (should never do this)
const PORT = 5000;
const JWT_SECRET = "hardcoded-secret-key";
```

### Backend Files Using Environment Variables

| File | Variables | Usage |
|------|-----------|-------|
| `server.js` | `PORT`, `NODE_ENV`, `MONGO_URI`, `CORS_ORIGIN` | Server setup, database connection, CORS |
| `controllers/authController.js` | `JWT_SECRET` | Token generation |
| `middleware/authMiddleware.js` | `JWT_SECRET` | Token verification |
| `middleware/errorMiddleware.js` | `NODE_ENV` | Error handling based on environment |

---

## 🚀 Development Setup

### Step 1: Create Frontend .env.local

```bash
cd Frontend/client
cp .env.example .env.local
```

Edit `.env.local`:
```env
VITE_API_URL=http://localhost:5000
VITE_EMAILJS_SERVICE_ID=service_xxxxx
VITE_EMAILJS_CONTACT_TEMPLATE_ID=template_contact_form
VITE_EMAILJS_BOOKING_TEMPLATE_ID=template_booking_notification
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

### Step 2: Create Backend .env

```bash
cd Backend/server
cp .env.example .env
```

Edit `.env`:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/parivartan
JWT_SECRET=dev-secret-key-change-in-production
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000,http://localhost:5173
```

### Step 3: Restart Servers

```bash
# Terminal 1 - Backend
cd Backend/server
npm start

# Terminal 2 - Frontend
cd Frontend/client
npm run dev
```

---

## 🌐 Production Deployment

### Frontend (Production)

Create `.env.local` with production values:

```env
# Use production backend URL
VITE_API_URL=https://api.parivartan-path.com

# EmailJS credentials
VITE_EMAILJS_SERVICE_ID=service_prod_xxxxx
VITE_EMAILJS_CONTACT_TEMPLATE_ID=template_contact_form
VITE_EMAILJS_BOOKING_TEMPLATE_ID=template_booking_notification
VITE_EMAILJS_PUBLIC_KEY=prod_public_key_here
```

Build for production:
```bash
npm run build
```

### Backend (Production)

Set environment variables on deployment platform:

**Render/Railway/Heroku**:
- Add variables in the platform's dashboard
- Or use `.env` file (but don't commit it!)

```env
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/parivartan
JWT_SECRET=production_secret_key_at_least_32_characters_very_secure_random_string
JWT_EXPIRES_IN=7d
CORS_ORIGIN=https://parivartan-path.com,https://www.parivartan-path.com
```

---

## 🔍 Checking Environment Variables

### Frontend

Open browser console and check:
```javascript
// Check if environment variables are loaded
console.log(import.meta.env.VITE_API_URL);
console.log(import.meta.env.VITE_EMAILJS_SERVICE_ID);
```

### Backend

```javascript
// Check if dotenv is loaded
console.log(process.env.MONGO_URI);
console.log(process.env.JWT_SECRET);
```

---

## 🛡️ Security Best Practices

### ✅ DO:
- ✅ Store `.env` files locally (don't commit)
- ✅ Use strong random secrets for JWT_SECRET
- ✅ Keep database credentials in `.env`
- ✅ Use HTTPS URLs in production
- ✅ Rotate secrets regularly
- ✅ Different secrets for dev/prod

### ❌ DON'T:
- ❌ Commit `.env` files to Git
- ❌ Store secrets in code
- ❌ Use same secrets for dev and prod
- ❌ Expose backend secrets in frontend
- ❌ Use weak/simple passwords
- ❌ Share .env files in chat/email

---

## 📝 .gitignore Rules

Ensure `.gitignore` has:

```gitignore
# Environment variables
.env
.env.local
.env.*.local
```

Check current .gitignore:
```bash
cat .gitignore | grep -E "\.env|\.env\.local"
```

---

## 🔄 Environment Variable Hierarchy

### Frontend (Vite)

```
1. .env.production.local (highest priority)
2. .env.production
3. .env.local
4. .env (lowest priority)
5. import.meta.env.VITE_API_URL || "http://localhost:5000" (fallback)
```

### Backend (dotenv)

```
1. process.env (system environment variables - highest)
2. .env file (lowest priority)
3. Default in code (fallback)
```

---

## 🧪 Testing Environment Variables

### Frontend

```javascript
// Check in React component
console.log("API URL:", import.meta.env.VITE_API_URL);
console.log("EmailJS Ready:", !!import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

// Should output:
// API URL: http://localhost:5000
// EmailJS Ready: true
```

### Backend

```javascript
// Check in server.js
console.log("PORT:", process.env.PORT);
console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("NODE_ENV:", process.env.NODE_ENV);

// Should output:
// PORT: 5000
// MONGO_URI: mongodb://localhost:27017/parivartan
// NODE_ENV: development
```

---

## 🐛 Troubleshooting

### ❌ "Cannot read property 'VITE_API_URL' of undefined"

**Cause**: `.env.local` file missing or incorrect

**Fix**:
```bash
# Create .env.local from template
cd Frontend/client
cp .env.example .env.local

# Edit and add values
# Restart: npm run dev
```

### ❌ "MONGO_URI is missing in environment variables"

**Cause**: Backend `.env` file missing

**Fix**:
```bash
cd Backend/server
cp .env.example .env

# Edit .env with valid MongoDB URI
# Restart: npm start
```

### ❌ "API request fails with 401"

**Cause**: Wrong API URL or backend not running

**Fix**:
```bash
# Check VITE_API_URL
console.log(import.meta.env.VITE_API_URL);

# Should show correct backend URL
# Make sure backend is running on that port
```

---

## 📋 Checklist

- [ ] Created `Frontend/client/.env.local` from `.env.example`
- [ ] Added `VITE_API_URL` pointing to backend
- [ ] Added EmailJS credentials (`VITE_EMAILJS_*`)
- [ ] Created `Backend/server/.env` from `.env.example`
- [ ] Added `MONGO_URI` with database connection
- [ ] Added `JWT_SECRET` (secure random string)
- [ ] Added `CORS_ORIGIN` with frontend URL
- [ ] Verified `.env` files in `.gitignore`
- [ ] Restarted both servers
- [ ] Tested API calls work
- [ ] Checked browser console for environment variables
- [ ] Prepared production `.env` values

---

## 📞 Reference

**Frontend Env Docs**: https://vitejs.dev/guide/env-and-mode.html  
**Backend Env Docs**: https://www.npmjs.com/package/dotenv  
**Deployment Platforms**:
- Render: https://render.com/docs/environment-variables
- Railway: https://docs.railway.app/guides/variables
- Heroku: https://devcenter.heroku.com/articles/config-vars

---

**Version**: 1.0  
**Status**: Refactored & Production-Ready ✅
