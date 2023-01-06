import React from 'react';
import './ReusableButton.css'

export default function ReusableButton(props) {
    return (
        <button className={props.type} onClick={() => props.action()}>{props.value}</button>
    )
}
