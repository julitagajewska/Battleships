import React from 'react'
import './GameModeChoice.css';
import { RiUser5Fill } from 'react-icons/ri';
import { RiComputerFill } from 'react-icons/ri';
import { useSound } from '../../utils/Sound';
import { useAuth } from '../../utils/auth';

import Sidebar from '../../reusable/ui/Sidebar.js';
import OverviewButton from '../../reusable/buttons/OverviewButton';
import CenteredContainer from '../../reusable/containers/CenteredContainer';
import MediumButton from '../../reusable/buttons/MediumButton';

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

                        <OverviewButton
                            IconLeft={RiUser5Fill}
                            IconRight={RiUser5Fill}
                            color={"var(--gradient-3)"}
                            content="vs" />
                        Gra przeciwko graczowi <br />
                        <OverviewButton
                            IconLeft={RiUser5Fill}
                            IconRight={RiComputerFill}
                            color={"var(--gradient-3)"}
                            content="vs" />
                        Gra przeciwko komputerowi
                    </p>
                </div>
            </Sidebar>
            <div className="upper-layer game-mode-choice-container">
                <CenteredContainer>

                    <div className='upper section'>
                        <h3>WYBIERZ PRZECIWNIKA</h3>
                    </div>

                    <div className='middle section'>
                        <MediumButton
                            IconLeft={RiUser5Fill}
                            IconRight={RiUser5Fill}
                            content="vs"
                            color={"var(--gradient-3)"}
                            onClick={() => {
                                sound.playPick();
                                props.setGameMode('pvp');
                                props.setGamePhase('player-type-choice');
                            }} />

                        <MediumButton
                            IconLeft={RiUser5Fill}
                            IconRight={RiComputerFill}
                            content="vs"
                            color={"var(--gradient-3)"}
                            onClick={() => {
                                sound.playPick();
                                props.setGameMode('pvp');
                                props.setGamePhase('player-type-choice');
                            }} />
                    </div>
                </CenteredContainer>


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
