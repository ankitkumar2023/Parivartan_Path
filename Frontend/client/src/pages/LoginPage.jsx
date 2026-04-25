import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { clearAuthError, loginUser } from "../redux/authSlice.js";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, isLoading, error } = useSelector((s) => s.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const from = location.state?.from || "/dashboard";

  useEffect(() => {
    dispatch(clearAuthError());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true });
  }, [from, isAuthenticated, navigate]);

  async function onSubmit(e) {
    e.preventDefault();
    await dispatch(loginUser({ email, password }));
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mx-auto max-w-md overflow-hidden rounded-3xl bg-white dark:bg-slate-800 shadow-soft ring-1 ring-black/5 dark:ring-slate-700">
        <div className="bg-gradient-to-r from-blue-950 to-blue-900 dark:from-slate-900 dark:to-slate-800 px-6 py-6 text-white">
          <h1 className="text-xl font-semibold">Login</h1>
          <p className="mt-1 text-sm text-white/80">Welcome back. Please sign in to continue.</p>
        </div>

        <form onSubmit={onSubmit} className="px-6 py-6">
          {error && (
            <div className="mb-4 rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm text-red-700 dark:text-red-400">
              {error}
            </div>
          )}

          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Email
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              autoComplete="email"
              required
              className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-slate-900 dark:text-white outline-none ring-0 focus:border-emerald-400 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-500/50"
            />
          </label>

          <label className="mt-4 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Password
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="current-password"
              required
              className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-slate-900 dark:text-white outline-none ring-0 focus:border-emerald-400 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-500/50"
            />
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-6 w-full rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? "Signing in…" : "Sign in"}
          </button>

          <p className="mt-4 text-center text-sm text-slate-600 dark:text-slate-400">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="font-semibold text-emerald-700 dark:text-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400">
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

