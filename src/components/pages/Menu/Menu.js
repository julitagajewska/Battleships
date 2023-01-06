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

export default function Menu(props) {

    const auth = useAuth();
    const navigate = useNavigate();

    const logOut = () => {
        auth.logout();
        navigate("../logout")
    }

    return (
        <div className="menu-container">
            <div className="menu-logo-container">Logo</div>
            <div className="menu-buttons-group">
                <RoutingButton to="/game" value="NOWA GRA" type="menu new-game" iconVisible="true" icon={<TbSwords className='button-icon' size={"30px"} />} />
                <RoutingButton to="/settings" value="USTAWIENIA" type="menu settings" iconVisible="true" icon={<HiWrenchScrewdriver className='button-icon' size={"30px"} />} />
                <button className="menu-button" onClick={() => logOut()}>
                    <BsDoorOpenFill className='button-icon' size={"30px"} />
                    WYLOGUJ SIĘ
                </button>
            </div>
            <ReusableSidebar type={"right"} startAnimation={props.startAnimation} toggle={props.toggle}
                children={<Profile />}>
            </ReusableSidebar>
        </div>

    )
}
