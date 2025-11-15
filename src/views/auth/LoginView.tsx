import { useForm } from "react-hook-form";
import type { UserLoginForm } from "../../types";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Login } from "../../services/AuthApi";
import { toast } from "react-toastify";
import CustomInput from "../../components/CustomImput";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";

export default function LoginView() {

  const initialValues: UserLoginForm = {
    email: '',
    password: '',
  }
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

  const {mutate} = useMutation({
    mutationFn: Login,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      window.location.href = '/';
    }
  });

  const handleLogin = (formData: UserLoginForm) => mutate(formData);

  return (
    <>
      <h1 className="text-5xl font-black text-white text-center">Iniciar sesion</h1>
      <p className="text-2xl font-light text-white mt-5 text-center">
        Comienza a administrar tur proyectos {''}
        <span className=" text-fuchsia-500 font-bold"> Iniciando sesion aqui!</span>
      </p>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-8 p-10 bg-white mt-10 rounded-3xl w-xs mx-auto sm:w-lg"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
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

        <div className="flex flex-col gap-5 relative">
          <label
            className="font-normal text-2xl"
          >Password</label>
          <CustomInput id="password" type={showPassword ? 'text' : 'password'}
            placeholder="Your password" key={"password"}  register={register("password", {
            required: "Password is required",
          })} error={errors.password}/>
          <span
              className="absolute right-4 top-17 transform cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeIcon height={20} width={20} aria-hidden="true"/> :
             <EyeSlashIcon height={20} width={20} aria-hidden="true"/>}
          </span>
        </div>

        <input
          type="submit"
          value='Iniciar Sesión'
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 rounded-md text-white font-black  text-xl cursor-pointer"
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link to="/auth/register" className="text-center text-gray-300 font-normal">
            ¿No tienes una cuenta? <span className="text-fuchsia-600 font-bold">Regístrate</span>
        </Link>
        <Link to="/auth/forgot-password" className="text-center text-gray-300 font-normal">
            ¿Olvidaste tu contraseña? <span className="text-fuchsia-600 font-bold">Restablecer</span>
        </Link>
      </nav>
    </>
  )
}