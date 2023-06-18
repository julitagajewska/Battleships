import React from 'react';

import { useSound } from '../../utils/Sound';
import { useNavigate } from 'react-router-dom';

import { IoArrowBack } from 'react-icons/io5';
import { GoUnmute } from 'react-icons/go';
import { GoMute } from 'react-icons/go';

import CenteredContainer from '../../reusable/containers/CenteredContainer';
import MediumButton from '../../reusable/buttons/MediumButton';

export default function Settings() {

    const sound = useSound();
    const navigate = useNavigate();

    return (
        <CenteredContainer>
            <div className="upper section">
                <h3> Ustawienia</h3>
            </div>

            <div className="middle section">
                {sound.soundOn === true ?
                    <MediumButton
                        IconLeft={GoMute}
                        IconRight={null}
                        color={"var(--gradient-1)"}
                        content="Wycisz efekty dźwiękowe"
                        onClick={() => {
                            sound.playPick();
                            sound.toggleSound();
                        }} />
                    :
                    <MediumButton
                        IconLeft={GoUnmute}
                        IconRight={null}
                        color={"var(--gradient-3)"}
                        content="Włącz efekty dźwiękowe"
                        onClick={() => {
                            sound.playPick();
                            sound.toggleSound();
                        }} />
                }
            </div>

            <div className="lower section">
                <MediumButton
                    IconLeft={IoArrowBack}
                    IconRight={null}
                    color={"var(--gradient-1)"}
                    content="powrót"
                    onClick={() => {
                        sound.playPick();
                        navigate("../");
                    }} />
            </div>
        </CenteredContainer>
    )
}
