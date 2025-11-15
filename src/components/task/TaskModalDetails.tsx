import { Fragment } from 'react';
import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTaskById, updateStatus } from '../../services/TaskApi';
import { toast } from 'react-toastify';
import { formatDate } from '../../utils/utils';
import { statusTranslations } from '../../localization/es';
import type { TaskStatus } from '../../types';
import NotesPanel from '../notes/NotesPanel';


export default function TaskModalDetails() {
    const queryClient = useQueryClient();
    const params = useParams();
    const projectId = params.projectId!;
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get('viewTask')!;
    const showModal = !!taskId;

    const {data, isError, error} = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTaskById({projectId,taskId}), //fetch task details by id
        enabled: !!taskId, //The query is only executed if taskId has a value (not null or undefined)
        retry: false //Do not retry if the quety fails once
    });

    const {mutate} = useMutation({
        mutationFn: updateStatus,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['editProject', projectId]}); //invalidar la query para que se vuelva a ejecutar y traiga los datos actualizados
            queryClient.invalidateQueries({queryKey: ['task', taskId]}); //invalidar la query para que se vuelva a ejecutar y traiga los datos actualizados
            toast.success(data);
            navigate(location.pathname,{ replace:true });
        }
    });
   const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value as TaskStatus;
        mutate({projectId, taskId, status: newStatus});
   } 
    if(isError) {
        toast.error((error as Error).message,
        {toastId: 'task-modal-error'} //evitar que se muestren múltiples toasts iguales debido a re-renders de React
    );
        return <Navigate to={`/projects/${projectId}`}/>
    }

    if(data)
    return (
        <>
            <Transition appear show={showModal} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname,{replace: true}) }>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    <p className='text-sm text-slate-400'>Agregada el: {formatDate(data.createdAt)}</p>
                                    <p className='text-sm text-slate-400'>Última actualización: {formatDate(data.updatedAt)}</p>
                                    <DialogTitle
                                        as="h3"
                                        className="font-black text-4xl text-slate-600 my-5"
                                    >
                                        {data.name}
                                    </DialogTitle>
                                    <p className='text-lg text-slate-500 mb-2'>Descripción: {data.description}</p>

                                    {data.completedBy.length > 0 ? (
                                        <>                                     
                                            <p className='font-bold text-2xl text-slate-600 mb-5'>change history</p>
                                            
                                            <ul className="list-decimal">
                                                {data.completedBy.map((activityLog) =>(
                                                    <li key={activityLog._id}>
                                                        {activityLog.user.name}{': '}
                                                        <span className="font-bold text-slate-600">
                                                            {statusTranslations[activityLog.status]}</span>                                                      
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    ) : null}

                                    <div className='my-5 space-y-3'>
                                        <label className='font-bold'>Estado Actual:</label>

                                        <select name="" id="" 
                                            onChange={handleStatusChange}
                                            className="w-full p-3 bg-white border border-slate-300 cursor-pointer rounded-md"
                                            defaultValue={data.status}>
                                            {Object.entries(statusTranslations).map(([key, value]) => (
                                                
                                                <option key={key} value={key} >{value}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <NotesPanel notes={data.notes} />
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}