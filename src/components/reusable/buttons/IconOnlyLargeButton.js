import React from 'react';
import './IconOnlyLargeButton.css';

export default function IconOnlyButton({ Icon, color, onClick, disabled, id }) {
    console.log(disabled)
    return (
        <button className="icon-only-large-button" style={{ backgroundColor: `${color}` }} onClick={(e) => onClick(e)} disabled={disabled}>
            <Icon className="icon-only-button-large-icon" id={id} size={"30px"} />
        </button>
    )
}
