import Contact from "../models/Contact.js";
import { sendContactEmails } from "../utils/sendEmail.js";

/**
 * @route   POST /api/contact
 * @access  Public
 * @desc    Submit a contact form and send emails to admin and user
 */
export async function submitContact(req, res, next) {
  try {
    const { name, email, message } = req.body;

    // Create contact in database
    const contact = await Contact.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      message: message.trim(),
    });

    // Send emails (admin notification + user confirmation)
    // Non-blocking - emails sent asynchronously
    sendContactEmails({
      name: contact.name,
      email: contact.email,
      message: contact.message,
    });

    res.status(201).json({
      success: true,
      message: "Message received. We will contact you soon.",
      contactId: contact._id.toString(),
    });
  } catch (err) {
    next(err);
  }
}

