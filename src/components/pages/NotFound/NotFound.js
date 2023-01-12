import React from 'react';
import './NotFound.css';
import { useNavigate } from 'react-router-dom';
import { TiArrowBack } from 'react-icons/ti';
import { useSound } from '../../utils/Sound';
import Sidebar from '../../reusable/ui/Sidebar.js';
import CenteredContainer from '../../reusable/containers/CenteredContainer';
import MediumButton from '../../reusable/buttons/MediumButton';
import OverviewButton from '../../reusable/buttons/OverviewButton';

export default function NotFound(props) {

    let sound = useSound();

    let navigate = useNavigate();

    const onClickBackButton = () => {
        sound.playPick();
        navigate("../");
    }

    return (
        <div className="upper-layer">

            <Sidebar type={"left"}
                children={
                    <div className="info">
                        <h3>Błąd 404: nie znaleziono strony</h3>
                        <p> Podany adres nie został odanleziony. Po naciśnięciu klawisza
                            <OverviewButton
                                IconLeft={TiArrowBack}
                                IconRight={null}
                                content="powrót"
                                color="var(--gradient-1)" />
                            zostaniesz przekierowana/y do strony głównej.</p>
                    </div>
                }>
            </Sidebar>

            <CenteredContainer>
                <div className='middle section centered'>
                    <h3>Nie znaleziono strony o podanym adresie</h3>
                    <MediumButton
                        IconLeft={TiArrowBack}
                        IconRight={null}
                        disabled={false}
                        content="powrót"
                        color="var(--gradient-1)"
                        onClick={() => onClickBackButton()}
                    />
                </div>

            </CenteredContainer>

        </div>
    )
}
