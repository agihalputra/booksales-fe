// src/_services/auth.js
import { useJwt } from "react-jwt";
import { API } from "../_api";

// ==============================
// 🔹 LOGIN FUNCTION
// ==============================
export const login = async ({ email, password }) => {
  try {
    const { data } = await API.post("/login", { email, password });

    // Simpan token ke localStorage (opsional tapi penting)
    if (data?.token) {
      localStorage.setItem("accessToken", data.token);
    }

    return data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};

// ==============================
// 🔹 LOGOUT FUNCTION
// ==============================
export const logout = async () => {
  try {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("Token tidak ditemukan di localStorage");
    }

    const { data } = await API.post(
      "/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Hapus token setelah logout
    localStorage.removeItem("accessToken");

    return data;
  } catch (error) {
    console.error("Logout error:", error.response?.data || error.message);
    throw error;
  }
};

// ==============================
// 🔹 DECODE TOKEN
// ==============================
export const useDecodedToken = (token) => {
  const { decodedToken, isExpired } = useJwt(token);

  try {
    if (!token) {
      return {
        success: false,
        message: "Token tidak ditemukan",
        data: null,
      };
    }

    if (isExpired) {
      return {
        success: false,
        message: "Token sudah kedaluwarsa",
        data: null,
      };
    }

    return {
      success: true,
      message: "Token valid",
      data: decodedToken,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
};
