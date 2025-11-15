import { useForm } from "react-hook-form"
import type { UpdatePasswordForm } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdatePassword } from "../../services/ProfileApi";
import { toast } from "react-toastify";
import CustomInput from "../../components/CustomImput";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export default function ChangePasswordView() {
  const initialValues : UpdatePasswordForm = {
    current_password: '',
    password: '',
    password_confirmation: ''
  }

  const { register, handleSubmit, watch, formState: { errors } } = useForm({ defaultValues: initialValues })
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const password = watch('password');
  const queryClient = useQueryClient()
    const {mutate} = useMutation({
        mutationFn: UpdatePassword,
        onError: (error) => toast.error(error.message),
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({queryKey: ['user']})
        }
    });

  const handleChangePassword = (formData : UpdatePasswordForm) => mutate(formData)

  return (
    <>
      <div className="mx-auto max-w-3xl">

        <h1 className="text-5xl font-black ">Cambiar Password</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">Utiliza este formulario para cambiar tu password</p>

        <form
          onSubmit={handleSubmit(handleChangePassword)}
          className=" mt-14 space-y-5 bg-white shadow-lg p-10 rounded-lg"
          noValidate
        >
          <div className="mb-5 space-y-3 relative">
            <label
              className="text-sm uppercase font-bold"
              htmlFor="current_password"
            >Current password</label>
            <CustomInput id="current_password" type={showCurrentPassword ? 'text' : 'password'} placeholder="Yout current password"
              key={"current_password"}
              register={register("current_password", {
              required: "Current password is required",
            })} error={errors.current_password}/>

            <span
              className="absolute right-4 top-10 transform cursor-pointer"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                {showCurrentPassword ? <EyeIcon height={20} width={20} aria-hidden="true"/> :
                <EyeSlashIcon height={20} width={20} aria-hidden="true"/>}
            </span>
          </div>

          <div className="mb-5 space-y-3 relative">
            <label
              className="text-sm uppercase font-bold"
              htmlFor="password"
            >New Password</label>
            <CustomInput id="password" type={showNewPassword ? 'text' : 'password'} placeholder="New password"
              key={"password"}
              register={register("password", {
              required: "New password is required",
              minLength: {
                value: 8,
                message: 'Password should be minimun 8 characters'
              }
            })} error={errors.password}/>
            <span
              className="absolute right-4 top-10 transform cursor-pointer"
              onClick={() => setShowNewPassword(!showNewPassword)}>
                {showNewPassword ? <EyeIcon height={20} width={20} aria-hidden="true"/> :
                <EyeSlashIcon height={20} width={20} aria-hidden="true"/>}
            </span>
          </div>

          <div className="mb-5 space-y-3 relative">
            <label
              htmlFor="password_confirmation"
              className="text-sm uppercase font-bold"
            >Repeat password</label>

            <CustomInput id="password_confirmation" type={showRepeatPassword ? 'text' : 'password'} placeholder="Repeat your password" key={"password_confirmation"}
              register={register("password_confirmation", {
              required: "Repeat your password",
              validate: value => value === password || 'Passwords are not equals'
            })} error={errors.password_confirmation}/>

            <span
              className="absolute right-4 top-10 transform cursor-pointer"
              onClick={() => setShowRepeatPassword(!showRepeatPassword)}>
                {showRepeatPassword ? <EyeIcon height={20} width={20} aria-hidden="true"/> :
                <EyeSlashIcon height={20} width={20} aria-hidden="true"/>}
            </span>
          </div>

          <input
            type="submit"
            value='Cambiar Password'
            className="bg-fuchsia-600 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-700 cursor-pointer transition-colors rounded-lg"
          />
        </form>
      </div>
    </>
  )
}