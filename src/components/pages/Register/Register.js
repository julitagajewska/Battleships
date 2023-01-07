/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FormInput from '../../reusable/FormInput';
import ErrorMessage from '../../reusable/ErrorMessage';
import api, { checkUsername, registerUser } from '../../../api/axios';
import './Register.css';

export default function Rejsetracja() {

    const usernameRef = useRef();
    const errorRef = useRef();

    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);

    const [mail, setMail] = useState('');
    const [validMail, setValidMail] = useState(false);
    const [mailFocus, setMailFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchPasswordFocus, setMatchPasswordFocus] = useState(false);

    const [errorMsg, setErrorMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const user_regex = /^[a-zA-Z][a-zA-Z0-9-_]{3,10}/;
    const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+-=]).{6,24}$/;
    const mail_regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    useEffect(() => {
        usernameRef.current.focus();
    }, [])

    useEffect(() => {
        let result = user_regex.test(username);
        let response;

        let getResponse = async () => {
            response = await checkUsername(username);
            if (!response) {
                result = false;
                setErrorMsg('Podana nazwa użytkownika jest zajęta.')
            }
        }

        getResponse();
        setValidUsername(result)
    }, [username]);

    useEffect(() => {
        const result = mail_regex.test(mail);
        setValidMail(result)
    }, [mail]);

    useEffect(() => {
        const result = password_regex.test(password);
        setValidPassword(result);

        const match = password === matchPassword;
        setValidMatch(match);
    }, [password, matchPassword])

    useEffect(() => {
        setErrorMsg('')
    }, [username, password, matchPassword])

    const handleSubmit = async (e) => {
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
                (<div>
                    <p>Zarejestrowano pomyślnie!</p>
                    <Link to="../login">Zaloguj się</Link>
                </div>)
                :
                (
                    <>
                        {errorMsg}
                        <h3>Rejestracja</h3>
                        <form onSubmit={handleSubmit}>

                            <div className="input-group">
                                <label htmlFor="username">Nazwa użytkownika:</label>
                                <input
                                    type="text"
                                    id="username"
                                    ref={usernameRef}
                                    autoComplete="off"
                                    onChange={(e) => setUsername(e.target.value)}
                                    onFocus={() => setUsernameFocus(true)}
                                    onBlur={() => setUsernameFocus(false)}
                                    required
                                    placeholder='Podaj nazwę użytkownika ...' />
                                {
                                    usernameFocus && username && !validUsername ?
                                        <ErrorMessage status={false} message={
                                            <p>
                                                Nazwa użytkownika może mieć od 4 do 24 znaków<br />
                                                Nazwa musi zacząć się od litery<br />
                                                Dozwolone znaki: litery, cyfry, -, _
                                            </p>
                                        } />
                                        :
                                        <></>
                                }
                            </div>

                            <div className="input-group">
                                <label htmlFor="mail">Adres e-mail:</label>
                                <input
                                    type="mail"
                                    id="mail"
                                    autoComplete="off"
                                    onChange={(e) => setMail(e.target.value)}
                                    onFocus={() => setMailFocus(true)}
                                    onBlur={() => setMailFocus(false)}
                                    required />
                                {
                                    mailFocus && !validMail ?
                                        <ErrorMessage status={false} message={
                                            <p>
                                                Wprowadzono błędny adres e-mail.<br />
                                                Dozwolony format adresu e-mail: {"[abc@def.gh]"} <br />
                                            </p>
                                        } />
                                        :
                                        <></>
                                }
                            </div>

                            <div className="input-group">
                                <label htmlFor="password">Hasło:</label>
                                <input
                                    type="password"
                                    id="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => setPasswordFocus(true)}
                                    onBlur={() => setPasswordFocus(false)}
                                    required />
                                {
                                    passwordFocus && !validPassword ?
                                        <ErrorMessage status={false} message={
                                            <p>
                                                Hasło musi mieć od 6 do 24 znaków <br />
                                                Hasło musi zawierać małą literę, wielką literę, cyfrę i znak specjalny <br />
                                            </p>
                                        } />
                                        :
                                        <></>
                                }
                            </div>

                            <div className="input-group">
                                <label htmlFor="matchPassword">Potwierdź hasło:</label>
                                <input
                                    type="password"
                                    id="matchPassword"
                                    autoComplete="off"
                                    onChange={(e) => setMatchPassword(e.target.value)}
                                    onFocus={() => setMatchPasswordFocus(true)}
                                    onBlur={() => setMatchPasswordFocus(false)}
                                    required />
                                {
                                    matchPasswordFocus && !validMatch ?
                                        <ErrorMessage status={false} message={
                                            <p>
                                                Wprowadzone hasła muszą być takie same
                                            </p>
                                        } />

                                        :
                                        <></>
                                }
                            </div>

                            <button disabled={!validUsername || !validMail || !validPassword || !validMatch ? true : false} type="submit">Zarejestruj się</button>
                        </form>
                    </>
                )
            }
        </div>

    )
}
