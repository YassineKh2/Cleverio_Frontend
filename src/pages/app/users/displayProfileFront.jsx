import React, { useEffect, useState } from "react";
import { getUserDetails, updateProfilePicture } from "../../../Services/userApi";
import { ToastContainer, toast } from "react-toastify";
import { FaUser, FaEnvelope, FaIdCard, FaBirthdayCake, FaLock } from "react-icons/fa";
import UpdateProfileForm from "./updateProfile.jsx";
import UpdatePasswordForm from "./updatePassword.jsx";

const BASE_URL = "http://127.0.0.1:8000";
const defaultAvatar = `${BASE_URL}/media/profile_pics/image.png`;

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isPasswordUpdateOpen, setIsPasswordUpdateOpen] = useState(false);

  const fetchUserDetails = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const user = await getUserDetails(token);
        setUserData(user);
      } catch (error) {
        console.error("Erreur lors de la récupération des informations utilisateur :", error);
      }
    }
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
        console.error("Échec de la mise à jour de la photo de profil :", error);
      }
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '40px',
      backgroundImage: 'linear-gradient(to bottom, #f093fb 0%, #f5576c 50%, #ffffff 50%)'
    }}>
      <ToastContainer />

      <div style={{
        width: '90%',
        maxWidth: '1000px',
        backgroundColor: '#fff',
        borderRadius: '16px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
        padding: '40px',
        textAlign: 'center',
        position: 'relative',
        transform: 'translateY(-30px)',
      }}>
        <div style={{
          position: 'relative',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          overflow: 'hidden',
          border: '6px solid #fff',
          margin: '0 auto',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
        }}>
          <img
            src={userData?.profile_picture ? `${BASE_URL}${userData.profile_picture}` : defaultAvatar}
            alt={userData?.username || "Utilisateur"}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            opacity: 0,
            transition: 'opacity 0.3s',
            cursor: 'pointer'
          }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
            onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
          >
            <label
              htmlFor="profilePictureInput"
              style={{
                color: '#ffffff',
                fontSize: '0.875rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Changer
            </label>
          </div>
          <input
            type="file"
            id="profilePictureInput"
            accept="image/*"
            onChange={handleProfilePictureChange}
            style={{ display: 'none' }}
          />
        </div>

        <h2 style={{
          fontSize: '2.2rem',
          fontWeight: 'bold',
          color: '#333',
          marginTop: '20px'
        }}>
          {userData?.username || "Utilisateur"}
        </h2>
        <p style={{ color: '#888', fontSize: '1rem', margin: '5px 0' }}>{userData?.email}</p>
        <p style={{ color: '#aaa', fontSize: '0.9rem' }}>
          {userData?.role}, {userData?.date_of_birth}
        </p>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginTop: '30px',
        }}>
          <div style={{
            backgroundColor: '#f9fafb',
            borderRadius: '12px',
            padding: '20px',
            textAlign: 'left',
            width: '45%',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              <FaUser style={{ marginRight: '8px' }} /> Informations personnelles
            </h3>
            <p style={{ display: 'flex', alignItems: 'center' }}>
              <FaIdCard style={{ marginRight: '8px' }} /> Prénom : <span style={{ marginLeft: '5px' }}>{userData?.first_name}</span>
            </p>
            <p style={{ display: 'flex', alignItems: 'center' }}>
              <FaIdCard style={{ marginRight: '8px' }} /> Nom : <span style={{ marginLeft: '5px' }}>{userData?.last_name}</span>
            </p>
            <p style={{ display: 'flex', alignItems: 'center' }}>
              <FaUser style={{ marginRight: '8px' }} /> Rôle : <span style={{ marginLeft: '5px' }}>{userData?.role}</span>
            </p>
            <p style={{ display: 'flex', alignItems: 'center' }}>
              <FaBirthdayCake style={{ marginRight: '8px' }} /> Date de naissance : <span style={{ marginLeft: '5px' }}>{userData?.date_of_birth}</span>
            </p>
          </div>

          <div style={{
            backgroundColor: '#f9fafb',
            borderRadius: '12px',
            padding: '20px',
            textAlign: 'left',
            width: '45%',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              <FaLock style={{ marginRight: '8px' }} /> Sécurité
            </h3>
            <p style={{ display: 'flex', alignItems: 'center' }}>Mot de passe : ********</p>
            <button style={{
              marginTop: '15px',
              padding: '10px 20px',
              backgroundColor: '#10b981',
              color: '#fff',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
              onClick={() => setIsPasswordUpdateOpen(true)}
            >
              Modifier le mot de passe
            </button>
          </div>
        </div>

        <button style={{
          marginTop: '30px',
          padding: '12px 30px',
          backgroundColor: '#3b82f6',
          color: '#ffffff',
          borderRadius: '10px',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '1rem',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        }}
          onClick={() => setIsUpdateOpen(true)}
        >
          Mettre à jour
        </button>
      </div>

      {isUpdateOpen && (
        <UpdateProfileForm
          user={userData}
          onClose={() => setIsUpdateOpen(false)}
          onSave={(updatedUser) => {
            setUserData(updatedUser);
            toast.success("Profil mis à jour avec succès");
          }}
        />
      )}
      {isPasswordUpdateOpen && (
        <UpdatePasswordForm
          userId={userData?.id}
          onClose={() => setIsPasswordUpdateOpen(false)}
        />
      )}
    </div>
  );
};

export default UserProfile;
