import React from 'react';
import './ProfilePicture.css';
import { FaPlus } from 'react-icons/fa';

import pick from '../../assets/pick2.mp3';

export default function ProfilePicture(props) {

    let src = pick;

    const onClick = () => {
        props.toggleInput();
        props.sound(src);
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