import React from 'react';
import PropTypes from 'prop-types';

import './OverviewButton.css';

function OverviewButton({ IconLeft, IconRight, color, content, id }) {

    return (
        <button className="overview-button">
            <div className="overview-button-wrapper" style={{ backgroundColor: `${color}` }} id={id}>
                {IconLeft !== null ? <IconLeft className="overview-button-icon-left" size="16px" /> : <></>}
                <p className="overview-button-content">{content}</p>
                {IconRight !== null ? <IconRight className="overview-button-icon-right" size="16px" /> : <></>}
            </div>
        </button>
    )
}

OverviewButton.propTypes = {
    IconLeft: PropTypes.func,
    IconRight: PropTypes.func,
    color: PropTypes.string,
    content: PropTypes.string,
    id: PropTypes.string
}

export default OverviewButton