import React from 'react';
import PropTypes from 'prop-types';

import './MediumButton.css';

function MediumButton({ content, IconLeft, IconRight, color, onClick, disabled }) {

    return (
        <button className="medium-button" style={{ backgroundColor: `${color}` }} onClick={(e) => onClick(e)} disabled={disabled}>
            {IconLeft !== null ? <IconLeft className="medium-button-icon-left" size="26px" /> : <></>}
            <p className="medium-button-content">{content}</p>
            {IconRight !== null ? <IconRight className="medium-button-icon-right" size="26px" /> : <></>}
        </button>
    )
}

MediumButton.propTypes = {
    IconLeft: PropTypes.func,
    IconRight: PropTypes.func,
    color: PropTypes.string,
    content: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
}

export default MediumButton
