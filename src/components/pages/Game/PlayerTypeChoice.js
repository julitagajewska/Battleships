import React from 'react';
import { GiHood } from 'react-icons/gi';
import { RiUser5Fill } from 'react-icons/ri';
import { useSound } from '../../utils/Sound';
import Sidebar from '../../reusable/ui/Sidebar';
import OverviewButton from '../../reusable/buttons/OverviewButton';
import './PlayerTypeChoice.css';

export default function PlayerTypeChoice(props) {

    let sound = useSound();

    return (
        <div className="upper-layer">
            <Sidebar type={"left"}>
                <div className="info-container">
                    <h3>Wybór rodzaju gracza</h3>
                    <OverviewButton
                        color={"var(--gradient-4)"}
                        iconLeft={<RiUser5Fill className='button-overview-icon' size={"14px"} />}
                        content={"ZAREJESTROWANY GRACZ"} >
                    </OverviewButton> <br />

                    <p>Gra przeciwko graczowi, który posiada konto.
                        Rozgrywka zostanie zapisana w Twojej historii gier,
                        oraz w historii gier Twojego przeciwnika.</p>

                    <OverviewButton
                        color={"var(--gradient-2)"}
                        iconLeft={<GiHood className='button-overview-icon' size={"14px"} />}
                        content={"ANONIMOWY GRACZ"} >
                    </OverviewButton> <br />

                    <p>Gra przeciwko graczowi, który nie posiada konta.
                        Rozgrywka zostanie zapisana jedynie w Twojej historii gier.</p>

                </div>
            </Sidebar>
            <div className="player-type-choice-container">
                <h3>Wybierz rodzaj gracza</h3>
                <div className="player-type-button-group">
                    <button className="game-mode-button registered" onClick={() => {
                        sound.playPick();
                        props.setGamePhase("players-list");
                    }
                    }>
                        <RiUser5Fill
                            className='player-type-button-icon'
                            size={"30px"} />
                        <p>ZAREJESTROWANY GRACZ</p>
                    </button>
                    <button className="game-mode-button anonymous player-type" onClick={() => {
                        sound.playPick();
                        props.setGamePhase("enter-name-player-B");
                    }
                    }>
                        <GiHood
                            className='player-type-button-icon'
                            size={"30px"} />
                        <p>GRACZ ANONIMOWY</p>
                    </button>
                </div>
            </div>
        </div>
    )
}