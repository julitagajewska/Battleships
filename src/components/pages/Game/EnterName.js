import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useSound } from '../../utils/Sound';
import { checkIfUserExists } from '../../../api/axios';
import { User } from '../../../Models/User';

import { BsCheckLg } from 'react-icons/bs';
import { IoChevronBackSharp } from 'react-icons/io5';

import Sidebar from '../../reusable/ui/Sidebar';
import UsernameInput from '../../reusable/inputs/UsernameInput';
import ErrorMessage from '../../reusable/messages/ErrorMessage.js';
import IconOnlyButton from '../../reusable/buttons/IconOnlyButton.js';
import CenteredContainer from '../../reusable/containers/CenteredContainer';
import IconOnlyOverviewButton from '../../reusable/buttons/IconOnlyOverviewButton';


function EnterName({ setUser, setGamePhase }) {

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
        setUser(nweUser);
        setGamePhase('placement-player-A');
    }

    return (
        <div className="upper-layer enter-name-container">
            <Sidebar type="left">
                <div>
                    <h3>Nazwa przeciwnika</h3>
                    <p align="justify">
                        Na tej stronie możesz podać nazwę swojego przeciwnika. <br /><br />
                    </p>

                    <b>Nazwa użytkownika</b>
                    <ul>
                        <li>3 - 10 znaków</li>
                        <li>Nie może zawierać spacji</li>
                        <li>Nie może zawierać znaków specjalnych</li>
                        <li>Może zawierać:</li>
                        <ul>
                            <li>
                                Małe i wielkie litery
                            </li>
                            <li>Cyfry</li>
                            <li>Dozwolone znaki: _ -</li>
                        </ul>
                        <li>Nie można użyć nazwy zajętej przez zarezerwowanego gracza.</li>
                    </ul>

                    <p align="justify"><br /> Możesz powrócić do wyboru rodzaju gracza klikając
                        <IconOnlyOverviewButton
                            Icon={IoChevronBackSharp}
                            color={"rgba(18, 66, 87, 0.2)"}
                            shadow={"no-shadow"}
                            type={"back"} />
                        .
                    </p>
                </div>
            </Sidebar>

            <CenteredContainer>

                <IconOnlyButton
                    Icon={IoChevronBackSharp}
                    color={"rgba(18, 66, 87, 0.2)"}
                    onClick={() => { sound.playPick(); setGamePhase("player-type-choice") }}
                    disabled={false}
                    position={"top-left"}
                    shadow={"no-shadow"}
                    type={"back"} />


                <div className="upper section">
                    <h3>Nazwa przeciwnika</h3>
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

EnterName.propTypes = {
    setUser: PropTypes.func,
    setGamePhase: PropTypes.func
}

export default EnterName;