import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Users, Calendar, Briefcase, Activity } from "lucide-react";

/**
 * Admin Dashboard Component
 * Displays admin-specific metrics and activity
 * Only accessible to users with role === "admin"
 */
export default function AdminDashboard() {
  const { user } = useSelector((s) => s.auth);
  const name = user?.name || "Admin";

  const [showActivityLog, setShowActivityLog] = useState(true);

  // Mock data for admin metrics
  // In production, this would come from API calls
  const [metrics] = useState({
    totalUsers: 156,
    totalAppointments: 342,
    activePrograms: 28,
    completedPrograms: 89,
  });

  // Mock recent activity log
  const activityLog = [
    {
      id: 1,
      action: "New user registration",
      user: "Rajesh Kumar",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      type: "user-registration",
    },
    {
      id: 2,
      action: "Appointment booked",
      user: "Priya Sharma",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      type: "appointment",
    },
    {
      id: 3,
      action: "Program completed",
      user: "Arjun Singh",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      type: "program-completed",
    },
    {
      id: 4,
      action: "User profile updated",
      user: "Deepika Gupta",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      type: "profile-update",
    },
    {
      id: 5,
      action: "Support message received",
      user: "Contact Form",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      type: "support-message",
    },
  ];

  // Mock recent user list
  const recentUsers = [
    { id: 1, name: "Rajesh Kumar", email: "rajesh@example.com", joinDate: "2 hours ago" },
    { id: 2, name: "Priya Sharma", email: "priya@example.com", joinDate: "5 hours ago" },
    { id: 3, name: "Arjun Singh", email: "arjun@example.com", joinDate: "1 day ago" },
    { id: 4, name: "Deepika Gupta", email: "deepika@example.com", joinDate: "2 days ago" },
  ];

  // Format timestamp for display
  const formatTime = (date) => {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  // Get activity type badge color
  const getActivityBadgeColor = (type) => {
    switch (type) {
      case "user-registration":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300";
      case "appointment":
        return "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300";
      case "program-completed":
        return "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300";
      case "profile-update":
        return "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300";
      case "support-message":
        return "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300";
      default:
        return "bg-gray-100 dark:bg-slate-700/50 text-gray-700 dark:text-slate-300";
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Welcome back, <span className="font-semibold">{name.split(" ")[0]}</span>. Here's your platform overview.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {/* Total Users */}
        <div className="rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-md border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Total Users</p>
              <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{metrics.totalUsers}</p>
              <p className="mt-2 text-xs text-emerald-600 dark:text-emerald-400">↑ 12 new this month</p>
            </div>
            <div className="rounded-xl bg-blue-100 dark:bg-blue-900/30 p-3">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        {/* Total Appointments */}
        <div className="rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-md border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Total Appointments</p>
              <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{metrics.totalAppointments}</p>
              <p className="mt-2 text-xs text-emerald-600 dark:text-emerald-400">↑ 28 this month</p>
            </div>
            <div className="rounded-xl bg-emerald-100 dark:bg-emerald-900/30 p-3">
              <Calendar className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
        </div>

        {/* Active Programs */}
        <div className="rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-md border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Active Programs</p>
              <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{metrics.activePrograms}</p>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Enrollment ongoing</p>
            </div>
            <div className="rounded-xl bg-amber-100 dark:bg-amber-900/30 p-3">
              <Briefcase className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
        </div>

        {/* Completed Programs */}
        <div className="rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-md border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Completed Programs</p>
              <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{metrics.completedPrograms}</p>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Lifetime</p>
            </div>
            <div className="rounded-xl bg-purple-100 dark:bg-purple-900/30 p-3">
              <Activity className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Activity Log */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-md border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recent Activity</h2>
              <button
                onClick={() => setShowActivityLog((v) => !v)}
                className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
              >
                {showActivityLog ? "Collapse" : "Expand"}
              </button>
            </div>

            {showActivityLog && (
              <div className="space-y-4">
                {activityLog.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-600"
                  >
                    {/* Activity Type Icon */}
                    <div className={`mt-1 px-3 py-1 rounded-lg text-xs font-semibold ${getActivityBadgeColor(item.type)}`}>
                      {item.type === "user-registration" && "User"}
                      {item.type === "appointment" && "Appt"}
                      {item.type === "program-completed" && "Done"}
                      {item.type === "profile-update" && "Update"}
                      {item.type === "support-message" && "Help"}
                    </div>

                    {/* Activity Details */}
                    <div className="flex-grow">
                      <p className="font-medium text-slate-900 dark:text-white">{item.action}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {item.user} • {formatTime(item.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!showActivityLog && (
              <p className="text-center py-8 text-slate-500 dark:text-slate-400">Activity log collapsed</p>
            )}
          </div>
        </div>

        {/* Recent Users Sidebar */}
        <div className="rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-md border border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Recent Users</h2>
          <div className="space-y-4">
            {recentUsers.map((u) => (
              <div
                key={u.id}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700/60 transition"
              >
                <p className="font-medium text-slate-900 dark:text-white text-sm">{u.name}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{u.email}</p>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">{u.joinDate}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-blue-50 dark:from-blue-900/20 to-slate-50 dark:to-slate-800/20 border border-blue-200 dark:border-blue-800/50">
        <h3 className="font-bold text-slate-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition">
            Manage Users
          </button>
          <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition">
            View Reports
          </button>
          <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition">
            Settings
          </button>
          <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition">
            Support
          </button>
        </div>
      </div>
    </div>
  );
}
