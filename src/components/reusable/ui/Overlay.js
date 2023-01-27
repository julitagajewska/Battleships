import React from 'react';
import PropTypes from 'prop-types';

import './Overlay.css';

function Overlay({ children }) {
    return (
        <div className="overlay">
            {children}
        </div>
    )
}

Overlay.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node])
}

export default Overlay;
