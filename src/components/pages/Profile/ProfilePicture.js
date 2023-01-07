import React from 'react';
import './ProfilePicture.css';
import { FaPlus } from 'react-icons/fa';

export default function ProfilePicture(props) {
    return (
        <div className="profile-picture-container">
            <img className='profile-picture-img' src={props.src} alt="zdjęcie profilowe użytkownika" />
            <div className={`change-profile-picture-button ${props.isVisible ? "active" : ""}`} onClick={() => props.toggleInput()}>
                <FaPlus size={"16px"} />
            </div>
        </div>

    )
}