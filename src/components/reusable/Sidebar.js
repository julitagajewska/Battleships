import React from 'react';
import './Sidebar.css';
import { GrCircleQuestion } from 'react-icons/gr'
import { RiUser5Line } from 'react-icons/ri'

export default function Sidebar(props) {

    const transitionProperties = props.startAnimation ? `out-${props.type}` : `in-${props.type}`;

    return (
        <div>
            <div className={`sidebar-${props.type} ${transitionProperties}`}>
                <div className={`sidebar-content-${props.type}`}>
                    {props.children}
                </div>
            </div>
            <div
                className={`info-sidebar-button-${props.type} ${transitionProperties}`}
                onClick={() => props.toggle()}>
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
