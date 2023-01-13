import React from 'react';
import { GiHood } from 'react-icons/gi';
import { RiUser5Fill } from 'react-icons/ri';
import { useSound } from '../../utils/Sound';

import Sidebar from '../../reusable/ui/Sidebar';
import CenteredContainer from '../../reusable/containers/CenteredContainer';
import LargeButton from '../../reusable/buttons/LargeButton';
import OverviewButton from '../../reusable/buttons/OverviewButton';

export default function PlayerTypeChoice(props) {

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
                        Rozgrywka zostanie zapisana jedynie w Twojej historii gier.</p>

                </div>
            </Sidebar>
            <CenteredContainer>
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
                            props.setGamePhase("players-list");
                        }} />

                    <LargeButton
                        IconLeft={GiHood}
                        IconRight={null}
                        color={"var(--gradient-3)"}
                        content="gracz anonimowy"
                        disabled={false}
                        onClick={() => {
                            sound.playPick();
                            props.setGamePhase("enter-name-player-B");
                        }} />
                </div>
            </CenteredContainer>
        </div>
    )
}