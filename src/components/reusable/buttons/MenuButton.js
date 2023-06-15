import React from 'react';
import PropTypes from 'prop-types';

import './MenuButton.css';

function MenuButton({ IconLeft, IconRight, color, content, onClick, disabled }) {

    console.log(IconLeft)

    return (
        <button className="menu-button" style={{ backgroundColor: `${color}` }} onClick={(e) => onClick(e)} disabled={disabled}>
            {IconLeft !== null ? <IconLeft className="menu-button-icon-left" size="30px" /> : <></>}
            <p className="menu-button-content">{content}</p>
            {IconRight !== null ? <IconRight className="menu-button-icon-right" size="30px" /> : <></>}
        </button>
    )
}

MenuButton.propTypes = {
    IconLeft: PropTypes.func,
    IconRight: PropTypes.func,
    color: PropTypes.string,
    content: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
}

export default MenuButton