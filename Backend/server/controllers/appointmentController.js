import Appointment from "../models/Appointment.js";
import { sendAppointmentEmails } from "../utils/sendEmail.js";

/**
 * @route   POST /api/appointments
 * @access  Private (user)
 * @desc    Create appointment and send confirmation emails
 */
export async function createAppointment(req, res, next) {
  try {
    const { patientName, addictionType, appointmentDate, message } = req.body;

    // Create appointment in database
    const appt = await Appointment.create({
      userId: req.user.id,
      patientName: patientName.trim(),
      addictionType: addictionType.trim(),
      appointmentDate: new Date(appointmentDate),
      message: message?.trim(),
      status: "Pending",
    });

    // Send emails (admin notification + user confirmation)
    // Non-blocking - emails sent asynchronously
    sendAppointmentEmails({
      patientName: appt.patientName,
      userEmail: req.user.email,
      addictionType: appt.addictionType,
      appointmentDate: appt.appointmentDate,
      message: appt.message,
      appointmentId: appt._id.toString(),
    });

    res.status(201).json({ success: true, appointment: appt });
  } catch (err) {
    next(err);
  }
}

/**
 * @route   GET /api/appointments/my
 * @access  Private (user)
 */
export async function getMyAppointments(req, res, next) {
  try {
    const items = await Appointment.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, appointments: items });
  } catch (err) {
    next(err);
  }
}

/**
 * @route   GET /api/appointments
 * @access  Private (admin)
 */
export async function getAllAppointments(req, res, next) {
  try {
    const items = await Appointment.find({})
      .populate("userId", "name email phone role")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, appointments: items });
  } catch (err) {
    next(err);
  }
}

/**
 * @route   PATCH /api/appointments/:id/status
 * @access  Private (admin)
 */
export async function updateAppointmentStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const appt = await Appointment.findById(id);
    if (!appt) {
      res.status(404);
      throw new Error("Appointment not found.");
    }

    appt.status = status;
    await appt.save();

    res.status(200).json({ success: true, appointment: appt });
  } catch (err) {
    next(err);
  }
}

