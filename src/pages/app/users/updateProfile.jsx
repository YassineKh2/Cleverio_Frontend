import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateUserDetails } from "../../../Services/userApi";

const UpdateProfileForm = ({ user, onClose, onSave }) => {
  // Validation schema with Yup
  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Le nom d'utilisateur est requis")
      .min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères"),
    first_name: Yup.string()
      .required("Le prénom est requis")
      .min(2, "Le prénom doit contenir au moins 2 caractères"),
    last_name: Yup.string()
      .required("Le nom est requis")
      .min(2, "Le nom doit contenir au moins 2 caractères"),
    email: Yup.string()
      .required("L'email est requis")
      .email("Veuillez entrer un email valide"),
    date_of_birth: Yup.date().required("La date de naissance est requise"),
  });

  const formik = useFormik({
    initialValues: {
      username: user?.username || "",
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      email: user?.email || "",
      date_of_birth: user?.date_of_birth || "",
      is_active: user?.is_active || true,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const updatedUser = await updateUserDetails(user.id, values);
        onSave(updatedUser);
        onClose();
      } catch (error) {
        console.error("Failed to update profile:", error);
      }
    },
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Mettre à jour le profil</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Nom d'utilisateur</label>
            <input
              type="text"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded"
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="text-red-500 text-sm">{formik.errors.username}</div>
            ) : null}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Prénom</label>
            <input
              type="text"
              name="first_name"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded"
            />
            {formik.touched.first_name && formik.errors.first_name ? (
              <div className="text-red-500 text-sm">{formik.errors.first_name}</div>
            ) : null}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Nom</label>
            <input
              type="text"
              name="last_name"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded"
            />
            {formik.touched.last_name && formik.errors.last_name ? (
              <div className="text-red-500 text-sm">{formik.errors.last_name}</div>
            ) : null}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Date de Naissance</label>
            <input
              type="date"
              name="date_of_birth"
              value={formik.values.date_of_birth}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded"
            />
            {formik.touched.date_of_birth && formik.errors.date_of_birth ? (
              <div className="text-red-500 text-sm">{formik.errors.date_of_birth}</div>
            ) : null}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Annuler
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileForm;
