import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/login";

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(API_URL, {
      username,
      password,
    });
    console.log(response.data);
    return response.data.token;
  } catch (error) {
    console.error("Login error:", error);
    throw new Error("Invalid credentials");
  }
};

// Function to log out the user
export const logoutUser = () => {
  localStorage.removeItem("token");
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/register",
      userData
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Registration failed.");
  }
};
