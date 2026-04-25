import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    address: { type: String, required: true, trim: true, maxlength: 300 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 150,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address."],
    },
    password: { type: String, required: true, minlength: 8, select: false },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    phone: { type: String, trim: true, maxlength: 30 },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other", "prefer_not_to_say"],
    },
    familyMemberName: { type: String, required: true, trim: true, maxlength: 100 },
    familyMemberNumber: { type: String, required: true, trim: true, maxlength: 30 },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  // password is select:false; ensure you query with .select("+password") when needed
  return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;

