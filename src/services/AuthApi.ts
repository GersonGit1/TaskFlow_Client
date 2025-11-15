import api from "../lib/axios";
import { isAxiosError } from "axios";
import { userSchema, type checkPasswordForm, type ConfirmToken, type ForgotPasswordForm, type NewPasswordForm, type RequestConfirmationCodeForm, type UserLoginForm, type UserRegisterForm } from "../types";

export async function CreateAccount(formData: UserRegisterForm) {
    try {
        const url = "/auth/create-account";
        const { data } = await api.post(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data?.error || 'Error al crear la cuenta, intenta de nuevo');
        }
        throw new Error('Error no controlado, intenta de nuevo');
    }
}

export async function ConfirmAccount(formData: ConfirmToken) {
    try {
        const url = "/auth/confirm-account";
        const { data } = await api.post(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            return {
                data: null,
                error: error.response?.data?.error || 'Error al crear la cuenta, intenta de nuevo'
            }
        }
        return {
            data: null,
            error: 'Error no controlado, intenta de nuevo'
        }
    }
}

export async function GetConfirmationCode(formData: RequestConfirmationCodeForm) {
    try {
        const url = "/auth/request-code";
        const { data } = await api.post(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data?.error || 'Error al enviar el código, intenta de nuevo');
        }
        throw new Error('Error no controlado, intenta de nuevo');
    }
}

export async function Login(formData: UserLoginForm) {
    try {
        const url = "/auth/login";
        const { data } = await api.post(url, formData);
        localStorage.setItem('uptask_token', data);
        return data;
    } catch (error) {        
        if (isAxiosError(error)) {
            throw new Error(error.response?.data?.error ||'Error iniciar sesión, intenta de nuevo');          
        }
    }
}

export async function ForgotPassword(formData: ForgotPasswordForm) {
    try {
        const url = "/auth/forgot-password";
        const { data } = await api.post(url, formData);
        return data;
    } catch (error) {        
        if (isAxiosError(error)) {
            throw new Error(error.response?.data?.error ||'Error al crear la cuenta, intenta de nuevo');          
        }
    }
}

export async function ValidateToken(formData: ConfirmToken) {
    try {
        const url = "/auth/validate-token";
        const { data } = await api.post(url, formData);
        return data;
    } catch (error) {        
        if (isAxiosError(error)) {
            throw new Error(error.response?.data?.error ||'Error al crear la cuenta, intenta de nuevo');          
        }
    }
}

export async function UpdatePasswordWithToken({formData, token}: {formData: NewPasswordForm, token: ConfirmToken['token']}) {
    try {
        const url = `/auth/update-password/${token}`;
        const { data } = await api.post(url, formData);
        localStorage.setItem('uptask_token', data);
        return data;
    } catch (error) {        
        if (isAxiosError(error)) {
            throw new Error(error.response?.data?.error ||'Error al crear la cuenta, intenta de nuevo');          
        }
    }
}

export async function getUser(){
    try {        
        const {data} = await api.get('/auth/user');
        const response = userSchema.safeParse(data);
        if(response.success){
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data?.error ||'Error al crear la cuenta, intenta de nuevo');          
        }
    }
}

export async function checkPassword(formData : checkPasswordForm){
    try {
        const url = '/auth/check-password';
        const {data} = await api.post(url,formData);
        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data?.error ||'Error al crear la cuenta, intenta de nuevo');          
        }
    }
}