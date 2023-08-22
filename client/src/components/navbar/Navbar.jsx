import React, {useContext, useState} from "react";
import "./Navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import ModalComponent from "../modal/ModalComponent";


const Navbar = () => {
    const { fullName, logout, isLogin } = useContext(AuthContext)
    const router = useNavigate()
    const [modal, setModal] = useState(false)

    const logoutHandler = () => {
        logout()
        router('/login')
    }

    return (
        <nav>
            <div className="nav-wrapper navbar navbar-fixed">
                <Link to="/" className="brand-logo">MERN TODO</Link>
                { !isLogin
                    ? <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li>
                                <Link to="/login">Ввійти</Link>
                            </li>
                            <li>
                                <Link to="/registration">Зареєструватись</Link>
                            </li>
                        </ul>

                    :  <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li className='user__name'>
                            <button onClick={() => setModal(true)} className='wawes-effect wawes-light btn red'>Видалити акаунт</button>
                            <img className='user__icon' src="user.png" alt=""/>
                            {fullName}
                        </li>
                            <li className='user__name'>
                               <Link to='/login' onClick={logoutHandler}>Вийти</Link>
                            </li>
                    </ul>
                }
            </div>
            <ModalComponent setModal={setModal} modal={modal} />
        </nav>
    );
};

export default Navbar;