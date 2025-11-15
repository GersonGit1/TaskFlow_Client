import { useForm } from "react-hook-form";
import type { UserRegisterForm } from "../../types";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { CreateAccount } from "../../services/AuthApi";
import { toast } from "react-toastify";
import CustomInput from "../../components/CustomImput";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export default function RegisterView() {
  
  const initialValues: UserRegisterForm = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  }

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<UserRegisterForm>({ defaultValues: initialValues });
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const password = watch('password'); //to validate password confirmation

  const {mutate} = useMutation({
      mutationFn : CreateAccount,//assign parameters when calling the function
      onError : (error)=>{
        toast.error(error.message);
      },
      onSuccess: (data)=>{
        toast.success(data);// send notification
        reset();// reset form
      }
    })

  const handleRegister = (formData: UserRegisterForm) => mutate(formData);

  return (
    <>
      <h1 className="text-5xl font-black text-white text-center">Crear Cuenta</h1>
      <p className="text-2xl font-light text-white mt-5 text-center">
        Llena el formulario para {''}
        <span className=" text-fuchsia-500 font-bold"> crear tu cuenta</span>
      </p>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="space-y-8 p-10  bg-white mt-10 rounded-3xl w-xs mx-auto sm:w-lg"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
            htmlFor="email"
          >Email</label>
          <CustomInput id="email" placeholder="Your email" key={"name"}
              register={register("email", {
                  required: "E-mail is required",
                  pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Invalid e-mail",
                  },
          })} error={errors.email}/>
        </div>

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Name</label>
          <CustomInput id="name" placeholder="your name" key={"name"}  register={register("name", {
            required: "Username is required",
          })} error={errors.name}/>
        </div>

        <div className="flex flex-col gap-5 relative">
          <label
            className="font-normal text-2xl"
          >Password</label>

          <CustomInput id="password" type={showPassword ? 'text' : 'password'} placeholder="Your password" key={"password"}  register={register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: 'Password should be minimum 8 characters'
              }
            })} error={errors.password}/>

          <span
              className="absolute right-4 top-17 transform cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
          >
              {showPassword ? <EyeIcon height={20} width={20} aria-hidden="true"/> :
              <EyeSlashIcon height={20} width={20} aria-hidden="true"/>}
          </span>
        </div>

        <div className="flex flex-col gap-5 relative">
          <label htmlFor="password_confirmation"
            className="font-normal text-2xl"
          >Repeat password</label>

          <CustomInput id="password_confirmation" type={showRepeatPassword ? 'text' : 'password'} placeholder="Repeat your password" key={"password_confirmation"}
              register={register("password_confirmation", {
              required: "Repeat your password",
              validate: value => value === password || 'Passwords are not equals'
            })} error={errors.password_confirmation}/>

          <span
              className="absolute right-4 top-17 transform cursor-pointer"
              onClick={() => setShowRepeatPassword(!showRepeatPassword)}
          >
              {showRepeatPassword ? <EyeIcon height={20} width={20} aria-hidden="true"/> :
              <EyeSlashIcon height={20} width={20} aria-hidden="true"/>}
          </span>
        </div>

        <input
          type="submit"
          value='Registrarme'
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black rounded-md text-xl cursor-pointer"
        />
      </form>
      <nav className="mt-10 flex flex-col space-y-4">
        <Link to="/auth/login" className="text-center text-gray-300 font-normal">
            ¿Ya tienes una cuenta? <span className="text-fuchsia-600 font-bold">Inicia Sesión</span>
        </Link>
      </nav>
    </>
  )
}