import React from 'react';
import PropTypes from 'prop-types';

import './ErrorMessage.css';

function ErrorMessage({ status, message, keyString }) {

    console.log(keyString)

    return (
        <div key={`${keyString}-container`}>
            {status ?
                (
                    <span key={`${keyString}`} style={{ color: "green", fontWeight: "bold" }}>{message}</span>
                )
                :
                (
                    <span key={`${keyString}`} style={{ color: "red" }}>{message}</span>
                )}
        </div>

    )
}

ErrorMessage.propTypes = {
    status: PropTypes.bool,
    message: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    keyString: PropTypes.string
}

export default ErrorMessage;