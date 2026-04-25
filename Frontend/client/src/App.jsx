import React, { Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import PageTransition from "./components/PageTransition.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";

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

export default function App() {
  const location = useLocation();

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
        <Navbar />

      <Suspense
        fallback={
          <div className="min-h-screen grid place-items-center bg-background text-text">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-soft ring-1 ring-black/5">
                <span className="h-2 w-2 rounded-full bg-secondary" />
                <span className="text-sm font-medium">Loading…</span>
              </div>
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
            <Route element={<ProtectedRoute excludeRoles={["admin"]} /> }>
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
            <Route element={<ProtectedRoute roles={["admin"]} /> }>
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
    </ThemeProvider>
  );
}
