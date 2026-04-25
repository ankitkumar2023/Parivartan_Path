import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ChevronLeft, Calendar, User, Phone, Mail, MessageSquare, AlertCircle } from "lucide-react";
import { sendBookingEmail } from "../services/emailService.js";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const addictionTypes = [
  "Alcohol",
  "Opioids",
  "Cannabis",
  "Stimulants (Cocaine, Methamphetamine)",
  "Benzodiazepines",
  "Prescription Medications",
  "Inhalants",
  "Nicotine",
  "Multiple Substances",
  "Behavioral Addiction",
  "Other",
];

export default function AppointmentBookingPage() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((s) => s.auth);
  const [formData, setFormData] = useState({
    patientName: user?.name || "",
    email: user?.email || "",
    addictionType: "",
    appointmentDate: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-900 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center px-4">
        <div className="text-center text-white">
          <h1 className="text-3xl font-bold mb-4">Sign in Required</h1>
          <p className="text-lg mb-6">Please sign in to book an appointment.</p>
          <button
            onClick={() => navigate("/login")}
            className="bg-emerald-500 hover:bg-emerald-600 px-6 py-3 rounded-lg font-semibold transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.addictionType) {
      setError("Please select an addiction type");
      return;
    }
    if (!formData.appointmentDate) {
      setError("Please select an appointment date");
      return;
    }

    // Validate token exists before making request
    if (!user?.id) {
      setError("Session expired. Please login again.");
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      // Get token from Redux state (stored in localStorage as auth JSON)
      const stored = localStorage.getItem("auth");
      const authData = stored ? JSON.parse(stored) : null;
      const token = authData?.token;

      if (!token) {
        throw new Error("Authentication token not found. Please login again.");
      }

      const response = await fetch(`${API_BASE_URL}/api/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          patientName: formData.patientName,
          addictionType: formData.addictionType,
          appointmentDate: new Date(formData.appointmentDate).toISOString(),
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to book appointment");
      }

      // Send booking confirmation email (non-blocking - don't break the flow if it fails)
      try {
        const appointmentDate = new Date(formData.appointmentDate);
        const formattedDate = appointmentDate.toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

        const emailResult = await sendBookingEmail({
          name: formData.patientName,
          email: formData.email,
          date: formattedDate,
          service: formData.addictionType,
          phone: user?.phone || "N/A",
          bookingId: data.appointmentId || data._id || data.appointment?._id || "N/A",
        });

        // Log email result but don't break the flow
        if (!emailResult.success) {
          console.warn("⚠️ Booking email not sent:", emailResult.error);
        }
      } catch (emailErr) {
        console.warn("⚠️ Booking email error:", emailErr);
        // Continue even if email fails - booking is still successful
      }

      setSuccess(true);
      setFormData({
        patientName: user?.name || "",
        email: user?.email || "",
        addictionType: "",
        appointmentDate: "",
        message: "",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to book appointment. Please try again.");
      console.error("Booking error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-900 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center text-white max-w-md"
        >
          <div className="mb-4 inline-block p-4 bg-emerald-500/20 rounded-full">
            <svg className="w-12 h-12 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-2">Appointment Confirmed!</h1>
          <p className="text-lg text-gray-200 mb-6">
            Your appointment request has been successfully submitted. Our team will review your information and contact you within 24 hours to confirm.
          </p>
          <p className="text-sm text-gray-400">Redirecting to dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 dark:from-slate-900 to-white dark:to-slate-800 px-4 py-12">
      <Helmet>
        <title>Book an Appointment | Parivartan Path</title>
      </Helmet>

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold mb-6 hover:gap-3 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
            Go Back
          </button>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Book an Appointment</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Schedule a consultation with our recovery specialists
          </p>
        </motion.div>

        {/* Booking Form */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg ring-1 ring-gray-200 dark:ring-slate-700">
            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-xl flex gap-3 text-red-700 dark:text-red-400"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p>{error}</p>
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Patient Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <User className="inline w-4 h-4 mr-2" />
                  Patient Name *
                </label>
                <input
                  type="text"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <Mail className="inline w-4 h-4 mr-2" />
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  required
                  readOnly
                />
              </div>

              {/* Addiction Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Addiction Type *
                </label>
                <select
                  name="addictionType"
                  value={formData.addictionType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none"
                  required
                >
                  <option value="">Select addiction type...</option>
                  {addictionTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Appointment Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <Calendar className="inline w-4 h-4 mr-2" />
                  Preferred Appointment Date *
                </label>
                <input
                  type="datetime-local"
                  name="appointmentDate"
                  value={formData.appointmentDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <MessageSquare className="inline w-4 h-4 mr-2" />
                  Tell Us More (Optional)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your situation, medical history, or any specific concerns you'd like us to know about..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                  rows={5}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-400 text-white font-semibold transition flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Booking Appointment...
                  </>
                ) : (
                  "Book Appointment"
                )}
              </button>
            </form>

            {/* Info Boxes */}
            <div className="mt-8 space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700 text-sm text-blue-800 dark:text-blue-300">
                <p>
                  <strong>✓ Confidential:</strong> Your information is completely secure and confidential. All details are encrypted and protected.
                </p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-700 text-sm text-green-800 dark:text-green-300">
                <p>
                  <strong>✓ Quick Response:</strong> Our team will contact you within 24 hours to confirm your appointment and discuss next steps.
                </p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-700 text-sm text-purple-800 dark:text-purple-300">
                <p>
                  <strong>📞 Need Help?</strong> Call us anytime at <strong>9113193968</strong> or <strong>6204899258</strong>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
