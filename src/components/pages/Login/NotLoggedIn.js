import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSound } from '../../utils/Sound';
import ReusableSidebar from '../../reusable/Sidebar';
import { BiLogInCircle } from 'react-icons/bi';
import './NotLoggedIn.css';

export default function NotLoggedIn(props) {

    let sound = useSound();
    let navigate = useNavigate();

    const onClickLogInButton = () => {
        sound.playPick();
        navigate("../login");
    }

    return (
        <div className="upper-layer">
            {/* 
            <ReusableSidebar type={"left"} startAnimation={props.startAnimationLeft} toggle={props.toggleLeft}
                children={
                    <div className="not-logged-in-info">

                    </div>
                }>
            </ReusableSidebar> */}

            <div className="not-logged-in-container">
                <h3>Nie jesteś zalogowany!</h3>
                <p>Dostęp do strony jest możliwy jedynie dla zalogowanych użytkowników.</p>
                <button
                    className="not-logged-in-button"
                    onClick={() => onClickLogInButton()}>
                    <BiLogInCircle className='button-icon' size={"26px"} />
                    <p>ZALOGUJ SIĘ</p>
                </button>
            </div>
        </div>
    )
}
