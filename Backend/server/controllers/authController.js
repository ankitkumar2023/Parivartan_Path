import jwt from "jsonwebtoken";
import User from "../models/User.js";

function signToken(userId) {
  if (!process.env.JWT_SECRET) {
    const err = new Error("Server misconfigured: JWT_SECRET is missing.");
    err.statusCode = 500;
    throw err;
  }

  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}

/**
 * @route   POST /api/auth/register
 * @access  Public
 */
export async function register(req, res, next) {
  try {
    const { name, address, email, password, phone, gender, familyMemberName, familyMemberNumber } = req.body;

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      res.status(409);
      throw new Error("Email already in use.");
    }

    const user = await User.create({
      name: name.trim(),
      address: address.trim(),
      email: email.toLowerCase().trim(),
      password,
      phone: phone?.trim(),
      gender: gender.trim(),
      familyMemberName: familyMemberName.trim(),
      familyMemberNumber: familyMemberNumber.trim(),
      role: "user",
    });

    const token = signToken(user._id.toString());

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        address: user.address,
        email: user.email,
        role: user.role,
        phone: user.phone,
        gender: user.gender,
        familyMemberName: user.familyMemberName,
        familyMemberNumber: user.familyMemberNumber,
      },
    });
  } catch (err) {
    next(err);
  }
}

/**
 * @route   POST /api/auth/login
 * @access  Public
 */
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase().trim() }).select("+password");
    if (!user) {
      res.status(401);
      throw new Error("Invalid credentials.");
    }

    const ok = await user.matchPassword(password);
    if (!ok) {
      res.status(401);
      throw new Error("Invalid credentials.");
    }

    const token = signToken(user._id.toString());

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        address: user.address,
        email: user.email,
        role: user.role,
        phone: user.phone,
        gender: user.gender,
        familyMemberName: user.familyMemberName,
        familyMemberNumber: user.familyMemberNumber,
      },
    });
  } catch (err) {
    next(err);
  }
}

