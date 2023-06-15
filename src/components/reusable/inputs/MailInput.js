import React from 'react'
import PropTypes from 'prop-types';
import { isEmail } from '../../utils/Validators';
import './MailInput.css';

function MailInput({ required, setErrors, setValue, setValid, setFocus, placeholder, size }) {

    const onInputChange = (e) => {
        let isValid = true;
        let errors = [];

        // Mail format
        if (isEmail(e.target.value) === false) {
            errors.push(<p key="email-format-error">Dozwolony format adresu e-mail: {"[abc@def.gh]"}</p>)
            isValid = false;
        }

        setValid(isValid)
        setErrors(errors);
        setValue(e.target.value);
    }

    return (
        <div className="input-container">
            <input
                className={`${size}`}
                type="mail"
                id="mail"
                autoComplete="off"
                required={required}

                placeholder={placeholder}
                onChange={(e) => onInputChange(e)}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)} />
        </div>
    )
}

MailInput.propTypes = {
    required: PropTypes.bool,
    setErrors: PropTypes.func,
    setValue: PropTypes.func,
    setValid: PropTypes.func,
    setFocus: PropTypes.func,
    placeholder: PropTypes.string,
    size: PropTypes.string
}

export default MailInput