// src/pages/app/users/AddAdminForm.jsx
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createAdmin } from "../../../Services/userApi";

const AddAdminForm = ({ onClose }) => {
  const formik = useFormik({
    initialValues: {
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirmPassword: "",
      date_of_birth: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Surnom requis"),
      first_name: Yup.string().required("Prénom requis"),
      last_name: Yup.string().required("Nom requis"),
      email: Yup.string().email("Email invalide").required("Email requis"),
      password: Yup.string()
        .min(6, "Le mot de passe doit comporter au moins 6 caractères")
        .required("Mot de passe requis"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Les mots de passe ne correspondent pas")
        .required("Confirmez le mot de passe"),
      date_of_birth: Yup.date()
        .required("Date de naissance requise")
        .max(new Date(), "La date de naissance ne peut pas être dans le futur"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const { confirmPassword, ...adminData } = values; // Exclure confirmPassword lors de l'envoi
        await createAdmin(adminData);
        toast.success("Administrateur ajouté avec succès");
        resetForm();
        onClose(); // Ferme le popup après la soumission
      } catch (error) {
        toast.error("Erreur lors de l'ajout de l'administrateur");
      }
    },
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <ToastContainer />
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Ajouter un Administrateur</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Surnom</label>
              <input
                type="text"
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}
                className="w-full p-2 border rounded"
              />
              {formik.errors.username && formik.touched.username && (
                <p className="text-red-500 text-sm">{formik.errors.username}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">Prénom</label>
              <input
                type="text"
                name="first_name"
                onChange={formik.handleChange}
                value={formik.values.first_name}
                className="w-full p-2 border rounded"
              />
              {formik.errors.first_name && formik.touched.first_name && (
                <p className="text-red-500 text-sm">{formik.errors.first_name}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">Nom</label>
              <input
                type="text"
                name="last_name"
                onChange={formik.handleChange}
                value={formik.values.last_name}
                className="w-full p-2 border rounded"
              />
              {formik.errors.last_name && formik.touched.last_name && (
                <p className="text-red-500 text-sm">{formik.errors.last_name}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                className="w-full p-2 border rounded"
              />
              {formik.errors.email && formik.touched.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">Date de Naissance</label>
              <input
                type="date"
                name="date_of_birth"
                onChange={formik.handleChange}
                value={formik.values.date_of_birth}
                className="w-full p-2 border rounded"
              />
              {formik.errors.date_of_birth && formik.touched.date_of_birth && (
                <p className="text-red-500 text-sm">{formik.errors.date_of_birth}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">Mot de passe</label>
              <input
                type="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                className="w-full p-2 border rounded"
              />
              {formik.errors.password && formik.touched.password && (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">Confirmer le mot de passe</label>
              <input
                type="password"
                name="confirmPassword"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                className="w-full p-2 border rounded"
              />
              {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                <p className="text-red-500 text-sm">{formik.errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Annuler
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAdminForm;
