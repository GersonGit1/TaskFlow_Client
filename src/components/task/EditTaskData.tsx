import { useQuery } from "@tanstack/react-query";
import { Navigate, useLocation, useParams } from "react-router-dom"
import { getTaskById } from "../../services/TaskApi";
import EditTaskModal from "./EditTaskModal";

export default function EditTaskData() {

    const params = useParams();
    const projectId = params.projectId!;
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get('editTask')!;

    const {data, isError} = useQuery({
        queryKey: ['task', projectId, taskId],
        queryFn: () => getTaskById({projectId, taskId: taskId!}),
        enabled: !!taskId, //la consulta solo se ejecuta si taskId tiene un valor (no es null ni undefined)
        retry: false //no hacer reintentos si falla una vez la consulta
    });

    if(isError) return <Navigate to={'/404'}/>
    if(data)
    return <EditTaskModal task={data} taskId={taskId} />
}
