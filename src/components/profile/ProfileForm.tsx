import { useForm } from "react-hook-form"
import type { User, UserProfileForm } from "../../types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { UpdataProfile } from "../../services/ProfileApi"
import { toast } from "react-toastify"
import CustomInput from "../CustomImput"

type ProfileFormProps = {
    data : User
}

export default function ProfileForm({ data }: ProfileFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: data })

    const queryClient = useQueryClient()
    const {mutate} = useMutation({
        mutationFn: UpdataProfile,
        onError: (error) => toast.error(error.message),
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({queryKey: ['user']})
        }
    });

    const handleEditProfile = (formData : UserProfileForm) => mutate(formData)

    return (
        <>
            <div className="mx-auto max-w-3xl g">
                <h1 className="text-5xl font-black ">Mi Perfil</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">Aquí puedes actualizar tu información</p>

                <form
                    onSubmit={handleSubmit(handleEditProfile)}
                    className=" mt-14 space-y-5  bg-white shadow-lg p-10 rounded-l"
                    noValidate
                >
                    <div className="mb-5 space-y-3">
                        <label
                            className="text-sm uppercase font-bold"
                            htmlFor="name"
                        >Nombre</label>
                        <CustomInput id="name" placeholder="Tu nombre" key={"name"}  register={register("name", {
                            required: "Nombre de usuario es obligatoro",
                        })} error={errors.name}/>
                    </div>

                    <div className="mb-5 space-y-3">
                        <label
                            className="text-sm uppercase font-bold"
                            htmlFor="email"
                        >E-mail</label>
                        <CustomInput id="email" placeholder="Your email" key={"email"}
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
                        value='Guardar Cambios'
                        className="bg-fuchsia-600 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-700 cursor-pointer transition-colors rounded-md"
                    />
                </form>
            </div>
        </>
    )
}