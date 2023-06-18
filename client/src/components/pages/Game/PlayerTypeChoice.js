import React from 'react';
import PropTypes from 'prop-types';

import { GiHood } from 'react-icons/gi';
import { RiUser5Fill } from 'react-icons/ri';
import { useSound } from '../../utils/Sound';
import { IoChevronBackSharp } from 'react-icons/io5';

import Sidebar from '../../reusable/ui/Sidebar';
import CenteredContainer from '../../reusable/containers/CenteredContainer';
import LargeButton from '../../reusable/buttons/LargeButton';
import OverviewButton from '../../reusable/buttons/OverviewButton';
import IconOnlyButton from '../../reusable/buttons/IconOnlyButton';
import IconOnlyOverviewButton from '../../reusable/buttons/IconOnlyOverviewButton';

function PlayerTypeChoice({ setGamePhase }) {

    let sound = useSound();

    return (
        <div className="upper-layer">
            <Sidebar type={"left"}>
                <div className="info-container centered">
                    <h3>Wybór rodzaju gracza</h3>
                    <br />

                    <OverviewButton
                        IconLeft={RiUser5Fill}
                        IconRight={null}
                        content="zarejestrowany gracz"
                        color="var(--gradient-2)" />

                    <p align="justify">
                        Gra przeciwko graczowi, który posiada konto.
                        Rozgrywka zostanie zapisana w Twojej historii gier,
                        oraz w historii gier Twojego przeciwnika.</p>

                    <OverviewButton
                        IconLeft={GiHood}
                        IconRight={null}
                        content="gracz anonimowy"
                        color="var(--gradient-3)" />

                    <p align="justify">Gra przeciwko graczowi, który nie posiada konta.
                        Rozgrywka zostanie zapisana jedynie w Twojej historii gier.</p> <br />

                    <p align="justify"> Możesz powrócić do wyboru przeciwnika klikając
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
                    onClick={() => { sound.playPick(); setGamePhase("game-mode-choice") }}
                    disabled={false}
                    position={"top-left"}
                    shadow={"no-shadow"}
                    type={"back"} />

                <div className="upper section">
                    <h3>Wybierz rodzaj gracza</h3>
                </div>

                <div className="middle section centered-column">
                    <LargeButton
                        IconLeft={RiUser5Fill}
                        IconRight={null}
                        color={"var(--gradient-2)"}
                        content="zarejestrowany gracz"
                        disabled={false}
                        onClick={() => {
                            sound.playPick();
                            setGamePhase("players-list");
                        }} />

                    <LargeButton
                        IconLeft={GiHood}
                        IconRight={null}
                        color={"var(--gradient-3)"}
                        content="gracz anonimowy"
                        disabled={false}
                        onClick={() => {
                            sound.playPick();
                            setGamePhase("enter-name-player-B");
                        }} />
                </div>
            </CenteredContainer>
        </div>
    )
}

PlayerTypeChoice.propTypes = {
    setGamePhase: PropTypes.func
}

export default PlayerTypeChoice;