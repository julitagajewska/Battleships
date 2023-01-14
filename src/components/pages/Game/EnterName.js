import React, { useState } from 'react';
import { BsCheckLg } from 'react-icons/bs';
import { useSound } from '../../utils/Sound';
import { checkIfUserExists } from '../../../api/axios';
import { User } from '../../../Models/User';

import UsernameInput from '../../reusable/inputs/UsernameInput';
import ErrorMessage from '../../reusable/messages/ErrorMessage.js';
import IconOnlyButton from '../../reusable/buttons/IconOnlyButton.js';
import CenteredContainer from '../../reusable/containers/CenteredContainer';

export default function EnterName(props) {

    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);
    const [errors, setErrors] = useState([]); // Input errors
    const [error, setError] = useState([]); // Username taken error

    const sound = useSound();

    const onUsernameFocus = (value) => {
        setUsernameFocus(value);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        let errorInput = '';

        // Sprawdź czy wolne
        let result = await checkIfUserExists(username);
        if (result === true) {
            errorInput = "Istnieje już gracz o podanej nazwie"
            sound.playBlocked();
            setError([errorInput]);
            return;
        }

        let nweUser = new User(null, username, null, null, "/user-picture.png", null);

        sound.playPick();
        props.setUser(nweUser);
        props.setGamePhase('placement-player-A');
    }

    console.log(validUsername);

    return (
        <div className="upper-layer enter-name-container">
            <CenteredContainer>
                <div className="upper section">
                    <h3>NAZWA PRZECIWNIKA</h3>
                </div>

                <div className="middle section centered-row">
                    <UsernameInput
                        className="eter-name-username-input"
                        placeholder={"Nazwa przeciwnika"}
                        required={true}
                        setValue={setUsername}
                        setFocus={onUsernameFocus}
                        setValid={setValidUsername}
                        setErrors={setErrors}
                        setUsernameTaken={setError} />
                    <IconOnlyButton
                        Icon={BsCheckLg}
                        color="var(--gradient-1)"
                        onClick={(e) => handleSubmit(e)}
                        disabled={!validUsername} />
                </div>

                <div className="lowe section">
                    {error.length === 1 ?
                        <div className="enter-name-input-errors">
                            <ErrorMessage status={false} message={error[0]} />
                        </div>
                        :
                        <></>
                    }
                    {
                        usernameFocus && !validUsername && errors.length !== 0 ?
                            <div className={`enter-name-input-errors`}>
                                <ErrorMessage status={false} message={
                                    <div>
                                        {errors.map((error) => {
                                            return error
                                        })}
                                    </div>}
                                />
                            </div>
                            :
                            <></>
                    }
                </div>
            </CenteredContainer>
        </div>
    )
}
