import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BiLogInCircle } from 'react-icons/bi';
import './Logout.css';

export default function Logout() {

    const navigate = useNavigate();

    return (
        <div className="upper-layer logout-container">
            <h3>Wylogowano!</h3>
            <button onClick={() => navigate("/login")} className="button-medium">
                <BiLogInCircle className='button-icon' size={"26px"} />
                <p>Zaloguj się ponownie</p>
            </button>
        </div>
    )
}
