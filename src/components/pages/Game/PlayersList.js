import React, { useState, useEffect } from 'react';
import Sidebar from '../../reusable/ui/Sidebar';
import './PlayersList.css';
import { getUsers } from '../../../api/axios';
import { useSound } from '../../utils/Sound';
import { useAuth } from '../../utils/auth';
import ProfilePictureSmall from '../../reusable/images/ProfilePictureSmall';
import CenteredContainer from '../../reusable/containers/CenteredContainer';

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
                <div>
                    <h3>Zarejestrowani gracze</h3>
                    <p>Na tej stronie możesz wybrać, przeciwko
                        któremu z graczy chcesz zagrać. <br /><br />
                        Jeśli chcesz powrócić do poprzedniej strony,
                        możesz kliknąć przycisk *przycisk*.
                    </p>
                </div>
            </Sidebar>
            <CenteredContainer>
                <div className="upper section">
                    <h3>ZAREJESTROWANI GRACZE</h3>
                </div>
                <div className="middle section column-centered">
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
                                    <ProfilePictureSmall
                                        src={user.image}
                                        alt={"User's minature profile avatar"} />

                                    <p>{user.username}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </CenteredContainer>
        </div>
    )
}
