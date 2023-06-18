import React from 'react';
import PropTypes from 'prop-types';

import { IoArrowBack } from 'react-icons/io5';

import MediumButton from '../../reusable/buttons/MediumButton';
import CenteredContainerLight from '../../reusable/containers/CenteredContainerLight';
import ProfilePictureMedium from '../../reusable/images/ProfilePictureMedium';

function GameOver({ playerA, playerB, exit }) {

    let winner;

    if (playerA.score === 17) {
        winner = playerA
    }

    if (playerB.score === 17) {
        winner = playerB
    }

    return (
        <CenteredContainerLight>
            <div className="upper section">
                <h3> KONIEC GRY </h3>
            </div>

            <div className="middle section">
                <ProfilePictureMedium src={winner.user.image} />
                <br /><br />
                <h3> Wygrywa {winner.user.username}! </h3>
            </div>

            <div className="upper section">
                <MediumButton
                    IconLeft={IoArrowBack}
                    IconRight={null}
                    onClick={() => exit()}
                    content="powrót"
                    color="var(--gradient-1)"
                    disabled={false}
                />
            </div>
        </CenteredContainerLight>
    )
}

GameOver.propTypes = {
    playerA: PropTypes.object,
    playerB: PropTypes.object,
    exit: PropTypes.func
}

export default GameOver;
