import type { ConfirmToken, NewPasswordForm } from "../../types";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { UpdatePasswordWithToken } from "../../services/AuthApi";
import { toast } from "react-toastify";
import { useState } from "react";
import CustomInput from "../CustomImput";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";

type NewPasswordFormProps = {
    token : ConfirmToken['token']
}

export default function NewPasswordForm({ token }: NewPasswordFormProps) {
    const navigate = useNavigate()
    const initialValues: NewPasswordForm = {
        password: '',
        password_confirmation: '',
    }
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm({ defaultValues: initialValues });

    const {mutate} = useMutation({
        mutationFn: UpdatePasswordWithToken,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            navigate('/auth/login');
        }
    });

    const handleNewPassword = (formData: NewPasswordForm) => {
        const data = {formData, token};
        mutate(data);       
    }

    const password = watch('password');

    return (
        <>
            <form
                onSubmit={handleSubmit(handleNewPassword)}
                className="space-y-8 p-10  bg-white mt-10"
                noValidate
            >

                <div className="flex flex-col gap-5 relative">
                    <label
                        className="font-normal text-2xl"
                    >Password</label>
                    <CustomInput id="password" type={showPassword ? 'text' : 'password'}
                        placeholder="Your password" key={"password"}  register={register("password", {
                        required: "Password is required",
                    })} error={errors.password}/>
                    <span
                        className="absolute right-4 top-17 transform cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeIcon height={20} width={20} aria-hidden="true"/> :
                        <EyeSlashIcon height={20} width={20} aria-hidden="true"/>}
                    </span>
                </div>

                <div className="flex flex-col gap-5 relative">
                    <label
                        className="font-normal text-2xl"
                    >Repeat Password</label>                  
                    <CustomInput id="password_confirmation" type={showRepeatPassword ? 'text' : 'password'}
                        placeholder="Your password" key={"password"}  register={register("password_confirmation", {
                            required: "You must repeat the password",
                            validate: value => value === password || 'Passwords are not equals'
                        })} error={errors.password_confirmation}/>
                    <span
                        className="absolute right-4 top-17 transform cursor-pointer"
                        onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                    >
                        {showRepeatPassword ? <EyeIcon height={20} width={20} aria-hidden="true"/> :
                        <EyeSlashIcon height={20} width={20} aria-hidden="true"/>}
                    </span>
                </div>

                <input
                    type="submit"
                    value='Change Password'
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer rounded-lg"
                />
            </form>
        </>
    )
}