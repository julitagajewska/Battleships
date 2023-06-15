import React from 'react';

import { useAuth } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../../api/axios';
import { useSound } from '../../utils/Sound';

import CenteredContainer from '../../reusable/containers/CenteredContainer';
import MediumButton from '../../reusable/buttons/MediumButton';

import { IoArrowBack } from 'react-icons/io5';
import { RiDeleteBin5Fill } from 'react-icons/ri';

export default function ConfirmProfileDelete() {

    const auth = useAuth();
    const sound = useSound();
    const navigate = useNavigate();

    const onClickDeleteButton = async () => {

        await deleteUser(auth.user)
        auth.logout();

        navigate("../profileDeleted")
    }

    return (
        <CenteredContainer>
            <div className="upper section">
                <h3>Czy na pewno chcesz usunąć profil?</h3>
            </div>

            <div className="middle section">
                <p>Profil zostanie <b>trwale</b> usunięty - nie ma możliwości przywrócenia usuniętego konta.</p>
            </div>

            <div className="lower section delete-button-group">

                <MediumButton
                    IconLeft={IoArrowBack}
                    IconRight={null}
                    color="var(--gradient-1)"
                    content="powrót"
                    onClick={() => { sound.playPick(); navigate("../") }} />

                <MediumButton
                    IconLeft={RiDeleteBin5Fill}
                    IconRight={null}
                    color="var(--gradient-3)"
                    content="Usuń profil"
                    onClick={() => { sound.playPick(); onClickDeleteButton() }} />

            </div>
        </CenteredContainer>

    )
}
