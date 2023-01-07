import React from 'react'

export default function ErrorMessage(props) {
    return (
        <div>
            {props.status ?
                (
                    <span style={{ color: "green", fontWeight: "bold" }}>{props.message}</span>
                )
                :
                (
                    <span style={{ color: "red", fontWeight: "bold" }}>{props.message}</span>
                )}
        </div>

    )
}
