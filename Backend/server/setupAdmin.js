/**
 * Admin Account Setup Script
 * 
 * This script creates an admin account in the database.
 * Run this script once to set up the initial admin user.
 * 
 * Usage: node setupAdmin.js
 * 
 * Default Admin Credentials (for testing):
 * Email: admin@parivartan.com
 * Password: Admin@123
 */

import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@parivartan.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Admin@123";
const ADMIN_NAME = process.env.ADMIN_NAME || "Administrator";

async function setupAdmin() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/parivartan";
    await mongoose.connect(mongoUri);
    console.log("✓ Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });
    if (existingAdmin) {
      console.log("⚠ Admin account already exists:", ADMIN_EMAIL);
      console.log("  To reset, delete the user manually or change the email in the script.");
      process.exit(0);
    }

    // Create admin account
    const admin = await User.create({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      role: "admin",
      address: "Administration Office",
      phone: "+91-XXXXXXXXXX",
      gender: "prefer_not_to_say",
      familyMemberName: "N/A",
      familyMemberNumber: "N/A",
    });

    console.log("✓ Admin account created successfully!");
    console.log("\n📧 Admin Credentials:");
    console.log(`   Email: ${ADMIN_EMAIL}`);
    console.log(`   Password: ${ADMIN_PASSWORD}`);
    console.log("\n⚠️  IMPORTANT: Change the default password after first login!");
    console.log("🔐 Store credentials securely.");

    process.exit(0);
  } catch (error) {
    console.error("✗ Error setting up admin account:", error.message);
    process.exit(1);
  }
}

// Run the setup
setupAdmin();
