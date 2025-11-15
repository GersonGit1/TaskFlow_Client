import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import type { ForgotPasswordForm } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { ForgotPassword } from "../../services/AuthApi";
import { toast } from "react-toastify";
import CustomInput from "../../components/CustomImput";
export default function ForgotPasswordView() {
  const initialValues: ForgotPasswordForm = {
    email: ''
  }
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

  const {mutate} = useMutation({
    mutationFn: ForgotPassword,
    onError: (error) => {
        toast.error(error.message);
    },
    onSuccess: (data) => {
        toast.success(data);
        reset();
    }
  });
  
  const handleForgotPassword = (formData: ForgotPasswordForm) => mutate(formData);


  return (
    <>
      <h1 className="text-5xl font-black text-white text-center">Restablecer password</h1>
      <p className="text-2xl font-light text-white mt-5 text-center">
        Coloca tu email y {''}
        <span className=" text-fuchsia-500 font-bold"> Restablece tu password</span>
      </p>
      <form
        onSubmit={handleSubmit(handleForgotPassword)}
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

        <input
          type="submit"
          value='Enviar Instrucciones'
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 rounded-md text-white font-black  text-xl cursor-pointer"
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to='/auth/login'
          className="text-center text-gray-300 font-normal"
        >
          ¿Ya tienes cuenta? <span className="text-fuchsia-600 font-bold">Iniciar Sesión</span> 
        </Link>

        <Link
          to='/auth/register'
          className="text-center text-gray-300 font-normal"
        >
          ¿No tienes cuenta? <span className="text-fuchsia-600 font-bold">Crea una</span> 
        </Link>
      </nav>
    </>
  )
}