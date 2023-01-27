import React from 'react'

import { useNavigate } from 'react-router-dom';
import { useSound } from '../../utils/Sound';

import CenteredContainer from '../../reusable/containers/CenteredContainer';
import MediumButton from '../../reusable/buttons/MediumButton';

import { BiLogInCircle } from 'react-icons/bi';

export default function ProfileDeleted() {

    const navigate = useNavigate();
    const sound = useSound();

    return (
        <CenteredContainer>
            <div className='upper section'>
                <h3> Usunięto profil pomyślnie! </h3>
            </div>

            <div className='middle section delete-button-group'>

                <MediumButton
                    IconLeft={BiLogInCircle}
                    IconRight={null}
                    color="var(--gradient-1)"
                    content="zaloguj się ponownie"
                    onClick={() => { sound.playPick(); navigate("../login") }} />
            </div>
        </CenteredContainer>
    )
}