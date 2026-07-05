# ✅ Testing Checklist - Email & Theme Enhancements

## 🎯 Quick Start

### **Backend** 
```bash
cd Backend/server
npm run dev
# Should show: ✅ [SMTP Verification] Connection successful!
```

### **Frontend**
```bash
cd Frontend/client
npm run dev
# Should start at http://localhost:5173
```

---

## 🧪 Test 1: Multiple Admin Emails (Backend)

### **Step 1: Verify Configuration**
```bash
# Check .env file in Backend/server
ADMIN_EMAILS=ak7948683@gmail.com,ParivartanpathFoundation24@gmail.com
```
✅ Confirmed?

### **Step 2: Check Console Logs**
```bash
Backend console should show on startup:
[Admin Emails] Configured emails: ak7948683@gmail.com, ParivartanpathFoundation24@gmail.com
```
✅ Confirmed?

### **Step 3: Test Email Endpoint**
```bash
# In terminal or Postman:
curl http://localhost:5000/api/test-email

# Should return:
{
  "success": true,
  "message": "✅ Test email sent successfully!",
  "details": {
    "recipient": "ak7948683@gmail.com",
    "messageId": "<...>",
    "timestamp": "2026-04-29T...",
    "note": "Check your email (including spam/promotions folder)"
  }
}
```
✅ Success message received?

### **Step 4: Verify Emails Received**

**Email 1 - ak7948683@gmail.com:**
- [ ] Check Inbox
- [ ] Check Promotions folder
- [ ] Check Spam folder
- [ ] Email received from ak7948683@gmail.com

**Email 2 - ParivartanpathFoundation24@gmail.com:**
- [ ] Check Inbox
- [ ] Check Promotions folder  
- [ ] Check Spam folder
- [ ] Email received from ak7948683@gmail.com

**Expected Email Details:**
- Subject: "✅ Parivartan Path - SMTP Test Email"
- Professional HTML template
- Blue gradient header
- Signed by Parivartan Path Team

### **Step 5: Test Contact Form**
```bash
# Go to http://localhost:5173/contact
# Fill form with:
- Name: "Test User"
- Email: "your-test-email@gmail.com"
- Message: "This is a test message"
# Click Submit

# Backend console should show:
[Contact Emails] Processing contact from: Test User (your-test-email@gmail.com)
[Email] Attempting to send email to: ak7948683@gmail.com,ParivartanpathFoundation24@gmail.com
✅ [Email Success] Sent successfully!
[Contact Emails] Admin emails: ✅ Sent to 2 admins
[Contact Emails] User email: ✅ Sent
```

**Verify Emails:**
- [ ] Admin Email 1 (ak7948683@gmail.com) - "New Contact Message from Test User"
- [ ] Admin Email 2 (ParivartanpathFoundation24@gmail.com) - "New Contact Message from Test User"
- [ ] User Email - "We Received Your Message - Parivartan Path"

### **Step 6: Test Appointment Booking** (if user logged in)
```bash
# Go to http://localhost:5173/book-appointment
# Fill appointment details
# Submit

# Backend console should show:
[Appointment Emails] Processing booking for: [Patient Name]
✅ [Email Success] Sent successfully!
[Appointment Emails] Admin emails: ✅ Sent to 2 admins
```

**Verify Emails:**
- [ ] Admin Email 1 - "New Appointment Booking from [Patient Name]"
- [ ] Admin Email 2 - "New Appointment Booking from [Patient Name]"
- [ ] User Email - "Your Appointment is Confirmed"

---

## 🎨 Test 2: Dark Mode Toggle (Frontend)

### **Step 1: Open DevTools**
```bash
Press F12 to open Developer Tools
Go to Console tab
```

### **Step 2: Check Initial Theme**
```javascript
// In Console, type:
document.documentElement.classList

// Should show either:
// - Empty (light mode) OR
// - DOMTokenList with "dark" (dark mode)
```
✅ Confirmed?

### **Step 3: Click Theme Toggle Button**
```bash
1. Look at navbar (top right)
2. Find 🌙 (moon) or ☀️ (sun) button
3. Click it
4. Watch DevTools Console for logs:

[Navbar] Theme toggle clicked - current isDark: false
[ThemeContext] Toggle clicked - current isDark: false
[ThemeContext] Toggle setting isDark to: true
[ThemeContext] Applying theme - isDark: true
[ThemeContext] Added 'dark' class to html element
[ThemeContext] Saved theme to localStorage: dark
```
✅ All logs appeared?

### **Step 4: Verify Visual Changes**

**Light Mode → Click Toggle → Dark Mode:**
- [ ] Background changes from white to dark (almost black)
- [ ] Text changes from black to white
- [ ] Navbar stays visible but changes colors
- [ ] All cards become darker
- [ ] Toggle button shows ☀️ (sun icon)
- [ ] No UI elements disappear or break

**Dark Mode → Click Toggle → Light Mode:**
- [ ] Background changes from dark to white
- [ ] Text changes from white to black
- [ ] Navbar stays visible with light theme colors
- [ ] All cards become lighter
- [ ] Toggle button shows 🌙 (moon icon)
- [ ] No UI elements disappear or break

### **Step 5: Check LocalStorage**
```bash
1. DevTools → Application → Local Storage
2. Find "http://localhost:5173"
3. Check "theme" key:
   - Light mode: value = "light"
   - Dark mode: value = "dark"
4. Click toggle again
5. Value should change
```
✅ Value changes correctly?

