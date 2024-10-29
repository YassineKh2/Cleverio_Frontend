import axios from 'axios';

// Set your base URL for the API
const API_URL = 'http://localhost:8000/api/arts/'; 


export const createArt = async (artData) => {
  try {
    // Create a new FormData instance
    const formData = new FormData();
    
    // Append your art data to the formData instance
    Object.entries(artData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await axios.post(`${API_URL}create/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Set content type for file uploads
      },
    });
    
    return response.data; // Return the response data from the API
  } catch (error) {
    throw error.response?.data || error.message; // Handle errors gracefully
  }
};


export const fetchArts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Return the list of arts
  } catch (error) {
    throw error.response?.data || error.message; // Handle errors gracefully
  }
};



export const fetchArtById = async (artId) => {
  try {
    const response = await axios.get(`${API_URL}${artId}/`);
    return response.data; // Return the art details
  } catch (error) {
    throw error.response?.data || error.message; // Handle errors gracefully
  }
};



export const updateArt = async (artId, artData) => {
  try {
    const response = await axios.put(`${API_URL}${artId}/`, artData, {
      headers: {
        'Content-Type': 'multipart/form-data', // For file uploads
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data; // Return error response for handling in the component
  }
};



export const deleteArt = async (artId) => {
  try {
    await axios.delete(`${API_URL}${artId}`); 
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
