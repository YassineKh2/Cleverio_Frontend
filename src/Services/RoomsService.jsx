import { jwtDecode } from "jwt-decode";
import api from "./api";

export const AddRoom = async (formData) => {
  try {
    console.log(formData);
    const response = await api.post("roomApi/rooms/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("add failed:", error.response?.data || error.message);
    return null;
  }
};
export const updateRoom = async (id, formData) => {
  try {
    console.log(formData);
    const response = await api.put(`roomApi/rooms/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("update failed:", error.response?.data || error.message);
    return null;
  }
};
export const deleteRoom = async (id) => {
  try {
    const response = await api.delete(`roomApi/rooms/${id}`);
    return response.data;
  } catch (error) {
    console.error("delete failed:", error.response?.data || error.message);
    return null;
  }
};
export const displayRooms = async () => {
  try {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token); 
    const userId = decoded.user_id;
    const response = await api.get("roomApi/rooms/", {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-User-Id": userId,
      },
    });

    return response.data;
  } catch (error) {
    console.error("add failed:", error.response?.data || error.message);
    return null;
  }
};

export const getRecommandedRooms = async () => {
  try {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const response = await api.get("roomApi/recommendations", {
      userId: decoded.user_id,
    });
    return response.data;
  } catch (error) {
    console.error("display failed:", error.response?.data || error.message);
    return null;
  }
};
