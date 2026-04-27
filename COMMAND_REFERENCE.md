# Email System - Command Reference Guide

## 🚀 Installation Commands

### Step 1: Install Dependencies
```bash
cd Backend/server
npm install
```

### Step 2: Run Development Server
```bash
npm run dev
```

### Step 3: Run Production Server
```bash
npm start
```

---

## 📧 Testing Commands (cURL)

### Test Contact Form Email

**Basic:**
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message"
  }'
```

**With Special Characters:**
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "José María",
    "email": "test@example.com",
    "message": "Testing with special chars: €, ©, ®"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Message received. We will contact you soon.",
  "contactId": "507f1f77bcf86cd799439011"
}
```

---

### Test Appointment Booking Email

**Step 1: Register User**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "testuser@example.com",
    "password": "TestPassword123!",
    "phone": "9876543210"
  }'
```

**Step 2: Login to Get Token**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "TestPassword123!"
  }'
```

Extract the `token` from response.

**Step 3: Book Appointment**
```bash
curl -X POST http://localhost:5000/api/appointments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "patientName": "John Doe",
    "addictionType": "Alcohol Rehabilitation",
    "appointmentDate": "2026-05-20T14:30:00",
    "message": "First time seeking help"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "appointment": {
    "_id": "507f1f77bcf86cd799439012",
    "patientName": "John Doe",
    "addictionType": "Alcohol Rehabilitation",
    "appointmentDate": "2026-05-20T14:30:00.000Z",
    "status": "Pending"
  }
}
```

---

## 🔧 Environment Variable Setup

### .env File Template
```env
# Server
NODE_ENV=development
PORT=5000

# Database
MONGO_URI=your_mongodb_uri

# Auth
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:5173,https://your-frontend.com

# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-email@gmail.com
SMTP_PASS=your_16_char_app_password
ADMIN_EMAIL=admin@example.com
```

### Generating Gmail App Password
```
1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" and "Windows Computer" (or your OS)
3. Click "Generate"
4. Copy the 16-character password (without spaces)
5. Paste in SMTP_PASS in .env
```

---

## 📂 File Organization

### New Files
```bash
# Email utility
Backend/server/utils/sendEmail.js

# Documentation
EMAIL_QUICK_REFERENCE.md
EMAIL_SYSTEM_SUMMARY.md
SMTP_EMAIL_SETUP.md
COMPLETE_CODE_CHANGES.md
EMAIL_ARCHITECTURE.md
EMAIL_TESTING_GUIDE.md
EMAIL_SYSTEM_INDEX.md
EMAIL_IMPLEMENTATION_COMPLETE.md
EMAIL_IMPLEMENTATION_VISUAL_SUMMARY.md
COMMAND_REFERENCE.md (this file)
```

### Modified Files
```bash
# Controllers
Backend/server/controllers/contactController.js
Backend/server/controllers/appointmentController.js

# Configuration
Backend/server/package.json
Backend/server/.env
Backend/server/.env.example
```

---

## 🐛 Debugging Commands

### Check Node Version
```bash
node --version
```

### Check npm Packages
```bash
npm list nodemailer
```

### Run Server with Verbose Logging
```bash
NODE_DEBUG=http npm run dev
```

### Check Environment Variables
```bash
# On Windows (PowerShell)
$env:VITE_API_URL

# On Linux/Mac
echo $VITE_API_URL
```

### View Server Logs in Real-time
```bash
npm run dev 2>&1 | tee server.log
```

---

## 🧪 Monitoring & Logs

### View Console Logs
```bash
# Success message
✅ Email sent successfully: 250 2.0.0 OK...

# Warning message
⚠️ SMTP configuration incomplete. Email not sent.

# Error message
❌ Email sending failed: [Error details]
```

### Check Sent Emails
```bash
# Check your Gmail inbox
1. Open https://mail.google.com
2. Check Inbox
3. Also check Spam/Promotions folder
```

---

## 🚀 Deployment Commands

### Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod

# Set environment variables in dashboard
# Settings → Environment Variables
```

### Deploy to Render
```bash
# Connect your GitHub repo
# Set environment variables in dashboard
# Environment → Environment Variables
# Redeploy from dashboard
```

### Deploy to Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set SMTP_HOST=smtp.gmail.com
heroku config:set SMTP_PORT=465
heroku config:set SMTP_USER=your-email@gmail.com
heroku config:set SMTP_PASS=your_password
heroku config:set ADMIN_EMAIL=admin@example.com

# Deploy
git push heroku main
```

---

## 🔍 Verification Commands

### Verify Installation
```bash
# Check Node
node -v

# Check npm
npm -v

# Check dependencies
npm list

# Check nodemailer specifically
npm list nodemailer
```

### Verify Email Files
```bash
# Check if sendEmail.js exists
ls -la Backend/server/utils/sendEmail.js

# Check if controllers updated
grep -n "sendContactEmails" Backend/server/controllers/contactController.js
grep -n "sendAppointmentEmails" Backend/server/controllers/appointmentController.js
```

### Verify Environment Setup
```bash
# Check .env exists
ls -la Backend/server/.env

# Check required variables
grep -E "SMTP_|ADMIN_EMAIL" Backend/server/.env
```

---

## 📊 Performance Testing

### Load Testing Contact Form
```bash
# Send 10 requests in parallel
for i in {1..10}; do
  curl -X POST http://localhost:5000/api/contact \
    -H "Content-Type: application/json" \
    -d "{\"name\":\"User$i\",\"email\":\"user$i@test.com\",\"message\":\"Test\"}" &
done
```

