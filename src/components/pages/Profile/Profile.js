import React, { useState, useEffect } from 'react'
import ProfilePicture from './ProfilePicture'
import './Profile.css';
import EditableText from '../../reusable/EditableText';
import LastGameOverview from './LastGameOverview';
import { TbSword } from 'react-icons/tb';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { BsCheckLg } from 'react-icons/bs';
import { GrUser } from 'react-icons/gr';
import { useAuth } from '../../utils/auth';
import axios, { editUser, deleteUser } from '../../../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import ErrorMessage from '../../reusable/ErrorMessage';
import { isValidURL } from '../../utils/Validators'

let panda = "https://i.pinimg.com/564x/6c/86/41/6c864199a6b727ba2ecb863c121991bc.jpg"

export default function Profile(props) {

    const auth = useAuth()
    const navigate = useNavigate()

    let [update, setUpdate] = useState(true)
    let [pictureInput, setPictureInput] = useState(false)
    let [pictureUrl, setPictureUrl] = useState(auth.user.image)
    let [isUrlValid, setIsUrlValid] = useState(true);
    let [errorMessage, setErrorMessage] = useState([]);
    let [urlFocus, setUrlFocus] = useState(false);

    useEffect(() => {
        let valid = true;
        if (isValidURL(pictureUrl) !== true) {
            setErrorMessage([<p>Wprowadzono zły URL</p>])
            valid = false;
        } else {
            setErrorMessage([]);
        }

        setIsUrlValid(valid);

        console.log(isValidURL(pictureUrl))
        console.log(errorMessage)
        console.log(isUrlValid)
    }, [pictureUrl])

    const togglePictureInput = () => {
        setPictureInput(!pictureInput)
    }

    const saveImageUrl = async () => {

        let editedUser = auth.user;

        editedUser['image'] = pictureUrl;

        await editUser(editedUser);
        auth.updateUser(editedUser);

        setPictureInput(false);
        triggerUpdate();
    }

    const triggerUpdate = () => {
        setUpdate(!update)
    }

    return (
        <div className="profile-container">
            <div className="image-username-container">
                <ProfilePicture src={auth.user.image} toggleInput={togglePictureInput} isVisible={pictureInput} />
                <div>
                    <p className="username">{auth.user.username}</p>
                </div>
                {pictureInput ?
                    <div className="image-url-input-group">

                        <div className="profile-picture-input-upper-row">
                            <input
                                type="text"
                                placeholder="url"
                                onChange={(e) => setPictureUrl(e.target.value)}
                                onFocus={() => setUrlFocus(true)}
                                onBlur={() => setUrlFocus(false)} />
                            <button onClick={saveImageUrl} disabled={isUrlValid ? false : true}>
                                <BsCheckLg size={"14px"} />
                            </button>
                        </div>

                        <div className="profile-picture-input-lower-row">
                            {urlFocus && isValidURL ?
                                <ErrorMessage status={false} message={
                                    <ul>
                                        {errorMessage.map((error) => {
                                            return error
                                        })}
                                    </ul>} />
                                : <></>}
                        </div>

                    </div>
                    : <></>}
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
                    <button className="delete-button" onClick={() => navigate("./confirmProfileDelete")}>
                        <RiDeleteBin5Fill className="button-icon" size={"30px"} />
                        <p>USUŃ PROFIL</p>
                    </button>
                </div>

            </div>
        </div>
    )
}
