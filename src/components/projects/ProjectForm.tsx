import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { projectFormData } from "../../types";
import CustomInput from "../CustomImput";

type ProjectFormProps = {
    register: UseFormRegister<projectFormData>,
    errors: FieldErrors<projectFormData>
}

export default function ProjectForm({errors, register}: ProjectFormProps) {
    return (
        <>
            <div className="mb-5 space-y-3">
                <label htmlFor="projectName" className="text-sm uppercase font-bold">
                    Project Name
                </label>              
                <CustomInput id="projectName" placeholder="Your project's name" key={"projectName"}  register={register("projectName", {
                    required: "Project name is required",
                })} error={errors.projectName}/>
            </div>

            <div className="mb-5 space-y-3">
                <label htmlFor="clientName" className="text-sm uppercase font-bold">
                    Customer Name
                </label>
                <CustomInput id="clientName" placeholder="Your client name" key={"clientName"}  register={register("clientName", {
                    required: "Client name is required",
                })} error={errors.clientName}/>
            </div>

            <div className="mb-5 space-y-3">
                <label htmlFor="description" className="text-sm uppercase font-bold">
                    Description
                </label>
                <CustomInput id="description" as="textarea" placeholder="Your project's description" key={"description"}  register={register("description", {
                    required: "Description is required",
                })} error={errors.description}/>               
            </div>
        </>
    )
}