# Email System - Testing & Validation Guide

## 🧪 Pre-Deployment Testing Checklist

### Phase 1: Setup Verification

- [ ] Nodemailer installed (`npm install` completed)
- [ ] `.env` has all 4 SMTP variables
- [ ] Gmail App Password generated (16 characters)
- [ ] SMTP_PASS has no spaces
- [ ] Server starts without errors (`npm run dev`)

### Phase 2: Email Function Testing

#### Test Contact Form Emails

**Using cURL:**
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "your-test-email@gmail.com",
    "message": "This is a test contact message to verify email system."
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

**Check Server Logs:**
```
✅ Email sent successfully: 250 2.0.0 OK...
```

**Check Emails:**
- ✅ Admin email in inbox (ak7948683@gmail.com)
- ✅ User confirmation in inbox (your-test-email@gmail.com)
- 💡 Check Spam/Promotions if not in inbox

---

#### Test Appointment Booking Emails

**Step 1: Get JWT Token**

First, register and login to get a JWT token:
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "testuser@example.com",
    "password": "TestPassword123!",
    "phone": "9876543210"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "TestPassword123!"
  }'
```

Extract the `token` from the response.

**Step 2: Book Appointment**

```bash
curl -X POST http://localhost:5000/api/appointments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -d '{
    "patientName": "John Doe",
    "addictionType": "Alcohol Rehabilitation",
    "appointmentDate": "2026-05-20T14:30:00",
    "message": "First time seeking help, very nervous."
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "appointment": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439000",
    "patientName": "John Doe",
    "addictionType": "Alcohol Rehabilitation",
    "appointmentDate": "2026-05-20T14:30:00.000Z",
    "message": "First time seeking help, very nervous.",
    "status": "Pending",
    "createdAt": "2026-04-26T10:15:00.000Z"
  }
}
```

**Check Server Logs:**
```
✅ Email sent successfully: 250 2.0.0 OK...
✅ Email sent successfully: 250 2.0.0 OK...
```

**Check Emails:**
- ✅ Admin notification in inbox (ak7948683@gmail.com)
- ✅ User confirmation in inbox (testuser@example.com)

---

### Phase 3: Email Content Verification

#### Contact Form - Admin Email Should Show:
- [ ] Subject: "New Contact Message from [Name]"
- [ ] Sender name and email clearly visible
- [ ] Full contact message
- [ ] Timestamp of submission
- [ ] Professional HTML formatting
- [ ] Footer with "automated notification" notice

#### Contact Form - User Email Should Show:
- [ ] Subject: "We Received Your Message - Parivartan Path"
- [ ] Personalized greeting: "Hi [Name],"
- [ ] Confirmation message
- [ ] Their message echoed back
- [ ] Next steps information
- [ ] Professional HTML formatting

#### Appointment - Admin Email Should Show:
- [ ] Subject: "New Appointment Booking from [Patient Name]"
- [ ] Patient name and email
- [ ] Service type (Addiction type)
- [ ] Appointment date & time
- [ ] Booking ID
- [ ] Booking timestamp
- [ ] Optional notes (if provided)

#### Appointment - User Email Should Show:
- [ ] Subject: "Your Appointment is Confirmed - Parivartan Path"
- [ ] Personalized greeting: "Hi [Name],"
- [ ] Service type
- [ ] Date & time clearly formatted
- [ ] Confirmation ID
- [ ] Arrival instructions (arrive 10-15 min early)
- [ ] Contact information
- [ ] Professional HTML formatting

---

### Phase 4: Error Scenarios Testing

#### Scenario 1: Missing SMTP Config
**Test:** Temporarily remove SMTP_PASS from .env
```bash
npm run dev
# Submit contact form
```

**Expected:**
- [ ] API returns success
- [ ] Server logs: "⚠️ SMTP configuration incomplete. Email not sent."
- [ ] Email NOT sent (verified by checking inbox)
- [ ] API response still successful

**Fix:** Re-add SMTP_PASS

---

#### Scenario 2: Invalid SMTP Credentials
**Test:** Set SMTP_PASS to invalid value
```env
SMTP_PASS=invalid_password_12345
```

**Expected:**
- [ ] API returns success
- [ ] Server logs: "❌ Email sending failed: Username and password not accepted"
- [ ] Email NOT sent
- [ ] API response still successful
- [ ] User action (contact/booking) still saved to database

**Fix:** Use correct app password

---

#### Scenario 3: Slow Email Server
**Test:** Submit multiple forms simultaneously
```bash
# Terminal 1
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"User1","email":"user1@test.com","message":"Test 1"}'

# Terminal 2 (immediately)
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"User2","email":"user2@test.com","message":"Test 2"}'

