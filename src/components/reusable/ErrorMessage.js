import React from 'react'
import './ErrorMessage.css'

export default function ErrorMessage(props) {
    return (
        <div>
            {props.status ?
                (
                    <span style={{ color: "green", fontWeight: "bold" }}>{props.message}</span>
                )
                :
                (
                    <span style={{ color: "red" }}>{props.message}</span>
                )}
        </div>

    )
}
