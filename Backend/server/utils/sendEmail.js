import nodemailer from "nodemailer";

/**
 * Validate SMTP configuration from environment
 * @returns {Object} - Validation result { valid, message, config }
 */
export function validateSMTPConfig() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return {
      valid: false,
      message: "❌ SMTP configuration incomplete",
      missing: {
        SMTP_HOST: !SMTP_HOST,
        SMTP_PORT: !SMTP_PORT,
        SMTP_USER: !SMTP_USER,
        SMTP_PASS: !SMTP_PASS,
      },
    };
  }

  return {
    valid: true,
    message: "✅ SMTP configuration found",
    config: {
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT),
      user: SMTP_USER,
      pass: SMTP_PASS.substring(0, 5) + "***" + SMTP_PASS.substring(SMTP_PASS.length - 4),
    },
  };
}

/**
 * Get admin emails from environment variable
 * Supports multiple emails: ADMIN_EMAILS=email1@example.com,email2@example.com
 * @returns {Array<string>} - Array of admin emails
 */
function getAdminEmails() {
  const adminEmailsEnv = process.env.ADMIN_EMAILS || process.env.ADMIN_EMAIL || "ak7948683@gmail.com";
  
  // Parse comma-separated emails and trim whitespace
  const emails = adminEmailsEnv
    .split(",")
    .map(email => email.trim())
    .filter(email => email.length > 0);
  
  console.log(`[Admin Emails] Configured emails: ${emails.join(", ")}`);
  return emails;
}

/**
 * Create a reusable Nodemailer transporter with proper error handling
 * @returns {Object} - Nodemailer transporter
 */
