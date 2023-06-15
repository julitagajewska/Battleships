/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { checkIfUserExists, checkPassword, getUser } from '../../../api/axios';
import { useSound } from '../../utils/Sound';

import { BiLogInCircle } from 'react-icons/bi';

import UsernameInput from '../../reusable/inputs/UsernameInput';
import PasswordInput from '../../reusable/inputs/PasswordInput';
import CenteredContainer from '../../reusable/containers/CenteredContainer';
import MediumButton from '../../reusable/buttons/MediumButton';
import ErrorMessage from '../../reusable/messages/ErrorMessage';
import StyledLink from '../../reusable/links/StyledLink';

export default function Login() {

    let sound = useSound();

    const [user, setUser] = useState('');

    const auth = useAuth(user);
    const navigate = useNavigate();

    const usernameRef = useRef();

    const [errorMsg, setErrorMsg] = useState('');

    const [username, setUsername] = useState('');
    const [usernameFocus, setUsernameFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [passwordFocus, setPasswordFocus] = useState(false);


    useEffect(() => {
        usernameRef.current.focus();
    }, [])

    const onUsernameFocus = (value) => {
        setErrorMsg('');
        setUsernameFocus(value);
    }

    const onPasswordFocus = (value) => {
        setErrorMsg('');
        setPasswordFocus(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let error = '';

        // User not found
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

        // Incorrect data
        result = await checkPassword(username, password);
        console.log(await checkPassword(username, password))
        if (result === false) {
            error = "Wprowadzono błędne dane"
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
                        setValid={null}
                        placeholder='Nazwa użytkownika'
                        setErrors={null}
                        required={true}
                    />

                    <PasswordInput
                        setValue={setPassword}
                        setFocus={onPasswordFocus}
                        setValid={null}
                        placeholder='Hasło'
                        setErrors={null}
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
