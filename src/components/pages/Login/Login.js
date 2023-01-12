/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../utils/auth';
import { useNavigate, Link } from 'react-router-dom';
import FormInput from '../../reusable/inputs/FormInput';
import axios, { checkIfUserExists, checkPassword, getUser } from '../../../api/axios';
import ErrorMessage from '../../reusable/messages/ErrorMessage';
import { checkUsernameLength } from '../../utils/Validators';
import { BiLogInCircle } from 'react-icons/bi';
import { useSound } from '../../utils/Sound';

import UsernameInput from '../../reusable/inputs/UsernameInput';
import PasswordInput from '../../reusable/inputs/PasswordInput';
import CenteredContainer from '../../reusable/containers/CenteredContainer';
import MediumButton from '../../reusable/buttons/MediumButton';

import './Login.css';
import StyledLink from '../../reusable/links/StyledLink';

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
        setErrorMsg('');
        setUsernameFocus(value);
    }

    const onPasswordFocus = (value) => {
        if (value === true) {
            // sound.playPick();
        }
        setErrorMsg('');
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
        <CenteredContainer>

            <div className='upper section'>
                <h3>ZALOGUJ SIĘ</h3>
            </div>

            <div className='middle section'>

                {errorMsg !== '' && usernameFocus === false && passwordFocus === false ? <ErrorMessage status={false} message={errorMsg} /> : <></>}

                <form className="login-container-form" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                }}>

                    <UsernameInput
                        reference={usernameRef}
                        setValue={setUsername}
                        setFocus={onUsernameFocus}
                        setValid={setValidUsername}
                        placeholder='Nazwa użytkownika'
                        setErrors={setUsernameErrorMessage}
                        required={true}
                    />

                    <PasswordInput
                        setValue={setPassword}
                        setFocus={onPasswordFocus}
                        setValid={setValidPassword}
                        placeholder='Hasło'
                        setErrors={setPasswordErrorMessage}
                        required={true}
                    />

                    <MediumButton
                        IconLeft={BiLogInCircle}
                        IconRight={null}
                        color={"var(--gradient-1)"}
                        content="zaloguj się"
                        onClick={handleSubmit}
                        disabled={false} />
                </form>
            </div>

            <div className='lower section'>
                <p>Nie masz konta? <StyledLink to="/register" content="Zarejestruj się!" /></p>
            </div>
        </CenteredContainer>
    )
}
