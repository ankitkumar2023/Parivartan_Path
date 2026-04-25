import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { clearAuthError, registerUser } from "../redux/authSlice.js";

const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
  { value: "prefer_not_to_say", label: "Prefer not to say" },
];

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, error } = useSelector((s) => s.auth);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("prefer_not_to_say");
  const [familyMemberName, setFamilyMemberName] = useState("");
  const [familyMemberNumber, setFamilyMemberNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordMismatch = useMemo(() => {
    if (!password || !confirmPassword) return false;
    return password !== confirmPassword;
  }, [confirmPassword, password]);

  useEffect(() => {
    dispatch(clearAuthError());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard", { replace: true });
  }, [isAuthenticated, navigate]);

  async function onSubmit(e) {
    e.preventDefault();
    if (passwordMismatch) return;

    await dispatch(
      registerUser({
        name,
        address,
        email,
        password,
        phone,
        gender,
        familyMemberName,
        familyMemberNumber,
      })
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mx-auto max-w-2xl overflow-hidden rounded-3xl bg-white dark:bg-slate-800 shadow-soft ring-1 ring-black/5 dark:ring-slate-700">
        <div className="bg-gradient-to-r from-blue-950 to-blue-900 dark:from-slate-900 dark:to-slate-800 px-6 py-6 text-white">
          <h1 className="text-xl font-semibold">Create account</h1>
          <p className="mt-1 text-sm text-white/80">
            Fill in your details. Your password is stored securely (hashed) in the database.
          </p>
        </div>

        <form onSubmit={onSubmit} className="px-6 py-6">
          {error && (
            <div className="mb-4 rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm text-red-700 dark:text-red-400">
              {error}
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Full name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-slate-900 dark:text-white outline-none focus:border-emerald-400 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-500/50"
              />
            </label>

            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Phone number
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-slate-900 dark:text-white outline-none focus:border-emerald-400 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-500/50"
              />
            </label>

            <label className="sm:col-span-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Address
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                rows={3}
                className="mt-1 w-full resize-none rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-slate-900 dark:text-white outline-none focus:border-emerald-400 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-500/50"
              />
            </label>

            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Email
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                autoComplete="email"
                required
                className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-slate-900 dark:text-white outline-none focus:border-emerald-400 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-500/50"
              />
            </label>

            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Gender
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
                className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-slate-900 dark:text-white outline-none focus:border-emerald-400 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-500/50"
              >
                {GENDER_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Family member name
              <input
                value={familyMemberName}
                onChange={(e) => setFamilyMemberName(e.target.value)}
                required
                className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-slate-900 dark:text-white outline-none focus:border-emerald-400 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-500/50"
              />
            </label>

            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Family member number
              <input
                value={familyMemberNumber}
                onChange={(e) => setFamilyMemberNumber(e.target.value)}
                required
                className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-slate-900 dark:text-white outline-none focus:border-emerald-400 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-500/50"
              />
            </label>

            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Password
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-slate-900 dark:text-white outline-none focus:border-emerald-400 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-500/50"
              />
              <span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">Minimum 8 characters.</span>
            </label>

            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Confirm password
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-slate-900 dark:text-white outline-none focus:border-emerald-400 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-500/50"
              />
              {passwordMismatch && <span className="mt-1 block text-xs text-red-600 dark:text-red-400">Passwords do not match.</span>}
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading || passwordMismatch}
            className="mt-6 w-full rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? "Creating account…" : "Create account"}
          </button>

          <p className="mt-4 text-center text-sm text-slate-600 dark:text-slate-400">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-emerald-700 dark:text-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

