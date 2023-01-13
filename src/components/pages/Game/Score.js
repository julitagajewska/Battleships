import React from 'react';
import './Score.css';

export default function Score(props) {
    return (
        <div className="score-component-container">
            <p>{props.playerA.score} : {props.playerB.score}</p>
        </div>
    )
}
