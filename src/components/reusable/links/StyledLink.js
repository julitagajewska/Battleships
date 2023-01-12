import React from 'react';
import { Link } from 'react-router-dom';
import './StyledLink.css';

export default function StyledLink({ to, color, content }) {

    return (
        <Link className="styled-link" to={to}>{content}</Link>
    )
}
