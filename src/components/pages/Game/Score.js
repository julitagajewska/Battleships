import React from 'react'

export default function Score(props) {
    return (
        <div>
            <h3>Wynik</h3>
            <h5>{props.playerA.user.username}: {props.playerA.score}</h5>
            <h5>{props.playerB.user.username}: {props.playerB.score}</h5>
        </div>
    )
}
