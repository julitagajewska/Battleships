import React from 'react'
import './GameModeChoice.css';
import { RiUser5Fill } from 'react-icons/ri';
import { RiComputerFill } from 'react-icons/ri';
import { useSound } from '../../utils/Sound';
import { useAuth } from '../../utils/auth';
import Sidebar from '../../reusable/Sidebar.js';
import ButtonOverview from '../../reusable/ButtonOverview';

export default function GameModeChoice(props) {

    let sound = useSound();

    return (
        <div>
            <Sidebar type="left">
                <div className="info">
                    <h3>Wybór przeciwnika</h3>
                    <p>
                        Na tej stronie możesz wybrać, przeciwko komu chciał(a)byś
                        rozegrać grę w statki. <br />
                        <br />

                        <ButtonOverview color={"var(--gradient-3)"}>
                            <RiUser5Fill
                                className='button-overview-icon'
                                size={"14px"} />
                            <h3>VS</h3>
                            <RiUser5Fill
                                className='button-overview-icon'
                                size={"14px"} />
                        </ButtonOverview>

                        Gra przeciwko graczowi <br />

                        <ButtonOverview color={"var(--gradient-2)"}>
                            <RiUser5Fill
                                className='button-overview-icon'
                                size={"14px"} />
                            <h3>VS</h3>
                            <RiComputerFill
                                className='button-overview-icon'
                                size={"14px"} />
                        </ButtonOverview>

                        Gra przeciwko komputerowi
                    </p>
                </div>
            </Sidebar>
            <div className="upper-layer game-mode-choice-container">

                <h3>WYBIERZ PRZECIWNIKA</h3>
                <button className="game-mode-button pvp" onClick={() => {
                    sound.playPick();
                    props.setGameMode('pvp');
                    props.setGamePhase('player-type-choice');
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
                    props.randomShipPlacement(props.player, props.setState);
                    props.setGameMode('pvc');
                    props.setGamePhase('placement-player-A');
                    props.game.userB = props.player;
                    props.setGame(props.game);
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
        </div>

    )
}
