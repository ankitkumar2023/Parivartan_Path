# 🚀 Email Debugging - Quick Reference Card

## 🎯 One-Minute Test

```bash
# 1. Start backend
cd Backend/server && npm run dev

# 2. In browser/Postman/curl, visit:
http://localhost:5000/api/test-email

# 3. Check Gmail inbox for test email
# Look in: Inbox, Promotions, Spam, All Mail
```

---

## ✅ What Should Happen

### Console Output
```
✅ [SMTP Verification] Connection successful!
[TEST EMAIL] Configuration Check: valid: true
✅ [Email Success] Sent successfully!
```

### Browser Response
```json
{"success": true, "message": "✅ Test email sent successfully!"}
```

### Gmail
- Email received at ak7948683@gmail.com
- Subject: "✅ Parivartan Path - SMTP Test Email"
- From: Parivartan Path <ak7948683@gmail.com>

---

## ❌ Common Errors & Fixes

| Error | Check | Fix |
|-------|-------|-----|
| "Invalid login" | Wrong password | Use App Password from myaccount.google.com/apppasswords |
| "ENOTFOUND" | DNS issue | SMTP_HOST=smtp.gmail.com |
| "ECONNREFUSED" | Connection issue | SMTP_PORT=465 |
| "SMTP not configured" | Missing env vars | Add all 5 vars to .env |
| Email in spam | Gmail filtering | Mark as "Not Spam" |

---

## 🔧 Configuration Checklist

```env
SMTP_HOST=smtp.gmail.com       ✓ Must be exact
SMTP_PORT=465                  ✓ Must be 465 (not 587)
SMTP_USER=ak7948683@gmail.com  ✓ Your Gmail address
SMTP_PASS=eiyj anvs llpw eplv  ✓ App Password (with spaces)
ADMIN_EMAIL=ak7948683@gmail.com ✓ Same as SMTP_USER
```

---

## 🧪 Test Scenarios

### Test 1: SMTP Connection
```
GET /api/test-email
Expected: ✅ Connection successful
```

### Test 2: Contact Form
```
POST /api/contact
Body: {name, email, message}
Expected: 2 emails sent
- Admin: ak7948683@gmail.com
- User: provided email
```

### Test 3: Appointment Booking
```
POST /api/appointments
Auth: Bearer {token}
Expected: 2 emails sent
- Admin: ak7948683@gmail.com
- User: user email
```

---

## 🚀 Production (Render)

### Setup
1. Render Dashboard → Environment
2. Add 5 variables (exact same as `.env`)
3. Redeploy backend
4. Wait 5 minutes

### Test Production
```
GET https://parivartan-path.onrender.com/api/test-email
Expected: Same as local test
```

---

## 📊 Email Flow

```
Frontend Form Submit
    ↓
Backend API Endpoint
    ↓
Save to Database
    ↓
Call sendEmail() twice (non-blocking)
    ├─ Admin Email → ak7948683@gmail.com
    └─ User Email → user@example.com
    ↓
SMTP → Gmail
    ↓
Email Received (1-5 seconds)
    ↓
Check Inbox/Spam
```

---

## 🎯 Verify It Works

**All checkboxes should be ✓**

- [ ] Backend starts with "✅ SMTP Verification successful"
- [ ] Test email endpoint returns 200 response
- [ ] Console shows "✅ [Email Success] Sent successfully!"
- [ ] Test email appears in Gmail (check all folders)
- [ ] Contact form sends 2 emails
- [ ] Appointment booking sends 2 emails
- [ ] Production test email works on Render
- [ ] No "Invalid login" or connection errors

---

## 🆘 Emergency Fix

If emails still not working:

1. **Check Gmail App Password**
   ```
   Go to: myaccount.google.com/apppasswords
   Generate NEW password
   Copy entire password (with spaces)
   Update SMTP_PASS in .env
   ```

2. **Verify Gmail 2FA**
   ```
   Go to: myaccount.google.com/security
   Check "2-Step Verification" is ON
   If not, turn it ON first
   Then generate App Password
   ```

3. **Check Console Logs**
   ```
   Backend console should show:
   - [SMTP Config] Host: smtp.gmail.com
   - [Email] Attempting to send...
   - ✅ [Email Success] or ❌ [Email Error]
   ```

4. **Restart Backend**
   ```
   Stop: Ctrl+C
   Check .env saved
   Start: npm run dev
   Test again
   ```

5. **Check Render Env Variables**
   ```
   - All 5 variables set?
   - Exact spelling correct?
   - Backend redeployed?
   - Waited 5 minutes?
   ```

---

## 📞 Key Endpoints

| Endpoint | Method | Purpose | Response |
|----------|--------|---------|----------|
| /api/test-email | GET | Test SMTP | JSON with success |
| /api/contact | POST | Send contact | JSON with contactId |
| /api/appointments | POST | Book appointment | JSON with appointment |
| /api/health | GET | Check health | JSON with status |

---

## 💡 Pro Tips

1. **Always check Gmail spam folder** - Gmail sometimes filters transactional emails
2. **Use App Password, not Gmail password** - Most common mistake
3. **Enable 2FA on Gmail** - Required for App Passwords
4. **Test locally first** - Before deploying to Render
5. **Check console logs** - They show exact error details
6. **Redeploy after env changes** - Don't forget this for Render
7. **Wait 5 minutes** - After redeploy, let it boot up

---

## ✨ Success Indicators

When working correctly:
- ✅ Console: "SMTP Verification Connection successful"
- ✅ Console: "[Email Success] Sent successfully!"
- ✅ Gmail: Email received in 1-5 seconds
- ✅ No errors in backend logs
- ✅ Response: {"success": true, "message": "✅ Test email sent successfully!"}

---

## 📝 Quick Debug Template

When reporting issues:
1. Backend URL: ____________
2. Error message: ____________
3. Console logs: ____________
4. Gmail password type: [ ] App Password [ ] Gmail Password [ ] ?
5. Test endpoint response: ____________

---

**Last Updated:** April 27, 2026
**Version:** 1.0
**Status:** Production Ready ✅
