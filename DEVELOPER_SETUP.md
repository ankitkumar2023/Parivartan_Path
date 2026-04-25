# 🚀 Developer Setup Guide - Parivartan Path

Complete step-by-step guide to set up the full-stack project locally.

---

## 📋 Prerequisites

Install these first:

- **Node.js** (v16+): https://nodejs.org/
- **npm** (comes with Node): `npm --version`
- **MongoDB**: https://www.mongodb.com/try/download/community
- **Git**: https://git-scm.com/
- **Code Editor**: VS Code recommended

### Verify Installation

```bash
node --version    # Should show v16+
npm --version     # Should show 8+
mongod --version  # Should show MongoDB version
git --version     # Should show git version
```

---

## 📁 Project Structure

```
Parivartan_Path/
├── Backend/
│   └── server/                    # Node.js + Express API
│       ├── package.json
│       ├── server.js
│       ├── .env.example           # ← Copy to .env
│       ├── setupAdmin.js
│       ├── controllers/
│       ├── routes/
│       ├── models/
│       ├── middleware/
│       └── node_modules/          # (created by npm install)
│
├── Frontend/
│   └── client/                    # React + Vite
│       ├── package.json
│       ├── .env.example           # ← Copy to .env.local
│       ├── src/
│       ├── index.html
│       ├── vite.config.js
│       └── node_modules/          # (created by npm install)
│
├── .gitignore                     # Git ignore rules
├── README.md
└── SETUP_GUIDE.md
```

---

## 🔧 Step 1: Clone Repository

```bash
# Clone the repo
git clone https://github.com/ankitkumar2023/Parivartan_Path.git

# Navigate to project
cd Parivartan_Path

# Verify structure
ls -la

# Should show: Backend/, Frontend/, .gitignore, README.md, etc.
```

---

## ⚙️ Step 2: Backend Setup

### 2.1 Navigate to Backend

```bash
cd Backend/server
```

### 2.2 Create .env File

```bash
# Copy example to .env
cp .env.example .env

# Edit .env with your values
# (Use your editor: VS Code, Sublime, etc.)
```

### 2.3 Configure .env File

Edit `Backend/server/.env`:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/parivartan
JWT_SECRET=your_super_secret_jwt_key_at_least_32_characters_very_secure
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000,http://localhost:5173
ADMIN_EMAIL=admin@parivartan.com
ADMIN_PASSWORD=Admin@123
```

### 2.4 Install Backend Dependencies

```bash
npm install

# Should complete without errors
# Creates: node_modules/ folder
```

### 2.5 Verify Backend Setup

```bash
# Check if server can start
npm start

# Should show:
# API running on port 5000 (development)
# Connected to MongoDB
# etc.

# Press Ctrl+C to stop
```

---

## 🎨 Step 3: Frontend Setup

### 3.1 Navigate to Frontend

```bash
# Open NEW terminal window (keep backend terminal open)
cd Frontend/client
```

### 3.2 Create .env.local File

```bash
# Copy example to .env.local
cp .env.example .env.local

# Edit .env.local with your values
```

### 3.3 Configure .env.local File

Edit `Frontend/client/.env.local`:

```env
VITE_API_URL=http://localhost:5000
VITE_EMAILJS_SERVICE_ID=service_xxxxx
VITE_EMAILJS_CONTACT_TEMPLATE_ID=template_contact_form
VITE_EMAILJS_BOOKING_TEMPLATE_ID=template_booking_notification
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

### 3.4 Install Frontend Dependencies

```bash
npm install

# Should complete without errors
# Creates: node_modules/ folder
```

### 3.5 Verify Frontend Setup

```bash
# Check if frontend can start
npm run dev

# Should show:
# Local: http://localhost:5173/
# Network: ...
# Press h + enter to show help

# Open browser: http://localhost:5173
# Should show Parivartan Path homepage

# Press Ctrl+C to stop
```

---

## 🗄️ Step 4: Database Setup

### 4.1 Start MongoDB

```bash
# Terminal 3 - Start MongoDB
mongod

# Should show:
# [initandlisten] Listening on 127.0.0.1:27017
# Do NOT close this terminal while working
```

### 4.2 Create Admin Account (Optional)

```bash
# Terminal 1 (backend terminal)
cd Backend/server

# Create admin account
node setupAdmin.js

# Should show:
# ✓ Connected to MongoDB
# ✓ Admin account created successfully!
#   Email: admin@parivartan.com
#   Password: Admin@123
```

---

## ✅ Step 5: Verify Everything Works

### 5.1 Check All Services Running

Keep these running:

```
Terminal 1: MongoDB
  mongod (listening on port 27017)

Terminal 2: Backend API
  npm start (listening on port 5000)

Terminal 3: Frontend
  npm run dev (listening on port 5173)
```

### 5.2 Test Frontend

1. Open browser: http://localhost:5173
2. ✅ Should see Parivartan Path homepage
3. Click "Services" → ✅ Should navigate
4. Click "Contact" → ✅ Should show contact form

### 5.3 Test Backend API

```bash
# Terminal 4 - Test API
curl http://localhost:5000/api/health

# Should return:
# {
#   "status": "ok",
#   "service": "rehab-center-api",
#   "env": "development"
# }
```

### 5.4 Test Login

