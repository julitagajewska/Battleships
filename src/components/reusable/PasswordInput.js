import React from 'react';
import { hasUpperCaseLetter, hasLowerCaseLetter, hasNumber, hasSpecialCharacter, hasSpace, checkPasswordLength } from '../utils/Validators';

export default function PasswordInput(props) {

    const { required, reference, setErrors, setUsername, setValue, setValid, setFocus, placeholder, ...others } = props;

    const onInputChange = (e) => {
        let isValid = true;
        let errors = [];

        // Uppercase letter
        if (hasUpperCaseLetter(e.target.value) === false) {
            errors.push(<p key="password-lower-case-letter-error">Hasło musi zawierać wielką literę</p>);
        }

        // Lowercase letter
        if (hasLowerCaseLetter(e.target.value) === false) {
            errors.push(<p key="password-upper-case-letter-error">Hasło musi zawierać małą literę</p>);
        }

        // Number
        if (hasNumber(e.target.value) === false) {
            errors.push(<p key="password-number-error">Hasło musi zawierać cyfrę</p>);
        }

        // Special character
        if (hasSpecialCharacter(e.target.value) === false) {
            errors.push(<p key="password-special-character-error">Hasło musi zawierać jeden ze znaków specjalnych: {"[!@#$%^&*()\\[\]{}+=~`|:;\"'<>,./?]"}</p>);
        }

        // Spaces
        if (hasSpace(e.target.value) === true) {
            errors.push(<p key="password-space-error">Hasło nie może zaweirać spacji</p>)
        }

        // Length
        if (checkPasswordLength(e.target.value) === false) {
            errors.push(<p key="password-length-error">Hasło może mieć od 3 do 15 znaków</p>)
        }

        if (hasUpperCaseLetter(e.target.value) === false ||
            hasLowerCaseLetter(e.target.value) === false ||
            hasNumber(e.target.value) === false ||
            hasSpecialCharacter(e.target.value) === false ||
            hasSpace(e.target.value) === true ||
            checkPasswordLength(e.target.value) === false) {
            isValid = false;
        }

        setValid(isValid)
        setErrors(errors);
        setValue(e.target.value);
    }

    return (
        <div>
            <input
                type="password"
                id="password"
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
