import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function ProfileDeleted(props) {

    const navigate = useNavigate();

    return (
        <div className="upper-layer">
            <h3> Usunięto profil pomyślnie! </h3>
            <button onClick={() => navigate("../login")}> Powrót </button>
        </div>
    )
}
