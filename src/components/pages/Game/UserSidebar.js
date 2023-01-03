import React from 'react';
import ShipsContainer from './ShipsContainer2'
import './UserSidebar.css';

export default function UserSidebar(props) {
    let allShipsPlaced = true;

    if (props.ships !== undefined) {
        props.ships.forEach(ship => {
            if (ship.coordinates.length === 0) {
                allShipsPlaced = false;
            }
        });
    }

    if (props.shotFired) {
        return (
            <div className='user-sidebar'>
                <h2>{props.username}</h2>
                <h3>Oddano strzał!</h3>
                <button onClick={props.switchPlayer}>Gotowe!</button>
            </div>
        );
    }

    if ((props.type === "placement_user_A" ||
        props.type === "placement_user_B") &&
        allShipsPlaced === false) {
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
                <button onClick={() => props.randomShipPlacement(props.username)}>Random ship placement</button>
            </div>
        );
    } else if (props.type === "placement_user_A") {
        return (
            <div className='user-sidebar'>
                {props.username}
                <div>
                    <h3>Rozmieszczono wszystkie statki!</h3>
                    <button onClick={() => props.resetShips(props.username)}>Reset</button>
                    <button onClick={() => props.readyPlayerA()}>Gotowe!</button>
                </div>
            </div>
        );
    } else if (props.type === "placement_user_B") {
        return (
            <div className='user-sidebar'>
                {props.username}
                <div>
                    <h3>Rozmieszczono wszystkie statki!</h3>
                    <button onClick={() => props.resetShips(props.username)}>Reset</button>
                    <button onClick={() => props.readyPlayerB()}>Gotowe!</button>
                </div>
            </div>
        );
    }

    if (props.type === 'my-turn') {
        return (
            <div className='user-sidebar'>
                <h2>{props.username}</h2>
                <button onClick={props.switchPlayer}>Gotowe!</button>
            </div>
        );
    }

    if (props.type === 'not-my-turn') {
        return (
            <div className='user-sidebar'>
                <h2>{props.username}</h2>
                <h3>Czekam na swoją rundę C:</h3>
            </div>
        );
    }



}