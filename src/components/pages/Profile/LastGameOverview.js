import React from 'react';
import PropTypes from 'prop-types';

import ProfilePictureSmall from '../../reusable/images/ProfilePictureSmall';
import './LastGameOverview.css'

function LastGameOverview({ userA, userB, score }) {

    let playerA, playerB;
    let scoreA, scoreB;

    scoreA = score[0];
    scoreB = score[1];
    playerA = userA;
    playerB = userB;

    return (
        <div className="last-game-overview-container">
            <div className="last-game-user-a">
                <ProfilePictureSmall src={playerA.image} />
                <p>{playerA.username}</p>
            </div>

            <div className="last-game-score">
                <p> {scoreA} : {scoreB} </p>
            </div>

            <div className="last-game-user-b">
                <p>{playerB.username}</p>
                <ProfilePictureSmall src={playerB.image} />
            </div>
        </div>
    )
}

LastGameOverview.propTypes = {
    userA: PropTypes.object,
    userB: PropTypes.object,
    score: PropTypes.array,
}

export default LastGameOverview
