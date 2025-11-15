import { useQuery } from '@tanstack/react-query';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { getFullProjectById } from '../../services/ProjectApi';
import AddTaskModal from '../../components/task/AddTaskModal';
import TaskList from '../../components/task/TaskList';
import EditTaskData from '../../components/task/EditTaskData';
import TaskModalDetails from '../../components/task/TaskModalDetails';
import { useAuth } from '../../hooks/useAuth';
import { isManager } from '../../utils/policies';
import { useMemo } from 'react';
import Spinner from '../../components/Spinner';

export default function ProjectDetailsView() {

    const navigate = useNavigate();
    const params = useParams();
    const projectId = params.projectId!    
    const {data, isLoading, isError} = useQuery({
        queryKey:['editProject',projectId], //queryKey should be unique in the application
        queryFn : () => getFullProjectById(projectId) //no hacer reintentos si falla una vez la consulta
    });
    
    const {data : user, isLoading: isUserLoading} = useAuth();
    const  canEdit = useMemo(() => user?._id === data?.manager, [user, data]);

    if (isLoading || isUserLoading ) return <Spinner/>;
    if (isError) return <Navigate to={'/404'}/>
    if (data && user) {
        return  (
            <>
                <h1 className="text-5xl font-black">{data.projectName}</h1>
                <p className="font-2xl font-light mt-5 text-gray-500">{data.description}</p>

                {isManager(user._id,data.manager) && (                   
                    <nav className="my-5 flex gap-3">
                        <button className='bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white
                        text-xl font-bold cursor-pointer transition-colors rounded-lg' onClick={()=>navigate('?newTask=true')}>
                            Add Task
                        </button>
                        <Link to={"team"} className='bg-fuchsia-600 hover:bg-fuchsia-700 px-10 py-3 text-white
                        text-xl font-bold cursor-pointer transition-colors rounded-lg'>
                            Collaborators
                        </Link>
                    </nav>
                )}
                
                <TaskList tasks={data.tasks} canEdit={canEdit}/>
                <AddTaskModal />
                <EditTaskData />
                <TaskModalDetails />
            </>
        )
    }
}
