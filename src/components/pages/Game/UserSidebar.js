import React from 'react';
import PropTypes from 'prop-types';

import { useSound } from '../../utils/Sound';

import { RxRotateCounterClockwise } from 'react-icons/rx';
import { RxCross2 } from 'react-icons/rx';
import { BsDice5 } from 'react-icons/bs';
import { HiCheck } from 'react-icons/hi';

import ShipsContainer from './ShipsContainer';
import ProfilePictureMedium from '../../reusable/images/ProfilePictureMedium';
import MediumButton from '../../reusable/buttons/MediumButton';
import SmallButton from '../../reusable/buttons/SmallButton';
import IconOnlyLargeButton from '../../reusable/buttons/IconOnlyLargeButton';
import ShipPlacementInfo from '../../reusable/ui/ShipPlacementInfo';
import AllShipsPlaced from '../../reusable/ui/AllShipsPlaced';
import Sidebar from '../../reusable/ui/Sidebar';

import './UserSidebar.css';
function UserSidebar({
    ships, shotFired, type, player, computer, playerReady, setWaitingOverlay, orientation, setNotAllowed,
    setTilesNotAllowedEmpty, toggleAdjacentVisibility, toggleOrientation, resetShips, setState,
    randomShipPlacement, allowRandom }) {

    let sound = useSound();

    let allShipsPlaced = true;

    if (ships !== undefined) {
        ships.forEach(ship => {
            if (ship.coordinates.length === 0) {
                allShipsPlaced = false;
            }
        });
    }

    if (shotFired && type === "my-turn-A") {
        return (

            <div className='user-sidebar-left turn'>
                <div className="user-sidebar-header-left">
                    <ProfilePictureMedium src={player.user.image} />
                    <div className="user-sidebar-header-username-left">
                        <h3>{player.user.username}</h3>
                        <p>Oddano strzał!</p>
                    </div>
                </div>

                <div className="user-sidebar-shot-button-group">
                    <MediumButton
                        IconLeft={HiCheck}
                        IconRight={null}
                        content="Gotowe"
                        color={"var(--gradient-1)"}
                        disabled={!shotFired}
                        onClick={() => {
                            sound.playPick();
                            if (computer === true) {
                                playerReady();
                            } else {
                                setWaitingOverlay(true);
                            }
                        }} />
                </div>
            </div>
        );
    }

    if (shotFired && type === "my-turn-B") {
        return (
            <div className='user-sidebar-right turn'>
                <div className="user-sidebar-header-right">
                    <div className="user-sidebar-header-username-right">
                        <h3>{player.user.username}</h3>
                        <p>Oddano strzał!</p>
                    </div>
                    <ProfilePictureMedium src={player.user.image} />
                </div>

                <div className="user-sidebar-shot-button-group">
                    <MediumButton
                        IconLeft={HiCheck}
                        IconRight={null}
                        content="Gotowe"
                        color={"var(--gradient-1)"}
                        disabled={!shotFired}
                        onClick={() => { sound.playPick(); setWaitingOverlay(true) }} />
                </div>
            </div>
        );
    }

    if (type === "placement-player-A" && allShipsPlaced === false) {
        return (
            <>
                <Sidebar type="left" overflow="overflow-auto">
                    <ShipPlacementInfo />
                </Sidebar>


                <div className='user-sidebar-left'>

                    <div className="user-sidebar-header-left">
                        <ProfilePictureMedium src={player.user.image} />
                        <div className="user-sidebar-header-username-left">
                            <h3>{player.user.username}</h3>
                            <p>Rozmieszczenie statków</p>
                        </div>
                    </div>

                    <div className="user-sidebar-middle-section">
                        <h3>Dostępne statki</h3>
                        <div className="user-sidebar-ships-container">
                            <ShipsContainer
                                ships={ships}
                                username={player.user.username}
                                orientation={orientation}
                                setTilesNotAllowed={setNotAllowed}
                                setTilesNotAllowedEmpty={setTilesNotAllowedEmpty}
                                toggleAdjacentVisibility={toggleAdjacentVisibility} />
                        </div>
                    </div>


                    <div className="user-sidebar-button-group">
                        <IconOnlyLargeButton
                            id={"uneven"}
                            Icon={RxRotateCounterClockwise}
                            color="var(--gradient-1)"
                            onClick={() => {
                                sound.playPick();
                                toggleOrientation();
                            }}
                            disabled={false} />

                        <IconOnlyLargeButton
                            id={""}
                            Icon={RxCross2}
                            color="var(--gradient-2)"
                            onClick={() => {
                                sound.playPick();
                                resetShips(player, setState);
                            }}
                            disabled={false} />

                        <IconOnlyLargeButton
                            id={""}
                            Icon={BsDice5}
                            color="var(--gradient-3)"
                            onClick={() => {
                                sound.playPick();
                                randomShipPlacement(player, setState);
                            }}
                            disabled={!allowRandom} />
                    </div>
                </div>
            </>
        );
    } else if (type === "placement-player-B" && allShipsPlaced === false) {
        return (
            <>
                <Sidebar type="left" overflow="overflow-auto">
                    <ShipPlacementInfo />
                </Sidebar>

                <div className='user-sidebar-right'>

                    <div className="user-sidebar-header-left">
                        <ProfilePictureMedium src={player.user.image} />
                        <div className="user-sidebar-header-username-left">
                            <h3>{player.user.username}</h3>
                            <p>Rozmieszczenie statków</p>
                        </div>
                    </div>

                    <div className="user-sidebar-middle-section">
                        <h3>Dostępne statki</h3>
                        <div className="user-sidebar-ships-container">
                            <ShipsContainer
                                ships={ships}
                                username={player.user.username}
                                orientation={orientation}
                                setTilesNotAllowed={setNotAllowed}
                                setTilesNotAllowedEmpty={setTilesNotAllowedEmpty}
                                toggleAdjacentVisibility={toggleAdjacentVisibility} />
                        </div>
                    </div>


                    <div className="user-sidebar-button-group">
                        <IconOnlyLargeButton
                            id={"uneven"}
                            Icon={RxRotateCounterClockwise}
                            color="var(--gradient-1)"
                            onClick={() => {
                                sound.playPick();
                                toggleOrientation();
                            }}
                            disabled={false} />

                        <IconOnlyLargeButton
                            id={""}
                            Icon={RxCross2}
                            color="var(--gradient-2)"
                            onClick={() => {
                                sound.playPick();
                                resetShips(player, setState);
                            }}
                            disabled={false} />

                        <IconOnlyLargeButton
                            id={""}
                            Icon={BsDice5}
                            color="var(--gradient-3)"
                            onClick={() => {
                                sound.playPick();
                                randomShipPlacement(player, setState);
                            }}
                            disabled={!allowRandom} />
                    </div>
                </div>
            </>
        );
    } else if (type === "placement-player-A") {
        return (
            <>

                <Sidebar type="left">
                    <AllShipsPlaced />
                </Sidebar>


                <div className='user-sidebar-left'>

                    <div className="user-sidebar-header-left">
                        <ProfilePictureMedium src={player.user.image} />
                        <div className="user-sidebar-header-username-left">
                            <h3>{player.user.username}</h3>
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
                            onClick={() => { sound.playPick(); resetShips(player, setState); }} />

                        <SmallButton
                            IconLeft={HiCheck}
                            IconRight={null}
                            content="gotowe"
                            color={"var(--gradient-3)"}
                            disabled={false}
                            onClick={() => { sound.playPick(); playerReady(); }} />
                    </div>
                </div>
            </>

        );
    } else if (type === "placement-player-B") {
        return (

            <>
                <Sidebar type="left">
                    <AllShipsPlaced />
                </Sidebar>

                <div className='user-sidebar-right'>

                    <div className="user-sidebar-header-left">
                        <ProfilePictureMedium src={player.user.image} />
                        <div className="user-sidebar-header-username-left">
                            <h3>{player.user.username}</h3>
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
                            onClick={() => { sound.playPick(); resetShips(player, setState); }} />

                        <SmallButton
                            IconLeft={HiCheck}
                            IconRight={null}
                            content="gotowe"
                            color={"var(--gradient-3)"}
                            disabled={false}
                            onClick={() => { sound.playPick(); playerReady(); }} />
                    </div>
                </div>
            </>
        );
    }

    if (type === 'my-turn-A') {
        return (
            <div className='user-sidebar-left turn'>
                <div className="user-sidebar-header-left">
                    <ProfilePictureMedium src={player.user.image} />
                    <div className="user-sidebar-header-username-left">
                        <h3>{player.user.username}</h3>
                        <p>Strzelam!</p>
                    </div>
                </div>

                <div className="user-sidebar-shot-button-group">
                    <MediumButton
                        IconLeft={HiCheck}
                        IconRight={null}
                        content="Gotowe"
                        color={"var(--gradient-1)"}
                        disabled={!shotFired}
                        onClick={() => {
                            sound.playPick();
                            if (computer === true) {
                                playerReady();
                            } else {
                                setWaitingOverlay(true);
                            }
                        }} />
                </div>
            </div>
        );
    }

    if (type === 'my-turn-B') {

        return (
            <div className='user-sidebar-right turn'>
                <div className="user-sidebar-header-right">
                    <div className="user-sidebar-header-username-right">
                        <h3>{player.user.username}</h3>
                        <p>Strzelam!</p>
                    </div>
                    <ProfilePictureMedium src={player.user.image} />
                </div>

                <div className="user-sidebar-shot-button-group">
                    <MediumButton
                        IconLeft={HiCheck}
                        IconRight={null}
                        content="Gotowe"
                        color={"var(--gradient-1)"}
                        disabled={!shotFired}
                        onClick={() => { sound.playPick(); setWaitingOverlay(true) }} />
                </div>
            </div>
        );
    }

    if (type === 'not-my-turn-A') {
        return (
            <div className='user-sidebar-left waiting'>
                <div className="user-sidebar-header-left">
                    <ProfilePictureMedium src={player.user.image} />
                    <div className="user-sidebar-header-username-left">
                        <h3>{player.user.username}</h3>
                        <p>Czekam na swoją truę C:</p>
                    </div>
                </div>
            </div>
        );
    }

    if (type === 'not-my-turn-B') {
        return (
            <div className='user-sidebar-right waiting user-A'>
                <div className="user-sidebar-header-right">
                    <div className="user-sidebar-header-username-right">
                        <h3>{player.user.username}</h3>
                        <p>Czekam na swoją truę C:</p>
                    </div>
                    <ProfilePictureMedium src={player.user.image} />
                </div>
            </div>
        );
    }

    if (type === 'computer-turn') {
        return (
            <div className='user-sidebar-right waiting'>
                <div className="user-sidebar-header-right">
                    <div className="user-sidebar-header-username-right">
                        <h3>{player.user.username}</h3>
                        <p>{`Strzelam! >:C`}</p>
                    </div>
                    <ProfilePictureMedium src={player.user.image} />
                </div>
            </div>
        );
    }

}

UserSidebar.propTypes = {
    ships: PropTypes.array,
    shotFired: PropTypes.bool,
    type: PropTypes.string,
    player: PropTypes.object,
    computer: PropTypes.bool,
    playerReady: PropTypes.func,
    setWaitingOverlay: PropTypes.func,
    orientation: PropTypes.string,
    setNotAllowed: PropTypes.func,
    setTilesNotAllowedEmpty: PropTypes.func,
    toggleAdjacentVisibility: PropTypes.func,
    toggleOrientation: PropTypes.func,
    resetShips: PropTypes.func,
    setState: PropTypes.func,
    randomShipPlacement: PropTypes.func,
    allowRandom: PropTypes.bool
}

export default UserSidebar;