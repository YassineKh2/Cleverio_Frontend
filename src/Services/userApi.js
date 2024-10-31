import axios from 'axios';

const API_URL = "http://127.0.0.1:8000/api/login";

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(API_URL, {
      username,
      password,
    });
    return response.data.token;
  } catch (error) {
    console.error("Login error:", error);
    throw new Error("Invalid credentials");
  }
};

// Function to log out the user
export const logoutUser = () => {
    localStorage.removeItem('token');
};


export const registerUser = async (userData) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register", userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || "Registration failed.");
    }
  };

  export const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      console.error("Error decoding token:", e);
      return null;
    }
  };
  
  export const getUserDetails = async (token) => {
    const decoded = parseJwt(token);
    const userId = decoded?.user_id;
    
    console.log("User ID from token:", userId); // Log pour vérifier l'ID utilisateur
  
    if (!userId) {
      throw new Error("User ID not found in token");
    }
  
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/persons/${userId}`);
      console.log("API response:", response.data); // Log pour vérifier la réponse de l'API
      return response.data;
    } catch (error) {
      console.error("Error fetching user details:", error);
      throw error;
    }
  };


  export const getAllUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/persons/`);
      return response.data;
    } catch (error) {
      console.error("Error fetching all users:", error);
      throw new Error("Failed to fetch users");
    }
  };
  
  export const toggleActiveStatus = async (userId) => {
    try {
      // Call the toggle-active endpoint
      const response = await axios.put(`http://127.0.0.1:8000/api/persons/${userId}/toggle-active`);
      return response.data;
    } catch (error) {
      console.error("Error toggling active status:", error);
      throw error;
    }
  };

  export const updateUserDetails = async (userId, updatedData) => {
    try {
        const response = await axios.put(`http://127.0.0.1:8000/api/persons/${userId}/update`, updatedData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data; // Return the updated user data
    } catch (error) {
        console.error("Failed to update user details:", error);
        throw new Error("Failed to update user details");
    }
};


export const updateProfilePicture = async (userId, profilePictureFile) => {
    try {
        const formData = new FormData();
        formData.append('profile_picture', profilePictureFile);

        const response = await axios.post(
            `http://127.0.0.1:8000/api/persons/${userId}/update-profile-picture`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Failed to update profile picture:', error);
        throw error;
    }
};

export const updatePassword = async (userId, oldPassword, newPassword) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/persons/${userId}/update-password`, 
        {
          old_password: oldPassword,
          new_password: newPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to update password:", error);
      throw error;
    }
  };

  export const createAdmin = async (userData) => {
    try {
      const response = await axios.post("http://localhost:8000/api/addAdmin", userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || "Registration failed.");
    }
  };