import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ShieldAlert } from "lucide-react";

import { clearAuthError, loginUser } from "../redux/authSlice.js";

/**
 * AdminLogin Page
 * Allows admins to login with their credentials
 * After successful login, redirects to /admin-dashboard
 * 
 * Testing admin credentials (mock):
 * Email: admin@parivartan.com
 * Password: Admin@123
 */
export default function AdminLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, isLoading, error, user } = useSelector((s) => s.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showMockCredentials, setShowMockCredentials] = useState(false);

  const from = location.state?.from || "/admin-dashboard";

  useEffect(() => {
    dispatch(clearAuthError());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If user is authenticated and is admin, redirect to admin dashboard
  useEffect(() => {
    if (isAuthenticated && user?.role === "admin") {
      navigate(from, { replace: true });
    } else if (isAuthenticated && user?.role === "user") {
      // If normal user tries to access admin login, redirect to user dashboard
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, user, navigate, from]);

  async function onSubmit(e) {
    e.preventDefault();
    await dispatch(loginUser({ email, password }));
  }

  // Fill in test credentials for demo
  const fillTestCredentials = () => {
    setEmail("admin@parivartan.com");
    setPassword("Admin@123");
    setShowMockCredentials(false);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mx-auto max-w-md overflow-hidden rounded-3xl bg-white dark:bg-slate-800 shadow-soft ring-1 ring-black/5 dark:ring-slate-700">
        {/* Header with admin badge */}
        <div className="bg-gradient-to-r from-blue-950 to-blue-900 dark:from-slate-900 dark:to-slate-800 px-6 py-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlert className="h-5 w-5 text-amber-300" />
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">Admin Portal</span>
          </div>
          <h1 className="text-xl font-semibold">Admin Login</h1>
          <p className="mt-1 text-sm text-white/80">Secure access for administrators only</p>
        </div>

        <form onSubmit={onSubmit} className="px-6 py-6">
          {/* Error Message */}
          {error && (
            <div className="mb-4 rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm text-red-700 dark:text-red-400">
              {error}
            </div>
          )}

          {/* Email Field */}
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Admin Email
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              autoComplete="email"
              required
              placeholder="admin@example.com"
              className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-slate-900 dark:text-white outline-none ring-0 focus:border-emerald-400 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-500/50"
            />
          </label>

          {/* Password Field */}
          <label className="mt-4 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Password
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="current-password"
              required
              placeholder="••••••••"
              className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-slate-900 dark:text-white outline-none ring-0 focus:border-emerald-400 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-500/50"
            />
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-6 w-full rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70 dark:hover:bg-emerald-600"
          >
            {isLoading ? "Signing in…" : "Sign In as Admin"}
          </button>

          {/* Divider */}
          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400">Development</span>
            </div>
          </div>

          {/* Test Credentials Info */}
          <button
            type="button"
            onClick={() => setShowMockCredentials(!showMockCredentials)}
            className="mt-4 w-full rounded-xl border border-slate-300 dark:border-slate-600 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition"
          >
            {showMockCredentials ? "Hide Test Credentials" : "View Test Credentials"}
          </button>

          {showMockCredentials && (
            <div className="mt-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4">
              <p className="text-xs font-semibold text-amber-900 dark:text-amber-300 mb-3">
                💡 Test Admin Credentials (Development Only)
              </p>
              <div className="space-y-2 text-xs text-amber-800 dark:text-amber-200">
                <div>
                  <span className="font-semibold">Email:</span>
                  <code className="ml-2 bg-amber-100 dark:bg-amber-900/50 px-2 py-1 rounded">admin@parivartan.com</code>
                </div>
                <div>
                  <span className="font-semibold">Password:</span>
                  <code className="ml-2 bg-amber-100 dark:bg-amber-900/50 px-2 py-1 rounded">Admin@123</code>
                </div>
              </div>
              <button
                type="button"
                onClick={fillTestCredentials}
                className="mt-3 w-full rounded-lg bg-amber-500 text-white text-xs font-semibold py-2 hover:bg-amber-600 transition"
              >
                Auto-fill Test Credentials
              </button>
            </div>
          )}

          {/* Back to Regular Login */}
          <p className="mt-4 text-center text-sm text-slate-600 dark:text-slate-400">
            Not an admin?{" "}
            <Link to="/login" className="font-semibold text-emerald-700 dark:text-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400">
              Regular Login
            </Link>
          </p>
        </form>

        {/* Footer Info */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-700/40 border-t border-slate-200 dark:border-slate-600">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            ⚠️ This portal is for authorized administrators only. All activities are logged and monitored.
          </p>
        </div>
      </div>
    </div>
  );
}
