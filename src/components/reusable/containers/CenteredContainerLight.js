import React from 'react';
import PropTypes from 'prop-types';
import './CenteredContainerLight.css';

function CenteredContainerLight({ children }) {
    return (
        <div className="centered-container-light">
            {children}
        </div>
    )
}


CenteredContainerLight.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node]),
}

export default CenteredContainerLight
