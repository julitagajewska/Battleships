import React from 'react';
import PropTypes from 'prop-types';

import ErrorMessage from './ErrorMessage';

import './InputErrors.css';

function InputErrors({ focus, value, isValid, errors }) {

    let counter = 0;

    if (value === null) {
        return (
            <>
                {
                    focus && !isValid ?
                        errors.map((error) => {
                            counter++;
                            return (
                                <ErrorMessage key={`error-message-${counter}`} status={false} message={error} keyString={`key-${error.key}-${counter}`} />
                            )
                        })
                        :
                        <></>
                }
            </>
        )
    }

    return (
        <>
            {
                focus && value && !isValid ?

                    errors.map((error) => {
                        counter++;
                        return (
                            <ErrorMessage key={`error-message-${counter}`} status={false} message={error} keyString={`key-${error.key}-${counter}`} />
                        )
                    })
                    :
                    <></>
            }
        </>
    )
}

InputErrors.propTypes = {
    focus: PropTypes.bool,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    isValid: PropTypes.bool,
    errors: PropTypes.array
}

export default InputErrors;