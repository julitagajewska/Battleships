/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSound } from '../../utils/Sound';
import ErrorMessage from '../../reusable/messages/ErrorMessage';
import api, { checkUsername, registerUser } from '../../../api/axios';

import { HiCheckCircle } from 'react-icons/hi';
import { BiLogInCircle } from 'react-icons/bi';
import { IoChevronBackSharp } from 'react-icons/io5';

import UsernameInput from '../../reusable/inputs/UsernameInput';
import PasswordInput from '../../reusable/inputs/PasswordInput';
import CenteredContainer from '../../reusable/containers/CenteredContainer';
import MailInput from '../../reusable/inputs/MailInput';
import InputErrors from '../../reusable/messages/InputErrors';
import MediumButton from '../../reusable/buttons/MediumButton';
import Sidebar from '../../reusable/ui/Sidebar';
import IconOnlyButton from '../../reusable/buttons/IconOnlyButton';
import IconOnlyOverviewButton from '../../reusable/buttons/IconOnlyOverviewButton';
import RegisterInfo from '../../reusable/ui/RegisterInfo';

export default function Rejsetracja() {

    const navigate = useNavigate();
    const sound = useSound();

    const usernameRef = useRef();

    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);
    const [usernameErrorMessage, setUsernameErrorMessage] = useState([]);

    const [mail, setMail] = useState('');
    const [validMail, setValidMail] = useState(false);
    const [mailFocus, setMailFocus] = useState(false);
    const [mailErrorMessage, setMailErrorMessage] = useState([]);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState([]);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchPasswordFocus, setMatchPasswordFocus] = useState(false);
    const [matchPasswordErrorMessage, setMatchPasswordErrorMessage] = useState([]);

    const [errorMsg, setErrorMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const onUsernameFocus = (value) => {
        if (value === true) {
        }
        setErrorMsg('');
        setUsernameFocus(value);
    }

    const onMailFocus = (value) => {
        if (value === true) {
        }
        setErrorMsg('');
        setMailFocus(value);
    }

    const onPasswordFocus = (value) => {
        if (value === true) {
        }
        setErrorMsg('');
        setPasswordFocus(value);
    }

    const onMatchPasswordFocus = (value) => {
        if (value === true) {
        }
        setErrorMsg('');
        setMatchPasswordFocus(value);
    }

    useEffect(() => {
        const match = password === matchPassword;
        setValidMatch(match);
    }, [password, matchPassword])


    useEffect(() => {
        setErrorMsg('')
    }, [username, password, matchPassword])

    const handleSubmit = async (e) => {

        let isTaken = await checkUsername(username);

        if (isTaken === false) {
            sound.playBlocked();
            setErrorMsg('Podana nazwa użytkownika jest zajęta');
            return
        }

        e.preventDefault();

        let newUser = {
            id: 0,
            username: username,
            mail: mail,
            password: password,
            image: "",
            lastGames: []
        }

        registerUser(newUser);
        setSuccess(true)
    }

    return (
        <div className="upper-layer">
            {success ?
                (
                    <CenteredContainer>
                        <div className='middle section centered'>
                            <h3>Zarejestrowano pomyślnie!</h3>
                            <MediumButton
                                IconLeft={BiLogInCircle}
                                IconRight={null}
                                color={"var(--gradient-1)"}
                                content="zaloguj się"
                                disabled={false}
                                onClick={() => { sound.playPick(); navigate('../login') }}
                            />
                        </div>
                    </CenteredContainer>
                )
                :
                (
                    <>
                        <RegisterInfo />

                        <CenteredContainer>

                            <IconOnlyButton
                                Icon={IoChevronBackSharp}
                                color={"rgba(18, 66, 87, 0.2)"}
                                onClick={() => navigate("../login")}
                                disabled={false}
                                position={"top-left"}
                                shadow={"no-shadow"}
                                type={"back"}
                            />


                            <div className='upper section'>
                                <h3>REJESTRACJA</h3>
                                <ErrorMessage state={false} message={errorMsg} />
                            </div>

                            <div className='middle section'>
                                <form onSubmit={handleSubmit}>

                                    <UsernameInput
                                        reference={usernameRef}
                                        setValue={setUsername}
                                        setFocus={onUsernameFocus}
                                        setValid={setValidUsername}
                                        placeholder='Nazwa użytkownika'
                                        setErrors={setUsernameErrorMessage}
                                        required={true}
                                    />

                                    {/* { usernameErrorMessage.length !== 0 ?



                                     : <></>
                                     } */}
                                    <InputErrors
                                        focus={usernameFocus}
                                        value={username}
                                        isValid={validUsername}
                                        errors={usernameErrorMessage} />

                                    <MailInput
                                        setValue={setMail}
                                        setFocus={onMailFocus}
                                        setValid={setValidMail}
                                        placeholder='Adres e-mail'
                                        setErrors={setMailErrorMessage}
                                        required={true}
                                    />

                                    <InputErrors
                                        focus={mailFocus}
                                        value={mail}
                                        isValid={validMail}
                                        errors={mailErrorMessage} />

                                    <PasswordInput
                                        setValue={setPassword}
                                        setFocus={onPasswordFocus}
                                        setValid={setValidPassword}
                                        placeholder='Hasło'
                                        setErrors={setPasswordErrorMessage}
                                        required={true}
                                    />

                                    <InputErrors
                                        focus={passwordFocus}
                                        value={password}
                                        isValid={validPassword}
                                        errors={passwordErrorMessage} />

                                    <PasswordInput
                                        setValue={setMatchPassword}
                                        setFocus={onMatchPasswordFocus}
                                        setValid={setValidMatch}
                                        placeholder='Potwierdź hasło'
                                        setErrors={setMatchPasswordErrorMessage}
                                        required={true}
                                    />

                                    <InputErrors
                                        focus={matchPasswordFocus}
                                        value={null}
                                        isValid={validMatch}
                                        errors={['Wprowadzone hasła muszą być takie same']} />
                                </form>
                            </div>

                            <div className='lower section centered'>
                                <MediumButton
                                    IconLeft={HiCheckCircle}
                                    IconRight={null}
                                    color={"var(--gradient-1)"}
                                    content="zarejestruj się"
                                    disabled={!validUsername || !validMail || !validPassword || !validMatch ? true : false}
                                    onClick={(e) => handleSubmit(e)}
                                />
                            </div>
                        </CenteredContainer>
                    </>
                )
            }
        </div>

    )
}
