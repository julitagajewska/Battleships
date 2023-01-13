import React from 'react';
import './IconOnlyButton.css';

export default function IconOnlyButton({ Icon, color, onClick, disabled }) {
    return (
        <button className="icon-only-button " style={{ backgroundColor: `${color}` }} onClick={(e) => onClick(e)} disabled={disabled}>
            <Icon className="icon-only-button-icon" size={"16px"} />
        </button>
    )
}
