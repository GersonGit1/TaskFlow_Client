import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import type { TeamMemberForm } from "../../types";
import { findUserByEmail } from "../../services/TeamApi";
import SearchResult from "./SearchResult";
import CustomInput from "../CustomImput";

export default function AddMemberForm() {
    const initialValues: TeamMemberForm = {
        email: ''
    }
    const params = useParams()
    const projectId = params.projectId!

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

    const mutation = useMutation({
        mutationFn: findUserByEmail
    })

    const handleSearchUser = async (formdata : TeamMemberForm) => {
        const data = {projectId, formdata};
        mutation.mutate(data)
    }

    const resetData = () => {
        reset();
        mutation.reset();
    }

    return (
        <>

            <form
                className="mt-10 space-y-5"
                onSubmit={handleSubmit(handleSearchUser)}
                noValidate
            >

                <div className="flex flex-col gap-3">
                    <label
                        className="font-normal text-2xl"
                        htmlFor="name"
                    >E-mail de Usuario</label>
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
                    className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black rounded-md text-xl cursor-pointer"
                    value='Buscar Usuario'
                />
            </form>

            <div className="mt-10">
                {mutation.isPending && <p className="text-center">Buscando Usuario...</p>}
                {mutation.isError && <p className="text-center">{mutation.error.message}</p>}
                {mutation.data && <SearchResult user={mutation.data.data} reset={resetData}/>}
            </div>
        </>
    )
}