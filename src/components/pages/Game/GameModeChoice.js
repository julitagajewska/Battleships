import React from 'react'

export default function GameModeChoice(props) {
    return (
        <div>
            <button onClick={() => props.setGameMode('pvp')}>Gracz vs. Gracz</button>
            <button onClick={() => { props.randomShipPlacement('computer'); props.setGameMode('pvc') }}>Gracz vs. Komputer</button>
        </div>
    )
}