### **Step 6: Test Persistence**
```bash
1. Set theme to Dark mode
2. Refresh page (F5)
3. Theme should stay DARK
4. Set theme to Light mode
5. Refresh page
6. Theme should stay LIGHT
```
✅ Theme persists after refresh?

### **Step 7: Test on All Pages**

**Navigate to each page and verify theme works:**
- [ ] Home (/) - toggle works, colors correct
- [ ] Services (/services) - toggle works, colors correct
- [ ] Contact (/contact) - toggle works, form inputs visible
- [ ] Login (/login) - toggle works, colors correct
- [ ] Dashboard (/dashboard) - toggle works, colors correct (if logged in)
- [ ] Admin Dashboard (/admin-dashboard) - toggle works (if admin)

### **Step 8: Test Mobile Responsive**
```bash
1. DevTools → Toggle Device Toolbar (Ctrl+Shift+M)
2. Set to Mobile (iPhone 12 or similar)
3. Click mobile menu button (hamburger)
4. Find theme toggle in mobile menu
5. Click it
6. Verify theme changes on mobile
```
✅ Mobile theme toggle works?

### **Step 9: Check Button Styling**
```bash
Light Mode - Toggle Button:
- [ ] Background is light gray/white
- [ ] Text is black or dark
- [ ] Button has visible border
- [ ] Hover effect works (slight background change)

Dark Mode - Toggle Button:
- [ ] Background is dark slate/gray
- [ ] Text is white
- [ ] Button has visible border
- [ ] Hover effect works (slight background change)
```
✅ Button looks good in both modes?

---

## 📧 Test 3: Email Template Quality

### **Step 1: Check Admin Contact Email**
- [ ] Has professional header with blue gradient
- [ ] Shows contact details in structured card
- [ ] Shows message with proper formatting
- [ ] Has "Next Step" section with action guidance
- [ ] Has footer with company branding
- [ ] Email is mobile-responsive
- [ ] Links are clickable

### **Step 2: Check User Contact Confirmation**
- [ ] Has friendly header with green gradient
- [ ] Shows message summary in card
- [ ] Has "What happens next?" section
- [ ] Has "Need immediate assistance?" section
- [ ] Has warm closing message
- [ ] Email is mobile-responsive

### **Step 3: Check Admin Appointment Email**
- [ ] Has professional header with blue gradient
- [ ] Shows appointment details in table format
- [ ] Shows patient notes section
- [ ] Has "Next Step" action guidance
- [ ] Has footer with company branding
- [ ] All details are visible and formatted properly

### **Step 4: Check User Appointment Confirmation**
- [ ] Has friendly header with green gradient
- [ ] Shows appointment details in card
- [ ] Has appointment details table
- [ ] Has "Important Reminders" section with bullet points
- [ ] Has support info section
- [ ] Has warm closing message

---

## 🔍 Production Testing (Render + Vercel)

### **Backend (Render)**

```bash
# 1. Add ADMIN_EMAILS to Render environment variables
ADMIN_EMAILS=ak7948683@gmail.com,ParivartanpathFoundation24@gmail.com

# 2. Redeploy backend
# 3. Wait 5 minutes for deployment
# 4. Test production endpoint:
curl https://parivartan-path.onrender.com/api/test-email

# 5. Verify both admins receive email
```
✅ Production emails working?

### **Frontend (Vercel)**

```bash
# 1. Push code to GitHub
# 2. Vercel auto-deploys
# 3. Visit production URL
# 4. Click theme toggle
# 5. Verify theme changes
# 6. Refresh page
# 7. Theme should persist
```
✅ Production theme working?

---

## 🎯 Final Checklist

### **Email System**
- [ ] Multiple admin emails configured in .env
- [ ] Test email endpoint returns success
- [ ] Contact form sends to both admins
- [ ] Contact form sends user confirmation
- [ ] Appointment booking sends to both admins
- [ ] Appointment booking sends user confirmation
- [ ] All emails have professional templates
- [ ] No errors in backend console

### **Theme System**
- [ ] Toggle button appears in navbar
- [ ] Clicking toggle changes theme instantly
- [ ] "dark" class added/removed from html element
- [ ] Colors change properly in light mode
- [ ] Colors change properly in dark mode
- [ ] Theme persists after page refresh
- [ ] Mobile theme toggle works
- [ ] All pages respond to theme changes
- [ ] Debug logs appear in console
- [ ] No console errors

### **Visual Quality**
- [ ] No text is invisible
- [ ] No elements are misaligned
- [ ] No broken layouts
- [ ] Colors have good contrast
- [ ] Buttons are clickable and visible
- [ ] Forms are usable in both themes
- [ ] Mobile layout works in both themes

---

## 📞 Support

If any test fails:

1. **Check Console Logs:**
   - Backend: Look for `[Admin Emails]`, `[Email]`, `[ThemeContext]` logs
   - Frontend: Look for `[ThemeContext]`, `[Navbar]` logs

2. **Check Environment Variables:**
   - Backend: Verify `.env` has all SMTP variables
   - Frontend: Check `.env.local` if needed

3. **Check Browser Cache:**
   - Clear cache and cookies
   - Hard reload (Ctrl+Shift+R on Windows)

4. **Check Email Spam:**
   - Always check spam/promotions folders
   - Mark emails as "Not Spam" if needed

---

**Status:** ✅ Ready to Test
**Date:** April 29, 2026
