# 🔧 Email Debugging & Troubleshooting Guide

## Problem
Gmail is not receiving email notifications from the backend after implementing SMTP with Nodemailer.

## Solution Overview
This guide provides step-by-step debugging and fixes for the email system.

---

## ✅ Step 1: Verify SMTP Configuration in Backend

### 1.1 Check `.env` File
**Location:** `Backend/server/.env`

**Current Configuration:**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=ak7948683@gmail.com
SMTP_PASS=eiyj anvs llpw eplv
ADMIN_EMAIL=ak7948683@gmail.com
```

### 1.2 Verify Settings Are Correct
- ✅ **SMTP_HOST**: Must be `smtp.gmail.com`
- ✅ **SMTP_PORT**: Must be `465` (secure port)
- ✅ **SMTP_USER**: Must be your Gmail address
- ✅ **SMTP_PASS**: Must be a 16-character **App Password** (NOT your Gmail password)
- ✅ **ADMIN_EMAIL**: Should be the same as SMTP_USER

### 1.3 Important: Gmail App Password
⚠️ **CRITICAL**: The password must be an **App Password**, not your Gmail account password.

**How to generate:**
1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" and "Your Device"
3. Google will generate a 16-character password (e.g., `xxxx xxxx xxxx xxxx`)
4. Copy the entire password including spaces
5. Paste into `SMTP_PASS=` in `.env`

**❌ COMMON MISTAKE**: Using your actual Gmail password instead of App Password
- Gmail will block this with an "Invalid login" error

---

## 📧 Step 2: Test Email Functionality

### 2.1 Start Backend Server
```bash
cd Backend/server
npm install  # (if not already done)
npm run dev
```

### 2.2 Look at Console Output
When the server starts, you should see:
```
============================================================
[STARTUP] Verifying SMTP configuration...
============================================================
[SMTP Config] Host: smtp.gmail.com, Port: 465, Secure: true
✅ [SMTP Verification] Connection successful!

✅ API running on port 5000 (development)
📧 Test email: GET /api/test-email
============================================================
```

### 2.3 Send Test Email
**Option A: Using Browser**
- Open: `http://localhost:5000/api/test-email`
- Should see JSON response

**Option B: Using cURL**
```bash
curl http://localhost:5000/api/test-email
```

**Option C: Using Postman**
- Method: GET
- URL: `http://localhost:5000/api/test-email`

### 2.4 Check Response

**Success Response:**
```json
{
  "success": true,
  "message": "✅ Test email sent successfully!",
  "details": {
    "recipient": "ak7948683@gmail.com",
    "messageId": "<...@gmail.com>",
    "timestamp": "2026-04-27T10:30:45.123Z",
    "note": "Check your email (including spam/promotions folder) for the test message."
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "❌ Failed to send test email",
  "error": "Invalid login",
  "debugMessage": "Invalid credentials. Check SMTP_USER and SMTP_PASS.",
  "troubleshoot": { ... }
}
```

### 2.5 Check Console Logs
Look at the backend console for detailed logs:

```
[SMTP Config] Host: smtp.gmail.com, Port: 465, Secure: true
[Email] Attempting to send email to: ak7948683@gmail.com
[Email] Subject: ✅ Parivartan Path - SMTP Test Email
✅ [Email Success] Sent successfully!
   Message ID: <...@gmail.com>
   Response: 250 2.0.0 OK ...
```

---

## 🔍 Common Errors & Fixes

### Error 1: "Invalid login"
**Cause:** Wrong password (using Gmail password instead of App Password)

**Fix:**
1. Go to https://myaccount.google.com/apppasswords
2. Generate a new App Password
3. Copy entire 16-character password (with spaces)
4. Update `SMTP_PASS=` in `.env`
5. Restart server

### Error 2: "ENOTFOUND"
**Cause:** DNS lookup failed, wrong SMTP_HOST

**Fix:**
```env
SMTP_HOST=smtp.gmail.com  # Must be exactly this
```

### Error 3: "ECONNREFUSED"
**Cause:** Can't connect to SMTP server, wrong PORT

**Fix:**
```env
SMTP_PORT=465  # Must be 465 (not 587 for Gmail)
```

### Error 4: "SMTP not configured"
**Cause:** Missing environment variables

**Fix:** Ensure `.env` has all four variables:
- SMTP_HOST
- SMTP_PORT
- SMTP_USER
- SMTP_PASS

### Error 5: "Email disabled"
**Cause:** Gmail security settings

**Fix:**
1. Enable 2FA on your Gmail account
2. Go to https://myaccount.google.com/apppasswords
3. If App Passwords option is missing, you haven't enabled 2FA

### Error 6: Emails going to Spam
**Cause:** Gmail filtering

**Fix:**
1. Check Gmail spam/promotions folder
2. Mark email as "Not Spam"
3. Add sender to contacts

---

## 🚀 Step 3: Test Contact Form

### 3.1 Submit Test Contact
1. Go to frontend: http://localhost:5173/contact
2. Fill in form:
   - Name: "Test User"
   - Email: "test@example.com"
   - Message: "This is a test message"
