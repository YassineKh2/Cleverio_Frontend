import api from "./api";

export const AddRoom = async (roomData) => {
  try {
    const response = await api.post("roomApi/rooms/", {
      roomData,
    });
    return response.data;
  } catch (error) {
    console.error("add failed:", error.response?.data || error.message);
    return null;
  }
};
