import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './EnterName.css';
import { BsCheckLg } from 'react-icons/bs';
import { useSound } from '../../utils/Sound';
import UsernameInput from '../../reusable/UsernameInput';
import { checkIfUserExists } from '../../../api/axios';
import ErrorMessage from '../../reusable/ErrorMessage.js';
import { User } from '../../../Models/User';

export default function EnterName(props) {

    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);
    const [errors, setErrors] = useState([]); // Input errors
    const [error, setError] = useState([]); // Username taken error

    const sound = useSound();
    const navigate = useNavigate();

    const onUsernameFocus = (value) => {
        if (value === true) {
            // sound.playPick();
        }

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

        let nweUser = new User(null, username, null, null, null, null);

        sound.playPick();
        props.setUser(nweUser);
        props.setGamePhase('placement-player-A');
    }


    return (
        <div className="upper-layer enter-name-container">
            <h3>NAZWA PRZECIWNIKA</h3>
            <form className="enter-name-form" onSubmit={(e) => handleSubmit(e)}>
                <UsernameInput
                    className="eter-name-username-input"
                    placeholder={"Nazwa przeciwnika"}
                    required={true}
                    setValue={setUsername}
                    setFocus={onUsernameFocus}
                    setValid={setValidUsername}
                    setErrors={setErrors}
                    setUsernameTaken={setError} />
                <button type='submit' className="enter-name-button">
                    <BsCheckLg
                        className='button-icon'
                        size={"20px"} />
                </button>
            </form>
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
    )
}
