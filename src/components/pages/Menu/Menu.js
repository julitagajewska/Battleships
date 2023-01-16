import React from 'react';

import { TbSwords } from 'react-icons/tb';
import { BsDoorOpenFill } from 'react-icons/bs';
import { HiWrenchScrewdriver } from 'react-icons/hi2';
import { RiUser5Line } from 'react-icons/ri';
import { FaPlus } from 'react-icons/fa';

import './Menu.css';

import { useAuth } from '../../utils/auth';
import { useSound } from '../../utils/Sound';
import { useNavigate } from 'react-router-dom';

import Profile from '../Profile/Profile';
import Sidebar from '../../reusable/ui/Sidebar.js';
import OverviewButton from '../../reusable/buttons/OverviewButton';
import IconOnlyOverviewButton from '../../reusable/buttons/IconOnlyOverviewButton';

import logo from '../../assets/logo7.png';

export default function Menu(props) {

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
                <div>
                    <h3>Menu gry</h3>
                    <p>Witaj w menu głównym gry Staćki!</p><br />

                    <h3>Sterowanie</h3>
                    <p align="justify" style={{ lineHeight: "2" }}>
                        Kliknięcie w ikonę użytkownika
                        <IconOnlyOverviewButton
                            Icon={RiUser5Line}
                            color="transparent"
                            shadow="no-shadow" />
                        , znajdującą się po prawej stronie ekranu,
                        wyświetli podgląd profilu użytkownika. <br /><br />
                    </p>

                    <h3>Profil użytkownika</h3>

                    <p align="justify" style={{ lineHeight: "2" }}><b>Edycja zdjęcia użytkownika</b><br />
                        Zdjęcie użytkownika może zostać zmienione poprzez klikniecie w przycisk
                        <IconOnlyOverviewButton
                            Icon={FaPlus}
                            color="var(--gradient-1)"
                            shadow="no-shadow" />
                        , znajduący się w prawej dolnej części obecnego zdjęcia profilowego.<br />
                        Po kliknieciu pojawi się okno, w którym można podać adres URL nowego zdjęcia.
                    </p>

                    <p align="justify" style={{ lineHeight: "2" }}>
                        <b>Edycja danych użytkownika</b><br />
                        Dane użytkownika takie jak:
                        <ul>
                            <li> nazwa użytkownika </li>
                            <li> adres e-mail </li>
                            <li> hasło </li>
                        </ul>
                        mogą zostać zmienione w zakładce "Dane użytkownika". <br /><br />
                        Aby zmienić wybraną informację, kliknij symbol <IconOnlyOverviewButton
                            Icon={FaPlus}
                            color="var(--gradient-1)"
                            shadow="no-shadow" /> i wprowadź odpowiednie dane. <br /><br />
                        Kliknięcie przycisku <IconOnlyOverviewButton
                            Icon={FaPlus}
                            color="var(--gradient-1)"
                            shadow="no-shadow" /> bez wprowadzenia nowych danych,
                        spowoduje zachowanie dotychczasowej wartości.

                    </p>
                    <p align="justify" style={{ lineHeight: "2" }}><b>Podgląd rozgrywek</b><br />
                        W tej części profilu możesz podejrzeć wynik swoich trzech ostatnich gier.</p>
                </div>
            </Sidebar>

            <div className="menu-logo-container">
                <img className='logo' src={logo} alt="logo" />
            </div>

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

            </div>
            <Sidebar type={"right"}>
                <Profile />
            </Sidebar>
        </div>

    )
}
