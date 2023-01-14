import React from 'react';
import './IconOnlyOverviewButton.css'

export default function IconOnlyOverviewButton({ Icon, color, id, shape, shadow, iconColor, animation }) {
    return (
        <button className={`icon-only-overview-button ${shape} ${shadow}`} style={{ backgroundColor: `${color}`, color: `${iconColor}` }} id={animation}>
            {Icon === null ? <></> : <Icon className="icon-only-overview-button-icon" id={id} size={"16px"} />}
        </button>
    )
}