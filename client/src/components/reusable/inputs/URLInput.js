import React from 'react'
import PropTypes from 'prop-types';
import { isValidURL } from '../../utils/Validators';

function URLInput({ setValue, setUrlFocus, setValid, setErrors, size }) {

    const onInputChange = (e) => {
        let isValid = true;
        let errors = [];

        if (isValidURL(e.target.value) === false) {
            errors.push(<p key="URL-error">Błędny format danych</p>)
            isValid = false;
        }

        setValid(isValid);
        setErrors(errors);
        setValue(e.target.value);

    }


    return (
        <div className="input-container">
            <input
                className={`${size}`}
                type="text"
                placeholder="url"
                onChange={(e) => onInputChange(e)}
                onFocus={() => setUrlFocus(true)}
                onBlur={() => setUrlFocus(false)} />
        </div>

    )
}


URLInput.propTypes = {
    setValue: PropTypes.func,
    setUrlFocus: PropTypes.func,
    setValid: PropTypes.func,
    setErrors: PropTypes.func,
    size: PropTypes.string
}

export default URLInput