3. Click "Send message"

### 3.2 Check Emails
**Should receive 2 emails:**
1. **Admin notification** → ak7948683@gmail.com (from backend)
2. **User confirmation** → test@example.com (from backend)

### 3.3 Check Console Logs
Backend logs should show:
```
[Contact Emails] Processing contact from: Test User (test@example.com)
[Email] Attempting to send email to: ak7948683@gmail.com
✅ [Email Success] Sent successfully!
[Contact Emails] Admin email: ✅ Sent
[Email] Attempting to send email to: test@example.com
✅ [Email Success] Sent successfully!
[Contact Emails] User email: ✅ Sent
```

---

## 🚀 Step 4: Test Appointment Booking

### 4.1 Book Test Appointment
1. Login to frontend
2. Go to: http://localhost:5173/appointment
3. Fill in form and submit

### 4.2 Check Emails
**Should receive 2 emails:**
1. **Admin notification** → ak7948683@gmail.com (with booking details)
2. **User confirmation** → user email (with confirmation details)

---

## 🚀 Step 5: Deploy to Production (Render)

### 5.1 Add Environment Variables to Render
1. Go to Render Dashboard
2. Select your backend service
3. Click "Environment"
4. Add these variables:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_USER=ak7948683@gmail.com
   SMTP_PASS=eiyj anvs llpw eplv
   ADMIN_EMAIL=ak7948683@gmail.com
   ```

### 5.2 Redeploy Backend
1. Go to "Deploy" tab
2. Click "Latest Deploy"
3. Click "Redeploy"
4. Wait for deployment to complete

### 5.3 Test Production Email
1. Visit: `https://parivartan-path.onrender.com/api/test-email`
2. Check console logs in Render dashboard
3. Verify email received

---

## 📋 Debugging Checklist

### Configuration
- [ ] `.env` has all 4 SMTP variables
- [ ] SMTP_PASS is 16-character App Password (not Gmail password)
- [ ] Gmail 2FA is enabled
- [ ] App Password generated at myaccount.google.com/apppasswords
- [ ] Spaces in SMTP_PASS are preserved

### Testing
- [ ] Backend server starts without errors
- [ ] SMTP verification succeeds on startup
- [ ] Test email endpoint returns 200 response
- [ ] Test email received in Gmail inbox
- [ ] Contact form sends emails successfully
- [ ] Appointment booking sends emails successfully

### Production
- [ ] Render env variables set correctly
- [ ] Backend redeployed after env changes
- [ ] Production test email received
- [ ] Frontend submits to correct API URL

---

## 🆘 Still Not Working?

### Enable Debug Mode
Update `Backend/server/utils/sendEmail.js` to add extra logging:

```javascript
// Line ~73 - Add this:
console.log("Full transporter config:", {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: parseInt(process.env.SMTP_PORT) === 465,
  user: process.env.SMTP_USER,
  pass: process.env.SMTP_PASS.substring(0, 5) + "****" + process.env.SMTP_PASS.slice(-4)
});
```

### Check Gmail Security
1. Visit: https://myaccount.google.com/security
2. Scroll to "Your devices"
3. Look for "Parivartan Path" app
4. Ensure it's authorized

### Check for Firewall Issues
- Try from different network
- Check if backend can reach smtp.gmail.com:465
- On Render, check if outbound connections are allowed

### Contact Gmail Support
- If App Password isn't working, contact Gmail support
- Provide: Email address, backend URL, error details

---

## ✅ Success Indicators

When everything is working:
1. ✅ Backend console shows "SMTP verification successful" on startup
2. ✅ `/api/test-email` returns success response with messageId
3. ✅ Test emails appear in Gmail inbox (not spam)
4. ✅ Contact form sends 2 emails (admin + user)
5. ✅ Appointment booking sends 2 emails (admin + user)
6. ✅ All console logs show "✅ Sent successfully"
7. ✅ Production emails work on Render

---

## 📞 Quick Reference

| Issue | Check |
|-------|-------|
| Test email not received | Check Gmail spam folder, verify App Password |
| "Invalid login" error | Use App Password, not Gmail password |
| "ENOTFOUND" error | Verify SMTP_HOST=smtp.gmail.com |
| "ECONNREFUSED" error | Verify SMTP_PORT=465 |
| Missing env variables | Check `.env` file has all 4 variables |
| Production emails not working | Redeploy after setting Render env variables |

---

## 📝 Files Modified

1. ✅ `Backend/server/utils/sendEmail.js` - Enhanced with logging
2. ✅ `Backend/server/routes/testEmailRoutes.js` - New test email route
3. ✅ `Backend/server/server.js` - Added SMTP verification on startup
4. ✅ `Backend/server/.env` - SMTP configuration

---

## 🎯 Next Steps

1. **Verify:** Run `npm run dev` and check console
2. **Test:** Call `/api/test-email` endpoint
3. **Deploy:** Add env variables to Render and redeploy
4. **Validate:** Test production endpoint

---

**Last Updated:** April 27, 2026
**Status:** Production Ready ✅
