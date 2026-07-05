import React, { Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import PageTransition from "./components/PageTransition.jsx";
import Loader from "./components/Loader.jsx";
import { ThemeProvider, useTheme } from "./context/ThemeContext.jsx";

const LandingPage = React.lazy(() => import("./pages/LandingPage.jsx"));
const ServicesPage = React.lazy(() => import("./pages/ServicesPage.jsx"));
const ServiceBookingPage = React.lazy(() => import("./pages/ServiceBookingPage.jsx"));
const AppointmentBookingPage = React.lazy(() => import("./pages/AppointmentBookingPage.jsx"));
const ContactPage = React.lazy(() => import("./pages/ContactPage.jsx"));
const LoginPage = React.lazy(() => import("./pages/LoginPage.jsx"));
const AdminLogin = React.lazy(() => import("./pages/AdminLogin.jsx"));
const RegisterPage = React.lazy(() => import("./pages/RegisterPage.jsx"));
const Dashboard = React.lazy(() => import("./pages/Dashboard.jsx"));
const AdminDashboard = React.lazy(() => import("./pages/AdminDashboard.jsx"));
const ProtectedRoute = React.lazy(() => import("./components/ProtectedRoute.jsx"));

/**
 * Debug Theme Indicator - Shows current theme state
 * Visible in development to verify dark/light mode is working
 * Remove this component in production if desired
 */
function ThemeDebugIndicator() {
  const { isDark } = useTheme();

  return (
    <div
      className={`fixed bottom-4 right-4 z-40 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
        isDark
          ? "bg-slate-800 text-slate-100 border border-slate-600"
          : "bg-white text-slate-900 border border-slate-300 shadow-md"
      }`}
    >
      {isDark ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </div>
  );
}

/**
 * Dark Mode Test Component - Verify Tailwind dark mode is working
 * This component visually confirms that dark: classes are applying correctly
 * Remove this after verifying dark mode works across your app
 */
function DarkModeTestComponent() {
  const { isDark } = useTheme();

  return (
    <div className="fixed bottom-20 right-4 z-40 p-3 rounded-lg text-xs font-mono transition-all duration-300 bg-white dark:bg-slate-800 border-2 border-blue-400 dark:border-blue-500 shadow-lg">
      <div className="text-blue-900 dark:text-blue-300">
        Theme Test
        <br />
        {isDark ? "Dark ✓" : "Light ✓"}
      </div>
    </div>
  );
}

/**
 * AppContent - Wraps all routes and content
 * Must be inside ThemeProvider to access useTheme hook
 */
function AppContent() {
  const location = useLocation();

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
        <Navbar />

        <Suspense
          fallback={
            <div className="min-h-screen grid place-items-center bg-white dark:bg-slate-950">
              <div className="text-center">
                <Loader size="large" />
                <p className="mt-6 text-sm font-medium text-slate-600 dark:text-slate-400">
                  Loading…
                </p>
              </div>
            </div>
          }
        >
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <PageTransition>
                    <LandingPage />
                  </PageTransition>
                }
              />
              <Route
                path="/services"
                element={
                  <PageTransition>
                    <ServicesPage />
                  </PageTransition>
                }
              />
              <Route
                path="/book-service"
                element={
                  <PageTransition>
                    <ServiceBookingPage />
                  </PageTransition>
                }
              />
              <Route
                path="/book-appointment"
                element={
                  <PageTransition>
                    <AppointmentBookingPage />
                  </PageTransition>
                }
              />
              <Route
                path="/contact"
                element={
                  <PageTransition>
                    <ContactPage />
                  </PageTransition>
                }
              />
              <Route
                path="/login"
                element={
                  <PageTransition>
                    <LoginPage />
                  </PageTransition>
                }
              />
              <Route
                path="/admin-login"
                element={
                  <PageTransition>
                    <AdminLogin />
                  </PageTransition>
                }
              />
              <Route
                path="/register"
                element={
                  <PageTransition>
                    <RegisterPage />
                  </PageTransition>
                }
              />

              {/* User Dashboard - Protected from admin access */}
              <Route element={<ProtectedRoute excludeRoles={["admin"]} />}>
                <Route
                  path="/dashboard"
                  element={
                    <PageTransition>
                      <Dashboard />
                    </PageTransition>
                  }
                />
              </Route>

              {/* Admin Dashboard - Only accessible by admin users */}
              <Route element={<ProtectedRoute roles={["admin"]} />}>
                <Route
                  path="/admin-dashboard"
                  element={
                    <PageTransition>
                      <AdminDashboard />
                    </PageTransition>
                  }
                />
              </Route>

              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
        <Footer />
      </div>
      <ThemeDebugIndicator />
      <DarkModeTestComponent />
    </>
  );
}

/**
 * Main App Component
 * Wraps everything with ThemeProvider for dark/light mode support
 */
export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
