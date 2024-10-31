import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useDarkMode from "@/hooks/useDarkMode";
import LogoWhite from "@/assets/images/logo/logo-white.svg";
import Logo from "@/assets/images/logo/logo.svg";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AddRoom, updateRoom } from "../../../Services/RoomsService";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

function UpdateRoom() {
  const schema = yup
    .object({
      name: yup.string().required("Name is Required"),
      subject: yup.string().required("Subject is Required"),
      max_participants: yup
        .number()
        .required("Max participants is Required")
        .positive("Must be a positive number")
        .integer("Must be an integer"),
      status: yup.string().required("Status is Required"),
      is_private: yup.string().required("Privacy option is Required"),
      description: yup.string().optional(),
    })
    .required();

  const location = useLocation();
  const { room } = location.state;

  // Use the room data as default values
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset, // Destructure reset
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: {
      name: room.name,
      subject: room.subject,
      max_participants: room.max_participants,
      status: room.status,
      is_private: room.is_private,
      description: room.description,
    },
  });

  useEffect(() => {
    // Reset the form with room data if it changes
    reset({
      name: room.name,
      subject: room.subject,
      max_participants: room.max_participants,
      status: room.status,
      is_private: room.is_private,
      description: room.description,
    });
  }, [room, reset]);

  const [isDark] = useDarkMode();
  const StatusInput = ({ register }) => {
    return (
      <select {...register("status")} className="w-full border rounded-md p-2">
        <option value="">Select Status</option>
        <option value="Open">Open</option>
        <option value="Closed">Closed</option>
        <option value="In_progress">In Progress</option>
      </select>
    );
  };

  const IsPrivateInput = ({ register }) => {
    return (
      <select
        {...register("is_private")}
        className="w-full border rounded-md p-2"
      >
        <option value="">Select</option>
        <option value="private">Private</option>
        <option value="public">Public</option>
      </select>
    );
  };

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }
      formData.append("createdBy", room.createdBy);
      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
      }

      await updateRoom(room.id, formData);
      navigate("/front/displayrooms");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-900">
        <div className="lg-inner-column max-w-xl w-full bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
          <div className="text-center mb-8">
            <Link to="/">
              <img
                src={isDark ? LogoWhite : Logo}
                alt="Logo"
                className="mx-auto mb-6"
              />
            </Link>
            <h4 className="font-medium text-2xl text-gray-800 dark:text-white">
              Salle Révision
            </h4>
            <p className="text-slate-500 dark:text-slate-400">
              Crée un Room de Revision
            </p>
          </div>
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex w-full space-x-4">
              <div className="flex-1">
                <Textinput
                  name="name"
                  label="Nom"
                  type="text"
                  placeholder="Ecrire le nom de la salle"
                  register={register}
                  className="w-full"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <Textinput
                  name="subject"
                  label="Sujet"
                  type="text"
                  placeholder="Ecrire le sujet de la salle"
                  register={register}
                  className="w-full"
                />
                {errors.subject && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.subject.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex w-full space-x-4 items-end">
              <div className="flex-1">
                <Textinput
                  name="max_participants"
                  label="Nombre Maximal"
                  type="number"
                  placeholder="Ecrire le nombre Maximal des participant"
                  register={register}
                  className="w-full"
                />
                {errors.max_participants && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.max_participants.message}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <StatusInput register={register} />
                {errors.status && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.status.message}
                  </p>
                )}
              </div>
            </div>

            {/* Textarea for Description */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                {...register("description")}
                placeholder="Enter your description here"
                className="mt-1 block w-full border rounded-md p-2 h-32"
              />
              {errors.description && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="flex-1">
              <IsPrivateInput register={register} />
              {errors.is_private && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.is_private.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Image
              </label>
              <input
                type="file"
                {...register("image")}
                className="mt-1 block w-full border rounded-md p-2"
                accept="image/*"
              />
            </div>
            <button
              type="submit"
              className="btn btn-dark block w-full text-center"
            >
              Update Une Salle
            </button>
          </form>

          <div className="relative border-b-[#9AA2AF] border-opacity-[16%] border-b pt-6 mt-6">
            <div className="absolute inline-block bg-white dark:bg-slate-800 left-1/2 top-1/2 transform -translate-x-1/2 px-4 text-sm text-slate-500">
              Continue
            </div>
          </div>

          <div className="auth-footer text-center mt-4 text-gray-500 text-sm">
            Copyright 2021, Dashcode All Rights Reserved.
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateRoom;
