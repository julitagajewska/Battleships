import React from 'react';
import PropTypes from 'prop-types';
import './IconOnlyLargeButton.css';

function IconOnlyButton({ Icon, color, onClick, disabled, id }) {
    console.log(disabled)
    return (
        <button className="icon-only-large-button" style={{ backgroundColor: `${color}` }} onClick={(e) => onClick(e)} disabled={disabled}>
            <Icon className="icon-only-button-large-icon" id={id} size={"30px"} />
        </button>
    )
}

IconOnlyButton.propTypes = {
    Icon: PropTypes.func,
    color: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    id: PropTypes.string
}

export default IconOnlyButton