import { isAxiosError } from "axios";
import { taskSchema, type Project, type Task, type TaskFormData } from "../types";
import api from "../lib/axios";

type TaskRequest = {
    formData: TaskFormData;
    projectId: Project['_id'];
    taskId: Task['_id'];
    status: Task['status'];
}

export async function createTask({formData, projectId}: Pick<TaskRequest, 'formData' | 'projectId'>) {
    try {
        const url = `/projects/${projectId}/tasks`;
        const { data } = await api.post<string>(url, formData);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error || 'Error al crear la tarea');
        }
    }
}

export async function getTaskById({projectId, taskId}: Pick<TaskRequest, 'projectId' | 'taskId'>) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`;        
        const { data } = await api.get(url);
        const response = taskSchema.safeParse(data);
        if(response.success){
            return response.data;
        }
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error || 'Error al obtener la tarea');
        }
    }
}

export async function updateTask({formData, projectId, taskId}: Pick<TaskRequest, 'formData' | 'projectId' | 'taskId'>) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`;
        const { data } = await api.put<string>(url, formData);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error || 'Error al actualizar la tarea');
        }
    }
}

export async function deleteTask({projectId, taskId}: Pick<TaskRequest, 'projectId' | 'taskId'>) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`;
        const { data } = await api.delete<string>(url);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error || 'Error al eliminar la tarea');
        }
    }
}

export async function updateStatus({projectId, taskId, status}: Pick<TaskRequest, 'projectId' | 'taskId' | 'status'>) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}/status`;
        const { data } = await api.patch<string>(url, {status});
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error || 'Error al cambiar el estado de la tarea');
        }
    }
}