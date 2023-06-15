import React from 'react';
import PropTypes from 'prop-types';

import './ProfilePictureMedium.css';

function ProfilePictureMedium({ src, alt }) {
    return (
        <img className="profile-picture-medium" src={src} alt={alt} />
    )
}

ProfilePictureMedium.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string
}

export default ProfilePictureMedium; 
