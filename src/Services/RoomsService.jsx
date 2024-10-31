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
    const response = await api.get("roomApi/rooms/");

    return response.data;
  } catch (error) {
    console.error("add failed:", error.response?.data || error.message);
    return null;
  }
};

export const getRecommandedRooms = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get("roomApi/recommendations", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("display failed:", error.response?.data || error.message);
    return null;
  }
};
