import emailjs from "@emailjs/browser";

// EmailJS Configuration - use environment variables or fallback to defaults
// Sign up at https://www.emailjs.com/ to get these values
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_parivartan";
const CONTACT_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID || "template_contact_form";
const BOOKING_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_BOOKING_TEMPLATE_ID || "template_booking_notification";
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";

// Initialize EmailJS only if PUBLIC_KEY is configured
let emailjsReady = false;
if (PUBLIC_KEY && PUBLIC_KEY !== "") {
  try {
    emailjs.init(PUBLIC_KEY);
    emailjsReady = true;
    console.log("✓ EmailJS initialized successfully");
  } catch (e) {
    console.warn("✗ EmailJS initialization failed:", e.message);
  }
} else {
  console.warn("⚠ EmailJS not configured. Set VITE_EMAILJS_PUBLIC_KEY in .env.local");
}

/**
 * Send contact form email to admin
 * @param {Object} contactData - { name, email, message }
 * @returns {Promise}
 */
export async function sendContactEmail(contactData) {
  // If EmailJS is not configured, fail gracefully
  if (!emailjsReady) {
    console.warn("EmailJS not initialized. Email not sent.");
    return {
      success: false,
      error: "Email service is not configured. Please contact support.",
    };
  }

  try {
    const templateParams = {
      from_name: contactData.name,
      from_email: contactData.email,
      message: contactData.message,
      to_email: "ParivartanpathFoundation24@gmail.com",
      reply_to: contactData.email,
      timestamp: new Date().toLocaleString(),
    };

    console.log("📧 Sending contact email...", { SERVICE_ID, CONTACT_TEMPLATE_ID });
    const response = await emailjs.send(SERVICE_ID, CONTACT_TEMPLATE_ID, templateParams);
    
    console.log("✓ Contact email sent successfully");
    return {
      success: true,
      messageId: response.status,
      message: "Message sent successfully! We will get back to you soon.",
    };
  } catch (error) {
    console.error("✗ Contact email failed:", error);
    return {
      success: false,
      error: error.text || error.message || "Failed to send message. Please try again.",
    };
  }
}

/**
 * Send booking confirmation email to admin
 * @param {Object} bookingData - { name, email, date, service, phone }
 * @returns {Promise}
 */
export async function sendBookingEmail(bookingData) {
  // If EmailJS is not configured, fail silently (don't break booking flow)
  if (!emailjsReady) {
    console.warn("EmailJS not initialized. Booking email not sent.");
    return {
      success: false,
      error: "Email service not configured",
      silentFail: true, // Flag to indicate this should not break the flow
    };
  }

  try {
    const templateParams = {
      user_name: bookingData.name,
      user_email: bookingData.email,
      user_phone: bookingData.phone,
      appointment_date: bookingData.date,
      service_name: bookingData.service,
      booking_id: bookingData.bookingId || "N/A",
      to_email: "ParivartanpathFoundation24@gmail.com",
      reply_to: bookingData.email,
      timestamp: new Date().toLocaleString(),
    };

    console.log("📧 Sending booking email...", { SERVICE_ID, BOOKING_TEMPLATE_ID });
    const response = await emailjs.send(SERVICE_ID, BOOKING_TEMPLATE_ID, templateParams);
    
    console.log("✓ Booking email sent successfully");
    return {
      success: true,
      messageId: response.status,
      message: "Booking confirmation sent!",
    };
  } catch (error) {
    console.error("✗ Booking email failed:", error);
    // Return silentFail flag so booking flow doesn't break
    return {
      success: false,
      error: error.text || error.message || "Failed to send booking confirmation.",
      silentFail: true, // Don't break the booking flow
    };
  }
}

/**
 * Send email to multiple recipients
 * @param {Object} emailData - { to, cc, subject, htmlContent }
 * @returns {Promise}
 */
export async function sendCustomEmail(emailData) {
  try {
    const templateParams = {
      to_email: emailData.to,
      cc_email: emailData.cc || "",
      subject: emailData.subject,
      html_content: emailData.htmlContent,
      timestamp: new Date().toLocaleString(),
    };

    const response = await emailjs.send(SERVICE_ID, "template_custom_email", templateParams);
    return {
      success: true,
      messageId: response.status,
    };
  } catch (error) {
    console.error("Custom email failed:", error);
    return {
      success: false,
      error: error.text || "Failed to send email.",
    };
  }
}
