import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

function getStoredAuth() {
  try {
    const raw = localStorage.getItem("auth");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function storeAuth(data) {
  localStorage.setItem("auth", JSON.stringify(data));
}

function clearAuth() {
  localStorage.removeItem("auth");
}

function normalizeError(error) {
  return error?.response?.data?.message || error?.message || "Something went wrong. Please try again.";
}

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ name, address, email, password, phone, gender, familyMemberName, familyMemberNumber }, thunkAPI) => {
    try {
      const res = await api.post("/api/auth/register", {
        name,
        address,
        email,
        password,
        phone,
        gender,
        familyMemberName,
        familyMemberNumber,
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(normalizeError(err));
    }
  }
);

export const loginUser = createAsyncThunk("auth/login", async ({ email, password }, thunkAPI) => {
  try {
    const res = await api.post("/api/auth/login", { email, password });
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(normalizeError(err));
  }
});

const stored = getStoredAuth();

const initialState = {
  user: stored?.user || null,
  token: stored?.token || null,
  isLoading: false,
  isAuthenticated: Boolean(stored?.token),
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
      clearAuth();
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const pending = (state) => {
      state.isLoading = true;
      state.error = null;
    };

    const rejected = (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Request failed.";
    };

    builder
      .addCase(registerUser.pending, pending)
      .addCase(registerUser.fulfilled, (state, action) => {
        const { token, user } = action.payload || {};
        state.isLoading = false;
        state.token = token || null;
        state.user = user || null;
        state.isAuthenticated = Boolean(token);
        state.error = null;

        if (token && user) storeAuth({ token, user });
      })
      .addCase(registerUser.rejected, rejected);

    builder
      .addCase(loginUser.pending, pending)
      .addCase(loginUser.fulfilled, (state, action) => {
        const { token, user } = action.payload || {};
        state.isLoading = false;
        state.token = token || null;
        state.user = user || null;
        state.isAuthenticated = Boolean(token);
        state.error = null;

        if (token && user) storeAuth({ token, user });
      })
      .addCase(loginUser.rejected, rejected);
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;

