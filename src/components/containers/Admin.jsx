import React, { useState, useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import Button from "../Utils/Button";
import Logo from "../../assets/img/admin-logo.png";
import { login, getCookie } from "../../helpers/session";
import Modal from "../Utils/Modal";

const Login = (props) => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const [modalShow, setModalShow] = useState(false);
    const [spinnerShow, setSpinnerShow] = useState(false);

    const [teacher, setTeacher] = useState(false);
    const [admin, setAdmin] = useState(true);

    const [remember, setRemember] = useState(false);

    let history = useHistory();

    useEffect(() => {
        if (localStorage.getItem("user") != null) {
            const userInput = document.getElementById("username");
            userInput.value = localStorage.getItem("user");
            setUsername(userInput.value);
        }
    }, []);

    const toogleAdmin = () => {
        setAdmin(!admin);
        setTeacher(!teacher);
    };

    const toogleTeacher = () => {
        setTeacher(!teacher);
        setAdmin(!admin);
    };

    const handleChangeUsername = (e) => {
        setUsername(e.target.value);
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleRememberMe = (event) => {
        if (event.target.checked) {
            setRemember(true);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSpinnerShow(true);

        const redirectUrl = "/courses";
        let userType;
        admin ? (userType = 0) : (userType = 1);

        await login(username, password, userType)
            .then((result) => {
                setSpinnerShow(false);
                remember
                    ? localStorage.setItem("user", username)
                    : console.log("Not remember");
                result ? history.push(redirectUrl) : setModalShow(true);
            })
            .catch((error) => {
                setSpinnerShow(false);
                setModalShow(true);
            });
    };

    return getCookie("token") ? (
        <>
            <Redirect to="/courses"/>
        </>
    ) : (
        <div className="container-fluid col-md-12 admin">
            <div className="row h-100 d-flex align-items-center justify-content-center">
                <div className="col-md-3 adminLogo">
                    <img src={Logo} alt="Focus Mind Logo" />
                </div>
                <div className="col-md-4">
                    <div className="row col-md-12 h-100 d-flex align-items-center justify-content-between">
                        <button
                            className={
                                admin
                                    ? "administratorButton activeButton"
                                    : "administratorButton inactiveButton"
                            }
                            onClick={toogleAdmin}
                        >
                            Soy administrador
                        </button>
                        <button
                            className={
                                teacher
                                    ? "teacherButton activeButton"
                                    : "teacherButton inactiveButton"
                            }
                            onClick={toogleTeacher}
                        >
                            Soy profesor
                        </button>
                    </div>
                    <div className="loginBox container-fluid ">
                        <form onSubmit={handleSubmit} id="loginForm">
                            <div className="row insidePadding">
                                <div className="row col-md-10">
                                    <h5>Login</h5>
                                </div>
                                <div className="row col-md-10 mb-4">
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        placeholder="Usuario"
                                        value={username}
                                        autoComplete="username"
                                        onChange={handleChangeUsername}
                                    />
                                </div>
                                <div className="row col-md-10 mb-4">
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Contraseña"
                                        value={password}
                                        autoComplete="current-password"
                                        onChange={handleChangePassword}
                                    />
                                </div>
                                <div className="row col-md-10 align-items-center mt-1 mb-3">
                                    <label form="rememberme">
                                        <input
                                            type="checkbox"
                                            name="rememberme"
                                            id="rememberme"
                                            className="mr-2"
                                            onChange={handleRememberMe}
                                        />
                                        Recordame
                                    </label>
                                </div>
                                <Button />
                                <div className="ml-4">
                                    <LoadingOverlay
                                        active={spinnerShow}
                                        styles={{
                                            spinner: (base) => ({
                                                ...base,
                                                width: "30px",
                                            }),
                                        }}
                                        spinner
                                    ></LoadingOverlay>
                                </div>
                            </div>
                        </form>
                    </div>
                    <Modal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        centered={true}
                        title="Acceso Denegado"
                        message="Verifique su usuario o contraseña"
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;
