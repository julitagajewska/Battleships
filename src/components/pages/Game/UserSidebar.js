import React from 'react';

import { useSound } from '../../utils/Sound';
import { RxRotateCounterClockwise } from 'react-icons/rx';
import { RxCross2 } from 'react-icons/rx';
import { BsDice5 } from 'react-icons/bs';
import { HiCheck } from 'react-icons/hi';
import { RiCloseFill } from 'react-icons/ri';

import ShipsContainer from './ShipsContainer';
import ProfilePictureMedium from '../../reusable/images/ProfilePictureMedium';
import MediumButton from '../../reusable/buttons/MediumButton';
import IconOnlyButton from '../../reusable/buttons/IconOnlyButton';
import SmallButton from '../../reusable/buttons/SmallButton';
import IconOnlyLargeButton from '../../reusable/buttons/IconOnlyLargeButton';
import Sidebar from '../../reusable/ui/Sidebar';
import IconOnlyOverviewButton from '../../reusable/buttons/IconOnlyOverviewButton';
import OverviewButton from '../../reusable/buttons/OverviewButton';

import './UserSidebar.css';

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

            <div className='user-sidebar-right turn'>
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
                        onClick={() => { sound.playPick(); props.switchPlayer(); }} />
                </div>
            </div>
        );
    }

    if (props.shotFired && props.type === "my-turn-B") {
        return (
            <div className='user-sidebar-left turn'>
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
                        onClick={() => { sound.playPick(); props.switchPlayer(); }} />
                </div>
            </div>
        );
    }

    console.log(props.allowRandom)
    if (props.type === "placement-player-A" && allShipsPlaced === false) {
        return (
            <>
                <Sidebar type="left">
                    <div>
                        <h3>Rozmieszczenie statków</h3>
                        <p align="justify"> <br />Aby umieścić statek na planszy przeciągnij go z panelu "dostępne statki". <br /><br />
                            W promieniu jednego pola wokół umieszczonego statku nie mogą znaleźć się inne statki. <br /><br />
                            Statki nie mogą przenikać krawędzi ani siebie nawzajem. <br /><br />
                            Wszystkie z dostępnych statków muszą zostać umieszczone na planszy. <br /><br /><br />
                            <b> Sterowanie </b>
                        </p>

                        <IconOnlyOverviewButton
                            Icon={RxRotateCounterClockwise}
                            color={"var(--gradient-1)"}
                            id="uneven-overview" /> obrócenie dostępnych statków <br />

                        <IconOnlyOverviewButton
                            Icon={RxCross2}
                            color={"var(--gradient-2)"} /> zresetowanie statków <br />

                        <IconOnlyOverviewButton
                            Icon={BsDice5}
                            color={"var(--gradient-3)"} /> losowe ustawienie statków <br />


                    </div>
                </Sidebar>

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
                <Sidebar type="left">
                    <div>
                        <h3>Rozmieszczenie statków</h3>
                        <p align="justify"> <br />Aby umieścić statek na planszy przeciągnij go z panelu "dostępne statki". <br /><br />
                            W promieniu jednego pola wokół umieszczonego statku nie mogą znaleźć się inne statki. <br /><br />
                            Statki nie mogą przenikać krawędzi ani siebie nawzajem. <br /><br />
                            Wszystkie z dostępnych statków muszą zostać umieszczone na planszy. <br /><br /><br />
                            <b> Sterowanie </b>
                        </p>

                        <IconOnlyOverviewButton
                            Icon={RxRotateCounterClockwise}
                            color={"var(--gradient-1)"}
                            id="uneven-overview" /> obrócenie dostępnych statków <br />

                        <IconOnlyOverviewButton
                            Icon={RxCross2}
                            color={"var(--gradient-2)"} /> zresetowanie statków <br />

                        <IconOnlyOverviewButton
                            Icon={BsDice5}
                            color={"var(--gradient-3)"} /> losowe ustawienie statków <br />


                    </div>
                </Sidebar>

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
                            disabled={false} />
                    </div>
                </div>
            </>
        );
    } else if (props.type === "placement-player-A") {
        return (
            <>
                <Sidebar type="left">
                    <div>
                        <h3>Rozmieszczono wszystkie statki!</h3>
                        <p align="justify"> <br /> Wszystkie z Twoich staktów zostały umieszczone na planszy.</p> <br />
                        <b> Sterowanie </b> <br /><br />
                        <OverviewButton
                            IconLeft={RxCross2}
                            IconRight={null}
                            content="resetuj"
                            color={"var(--gradient-1)"}
                            id={"font-light"} /> usuń statki z planszy <br />
                        <OverviewButton
                            IconLeft={HiCheck}
                            IconRight={null}
                            content="gotowe"
                            color={"var(--gradient-3)"}
                            id={"font-light"} /> zapisz rozmieszczenie <br />
                    </div>
                </Sidebar>

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
                <Sidebar type="left">
                    <div>
                        <h3>Rozmieszczono wszystkie statki!</h3>
                        <p align="justify"> <br /> Wszystkie z Twoich staktów zostały umieszczone na planszy.</p> <br />
                        <b> Sterowanie </b> <br /><br />
                        <OverviewButton
                            IconLeft={RxCross2}
                            IconRight={null}
                            content="resetuj"
                            color={"var(--gradient-1)"}
                            id={"font-light"} /> Zabierz statki z planszy <br />
                        <OverviewButton
                            IconLeft={HiCheck}
                            IconRight={null}
                            content="gotowe"
                            color={"var(--gradient-3)"}
                            id={"font-light"} /> Zapisz rozmieszczenie <br />
                    </div>
                </Sidebar>

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
                        onClick={() => { sound.playPick(); props.playerReady(); }} />
                </div>
            </div>
        );
    }

    if (props.type === 'my-turn-B') {

        return (
            <div className='user-sidebar-left turn'>
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
                        onClick={() => { sound.playPick(); props.playerReady(); }} />
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
            <div className='user-sidebar-right waiting'>
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