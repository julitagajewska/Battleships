import React from 'react';
import './Sidebar.css';

export default function Sidebar(props) {

    const transitionProperties = props.startAnimation ? `out-${props.type}` : `in-${props.type}`;

    return (
        <div>
            <div className={`sidebar-${props.type} ${transitionProperties}`}>
                <div className={"sidebar-content"}>
                    {props.children}
                </div>
            </div>
            <div className={`info-sidebar-button-${props.type} ${transitionProperties}`} onClick={() => props.toggle()}></div>
        </div>
    )
}
