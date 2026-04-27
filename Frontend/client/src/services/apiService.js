/**
 * API Service - Handles all backend API calls
 * Replaces direct EmailJS calls - now routes through backend SMTP
 */

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

/**
 * Send contact form to backend
 * Backend handles: saving to DB + sending 2 emails (admin + user)
 * 
 * @param {Object} contactData - { name, email, message }
 * @returns {Promise<Object>} - { success, message, error }
 */
export async function submitContact(contactData) {
  try {
    const response = await fetch(`${API_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || "Failed to send message. Please try again.",
      };
    }

    return {
      success: true,
      message: data.message || "Message sent successfully! We will get back to you soon.",
    };
  } catch (error) {
    console.error("Contact API Error:", error);
    return {
      success: false,
      error: error.message || "Network error. Please check your connection and try again.",
    };
  }
}

/**
 * Submit appointment booking to backend
 * Backend handles: saving to DB + sending 2 emails (admin + user confirmation)
 * 
 * @param {Object} appointmentData - { patientName, addictionType, appointmentDate, message }
 * @param {string} token - JWT authentication token
 * @returns {Promise<Object>} - { success, message, error, appointmentId }
 */
export async function submitAppointment(appointmentData, token) {
  try {
    if (!token) {
      throw new Error("Authentication required. Please login again.");
    }

    const response = await fetch(`${API_URL}/api/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(appointmentData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to book appointment");
    }

    return {
      success: true,
      message: data.message || "Appointment booked successfully!",
      appointmentId: data._id || data.appointmentId,
    };
  } catch (error) {
    console.error("Appointment API Error:", error);
    return {
      success: false,
      error: error.message || "Failed to book appointment. Please try again.",
    };
  }
}

export default {
  submitContact,
  submitAppointment,
};
