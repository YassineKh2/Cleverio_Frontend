import React, { useEffect, useState } from "react";
import { getUserDetails, logoutUser, updateProfilePicture } from "../../../Services/userApi";
import { useDispatch } from "react-redux";
import { handleLogout } from "@/pages/auth/common/store";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/Icon";
import UpdateProfileForm from "./updateProfile.jsx"; // Import the profile update form component
import UpdatePasswordForm from "./updatePassword.jsx"; // Import the password update form component

const BASE_URL = "http://127.0.0.1:8000";
const defaultAvatar = `${BASE_URL}/media/profile_pics/image.png`;

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isPasswordUpdateOpen, setIsPasswordUpdateOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUserDetails = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const user = await getUserDetails(token);
        setUserData(user);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }
  };

  const handleLogoutClick = () => {
    logoutUser();
    dispatch(handleLogout(false));
    navigate("/");
  };

  const openUpdateForm = () => {
    setIsUpdateOpen(true);
  };

  const closeUpdateForm = () => {
    setIsUpdateOpen(false);
  };

  const openPasswordUpdateForm = () => {
    setIsPasswordUpdateOpen(true);
  };

  const closePasswordUpdateForm = () => {
    setIsPasswordUpdateOpen(false);
  };

  const handleSaveUpdatedUser = (updatedUser) => {
    setUserData(updatedUser); // Update profile information with new data
  };

  const handleProfilePictureChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const response = await updateProfilePicture(userData.id, file);
        setUserData((prevData) => ({
          ...prevData,
          profile_picture: response.profile_picture,
        }));
      } catch (error) {
        console.error("Failed to update profile picture:", error);
      }
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 to-white dark:from-slate-700 dark:to-slate-800 shadow-lg rounded-lg max-w-screen-md mx-auto">
      <div className="flex flex-col items-center relative group">
        <div className="relative w-28 h-28">
          <img
            src={userData?.profile_picture ? `${BASE_URL}${userData.profile_picture}` : defaultAvatar}
            alt={userData?.username || "Utilisateur"}
            className="w-full h-full rounded-full object-cover shadow-lg border-4 border-white dark:border-slate-800"
          />
          <div className="absolute inset-0 bg-gray-900 bg-opacity-30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <label
              htmlFor="profilePictureInput"
              className="text-white text-sm font-semibold cursor-pointer"
            >
              Changer
            </label>
          </div>
          <input
            type="file"
            id="profilePictureInput"
            accept="image/*"
            onChange={handleProfilePictureChange}
            className="hidden"
          />
        </div>

        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mt-4">
          {userData?.username || "Utilisateur"}
        </h2>
        <p className="text-gray-500 dark:text-slate-400 text-sm">{userData?.email}</p>
      </div>

      <div className="bg-white dark:bg-slate-700 rounded-lg shadow-md p-6 space-y-4 mt-4">
        <div className="flex items-center">
          <Icon icon="heroicons-outline:user" className="mr-3 text-blue-500 dark:text-slate-300" />
          <span className="text-gray-700 dark:text-slate-300 font-medium">Prénom: <span className="font-semibold">{userData?.first_name}</span></span>
        </div>
        <div className="flex items-center">
          <Icon icon="heroicons-outline:user" className="mr-3 text-blue-500 dark:text-slate-300" />
          <span className="text-gray-700 dark:text-slate-300 font-medium">Nom: <span className="font-semibold">{userData?.last_name}</span></span>
        </div>
        <div className="flex items-center">
          <Icon icon="heroicons-outline:identification" className="mr-3 text-blue-500 dark:text-slate-300" />
          <span className="text-gray-700 dark:text-slate-300 font-medium">Rôle: <span className="font-semibold">{userData?.role}</span></span>
        </div>
        <div className="flex items-center">
          <Icon icon="heroicons-outline:cake" className="mr-3 text-blue-500 dark:text-slate-300" />
          <span className="text-gray-700 dark:text-slate-300 font-medium">Date de naissance: <span className="font-semibold">{userData?.date_of_birth}</span></span>
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={openUpdateForm}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Mettre à jour
        </button>
        <button
          onClick={openPasswordUpdateForm}
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          Modifier le mot de passe
        </button>
      </div>

      {isUpdateOpen && (
        <UpdateProfileForm
          user={userData}
          onClose={closeUpdateForm}
          onSave={handleSaveUpdatedUser}
        />
      )}
      
      {isPasswordUpdateOpen && (
        <UpdatePasswordForm
          userId={userData?.id}
          onClose={closePasswordUpdateForm}
        />
      )}
    </div>
  );
};

export default UserProfile;
