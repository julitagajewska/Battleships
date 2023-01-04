import React from 'react'
import ReusableButton from '../../reusable/ReusableButton'
import './Menu.css';

export default function Menu() {

    const doNothing = () => {
        alert("Nic nie robię :3")
    }

    return (
        <div className="menu-container">
            <div className="menu-logo-container">Logo</div>
            <div className="menu-buttons-group">
                <ReusableButton
                    type={"menu-button"}
                    value={"Nowa gra"}
                    action={() => doNothing()} />
                <ReusableButton
                    type={"menu-button"}
                    value={"Ustawienia"}
                    action={() => doNothing()} />
                <ReusableButton
                    type={"menu-button"}
                    value={"Wyloguj"}
                    action={() => doNothing()} />
            </div>
        </div>
    )
}
