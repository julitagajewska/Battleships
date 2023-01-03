import React from 'react'

export default function Score(props) {
    return (
        <div>
            <h3>Wynik</h3>
            <h5>{props.user_A.username}: {props.user_A.score}</h5>
            <h5>{props.user_B.username}: {props.user_B.score}</h5>
        </div>
    )
}
