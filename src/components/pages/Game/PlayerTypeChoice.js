import React from 'react';
import { GiHood } from 'react-icons/gi';
import { RiUser5Fill } from 'react-icons/ri';
import { useSound } from '../../utils/Sound';
import Sidebar from '../../reusable/Sidebar';
import ButtonOverview from '../../reusable/ButtonOverview';
import './PlayerTypeChoice.css';

export default function PlayerTypeChoice(props) {

    let sound = useSound();

    return (
        <div className="upper-layer">
            <Sidebar type={"left"}>
                <div className="info-container">
                    <h3>Wybór rodzaju gracza</h3>
                    <ButtonOverview color={"var(--gradient-4)"}>
                        <RiUser5Fill
                            className='button-overview-icon'
                            size={"14px"} />
                        <h3>ZAREJESTROWANY GRACZ</h3>
                    </ButtonOverview> <br />

                    <p>Gra przeciwko graczowi, który posiada konto.
                        Rozgrywka zostanie zapisana w Twojej historii gier,
                        oraz w historii gier Twojego przeciwnika.</p>

                    <ButtonOverview color={"var(--gradient-2)"}>
                        <GiHood
                            className='button-overview-icon'
                            size={"14px"} />
                        <h3>ANONIMOWY GRACZ</h3>
                    </ButtonOverview> <br />

                    <p>Gra przeciwko graczowi, który nie posiada konta.
                        Rozgrywka zostanie zapisana jedynie w Twojej historii gier.</p>

                </div>
            </Sidebar>
            <div className="player-type-choice-container">
                <h3>Wybierz rodzaj gracza</h3>
                <div class="player-type-button-group">
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