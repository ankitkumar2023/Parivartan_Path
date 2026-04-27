import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { ArrowRight, HeartHandshake, ShieldPlus, Sparkles } from "lucide-react";

const testimonials = [
  {
    name: "Aarav S.",
    role: "Patient",
    quote:
      "The care here felt calm and professional. The plan was clear, the team listened, and I never felt judged.",
    outcome: "6 months sober • rebuilding routines",
  },
  {
    name: "Meera P.",
    role: "Family Member",
    quote:
      "They supported our whole family. Regular updates and compassionate counseling helped us heal together.",
    outcome: "Family counseling • better communication",
  },
  {
    name: "Rohit K.",
    role: "Patient",
    quote:
      "The program was structured and practical. Therapy sessions and follow-ups kept me accountable in the best way.",
    outcome: "Aftercare plan • relapse prevention",
  },
  {
    name: "Sana A.",
    role: "Patient",
    quote:
      "From day one I felt safe. The environment is peaceful, and the staff is genuinely committed to recovery.",
    outcome: "Mindfulness • stable progress",
  },
];

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/10 shadow-lg shadow-black/10 backdrop-blur">
      <p className="text-xs text-white/70">{label}</p>
      <p className="mt-0.5 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

function Feature({ icon: Icon, title, desc }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="group relative overflow-hidden rounded-3xl bg-white dark:bg-slate-800 p-6 shadow-lg shadow-black/5 ring-1 ring-black/5 dark:ring-slate-600/50"
    >
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-emerald-500/10 blur-2xl transition group-hover:bg-emerald-500/20" />
      <div className="flex items-start gap-4">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-900/10 dark:bg-blue-500/20 ring-1 ring-blue-900/15 dark:ring-blue-400/30">
          <Icon className="h-6 w-6 text-blue-900 dark:text-blue-400" />
        </span>
        <div>
          <p className="text-base font-semibold text-gray-900 dark:text-white">{title}</p>
          <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-slate-300">{desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function LandingPage() {
  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      <Helmet>
        <title>Parivartan Path | Drug Rehabilitation Center</title>
        <meta
          name="description"
          content="A modern, confidential drug rehabilitation center offering detox support, counseling, and long-term recovery programs for patients and families."
        />
        <meta name="theme-color" content="#1E3A8A" />
      </Helmet>

      {/* HERO */}
      <section className="relative overflow-hidden bg-blue-950">
        <div className="absolute inset-0">
          <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="absolute -right-24 top-12 h-80 w-80 rounded-full bg-amber-500/15 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.10),transparent_45%),radial-gradient(circle_at_70%_30%,rgba(16,185,129,0.12),transparent_55%)]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-14 md:pb-24 md:pt-20">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white ring-1 ring-white/15"
              >
                <Sparkles className="h-4 w-4 text-amber-300" />
                Calm, confidential, and clinically guided recovery
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.05 }}
                className="mt-5 text-4xl font-bold tracking-tight text-white md:text-6xl"
              >
                A safer path from{" "}
                <span className="text-amber-300">addiction</span> to{" "}
                <span className="text-emerald-300">recovery</span>.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.12 }}
                className="mt-4 max-w-xl text-base leading-7 text-white/80"
              >
                Parivartan Path provides structured programs, therapy, and
                aftercare support—helping patients and families regain stability
                with dignity-first care.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.18 }}
                className="mt-7 flex flex-col gap-3 sm:flex-row"
              >
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300/60"
                >
                  Start your journey
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center rounded-2xl bg-white/10 px-6 py-3.5 text-sm font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/15"
                >
                  Explore programs
                </Link>
              </motion.div>

              <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <Stat label="Care team" value="24/7 Support" />
                <Stat label="Privacy" value="Confidential" />
                <Stat label="Approach" value="Evidence-based" />
              </div>
            </div>

            {/* Right card */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="relative"
            >
              <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/15 shadow-lg shadow-black/20 backdrop-blur-xl">
                <div className="rounded-3xl bg-white dark:bg-slate-800 p-7 shadow-lg shadow-black/5 ring-1 ring-black/5 dark:ring-slate-600/50">
                  <p className="text-sm font-semibold text-blue-900 dark:text-blue-300">
                    Quick Intake
                  </p>
                  <p className="mt-1 text-sm text-gray-600 dark:text-slate-300">
                    Book an appointment in minutes. A specialist will follow up
                    discreetly.
                  </p>

                  <div className="mt-5 grid gap-3">
                    <div className="rounded-2xl bg-blue-50 dark:bg-slate-700/50 px-4 py-4 ring-1 ring-blue-900/5 dark:ring-blue-400/20">
                      <div className="flex items-start gap-3">
                        <HeartHandshake className="mt-0.5 h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            Family guidance
                          </p>
                          <p className="mt-1 text-xs text-gray-600 dark:text-slate-300">
                            Support tools for caregivers and loved ones.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-2xl bg-emerald-50 dark:bg-slate-700/50 px-4 py-4 ring-1 ring-emerald-600/10 dark:ring-emerald-400/20">
                      <div className="flex items-start gap-3">
                        <ShieldPlus className="mt-0.5 h-5 w-5 text-blue-900 dark:text-blue-400" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            Clinical structure
                          </p>
                          <p className="mt-1 text-xs text-gray-600 dark:text-slate-300">
                            Detox support, therapy, and aftercare planning.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 rounded-2xl bg-gray-900 px-4 py-4 shadow-lg shadow-black/20 ring-1 ring-white/10">
                    <p className="text-xs font-semibold text-white/70">
                      Need urgent help?
                    </p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      Call{" "}
                      <span className="text-amber-300">
                        +91 9113193968 |  +91 6204899258
                      </span>
                    </p>
                    <p className="mt-1 text-xs text-white/65">
                      If this is a medical emergency, contact local emergency
                      services immediately.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-emerald-500/15 blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
          className="max-w-2xl"
        >
          <p className="text-sm font-semibold text-blue-900 dark:text-blue-300">
            Programs built for real life
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Support that feels calm, structured, and human.
          </h2>
          <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-slate-300">
            We combine clinical care with practical routines—helping patients
            and families reduce chaos and regain stability.
          </p>
        </motion.div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Feature
            icon={ShieldPlus}
            title="Confidential intake"
            desc="Private consultations, clear next steps, and a treatment plan tailored to patient needs."
          />
          <Feature
            icon={HeartHandshake}
            title="Family support"
            desc="Education, counseling, and communication tools that reduce stress and improve outcomes."
          />
          <Feature
            icon={Sparkles}
            title="Aftercare planning"
            desc="Relapse prevention, follow-ups, and routine-building to keep momentum strong after discharge."
          />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-blue-50/60 dark:bg-slate-800/40 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45 }}
            className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <p className="text-sm font-semibold text-blue-900 dark:text-blue-300">
                Success stories
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                Recovery is possible.
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 dark:text-slate-300">
                Every journey is personal. Here are a few patient and family
                experiences shared with consent.
              </p>
            </div>
            <Link
              to="/contact"
              className="mt-3 inline-flex w-fit items-center justify-center rounded-2xl bg-blue-900 px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-blue-800"
            >
              Talk to us
            </Link>
          </motion.div>

          <div className="mt-8">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={16}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{ delay: 4200, disableOnInteraction: false }}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {testimonials.map((t) => (
                <SwiperSlide key={t.name}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.35 }}
                    className="h-full rounded-3xl bg-white dark:bg-slate-800 p-6 shadow-lg shadow-black/5 ring-1 ring-black/5 dark:ring-slate-600/50"
                  >
                    <p className="text-sm leading-6 text-gray-700 dark:text-slate-200">
                      "{t.quote}"
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {t.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-slate-400">
                          {t.role}
                        </p>
                      </div>
                      <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-500/15">
                        {t.outcome}
                      </span>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </div>
  );
}

