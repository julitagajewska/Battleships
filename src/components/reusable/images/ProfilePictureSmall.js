import React from 'react';
import PropTypes from 'prop-types';

import './ProfilePictureSmall.css';

function ProfilePictureSmall({ src, alt, imgKey }) {
    return (
        <img key={imgKey} className="profile-picture-small" src={src} alt={alt} />
    )
}

ProfilePictureSmall.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    imgKey: PropTypes.string,
}

export default ProfilePictureSmall; 