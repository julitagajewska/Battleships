import React, { useState } from 'react'
import ErrorMessage from './ErrorMessage'
import { checkUsernameLength, hasSpecialCharacter, hasSpace } from '../utils/Validators';

export default function UsernameInput(props) {

    const { reference, onChange, setValue, setValid, setFocus, placeholder, ...others } = props;

    const [usernameErrorMessage, setusernameErrorMessage] = useState([]);

    const onInputChange = (e) => {
        let isValid = true;
        let errors = [];

        // Length
        if (checkUsernameLength(e.target.value) === false) {
            errors.push(<li key="username-length-error">Nazwa użytkownika może mieć od 3 do 10 znaków</li>)
        }

        // Spaces
        if (hasSpace(e.target.value) === true) {
            errors.push(<li key="username-space-error">Nazwa użytkownika nie może zaweirać spacji</li>)
        }

        // Special character
        if (hasSpecialCharacter(e.target.value) === true) {
            errors.push(<li key="username-special-character-error">
                Nazwa użytkownika nie może zawierać znaków: {"[!@#$%^&*()\\[\]{}+=~`|:;\"'<>,./?]"}
            </li>);
        }

        // set isValid
        if (checkUsernameLength(e.target.value) === false ||
            hasSpecialCharacter(e.target.value) === true ||
            hasSpace(e.target.value) === true) {
            isValid = false;
        }

        setValid(isValid)
        setusernameErrorMessage(errors);
        onChange(e);
    }


    return (
        <div>
            <input
                type="text"
                id="username"
                autoComplete="off"
                required

                ref={reference}
                placeholder={placeholder}
                onChange={(e) => onInputChange(e)}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)} />
            <ErrorMessage status={false} message={
                <div>
                    <ul>
                        {usernameErrorMessage.map((error) => {
                            return error
                        })}
                    </ul>
                </div>
            } />
        </div>
    )
}


