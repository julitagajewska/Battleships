import React from 'react';
import './ProfilePictureSmall.css';

export default function ProfilePictureSmall({ src, alt }) {
    return (
        <img className="profile-picture-small" src={src} alt={alt} />
    )
}
