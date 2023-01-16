import React from 'react'
import { BiChevronDown } from 'react-icons/bi';
import ProfilePictureSmall from '../../reusable/images/ProfilePictureSmall';
import './LastGameOverview.css'

export default function LastGameOverview({ currentUser, userA, userB, score }) {

    let playerA, playerB;
    let scoreA, scoreB;

    scoreA = score[0];
    scoreB = score[1];
    playerA = userA;
    playerB = userB;

    // playerB = userB;
    // scoreA = score[1];
    // scoreB = score[0];

    // if (currentUser.username === userA.username) {
    //     playerA = userA;
    //     scoreA = score[0];
    //     scoreB = score[1];
    // }

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
