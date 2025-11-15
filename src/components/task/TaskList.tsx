import { statusTranslations } from "../../localization/es";
import { DndContext,PointerSensor,useSensors,useSensor, type DragEndEvent, DragOverlay, type UniqueIdentifier, useDroppable } from "@dnd-kit/core";
import type { Project, TaskProject, TaskStatus } from "../../types"
import DropTask from "./DropTask";
import TaskCard from "./TaskCard";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStatus } from "../../services/TaskApi";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMemo, useState } from "react";

type TaskListProps = {
  tasks: TaskProject[],
  canEdit: boolean
}

type groupedTask = {
  [key : string] : TaskProject[]
}

const initialStatusGroups : groupedTask = {
  pending: [] as [],
  onHold: [] as [],
  inProgress: [] as [],
  underReview: [] as [],
  completed: [] as []
}



const statusStyle :{[key:string] : string} ={
  pending: 'border-slate-300',
  onHold: 'border-red-300',
  inProgress: 'border-blue-300',
  underReview: 'border-amber-300',
  completed: 'border-emerald-300'
}



export default function TaskList({tasks, canEdit}: TaskListProps) {

  const queryClient = useQueryClient();
  const params = useParams();
  const projectId = params.projectId!;
  const navigate = useNavigate();
  const location = useLocation();
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const {mutate} = useMutation({
    mutationFn: updateStatus,
    onError: (error) => {
        toast.error(error.message);
    },
    onSuccess: (data) => {
        queryClient.invalidateQueries({queryKey: ['editProject', projectId]}); //invalidar la query para que se vuelva a ejecutar y traiga los datos actualizados
        toast.success(data);
        navigate(location.pathname,{ replace:true });
    }
  });

  const handleDragEnd = (e : DragEndEvent)=>{
    const {over, active} = e;

    if (over && over.id) {
      const taskId = active.id.toString();
      const status = over.id as TaskStatus;
      mutate({projectId, taskId, status});

      queryClient.setQueryData(['editProject',projectId], (prevTask : Project)=>{
        const updatedTask= prevTask.tasks.map((task)=>{
          if (task._id === taskId) {
            return {
              ...task,
              status
            }
          }
          return task;
        });

        return {
          ...prevTask,
          tasks : updatedTask
        }
      });
    }
  }


  const groupedTasks = tasks.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task]
    return { ...acc, [task.status]: currentGroup };
  }, initialStatusGroups);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  // Encuentra la task por id dentro de groupedTasks
  const findTaskById = (id: UniqueIdentifier | null): TaskProject | null => {
    if (!id) return null;
    for (const [, tasks] of Object.entries(groupedTasks)) {
      const found = tasks.find((t) => t._id === id);
      if (found) return found;
    }
    return null;
  };


  const activeTask: TaskProject | null = useMemo(
    () => findTaskById(activeId),
    [activeId, groupedTasks]
  );


  return (
    <>
      <h2 className="text-5xl font-black my-10">Tareas</h2>

      <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
        <DndContext sensors={sensors}
        onDragStart={({ active }) => setActiveId(active.id)}
        onDragEnd={(event) => {
          setActiveId(null);
          handleDragEnd(event);
        }}
        onDragCancel={() => setActiveId(null)}>
          {Object.entries(groupedTasks).map(([status, tasks]) => {
            const { isOver, setNodeRef } = useDroppable({ id: status });
            return  (
              <div key={status} ref={setNodeRef} 
                        className={`min-w-[300px] 2xl:min-w-0 2xl:w-1/5 transition-all ${
                          isOver ? "bg-slate-100 scale-[1.02]" : ""
                        }`}>
                  <h3 className={`capitalize text-xl font-light border ${statusStyle[status]} bg-white p-3 border-t-8`}>{statusTranslations[status]}</h3>
                  <DropTask status={status}/>
                  <ul className='mt-5 space-y-5'>
                      {tasks.length === 0 ? (
                          <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
                      ) : (
                          tasks.map(task => <TaskCard key={task._id} task={task} canEdit={canEdit}/>)
                      )}
                  </ul>
              </div>)
          })}
          <DragOverlay>
            {activeTask ? (
              <TaskCard key={activeTask._id} task={activeTask} canEdit={canEdit}/>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </>
  )
}
