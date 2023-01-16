import React from 'react'
import { useNavigate } from 'react-router-dom';

import { RiUser5Fill } from 'react-icons/ri';
import { RiComputerFill } from 'react-icons/ri';
import { useSound } from '../../utils/Sound';
import { IoChevronBackSharp } from 'react-icons/io5';

import Sidebar from '../../reusable/ui/Sidebar.js';
import OverviewButton from '../../reusable/buttons/OverviewButton';
import CenteredContainer from '../../reusable/containers/CenteredContainer';
import LargeButton from '../../reusable/buttons/LargeButton';
import IconOnlyButton from '../../reusable/buttons/IconOnlyButton';
import IconOnlyOverviewButton from '../../reusable/buttons/IconOnlyOverviewButton';

export default function GameModeChoice(props) {

    let sound = useSound();
    let navigate = useNavigate();

    return (
        <div>
            <Sidebar type="left">
                <div className="info">
                    <h3>Wybór przeciwnika</h3>
                    <p align="justify">
                        Na tej stronie możesz wybrać, przeciwko komu chciał(a)byś
                        rozegrać grę w statki. <br />
                        <br />

                        <OverviewButton
                            IconLeft={RiUser5Fill}
                            IconRight={RiUser5Fill}
                            color={"var(--gradient-2)"}
                            content="vs" />

                        Gra przeciwko graczowi <br />
                        <OverviewButton
                            IconLeft={RiUser5Fill}
                            IconRight={RiComputerFill}
                            color={"var(--gradient-3)"}
                            content="vs" />
                        Gra przeciwko komputerowi
                    </p>

                    <p align="justify"> Możesz powrócić do menu klikając
                        <IconOnlyOverviewButton
                            Icon={IoChevronBackSharp}
                            color={"rgba(18, 66, 87, 0.2)"}
                            shadow={"no-shadow"}
                            type={"back"} />
                        .
                    </p>
                </div>
            </Sidebar>
            <div className="upper-layer game-mode-choice-container">
                <CenteredContainer>


                    <IconOnlyButton
                        Icon={IoChevronBackSharp}
                        color={"rgba(18, 66, 87, 0.2)"}
                        onClick={() => { sound.playPick(); navigate("../") }}
                        disabled={false}
                        position={"top-left"}
                        shadow={"no-shadow"}
                        type={"back"} />

                    <div className='upper section'>
                        <h3>Wybierz przeciwnika</h3>
                    </div>

                    <div className='middle section centered-column'>
                        <LargeButton
                            IconLeft={RiUser5Fill}
                            IconRight={RiUser5Fill}
                            content="vs"
                            color={"var(--gradient-2)"}
                            onClick={() => {
                                sound.playPick();
                                props.setGameMode('pvp');
                                props.setGamePhase('player-type-choice');
                            }} />

                        <LargeButton
                            IconLeft={RiUser5Fill}
                            IconRight={RiComputerFill}
                            content="vs"
                            color={"var(--gradient-3)"}
                            onClick={() => {
                                sound.playPick();
                                props.randomShipPlacement(props.player, props.setState);
                                props.setGameMode('pvc');
                                props.setGamePhase('placement-player-A');
                                props.setState(props.player);
                                // props.setGame(props.game);
                            }} />
                    </div>
                </CenteredContainer>
            </div>
        </div>

    )
}
