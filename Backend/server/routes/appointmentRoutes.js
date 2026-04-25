import express from "express";
import { body, param, validationResult } from "express-validator";

import {
  createAppointment,
  getMyAppointments,
  getAllAppointments,
  updateAppointmentStatus,
} from "../controllers/appointmentController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

function validate(req, res, next) {
  const result = validationResult(req);
  if (result.isEmpty()) return next();
  return res.status(400).json({
    success: false,
    message: "Validation failed.",
    errors: result.array().map((e) => ({ field: e.path, message: e.msg })),
  });
}

// User: create appointment
router.post(
  "/",
  protect,
  [
    body("patientName").trim().notEmpty().withMessage("Patient name is required.").isLength({ max: 120 }).withMessage("Patient name is too long."),
    body("addictionType").trim().notEmpty().withMessage("Addiction type is required.").isLength({ max: 120 }).withMessage("Addiction type is too long."),
    body("appointmentDate")
      .notEmpty()
      .withMessage("Appointment date is required.")
      .isISO8601()
      .withMessage("Appointment date must be a valid ISO date."),
    body("message").optional().trim().isLength({ max: 2000 }).withMessage("Message is too long."),
    validate,
  ],
  createAppointment
);

// User: list own appointments
router.get("/my", protect, getMyAppointments);

// Admin: list all appointments
router.get("/", protect, authorize("admin"), getAllAppointments);

// Admin: update appointment status
router.patch(
  "/:id/status",
  protect,
  authorize("admin"),
  [
    param("id").isMongoId().withMessage("Invalid appointment id."),
    body("status")
      .trim()
      .notEmpty()
      .withMessage("Status is required.")
      .isIn(["Pending", "Confirmed", "Completed"])
      .withMessage("Status must be Pending, Confirmed, or Completed."),
    validate,
  ],
  updateAppointmentStatus
);

export default router;