1. Go to http://localhost:5173
2. Click "Login"
3. Create new account (or use admin account)
4. ✅ Should login successfully
5. ✅ Should redirect to Dashboard

---

## 📱 Development Workflow

### Working on Frontend

```bash
# Terminal 3 - Frontend
cd Frontend/client
npm run dev

# Make changes in src/
# Hot-reload happens automatically ✅
# Open http://localhost:5173
```

### Working on Backend

```bash
# Terminal 2 - Backend
cd Backend/server
npm start

# Make changes in controllers/, routes/, etc.
# Restart server (Ctrl+C, then npm start) to reload

# Or use auto-restart (optional):
# npm install -g nodemon
# nodemon server.js
```

### Checking Database

```bash
# Terminal 4 - MongoDB Shell
mongosh

# In shell:
> use parivartan
> db.users.find()
> db.appointments.find()
> exit
```

---

## 🧪 Testing Features

### Test Contact Form with Email

1. Go to http://localhost:5173/contact
2. Fill in form
3. Click "Send Message"
4. ✅ Should see success message
5. Check browser console for email logs

### Test Appointment Booking

1. Login at http://localhost:5173/login
2. Go to "Book Appointment"
3. Fill in form
4. Click "Book Appointment"
5. ✅ Should see success message
6. Check Dashboard → "Upcoming Appointments" count

### Test Admin Login

1. Go to http://localhost:5173/admin-login
2. Enter credentials:
   - Email: `admin@parivartan.com`
   - Password: `Admin@123`
3. ✅ Should redirect to Admin Dashboard

---

## 🛠️ Troubleshooting

### ❌ "MongoDB connection refused"

**Problem**: MongoDB not running

**Solution**:
```bash
# Terminal 1 - Start MongoDB
mongod

# Keep it running while developing
```

### ❌ "EADDRINUSE: address already in use :::5000"

**Problem**: Backend port 5000 already in use

**Solution**:
```bash
# Find process using port 5000
lsof -i :5000

# Kill it
kill -9 <PID>

# Or use different port
PORT=5001 npm start
```

### ❌ "Cannot find module 'dotenv'"

**Problem**: Dependencies not installed

**Solution**:
```bash
# Install dependencies
npm install

# Check node_modules exists
ls node_modules/
```

### ❌ "VITE_API_URL is undefined"

**Problem**: .env.local file missing or not created

**Solution**:
```bash
# Create .env.local
cp .env.example .env.local

# Add values
echo "VITE_API_URL=http://localhost:5000" >> .env.local

# Restart frontend
npm run dev
```

### ❌ "Login fails - 401 Unauthorized"

**Problem**: Backend not running or JWT token issue

**Solution**:
```bash
# Check backend is running
curl http://localhost:5000/api/health

# Check database has users
mongosh
> use parivartan
> db.users.find()

# Try registering new account instead
```

---

## 📚 Useful Commands

### Frontend

```bash
cd Frontend/client

npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Check code style
```

### Backend

```bash
cd Backend/server

npm install          # Install dependencies
npm start            # Start server
node setupAdmin.js   # Create admin account
npm test             # Run tests (if configured)
```

### Database

```bash
mongod              # Start MongoDB
mongosh             # Connect to MongoDB shell
# In mongosh:
> use parivartan
> db.users.find()
> db.appointments.find()
> exit
```

### Git

```bash
git status          # Check changes
git add .           # Stage all changes
git commit -m "message"
git push origin main
git pull origin main
```

---

## 📝 File Locations

| File | Location | Purpose |
|------|----------|---------|
| Backend env | `Backend/server/.env` | Backend configuration |
| Frontend env | `Frontend/client/.env.local` | Frontend configuration |
| Backend code | `Backend/server/` | Express server, routes, controllers |
| Frontend code | `Frontend/client/src/` | React components, pages |
| Database | Local MongoDB on port 27017 | User/appointment data |

---

## 🔄 Typical Development Session

```bash
# Terminal 1 - MongoDB
mongod

# Terminal 2 - Backend
cd Backend/server
npm start
# Listening on port 5000

# Terminal 3 - Frontend
cd Frontend/client
npm run dev
# Listening on port 5173

# Terminal 4 - Work/Test
# Edit code, make changes, test in browser
# Open http://localhost:5173
```

---

## 🚀 Next Steps

1. ✅ Follow setup steps above
2. ✅ Verify all services running
3. ✅ Test features
4. ✅ Read documentation:
   - `ENVIRONMENT_VARIABLES.md` - Config guide
   - `SETUP_GUIDE.md` - Detailed setup
   - `IMPLEMENTATION_SUMMARY.md` - Features overview
5. ✅ Start developing!

---

## 💡 Tips

- Keep all 3 terminals (MongoDB, Backend, Frontend) running during development
- Use browser DevTools (F12) to debug frontend
- Use `console.log()` in code for debugging
- Check browser console for JavaScript errors
- Check backend terminal for server logs
- Use Postman/Insomnia to test API endpoints directly

---

## 📞 Need Help?

Check these files first:
- `ENVIRONMENT_VARIABLES.md` - Configuration issues
- `EMAILJS_SETUP.md` - Email configuration
- `FIXES_APPLIED.md` - Common issues and solutions

---

**Happy Coding! 🎉**
