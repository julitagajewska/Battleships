import React, { useState, useEffect } from 'react';
import Sidebar from '../../reusable/ui/Sidebar';
import './PlayersList.css';
import { getUsers } from '../../../api/axios';
import { useSound } from '../../utils/Sound';
import { useAuth } from '../../utils/auth';

export default function PlayersList(props) {

    const [users, setUsers] = useState([]);

    let sound = useSound();
    const auth = useAuth();

    const getAllUsers = async () => {
        let response = await getUsers();
        setUsers(response)
        console.log(users);
    }

    useEffect(() => {
        getAllUsers();
    }, [])

    return (
        <div className="upper-layer">
            <Sidebar type={"left"}>
                HIEHIE
            </Sidebar>
            <div className="players-list-choice-container">
                <h3>ZAREJESTROWANI GRACZE</h3>
                <div className="players-table">
                    {users.map((user) => {

                        if (user.username === auth.user.username) {
                            return (<></>);
                        }

                        return (
                            <div className="user-entry" onClick={() => {
                                sound.playPick();
                                props.setUser(user);
                                props.setGamePhase("placement-player-A");
                            }}>
                                <img
                                    className="minature-profile-picture"
                                    src={user.image}
                                    alt="User's minature profile avatar" />
                                <p>{user.username}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
