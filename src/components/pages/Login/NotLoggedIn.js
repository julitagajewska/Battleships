import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSound } from '../../utils/Sound';
import { BiLogInCircle } from 'react-icons/bi';
import './NotLoggedIn.css';
import CenteredContainer from '../../reusable/containers/CenteredContainer';
import MediumButton from '../../reusable/buttons/MediumButton';

export default function NotLoggedIn(props) {

    let sound = useSound();
    let navigate = useNavigate();

    const onClickLogInButton = () => {
        sound.playPick();
        navigate("../login");
    }

    return (
        <div className="upper-layer">
            <CenteredContainer>
                <div className='upper section'>
                    <h3>Nie jesteś zalogowany!</h3>
                </div>

                <div className='middle section'>
                    <p>Dostęp do strony jest możliwy jedynie dla zalogowanych użytkowników.</p>
                </div>

                <div className='lower section centered'>
                    <MediumButton
                        IconLeft={BiLogInCircle}
                        IconRight={null}
                        color={"var(--gradient-1)"}
                        content="zaloguj się"
                        onClick={onClickLogInButton}
                        disabled={false} />
                </div>
            </CenteredContainer>
        </div>
    )
}
