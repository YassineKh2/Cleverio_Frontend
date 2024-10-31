import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toggleActiveStatus } from "../../../Services/userApi";
import AddAdminForm from "./addAdmin.jsx"; // Importer le formulaire d'ajout d'administrateur

const BASE_URL = "http://127.0.0.1:8000";
const defaultAvatar = `${BASE_URL}/media/profile_pics/image.png`;

const DisplayUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddAdminOpen, setIsAddAdminOpen] = useState(false);

  // Récupérer les utilisateurs
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/api/persons`);
        setUsers(response.data);
      } catch (err) {
        console.error("Failed to load users:", err);
        toast.error("Échec du chargement des utilisateurs.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Activer/désactiver un utilisateur
  const handleActivate = async (user) => {
    try {
      const updatedUser = await toggleActiveStatus(user.id);
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === user.id ? updatedUser : u))
      );
      toast.success(`Utilisateur ${updatedUser.is_active ? "activé" : "désactivé"} avec succès !`);
    } catch (error) {
      console.error("Failed to update user status:", error);
      toast.error("Échec de la mise à jour du statut de l'utilisateur.");
    }
  };

  // Ouvrir et fermer le formulaire d'ajout d'admin
  const handleAddAdmin = () => {
    setIsAddAdminOpen(true);
  };

  const closeAddAdminForm = () => {
    setIsAddAdminOpen(false);
  };

  return (
    <div className="flex flex-col p-6">
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-4">Liste des Utilisateurs</h2>
      
      {/* Bouton pour ajouter un administrateur */}
      <div className="mb-4">
        <button
          onClick={handleAddAdmin}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          + Admin
        </button>
      </div>

      {/* Table des utilisateurs */}
      <div className="overflow-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left py-3 px-4 font-semibold">Photo</th>
              <th className="text-left py-3 px-4 font-semibold">Surnom</th>
              <th className="text-left py-3 px-4 font-semibold">Prénom</th>
              <th className="text-left py-3 px-4 font-semibold">Nom</th>
              <th className="text-left py-3 px-4 font-semibold">Email</th>
              <th className="text-left py-3 px-4 font-semibold">Rôle</th>
              <th className="text-left py-3 px-4 font-semibold">Date</th>
              <th className="text-left py-3 px-4 font-semibold">Points</th>
              <th className="text-left py-3 px-4 font-semibold">Actif</th>
              <th className="text-center py-3 px-4 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="10" className="text-center py-4">
                  Chargement...
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <img
                      src={user.profile_picture ? `${BASE_URL}${user.profile_picture}` : defaultAvatar}
                      alt={user.username}
                      className="w-10 h-10 rounded-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = defaultAvatar;
                      }}
                    />
                  </td>
                  <td className="py-3 px-4 font-semibold text-gray-700">{user.username}</td>
                  <td className="py-3 px-4">{user.first_name}</td>
                  <td className="py-3 px-4">{user.last_name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">{user.role}</td>
                  <td className="py-3 px-4">{user.date_of_birth}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full text-white bg-green-500">{user.points}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full ${user.is_active ? "bg-green-500" : "bg-red-500"} text-white`}>
                      {user.is_active ? "Oui" : "Non"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleActivate(user)}
                      className={`px-4 py-2 rounded ${user.is_active ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}
                    >
                      {user.is_active ? "Désactiver" : "Activer"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal pour ajouter un admin */}
      {isAddAdminOpen && (
        <AddAdminForm onClose={closeAddAdminForm} />
      )}
    </div>
  );
};

export default DisplayUsers;
