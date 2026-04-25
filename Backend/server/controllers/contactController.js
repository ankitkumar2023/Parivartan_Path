import Contact from "../models/Contact.js";

/**
 * @route   POST /api/contact
 * @access  Public
 */
export async function submitContact(req, res, next) {
  try {
    const { name, email, message } = req.body;

    const contact = await Contact.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      message: message.trim(),
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