### Monitor Response Times
```bash
# Get timing information
curl -w "\nResponse time: %{time_total}s\n" \
  -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","message":"Test"}'
```

---

## 🔐 Security Verification

### Check for Hardcoded Secrets
```bash
# Search for hardcoded passwords (should find none)
grep -r "SMTP_PASS=" Backend/server/utils/
grep -r "password" Backend/server/utils/sendEmail.js
```

### Verify .env in .gitignore
```bash
# Check if .env is ignored
cat Backend/server/.gitignore | grep .env

# Should output:
# .env
```

### Verify No Secrets in Logs
```bash
# Check sendEmail.js doesn't log sensitive data
grep -i "password\|secret\|token" Backend/server/utils/sendEmail.js | grep console

# Should return nothing or only safe logs
```

---

## 📝 Useful Database Commands

### Check Contact Documents
```bash
# MongoDB shell
use your_database_name
db.contacts.find()

# Show last 5 contacts
db.contacts.find().sort({createdAt:-1}).limit(5)
```

### Check Appointment Documents
```bash
# MongoDB shell
db.appointments.find()

# Show appointments for specific user
db.appointments.find({userId:"user_id_here"})
```

### Count Documents
```bash
# Count total contacts
db.contacts.countDocuments()

# Count total appointments
db.appointments.countDocuments()
```

---

## 🧹 Cleanup Commands

### Clear Node Modules
```bash
rm -rf Backend/server/node_modules
npm install
```

### Clear Package Lock
```bash
rm Backend/server/package-lock.json
npm install
```

### Reset Database
```bash
# MongoDB - drop entire database (CAREFUL!)
use your_database_name
db.dropDatabase()
```

---

## 📈 Monitoring Commands

### Check Disk Usage
```bash
# Check size of node_modules
du -sh Backend/server/node_modules

# Check size of entire backend
du -sh Backend/server
```

### Check Memory Usage
```bash
# While running server
node --max-old-space-size=512 Backend/server/server.js

# On Windows (PowerShell)
Get-Process node | Select-Object WS
```

---

## 🆘 Troubleshooting Commands

### Test SMTP Connection
```bash
# Using telnet (if available)
telnet smtp.gmail.com 465

# Or use openssl
openssl s_client -connect smtp.gmail.com:465
```

### Check DNS Resolution
```bash
# Check if domain resolves
ping smtp.gmail.com
nslookup smtp.gmail.com

# On Windows
nslookup smtp.gmail.com
```

### View System Processes
```bash
# List all Node processes
ps aux | grep node

# On Windows (PowerShell)
Get-Process node
```

### Clear Cache
```bash
# Clear npm cache
npm cache clean --force

# Clear Node cache
rm -rf ~/.node_modules
```

---

## 📚 Documentation Quick Links

| Need | Command | File |
|------|---------|------|
| Quick start | `npm install` | EMAIL_QUICK_REFERENCE.md |
| Setup help | Follow steps | SMTP_EMAIL_SETUP.md |
| Code review | Read file | COMPLETE_CODE_CHANGES.md |
| Test procedures | Use cURL | EMAIL_TESTING_GUIDE.md |
| Architecture | View diagrams | EMAIL_ARCHITECTURE.md |

---

## ✅ Quick Health Check

```bash
# Run this to verify setup
echo "=== Email System Health Check ==="
echo ""
echo "1. Checking Node.js"
node --version
echo ""
echo "2. Checking npm"
npm --version
echo ""
echo "3. Checking nodemailer"
npm list nodemailer
echo ""
echo "4. Checking files"
ls Backend/server/utils/sendEmail.js && echo "✅ sendEmail.js found" || echo "❌ sendEmail.js missing"
echo ""
echo "5. Checking .env"
[ -f Backend/server/.env ] && echo "✅ .env exists" || echo "❌ .env missing"
echo ""
echo "6. Starting server..."
npm run dev
```

---

## 🎯 Common Tasks

### Change Admin Email
1. Edit `.env`
2. Find `ADMIN_EMAIL=...`
3. Change value
4. Restart server

### Change Email Template
1. Edit `Backend/server/utils/sendEmail.js`
2. Find the HTML template
3. Modify HTML
4. Restart server

### Test with Different Email
1. Update `.env` with new email for `SMTP_USER`
2. Generate new Gmail App Password
3. Update `SMTP_PASS`
4. Restart server

### Add New Email Recipient
1. Create new function in `sendEmail.js`
2. Copy `sendEmail()` function
3. Modify to send to different recipient
4. Call from controller
5. Restart server

---

## 🚀 Quick Deploy Checklist

```bash
# Before deployment
✅ npm install
✅ npm run dev (test locally)
✅ Set all environment variables
✅ Test contact form
✅ Test appointment booking
✅ Check server logs

# Deploy commands
git add .
git commit -m "Add email system"
git push origin main  # or your branch

# After deployment
✅ Set env vars on hosting
✅ Redeploy
✅ Test in production
✅ Check server logs
✅ Monitor for 24 hours
```

---

## 📞 Getting Help

| Issue | Command | File |
|-------|---------|------|
| Setup | Follow steps | SMTP_EMAIL_SETUP.md |
| Testing | Use cURL examples | EMAIL_TESTING_GUIDE.md |
| Errors | Check logs | Console output |
| Code | Review code | COMPLETE_CODE_CHANGES.md |
| Architecture | View diagrams | EMAIL_ARCHITECTURE.md |

---

**Reference Complete! 🎉**

Bookmark this file for quick access to all commands and procedures.
