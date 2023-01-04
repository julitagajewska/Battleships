import React from 'react'

export default function ReusableButton(props) {
    return (
        <button className={props.type} onClick={() => props.action()}>{props.value}</button>
    )
}
