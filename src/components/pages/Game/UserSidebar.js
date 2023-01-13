import React from 'react';

import { useSound } from '../../utils/Sound';
import { RxRotateCounterClockwise } from 'react-icons/rx'
import { IoReloadOutline } from 'react-icons/io5'
import { BsDice5 } from 'react-icons/bs'
import { } from 'react-icons/'

import ShipsContainer from './ShipsContainer';
import ProfilePictureMedium from '../../reusable/images/ProfilePictureMedium';
import MediumButton from '../../reusable/buttons/MediumButton';
import IconOnlyButton from '../../reusable/buttons/IconOnlyButton';
import SmallButton from '../../reusable/buttons/SmallButton';
import IconOnlyLargeButton from '../../reusable/buttons/IconOnlyLargeButton';
import Sidebar from '../../reusable/ui/Sidebar';

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

            <>
                <Sidebar type="left">

                </Sidebar>
                <div className='user-sidebar'>

                    <div className="user-sidebar-header">
                        <ProfilePictureMedium src={props.player.user.image} />
                        <div className="user-sidebar-header-username">
                            <h3>{props.player.user.username}</h3>
                            <p>Rozmieszczenie statków</p>
                        </div>
                    </div>

                    <div className="user-sidebar-middle-section">
                        <h3>Dostępne statki</h3>
                        <div className="user-sidebar-ships-container">
                            <ShipsContainer
                                ships={props.ships}
                                username={props.player.user.username}
                                orientation={props.orientation}
                                setTilesNotAllowed={props.setNotAllowed}
                                setTilesNotAllowedEmpty={props.setTilesNotAllowedEmpty}
                                toggleAdjacentVisibility={props.toggleAdjacentVisibility} />
                        </div>
                    </div>


                    <div className="user-sidebar-button-group">
                        <IconOnlyLargeButton
                            id={"uneven"}
                            Icon={RxRotateCounterClockwise}
                            color="var(--gradient-1)"
                            onClick={() => {
                                sound.playPick();
                                props.toggleOrientation();
                            }}
                            disabled={false} />

                        <IconOnlyLargeButton
                            id={""}
                            Icon={IoReloadOutline}
                            color="var(--gradient-2)"
                            onClick={() => {
                                sound.playPick();
                                props.resetShips(props.player, props.setState);
                            }}
                            disabled={false} />

                        <IconOnlyLargeButton
                            id={""}
                            Icon={BsDice5}
                            color="var(--gradient-3)"
                            onClick={() => {
                                sound.playPick();
                                props.randomShipPlacement(props.player, props.setState);
                            }}
                            disabled={false} />
                    </div>
                </div>
            </>
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
                    <button onClick={() => { sound.playPick(); props.resetShips(props.player, props.setState); }}> Reset </button>
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