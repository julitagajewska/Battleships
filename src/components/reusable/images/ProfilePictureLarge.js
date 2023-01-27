import React from 'react';
import PropTypes from 'prop-types';

import './ProfilePictureLarge.css';

function ProfilePictureLarge({ src, alt }) {
    return (
        <img className="profile-picture-large" src={src} alt={alt} />
    )
}

ProfilePictureLarge.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string
}

export default ProfilePictureLarge;


