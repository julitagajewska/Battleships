import React from 'react';
import { GiHood } from 'react-icons/gi';
import { RiUser5Fill } from 'react-icons/ri';
import { useSound } from '../../utils/Sound';
import Sidebar from '../../reusable/Sidebar';
import './PlayerTypeChoice.css';

export default function PlayerTypeChoice(props) {

    let sound = useSound();

    return (
        <div className="upper-layer">
            <Sidebar type={"left"}>
                HIEHIE
            </Sidebar>
            <div className="player-type-choice-container">
                <h3>Wybierz rodzaj gracza</h3>
                <div>
                    <button className="game-mode-button registered" onClick={() => {
                        props.setGamePhase("players-list");
                        sound.playPick()
                    }
                    }>
                        <RiUser5Fill
                            className='button-icon'
                            size={"26px"} />
                        <p>ZAREJESTROWANY GRACZ</p>
                    </button>
                    <button className="game-mode-button anonymous player-type" onClick={() => {
                        props.setGamePhase("enter-name-player-B");
                        sound.playPick()
                    }
                    }>
                        <GiHood
                            className='button-icon'
                            size={"26px"} />
                        <p>GRACZ ANONIMOWY</p>
                    </button>
                </div>
            </div>
        </div>
    )
}
