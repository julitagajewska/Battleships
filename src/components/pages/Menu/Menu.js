import React from 'react';
import { TbSwords } from 'react-icons/tb';
import { BsDoorOpenFill } from 'react-icons/bs';
import { HiWrenchScrewdriver } from 'react-icons/hi2';
import RoutingButton from '../../reusable/RoutingButton';
import './Menu.css';
import Profile from '../Profile/Profile';
import ReusableSidebar from '../../reusable/Sidebar.js';
import { useAuth } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api, { getNewId } from '../../../api/axios';
import { getUsers } from '../../../api/axios';
import pick from '../../assets/pick2.mp3';
import { Howl, Howler } from 'howler';

export default function Menu(props) {

    let src = pick;

    const auth = useAuth();
    const navigate = useNavigate();

    const callTheSound = (src) => {
        const sound = new Howl({
            src,
            html5: true
        });

        sound.play();
    }

    const logOut = () => {
        auth.logout();
        navigate("../logout");
    }

    const newGameButton = () => {
        callTheSound(src);
        navigate("/game");
    }

    const settingsButton = () => {
        callTheSound(src);
        navigate("/settings");
    }

    const logOutButton = () => {
        callTheSound(src);
        logOut();
    }

    return (
        <div className="menu-container">

            <ReusableSidebar type={"left"} startAnimation={props.startAnimationLeft} toggle={props.toggleLeft}
                children={<p>To jest menu</p>}>
            </ReusableSidebar>

            <div className="menu-logo-container">Logo</div>
            <div className="menu-buttons-group">

                <button className="menu-button new-game" onClick={() => newGameButton()}>
                    <TbSwords className='button-icon' size={"30px"} />
                    <p>NOWA GRA</p>
                </button>

                <button className="menu-button settings" onClick={() => settingsButton()}>
                    <HiWrenchScrewdriver className='button-icon' size={"30px"} />
                    <p>USTAWIENIA</p>
                </button>

                <button className="menu-button log-out" onClick={() => logOutButton()}>
                    <BsDoorOpenFill className='button-icon' size={"30px"} />
                    <p>WYLOGUJ SIĘ</p>
                </button>

                {/* <RoutingButton to="/game" sound={callTheSound} value="NOWA GRA" type="menu new-game" iconVisible="true" icon={<TbSwords className='button-icon' size={"30px"} />} />
                <RoutingButton to="/settings" value="USTAWIENIA" type="menu settings" iconVisible="true" icon={<HiWrenchScrewdriver className='button-icon' size={"30px"} />} /> */}

                <button onClick={() => callTheSound(src)}>Play sound</button>
            </div>
            <ReusableSidebar type={"right"} startAnimation={props.startAnimationRight} toggle={props.toggleRight}
                children={<Profile sound={callTheSound} />}>
            </ReusableSidebar>
        </div>

    )
}
