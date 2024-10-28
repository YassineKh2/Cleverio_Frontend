import axios from "axios";
import api from "./api";

export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/login/", {
      email,
      password,
    });
    const { token } = response.data;
    localStorage.setItem("token", token); // Store token in local storage
    return token;
  } catch (error) {
    console.error("Login failed:", error);
    return null;
  }
};
export const registerUser = async (username, password, email) => {
  try {
    const response = await api.post("/register/", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Register failed:", error.response?.data || error.message);
    return null;
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};
