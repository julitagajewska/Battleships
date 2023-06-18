import React, { useState, useEffect } from 'react';
import { useAuth } from '../../utils/auth';
import { editUser, getLastThreeGames } from '../../../api/axios';
import { useNavigate } from 'react-router-dom';
import { useSound } from '../../utils/Sound';

import { TbSword } from 'react-icons/tb';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { BsCheckLg } from 'react-icons/bs';
import { GrUser } from 'react-icons/gr';

import EditableText from '../../reusable/inputs/EditableText';
import LastGameOverview from './LastGameOverview';
import ProfilePicture from './ProfilePicture';
import InputErrors from '../../reusable/messages/InputErrors';

import './Profile.css';
import URLInput from '../../reusable/inputs/URLInput';
import LargeButton from '../../reusable/buttons/LargeButton';
import IconOnlyButton from '../../reusable/buttons/IconOnlyButton';

export default function Profile() {

    const auth = useAuth();
    const sound = useSound();
    const navigate = useNavigate();

    let [update, setUpdate] = useState(true)
    let [pictureInput, setPictureInput] = useState(false) // Picture input button - show/hide input

    let [pictureUrl, setPictureUrl] = useState(auth.user.image)
    let [isUrlValid, setIsUrlValid] = useState(true);
    let [urlErrorMessage, setUrlErrorMessage] = useState([]);

    let [urlFocus, setUrlFocus] = useState(false);

    let [lastThreeGames, setLastThreeGames] = useState([]);

    const getLastGames = async () => {
        let response = await getLastThreeGames(auth.user.username);
        setLastThreeGames(response.reverse())
    }

    useEffect(() => {
        getLastGames();
    }, []);

    const togglePictureInput = () => {
        setPictureInput(!pictureInput)
    }

    const saveImageUrl = async () => {

        sound.playPick();

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
                            <URLInput
                                size="small"
                                setValue={setPictureUrl}
                                setUrlFocus={setUrlFocus}
                                setValid={setIsUrlValid}
                                placeholder="Adres URL obrazu"
                                setErrors={setUrlErrorMessage} />

                            <IconOnlyButton
                                Icon={BsCheckLg}
                                color={"var(--gradient-1)"}
                                onClick={saveImageUrl}
                                disabled={isUrlValid ? false : true}
                                position={"centered"} />
                        </div>

                        <div className="profile-picture-input-lower-row">
                            <InputErrors
                                focus={urlFocus}
                                value={pictureUrl}
                                isValid={isUrlValid}
                                errors={urlErrorMessage} />
                        </div>

                    </div>
                    : <></>}
            </div>
            <div className="user-data-container">
                <div className="user-profile-header">
                    <GrUser className="header-icon" size={"24px"} />
                    <p className="sub-header">Dane użytkownika</p>
                </div>
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
                <div className="user-profile-header">
                    <TbSword className="header-icon" size={"24px"} />
                    <p className="sub-header">Ostatnie potyczki</p>
                </div>

                {lastThreeGames.map((game) => {
                    return <LastGameOverview
                        key={`game-oberview-tile-${game.id}`}
                        currentUser={auth.user}
                        userA={game.userA}
                        userB={game.userB}
                        score={game.score}
                    />
                })}
            </div>

            <div className="options-container">
                <div className="delete-button-container">
                    <LargeButton
                        IconLeft={RiDeleteBin5Fill}
                        IconRight={null}
                        color="var(--gradient-2)"
                        content={"usuń profil"}
                        onClick={() => navigate("./confirmProfileDelete")}
                        disabled={false} />
                </div>
            </div>
        </div>
    )
}
