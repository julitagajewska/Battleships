import React, { Component } from 'react'
import FormInput from '../../reusable/FormInput';

let username_regex = /^[a-zA-Z][a-zA-Z0-9-_]{3,10}/;
let password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default class Register extends Component {

    constructor() {
        super();

        this.state = {
            username: "",
            validUsername: false,
            usernameFocus: false,

            mail: "",
            validMail: false,
            mailFocus: false,

            password: "",
            validPassword: false,
            passwordFocus: false,

            matchPassword: "",
            validMatchPassword: false,
            MatchPasswordFocus: false,

            errorMessage: "",
            success: false,

            inputs: [
                {
                    id: 1,
                    name: "username",
                    type: "text",
                    placeholder: "Nazwa użytkownika",
                    errorMessage: "USERNAME ERROR",
                    label: "Nazwa użytkownika"
                },
                {
                    id: 2,
                    name: "mail",
                    type: "mail",
                    placeholder: "Adres e-mail",
                    errorMessage: "ERROR",
                    label: "Adres e-mail"
                },
                {
                    id: 3,
                    name: "password",
                    type: "password",
                    placeholder: "Hasło",
                    errorMessage: "ERROR",
                    label: "Hasło"
                },
                {
                    id: 4,
                    name: "matchPassword",
                    type: "password",
                    placeholder: "Potwierdź hasło",
                    errorMessage: "ERROR",
                    label: "Potwierdź hasło"
                }
            ]
        }

        this.onChange = this.onChange.bind(this);
    }

    setValidUsername(username) {
        this.setState((prevState) => ({
            validUsername: username_regex.test(username)
        }))
    }

    onChange = (e) => {
        this.setState((prevState) => ({
            [e.target.name]: e.target.value
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)
    }

    render() {

        return (
            <div className="upper-layer">
                <form onSubmit={this.handleSubmit}>
                    {this.state.inputs.map((input) => {
                        <FormInput
                            key={input.id}
                            {...input}
                            value={this.state[input.name]}
                            onChange={this.onChange} />
                    })}
                    <button type="submit">Zarejestruj się</button>
                </form>
            </div>
        )
    }
}
