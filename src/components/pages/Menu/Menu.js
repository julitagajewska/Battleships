import React from 'react';
import { TbSwords } from 'react-icons/tb';
import { BsDoorOpenFill } from 'react-icons/bs';
import { HiWrenchScrewdriver } from 'react-icons/hi2';
import RoutingButton from '../../reusable/RoutingButton';
import './Menu.css';
import Profile from '../Profile/Profile';
import ReusableSidebar from '../../reusable/Sidebar.js';

export default function Menu(props) {

    const doNothing = () => {
        alert("Nic nie robię :3")
    }

    return (
        <div className="menu-container">
            <div className="menu-logo-container">Logo</div>
            <div className="menu-buttons-group">
                <RoutingButton to="/game" value="NOWA GRA" type="menu new-game" iconVisible="true" icon={<TbSwords className='button-icon' size={"30px"} />} />
                <RoutingButton to="/settings" value="USTAWIENIA" type="menu settings" iconVisible="true" icon={<HiWrenchScrewdriver className='button-icon' size={"30px"} />} />
                <RoutingButton to="/logOut" value="WYLOGUJ SIĘ" type="menu log-out" iconVisible="true" icon={<BsDoorOpenFill className='button-icon' size={"30px"} />} />
            </div>
        </div>

    )
}