const createTransporter = () => {
  const port = parseInt(process.env.SMTP_PORT);
  const isSecure = port === 465; // 465 = secure, 587 = TLS

  console.log(`[SMTP Config] Host: ${process.env.SMTP_HOST}, Port: ${port}, Secure: ${isSecure}`);

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: port,
    secure: isSecure, // true for 465, false for 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

/**
 * Verify SMTP connection (test transporter)
 * @returns {Promise<boolean>} - true if connection successful
 */
export async function verifySMTPConnection() {
  try {
    const validation = validateSMTPConfig();
    if (!validation.valid) {
      console.error(validation.message, validation.missing);
      return false;
    }

    console.log("\n[SMTP Verification] Testing connection...");
    const transporter = createTransporter();

    await transporter.verify();
    console.log("✅ [SMTP Verification] Connection successful!\n");
    return true;
  } catch (error) {
    console.error("❌ [SMTP Verification] Connection failed:", error.message);
    console.error("Full error:", error);
    return false;
  }
}

/**
 * Send a single email
 * @param {Object} options - Email options
 * @param {string|Array<string>} options.to - Recipient email address(es)
 * @param {string} options.subject - Email subject
 * @param {string} options.html - HTML email body
 * @param {string} options.text - Plain text email body (optional)
 * @returns {Promise<Object>} - { success, messageId, message, error }
 */
export async function sendEmail({ to, subject, html, text }) {
  try {
    // Validate SMTP configuration
    const validation = validateSMTPConfig();
    if (!validation.valid) {
      console.error("❌ [Email] SMTP not configured:", validation.missing);
      return { success: false, error: "SMTP not configured", message: validation.message };
    }

    const recipient = Array.isArray(to) ? to.join(", ") : to;
    console.log(`\n[Email] Attempting to send email to: ${recipient}`);
    console.log(`[Email] Subject: ${subject}`);

    const transporter = createTransporter();

    // Send email with detailed logging
    const info = await transporter.sendMail({
      from: `"Parivartan Path" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
      text: text || "This is an HTML email. Please view in an email client that supports HTML.",
    });

    console.log("✅ [Email Success] Sent successfully!");
    console.log(`   Message ID: ${info.messageId}`);
    console.log(`   Response: ${info.response}`);

    return { success: true, messageId: info.messageId, message: "Email sent successfully" };
  } catch (error) {
    console.error("❌ [Email Error] Failed to send email");
    console.error(`   To: ${Array.isArray(to) ? to.join(", ") : to}`);
    console.error(`   Subject: ${subject}`);
    console.error(`   Error Code: ${error.code}`);
    console.error(`   Error Message: ${error.message}`);
    console.error(`   Full Error:`, error);

    // Provide helpful error messages
    let debugMessage = error.message;
    if (error.message.includes("ENOTFOUND")) {
      debugMessage = "DNS lookup failed. Check SMTP_HOST value.";
    } else if (error.message.includes("ECONNREFUSED")) {
      debugMessage = "Connection refused. Check SMTP_HOST and SMTP_PORT.";
    } else if (error.message.includes("Invalid login")) {
      debugMessage = "Invalid credentials. Check SMTP_USER and SMTP_PASS.";
    } else if (error.message.includes("disabled")) {
      debugMessage = "Gmail SMTP may be disabled. Check account security settings.";
    }

    return { success: false, error: error.message, debugMessage };
  }
}

/**
 * Create a professional HTML template for admin contact notification
 * @param {Object} data - Contact data
 * @returns {string} - HTML template
 */
function createAdminContactTemplate(data) {
  const { name, email, message, date } = data;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
      </style>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #007bff 0%, #0056b3 100%); padding: 30px 20px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px; font-weight: bold;">Parivartan Path</h1>
          <p style="margin: 8px 0 0 0; font-size: 14px; opacity: 0.9;">New Contact Message</p>
        </div>

        <!-- Content -->
        <div style="padding: 30px 20px;">
          <h2 style="color: #333; font-size: 22px; margin: 0 0 20px 0;">New Contact Message Received</h2>
          
          <!-- Contact Details Card -->
          <div style="background-color: #f8f9fa; border-left: 4px solid #007bff; padding: 20px; border-radius: 4px; margin-bottom: 25px;">
            <p style="margin: 0 0 12px 0;">
              <strong style="color: #007bff;">From:</strong><br>
              ${name}
            </p>
            <p style="margin: 0 0 12px 0;">
              <strong style="color: #007bff;">Email:</strong><br>
              <a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a>
            </p>
            <p style="margin: 0;">
              <strong style="color: #007bff;">Received:</strong><br>
              ${date}
            </p>
          </div>

          <!-- Message Section -->
          <div style="margin-bottom: 25px;">
            <h3 style="color: #333; font-size: 16px; margin: 0 0 15px 0;">Message:</h3>
            <div style="background-color: #fff9e6; border-left: 4px solid #ffc107; padding: 15px; border-radius: 4px;">
              <p style="margin: 0; white-space: pre-wrap; word-break: break-word; color: #333;">
                ${message.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>")}
              </p>
            </div>
          </div>

          <!-- Action Suggestion -->
          <div style="background-color: #e8f4f8; border-left: 4px solid #17a2b8; padding: 15px; border-radius: 4px; margin-bottom: 25px;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              <strong>Next Step:</strong> Please review this message and respond to the user at your earliest convenience.
            </p>
          </div>

          <!-- Divider -->
          <hr style="border: none; border-top: 1px solid #ddd; margin: 25px 0;">

          <!-- Footer -->
          <p style="margin: 0; font-size: 12px; color: #999; text-align: center;">
            This is an automated notification from Parivartan Path contact form system.<br>
            <strong>Do not reply to this email.</strong>
          </p>
        </div>

        <!-- Footer Background -->
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #ddd;">
          <p style="margin: 0; color: #666; font-size: 12px;">
            Parivartan Path - Addiction Recovery Services<br>
            <a href="https://parivartan-path.onrender.com" style="color: #007bff; text-decoration: none;">www.parivartan-path.onrender.com</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Create a professional HTML template for user contact confirmation
 * @param {Object} data - Contact data
 * @returns {string} - HTML template
 */
function createUserContactTemplate(data) {
  const { name, message, email } = data;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
      </style>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); padding: 30px 20px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px; font-weight: bold;">✓ Message Received</h1>
          <p style="margin: 8px 0 0 0; font-size: 14px; opacity: 0.9;">Thank you for contacting Parivartan Path</p>
        </div>

        <!-- Content -->
        <div style="padding: 30px 20px;">
          <h2 style="color: #28a745; font-size: 22px; margin: 0 0 10px 0;">Hi ${name},</h2>
          
          <p style="margin: 0 0 20px 0; color: #666; line-height: 1.8;">
            Thank you for reaching out to us at <strong>Parivartan Path</strong>. We have received your message and truly appreciate you taking the time to contact us about our services.
          </p>

          <!-- Message Summary Card -->
          <div style="background-color: #e8f5e9; border-left: 4px solid #28a745; padding: 20px; border-radius: 4px; margin-bottom: 25px;">
            <h3 style="color: #28a745; margin: 0 0 15px 0; font-size: 16px;">Your Message Summary:</h3>
            <div style="background-color: white; padding: 15px; border-radius: 4px;">
              <p style="margin: 0; white-space: pre-wrap; word-break: break-word; color: #555; font-size: 14px;">
                ${message.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>")}
              </p>
            </div>
          </div>

          <!-- Important Info -->
          <div style="background-color: #f0f8ff; border-left: 4px solid #007bff; padding: 15px; border-radius: 4px; margin-bottom: 25px;">
            <p style="margin: 0; color: #333; line-height: 1.8;">
              <strong>📧 What happens next?</strong><br>
              Our team will review your message and get back to you as soon as possible at <strong>${email}</strong>. We typically respond within 24-48 hours during business days.
            </p>
          </div>

          <!-- Contact Info -->
          <div style="background-color: #f9f9f9; border: 1px solid #ddd; padding: 15px; border-radius: 4px; margin-bottom: 25px;">
            <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.8;">
              <strong>Need immediate assistance?</strong><br>
              If your matter is urgent, please don't hesitate to contact us directly through our website or call our support line.
            </p>
          </div>

          <!-- Divider -->
          <hr style="border: none; border-top: 1px solid #ddd; margin: 25px 0;">

          <!-- Closing -->
          <p style="margin: 0 0 20px 0; color: #666; line-height: 1.8;">
            We look forward to helping you on your journey to better health and recovery.
          </p>

          <p style="margin: 0; color: #666;">
            Warm regards,<br>
            <strong>Parivartan Path Team</strong><br>
            <em style="color: #999; font-size: 14px;">Your trusted partner in addiction recovery</em>
          </p>
        </div>

        <!-- Footer Background -->
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #ddd;">
          <p style="margin: 0; color: #666; font-size: 12px;">
            Parivartan Path - Addiction Recovery Services<br>
            <a href="https://parivartan-path.onrender.com" style="color: #007bff; text-decoration: none;">www.parivartan-path.onrender.com</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Create a professional HTML template for admin appointment notification
 * @param {Object} data - Appointment data
 * @returns {string} - HTML template
 */
function createAdminAppointmentTemplate(data) {
  const { patientName, userEmail, addictionType, formattedDate, appointmentId, message } = data;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
      </style>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #007bff 0%, #0056b3 100%); padding: 30px 20px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px; font-weight: bold;">📅 New Appointment</h1>
          <p style="margin: 8px 0 0 0; font-size: 14px; opacity: 0.9;">Appointment Booking Received</p>
        </div>

        <!-- Content -->
        <div style="padding: 30px 20px;">
          <h2 style="color: #333; font-size: 22px; margin: 0 0 20px 0;">New Appointment Booking Received</h2>
          
          <!-- Appointment Details Card -->
          <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2ff 100%); border-left: 4px solid #007bff; padding: 20px; border-radius: 4px; margin-bottom: 25px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 12px 0; width: 40%;"><strong style="color: #007bff;">Patient Name:</strong></td>
                <td style="padding: 12px 0; color: #333;">${patientName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 12px 0;"><strong style="color: #007bff;">Email:</strong></td>
                <td style="padding: 12px 0;">
                  <a href="mailto:${userEmail}" style="color: #007bff; text-decoration: none;">${userEmail}</a>
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 12px 0;"><strong style="color: #007bff;">Service:</strong></td>
                <td style="padding: 12px 0; color: #333;">${addictionType}</td>
              </tr>
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 12px 0;"><strong style="color: #007bff;">Date & Time:</strong></td>
                <td style="padding: 12px 0; color: #333;">${formattedDate}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0;"><strong style="color: #007bff;">Booking ID:</strong></td>
                <td style="padding: 12px 0; color: #333; font-family: 'Courier New', monospace;">${appointmentId}</td>
              </tr>
            </table>
          </div>

          ${message ? `
            <!-- Additional Notes Section -->
            <div style="margin-bottom: 25px;">
              <h3 style="color: #333; font-size: 16px; margin: 0 0 15px 0;">Patient Notes:</h3>
              <div style="background-color: #fff9e6; border-left: 4px solid #ffc107; padding: 15px; border-radius: 4px;">
                <p style="margin: 0; white-space: pre-wrap; word-break: break-word; color: #333;">
                  ${message.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>")}
                </p>
              </div>
            </div>
          ` : ''}

          <!-- Action Suggestion -->
          <div style="background-color: #e8f4f8; border-left: 4px solid #17a2b8; padding: 15px; border-radius: 4px; margin-bottom: 25px;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              <strong>Next Step:</strong> Please confirm the appointment with the patient and ensure the specialist is available for the scheduled time.
            </p>
          </div>

          <!-- Divider -->
          <hr style="border: none; border-top: 1px solid #ddd; margin: 25px 0;">

          <!-- Footer -->
          <p style="margin: 0; font-size: 12px; color: #999; text-align: center;">
            This is an automated notification from Parivartan Path appointment system.<br>
            <strong>Do not reply to this email.</strong>
          </p>
        </div>

        <!-- Footer Background -->
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #ddd;">
          <p style="margin: 0; color: #666; font-size: 12px;">
            Parivartan Path - Addiction Recovery Services<br>
            <a href="https://parivartan-path.onrender.com" style="color: #007bff; text-decoration: none;">www.parivartan-path.onrender.com</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Create a professional HTML template for user appointment confirmation
 * @param {Object} data - Appointment data
 * @returns {string} - HTML template
 */
function createUserAppointmentTemplate(data) {
  const { patientName, addictionType, formattedDate, appointmentId, message } = data;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
      </style>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); padding: 30px 20px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px; font-weight: bold;">✓ Appointment Confirmed</h1>
          <p style="margin: 8px 0 0 0; font-size: 14px; opacity: 0.9;">Your appointment is booked with Parivartan Path</p>
        </div>

        <!-- Content -->
        <div style="padding: 30px 20px;">
          <h2 style="color: #28a745; font-size: 22px; margin: 0 0 10px 0;">Hi ${patientName},</h2>
          
          <p style="margin: 0 0 20px 0; color: #666; line-height: 1.8;">
            Thank you for booking an appointment with <strong>Parivartan Path</strong>. We are glad to support you on your journey to better health and recovery. Your appointment is now confirmed.
          </p>

          <!-- Appointment Details Card -->
          <div style="background: linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%); border-left: 4px solid #28a745; padding: 20px; border-radius: 4px; margin-bottom: 25px;">
            <h3 style="color: #28a745; margin: 0 0 15px 0; font-size: 16px;">📋 Appointment Details:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid rgba(40, 167, 69, 0.2);">
                <td style="padding: 12px 0; width: 40%;"><strong style="color: #28a745;">Service:</strong></td>
                <td style="padding: 12px 0; color: #333;">${addictionType}</td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(40, 167, 69, 0.2);">
                <td style="padding: 12px 0;"><strong style="color: #28a745;">Date & Time:</strong></td>
                <td style="padding: 12px 0; color: #333;">${formattedDate}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0;"><strong style="color: #28a745;">Confirmation ID:</strong></td>
                <td style="padding: 12px 0; color: #333; font-family: 'Courier New', monospace; font-weight: bold;">${appointmentId}</td>
              </tr>
            </table>
          </div>

          <!-- Important Instructions -->
          <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; border-radius: 4px; margin-bottom: 25px;">
            <p style="margin: 0; color: #333; font-weight: bold; margin-bottom: 10px;">⏰ Important Reminders:</p>
            <ul style="margin: 0; padding-left: 20px; color: #666;">
              <li style="margin-bottom: 8px;">Please arrive <strong>10-15 minutes early</strong> to complete any necessary documentation.</li>
              <li style="margin-bottom: 8px;">Keep your <strong>Confirmation ID</strong> handy for check-in.</li>
              <li style="margin-bottom: 8px;">If you need to reschedule or cancel, please contact us at your earliest convenience.</li>
              <li>Please bring valid identification and any relevant medical documents.</li>
            </ul>
          </div>

          ${message ? `
            <!-- Your Notes Section -->
            <div style="margin-bottom: 25px;">
              <h3 style="color: #333; font-size: 16px; margin: 0 0 15px 0;">Your Notes:</h3>
              <div style="background-color: #f5f5f5; border: 1px solid #ddd; padding: 15px; border-radius: 4px;">
                <p style="margin: 0; white-space: pre-wrap; word-break: break-word; color: #555;">
                  ${message.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>")}
                </p>
              </div>
            </div>
          ` : ''}

          <!-- Support Info -->
          <div style="background-color: #f0f8ff; border-left: 4px solid #007bff; padding: 15px; border-radius: 4px; margin-bottom: 25px;">
            <p style="margin: 0; color: #333; line-height: 1.8;">
              <strong>Have questions?</strong><br>
              Our support team is here to help. If you have any questions about your appointment or our services, please don't hesitate to reach out through our website.
            </p>
          </div>

          <!-- Divider -->
          <hr style="border: none; border-top: 1px solid #ddd; margin: 25px 0;">

          <!-- Closing -->
          <p style="margin: 0 0 20px 0; color: #666;">
            We look forward to meeting you and supporting your recovery journey.<br><br>
            Warm regards,<br>
            <strong>Parivartan Path Team</strong><br>
            <em style="color: #999; font-size: 14px;">Your trusted partner in addiction recovery</em>
          </p>
        </div>

        <!-- Footer Background -->
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #ddd;">
          <p style="margin: 0; color: #666; font-size: 12px;">
            Parivartan Path - Addiction Recovery Services<br>
            <a href="https://parivartan-path.onrender.com" style="color: #007bff; text-decoration: none;">www.parivartan-path.onrender.com</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Send contact form emails (admin + user confirmation)
 * Sends to multiple admin emails and user confirmation
 * @param {Object} contactData - Contact form data
 * @param {string} contactData.name - User name
 * @param {string} contactData.email - User email
 * @param {string} contactData.message - Contact message
 */
export async function sendContactEmails(contactData) {
  const { name, email, message } = contactData;
  const adminEmails = getAdminEmails();
  const date = new Date().toLocaleString();

  console.log(`\n[Contact Emails] Processing contact from: ${name} (${email})`);

  // Create email templates
  const adminHtml = createAdminContactTemplate({ name, email, message, date });
  const userHtml = createUserContactTemplate({ name, message, email });

  // Send both admin and user emails
  try {
    const [adminResult, userResult] = await Promise.all([
      sendEmail({
        to: adminEmails,
        subject: `New Contact Message from ${name}`,
        html: adminHtml,
      }),
      sendEmail({
        to: email,
        subject: "We Received Your Message - Parivartan Path",
        html: userHtml,
      }),
    ]);

    console.log(`[Contact Emails] Admin emails: ${adminResult.success ? "✅ Sent to " + adminEmails.length + " admins" : "❌ Failed"}`);
    console.log(`[Contact Emails] User email: ${userResult.success ? "✅ Sent" : "❌ Failed"}`);

    if (!adminResult.success) console.error("Admin email error:", adminResult.error);
    if (!userResult.success) console.error("User email error:", userResult.error);
  } catch (error) {
    console.error("[Contact Emails] Error:", error.message);
  }
}

/**
 * Send appointment booking emails (admin + user confirmation)
 * Sends to multiple admin emails and user confirmation
 * @param {Object} appointmentData - Appointment booking data
 * @param {string} appointmentData.patientName - Patient name
 * @param {string} appointmentData.userEmail - User email
 * @param {string} appointmentData.addictionType - Type of addiction/service
 * @param {Date} appointmentData.appointmentDate - Appointment date and time
 * @param {string} appointmentData.message - Additional message (optional)
 * @param {string} appointmentData.appointmentId - Appointment ID for reference
 */
export async function sendAppointmentEmails(appointmentData) {
  const {
    patientName,
    userEmail,
    addictionType,
    appointmentDate,
    message,
    appointmentId,
  } = appointmentData;

  const adminEmails = getAdminEmails();
  const formattedDate = new Date(appointmentDate).toLocaleString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  console.log(`\n[Appointment Emails] Processing booking for: ${patientName} (${userEmail})`);

  // Create email templates
  const adminHtml = createAdminAppointmentTemplate({
    patientName,
    userEmail,
    addictionType,
    formattedDate,
    appointmentId,
    message,
  });

  const userHtml = createUserAppointmentTemplate({
    patientName,
    addictionType,
    formattedDate,
    appointmentId,
    message,
  });

  // Send both admin and user emails
  try {
    const [adminResult, userResult] = await Promise.all([
      sendEmail({
        to: adminEmails,
        subject: `New Appointment Booking from ${patientName}`,
        html: adminHtml,
      }),
      sendEmail({
        to: userEmail,
        subject: "Your Appointment is Confirmed - Parivartan Path",
        html: userHtml,
      }),
    ]);

    console.log(`[Appointment Emails] Admin emails: ${adminResult.success ? "✅ Sent to " + adminEmails.length + " admins" : "❌ Failed"}`);
    console.log(`[Appointment Emails] User email: ${userResult.success ? "✅ Sent" : "❌ Failed"}`);

    if (!adminResult.success) console.error("Admin email error:", adminResult.error);
    if (!userResult.success) console.error("User email error:", userResult.error);
  } catch (error) {
    console.error("[Appointment Emails] Error:", error.message);
  }
}

export default {
  sendEmail,
  sendContactEmails,
  sendAppointmentEmails,
  verifySMTPConnection,
  validateSMTPConfig,
};
