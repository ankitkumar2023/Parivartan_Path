import React, { useMemo, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Menu, X, ShieldCheck, UserRound } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { logout } from "../redux/authSlice.js";
import { useTheme } from "../context/ThemeContext.jsx";

function classNames(...xs) {
  return xs.filter(Boolean).join(" ");
}

function NavItem({ to, children, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        classNames(
          "rounded-xl px-3 py-2 text-sm font-medium transition",
          isActive
            ? "bg-white/15 text-white ring-1 ring-white/15 dark:bg-slate-600/50 dark:text-slate-100"
            : "text-white/80 hover:bg-white/10 hover:text-white dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-slate-100"
        )
      }
    >
      {children}
    </NavLink>
  );
}

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((s) => s.auth);
  const { isDark, toggleTheme } = useTheme();

  const [open, setOpen] = useState(false);

  const role = user?.role || "guest";

  const links = useMemo(() => {
    const base = [
      { to: "/", label: "Home" },
      { to: "/services", label: "Services" },
      { to: "/contact", label: "Contact" },
    ];

    if (!isAuthenticated) {
      return [
        ...base,
        { to: "/login", label: "Login" },
        { to: "/register", label: "Register" },
      ];
    }

    // Role-based dashboard link
    if (role === "admin") {
      return [...base, { to: "/admin-dashboard", label: "Admin Dashboard" }];
    }

    return [...base, { to: "/dashboard", label: "Dashboard" }];
  }, [isAuthenticated, role]);

  const close = () => setOpen(false);

  function handleLogout() {
    dispatch(logout());
    close();
    navigate("/");
  }

  return (
    <header className="sticky top-0 z-50">
      {/* Premium glass backdrop */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-950/95 via-blue-950/75 to-transparent dark:from-slate-900/95 dark:via-slate-800/75" />
      <div className="absolute inset-0 -z-10 backdrop-blur-xl" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-20 bg-[radial-gradient(circle_at_35%_0%,rgba(16,185,129,0.18),transparent_60%),radial-gradient(circle_at_75%_10%,rgba(245,158,11,0.14),transparent_55%)]" />

      <nav className="mx-auto max-w-6xl px-4 py-4">
        <div className="flex items-center justify-between rounded-2xl bg-white/10 dark:bg-slate-800/10 px-4 py-3 ring-1 ring-white/15 dark:ring-slate-400/15 shadow-lg shadow-black/20 backdrop-blur-xl">
          <Link to="/" className="flex items-center gap-3" onClick={close}>
            <img
              src="/Parivartan_path_logo.jpeg"
              alt="Parivartan Path Logo"
              className="h-10 w-10 rounded-xl object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div className="leading-tight">
              <p className="text-sm font-semibold tracking-wide text-white dark:text-slate-100">Parivartan Path</p>
              <p className="text-[11px] text-white/70 dark:text-slate-300/70">Recovery • Care • Compassion</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 md:flex">
            {links.slice(0, 3).map((l) => (
              <NavItem key={l.to} to={l.to}>
                {l.label}
              </NavItem>
            ))}
            
            {isAuthenticated && (
              <NavLink
                to="/book-appointment"
                onClick={close}
                className={({ isActive }) =>
                  classNames(
                    "rounded-xl px-3 py-2 text-sm font-medium transition",
                    isActive
                      ? "bg-emerald-500/20 text-emerald-100 ring-1 ring-emerald-400/30"
                      : "text-white/80 hover:bg-emerald-500/10 hover:text-emerald-100"
                  )
                }
              >
                📅 Book
              </NavLink>
            )}
            
            <div className="mx-1 h-6 w-px bg-white/15 dark:bg-slate-400/15" />

            {!isAuthenticated ? (
              <>
                {links.slice(3).map((l) => (
                  <NavItem key={l.to} to={l.to}>
                    {l.label}
                  </NavItem>
                ))}
                <NavLink
                  to="/admin-login"
                  onClick={close}
                  className={({ isActive }) =>
                    classNames(
                      "rounded-xl px-3 py-2 text-sm font-medium transition flex items-center gap-1",
                      isActive
                        ? "bg-amber-500/20 text-amber-100 ring-1 ring-amber-400/30"
                        : "text-white/60 hover:bg-amber-500/10 hover:text-amber-100"
                    )
                  }
                  title="Admin Portal"
                >
                  <ShieldCheck className="h-4 w-4" />
                </NavLink>
                <div className="ml-2 flex items-center gap-2">
                  <button
                    onClick={toggleTheme}
                    title={isDark ? "Switch to light mode" : "Switch to dark mode"}
                    style={{
                      padding: "8px 12px",
                      borderRadius: "8px",
                      backgroundColor: isDark ? "rgba(51, 65, 85, 0.3)" : "rgba(255, 255, 255, 0.15)",
                      border: "1px solid " + (isDark ? "rgba(148, 163, 184, 0.2)" : "rgba(255, 255, 255, 0.2)"),
                      color: "white",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "500",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {isDark ? "☀️" : "🌙"}
                  </button>
                </div>
              </>
            ) : (
              <>
                <NavItem to={role === "admin" ? "/admin-dashboard" : "/dashboard"}>
                  {role === "admin" ? "Admin Dashboard" : "Dashboard"}
                </NavItem>
                <div className="ml-2 flex items-center gap-2">
                  <button
                    onClick={toggleTheme}
                    title={isDark ? "Switch to light mode" : "Switch to dark mode"}
                    style={{
                      padding: "8px 12px",
                      borderRadius: "8px",
                      backgroundColor: isDark ? "rgba(51, 65, 85, 0.3)" : "rgba(255, 255, 255, 0.15)",
                      border: "1px solid " + (isDark ? "rgba(148, 163, 184, 0.2)" : "rgba(255, 255, 255, 0.2)"),
                      color: "white",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "500",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {isDark ? "☀️" : "🌙"}
                  </button>

                  <button
                    onClick={handleLogout}
                    className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300/60"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-xl bg-white/10 dark:bg-slate-700/10 p-2 text-white dark:text-slate-300 ring-1 ring-white/15 dark:ring-slate-400/15 transition hover:bg-white/15 dark:hover:bg-slate-700/20 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile panel */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="mt-3 rounded-2xl bg-blue-950/85 dark:bg-slate-800/85 p-2 ring-1 ring-white/10 dark:ring-slate-400/10 shadow-lg shadow-black/20 backdrop-blur-xl md:hidden"
            >
              <div className="grid gap-1">
                {links.map((l) => (
                  <NavItem key={l.to} to={l.to} onClick={close}>
                    {l.label}
                  </NavItem>
                ))}

                <div className="mt-2 flex gap-2">
                  <button
                    onClick={toggleTheme}
                    style={{
                      flex: 1,
                      padding: "8px 12px",
                      borderRadius: "8px",
                      backgroundColor: isDark ? "rgba(51, 65, 85, 0.3)" : "rgba(255, 255, 255, 0.15)",
                      border: "1px solid " + (isDark ? "rgba(148, 163, 184, 0.2)" : "rgba(255, 255, 255, 0.2)"),
                      color: "white",
                      cursor: "pointer",
                      fontSize: "13px",
                      fontWeight: "500",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {isDark ? "☀️ Light" : "🌙 Dark"}
                  </button>
                  {isAuthenticated && (
                    <button
                      onClick={handleLogout}
                      className="flex-1 rounded-xl bg-emerald-500 px-3 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-400"
                    >
                      Logout
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
