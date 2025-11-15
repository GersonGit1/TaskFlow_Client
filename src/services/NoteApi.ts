import { isAxiosError } from "axios";
import type { Note, NoteFormData, Project, Task } from "../types";
import api from "../lib/axios";

type NodeApiType = {
    formData: NoteFormData,
    taskId: Task['_id'],
    projectId: Project['_id'],
    noteId: Note['_id']
}

export async function CreateNote({formData, taskId, projectId}:Pick<NodeApiType, 'formData' | 'taskId' | 'projectId'>) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}/notes`;
        const {data} = await api.post<string>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function DeleteNote({taskId, projectId, noteId}:Pick<NodeApiType,'taskId' | 'projectId' | 'noteId'>) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}/notes/${noteId}`;
        const {data} = await api.delete<string>(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}