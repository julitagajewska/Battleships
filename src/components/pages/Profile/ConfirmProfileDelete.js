import React from 'react'
import { useAuth } from '../../utils/auth';
import { useNavigate, Link } from 'react-router-dom';
import axios, { deleteUser } from '../../../api/axios';

export default function ConfirmProfileDelete(props) {

    const auth = useAuth();
    const navigate = useNavigate();

    const onClickDeleteButton = async () => {

        await deleteUser(auth.user)
        auth.logout();

        navigate("../profileDeleted")
    }

    return (
        <div className="upper-layer">
            <h3> Czy na pewno chcesz usunąć profil</h3>
            <div>
                <button onClick={() => onClickDeleteButton()}> Usuń profil </button>
                <button onClick={() => navigate("../")}> Powrót </button>
            </div>
        </div>
    )
}
