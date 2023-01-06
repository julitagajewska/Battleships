import React from 'react';
import './EditableText.css';
import { AiTwotoneEdit } from 'react-icons/ai';

export default function EditableText(props) {
    return (
        <div className="label-value-container">
            <label>{props.label}</label>
            <p className="user-data-p">{props.value}</p>
            <AiTwotoneEdit className="icon" size={"1.25rem"} />
        </div>
    )
}
