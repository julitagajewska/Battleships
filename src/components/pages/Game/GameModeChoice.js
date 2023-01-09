import React from 'react'
import './GameModeChoice.css';
import { RiUser5Fill } from 'react-icons/ri';
import { RiComputerFill } from 'react-icons/ri';
import { useSound } from '../../utils/Sound';
import { useAuth } from '../../utils/auth'

export default function GameModeChoice(props) {

    let sound = useSound();
    let auth = useAuth();

    return (
        <div className="upper-layer game-mode-choice-container">
            <h3>WYBIERZ PRZECIWNIKA</h3>
            <button className="game-mode-button pvp" onClick={() => {
                sound.playPick();
                props.setUser(auth.user)
                props.setGameMode('pvp');
            }}>
                <RiUser5Fill
                    className='game-mode-button-icon'
                    size={"26px"} />
                <h3>VS</h3>
                <RiUser5Fill
                    className='game-mode-button-icon'
                    size={"26px"} />
            </button>
            <button className="game-mode-button pvc" onClick={() => {
                sound.playPick();
                props.randomShipPlacement('computer');
                props.setUser(auth.user)
                props.setGameMode('pvc')
            }}>
                <RiUser5Fill
                    className='game-mode-button-icon'
                    size={"26px"} />
                <h3>VS</h3>
                <RiComputerFill
                    className='game-mode-button-icon'
                    size={"26px"} />
            </button>
        </div>
    )
}
