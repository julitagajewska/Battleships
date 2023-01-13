import React from 'react';
import './IconOnlyOverviewButton.css'

export default function IconOnlyOverviewButton({ Icon, color, id }) {
    return (
        <button className="icon-only-overview-button " style={{ backgroundColor: `${color}` }}>
            <Icon className="icon-only-overview-button-icon" id={id} size={"16px"} />
        </button>
    )
}