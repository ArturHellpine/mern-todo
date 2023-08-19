import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/login/LoginPage";
import RegisterPage from "../pages/register/RegisterPage";

const AuthRouter = () => {
    return (
        <Routes>
            <Route path='/login' element={ <LoginPage /> } />
            <Route path='/registration' element={ <RegisterPage /> } />
            <Route path='/*' element={ <Navigate replace to='/login' /> } />
        </Routes>
    );
};

export default AuthRouter;