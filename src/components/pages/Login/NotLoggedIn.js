import React from 'react';
import { Link } from 'react-router-dom';

export default function NotLoggedIn() {
    return (
        <div className="upper-layer">
            <h3>Nie jesteś zalogowany!</h3>
            <Link to="../login">Zaloguj się</Link>
        </div>
    )
}
