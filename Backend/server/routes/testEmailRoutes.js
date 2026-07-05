import { sendEmail, validateSMTPConfig } from "../utils/sendEmail.js";

/**
 * @route   GET /api/test-email
 * @access  Public
 * @desc    Test email sending functionality - used for debugging
 */
export async function testEmailSend(req, res, next) {
  try {
    console.log("\n" + "=".repeat(60));
    console.log("[TEST EMAIL] Starting email test...");
    console.log("=".repeat(60));

    // 1. Validate SMTP configuration
    const validation = validateSMTPConfig();
    console.log("\n[TEST EMAIL] Configuration Check:");
    console.log(JSON.stringify(validation, null, 2));

    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: "SMTP configuration incomplete",
        details: validation,
      });
    }

    // 2. Send test email
    const testEmail = process.env.ADMIN_EMAIL || "ak7948683@gmail.com";

    const testHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #28a745;">✅ Email Test Successful!</h2>
        <hr style="border: none; border-top: 2px solid #28a745;" />
        
        <p>This is a test email from Parivartan Path backend SMTP configuration.</p>
        
        <div style="background-color: #e8f5e9; padding: 20px; border-left: 4px solid #4caf50; border-radius: 4px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #28a745;">Test Details:</h3>
          <p><strong>Sent At:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>From:</strong> Parivartan Path Backend</p>
          <p><strong>Test Type:</strong> SMTP Connection Verification</p>
        </div>

        <p style="background-color: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; border-radius: 4px;">
          <strong>ℹ️ Note:</strong> If you received this email, your SMTP configuration is working correctly!
        </p>

        <hr style="border: none; border-top: 1px solid #ddd; margin-top: 30px;" />
        <p style="font-size: 12px; color: #666;">
          This email was sent automatically for testing purposes.
        </p>
      </div>
    `;

    console.log("\n[TEST EMAIL] Sending test email to:", testEmail);

    const result = await sendEmail({
      to: testEmail,
      subject: "✅ Parivartan Path - SMTP Test Email",
      html: testHtml,
      text: "This is a test email from Parivartan Path. If you received this, SMTP is working correctly!",
    });

    console.log("\n[TEST EMAIL] Result:", JSON.stringify(result, null, 2));
    console.log("=".repeat(60) + "\n");

    if (result.success) {
      res.status(200).json({
        success: true,
        message: "✅ Test email sent successfully!",
        details: {
          recipient: testEmail,
          messageId: result.messageId,
          timestamp: new Date().toISOString(),
          note: "Check your email (including spam/promotions folder) for the test message.",
        },
      });
    } else {
      res.status(500).json({
        success: false,
        message: "❌ Failed to send test email",
        error: result.error,
        debugMessage: result.debugMessage,
        troubleshoot: {
          step1: "Check console logs for detailed error information",
          step2: "Verify SMTP_HOST, SMTP_PORT, SMTP_USER in .env",
          step3: "Verify SMTP_PASS is a valid 16-character Gmail App Password (not your account password)",
          step4: "Ensure Gmail 2FA is enabled and App Password is generated at myaccount.google.com/apppasswords",
          step5: "Check if Gmail is blocking the SMTP connection",
          step6: "For Render: Ensure env variables are set in Render dashboard and backend is redeployed",
        },
      });
    }
  } catch (err) {
    console.error("[TEST EMAIL] Error:", err);
    next(err);
  }
}

export default { testEmailSend };
