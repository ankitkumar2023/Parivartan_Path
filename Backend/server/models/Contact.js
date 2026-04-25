import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      maxlength: 150,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address."],
    },
    message: { type: String, required: true, trim: true, maxlength: 3000 },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;

