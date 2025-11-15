import { useState } from "react";
import NewPasswordToken from "../../components/auth/NewPasswordToken";
import NewPasswowerdForm from "../../components/auth/NewPasswordForm";
import type { ConfirmToken } from "../../types";

export default function NewPasswordView() {
    const [token, setToken] = useState<ConfirmToken['token']>('');
    const [isValidToken, setIsValidToken] = useState(false);
  return (
    <>
      <h1 className="text-5xl font-black text-white">Restablecer password</h1>
      <p className="text-2xl font-light text-white mt-5">
        Ingresa el codigo para restablecer tu password {''}
      </p>

      {!isValidToken ? <NewPasswordToken 
                            token={token} 
                            setToken={setToken} 
                            setIsValidToken={setIsValidToken} /> 
                        : <NewPasswowerdForm token={token} />
        }
    </>
  )
}
