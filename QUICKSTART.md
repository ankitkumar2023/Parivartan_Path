# ⚡ Quick Start Guide - Email & Admin Features

Get Parivartan Path running with email and admin features in 5 minutes!

---

## 🎯 Prerequisites
- Node.js 16+ installed
- MongoDB running locally
- Git (optional)

---

## 1️⃣ Install Dependencies (2 min)

```bash
# Frontend
cd Frontend/client
npm install

# Backend
cd ../../Backend/server
npm install
```

---

## 2️⃣ Setup Admin Account (30 sec)

```bash
cd Backend/server
node setupAdmin.js
```

✅ Creates admin with:
- Email: `admin@parivartan.com`
- Password: `Admin@123`

---

## 3️⃣ Configure Email (2 min)

### A. Sign up for EmailJS
1. Go to https://www.emailjs.com/
2. Create account (free)
3. Get your **Public Key** from Account settings
4. Note your **Service ID** from Email Services
5. Create templates (see SETUP_GUIDE.md for template code)

### B. Create `.env.local` in `Frontend/client/`
```env
VITE_API_URL=http://localhost:5000
VITE_EMAILJS_SERVICE_ID=service_xxx
VITE_EMAILJS_PUBLIC_KEY=your_key_here
```

---

## 4️⃣ Start Application (30 sec)

**Terminal 1 - MongoDB**
```bash
mongod
```

**Terminal 2 - Backend**
```bash
cd Backend/server
npm start
```

**Terminal 3 - Frontend**
```bash
cd Frontend/client
npm run dev
```

---

## 5️⃣ Test Everything

### ✅ Admin Login
1. Open http://localhost:3000/admin-login
2. Click "View Test Credentials"
3. Click "Auto-fill Test Credentials"
4. Click "Sign In as Admin"
5. Should see Admin Dashboard ✅

### ✅ Contact Form
1. Open http://localhost:3000/contact
2. Fill form with test data
3. Click "Send message"
4. Check your inbox for email ✅

### ✅ User Login
1. Open http://localhost:3000/register
2. Create new account
3. Should redirect to `/dashboard` ✅

---

## 📱 Testing Credentials

**Admin Login:**
- Email: `admin@parivartan.com`
- Password: `Admin@123`

**Test User Creation:**
- Use registration form
- Or create via MongoDB

---

## 🚨 Troubleshooting

### ❌ Email not sending?
```
→ Check .env.local has credentials
→ Verify EmailJS account setup
→ Check browser console for errors
```

### ❌ Admin login failing?
```
→ Ensure setupAdmin.js was run
→ Check MongoDB is running (mongod)
→ Verify credentials are correct
```

### ❌ Favicon not showing?
```
→ Hard refresh: Ctrl+Shift+R
→ Check public/Parivartan_path_logo.jpeg exists
```

---

## 📚 Full Docs

- **Setup Details**: See `SETUP_GUIDE.md`
- **Implementation**: See `IMPLEMENTATION_SUMMARY.md`
- **Architecture**: See conversation summary

---

## 🎉 You're Ready!

Admin Features: ✅  
Email Integration: ✅  
Favicon: ✅  
Role-Based Access: ✅  

**Next**: Configure production settings and deploy!

---

## 🔗 Useful Links

- 📧 EmailJS: https://www.emailjs.com/
- 🍃 MongoDB: https://www.mongodb.com/
- ⚛️ React: https://react.dev/
- 🛣️ React Router: https://reactrouter.com/

---

For detailed setup instructions, see `SETUP_GUIDE.md`
