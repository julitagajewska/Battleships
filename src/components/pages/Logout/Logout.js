import React from 'react';

import { useNavigate } from 'react-router-dom';
import { useSound } from '../../utils/Sound';
import { BiLogInCircle } from 'react-icons/bi';

import CenteredContainer from '../../reusable/containers/CenteredContainer';
import MediumButton from '../../reusable/buttons/MediumButton';

export default function Logout() {

    const navigate = useNavigate();
    const sound = useSound();

    return (
        <CenteredContainer>
            <div className="upper section">
                <h3>Wylogowano!</h3>
            </div>

            <div className="middle section">
                <MediumButton
                    IconLeft={BiLogInCircle}
                    IconRight={null}
                    color={"var(--gradient-1)"}
                    onClick={() => { sound.playPick(); navigate("/login") }}
                    content={"Zaloguj się ponownie"}
                    disabled={false} />
            </div>
        </CenteredContainer>
    )
}
