import React from 'react';
import PropTypes from 'prop-types';
import { hasUpperCaseLetter, hasLowerCaseLetter, hasNumber, hasSpecialCharacter, hasSpace, checkPasswordLength } from '../../utils/Validators';
import './PasswordInput.css';

function PasswordInput({ required, reference, setErrors, setValue, setValid, setFocus, placeholder, size }) {

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

        if (setValid !== null) { setValid(isValid); }
        if (setErrors !== null) { setErrors(errors); }
        setValue(e.target.value);
    }

    return (
        <div className="input-container">
            <input
                className={`${size}`}
                type="password"
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

PasswordInput.propTypes = {
    required: PropTypes.bool,
    reference: PropTypes.object,
    setErrors: PropTypes.func,
    setValue: PropTypes.func,
    setValid: PropTypes.func,
    setFocus: PropTypes.func,
    placeholder: PropTypes.string,
    size: PropTypes.string
}

export default PasswordInput