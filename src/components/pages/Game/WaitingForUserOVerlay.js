import React from 'react';
import './WaitingForUserOverlay.css';
import { useSound } from '../../utils/Sound';

export default function WaitingForUserOVerlay(props) {

    let sound = useSound();

    if (props.overlayVisible === true) {
        return (
            <div className="waiting-for-player overlay">
                <h3> OCZEKIWANIE NA GRACZA </h3>
                <h2> {props.username} </h2>
                <button onClick={() => {
                    sound.playPick();
                    props.ready();
                }}>
                    Gotowy!
                </button>

            </div>
        )
    }

    return (
        <>
        </>
    )
}
