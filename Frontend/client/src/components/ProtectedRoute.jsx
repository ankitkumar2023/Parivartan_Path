import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

/**
 * ProtectedRoute Component
 * Protects routes based on authentication status and optional role requirements
 * 
 * Usage:
 * <Route element={<ProtectedRoute />}>  // any authenticated user
 * <Route element={<ProtectedRoute roles={['admin']} />}>  // admin only
 * <Route element={<ProtectedRoute excludeRoles={['admin']} />}>  // everyone except admin
 */
export default function ProtectedRoute({ roles, excludeRoles }) {
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((s) => s.auth);

  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  const userRole = user?.role || "user";

  // Check if user has required roles
  if (Array.isArray(roles) && roles.length > 0) {
    if (!roles.includes(userRole)) {
      // Redirect to appropriate dashboard based on user role
      const redirectPath = userRole === "admin" ? "/admin-dashboard" : "/dashboard";
      return <Navigate to={redirectPath} replace />;
    }
  }

  // Check if user should be excluded from this route
  if (Array.isArray(excludeRoles) && excludeRoles.length > 0) {
    if (excludeRoles.includes(userRole)) {
      // Redirect to appropriate dashboard based on user role
      const redirectPath = userRole === "admin" ? "/admin-dashboard" : "/dashboard";
      return <Navigate to={redirectPath} replace />;
    }
  }

  return <Outlet />;
}

