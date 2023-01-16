import React from 'react';
import { checkUsernameLength, hasSpecialCharacter, hasSpace } from '../../utils/Validators';
import './UsernameInput.css';

export default function UsernameInput(props) {

    const { required, reference, setErrors, setUsernameTaken, setValue, setValid, setFocus, placeholder, size, ...others } = props;

    const onInputChange = (e) => {
        let isValid = true;
        let errors = [];

        // Length
        if (checkUsernameLength(e.target.value) === false) {
            errors.push(<p key="username-length-error">Nazwa użytkownika może mieć od 3 do 10 znaków</p>)
        }

        // Spaces
        if (hasSpace(e.target.value) === true) {
            errors.push(<p key="username-space-error">Nazwa użytkownika nie może zaweirać spacji</p>)
        }

        // Special character
        if (hasSpecialCharacter(e.target.value) === true) {
            errors.push(<p key="username-special-character-error">
                Nazwa użytkownika nie może zawierać znaków: {"[!@#$%^&*()\\[\]{}+=~`|:;\"'<>,./?]"}
            </p>);
        }

        // set isValid
        if (checkUsernameLength(e.target.value) === false ||
            hasSpecialCharacter(e.target.value) === true ||
            hasSpace(e.target.value) === true) {
            isValid = false;
        }

        if (setUsernameTaken !== undefined) {
            setUsernameTaken([])
        }

        setValid(isValid)
        setErrors(errors);
        setValue(e.target.value);
    }


    return (
        <div className="input-container">
            <input
                className={`${size}`}
                type="text"
                id="username"
                autoComplete="off"
                required={required}

                ref={reference}
                placeholder={placeholder}
                onChange={(e) => onInputChange(e)}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)} />
        </div>
    )
}


