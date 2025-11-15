import { useMemo } from "react"
import { useAuth } from "../../hooks/useAuth"
import type { Note } from "../../types"
import { formatDate } from "../../utils/utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { DeleteNote } from "../../services/NoteApi"
import { toast } from "react-toastify"
import { useLocation, useParams } from "react-router-dom"

type NoteDetailProps = {
    note : Note
}

export default function NoteDetail({ note }: NoteDetailProps) {
    const {data, isLoading} = useAuth();
    const canDelete = useMemo(() => data?._id === note.createdBy._id, [data]);
    const params = useParams();
    const location = useLocation();
    const queryCLient = useQueryClient();
    const projectId = params.projectId!;
    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get('viewTask')!;


    const {mutate} = useMutation({
        mutationFn: DeleteNote,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            queryCLient.invalidateQueries({queryKey: ['task', taskId]}); //invalidar la query para que se vuelva a ejecutar y traiga los datos actualizados
        }
    });


    if(isLoading) return <p>Loading...</p>;

  if(data)
    return (
        <div className="p-3 flex justify-between items-center">
            <div>            
                <p>
                    {note.content} by: <span className="font-bold">{note.createdBy.email}</span>
                </p>
                <p className="text-xl text-slate-500">
                    {formatDate(note.createdAt)}
                </p>               
            </div>
            {canDelete && (
                    <button
                        type="button"
                        className="text-xs text-white bg-red-400 hover:bg-red-500 p-2 rounded-lg font-bold cursor-pointer transition-colors"
                        onClick={() => mutate({taskId, projectId, noteId: note._id})}
                    >Delete</button>
                )}
        </div>
    )
}
