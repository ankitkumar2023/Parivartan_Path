import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function protect(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";
    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      res.status(401);
      throw new Error("Not authorized: missing or invalid token.");
    }

    if (!process.env.JWT_SECRET) {
      res.status(500);
      throw new Error("Server misconfigured: JWT_SECRET is missing.");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      res.status(401);
      throw new Error("Not authorized: user no longer exists.");
    }

    req.user = { id: user._id.toString(), role: user.role, email: user.email, name: user.name };
    next();
  } catch (err) {
    // Keep message generic in production
    const msg = process.env.NODE_ENV === "production" ? "Not authorized." : err.message;
    res.status(res.statusCode && res.statusCode !== 200 ? res.statusCode : 401);
    next(new Error(msg));
  }
}

export function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      res.status(401);
      return next(new Error("Not authorized."));
    }

    if (!roles.includes(req.user.role)) {
      res.status(403);
      return next(new Error("Forbidden: insufficient permissions."));
    }

    next();
  };
}

