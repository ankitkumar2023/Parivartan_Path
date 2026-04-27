# Email System - Quick Reference

## 🚀 Quick Setup (5 minutes)

### 1. Install
```bash
cd Backend/server && npm install
```

### 2. Get Gmail App Password
- Go to https://myaccount.google.com/apppasswords
- Select Mail + your device
- Copy the 16-character password

### 3. Update .env
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=ak7948683@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx
ADMIN_EMAIL=ak7948683@gmail.com
```

### 4. Restart Server
```bash
npm run dev
```

### 5. Test
Submit a contact form or book an appointment, then check your email!

---

## 📧 What Happens Automatically

### When Contact Form is Submitted:
✉️ **Admin Email** → ak7948683@gmail.com (notification)
✉️ **User Email** → their email (confirmation)

### When Appointment is Booked:
✉️ **Admin Email** → ak7948683@gmail.com (notification with details)
✉️ **User Email** → their email (confirmation with details)

---

## 🎨 Email Templates

All emails have **professional HTML formatting** with:
- Company branding
- Clear information hierarchy
- Mobile-friendly design
- Call-to-action buttons/next steps

---

## 🔧 For Developers

### Use in Your Code
```javascript
import { sendContactEmails } from "../utils/sendEmail.js";
import { sendAppointmentEmails } from "../utils/sendEmail.js";

// Send contact emails
sendContactEmails({
  name: "User Name",
  email: "user@example.com",
  message: "Message content"
});

// Send appointment emails
sendAppointmentEmails({
  patientName: "Patient Name",
  userEmail: "user@example.com",
  addictionType: "Service Type",
  appointmentDate: new Date(),
  message: "Optional notes",
  appointmentId: "MongoDB ID"
});
```

---

## ⚡ Key Features

- **Non-blocking** - API responds immediately
- **Error-resilient** - Failed emails don't break API
- **Production-ready** - Works on Vercel, Render, etc.
- **Well-logged** - See success/failures in console
- **Secure** - Uses app passwords, never exposes credentials

---

## 🆘 Common Issues

| Problem | Fix |
|---------|-----|
| No emails | Check spam folder, verify SMTP_PASS is correct (no spaces) |
| "Username and password not accepted" | Generate NEW app password (don't use Gmail password) |
| "SMTP not configured" | Make sure .env has all 4 SMTP variables |

---

## 📂 Files

- **`Backend/server/utils/sendEmail.js`** - Email functions
- **`Backend/server/.env`** - Configuration
- **`SMTP_EMAIL_SETUP.md`** - Full setup guide
- **`EMAIL_SYSTEM_SUMMARY.md`** - Detailed summary

---

## 📋 Environment Variables

Required in `.env`:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-email@gmail.com
SMTP_PASS=16-character-app-password
ADMIN_EMAIL=admin@example.com
```

**On Vercel/Render:** Add these to Environment Variables in dashboard

---

**Ready to go! 🎉**

For detailed guide: See `SMTP_EMAIL_SETUP.md`
