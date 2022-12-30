import React from 'react';
import ShipsContainer from './ShipsContainer2'
import './UserSidebar.css';

export default function UserSidebar(props) {

    return (
        <div className='user-sidebar'>
            {props.username}
            <ShipsContainer
                ships={props.ships}
                username={props.username}
                setEdges={props.setEdges}
                orientation={props.orientation}
                setTilesNotAllowed={props.setTilesNotAllowed}
                setTilesNotAllowedEmpty={props.setTilesNotAllowedEmpty}
                toggleAdjacentVisibility={props.toggleAdjacentVisibility} />
            <button onClick={() => props.toggleOrientation()}>Rotate</button>
            <button onClick={() => props.resetShips(props.username)}>Reset</button>
        </div>
    );

}