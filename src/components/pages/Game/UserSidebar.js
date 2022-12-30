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
                orientation={props.orientation} />
            <button onClick={() => props.toggleOrientation()}>Rotate ships</button>
        </div>
    );

}