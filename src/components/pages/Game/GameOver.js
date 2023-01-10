import React from 'react';
import { Game } from '../../../Models/Game';
import { getNewGameId, saveGame } from '../../../api/axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function GameOver(props) {

    const { playerA, playerB, ...rest } = props;
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
        <div className="upper-layer">
            <h3> Koniec gry! </h3>
            <h4> Wygrywa {winner.user.username} </h4>
            <button onClick={() => save()}>Powrót do menu głównego</button>
        </div>
    )
}
