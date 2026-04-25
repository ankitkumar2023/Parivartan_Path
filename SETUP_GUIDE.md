# 📧 Parivartan Path - Email & Admin Setup Guide

This guide covers setting up email notifications and admin authentication for the Parivartan Path application.

## 🔧 Requirements

### Frontend
- EmailJS account (free tier available at https://www.emailjs.com/)
- Node.js and npm installed
- React environment variables configured

### Backend
- MongoDB database running
- Node.js server running
- Admin account setup

---

## 📧 Step 1: Email Service Setup (EmailJS)

### Create EmailJS Account

1. **Sign up** at https://www.emailjs.com/
2. **Create a Gmail account** (or use existing) for Parivartan Path: `ParivartanpathFoundation24@gmail.com`
3. Once logged in, navigate to **Email Services** in the dashboard
4. Click **Add New Service**
5. Select **Gmail** and follow the connection wizard
6. Your service ID will be something like `service_xxxxx`

### Get Your Credentials

1. Go to **EmailJS Dashboard** → **Account Settings**
2. Copy your **Public Key** (you'll need this)
3. Go to **Email Services** and note your **Service ID**
4. Go to **Email Templates** and create templates:

### Create Email Templates

**Template 1: Contact Form (template_contact_form)**
```
Subject: New Contact Form Submission from {{from_name}}

From: {{from_name}} <{{from_email}}>
Message:
{{message}}

---
Timestamp: {{timestamp}}
Reply-to: {{reply_to}}
```

**Template 2: Booking Notification (template_booking_notification)**
```
Subject: New Service Booking - {{service_name}}

User Details:
Name: {{user_name}}
Email: {{user_email}}
Phone: {{user_phone}}

Booking Details:
Service: {{service_name}}
Appointment Date: {{appointment_date}}
Booking ID: {{booking_id}}

---
Timestamp: {{timestamp}}
Reply-to: {{reply_to}}
```

---

## 🔐 Step 2: Update Email Service Configuration

### Update Frontend Environment Variables

Create a `.env.local` file in `Frontend/client/`:

```env
VITE_API_URL=http://localhost:5000
VITE_EMAILJS_SERVICE_ID=service_xxxxx
VITE_EMAILJS_CONTACT_TEMPLATE_ID=template_contact_form
VITE_EMAILJS_BOOKING_TEMPLATE_ID=template_booking_notification
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

### Update Email Service File

Edit `src/services/emailService.js`:

```javascript
// Replace these with your actual values:
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_parivartan";
const CONTACT_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID || "template_contact_form";
const BOOKING_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_BOOKING_TEMPLATE_ID || "template_booking_notification";
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "your_public_key_here";
```

---

## 👨‍💼 Step 3: Admin Account Setup

### Backend Setup

1. **Install dependencies** (if not already installed):
   ```bash
   cd Backend/server
   npm install
   ```

2. **Run the admin setup script**:
   ```bash
   node setupAdmin.js
   ```

3. This creates an admin account with default credentials:
   - Email: `admin@parivartan.com`
   - Password: `Admin@123`

### Custom Admin Credentials (Optional)

To use different credentials, set environment variables before running the script:

```bash
# Linux/Mac
export ADMIN_EMAIL="youremail@example.com"
export ADMIN_PASSWORD="YourSecurePassword123"
export ADMIN_NAME="Your Name"
node setupAdmin.js

# Windows (PowerShell)
$env:ADMIN_EMAIL="youremail@example.com"
$env:ADMIN_PASSWORD="YourSecurePassword123"
$env:ADMIN_NAME="Your Name"
node setupAdmin.js
```

### Accessing Admin Dashboard

1. Go to `http://localhost:3000/admin-login`
2. Enter admin credentials:
   - Email: `admin@parivartan.com`
   - Password: `Admin@123`
3. After successful login, you'll be redirected to `/admin-dashboard`
4. Regular users will see their dashboard at `/dashboard`

---

## 🧪 Testing Email Functionality

### Test Contact Form Email

1. Navigate to `/contact` page
2. Fill in the form with test data:
   - Name: "Test User"
   - Email: "test@example.com"
   - Message: "This is a test message"
3. Click "Send message"
4. Check both email addresses:
   - `ParivartanpathFoundation24@gmail.com` (Primary)
   - `ak7948683@gmail.com` (CC/Secondary - if configured)

### Test Booking Email

1. Login as a regular user (or register new account)
2. Go to `/book-appointment`
3. Fill in and submit the booking form
4. Check emails for booking notification

### Verify Emails Received

Check the EmailJS dashboard to confirm:
- Emails were sent successfully
- Template variables were properly replaced
- No errors in the email log

---

## 🔑 Environment Variables Summary

### Frontend (.env.local)
```env
VITE_API_URL=http://localhost:5000
VITE_EMAILJS_SERVICE_ID=service_xxxxx
VITE_EMAILJS_CONTACT_TEMPLATE_ID=template_contact_form
VITE_EMAILJS_BOOKING_TEMPLATE_ID=template_booking_notification
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/parivartan
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
PORT=5000
NODE_ENV=development

# Optional - for admin setup
ADMIN_EMAIL=admin@parivartan.com
ADMIN_PASSWORD=Admin@123
ADMIN_NAME=Administrator
```

---

## 🚨 Security Notes

⚠️ **Important Security Guidelines:**

1. **Never commit `.env.local` to Git** - Add it to `.gitignore`
2. **Change default admin password** after first login in production
3. **Use secure, unique passwords** for admin accounts
4. **Enable Two-Factor Authentication** in EmailJS if available
5. **Rotate JWT_SECRET** regularly
6. **Keep MongoDB credentials** in environment variables only
7. **Use HTTPS in production** for all communications

---

## 🐛 Troubleshooting

### Emails not sending?

1. **Check EmailJS credentials** in `emailService.js`
2. **Verify service ID and template IDs** match your EmailJS account
3. **Check email address** in form matches required format
4. **Look at EmailJS dashboard logs** for error messages
5. **Ensure Gmail account** is set up in EmailJS services

### Admin login not working?

1. **Verify MongoDB is running**: `mongod --version`
2. **Check admin account exists**: Query MongoDB for admin user
3. **Ensure JWT_SECRET** is set in `.env`
4. **Check browser console** for any error messages
5. **Verify auth credentials** are correct in AdminLogin.jsx

### Admin dashboard not showing?

1. **Confirm user role is "admin"** in database
2. **Check ProtectedRoute component** validates role correctly
3. **Verify token is stored** in localStorage
4. **Check Redux auth state** in browser devtools

---

## 📱 Features Enabled

After completing this setup:

✅ **Contact Form**
- Sends emails from contact page
- Recipients: ParivartanpathFoundation24@gmail.com

✅ **Booking Notifications**
- Automatic emails when appointments are booked
- Booking details included in email

✅ **Admin Portal**
- Secure admin login at `/admin-login`
- Role-based dashboard access
- Admin-only features and data

✅ **User Roles**
- Admins: Access to `/admin-dashboard`
- Users: Access to `/dashboard`
- Automatic redirect based on role

✅ **Favicon**
- Company logo displays in browser tab
- Parivartan_path_logo.jpeg configured

---

## 📞 Support Email

**Primary Contact**: ParivartanpathFoundation24@gmail.com

This email is now configured throughout the application for all support inquiries and booking notifications.

---

## 🔄 Next Steps

1. ✅ Set up EmailJS account
2. ✅ Configure environment variables
3. ✅ Run admin setup script
4. ✅ Test email sending
5. ✅ Test admin login
6. ✅ Deploy to production

For questions or issues, refer to the troubleshooting section or check the EmailJS documentation.
