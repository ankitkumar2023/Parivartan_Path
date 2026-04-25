import React, { useMemo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

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

export default function Dashboard() {
  const { user, token } = useSelector((s) => s.auth);
  const navigate = useNavigate();
  const name = user?.name || "User";

  const initials = useMemo(() => initialsFromName(name), [name]);

  const [programs, setPrograms] = useState(1);
  const [showActivity, setShowActivity] = useState(true);
  const [upcomingAppointments, setUpcomingAppointments] = useState(0);
  const [appointmentsLoading, setAppointmentsLoading] = useState(false);

  // Fetch appointments from backend API
  useEffect(() => {
    const fetchAppointments = async () => {
      if (!token) return;
      
      setAppointmentsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/appointments/my`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }

        const data = await response.json();
        const appointments = data.appointments || [];
        
        // Count upcoming appointments (status = "Pending" or "Confirmed")
        const upcomingCount = appointments.filter(
          (apt) => apt.status === "Pending" || apt.status === "Confirmed"
        ).length;
        
        setUpcomingAppointments(upcomingCount);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setUpcomingAppointments(0);
      } finally {
        setAppointmentsLoading(false);
      }
    };

    fetchAppointments();
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

  // Sample past plans
  const pastPlans = [
    { name: "Intro Week", from: "2024-12-01", to: "2024-12-07" },
    { name: "Recovery Program", from: "2025-01-10", to: "2025-03-10" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Gradient Header */}
          <div className="rounded-2xl overflow-hidden bg-gradient-to-r from-emerald-500/80 via-amber-400/70 to-indigo-500/70 dark:from-emerald-600/60 dark:via-amber-500/50 dark:to-indigo-600/60 p-6 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-2xl font-bold text-white">
                  {initials}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Welcome back, {name.split(" ")[0]}</h2>
                  <p className="mt-1 text-sm text-white/90">
                    {subscription.planName} • <span className="inline-block h-2 w-2 rounded-full bg-green-300 align-middle mr-1" />
                    Status: {subscription.status}
                  </p>
                </div>
              </div>

              <div>
                <button
                  onClick={() => setShowActivity((v) => !v)}
                  className="rounded-xl bg-white/15 px-4 py-2 text-sm font-medium text-white hover:bg-white/25 transition"
                >
                  {showActivity ? "Hide Activity" : "Show Activity"}
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-white/95">Plan Duration Progress</span>
                <span className="text-sm font-bold text-white">{elapsed}% Complete</span>
              </div>
              <div className="h-4 w-full rounded-full bg-white/20 overflow-hidden">
                <div
                  className="h-4 rounded-full bg-gradient-to-r from-emerald-300 to-amber-300 transition-all duration-300"
                  style={{ width: `${elapsed}%` }}
                />
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-white/80">
                <span>{subscription.start.toLocaleDateString()}</span>
                <span>{Math.ceil((subscription.end.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days remaining</span>
                <span>{subscription.end.toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-white dark:bg-slate-800 p-5 shadow-md border border-slate-200 dark:border-slate-700">
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Upcoming Appointments</p>
              <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">{upcomingAppointments}</p>
              {/* This data is read-only and comes from the backend/API */}
              <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                Appointments are managed through the booking system
              </p>
            </div>

            <div className="rounded-xl bg-white dark:bg-slate-800 p-5 shadow-md border border-slate-200 dark:border-slate-700">
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Active Programs</p>
              <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">{programs}</p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => navigate("/services")}
                  className="flex-1 rounded-md bg-amber-500 px-3 py-2 text-xs font-semibold text-white hover:bg-amber-600 transition"
                >
                  + Enroll
                </button>
              </div>
            </div>

            <div className="rounded-xl bg-white dark:bg-slate-800 p-5 shadow-md border border-slate-200 dark:border-slate-700">
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Quick Actions</p>
              <div className="mt-4 flex flex-col gap-2">
                <button
                  onClick={() => navigate("/book-appointment")}
                  className="rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-600 transition"
                >
                  Book Appointment
                </button>
                <button
                  onClick={() => navigate("/book-appointment")}
                  className="rounded-md bg-slate-200 dark:bg-slate-700 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600 transition"
                >
                  View Records
                </button>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          {showActivity && (
            <div className="rounded-xl bg-white dark:bg-slate-800 p-5 shadow-md border border-slate-200 dark:border-slate-700">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Recent Activity</h4>
              <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-500 flex-shrink-0" />
                  You updated your profile
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-amber-500 flex-shrink-0" />
                  You enrolled in "Wellness Intro"
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-blue-500 flex-shrink-0" />
                  No upcoming lab tests
                </li>
              </ul>
            </div>
          )}

          {/* Subscription History */}
          <div className="rounded-xl bg-white dark:bg-slate-800 p-5 shadow-md border border-slate-200 dark:border-slate-700">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Subscription History</h4>
            <ol className="mt-4 space-y-3">
              {pastPlans.map((p) => (
                <li key={p.name} className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-500 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">{p.name}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {p.from} → {p.to}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="rounded-xl bg-white dark:bg-slate-800 p-6 shadow-md border border-slate-200 dark:border-slate-700 h-fit">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Company Helpline</h3>
          <div className="mt-3 space-y-2">
            <a
              href="tel:9113193968"
              className="block text-sm text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              9113193968
            </a>
            <a
              href="tel:6204899258"
              className="block text-sm text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              6204899258
            </a>
          </div>

          <h3 className="mt-6 text-sm font-bold text-slate-900 dark:text-white">Address</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Sant nagar Jhiri, P.S - Ratu, PO - Kamre, Ranchi, Jharkhand - 835222
          </p>

          <div className="mt-6">
            <button className="w-full rounded-lg bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:bg-emerald-600 transition">
              Contact Support
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
