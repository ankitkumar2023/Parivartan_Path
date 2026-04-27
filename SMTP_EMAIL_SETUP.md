# SMTP Email System Setup Guide

## Overview

Your Parivartan Path backend now has a complete SMTP email system using Nodemailer. When users:
- **Submit a contact form** → Sends 2 emails (admin notification + user confirmation)
- **Book an appointment** → Sends 2 emails (admin notification + user confirmation)

All emails are sent asynchronously, so API responses are never delayed by email sending.

---

## ✅ Files Created/Modified

### New Files
- **`Backend/server/utils/sendEmail.js`** - Email utility with functions for sending emails
- **`SMTP_EMAIL_SETUP.md`** (this file) - Complete setup guide

### Modified Files
- **`Backend/server/controllers/contactController.js`** - Added email sending for contact form
- **`Backend/server/controllers/appointmentController.js`** - Added email sending for bookings
- **`Backend/server/package.json`** - Added `nodemailer` dependency
- **`Backend/server/.env`** - Added SMTP configuration variables
- **`Backend/server/.env.example`** - Added SMTP setup instructions

---

## 🔧 Installation & Setup

### Step 1: Install Nodemailer

```bash
cd Backend/server
npm install
```

This will install nodemailer based on the updated `package.json`.

### Step 2: Configure Gmail SMTP

This guide uses **Gmail with App Password** (recommended for security):

#### 2a. Enable 2-Factor Authentication
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Scroll to "2-Step Verification"
3. Follow the steps to enable 2FA

#### 2b. Generate App Password
1. Go to [App Passwords](https://myaccount.google.com/apppasswords)
2. Select **Mail** and **Windows Computer** (or your OS)
3. Click **Generate**
4. Copy the 16-character password (without spaces)

#### 2c. Update .env
In `Backend/server/.env`, update:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=ak7948683@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx    ← Paste your 16-char app password here (remove spaces)
ADMIN_EMAIL=ak7948683@gmail.com
```

### Step 3: Verify Setup

Run your server and test with:
- **Contact form submission** (POST `/api/contact`)
- **Appointment booking** (POST `/api/appointments`)

Check your email inbox and **Spam/Promotions folder** for confirmation emails.

---

## 📧 Email Functions

### `sendContactEmails(contactData)`
Sends contact form emails when user submits the form.

**Parameters:**
```javascript
{
  name: string,           // User's name
  email: string,          // User's email
  message: string         // Contact message
}
```

**Example:**
```javascript
import { sendContactEmails } from "../utils/sendEmail.js";

sendContactEmails({
  name: "John Doe",
  email: "john@example.com",
  message: "I need help with addiction recovery"
});
```

---

### `sendAppointmentEmails(appointmentData)`
Sends appointment confirmation emails when user books.

**Parameters:**
```javascript
{
  patientName: string,          // Patient's name
  userEmail: string,            // User's email
  addictionType: string,        // Service/addiction type
  appointmentDate: Date,        // Appointment date & time
  message: string,              // Optional additional notes
  appointmentId: string         // MongoDB appointment ID
}
```

**Example:**
```javascript
import { sendAppointmentEmails } from "../utils/sendEmail.js";

sendAppointmentEmails({
  patientName: "Jane Smith",
  userEmail: "jane@example.com",
  addictionType: "Alcohol Rehabilitation",
  appointmentDate: new Date("2026-05-15T14:30:00"),
  message: "First time seeking help",
  appointmentId: "507f1f77bcf86cd799439011"
});
```

---

## 🎨 Email Templates

### Contact Form - Admin Email
Shows:
- Sender's name and email
- Full contact message
- Timestamp
- Professional HTML formatting

### Contact Form - User Confirmation
Shows:
- Friendly greeting
- Confirmation that message was received
- User's message echoed back
- Next steps

### Appointment Booking - Admin Email
Shows:
- Patient name and email
- Service type
- Appointment date & time
- Booking ID
- Optional additional notes

### Appointment Booking - User Confirmation
Shows:
- Friendly greeting
- Full booking details
- Confirmation ID
- Important arrival instructions
- Optional notes

---

## 🔐 Error Handling

**All email sending is non-blocking:**
- Emails are sent asynchronously in the background
- API responses are **never delayed** by email failures
- If email fails:
  - Error is logged to console
  - API still returns success
  - User can still book/contact normally

**Example error handling in sendEmail.js:**
```javascript
Promise.all([
  sendEmail({ to: adminEmail, ... }),
  sendEmail({ to: userEmail, ... })
]).catch((error) => {
  console.error("Error sending emails:", error);
  // Error caught - API response already sent
});
```

---

## 🚀 Deployment (Vercel/Render)

### Environment Variables to Set

Set these in your hosting provider's dashboard:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=ak7948683@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx
ADMIN_EMAIL=ak7948683@gmail.com
```

**For Vercel:**
1. Go to Project Settings → Environment Variables
2. Add each variable
3. Redeploy

**For Render:**
1. Go to Environment → Environment Variables
2. Add each variable
3. Redeploy

---

## 🐛 Troubleshooting

### "SMTP configuration incomplete" warning
**Issue:** Missing SMTP environment variables
**Solution:** 
- Check `.env` file has all 4 SMTP variables
- Make sure values don't have extra spaces
- Restart the server

### Emails not received
**Check:**
1. Spam/Promotions folder in Gmail
2. Verify `SMTP_PASS` is correct (16 characters, no spaces)
3. Check browser console for errors
4. Check server logs: `npm run dev` should show "✅ Email sent successfully"

### "Invalid login: 535-5.7.8 Username and password not accepted"
**Solution:**
- Generate a NEW app password (don't use Gmail password)
- Make sure 2FA is enabled
- Remove all spaces from the 16-char password

### "Error: connect ECONNREFUSED"
**Solution:**
- Verify SMTP_HOST and SMTP_PORT are correct
- Gmail uses `smtp.gmail.com` and port `465` for SSL

---

## 📝 Testing Email System

### Test with cURL

**Contact Form:**
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message"
  }'
```

**Appointment Booking:**
```bash
curl -X POST http://localhost:5000/api/appointments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "patientName": "Test Patient",
    "addictionType": "Alcohol",
    "appointmentDate": "2026-05-20T14:30:00",
    "message": "First time booking"
  }'
