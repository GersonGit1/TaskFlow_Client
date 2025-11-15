import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import ProjectForm from "../../components/projects/ProjectForm";
import type { projectFormData } from "../../types";
import { createProject } from "../../services/ProjectApi";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

export default function CreateProjectView() {

  const navigate = useNavigate();
  const initialValues : projectFormData = {
    projectName: "",
    clientName : "",
    description : ""
  }
  const {register, handleSubmit, formState : {errors}} = useForm({defaultValues: initialValues});

  const {mutateAsync} = useMutation({
    mutationFn : createProject,//assign parameters when calling the function
    onError : (error)=>{
      toast.error(error.message);
    },
    onSuccess: (data)=>{
      toast.success(data);// send notification
      navigate('/');
    }
  })

  const handleForm = async (formData : projectFormData)=>  await mutateAsync(formData);
  
  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Create project</h1>
        <p className="text-2xl font-ligth text-gray-500 mt-5">Fill out this form to create a project</p>

        <nav className="mt-5">
          <Link className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl 
            font-bold cursor-pointer transition-colors rounded-lg" to={'/'}>
              Projects
          </Link>
        </nav>

        <form className="mt-10 shadow-lg bg-white rounded-10 p-10"
          onSubmit={handleSubmit(handleForm)} noValidate>

          <ProjectForm errors={errors} register={register}/>

          <input type="submit" 
          value="Create project" className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3
          text-white uppercase font-bold cursor-pointer transition-colors rounded-md"/>

        </form>
      </div>
    </>
  )
}
