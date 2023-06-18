import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './StyledLink.css';

function StyledLink({ to, content }) {

    return (
        <Link className="styled-link" to={to}>{content}</Link>
    )
}

StyledLink.propTypes = {
    to: PropTypes.string,
    content: PropTypes.string
}

export default StyledLink;
