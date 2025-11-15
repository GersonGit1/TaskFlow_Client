import { isAxiosError } from "axios";
import type { UpdatePasswordForm, UserProfileForm } from "../types";
import api from "../lib/axios";

export async function UpdataProfile(formData : UserProfileForm) {
    try {
        const {data} = await api.put<string>('/auth/profile', formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function UpdatePassword(formData : UpdatePasswordForm) {
    try {
        const {data} = await api.post<string>('/auth/update-password', formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}