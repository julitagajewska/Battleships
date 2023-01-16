import React from 'react';

import { useSound } from '../../utils/Sound';

import { RxRotateCounterClockwise } from 'react-icons/rx';
import { RxCross2 } from 'react-icons/rx';
import { BsDice5 } from 'react-icons/bs';
import { HiCheck } from 'react-icons/hi';
import { VscChromeClose } from 'react-icons/vsc';

import ShipsContainer from './ShipsContainer';
import ProfilePictureMedium from '../../reusable/images/ProfilePictureMedium';
import MediumButton from '../../reusable/buttons/MediumButton';
import IconOnlyButton from '../../reusable/buttons/IconOnlyButton';
import SmallButton from '../../reusable/buttons/SmallButton';
import IconOnlyLargeButton from '../../reusable/buttons/IconOnlyLargeButton';
import Sidebar from '../../reusable/ui/Sidebar';
import IconOnlyOverviewButton from '../../reusable/buttons/IconOnlyOverviewButton';
import OverviewButton from '../../reusable/buttons/OverviewButton';
import ShipPlacementInfo from '../../reusable/ui/ShipPlacementInfo';

import './UserSidebar.css';
import AllShipsPlaced from '../../reusable/ui/AllShipsPlaced';

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

    if (props.shotFired && props.type === "my-turn-A") {
        return (

            <div className='user-sidebar-left turn'>
                <div className="user-sidebar-header-left">
                    <ProfilePictureMedium src={props.player.user.image} />
                    <div className="user-sidebar-header-username-left">
                        <h3>{props.player.user.username}</h3>
                        <p>Oddano strzał!</p>
                    </div>
                </div>

                <div className="user-sidebar-shot-button-group">
                    <MediumButton
                        IconLeft={HiCheck}
                        IconRight={null}
                        content="Gotowe"
                        color={"var(--gradient-1)"}
                        disabled={!props.shotFired}
                        onClick={() => {
                            sound.playPick();
                            if (props.computer === true) {
                                props.playerReady();
                            } else {
                                props.setWaitingOverlay(true);
                            }
                        }} />
                </div>
            </div>
        );
    }

    if (props.shotFired && props.type === "my-turn-B") {
        return (
            <div className='user-sidebar-right turn'>
                <div className="user-sidebar-header-right">
                    <div className="user-sidebar-header-username-right">
                        <h3>{props.player.user.username}</h3>
                        <p>Oddano strzał!</p>
                    </div>
                    <ProfilePictureMedium src={props.player.user.image} />
                </div>

                <div className="user-sidebar-shot-button-group">
                    <MediumButton
                        IconLeft={HiCheck}
                        IconRight={null}
                        content="Gotowe"
                        color={"var(--gradient-1)"}
                        disabled={!props.shotFired}
                        onClick={() => { sound.playPick(); props.setWaitingOverlay(true) }} />
                </div>
            </div>
        );
    }

    if (props.type === "placement-player-A" && allShipsPlaced === false) {
        return (
            <>
                <ShipPlacementInfo />

                <div className='user-sidebar-left'>

                    <div className="user-sidebar-header-left">
                        <ProfilePictureMedium src={props.player.user.image} />
                        <div className="user-sidebar-header-username-left">
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
                            Icon={RxCross2}
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
                            disabled={!props.allowRandom} />
                    </div>
                </div>
            </>
        );
    } else if (props.type === "placement-player-B" && allShipsPlaced === false) {
        return (
            <>
                <ShipPlacementInfo />

                <div className='user-sidebar-right'>

                    <div className="user-sidebar-header-left">
                        <ProfilePictureMedium src={props.player.user.image} />
                        <div className="user-sidebar-header-username-left">
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
                            Icon={RxCross2}
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
                            disabled={!props.allowRandom} />
                    </div>
                </div>
            </>
        );
    } else if (props.type === "placement-player-A") {
        return (
            <>
                <AllShipsPlaced />

                <div className='user-sidebar-left'>

                    <div className="user-sidebar-header-left">
                        <ProfilePictureMedium src={props.player.user.image} />
                        <div className="user-sidebar-header-username-left">
                            <h3>{props.player.user.username}</h3>
                            <p>Rozmieszczenie statków</p>
                        </div>
                    </div>

                    <div className="user-sidebar-middle-section">
                        <p align="center">Rozmieszczono wszystkie statki!</p>
                    </div>

                    <div className="user-sidebar-ships-placed-button-group">
                        <SmallButton
                            IconLeft={RxCross2}
                            IconRight={null}
                            content="resetuj"
                            color={"var(--gradient-1)"}
                            disabled={false}
                            onClick={() => { sound.playPick(); props.resetShips(props.player, props.setState); }} />

                        <SmallButton
                            IconLeft={HiCheck}
                            IconRight={null}
                            content="gotowe"
                            color={"var(--gradient-3)"}
                            disabled={false}
                            onClick={() => { sound.playPick(); props.playerReady(); }} />
                    </div>
                </div>
            </>

        );
    } else if (props.type === "placement-player-B") {
        return (

            <>
                <AllShipsPlaced />

                <div className='user-sidebar-right'>

                    <div className="user-sidebar-header-left">
                        <ProfilePictureMedium src={props.player.user.image} />
                        <div className="user-sidebar-header-username-left">
                            <h3>{props.player.user.username}</h3>
                            <p>Rozmieszczenie statków</p>
                        </div>
                    </div>

                    <div className="user-sidebar-middle-section">
                        <p align="center">Rozmieszczono wszystkie statki!</p>
                    </div>

                    <div className="user-sidebar-ships-placed-button-group">
                        <SmallButton
                            IconLeft={RxCross2}
                            IconRight={null}
                            content="resetuj"
                            color={"var(--gradient-1)"}
                            disabled={false}
                            onClick={() => { sound.playPick(); props.resetShips(props.player, props.setState); }} />

                        <SmallButton
                            IconLeft={HiCheck}
                            IconRight={null}
                            content="gotowe"
                            color={"var(--gradient-3)"}
                            disabled={false}
                            onClick={() => { sound.playPick(); props.playerReady(); }} />
                    </div>
                </div>
            </>
        );
    }

    if (props.type === 'my-turn-A') {
        return (
            <div className='user-sidebar-left turn'>
                <div className="user-sidebar-header-left">
                    <ProfilePictureMedium src={props.player.user.image} />
                    <div className="user-sidebar-header-username-left">
                        <h3>{props.player.user.username}</h3>
                        <p>Strzelam!</p>
                    </div>
                </div>

                <div className="user-sidebar-shot-button-group">
                    <MediumButton
                        IconLeft={HiCheck}
                        IconRight={null}
                        content="Gotowe"
                        color={"var(--gradient-1)"}
                        disabled={!props.shotFired}
                        onClick={() => {
                            sound.playPick();
                            if (props.computer === true) {
                                props.playerReady();
                            } else {
                                props.setWaitingOverlay(true);
                            }
                        }} />
                </div>
            </div>
        );
    }

    if (props.type === 'my-turn-B') {

        return (
            <div className='user-sidebar-right turn'>
                <div className="user-sidebar-header-right">
                    <div className="user-sidebar-header-username-right">
                        <h3>{props.player.user.username}</h3>
                        <p>Strzelam!</p>
                    </div>
                    <ProfilePictureMedium src={props.player.user.image} />
                </div>

                <div className="user-sidebar-shot-button-group">
                    <MediumButton
                        IconLeft={HiCheck}
                        IconRight={null}
                        content="Gotowe"
                        color={"var(--gradient-1)"}
                        disabled={!props.shotFired}
                        onClick={() => { sound.playPick(); props.setWaitingOverlay(true) }} />
                </div>
            </div>
        );
    }

    if (props.type === 'not-my-turn-A') {
        return (
            <div className='user-sidebar-left waiting'>
                <div className="user-sidebar-header-left">
                    <ProfilePictureMedium src={props.player.user.image} />
                    <div className="user-sidebar-header-username-left">
                        <h3>{props.player.user.username}</h3>
                        <p>Czekam na swoją truę C:</p>
                    </div>
                </div>
            </div>
        );
    }

    if (props.type === 'not-my-turn-B') {
        return (
            <div className='user-sidebar-right waiting user-A'>
                <div className="user-sidebar-header-right">
                    <div className="user-sidebar-header-username-right">
                        <h3>{props.player.user.username}</h3>
                        <p>Czekam na swoją truę C:</p>
                    </div>
                    <ProfilePictureMedium src={props.player.user.image} />
                </div>
            </div>
        );
    }

    if (props.type === 'computer-turn') {
        return (
            <div className='user-sidebar-right waiting'>
                <div className="user-sidebar-header-right">
                    <div className="user-sidebar-header-username-right">
                        <h3>{props.player.user.username}</h3>
                        <p>{`Strzelam! >:C`}</p>
                    </div>
                    <ProfilePictureMedium src={props.player.user.image} />
                </div>
            </div>
        );
    }

}