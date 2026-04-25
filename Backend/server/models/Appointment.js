import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    patientName: { type: String, required: true, trim: true, maxlength: 120 },
    addictionType: { type: String, required: true, trim: true, maxlength: 120 },
    appointmentDate: { type: Date, required: true },
    message: { type: String, trim: true, maxlength: 2000 },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed"],
      default: "Pending",
      index: true,
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;

