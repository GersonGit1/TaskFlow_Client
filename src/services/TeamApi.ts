import { isAxiosError } from "axios";
import { memberSchemas, type Project, type TeamMember, type TeamMemberForm } from "../types";
import api from "../lib/axios";

export async function findUserByEmail({projectId, formdata}: {projectId: Project['_id'], formdata: TeamMemberForm}) {
    try {
        const url = `/projects/${projectId}/team/find`;
        const data = await api.post(url, formdata);       
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {           
            throw new Error(error.response.data.error);
        }
    }
}

export async function addMemberToProject({projectId, userId}: {projectId: Project['_id'], userId: TeamMember['_id']}) {
    try {
        const url = `/projects/${projectId}/team`;        
        const {data} = await api.post(url, {id : userId});      
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {            
            throw new Error(error.response.data.error);
        }
    }
}

export async function getProjectTeam(projectId: Project['_id']) {
    try {
        const url = `/projects/${projectId}/team`;        
        const {data} = await api.get(url);
        const response = memberSchemas.safeParse(data);
        if(response.success) {
            return response.data;
        }      
    } catch (error) {
        if (isAxiosError(error) && error.response) {            
            throw new Error(error.response.data.error);
        }
    }
}

export async function removeMemberFromProject({projectId, userId}: {projectId: Project['_id'], userId: TeamMember['_id']}) {
    try {
        const url = `/projects/${projectId}/team/${userId}`;        
        const {data} = await api.delete<string>(url);      
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {            
            throw new Error(error.response.data.error);
        }
    }
}