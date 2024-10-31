import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { updatePassword } from "../../../Services/userApi"; // Assurez-vous que cette fonction est définie

const UpdatePasswordForm = ({ userId, onClose }) => {
  const [error, setError] = useState(null);

  // Définition du schéma de validation avec Yup
  const validationSchema = Yup.object({
    oldPassword: Yup.string().required("Le mot de passe actuel est requis"),
    newPassword: Yup.string()
      .min(6, "Le nouveau mot de passe doit contenir au moins 6 caractères")
      .required("Le nouveau mot de passe est requis"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Les mots de passe ne correspondent pas")
      .required("Veuillez confirmer le nouveau mot de passe"),
  });

  // Configuration de Formik
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await updatePassword(userId, values.oldPassword, values.newPassword);
        toast.success("Mot de passe mis à jour avec succès !");
        onClose();
      } catch (error) {
        setError("Échec de la mise à jour du mot de passe.");
        setErrors({ submit: "Échec de la mise à jour du mot de passe." });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Mettre à jour le mot de passe</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Mot de passe actuel</label>
            <input
              type="password"
              name="oldPassword"
              value={formik.values.oldPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded"
            />
            {formik.touched.oldPassword && formik.errors.oldPassword && (
              <p className="text-red-500 text-sm">{formik.errors.oldPassword}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Nouveau mot de passe</label>
            <input
              type="password"
              name="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded"
            />
            {formik.touched.newPassword && formik.errors.newPassword && (
              <p className="text-red-500 text-sm">{formik.errors.newPassword}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Confirmer le nouveau mot de passe</label>
            <input
              type="password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="text-red-500 text-sm">{formik.errors.confirmPassword}</p>
            )}
          </div>
          {formik.errors.submit && (
            <p className="text-red-500 text-sm">{formik.errors.submit}</p>
          )}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              disabled={formik.isSubmitting}
            >
              Mettre à jour
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePasswordForm;
