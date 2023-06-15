import React from 'react';
import PropTypes from 'prop-types';
import './IconOnlyButton.css';

function IconOnlyButton({ Icon, color, onClick, disabled, position, oval, shadow, type }) {
    return (
        <button className={`icon-only-button ${position} ${shadow} ${oval}`} style={{ backgroundColor: `${color}` }} onClick={(e) => onClick(e)} disabled={disabled}>
            <Icon className={`icon-only-button-icon ${type}`} size={"16px"} />
        </button>
    )
}

IconOnlyButton.propTypes = {
    Icon: PropTypes.func,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    color: PropTypes.string,
    position: PropTypes.string,
    oval: PropTypes.string,
    shadow: PropTypes.string,
    type: PropTypes.string
}

export default IconOnlyButton