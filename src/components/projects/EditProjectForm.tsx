import { Link, useNavigate } from "react-router-dom";
import ProjectForm from "../../components/projects/ProjectForm";
import type { Project, projectFormData } from "../../types";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "../../services/ProjectApi";
import { toast } from "react-toastify";

type EditProjectFormProps = {
  data : projectFormData,
  projectId : Project['_id']
}

export default function EditProjectForm({data, projectId}:EditProjectFormProps) {
    const navigate = useNavigate();    
    const {register, handleSubmit, formState : {errors}} = useForm({defaultValues: {
      projectName: data.projectName,
      clientName : data.clientName,
      description : data.description
    }});

    const queryClient = useQueryClient();
    const {mutate } = useMutation({
      mutationFn: updateProject,
      onError: (error)=>{
        toast.error(error.message);
      },
      onSuccess: (data)=>{
        queryClient.invalidateQueries({queryKey : ['editProject',projectId]});
        queryClient.invalidateQueries({queryKey : ['projects']});
        toast.success(data)
        navigate('/');
      }
    })

    const handleForm = (formData:projectFormData) =>{
      const data = {
        formData,
        projectId
      }
      mutate(data);
      
    }
  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Edit project</h1>
        <p className="text-2xl font-ligth text-gray-500 mt-5">Fill out this form to edit a project</p>

        <nav className="mt-5">
          <Link className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl 
            font-bold cursor-pointer transition-colors" to={'/'}>
              Projects
          </Link>
        </nav>

        <form className="mt-10 shadow-lg bg-white rounded-10 p-10"
          onSubmit={handleSubmit(handleForm)} noValidate>

          <ProjectForm errors={errors} register={register}/>

          <input type="submit" 
          value="Edit project" className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3
          text-white uppercase font-bold cursor-pointer rounded-md transition-colors"/>

        </form>
      </div>
    </>
  )
}
