import React from 'react';
import './IconOnlyButton.css';

export default function IconOnlyButton({ Icon, color, onClick, disabled, position, oval, shadow, type }) {
    return (
        <button className={`icon-only-button ${position} ${shadow} ${oval}`} style={{ backgroundColor: `${color}` }} onClick={(e) => onClick(e)} disabled={disabled}>
            <Icon className={`icon-only-button-icon ${type}`} size={"16px"} />
        </button>
    )
}
