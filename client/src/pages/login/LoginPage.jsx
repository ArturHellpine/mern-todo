import React, { useContext, useState } from "react";
import "../AuthPage.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Error from "../../components/ErrorMessage/Error";

const LoginPage = () => {
    const [form, setForm] = useState({ email: '', password: '' })
    const { login } = useContext(AuthContext)
    const router = useNavigate()
    const [error, setError] = useState('')

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const loginHandler = async () => {
        try {
            const response = await axios.post('/auth/login', {...form}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            login(response.data.token, response.data.userId, response.data.userName)
            router('/main')
        } catch (err) {
            setError(err.response.data.message)
        }
    }

    return (
        <>
            <div className="container">
                <div className="auth-page">
                    <h4>Вхід в акаунт</h4>
                    <form className='form form-login' onSubmit={event => event.preventDefault()}>
                        <div className="row">
                            <div className="input-field col s12">
                                <input onChange={changeHandler} placeholder='Пошта' className='validate' type="email" name='email'/>
                            </div>
                            <div className="input-field col s12">
                                <input onChange={changeHandler} placeholder='Пароль' className='validate' type="password" name='password'/>
                            </div>
                            <Error error={error} />
                        </div>
                        <div className="row">
                            <button onClick={loginHandler} className='wawes-effect wawes-light btn blue'>
                                Ввійти
                            </button>
                            <Link to="/registration" className='btn-outline btn-reg'>Не зареєстровані?</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LoginPage;