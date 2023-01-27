import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useSound } from '../../utils/Sound';

import { GrCircleQuestion } from 'react-icons/gr';
import { RiUser5Line } from 'react-icons/ri';

import './Sidebar.css';

function Sidebar({ type, children, overflow }) {

    const sound = useSound();

    const [startAnimation, setStartAnimation] = useState(false);

    const toggle = () => {
        setStartAnimation(!startAnimation);
    }

    const transitionProperties = startAnimation ? `out-${type}` : `in-${type}`;

    return (
        <div>
            <div className={`sidebar-${type} ${transitionProperties}`}>
                <div className={`sidebar-content-${type} ${overflow}`}>
                    <div className={`sidebar-content-text-${type}`}>
                        {children}
                    </div>
                </div>
            </div>
            <div
                className={`info-sidebar-button-${type} ${transitionProperties}`}
                onClick={() => { sound.playPick(); toggle(); }}>
                {
                    type === "left" ?
                        <GrCircleQuestion className='sidebar-button-icon-left' size={"36px"} />
                        :
                        <RiUser5Line className='sidebar-button-icon-right' size={"38px"} />
                }
            </div>
        </div>
    )
}

Sidebar.propTypes = {
    type: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node]),
    overflow: PropTypes.string
}

export default Sidebar;