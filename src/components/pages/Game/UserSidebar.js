import React from 'react';
import ShipsContainer from './ShipsContainer'
import './UserSidebar.css';

export default function UserSidebar(props) {

    return (
        <div className='user-sidebar'>
            {props.username}
            <ShipsContainer ships={props.ships} username={props.username} />
        </div>
    );

}