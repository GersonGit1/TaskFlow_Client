import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import DashboardViews from "./views/DashboardViews";
import CreateProjectView from "./views/projects/CreateProjectView";
import EditProjectView from "./views/projects/EditProjectView";
import ProjectDetailsView from "./views/projects/ProjectDetailsView";
import LoginView from "./views/auth/LoginView";
import AuthLayout from "./layouts/AuthLayout";
import RegisterView from "./views/auth/RegisterView";
import ConfirmAccountView from "./views/auth/ConfirmAccountView";
import RequestNewCodeView from "./views/auth/RequestNewCodeView";
import ForgotPasswordView from "./views/auth/ForgotPasswordView";
import NewPasswordView from "./views/auth/NewPasswordView";
import ProjectTeamView from "./views/projects/ProjectTeamView";
import ProfileView from "./views/profile/ProfileView";
import ChangePasswordView from "./views/profile/ChangePasswordView";
import ProfileLayout from "./layouts/ProfileLayout";
import NotFound from "./views/404/NotFound";

export default function Router(){
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout/>}>
                    <Route element={<DashboardViews/>} index/>
                    <Route element={<CreateProjectView/>} path="/projects/create" />
                    <Route element={<EditProjectView/>} path="/projects/:projectId/edit" />
                    <Route element={<ProjectDetailsView/>} path="/projects/:projectId" />
                    <Route element={<ProjectTeamView/>} path="/projects/:projectId/team" />
                    <Route element={<ProfileLayout/>}>
                        <Route element={<ProfileView/>} path="/profile" />
                        <Route element={<ChangePasswordView/>} path="/profile/password" />
                    </Route>
                </Route>
                <Route element={<AuthLayout/>}>
                    <Route element={<LoginView />} path="/auth/login" />
                    <Route element={<RegisterView />} path="/auth/register" />
                    <Route element={<ConfirmAccountView />} path="/auth/confirm-account" />
                    <Route element={<RequestNewCodeView />} path="/auth/request-code" />
                    <Route element={<ForgotPasswordView />} path="/auth/forgot-password" />
                    <Route element={<NewPasswordView />} path="/auth/new-password" />
                </Route>

                <Route element={<AuthLayout/>}>
                    <Route element={<NotFound/>} path="/404" />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}