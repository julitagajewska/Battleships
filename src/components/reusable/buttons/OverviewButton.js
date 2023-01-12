import React from 'react';
import './Buttons.css';

import './OverviewButton.css';

export default function OverviewButton({ IconLeft, IconRight, color, content }) {

    return (
        <button className="overview-button">
            <div className="overview-button-wrapper" style={{ backgroundColor: `${color}` }}>
                {IconLeft !== null ? <IconLeft className="overview-button-icon-left" size="16px" /> : <></>}
                <p className="overview-button-content">{content}</p>
                {IconRight !== null ? <IconRight className="overview-button-icon-right" size="16px" /> : <></>}
            </div>
        </button>
    )
}
