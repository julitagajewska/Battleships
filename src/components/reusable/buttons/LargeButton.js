import React from 'react';
import PropTypes from 'prop-types';
import './LargeButton.css';

function LargeButton({ IconLeft, IconRight, color, content, onClick, disabled }) {

    return (
        <button className="large-button" style={{ backgroundColor: `${color}` }} onClick={(e) => onClick(e)} disabled={disabled}>
            {IconLeft !== null ? <IconLeft className="large-button-icon-left" size="30px" /> : <></>}
            <p className="large-button-content">{content}</p>
            {IconRight !== null ? <IconRight className="large-button-icon-right" size="30px" /> : <></>}
        </button>
    )
}


LargeButton.propTypes = {
    IconLeft: PropTypes.func,
    IconRight: PropTypes.func,
    color: PropTypes.string,
    content: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
}

export default LargeButton