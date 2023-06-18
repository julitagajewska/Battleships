import React from 'react';
import PropTypes from 'prop-types';

import { useSound } from '../../utils/Sound';

import MediumButton from '../../reusable/buttons/MediumButton';
import CenteredContainerLight from '../../reusable/containers/CenteredContainerLight';
import Overlay from '../../reusable/ui/Overlay';

import { ImExit } from 'react-icons/im';
import { IoArrowBack } from 'react-icons/io5';

function ExitGameOverlay({ setExitOverlay, exit }) {

    const sound = useSound();

    return (
        <Overlay>
            <CenteredContainerLight>
                <div className='upper section'>
                    <h2>Wyjście</h2>
                </div>

                <div className='middle section exit-game-overlay-p'>
                    <p>
                        Czy na pewno chcesz opuścić grę?<br />
                        Obecny stan rozgrywki zostanie zapisany w Twojej historii gier.
                    </p>
                </div>

                <div className='lower section'>
                    <div className='button-group-row'>
                        <MediumButton
                            IconLeft={IoArrowBack}
                            IconRight={null}
                            color={"var(--gradient-2)"}
                            content="powrót"
                            onClick={() => {
                                sound.playPick();
                                setExitOverlay();
                            }}
                            disabled={false} />

                        <MediumButton
                            IconLeft={ImExit}
                            IconRight={null}
                            color={"var(--gradient-3)"}
                            content="wyjdź"
                            onClick={() => {
                                sound.playPick();
                                exit();
                            }}
                            disabled={false} />
                    </div>
                </div>
            </CenteredContainerLight>
        </Overlay>
    )
}

ExitGameOverlay.propTypes = {
    setExitOverlay: PropTypes.func,
    exit: PropTypes.func
}

export default ExitGameOverlay;