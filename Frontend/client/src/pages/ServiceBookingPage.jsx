import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ChevronLeft, Calendar, User, Heart, AlertCircle } from "lucide-react";

const services = [
  {
    id: 1,
    icon: "💊",
    title: "Medically Supported Detox",
    desc: "Careful monitoring and symptom management with safety-first protocols.",
    duration: "7-14 days",
    price: "Contact for pricing",
  },
  {
    id: 2,
    icon: "🧠",
    title: "Therapy & Counseling",
    desc: "Evidence-based therapy including CBT and motivational interviewing.",
    duration: "Ongoing",
    price: "Contact for pricing",
  },
  {
    id: 3,
    icon: "👨‍👩‍👧",
    title: "Family & Caregiver Support",
    desc: "Education and counseling to rebuild trust and communication.",
    duration: "Weekly sessions",
    price: "Contact for pricing",
  },
  {
    id: 4,
    icon: "📋",
    title: "Structured Rehab Programs",
    desc: "Daily routines and group sessions for stability building.",
    duration: "30-90 days",
    price: "Contact for pricing",
  },
  {
    id: 5,
    icon: "🛡️",
    title: "Relapse Prevention",
    desc: "Coping skills and practical plans for long-term success.",
    duration: "12 weeks",
    price: "Contact for pricing",
  },
  {
    id: 6,
    icon: "🌿",
    title: "Holistic Recovery",
    desc: "Mindfulness, nutrition, and wellness support.",
    duration: "Customized",
    price: "Contact for pricing",
  },
  {
    id: 7,
    icon: "✅",
    title: "Aftercare & Follow-ups",
    desc: "Ongoing support and progress monitoring.",
    duration: "6+ months",
    price: "Contact for pricing",
  },
];

export default function ServiceBookingPage() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((s) => s.auth);
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState({
    patientName: user?.name || "",
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
          <p className="text-lg mb-6">Please sign in to book a service appointment.</p>
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
    if (!selectedService) {
      setError("Please select a service");
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
      // Get token from localStorage (stored as auth JSON)
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
          addictionType: selectedService.title,
          appointmentDate: new Date(formData.appointmentDate).toISOString(),
          message: `Service: ${selectedService.title}\n\n${formData.message}`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to book appointment");
      }

      setSuccess(true);
      setSelectedService(null);
      setFormData({
        patientName: user?.name || "",
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
          <h1 className="text-3xl font-bold mb-2">Appointment Booked!</h1>
          <p className="text-lg text-gray-200 mb-6">
            Your service appointment has been successfully booked. We'll contact you soon to confirm the details.
          </p>
          <p className="text-sm text-gray-400">Redirecting to dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 dark:from-slate-900 to-white dark:to-slate-800 px-4 py-12">
      <Helmet>
        <title>Book a Service | Parivartan Path</title>
      </Helmet>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <button
            onClick={() => navigate("/services")}
            className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold mb-6 hover:gap-3 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Services
          </button>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Book a Service</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Schedule an appointment for one of our specialized recovery services
          </p>
        </motion.div>

        {/* Services Grid */}
        {!selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12"
          >
            {services.map((service) => (
              <motion.button
                key={service.id}
                onClick={() => setSelectedService(service)}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl border-2 border-gray-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-400 bg-white dark:bg-slate-800 text-left transition-all"
              >
                <div className="text-4xl mb-3">{service.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{service.desc}</p>
                <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-500">
                  <span>⏱️ {service.duration}</span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Booking Form */}
        {selectedService && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg ring-1 ring-gray-200 dark:ring-slate-700">
              {/* Selected Service Summary */}
              <div className="mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-200 dark:border-blue-700">
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{selectedService.icon}</span>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">{selectedService.title}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">{selectedService.desc}</p>
                    <div className="mt-3 flex gap-4 text-sm">
                      <span className="text-gray-500 dark:text-gray-400">⏱️ Duration: {selectedService.duration}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    ✕
                  </button>
                </div>
              </div>

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

              {/* Booking Form */}
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
                    placeholder="Enter patient name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Appointment Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <Calendar className="inline w-4 h-4 mr-2" />
                    Preferred Date *
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

                {/* Additional Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <Heart className="inline w-4 h-4 mr-2" />
                    Additional Information (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your situation, medical history, or specific concerns..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                    rows={4}
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setSelectedService(null)}
                    className="flex-1 px-6 py-3 rounded-xl border-2 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-slate-700 transition"
                  >
                    Choose Different Service
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-400 text-white font-semibold transition flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Booking...
                      </>
                    ) : (
                      "Confirm Booking"
                    )}
                  </button>
                </div>
              </form>

              {/* Info Box */}
              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700 text-sm text-blue-800 dark:text-blue-300">
                <p>
                  <strong>ℹ️ Next Steps:</strong> After booking, our team will review your appointment and contact you within 24 hours to confirm the details and answer any questions.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
