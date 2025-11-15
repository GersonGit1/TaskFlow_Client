import { Link, Navigate, Outlet } from "react-router-dom";
import Logo from "../components/Logo";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../hooks/useAuth";
import MenuNav from "../components/Menu";
import Spinner from "../components/Spinner";
export default function AppLayout() {

    const {data, isError, isLoading, hasToken} = useAuth();
    if(isLoading) return <Spinner/>
    if(isError || !hasToken) return <Navigate to={'/auth/login'}/>

    if(data)
    return (
        <>
            <header className="bg-slate-700 py-5">
                <div className="max-w-screen-2xl flex mx-auto lg:flex-row justify-between items-center">
                    <div className="w-24">
                        <Link to={'/'}>
                            <Logo/>
                        </Link>
                        
                    </div>
                    <MenuNav name={data.name}/>
                </div>
            </header>
            
            <section className="max-w-screen-2xl mx-auto mt-10 p-5">
                <Outlet/>
            </section>
            
            <footer className="p-5">
                <p className="text-center">
                    Todos los derechos reservados {new Date().getFullYear()}
                </p>
            </footer>
            <ToastContainer
                pauseOnHover={false} //no pause notification on hover
                pauseOnFocusLoss={false}
            />
        </>
    )
}
