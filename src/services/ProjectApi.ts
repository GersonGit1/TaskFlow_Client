import { isAxiosError } from "axios";
import api from "../lib/axios";
import { dashboardProjectSchema, editProjectSchema, projectSchema, type Project, type projectFormData } from "../types";

type projectApiType = {
    formData: projectFormData,
    projectId : Project['_id']
}

type messageResponse = {
    message : string
}

type createProjectResponse = {
    data : messageResponse
}

export const createProject = async (formData : projectFormData) => {
    try {
        const {projectName,clientName,description} = formData;
        const {data} : createProjectResponse = await api.post('/projects',{projectName,clientName,description});
        return data.message;        
    } catch (error) {        
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export const getProjects = async () => {
    try {        
        const {data} = await api.get('/projects');        
        const response = dashboardProjectSchema.safeParse(data);   
             
        if (response.success) {
            return response.data;
        }
    } catch (error) {        
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    } 
}

export const getProjectById = async (id : Project['_id']) => {
    try {                
        const {data} = await api.get(`/projects/${id}`);                
        const response = editProjectSchema.safeParse(data);                
        if (response.success) {            
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    } 
}

export const getFullProjectById = async (id : Project['_id']) => {
    try {                
        const {data} = await api.get(`/projects/${id}`);                
        const response = projectSchema.safeParse(data);                
        if (response.success) {            
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    } 
}

export const updateProject = async ({formData, projectId}:projectApiType) => {
    try {        
        const {data} = await api.put<string>(`/projects/${projectId}`, formData);        
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    } 
}

export const deleteProject = async (id : Project['_id']) => {
    try {        
        const {data} = await api.delete<string>(`/projects/${id}`);        
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    } 
}