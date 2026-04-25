import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/**
 * RoleBasedRedirect Component
 * Automatically redirects authenticated users to their appropriate dashboard based on role
 * - admin role → /admin-dashboard
 * - user role → /dashboard
 * - If role is not found, redirect to /dashboard (fallback)
 * 
 * Usage:
 * Place this at the root level or in a route handler to ensure role-based routing
 */
export default function RoleBasedRedirect() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((s) => s.auth);

  useEffect(() => {
    if (isAuthenticated && user) {
      const role = user.role || "user";

      // Redirect based on role
      if (role === "admin") {
        navigate("/admin-dashboard", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate]);

  return null; // This component only handles navigation
}
