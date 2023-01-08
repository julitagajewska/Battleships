/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../utils/auth';
import { useNavigate, Link } from 'react-router-dom';
import FormInput from '../../reusable/FormInput';
import axios, { checkIfUserExists, checkPassword, getUser } from '../../../api/axios';
import ErrorMessage from '../../reusable/ErrorMessage';
import { checkUsernameLength } from '../../utils/Validators';
import UsernameInput from '../../reusable/UsernameInput';
import PasswordInput from '../../reusable/PasswordInput';
import { BiLogInCircle } from 'react-icons/bi';
import { useSound } from '../../utils/Sound';
import './Login.css';


export default function Login() {

    let sound = useSound();

    const [user, setUser] = useState('');
    const [usernameErrorMessage, setUsernameErrorMessage] = useState([]);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState([]);

    const auth = useAuth(user);
    const navigate = useNavigate();

    const usernameRef = useRef();

    const [errorMsg, setErrorMsg] = useState('');

    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);


    useEffect(() => {
        usernameRef.current.focus();
    }, [])

    const [values, setValues] = useState({
        username: "",
        password: "",
        keepLoggedIn: false
    });

    const onUsernameFocus = (value) => {
        if (value === true) {
            // sound.playPick();
        }
        setUsernameFocus(value);
    }

    const onPasswordFocus = (value) => {
        if (value === true) {
            // sound.playPick();
        }
        setPasswordFocus(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let error = '';

        // Nie ma takiego użytkownika
        let result = await checkIfUserExists(username);
        if (result === false) {
            error = "Nie znaleziono użytkownika o podanej nazwie"
        }
        setErrorMsg(error);

        if (error !== '') {
            sound.playBlocked();
            return
        }

        error = '';
        setErrorMsg(error);

        // Wprowadzono błędne hasło
        result = await checkPassword(username, password);
        console.log(await checkPassword(username, password))
        if (result === false) {
            error = "Wprowadzono błędne hasło"
        }

        setErrorMsg(error);

        if (error !== '') {
            sound.playBlocked();
            return
        }

        // get user and set it as global
        let loggedInUser = await getUser(username);

        sound.playPick();

        auth.login(loggedInUser);
        navigate("/");
    };

    return (
        <div className="upper-layer login-container">
            <h3>ZALOGUJ SIĘ</h3>
            {errorMsg !== '' ? <p>{errorMsg}</p> : <></>}
            <form className="login-container-form">

                <UsernameInput
                    reference={usernameRef}
                    setValue={setUsername}
                    setFocus={onUsernameFocus}
                    setValid={setValidUsername}
                    placeholder='Nazwa użytkownika'
                    setErrors={setUsernameErrorMessage}
                    required={true}
                />

                {/* {
                    usernameFocus && !validUsername ?
                        <ErrorMessage status={false} message={
                            <div>
                                {usernameErrorMessage.map((error) => {
                                    return error
                                })}
                            </div>}
                        />
                        : <></>
                } */}

                <PasswordInput
                    setValue={setPassword}
                    setFocus={onPasswordFocus}
                    setValid={setValidPassword}
                    placeholder='Hasło'
                    setErrors={setPasswordErrorMessage}
                    required={true}
                />

                {/* {
                    passwordFocus && !validPassword ?
                        <ErrorMessage status={false} message={
                            <div>
                                {passwordErrorMessage.map((error) => {
                                    return error
                                })}
                            </div>
                        } />
                        :
                        <></>
                } */}
                <button
                    className="login-button"
                    onClick={handleSubmit}
                >
                    <BiLogInCircle className='button-icon' size={"24px"} />
                    <p>ZALOGUJ SIĘ</p>
                </button>
            </form>
            <p>Nie masz konta? <Link className="login-link" to="/register">Zarejestruj się!</Link></p>
        </div>
    )
}