# Terminal 3 (immediately)
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"User3","email":"user3@test.com","message":"Test 3"}'
```

**Expected:**
- [ ] All 3 API responses are instant
- [ ] All 6 emails eventually sent (2 per contact)
- [ ] No API delays
- [ ] All data in database

---

### Phase 5: Production Simulation

#### Test with Production URL
Update `.env` temporarily:
```env
VITE_API_URL=https://your-deployed-backend.com
```

Then test from frontend if available.

#### Test Date Formatting
- [ ] Dates show in Indian timezone format
- [ ] Example: "Friday, May 20, 2026, 02:30 PM"
- [ ] Readable format in both emails

#### Test Special Characters
Create contact form with special characters:
```json
{
  "name": "José María",
  "email": "test@example.com",
  "message": "I need help with €, ©, ®, and émojis 😊"
}
```

**Expected:**
- [ ] Characters display correctly in emails
- [ ] No encoding errors
- [ ] Professional appearance

---

## 📝 Testing Log Template

Keep a record of your tests:

```
Date: 2026-04-26
Test Type: Contact Form Emails
Status: ✅ PASS

Details:
- API Response Time: 45ms
- Admin Email Received: Yes
- User Email Received: Yes
- Email Quality: Professional ✓
- Formatting: Correct ✓
- Special Characters: Handled ✓

Notes:
Email sent to admin successfully, arrived in inbox.
User confirmation email took 2 seconds to arrive.

---

Date: 2026-04-26
Test Type: Appointment Booking Emails
Status: ✅ PASS

Details:
- JWT Token: Valid ✓
- Appointment Created: Yes ✓
- Admin Email: Received ✓
- User Email: Received ✓
- Date Formatting: Correct (Indian TZ) ✓
- Booking ID: Present ✓

Notes:
Both emails arrived within 3 seconds.
HTML formatting looks professional.
All appointment details visible.

---

Date: 2026-04-26
Test Type: Error Handling (Missing SMTP_PASS)
Status: ✅ PASS

Details:
- API Response: Success ✓
- Server Warning: Logged ✓
- Email Sent: No (as expected) ✓
- Database Entry: Saved ✓

Notes:
Good error handling. API didn't break.
User still able to submit form.
```

---

## 🐛 Troubleshooting During Testing

### Issue: Emails Going to Spam

**Solutions:**
1. Check Spam/Promotions folder in Gmail
2. Mark emails as "Not Spam"
3. Add `ak7948683@gmail.com` to contacts
4. After 3-4 emails, Gmail usually trusts the sender

**Temporary:** Use multiple email addresses for testing

---

### Issue: Slow Email Delivery

**Causes:**
- SMTP server processing delay
- Network latency
- Gmail rate limiting

**Solutions:**
- Normal delay is 1-5 seconds
- If consistently > 10 seconds, check SMTP_HOST/PORT
- Verify internet connection

---

### Issue: API Errors on Contact/Booking

**Check:**
1. Is nodemailer installed? (`npm list nodemailer`)
2. Is `sendEmail.js` file present?
3. Are imports correct in controllers?
4. Are environment variables set?

**Debug:**
```bash
# Restart server with verbose logging
npm run dev

# Look for errors in console
```

---

### Issue: Email Template Issues

**Verify:**
- [ ] HTML syntax is correct
- [ ] Images display properly
- [ ] Links are clickable
- [ ] Colors render correctly
- [ ] Mobile-friendly layout

**Test in:**
- Gmail (desktop)
- Gmail (mobile)
- Outlook
- Yahoo Mail

---

## ✅ Final Validation Checklist

Before considering email system production-ready:

**Functionality:**
- [ ] Contact form emails send successfully
- [ ] Appointment emails send successfully
- [ ] Both admin and user emails received
- [ ] Email content is accurate
- [ ] Date/time formatted correctly

**Error Handling:**
- [ ] Missing SMTP config handled gracefully
- [ ] Invalid credentials don't break API
- [ ] Slow email server doesn't delay API response
- [ ] Failed emails are logged to console

**Performance:**
- [ ] API responds in < 100ms
- [ ] Email sending is non-blocking
- [ ] Multiple simultaneous requests work
- [ ] Database entries saved even if email fails

**Content Quality:**
- [ ] HTML formatting is professional
- [ ] Text is clear and readable
- [ ] All required information included
- [ ] Special characters handled correctly
- [ ] Mobile-friendly design

**Security:**
- [ ] SMTP credentials not exposed in logs
- [ ] No hardcoded passwords in code
- [ ] .env file not in git
- [ ] App password used (not Gmail password)

---

## 📊 Email Metrics to Track

Once in production, monitor:

1. **Email Delivery Rate**
   - Target: > 99%
   - Formula: (Emails sent / Emails requested) × 100

2. **Email Latency**
   - Target: < 5 seconds from submission to delivery
   - Monitor SMTP response times

3. **Bounce Rate**
   - Target: < 1%
   - Check for invalid email addresses

4. **Spam Complaints**
   - Target: 0%
   - Monitor bounce/spam reports

---

**Testing Complete! Your Email System is Production-Ready! 🎉**

For issues, refer to SMTP_EMAIL_SETUP.md troubleshooting section.
