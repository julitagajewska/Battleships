import React from 'react'
import { useAuth } from '../../utils/auth';
import { useNavigate, Link } from 'react-router-dom';
import axios, { deleteUser } from '../../../api/axios';
import CenteredContainer from '../../reusable/containers/CenteredContainer';
import MediumButton from '../../reusable/buttons/MediumButton';
import { useSound } from '../../utils/Sound';
import { IoArrowBack } from 'react-icons/io5';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { BiLogInCircle } from 'react-icons/bi';

export default function ProfileDeleted(props) {

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
