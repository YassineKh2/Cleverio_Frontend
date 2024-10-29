import React, { useState } from "react";
import { toast } from "react-toastify";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Checkbox from "@/components/ui/Checkbox";
import { registerUser } from "../../../Services/userApi";

const schema = yup.object({
  username: yup.string().required("Nom d'utilisateur requis"),
  password: yup
    .string()
    .min(8, "Le mot de passe doit comporter au moins 8 caractères")
    .max(20, "Le mot de passe ne doit pas dépasser 20 caractères")
    .required("Mot de passe requis"),
  first_name: yup.string().required("Prénom requis"),
  last_name: yup.string().required("Nom de famille requis"),
  email: yup.string().email("Email invalide").required("Email requis"),
  date_of_birth: yup
    .date()
    .required("Date de naissance requise")
    .typeError("Format de date invalide (YYYY-MM-DD)"),
}).required();

const RegForm = () => {
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const { register, formState: { errors }, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onSubmit = async (data) => {
    if (!checked) {
      toast.error("Veuillez accepter les Termes et Conditions.");
      return;
    }

    try {
      const response = await registerUser({
        username: data.username,
        password: data.password,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        date_of_birth: data.date_of_birth.toISOString().split("T")[0], // Send only date part
        is_active: true,
        points: 0,
      });
      
      toast.success("Compte créé avec succès !", { autoClose: 1500 });
      
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      toast.error(error.message || "Échec de l'inscription. Veuillez réessayer.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div className="grid grid-cols-2 gap-4">
        <Textinput
          name="username"
          label="Nom d'utilisateur"
          type="text"
          placeholder="Entrez votre nom d'utilisateur"
          register={register}
          error={errors.username}
        />
        <Textinput
          name="password"
          label="Mot de passe"
          type="password"
          placeholder="Entrez votre mot de passe"
          register={register}
          error={errors.password}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Textinput
          name="first_name"
          label="Prénom"
          type="text"
          placeholder="Entrez votre prénom"
          register={register}
          error={errors.first_name}
        />
        <Textinput
          name="last_name"
          label="Nom de famille"
          type="text"
          placeholder="Entrez votre nom de famille"
          register={register}
          error={errors.last_name}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Textinput
          name="email"
          label="Email"
          type="email"
          placeholder="Entrez votre email"
          register={register}
          error={errors.email}
        />
        <Textinput
          name="date_of_birth"
          label="Date de naissance"
          type="date" 
          placeholder="YYYY-MM-DD"
          register={register}
          error={errors.date_of_birth}
        />
      </div>
      <Checkbox
        label="Vous acceptez nos Termes et Conditions et notre Politique de Confidentialité"
        value={checked}
        onChange={() => setChecked(!checked)}
      />
      <button className="btn btn-dark block w-full text-center">
        Créer un compte
      </button>
    </form>
  );
};

export default RegForm;
