import React from 'react';
import { Game } from '../../../Models/Game';
import { getNewGameId, saveGame } from '../../../api/axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';

import CenteredContainer from '../../reusable/containers/CenteredContainer';
import MediumButton from '../../reusable/buttons/MediumButton';

export default function GameOver({ playerA, playerB }) {

    const navigate = useNavigate();

    let winner;
    let scoreTable = [];

    if (playerA.score === 17) {
        winner = playerA
    }

    if (playerB.score === 17) {
        winner = playerB
    }

    scoreTable = [playerA.score, playerB.score]

    let newId;

    const generateId = async () => {
        newId = await getNewGameId();
    }

    generateId();

    const save = async () => {

        let gameObject = new Game(
            newId,
            playerA.user,
            playerB.user,
            scoreTable,
        );

        console.log(gameObject);

        await saveGame(gameObject);
        navigate('../');
    }

    return (
        <CenteredContainer>
            <div className="upper section">
                <h3> Koniec gry! </h3>
            </div>

            <div className="upper section">
                <h4> Wygrywa {winner.user.username} </h4>
            </div>

            <div className="upper section">
                <MediumButton
                    IconLeft={IoMdArrowRoundBack}
                    IconRight={null}
                    onClick={() => save()}
                    content="powrót do menu głównego"
                    color="var(--gradient-1)"
                    disabled={false}
                />
            </div>
        </CenteredContainer>
    )
}
