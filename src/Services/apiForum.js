import axios from 'axios';

// Set your base URL for the API
const API_URL = 'http://localhost:8000/api/arts/';

export const createArt = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}create/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
export const fetchArts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const fetchArtById = async (artId) => {
  try {
    const response = await axios.get(`${API_URL}${artId}/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateArt = async (artId, formData) => {
  try {
    const response = await axios.put(`${API_URL}${artId}/update/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};


export const deleteArt = async (artId) => {
  try {
    await axios.delete(`${API_URL}${artId}/delete/`); // Updated to match the new URL structure
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
export const fetchComments = async (artId) => {
  try {
    const response = await axios.get(`${API_URL}${artId}/comments/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const createComment = async (artId, commentData) => {
  try {
    const response = await axios.post(`${API_URL}${artId}/comments/create/`, commentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
export const deleteComment = async (artId, commentId) => {
  try {
    await axios.delete(`${API_URL}${artId}/comments/${commentId}/delete/`);
  } catch (error) {
    throw error.response?.data || error.message;
  }
};