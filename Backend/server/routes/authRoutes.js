import express from "express";
import { body, validationResult } from "express-validator";

import { register, login } from "../controllers/authController.js";

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
  "/register",
  [
    body("name").trim().notEmpty().withMessage("Name is required.").isLength({ max: 100 }).withMessage("Name is too long."),
    body("address")
      .trim()
      .notEmpty()
      .withMessage("Address is required.")
      .isLength({ max: 300 })
      .withMessage("Address is too long."),
    body("email").trim().notEmpty().withMessage("Email is required.").isEmail().withMessage("Email must be valid."),
    body("password")
      .notEmpty()
      .withMessage("Password is required.")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters."),
    body("phone").trim().notEmpty().withMessage("Phone is required.").isLength({ max: 30 }).withMessage("Phone is too long."),
    body("gender")
      .trim()
      .notEmpty()
      .withMessage("Gender is required.")
      .isIn(["male", "female", "other", "prefer_not_to_say"])
      .withMessage("Gender must be one of: male, female, other, prefer_not_to_say."),
    body("familyMemberName")
      .trim()
      .notEmpty()
      .withMessage("Family member name is required.")
      .isLength({ max: 100 })
      .withMessage("Family member name is too long."),
    body("familyMemberNumber")
      .trim()
      .notEmpty()
      .withMessage("Family member number is required.")
      .isLength({ max: 30 })
      .withMessage("Family member number is too long."),
    validate,
  ],
  register
);

router.post(
  "/login",
  [
    body("email").trim().notEmpty().withMessage("Email is required.").isEmail().withMessage("Email must be valid."),
    body("password").notEmpty().withMessage("Password is required."),
    validate,
  ],
  login
);

export default router;

