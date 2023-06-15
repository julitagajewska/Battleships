import React from 'react';
import PropTypes from 'prop-types';
import { checkUsernameLength, hasSpecialCharacter, hasSpace } from '../../utils/Validators';
import './UsernameInput.css';

function UsernameInput({ required, reference, setErrors, setUsernameTaken, setValue, setValid, setFocus, placeholder, size }) {

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

        if (setValid !== null) { setValid(isValid) }
        if (setErrors !== null) { setErrors(errors); }
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

UsernameInput.propTypes = {
    required: PropTypes.bool,
    reference: PropTypes.object,
    setErrors: PropTypes.func,
    setUsernameTaken: PropTypes.func,
    setValue: PropTypes.func,
    setValid: PropTypes.func,
    setFocus: PropTypes.func,
    placeholder: PropTypes.string,
    size: PropTypes.string
}

export default UsernameInput

