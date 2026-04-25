import express from "express";
import { body, validationResult } from "express-validator";

import { submitContact } from "../controllers/contactController.js";

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

router.post(
  "/",
  [
    body("name").trim().notEmpty().withMessage("Name is required.").isLength({ max: 120 }).withMessage("Name is too long."),
    body("email").trim().notEmpty().withMessage("Email is required.").isEmail().withMessage("Email must be valid."),
    body("message")
      .trim()
      .notEmpty()
      .withMessage("Message is required.")
      .isLength({ max: 3000 })
      .withMessage("Message is too long."),
    validate,
  ],
  submitContact
);

export default router;

