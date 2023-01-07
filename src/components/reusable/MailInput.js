import React from 'react'
import { isEmail } from '../utils/Validators';

export default function MailInput(props) {

    const { required, setErrors, setUsername, setValue, setValid, setFocus, placeholder, ...others } = props;

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
        <div>
            <input
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
