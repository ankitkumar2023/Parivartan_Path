import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Activity,
  Brain,
  ClipboardCheck,
  HeartPulse,
  Leaf,
  ShieldCheck,
  Users,
  ArrowRight,
} from "lucide-react";

const programs = [
  {
    icon: HeartPulse,
    title: "Medically Supported Detox",
    desc: "Careful monitoring and symptom management with safety-first protocols and compassionate support.",
    tag: "Primary care",
  },
  {
    icon: Brain,
    title: "Therapy & Counseling",
    desc: "Evidence-based therapy including CBT, motivational interviewing, and trauma-informed counseling.",
    tag: "Mental wellness",
  },
  {
    icon: Users,
    title: "Family & Caregiver Support",
    desc: "Education, counseling sessions, and practical tools to rebuild trust and communication.",
    tag: "Family-first",
  },
  {
    icon: ClipboardCheck,
    title: "Structured Rehab Programs",
    desc: "Daily routines, group sessions, and personalized goals that help patients build stability.",
    tag: "Structure",
  },
  {
    icon: ShieldCheck,
    title: "Relapse Prevention",
    desc: "Triggers, coping skills, and practical plans that prepare patients for life outside the center.",
    tag: "Long-term",
  },
  {
    icon: Leaf,
    title: "Holistic Recovery",
    desc: "Mindfulness, movement, nutrition guidance, and sleep routines that support overall wellbeing.",
    tag: "Whole-body",
  },
  {
    icon: Activity,
    title: "Aftercare & Follow-ups",
    desc: "Ongoing check-ins and support plans that help maintain progress and reduce relapse risk.",
    tag: "Aftercare",
  },
];

function ProgramCard({ icon: Icon, title, desc, tag }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((s) => s.auth);

  const handleBooking = () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      navigate("/book-service");
    }
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="group relative overflow-hidden rounded-3xl bg-white dark:bg-slate-800 p-6 shadow-soft ring-1 ring-black/5 dark:ring-slate-700 flex flex-col"
    >
      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-emerald-500/10 blur-3xl transition group-hover:bg-emerald-500/20" />
      <div className="flex items-start justify-between gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-900/10 dark:bg-blue-400/10 ring-1 ring-blue-900/15 dark:ring-blue-400/20">
          <Icon className="h-6 w-6 text-blue-900 dark:text-blue-400" />
        </span>
        <span className="rounded-full bg-amber-500/10 dark:bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-700 dark:text-amber-400 ring-1 ring-amber-500/20 dark:ring-amber-400/20">
          {tag}
        </span>
      </div>
      <p className="mt-5 text-base font-semibold text-gray-900 dark:text-white">{title}</p>
      <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400 flex-grow">{desc}</p>
      <div className="mt-5 h-px w-full bg-gradient-to-r from-blue-900/0 via-blue-900/15 dark:via-blue-400/15 to-blue-900/0" />
      <p className="mt-4 text-xs font-semibold text-blue-900/80 dark:text-blue-300/80 mb-4">
        Personalized plans • Confidential support • Compassionate care
      </p>
      <button
        onClick={handleBooking}
        className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition-all group/btn"
      >
        Book Now
        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
      </button>
    </motion.div>
  );
}

export default function ServicesPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((s) => s.auth);

  const handleBookAppointment = () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      navigate("/book-appointment");
    }
  };

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      <Helmet>
        <title>Services | Parivartan Path</title>
        <meta
          name="description"
          content="Explore Parivartan Path programs including detox support, therapy, structured rehab, family counseling, relapse prevention, and aftercare."
        />
      </Helmet>

      <section className="bg-blue-950 dark:bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="max-w-2xl"
          >
            <p className="text-sm font-semibold text-amber-300">Programs & Services</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-white md:text-5xl">
              Clinical care with a calm, modern approach.
            </h1>
            <p className="mt-4 text-sm leading-7 text-white/80">
              Every patient is different. We design treatment plans that combine safety, structure, and emotional
              support—helping patients rebuild routines and confidence.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.4 }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {programs.map((p) => (
            <ProgramCard key={p.title} {...p} />
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 p-12 text-center shadow-2xl"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-y-3"></div>
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your Recovery Journey?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Take the first step towards healing. Our compassionate team is here to support you every step of the way.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={handleBookAppointment}
                className="px-8 py-3 rounded-xl bg-white text-emerald-600 font-semibold hover:bg-gray-100 transition-all"
              >
                Book an Appointment
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="px-8 py-3 rounded-xl border-2 border-white text-white font-semibold hover:bg-white/10 transition-all"
              >
                Contact Us
              </button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

