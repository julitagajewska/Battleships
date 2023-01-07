import React from 'react';
import './NotFound.css';
import { useNavigate } from 'react-router-dom';
import { TiArrowBack } from 'react-icons/ti';
import { useSound } from '../../utils/Sound';
import ReusableSidebar from '../../reusable/Sidebar.js';

export default function NotFound(props) {

    let sound = useSound();

    let navigate = useNavigate();

    const onClickBackButton = () => {
        sound.playPick();
        navigate("../");
    }

    return (
        <div className="upper-layer">

            <ReusableSidebar type={"left"} startAnimation={props.startAnimationLeft} toggle={props.toggleLeft}
                children={
                    <div className="page-not-found-info">
                        <h3>Błąd 404: nie znaleziono strony</h3>
                        <p> Podany adres nie został odanleziony. Po naciśnięciu klawisza
                            <button className="button-overview">
                                <div className="button-content">
                                    <TiArrowBack className='button-overview-icon' size={"14px"} />
                                    <p>POWRÓT</p>
                                </div>
                            </button>
                            zostaniesz przekierowany do strony głównej.</p>
                    </div>
                }>
            </ReusableSidebar>

            <div className="not-found-container">
                <h3>Nie znaleziono strony o podanym adresie</h3>
                <button onClick={() => onClickBackButton()}>
                    <TiArrowBack className='button-icon' size={"30px"} />
                    <p>POWRÓT</p>
                </button>
            </div>
        </div>
    )
}
