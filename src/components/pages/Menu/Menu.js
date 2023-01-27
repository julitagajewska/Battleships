import React from 'react';

import { TbSwords } from 'react-icons/tb';
import { BsDoorOpenFill } from 'react-icons/bs';
import { HiWrenchScrewdriver } from 'react-icons/hi2';

import './Menu.css';

import { useAuth } from '../../utils/auth';
import { useSound } from '../../utils/Sound';
import { useNavigate } from 'react-router-dom';

import Profile from '../Profile/Profile';
import Sidebar from '../../reusable/ui/Sidebar.js';
import logo from '../../assets/logo7.png';
import MenuInfo from '../../reusable/ui/MenuInfo';
import MenuButton from '../../reusable/buttons/MenuButton';

export default function Menu() {

    const auth = useAuth();
    const navigate = useNavigate();
    const sound = useSound();


    const logOut = () => {
        auth.logout();
        navigate("../logout");
    }

    const newGameButton = () => {
        sound.playPick();
        navigate("/game");
    }

    const settingsButton = () => {
        sound.playPick();
        navigate("/settings");
    }

    const logOutButton = () => {
        sound.playPick();
        logOut();
    }

    return (
        <div className="menu-container">

            <Sidebar type={"left"} overflow={"overflow-auto"}>
                <MenuInfo />
            </Sidebar>


            <div className="menu-logo-container">
                <img className='logo' src={logo} alt="logo" />
            </div>

            <div className="menu-buttons-group">

                <MenuButton
                    IconLeft={TbSwords}
                    IconRight={null}
                    color={"var(--gradient-4)"}
                    content={"nowa gra"}
                    onClick={() => newGameButton()}
                    disabled={false} />

                <MenuButton
                    IconLeft={HiWrenchScrewdriver}
                    IconRight={null}
                    color={"var(--gradient-3)"}
                    content={"ustawienia"}
                    onClick={() => settingsButton()}
                    disabled={false} />

                <MenuButton
                    IconLeft={BsDoorOpenFill}
                    IconRight={null}
                    color={"var(--gradient-1)"}
                    content={"wyloguj się"}
                    onClick={() => logOutButton()}
                    disabled={false} />

            </div>

            <Sidebar type={"right"}>
                <Profile />
            </Sidebar>
        </div>

    )
}
