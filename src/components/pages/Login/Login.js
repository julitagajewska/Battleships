/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../utils/auth';
import { useNavigate, Link } from 'react-router-dom';
import FormInput from '../../reusable/FormInput';
import axios, { checkIfUserExists, checkPassword, getUser } from '../../../api/axios';
import ErrorMessage from '../../reusable/ErrorMessage';
import { checkUsernameLength } from '../../utils/Validators';
import UsernameInput from '../../reusable/UsernameInput';


export default function Login() {

    const [user, setUser] = useState('');
    const [usernameErrorMessage, setusernameErrorMessage] = useState([]);
    const [passwordErrorMessage, setpasswordErrorMessage] = useState('');
    const auth = useAuth(user);

    const usernameRef = useRef();
    const errorRef = useRef();

    const [errorMsg, setErrorMsg] = useState('');
    const [usernameErrorMsg, setUsernameErrorMsg] = useState('');
    const [passwordErrorMsg, setPasswordErrorMsg] = useState('');

    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);


    const hasLowerCase = /[a-z]/;
    const hasUpperCase = /[A-Z]/;
    const hasNumber = /[0-9]/;

    const hasSpecialCharacter = /[!@#$%^&*()\\[\]{}+=~`|:;"'<>,./?]/;
    const hasUsernameCorrectLength = /^[\w\W]{3,10}$/
    const hasPasswordCorrectLength = /^[\w\W]{3,15}$/
    const hasSpace = /\s/;

    useEffect(() => {
        usernameRef.current.focus();
    }, [])

    useEffect(() => {
        let result = true;
        let message = [];

        const hasSpaceResult = hasSpace.test(password);
        const hasNumberResult = hasNumber.test(password);
        const hasLowerCaseResult = hasLowerCase.test(password);
        const hasUpperCaseResult = hasUpperCase.test(password);
        const hasSpecialCharacterResult = hasSpecialCharacter.test(password);
        const hasPasswordCorrectLengthResult = hasPasswordCorrectLength.test(password);

        if (hasSpaceResult) { message.push(<li key="password-space-error">Hasło nie może zaweirać spacji</li>) }
        if (!hasNumberResult) { message.push(<li key="password-number-error">Hasło musi zawierać cyfrę</li>) }
        if (!hasLowerCaseResult) { message.push(<li key="password-lower-case-error">Hasło musi zawierać małą literę</li>) }
        if (!hasUpperCaseResult) { message.push(<li key="password-upper-case-error">Hasło musi zawierać wielką literę</li>) }
        if (!hasSpecialCharacterResult) { message.push(<li key="password-special-character-error">Hasło musi zawierać jeden ze znaków specjalnych: {"[!@#$%^&*()\\[\]{}+=~`|:;\"'<>,./?]"} </li>) }
        if (!hasPasswordCorrectLengthResult) { message.push(<li key="password-length-error">Hasło musi zawierać od 3 do 15 znaków</li>) }

        setPasswordErrorMsg(message);

        if (
            hasSpaceResult ||
            !hasNumberResult ||
            !hasLowerCaseResult ||
            !hasUpperCaseResult ||
            !hasSpecialCharacterResult ||
            !hasPasswordCorrectLengthResult
        ) {
            result = false
        }

        setValidPassword(result);
    }, [password])

    const navigate = useNavigate();

    const [values, setValues] = useState({
        username: "",
        password: "",
        keepLoggedIn: false
    });

    const inputs = [
        {
            id: 1,
            name: "username",
            type: "text",
            placeholder: "Nazwa użytkownika",
            errorMessage: "ERROR",
            label: "Nazwa użytkownika"
        },
        {
            id: 2,
            name: "password",
            type: "password",
            placeholder: "Hasło",
            errorMessage: "ERROR",
            label: "Hasło"
        },
        {
            id: 3,
            name: "keepLoggedIn",
            type: "checkbox",
            placeholder: "Nazwa użytkownika",
            errorMessage: "ERROR",
            label: "Pozostaw zalogowanym"
        }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        let error = '';

        console.log(username)

        // Nie ma takiego użytkownika
        let result = await checkIfUserExists(username);
        if (result === false) {
            error = "Nie znaleziono użytkownika o podanej nazwie"
        }
        setErrorMsg(error);

        if (error !== '') {
            return
        }

        error = '';
        setErrorMsg(error);

        console.log("bleble")

        // Wprowadzono błędne hasło
        result = await checkPassword(username, password);
        console.log(await checkPassword(username, password))
        if (result === false) {
            error = "Wprowadzono błędne hasło"
        }
        setErrorMsg(error);

        if (error !== '') {
            return
        }

        // get user and set it as global
        let loggedInUser = await getUser(username);

        console.log("Zalogowano!");
        auth.login(loggedInUser);
        navigate("/");
    };

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        if (e.target.name === "username") {
            setUser(e.target.value)
        }
    };

    return (
        <div className="upper-layer login-container">
            {errorMsg}
            <form onSubmit={handleSubmit}>
                {/* {inputs.map((input) => (
                    <FormInput
                        key={input.id}
                        {...input}
                        value={values[input.name]}
                        onChange={onChange} />
                ))} */}

                <UsernameInput
                    reference={usernameRef}
                    setValue={setUsername}
                    setFocus={setUsernameFocus}
                    setValid={setValidUsername}
                    placeholder='Podaj nazwę użytkownika ...'
                    setErrors={setusernameErrorMessage}
                    required={true}
                />

                {
                    usernameFocus && !validUsername ?
                        <ErrorMessage status={false} message={
                            <div>
                                <ul>
                                    {usernameErrorMessage.map((error) => {
                                        return error
                                    })}
                                </ul>
                            </div>}
                        />
                        : <></>
                }

                {/* <div className="input-group">
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
                                <div>
                                    <ul>
                                        {usernameErrorMsg.map((error) => {
                                            return error
                                        })}
                                    </ul>
                                </div>
                            } />
                            :
                            <></>
                    }
                </div> */}
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
                                <div>
                                    <ul>
                                        {passwordErrorMsg.map((error) => {
                                            return error
                                        })}
                                    </ul>
                                </div>
                            } />
                            :
                            <></>
                    }
                </div>
                <button type="submit" disabled={!validUsername || !validPassword ? true : false}>Zaloguj się</button>
            </form>
            <p>Nie masz konta? <Link to="/register">Zarejestruj się!</Link></p>
        </div>
    )
}
