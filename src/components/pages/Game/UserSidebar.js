import React from 'react';
import ShipsContainer from './ShipsContainer2'
import './UserSidebar.css';

export default function UserSidebar(props) {
    let allShipsPlaced = true;

    console.log(props.ships)

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
                <h2>{props.player.username}</h2>
                <h3>Oddano strzał!</h3>
                <button onClick={props.switchPlayer}>Gotowe!</button>
            </div>
        );
    }

    if ((props.type === "placement-player-A" ||
        props.type === "placement-player-B") &&
        allShipsPlaced === false) {
        return (
            <div className='user-sidebar'>

                <div>
                    {props.player.user.username}
                </div>

                {/* <div>
                    <ShipsContainer
                        ships={props.ships}
                        username={props.player.username}
                        setEdges={props.setEdges}
                        orientation={props.orientation}
                        setTilesNotAllowed={props.setTilesNotAllowed}
                        setTilesNotAllowedEmpty={props.setTilesNotAllowedEmpty}
                        toggleAdjacentVisibility={props.toggleAdjacentVisibility} />
                </div> */}

                <div>
                    <button onClick={() => props.toggleOrientation()}>Rotate</button>
                    <button onClick={() => props.resetShips(props.player, props.setState)}>Reset</button>
                    <button onClick={() => props.randomShipPlacement(props.player, props.setState)}>Random ship placement</button>
                </div>

            </div>
        );
    } else if (props.type === "placement-player-A") {
        return (
            <div className='user-sidebar'>
                {props.player.username}
                <div>
                    <h3>Rozmieszczono wszystkie statki!</h3>
                    <button onClick={() => props.resetShips(props.player.username)}>Reset</button>
                    <button onClick={() => props.readyPlayerA()}>Gotowe!</button>
                </div>
            </div>
        );
    } else if (props.type === "placement-player-B") {
        return (
            <div className='user-sidebar'>
                {props.player.username}
                <div>
                    <h3>Rozmieszczono wszystkie statki!</h3>
                    <button onClick={() => props.resetShips(props.player.username)}>Reset</button>
                    <button onClick={() => props.readyPlayerB()}>Gotowe!</button>
                </div>
            </div>
        );
    }

    if (props.type === 'my-turn') {
        return (
            <div className='user-sidebar'>
                <h2>{props.player.username}</h2>
                <button onClick={props.switchPlayer}>Gotowe!</button>
            </div>
        );
    }

    if (props.type === 'not-my-turn') {
        return (
            <div className='user-sidebar'>
                <h2>{props.player.username}</h2>
                <h3>Czekam na swoją rundę C:</h3>
            </div>
        );
    }



}