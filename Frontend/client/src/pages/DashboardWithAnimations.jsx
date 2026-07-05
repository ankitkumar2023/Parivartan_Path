import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Import animation components
import AnimatedButton from "../components/AnimatedButton";
import AnimatedCard from "../components/AnimatedCard";
import SkeletonCard from "../components/SkeletonCard";
import AnimatedContainer from "../components/AnimatedContainer";
import LoadingSpinner from "../components/LoadingSpinner";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function initialsFromName(name) {
  if (!name) return "U";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) {
    return (parts[0][0] || "U").toUpperCase() + (parts[0][1] || "").toUpperCase();
  }
  const first = parts[0][0] || "U";
  const last = parts[parts.length - 1][0] || "";
  return (first + last).toUpperCase();
}

function percentElapsed(start, end) {
  const now = Date.now();
  const s = start.getTime();
  const e = end.getTime();
  if (now <= s) return 0;
  if (now >= e) return 100;
  return Math.round(((now - s) / (e - s)) * 100);
}

/**
 * Enhanced Dashboard with Professional Animations
 *
 * Features:
 * - Skeleton loaders during data fetching
 * - Staggered card animations on page load
 * - Hover effects on buttons and cards
 * - Smooth transitions between states
 * - Full dark mode support
 */
export default function DashboardWithAnimations() {
  const { user, token } = useSelector((s) => s.auth);
  const navigate = useNavigate();
  const name = user?.name || "User";

  const initials = useMemo(() => initialsFromName(name), [name]);

  // State management
  const [programs, setPrograms] = useState(1);
  const [showActivity, setShowActivity] = useState(true);
  const [upcomingAppointments, setUpcomingAppointments] = useState(0);
  const [appointmentsLoading, setAppointmentsLoading] = useState(true);
  const [isLoadingSpinner, setIsLoadingSpinner] = useState(false);

  // Simulate data fetching with animations
  React.useEffect(() => {
    const fetchAppointments = async () => {
      setAppointmentsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setUpcomingAppointments(3);
      setAppointmentsLoading(false);
    };

    if (token) {
      fetchAppointments();
    }
  }, [token]);

  // Sample subscription data
  const [subscription] = useState(() => {
    const start = new Date();
    const end = new Date();
    start.setDate(start.getDate() - 10);
    end.setDate(start.getDate() + 30);
    return {
      planName: "Wellness 30-day",
      start,
      end,
      status: "active",
    };
  });

  const elapsed = percentElapsed(subscription.start, subscription.end);

  // Stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.21, 0.61, 0.35, 1] },
    },
  };

  const handleEnrollClick = () => {
    setIsLoadingSpinner(true);
    setTimeout(() => {
      setIsLoadingSpinner(false);
      navigate("/services");
    }, 1500);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* Loading Spinner Overlay */}
      <LoadingSpinner isLoading={isLoadingSpinner} text="Redirecting..." />

      {/* Animated Container for main content */}
      <motion.div
        className="grid gap-6 md:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Main Content Section */}
        <motion.div className="md:col-span-2 space-y-6" variants={itemVariants}>
          {/* 🎨 Animated Header Card with Gradient */}
          <motion.div
            className="rounded-2xl overflow-hidden bg-gradient-to-r from-emerald-500/80 via-amber-400/70 to-indigo-500/70 dark:from-emerald-600/60 dark:via-amber-500/50 dark:to-indigo-600/60 p-6 text-white shadow-xl"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Animated Avatar with pulse effect */}
                <motion.div
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-2xl font-bold text-white"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {initials}
                </motion.div>
                <div>
                  <motion.h2
                    className="text-2xl font-bold text-white"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Welcome back, {name.split(" ")[0]}
                  </motion.h2>
                  <motion.p
                    className="mt-1 text-sm text-white/90"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {subscription.planName} •
                    <span className="inline-block h-2 w-2 rounded-full bg-green-300 align-middle mr-1 ml-1 animate-pulse" />
                    Status: {subscription.status}
                  </motion.p>
                </div>
              </div>

              {/* Animated Toggle Button */}
              <motion.button
                onClick={() => setShowActivity((v) => !v)}
                className="rounded-xl bg-white/15 px-4 py-2 text-sm font-medium text-white hover:bg-white/25 transition backdrop-blur"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {showActivity ? "Hide Activity" : "Show Activity"}
              </motion.button>
            </div>

            {/* Animated Progress Bar */}
            <motion.div className="mt-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-white/95">Plan Duration Progress</span>
                <motion.span
                  className="text-sm font-bold text-white"
                  key={elapsed}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                >
                  {elapsed}% Complete
                </motion.span>
              </div>
              <div className="h-4 w-full rounded-full bg-white/20 overflow-hidden">
                <motion.div
                  className="h-4 rounded-full bg-gradient-to-r from-emerald-300 to-amber-300"
                  initial={{ width: 0 }}
                  animate={{ width: `${elapsed}%` }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-white/80">
                <span>{subscription.start.toLocaleDateString()}</span>
                <span>{Math.ceil((subscription.end.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days remaining</span>
                <span>{subscription.end.toLocaleDateString()}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* 🎯 Stats Cards with Skeleton Loading */}
          <motion.div className="grid gap-4 sm:grid-cols-3" variants={itemVariants}>
            {appointmentsLoading ? (
              <>
                <SkeletonCard lines={2} imageHeight="h-24" />
                <SkeletonCard lines={2} imageHeight="h-24" />
                <SkeletonCard lines={2} imageHeight="h-24" />
              </>
            ) : (
              <>
                {/* Appointments Card */}
                <AnimatedCard variant="default" staggerIndex={0} hover={true}>
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                    Upcoming Appointments
                  </p>
                  <motion.p
                    className="mt-3 text-3xl font-bold text-slate-900 dark:text-white"
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                  >
                    {upcomingAppointments}
                  </motion.p>
                  <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                    Appointments managed through booking system
                  </p>
                </AnimatedCard>

                {/* Programs Card */}
                <AnimatedCard variant="default" staggerIndex={1} hover={true}>
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Active Programs</p>
                  <motion.p
                    className="mt-3 text-3xl font-bold text-slate-900 dark:text-white"
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
                  >
                    {programs}
                  </motion.p>
                  <div className="mt-4">
                    <AnimatedButton
                      variant="primary"
                      size="sm"
                      className="w-full"
                      onClick={handleEnrollClick}
                    >
                      + Enroll
                    </AnimatedButton>
                  </div>
                </AnimatedCard>

                {/* Quick Actions Card */}
                <AnimatedCard variant="default" staggerIndex={2} hover={true}>
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Quick Actions</p>
                  <div className="mt-4 flex flex-col gap-2">
                    <AnimatedButton
                      variant="success"
                      size="sm"
                      onClick={() => navigate("/book-appointment")}
                    >
                      Book Appointment
                    </AnimatedButton>
                    <AnimatedButton
                      variant="secondary"
                      size="sm"
                      onClick={() => navigate("/dashboard")}
                    >
                      View Records
                    </AnimatedButton>
                  </div>
                </AnimatedCard>
              </>
            )}
          </motion.div>

          {/* 📊 Recent Activity with Stagger Animation */}
          {showActivity && (
            <AnimatedCard variant="elevated" staggerIndex={3}>
              <motion.div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Recent Activity</h4>
                <motion.ul
                  className="mt-4 space-y-3"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                >
                  <motion.li
                    className="text-sm text-slate-600 dark:text-slate-300 flex items-center gap-2"
                    variants={itemVariants}
                  >
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    Appointment booked for wellness check
                  </motion.li>
                  <motion.li
                    className="text-sm text-slate-600 dark:text-slate-300 flex items-center gap-2"
                    variants={itemVariants}
                  >
                    <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                    Completed 5-day meditation program
                  </motion.li>
                  <motion.li
                    className="text-sm text-slate-600 dark:text-slate-300 flex items-center gap-2"
                    variants={itemVariants}
                  >
                    <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                    Enrolled in yoga class
                  </motion.li>
                </motion.ul>
              </motion.div>
            </AnimatedCard>
          )}
        </motion.div>

        {/* Sidebar */}
        <motion.div className="space-y-6" variants={itemVariants}>
          {/* Wellness Tips Card */}
          <AnimatedCard variant="glass" hover={true}>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">💡 Wellness Tips</h4>
            <motion.ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <motion.li whileHover={{ x: 5 }} className="cursor-pointer">
                • Stay hydrated throughout the day
              </motion.li>
              <motion.li whileHover={{ x: 5 }} className="cursor-pointer">
                • Practice mindfulness for 10 mins
              </motion.li>
              <motion.li whileHover={{ x: 5 }} className="cursor-pointer">
                • Take short breaks every hour
              </motion.li>
            </motion.ul>
          </AnimatedCard>

          {/* Upcoming Sessions */}
          <AnimatedCard variant="default" hover={true}>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">📅 Upcoming Sessions</h4>
            <motion.ul className="space-y-3">
              {["Monday 10:00 AM", "Wednesday 2:00 PM", "Friday 4:00 PM"].map((session, idx) => (
                <motion.li
                  key={idx}
                  className="text-xs text-slate-600 dark:text-slate-300 rounded-lg bg-slate-50 dark:bg-slate-700 p-2"
                  whileHover={{ x: 3, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                >
                  {session}
                </motion.li>
              ))}
            </motion.ul>
          </AnimatedCard>
        </motion.div>
      </motion.div>
    </div>
  );
}
