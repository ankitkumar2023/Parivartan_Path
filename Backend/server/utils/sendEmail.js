import nodemailer from "nodemailer";

/**
 * Create a reusable Nodemailer transporter
 * Uses SMTP credentials from environment variables
 */
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

/**
 * Send a single email
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email address
 * @param {string} options.subject - Email subject
 * @param {string} options.html - HTML email body
 * @param {string} options.text - Plain text email body (optional)
 * @returns {Promise<Object>} - Email info object
 */
export async function sendEmail({ to, subject, html, text }) {
  try {
    // Validate SMTP configuration
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn("⚠️ SMTP configuration incomplete. Email not sent.");
      return { error: "SMTP not configured", sent: false };
    }

    const transporter = createTransporter();

    // Send email
    const info = await transporter.sendMail({
      from: `"Parivartan Path" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
      text,
    });

    console.log("✅ Email sent successfully:", info.response);
    return { messageId: info.messageId, sent: true };
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    return { error: error.message, sent: false };
  }
}

/**
 * Send contact form emails (admin + user confirmation)
 * @param {Object} contactData - Contact form data
 * @param {string} contactData.name - User name
 * @param {string} contactData.email - User email
 * @param {string} contactData.message - Contact message
 */
export async function sendContactEmails(contactData) {
  const { name, email, message } = contactData;
  const adminEmail = process.env.ADMIN_EMAIL || "ak7948683@gmail.com";

  // Admin notification email
  const adminHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #333;">New Contact Message Received</h2>
      <hr style="border: none; border-top: 2px solid #007bff;" />
      
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
      </div>

      <h3 style="color: #333;">Message:</h3>
      <div style="background-color: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; border-radius: 4px;">
        <p>${message.replace(/\n/g, "<br>")}</p>
      </div>

      <hr style="border: none; border-top: 1px solid #ddd; margin-top: 30px;" />
      <p style="font-size: 12px; color: #666;">
        This is an automated notification from Parivartan Path contact form.
      </p>
    </div>
  `;

  // User confirmation email
  const userHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #28a745;">We Received Your Message</h2>
      <hr style="border: none; border-top: 2px solid #28a745;" />
      
      <p>Hi <strong>${name}</strong>,</p>
      
      <p>Thank you for reaching out to us at Parivartan Path. We have received your message and appreciate you taking the time to contact us.</p>
      
      <div style="background-color: #e7f3ff; padding: 15px; border-left: 4px solid #007bff; border-radius: 4px; margin: 20px 0;">
        <p><strong>Your Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      </div>

      <p>Our team will review your message and get back to you as soon as possible at <strong>${email}</strong>.</p>

      <p>If you need immediate assistance, please contact us directly at our phone number.</p>

      <hr style="border: none; border-top: 1px solid #ddd; margin-top: 30px;" />
      <p style="font-size: 12px; color: #666;">
        Best regards,<br>
        <strong>Parivartan Path Team</strong>
      </p>
    </div>
  `;

  // Send both emails (non-blocking, catch errors silently)
  Promise.all([
    sendEmail({
      to: adminEmail,
      subject: `New Contact Message from ${name}`,
      html: adminHtml,
    }),
    sendEmail({
      to: email,
      subject: "We Received Your Message - Parivartan Path",
      html: userHtml,
    }),
  ]).catch((error) => {
    console.error("Error sending contact emails:", error);
  });
}

/**
 * Send appointment booking emails (admin + user confirmation)
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

  const adminEmail = process.env.ADMIN_EMAIL || "ak7948683@gmail.com";
  const formattedDate = new Date(appointmentDate).toLocaleString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Admin notification email
  const adminHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #333;">New Appointment Booking Received</h2>
      <hr style="border: none; border-top: 2px solid #007bff;" />
      
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Patient Name:</strong> ${patientName}</p>
        <p><strong>User Email:</strong> <a href="mailto:${userEmail}">${userEmail}</a></p>
        <p><strong>Service:</strong> ${addictionType}</p>
        <p><strong>Appointment Date & Time:</strong> ${formattedDate}</p>
        <p><strong>Booking ID:</strong> ${appointmentId}</p>
        <p><strong>Booking Date:</strong> ${new Date().toLocaleString()}</p>
      </div>

      ${
        message
          ? `
        <h3 style="color: #333;">Additional Notes:</h3>
        <div style="background-color: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; border-radius: 4px;">
          <p>${message.replace(/\n/g, "<br>")}</p>
        </div>
      `
          : ""
      }

      <hr style="border: none; border-top: 1px solid #ddd; margin-top: 30px;" />
      <p style="font-size: 12px; color: #666;">
        This is an automated notification from Parivartan Path appointment system.
      </p>
    </div>
  `;

  // User confirmation email
  const userHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #28a745;">Your Appointment is Confirmed</h2>
      <hr style="border: none; border-top: 2px solid #28a745;" />
      
      <p>Hi <strong>${patientName}</strong>,</p>
      
      <p>Thank you for booking an appointment with Parivartan Path. We are glad to help you on your journey to recovery.</p>
      
      <div style="background-color: #e7f3ff; padding: 20px; border-left: 4px solid #28a745; border-radius: 4px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #28a745;">Appointment Details:</h3>
        <p><strong>Service:</strong> ${addictionType}</p>
        <p><strong>Date & Time:</strong> ${formattedDate}</p>
        <p><strong>Confirmation ID:</strong> ${appointmentId}</p>
      </div>

      <p style="background-color: #e8f5e9; padding: 15px; border-radius: 4px; border-left: 4px solid #4caf50;">
        <strong>📋 Important:</strong> Please arrive 10-15 minutes before your scheduled appointment time. If you need to reschedule or cancel, please contact us as soon as possible.
      </p>

      ${
        message
          ? `
        <h3 style="color: #333;">Your Notes:</h3>
        <p style="background-color: #f5f5f5; padding: 10px; border-radius: 4px;">${message.replace(/\n/g, "<br>")}</p>
      `
          : ""
      }

      <p>If you have any questions or need to make changes, please reply to this email or contact us directly.</p>

      <hr style="border: none; border-top: 1px solid #ddd; margin-top: 30px;" />
      <p style="font-size: 12px; color: #666;">
        Best regards,<br>
        <strong>Parivartan Path Team</strong><br>
        <em>Your trusted partner in addiction recovery</em>
      </p>
    </div>
  `;

  // Send both emails (non-blocking, catch errors silently)
  Promise.all([
    sendEmail({
      to: adminEmail,
      subject: `New Appointment Booking from ${patientName}`,
      html: adminHtml,
    }),
    sendEmail({
      to: userEmail,
      subject: "Your Appointment is Confirmed - Parivartan Path",
      html: userHtml,
    }),
  ]).catch((error) => {
    console.error("Error sending appointment emails:", error);
  });
}
