import { useForm } from 'react-hook-form';
import type { NoteFormData } from '../../types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateNote } from '../../services/NoteApi';
import { toast } from 'react-toastify';
import { useLocation, useParams } from 'react-router-dom';

export default function AddNoteForm() {
    const params = useParams();
    const location = useLocation();
    const queryCLient = useQueryClient();
    const projectId = params.projectId!;
    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get('viewTask')!;
    const initialValues : NoteFormData = {
        content: ''
    };
    const {register,reset, handleSubmit, formState:{errors}} = useForm({defaultValues: initialValues});

    const {mutate} = useMutation({
        mutationFn: CreateNote,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            reset();
            queryCLient.invalidateQueries({queryKey: ['task', taskId]}); //invalidar la query para que se vuelva a ejecutar y traiga los datos actualizados
        }
    });

    const handleAddNote = (formData: NoteFormData) => {
        mutate({formData, taskId, projectId});
    }
  return (
    <form className='space-y-3'
        onSubmit={handleSubmit(handleAddNote)}
        noValidate>
        <div className="flex flex-col gap-2">
            <label htmlFor="content" className="font-bold">Add note</label>
            <div>
                <textarea
                    id="content"
                    className={`w-full p-3 border rounded-md outline-none transition-all
                    ${errors.content 
                    ? "border-red-600 focus:border-red-700 focus:ring-1 focus:ring-red-400"
                    : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200"}`}
                    placeholder="Note content"
                    rows={3}
                    {...register('content', {required: 'Content is required',
                        pattern: {value : /\S+/, message: 'Content Can not be empty'}
                    })}
                ></textarea>
                {errors.content && <p className="text-red-500 text-right">{errors.content.message}</p>}
            </div>
        </div>
        <input
            type="submit"
            value="Save Note"
            className="bg-fuchsia-600 hover:bg-fuchsia-700 transition-colors w-full p-2
             text-white font-bold uppercase cursor-pointer rounded-md"
        />
    </form>
  )
}
