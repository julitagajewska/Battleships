import React, { useState } from 'react'
import ProfilePicture from './ProfilePicture'
import './Profile.css';
import EditableText from '../../reusable/EditableText';
import LastGameOverview from './LastGameOverview';
import { TbSword } from 'react-icons/tb';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { GrUser } from 'react-icons/gr';
import { useAuth } from '../../utils/auth';

let panda = "https://i.pinimg.com/564x/6c/86/41/6c864199a6b727ba2ecb863c121991bc.jpg"

export default function Profile(props) {

    const auth = useAuth();

    let [update, setUpdate] = useState(true);

    const triggerUpdate = () => {
        setUpdate(!update)
    }


    return (
        <div className="profile-container">
            <div className="image-username-container">
                <ProfilePicture src={auth.user.image} />
                <p className="username">{auth.user.username}</p> {/*props.user.username */}
            </div>

            <div className="user-data-container">
                <p className="user-profile-header">
                    <GrUser className="header-icon" size={"30px"} />
                    Dane użytkownika
                </p>
                <div>
                    <EditableText
                        label="Nazwa"
                        id="username"
                        value={auth.user.username}
                        trigger={triggerUpdate} />
                    <EditableText
                        label="E-Mail"
                        id="mail"
                        value={auth.user.mail}
                        trigger={triggerUpdate} />
                    <EditableText
                        label="Hasło"
                        id="password"
                        value={auth.user.password}
                        trigger={triggerUpdate} />
                </div>
            </div>

            <div className="last-games-container">
                <p className="user-profile-header">
                    <TbSword className="header-icon" size={"30px"} />
                    Ostatnie potyczki
                </p>

                {auth.user.lastGames.map((game) => {
                    return <LastGameOverview />
                })}
            </div>

            <div className="options-container">
                <div className="delete-button-container">
                    <button className="delete-button">
                        <RiDeleteBin5Fill className="button-icon" size={"30px"} />
                        <p>USUŃ PROFIL</p>
                    </button>
                </div>

            </div>
        </div>
    )
}
