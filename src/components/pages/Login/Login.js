import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../utils/auth';
import { useNavigate, Link } from 'react-router-dom';
import FormInput from '../../reusable/FormInput';
import axios from '../../../api/axios'

export default function Login() {

    const [user, setUser] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const auth = useAuth(user);

    const usernameRef = useRef();
    const errorRef = useRef();

    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const user_regex = /^[a-zA-Z][a-zA-Z0-9-_]{3,10}/;
    const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+-=]).{6,24}$/;
    const mail_regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    useEffect(() => {
        usernameRef.current.focus();
    }, [])

    useEffect(() => {
        let result = user_regex.test(username);
        setValidUsername(result)
    }, [username]);

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

        auth.login(user);
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
            <form onSubmit={handleSubmit}>
                {inputs.map((input) => (
                    <FormInput
                        key={input.id}
                        {...input}
                        value={values[input.name]}
                        onChange={onChange} />
                ))}
                <button type="submit">Zaloguj się</button>
            </form>
            <p>Nie masz konta? <Link to="/register">Zarejestruj się!</Link></p>
        </div>
    )
}