```

---

## 📚 Files Reference

### sendEmail.js
```
Backend/server/utils/sendEmail.js
```

**Exports:**
- `sendEmail(options)` - Send single email
- `sendContactEmails(contactData)` - Send contact form emails
- `sendAppointmentEmails(appointmentData)` - Send appointment emails

### Controllers
```
Backend/server/controllers/contactController.js
Backend/server/controllers/appointmentController.js
```

Both now call email functions after successful database entry.

---

## ✨ Features

✅ **HTML Email Templates** - Professional, formatted emails
✅ **Admin Notifications** - Get notified of all bookings/contacts
✅ **User Confirmations** - Users get confirmation of their actions
✅ **Non-blocking** - Emails sent asynchronously, never delay API responses
✅ **Error Handling** - Gracefully handles email failures
✅ **Production Ready** - Works locally and on deployed servers
✅ **Date Formatting** - Dates formatted for Indian timezone (customizable)
✅ **Environment Based** - Different configs for dev/prod

---

## 🔄 What Happens When User Acts

### Contact Form Submission Flow:
1. User submits contact form
2. Data validated and saved to MongoDB
3. **Email #1:** Sent to admin (ak7948683@gmail.com)
4. **Email #2:** Sent to user (their email)
5. API returns success response (doesn't wait for emails)

### Appointment Booking Flow:
1. User books appointment
2. Data validated and saved to MongoDB
3. **Email #1:** Sent to admin (ak7948683@gmail.com)
4. **Email #2:** Sent to user (their email)
5. API returns success response (doesn't wait for emails)

---

## 🎯 Next Steps

1. ✅ Install nodemailer: `npm install`
2. ✅ Generate Gmail App Password
3. ✅ Update `.env` with SMTP credentials
4. ✅ Restart server: `npm run dev`
5. ✅ Test by submitting contact form or booking appointment
6. ✅ Check email inbox (including Spam folder)
7. ✅ Deploy and set environment variables in hosting provider

---

**Email System Ready! 🎉**
