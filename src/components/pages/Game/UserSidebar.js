import React from 'react';
import ShipsContainer from './ShipsContainer2'
import './UserSidebar.css';
import { useSound } from '../../utils/Sound';

export default function UserSidebar(props) {

    let sound = useSound();

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
                <h2>{props.player.username}</h2>
                <h3>Oddano strzał!</h3>
                <button onClick={() => { sound.playPick(); props.switchPlayer(); }}>Gotowe!</button>
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

                <div>
                    <ShipsContainer
                        ships={props.ships}
                        username={props.player.user.username}
                        orientation={props.orientation}
                        setTilesNotAllowed={props.setNotAllowed}
                        setTilesNotAllowedEmpty={props.setTilesNotAllowedEmpty}
                        toggleAdjacentVisibility={props.toggleAdjacentVisibility} />
                </div>

                <div>
                    <button onClick={() => { sound.playPick(); props.toggleOrientation(); }}>Rotate</button>
                    <button onClick={() => { sound.playPick(); props.resetShips(props.player, props.setState); }}>Reset</button>
                    <button disabled={!props.allowRandom} onClick={() => { sound.playPick(); props.randomShipPlacement(props.player, props.setState); }}>Random ship placement</button>
                </div>

            </div>
        );
    } else if (props.type === "placement-player-A") {
        return (
            <div className='user-sidebar'>
                {props.player.user.username}
                <div>
                    <h3>Rozmieszczono wszystkie statki!</h3>
                    <button onClick={() => { sound.playPick(); props.resetShips(props.player, props.setState); }}>Reset</button>
                    <button onClick={() => { sound.playPick(); props.playerReady(); }}>Gotowe!</button>
                </div>
            </div>
        );
    } else if (props.type === "placement-player-B") {
        return (
            <div className='user-sidebar'>
                {props.player.username}
                <div>
                    <h3>Rozmieszczono wszystkie statki!</h3>
                    <button onClick={() => { sound.playPick(); props.resetShips(props.player.username); }}> Reset </button>
                    <button onClick={() => { sound.playPick(); props.playerReady(); }}> Gotowe! </button>
                </div>
            </div>
        );
    }

    if (props.type === 'my-turn') {
        return (
            <div className='user-sidebar'>
                <h2>{props.player.user.username}</h2>
                <button onClick={() => { sound.playPick(); props.playerReady(); }} disabled={!props.shotFired}>Gotowe!</button>
            </div>
        );
    }

    if (props.type === 'not-my-turn') {
        return (
            <div className='user-sidebar'>
                <h2>{props.player.user.username}</h2>
                <h3>Czekam na swoją rundę C:</h3>
            </div>
        );
    }

    if (props.type === 'computer-turn') {
        return (
            <div className='user-sidebar'>
                <h2>{props.player.user.username}</h2>
                <h3>Strzelam! {">:C"}</h3>
            </div>
        );
    }

}