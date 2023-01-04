import React from 'react';
import './Header.css';
import ReusableButton from '../reusable/ReusableButton';
import { Link } from "react-router-dom";

export default function Header() {

    function doNothing() {
        alert("Nic nie robię c:")
    }

    return (
        <div className="header">
            <div className="group left">
                {/* <ReusableButton
                    type={"header-button"}
                    action={doNothing}
                    value={"Info"} /> */}
                <Link to="/info">Info</Link>
            </div>

            <div className="group middle">
                <h3>Header</h3>
            </div>

            <div className="group right">
                {/* <ReusableButton
                    type={"header-button"}
                    action={doNothing}
                    value={"*ikonka* nazwa użytkownika"} />

                <ReusableButton
                    type={"header-button"}
                    action={doNothing}
                    value={"Wyloguj"} /> */}

                <Link to="/profile">Profile</Link>
            </div>
        </div>
    );
}