import { Outlet } from 'react-router-dom'
import Logo from '../components/Logo'
import { ToastContainer } from 'react-toastify'

export default function AuthLayout() {
  return (
    <>
        <div className="min-h-screen flex flex-col bg-slate-700">
            <header className="bg-slate-700 py-5">
                <div className="max-w-screen-2xl flex mx-auto lg:flex-row justify-between items-center">
                    <div className="w-24">
                        <Logo/>
                        
                    </div>
                </div>
            </header>
                
            <section className="max-w-screen-2xl bg-slate-700 mx-auto p-5">
                <Outlet/>
            </section>

            <footer className="bg-slate-700 p-5">
                <p className="text-center text-white">
                    Todos los derechos reservados {new Date().getFullYear()}
                </p>
            </footer>
        </div>
        <ToastContainer
            pauseOnHover={false} //no pause notification on hover
            pauseOnFocusLoss={false}
        />
    </>
  )
}