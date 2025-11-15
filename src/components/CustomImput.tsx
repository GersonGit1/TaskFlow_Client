import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface CustomInputProps {
  id: string;
  type?: string;
  as?: "input" | "textarea";
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

export default function CustomInput({
  id,
  type = "text",
  as = "input",
  placeholder,
  register,
  error,
}: CustomInputProps) {

    if(as === "textarea"){
        return (
                <div>
                    <textarea
                        id={id}
                        placeholder={placeholder}
                        className={`w-full p-3 border rounded-md outline-none transition-all
                        ${error
                            ? "border-red-600 focus:border-red-700 focus:ring-1 focus:ring-red-400"
                            : "border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-200"}`}
                        {...register}
                    />
                    {error && (
                        <p className="text-red-500 text-right text-sm mt-1">{error.message}</p>
                    )}
                </div>
            );
    }

    return (
        <div>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                className={`w-full p-3 border rounded-md outline-none transition-all
                ${error
                    ? "border-red-600 focus:border-red-700 focus:ring-1 focus:ring-red-400"
                    : "border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-200"}`}
                {...register}
            />
            {error && (
                <p className="text-red-500 text-right text-sm mt-1">{error.message}</p>
            )}
        </div>
    );
}
