import React from 'react';
import './ProfilePicture.css';
import { FaPlus } from 'react-icons/fa';
import { useSound } from '../../utils/Sound';

export default function ProfilePicture(props) {

    const sound = useSound();

    const onClick = () => {
        sound.playPick();
        props.toggleInput();
    }

    return (
        <div className="profile-picture-container">
            <img className='profile-picture-img' src={props.src} alt="zdjęcie profilowe użytkownika" />
            <div className={`change-profile-picture-button ${props.isVisible ? "active" : ""}`} onClick={() => onClick()}>
                <FaPlus size={"16px"} />
            </div>
        </div>

    )
}