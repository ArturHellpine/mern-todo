import { Navigate, Route, Routes } from "react-router-dom";
import MainPage from "./pages/main/MainPage";
import AuthRouter from "./router/AuthRouter";

export const useRoutes = (isLogin) => {
    if(isLogin) {
        return (
            <Routes>
                <Route path='/main' element={ <MainPage /> } />
                <Route path='/*' element={ <Navigate replace to='/main' /> } />
            </Routes>
        )
    }
    return (
        <AuthRouter />
    )
}