import React from 'react';
import PropTypes from 'prop-types';

import './ProfilePicture.css';

import { FaPlus } from 'react-icons/fa';
import { useSound } from '../../utils/Sound';

import ProfilePictureLarge from '../../reusable/images/ProfilePictureLarge';

function ProfilePicture({ src, isVisible, toggleInput }) {

    const sound = useSound();

    const onClick = () => {
        sound.playPick();
        toggleInput();
    }

    return (
        <div className="profile-picture-container">
            <ProfilePictureLarge src={src} alt={"zdjęcie profilowe użytkownika"} />
            <div className={`change-profile-picture-button ${isVisible ? "active" : ""}`} onClick={() => onClick()}>
                <FaPlus size={"16px"} />
            </div>
        </div>

    )
}

ProfilePicture.ptopTypes = {
    src: PropTypes.string,
    isVisible: PropTypes.func,
    toggleInput: PropTypes.func

}

export default ProfilePicture;