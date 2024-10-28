import React, { useState } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Checkbox from "@/components/ui/Checkbox";
import { useDispatch } from "react-redux";
import { handleLogin } from "./store";
import { toast } from "react-toastify";
import { loginUser } from "../../../Services/authService";

const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is Required"),
    password: yup.string().required("Password is Required"),
  })
  .required();

const LoginForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  const onSubmit = async (data) => {
    try {
      const token = await loginUser(data.email, data.password);
      if (token) {
        localStorage.setItem("token", token);
        setTimeout(() => {
          if (data.email === "admin@gmail.com" && data.password === "admin") {
            navigate("/dashboard");
          } else {
            navigate("/front");
          }
        }, 1500);
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
      <Textinput
        name="email"
        label="Email"
        type="email"
        register={register}
        error={errors.email}
      />
      <Textinput
        name="password"
        label="Password"
        type="password"
        register={register}
        error={errors.password}
      />
      <div className="flex justify-between">
        <Checkbox
          value={checked}
          onChange={() => setChecked(!checked)}
          label="Keep me signed in"
        />
        <Link
          to="/forgot-password"
          className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
        >
          Forgot Password?
        </Link>
      </div>

      <button className="btn btn-dark block w-full text-center">Sign in</button>
    </form>
  );
};

export default LoginForm;
