import React from 'react';
import PropTypes from 'prop-types';
import './SmallButton.css';

function SmallButton({ content, IconLeft, IconRight, color, onClick, disabled }) {

    return (
        <button className="small-button" style={{ backgroundColor: `${color}` }} onClick={(e) => onClick(e)} disabled={disabled}>
            {IconLeft !== null ? <IconLeft className="small-button-icon-left" size="20px" /> : <></>}
            <p className="small-button-content">{content}</p>
            {IconRight !== null ? <IconRight className="small-button-icon-right" size="2px" /> : <></>}
        </button>
    )
}

SmallButton.propTypes = {
    content: PropTypes.string,
    IconLeft: PropTypes.func,
    IconRight: PropTypes.func,
    color: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool
}

export default SmallButton
