import React, { useState } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Checkbox from "@/components/ui/Checkbox";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleLogin } from "./store";
import { toast } from "react-toastify";

// Importer la fonction de connexion de votre service
import { loginUser } from "../../../Services/userApi";

// Schéma de validation
const schema = yup.object({
  username: yup.string().required("Le nom d'utilisateur est requis"),
  password: yup.string().required("Le mot de passe est requis"),
}).required();

// Fonction d'assistance pour décoder JWT sans `jwt-decode`
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, formState: { errors }, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onSubmit = async (data) => {
    try {
      // Appeler la fonction loginUser avec le nom d'utilisateur et le mot de passe
      const token = await loginUser(data.username, data.password);

      // Décoder le token pour accéder au rôle
      const decoded = parseJwt(token);
      const userRole = decoded?.role;

      // Enregistrer le token dans Redux ou localStorage si nécessaire
      dispatch(handleLogin(true));
      localStorage.setItem("token", token);

      toast.success("Connexion réussie !", { autoClose: 1500 });

      // Rediriger en fonction du rôle
      if (userRole === "admin") {
        navigate("/dashboard");
      } else if (userRole === "student") {
        navigate("/front");
      } else {
        toast.error("Rôle inconnu", { autoClose: 1500 });
      }
    } catch (error) {
      toast.error("Identifiants incorrects", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const [checked, setChecked] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Textinput
        name="username"
        label="Nom d'utilisateur"
        type="text"
        register={register}
        error={errors.username}
      />
      <Textinput
        name="password"
        label="Mot de passe"
        type="password"
        register={register}
        error={errors.password}
      />
      <div className="flex justify-between">
        <Checkbox
          value={checked}
          onChange={() => setChecked(!checked)}
          label="Rester connecté"
        />
        <Link to="/forgot-password" className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium">
          Mot de passe oublié ?
        </Link>
      </div>

      <button className="btn btn-dark block w-full text-center">Se connecter</button>
    </form>
  );
};

export default LoginForm;
