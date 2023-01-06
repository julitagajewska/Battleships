import React, { useState } from 'react';
import { useAuth } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import FormInput from '../../reusable/FormInput';

export default function Login() {

    const [user, setUser] = useState('');
    const auth = useAuth(user);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);
        console.log(user);
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
            <p>Nie masz konta? <a href="#">Zarejestruj się!</a></p>
        </div>
    )
}
