import React from 'react';

import './ProfilePictureMedium.css';

export default function ProfilePictureMedium({ src, alt }) {
    return (
        <img className="profile-picture-medium" src={src} alt={alt} />
    )
}
