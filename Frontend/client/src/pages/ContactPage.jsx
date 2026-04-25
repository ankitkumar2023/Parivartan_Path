import React, { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import axios from "axios";
import { sendContactEmail } from "../services/emailService.js";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function normalizeError(error) {
  return error?.response?.data?.message || error?.message || "Something went wrong. Please try again.";
}

export default function ContactPage() {
  const api = useMemo(
    () =>
      axios.create({
        baseURL: API_URL,
        headers: { "Content-Type": "application/json" },
      }),
    []
  );

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState({ loading: false, error: null, success: null });

  const errors = {
    name: !form.name.trim() ? "Name is required." : form.name.trim().length > 120 ? "Name is too long." : null,
    email: !form.email.trim()
      ? "Email is required."
      : !/^\S+@\S+\.\S+$/.test(form.email.trim())
        ? "Enter a valid email."
        : null,
    message: !form.message.trim()
      ? "Message is required."
      : form.message.trim().length > 3000
        ? "Message is too long."
        : null,
  };

  const canSubmit = !errors.name && !errors.email && !errors.message && !status.loading;

  function setField(key, value) {
    setForm((s) => ({ ...s, [key]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    setStatus({ loading: false, error: null, success: null });

    if (!canSubmit) return;

    try {
      setStatus({ loading: true, error: null, success: null });
      
      // Send email using EmailJS service
      const emailResult = await sendContactEmail({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      });

      // Also save to backend for records
      try {
        await api.post("/api/contact", {
          name: form.name,
          email: form.email,
          message: form.message,
        });
      } catch (backendErr) {
        console.warn("Backend contact save failed:", backendErr);
        // Continue even if backend fails, email was sent
      }

      if (emailResult.success) {
        setStatus({
          loading: false,
          error: null,
          success: emailResult.message || "Message sent successfully! We will get back to you soon.",
        });
        setForm({ name: "", email: "", message: "" });
        setTouched({});
      } else {
        setStatus({
          loading: false,
          error: emailResult.error || "Failed to send message. Please try again.",
          success: null,
        });
      }
    } catch (err) {
      setStatus({
        loading: false,
        error: err.message || "Something went wrong. Please try again.",
        success: null,
      });
    }
  }

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      <Helmet>
        <title>Contact | Parivartan Path</title>
        <meta
          name="description"
          content="Contact Parivartan Path for confidential consultation, appointments, and recovery guidance."
        />
      </Helmet>

      <section className="bg-blue-950">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="max-w-2xl"
          >
            <p className="text-sm font-semibold text-amber-300">Contact</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-white md:text-5xl">
              We’re here—confidentially.
            </h1>
            <p className="mt-4 text-sm leading-7 text-white/80">
              Share your details and a specialist will follow up discreetly. If this is a medical emergency, contact
              local emergency services immediately.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-3"
          >
            <div className="rounded-3xl bg-white dark:bg-slate-800 p-6 shadow-soft ring-1 ring-black/5 dark:ring-slate-700 md:p-8">
              <p className="text-sm font-semibold text-blue-900 dark:text-blue-300">Send a message</p>
              <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-slate-300">
                We typically respond within 24 hours. Your message remains confidential.
              </p>

              <form onSubmit={onSubmit} className="mt-6 grid gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-800 dark:text-slate-200">Name</label>
                  <input
                    value={form.name}
                    onChange={(e) => setField("name", e.target.value)}
                    onBlur={() => setTouched((s) => ({ ...s, name: true }))}
                    placeholder="Your full name"
                    className={[
                      "mt-2 w-full rounded-2xl border bg-white dark:bg-slate-700 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none transition",
                      touched.name && errors.name
                        ? "border-red-300 dark:border-red-600 ring-2 ring-red-200 dark:ring-red-500/50"
                        : "border-gray-200 dark:border-slate-600 focus:border-blue-900/40 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-900/15 dark:focus:ring-blue-500/30",
                    ].join(" ")}
                  />
                  {touched.name && errors.name && <p className="mt-2 text-xs font-medium text-red-600 dark:text-red-400">{errors.name}</p>}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-800 dark:text-slate-200">Email</label>
                  <input
                    value={form.email}
                    onChange={(e) => setField("email", e.target.value)}
                    onBlur={() => setTouched((s) => ({ ...s, email: true }))}
                    placeholder="you@example.com"
                    className={[
                      "mt-2 w-full rounded-2xl border bg-white dark:bg-slate-700 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none transition",
                      touched.email && errors.email
                        ? "border-red-300 dark:border-red-600 ring-2 ring-red-200 dark:ring-red-500/50"
                        : "border-gray-200 dark:border-slate-600 focus:border-blue-900/40 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-900/15 dark:focus:ring-blue-500/30",
                    ].join(" ")}
                  />
                  {touched.email && errors.email && (
                    <p className="mt-2 text-xs font-medium text-red-600 dark:text-red-400">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-800 dark:text-slate-200">Message</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setField("message", e.target.value)}
                    onBlur={() => setTouched((s) => ({ ...s, message: true }))}
                    placeholder="How can we help?"
                    rows={6}
                    className={[
                      "mt-2 w-full resize-none rounded-2xl border bg-white dark:bg-slate-700 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none transition",
                      touched.message && errors.message
                        ? "border-red-300 dark:border-red-600 ring-2 ring-red-200 dark:ring-red-500/50"
                        : "border-gray-200 dark:border-slate-600 focus:border-blue-900/40 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-900/15 dark:focus:ring-blue-500/30",
                    ].join(" ")}
                  />
                  {touched.message && errors.message && (
                    <p className="mt-2 text-xs font-medium text-red-600 dark:text-red-400">{errors.message}</p>
                  )}
                </div>

                {status.error && (
                  <div className="rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm text-red-700 dark:text-red-400">
                    {status.error}
                  </div>
                )}
                {status.success && (
                  <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-900/20 px-4 py-3 text-sm text-emerald-800 dark:text-emerald-400">
                    {status.success}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className={[
                    "mt-2 inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-white shadow-soft transition focus:outline-none focus:ring-2",
                    canSubmit
                      ? "bg-emerald-500 hover:bg-emerald-400 focus:ring-emerald-300/60 dark:hover:bg-emerald-600 dark:focus:ring-emerald-500/50"
                      : "cursor-not-allowed bg-gray-300 dark:bg-slate-600 text-gray-600 dark:text-slate-300",
                  ].join(" ")}
                >
                  {status.loading ? "Sending..." : "Send message"}
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>

          {/* Contact details + Map placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.4, delay: 0.04 }}
            className="lg:col-span-2"
          >
            <div className="rounded-3xl bg-white dark:bg-slate-800 p-6 shadow-soft ring-1 ring-black/5 dark:ring-slate-700 md:p-8">
              <p className="text-sm font-semibold text-blue-900 dark:text-blue-300">Reach us</p>
              <div className="mt-5 grid gap-3 text-sm text-gray-700 dark:text-slate-300">
                <div className="flex items-start gap-3 rounded-2xl bg-blue-50 dark:bg-slate-700/50 px-4 py-4">
                  <MapPin className="mt-0.5 h-5 w-5 text-blue-900 dark:text-blue-400" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Location</p>
                    <p className="mt-1 text-gray-600 dark:text-slate-300">Recovery Avenue, Wellness District</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-2xl bg-emerald-50 dark:bg-slate-700/50 px-4 py-4">
                  <Phone className="mt-0.5 h-5 w-5 text-emerald-700 dark:text-emerald-400" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Phone</p>
                    <p className="mt-1 text-gray-600 dark:text-slate-300">+91 00000 00000</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-2xl bg-amber-50 dark:bg-slate-700/50 px-4 py-4">
                  <Mail className="mt-0.5 h-5 w-5 text-amber-700 dark:text-amber-400" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Email</p>
                    <p className="mt-1 text-gray-600 dark:text-slate-300">ParivartanpathFoundation24@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-3xl ring-1 ring-black/5 dark:ring-slate-600">
                <div className="grid h-56 place-items-center bg-gradient-to-br from-blue-900/10 dark:from-slate-700 via-white dark:via-slate-800 to-emerald-500/10 dark:to-slate-700">
                  <p className="px-6 text-center text-sm text-gray-700 dark:text-slate-300">
                    Google Maps embed will go here in a later phase.
                    <span className="block text-xs text-gray-500">
                      (We’ll add the iframe + location pin once you provide the address.)
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

