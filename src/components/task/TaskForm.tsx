import type { FieldErrors, UseFormRegister } from "react-hook-form"
import type { TaskFormData } from "../../types"
import CustomInput from "../CustomImput"

type TaskFormProps = {
    errors: FieldErrors<TaskFormData>
    register: UseFormRegister<TaskFormData>
}

export default function TaskForm({errors, register} : TaskFormProps) {
    return (
        <>
            <div className="flex flex-col gap-5">
                <label className="font-normal text-2xl"
                    htmlFor="name">
                    Nombre de la tarea
                </label>
                <div>
                    <input id="name" type="text" placeholder="Nombre de la tarea" autoComplete="off"
                        className={`w-full p-3 border rounded-md outline-none transition-all
                        ${errors.name 
                        ? "border-red-600 focus:border-red-700 focus:ring-1 focus:ring-red-400"
                        : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200"}`}
                        {...register("name", {
                            required: "El nombre de la tarea es obligatorio",
                        })}
                    />              
                    {errors.name && (
                        <p className="text-red-500 text-right">{errors.name.message}</p>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-5">
                <label
                    className="font-normal text-2xl"
                    htmlFor="description"
                >Descripción de la tarea</label>
                <CustomInput id="description" placeholder="Descripción de la tarea"
                         key={"description"} as="textarea"
                        register={register("description", {
                            required: "La descripción de la tarea es obligatoria"
                        })} error={errors.description}/>
            </div>
        </>
    )
}