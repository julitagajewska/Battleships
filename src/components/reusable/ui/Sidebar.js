import React, { useState } from 'react';
import './Sidebar.css';
import { GrCircleQuestion } from 'react-icons/gr';
import { RiUser5Line } from 'react-icons/ri';
import { useSound } from '../../utils/Sound';

export default function Sidebar(props) {

    const sound = useSound();

    const [startAnimation, setStartAnimation] = useState(false);

    const toggle = () => {
        setStartAnimation(!startAnimation);
    }

    const transitionProperties = startAnimation ? `out-${props.type}` : `in-${props.type}`;

    return (
        <div>
            <div className={`sidebar-${props.type} ${transitionProperties}`}>
                <div className={`sidebar-content-${props.type}`}>
                    {props.children}
                </div>
            </div>
            <div
                className={`info-sidebar-button-${props.type} ${transitionProperties}`}
                onClick={() => { sound.playPick(); toggle(); }}>
                {
                    props.type === "left" ?
                        <GrCircleQuestion className='sidebar-button-icon-left' size={"36px"} />
                        :
                        <RiUser5Line className='sidebar-button-icon-right' size={"38px"} />
                }
            </div>
        </div>
    )
}
