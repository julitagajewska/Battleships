import React from 'react';
import PropTypes from 'prop-types';

import './IconOnlyOverviewButton.css'

function IconOnlyOverviewButton({ Icon, color, id, shape, type, shadow, iconColor, animation }) {
    return (
        <button className={`icon-only-overview-button ${shape} ${shadow}`} style={{ backgroundColor: `${color}`, color: `${iconColor}` }} id={animation}>
            {Icon === null ? <></> : <Icon className={`icon-only-overview-button-icon ${type}`} id={id} size={"14px"} />}
        </button>
    )
}

IconOnlyOverviewButton.propTypes = {
    Icon: PropTypes.func,
    color: PropTypes.string,
    id: PropTypes.string,
    shape: PropTypes.string,
    type: PropTypes.string,
    shadow: PropTypes.string,
    iconColor: PropTypes.string,
    animation: PropTypes.string,
}

export default IconOnlyOverviewButton

