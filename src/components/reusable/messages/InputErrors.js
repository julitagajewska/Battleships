import React from 'react';

import ErrorMessage from './ErrorMessage';

import './InputErrors.css';

export default function InputErrors({ focus, value, isValid, errors }) {

    if (value === null) {
        return (
            <>
                {
                    focus && !isValid ?
                        errors.map((error) => {
                            return (
                                <ErrorMessage status={false} message={error} />
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
                        return (
                            <ErrorMessage status={false} message={error} />
                        )
                    })
                    :
                    <></>
            }
        </>
    )
}
