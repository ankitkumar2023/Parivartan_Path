# ✅ EmailJS Configuration Guide for Parivartan Path

## 🔧 What's Fixed in This Update

1. ✅ **Appointments now show in Dashboard** - Fetches from API, auto-updates
2. ✅ **Buttons working** - "Book Appointment" and "View Records" now navigate correctly
3. ✅ **EmailJS errors handled** - Uses environment variables, doesn't break booking flow
4. ✅ **Better error logging** - Console messages show what's happening
5. ✅ **Graceful degradation** - Email errors don't stop booking from completing

---

## 📧 Step 1: Set Up EmailJS Account

### Create Free Account
1. Go to **https://www.emailjs.com/**
2. Click **Sign Up** → Create account with email
3. Verify email and login

### Connect Gmail Account
1. Go to **Email Services** in dashboard
2. Click **Add New Service**
3. Select **Gmail**
4. Follow OAuth approval process to connect your Gmail

---

## 🔑 Step 2: Get Your Credentials

### Find Service ID
1. Go to **Email Services** in EmailJS dashboard
2. You should see your Gmail service listed
3. **Service ID** will be like: `service_xxxxx`
4. Copy this value

### Find Template IDs
1. Go to **Email Templates** section
2. Create TWO templates or use existing ones:

**Template 1: Contact Form**
- Name: `template_contact_form`
- Variables needed: `{{from_name}}`, `{{from_email}}`, `{{message}}`, `{{timestamp}}`

**Template 2: Booking Notification**
- Name: `template_booking_notification`  
- Variables needed: `{{user_name}}`, `{{user_email}}`, `{{appointment_date}}`, `{{service_name}}`, `{{booking_id}}`

### Find Public Key
1. Go to **Account** settings in EmailJS dashboard
2. Find your **Public Key** (it's different from private key)
3. Copy this value

---

## 📝 Step 3: Create .env.local File

Create file: `Frontend/client/.env.local`

```env
# EmailJS Configuration (from your EmailJS account)
VITE_EMAILJS_SERVICE_ID=service_xxxxx
VITE_EMAILJS_CONTACT_TEMPLATE_ID=template_contact_form
VITE_EMAILJS_BOOKING_TEMPLATE_ID=template_booking_notification
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here

# API Configuration
VITE_API_URL=http://localhost:5000
```

**⚠️ Important**: 
- Never commit `.env.local` to Git
- Add to `.gitignore` if not already there
- Each environment (dev/prod) needs its own `.env.local`

---

## 🧪 Step 4: Test Email Sending

### Test Contact Form Email
1. Start both frontend and backend
2. Go to **http://localhost:3000/contact**
3. Fill in test data:
   - Name: "Test User"
   - Email: "test@gmail.com"
   - Message: "This is a test"
4. Click **"Send message"**
5. Check browser console for logs:
   - ✅ `✓ EmailJS initialized successfully` = Good
   - ✅ `📧 Sending contact email...` = Email sending
   - ✅ `✓ Contact email sent successfully` = Success!

### Test Booking Email
1. Login to your account
2. Go to **Book Appointment** page
3. Fill in appointment details
4. Click **"Book Appointment"**
5. Check:
   - ✅ Appointment appears in Dashboard
   - ✅ Console shows `📧 Sending booking email...`
   - ✅ Console shows `✓ Booking email sent successfully` (if email configured)

### Check Received Emails
1. Check your email inbox for received messages
2. Should come from your EmailJS email service
3. Look for sender showing "Parivartan Path" notifications

---

## 🐛 Troubleshooting

### ❌ "The Public Key is invalid"
**Cause**: Wrong or missing PUBLIC_KEY
**Fix**:
1. Go to EmailJS Account settings again
2. Copy PUBLIC_KEY (not private key)
3. Update `.env.local` with correct value
4. Restart frontend (`npm run dev`)
5. Hard refresh browser (Ctrl+Shift+R)

### ❌ "service_parivartan is not configured"
**Cause**: SERVICE_ID doesn't exist on your EmailJS account
**Fix**:
1. Check EmailJS Email Services section
2. Copy actual Service ID from your service
3. Update `.env.local`: `VITE_EMAILJS_SERVICE_ID=service_xxxxx`
4. Restart frontend

### ❌ "template_contact_form not found"
**Cause**: Template names don't match
**Fix**:
1. Go to EmailJS Email Templates
2. Check exact names of your templates
3. Update `.env.local` to match template names
4. Restart frontend

### ❌ Email shows "silently failing" in console
**Cause**: EmailJS not initialized (missing PUBLIC_KEY)
**Fix**:
1. Add `VITE_EMAILJS_PUBLIC_KEY` to `.env.local`
2. Restart frontend (`npm run dev`)
3. Refresh browser

### ✅ Email not sending but booking works
**This is OK!**
- Booking still completes successfully
- Email is a "nice-to-have" feature
- Appointment is saved in database regardless
- User gets success message for booking

---

## 🔄 How It Works (Technical Details)

### Email Flow
```
1. User fills form → clicks submit
2. Frontend validates data
3. Frontend sends to backend API
4. Backend saves appointment to MongoDB
5. Frontend sends email via EmailJS API
6. If email fails → logs warning, user still sees success
7. Dashboard auto-fetches appointments and updates
```

### Environment Variable Handling
```javascript
// In emailService.js
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";

// If PUBLIC_KEY is empty:
// - EmailJS won't initialize
// - Email functions fail gracefully
// - Booking flow continues unaffected
```

### Dashboard Appointment Fetching
```javascript
// In Dashboard.jsx
useEffect(() => {
  // Fetch appointments from API
  fetch("/api/appointments/my")
  // Display count of upcoming appointments
  // Auto-refetch when token changes
}, [token])
```

---

## 📋 Checklist

- [ ] Created EmailJS account at emailjs.com
- [ ] Connected Gmail service to EmailJS
- [ ] Created email templates (or noted template names)
- [ ] Found and copied Service ID
- [ ] Found and copied Public Key
- [ ] Created `Frontend/client/.env.local` file
- [ ] Added all 4 EmailJS variables to `.env.local`
- [ ] Restarted frontend (`npm run dev`)
- [ ] Hard refreshed browser (Ctrl+Shift+R)
- [ ] Tested contact form email
- [ ] Tested booking email
- [ ] Verified emails received in inbox
- [ ] Checked console logs for success messages

---

## 🚀 Production Deployment Notes

When deploying to production:

1. **Use environment-specific .env files**
   - Don't use `.env.local` in production
   - Set environment variables via deployment platform

2. **Protect your PUBLIC_KEY**
   - It's meant to be public (client-side)
   - But never commit credentials to Git

3. **Monitor email delivery**
   - Check EmailJS dashboard for delivery reports
   - Set up email forwarding if needed

4. **Add backup notification system**
   - Consider adding SMS or in-app notifications
   - Email can sometimes be unreliable

---

## 📞 Support

If you encounter issues:

1. **Check browser console** - Look for error messages
2. **Check EmailJS dashboard** - See if emails appear there
3. **Verify .env.local** - Make sure all values are set
4. **Check Gmail account** - May need to enable "Less secure app access"
5. **Check firewall** - Make sure port 5000 (backend) is accessible

---

**Version**: 1.1  
**Last Updated**: April 2026  
**Status**: Ready for Testing ✅
