import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react"
import { Fragment } from "react"
import type { TaskProject } from "../../types"
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid"
import { useNavigate, useParams } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteTask } from "../../services/TaskApi"
import { toast } from "react-toastify"
import {useDraggable} from "@dnd-kit/core";

type TaskCardProps = {
    task: TaskProject,
    canEdit: boolean
}

export default function TaskCard({task, canEdit}: TaskCardProps) {
    const navigate = useNavigate();
    const params = useParams();
    const projectId = params.projectId!;
    const queryClient = useQueryClient();

    const {attributes, listeners, setNodeRef} = useDraggable({id: task._id});

    const {mutate} = useMutation({
        mutationFn: deleteTask,
        onError: (error) => {
            toast.error(error.message);   
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['editProject', projectId]}); //invalidar la query para que se vuelva a ejecutar y traiga los datos actualizados
            toast.success(data);
        }
    })
  return (
    <li className="p-5 bg-white border-slate-300 flex justify-between gap-3 rounded-md shadow-md">
        <div className="min-w-0 flex flex-col gap-y-4 cursor-grab"
            {...attributes}
            {...listeners}
            ref={setNodeRef}
        >
            <button type='button' onClick={()=> navigate(location.pathname + `?viewTask=${task._id}`)}
             className="text-xl font-bold text-slate-700 text-left hover:underline cursor-pointer">
                {task.name}
            </button>
            <p className="text-sm text-slate-500 text-left">{task.description}</p>
        </div>
        <div className="flex shrink-0  gap-x-6">
            <Menu as="div" className="relative flex-none">
                <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                    <span className="sr-only">opciones</span>
                    <EllipsisVerticalIcon className="h-9 w-9 cursor-pointer" aria-hidden="true" />
                </MenuButton>
                <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                    <MenuItems
                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                        <MenuItem>
                            <button type='button' 
                                onClick={()=> navigate(location.pathname + `?viewTask=${task._id}`)}
                                className='block px-3 py-1 text-sm leading-6 text-gray-900 cursor-pointer'>
                                Ver Tarea
                            </button>
                        </MenuItem>
                        {canEdit && (
                            <>                           
                                <MenuItem>
                                    <button type='button'
                                        onClick={()=> navigate(location.pathname + `?editTask=${task._id}`)}
                                        className='block px-3 py-1 text-sm leading-6 text-gray-900 cursor-pointer'>
                                        Editar Tarea
                                    </button>
                                </MenuItem>
                                <MenuItem>
                                    <button type='button' 
                                        onClick={() => mutate({projectId: projectId, taskId: task._id})}
                                    className='block px-3 py-1 text-sm leading-6 text-red-500 cursor-pointer'>
                                        Eliminar Tarea
                                    </button>
                                </MenuItem>
                            </>
                        )}
                    </MenuItems>
                </Transition>
            </Menu>
        </div>
    </li>
  )
}
