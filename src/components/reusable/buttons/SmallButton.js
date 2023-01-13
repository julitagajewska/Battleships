import React from 'react';
import './SmallButton.css';

export default function SmallButton({ content, IconLeft, IconRight, color, onClick, disabled }) {

    return (
        <button className="small-button" style={{ backgroundColor: `${color}` }} onClick={(e) => onClick(e)} disabled={disabled}>
            {IconLeft !== null ? <IconLeft className="small-button-icon-left" size="16px" /> : <></>}
            <p className="small-button-content">{content}</p>
            {IconRight !== null ? <IconRight className="small-button-icon-right" size="16px" /> : <></>}
        </button>
    )
}
