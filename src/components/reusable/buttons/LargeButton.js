import React from 'react';
import './LargeButton.css';
import { useSound } from '../../utils/Sound';

export default function LargeButton({ IconLeft, IconRight, color, content, onClick, disabled }) {

    const sound = useSound();

    return (
        <button className="large-button" style={{ backgroundColor: `${color}` }} onClick={(e) => onClick(e)} disabled={disabled}>
            {IconLeft !== null ? <IconLeft className="large-button-icon-left" size="30px" /> : <></>}
            <p className="large-button-content">{content}</p>
            {IconRight !== null ? <IconRight className="large-button-icon-right" size="30px" /> : <></>}
        </button>
    )
}
