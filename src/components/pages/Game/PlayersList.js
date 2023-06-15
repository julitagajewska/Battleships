import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './PlayersList.css';

import { getUsers } from '../../../api/axios';
import { useSound } from '../../utils/Sound';
import { useAuth } from '../../utils/auth';

import { IoChevronBackSharp } from 'react-icons/io5';

import Sidebar from '../../reusable/ui/Sidebar';
import ProfilePictureSmall from '../../reusable/images/ProfilePictureSmall';
import CenteredContainer from '../../reusable/containers/CenteredContainer';
import IconOnlyButton from '../../reusable/buttons/IconOnlyButton';
import IconOnlyOverviewButton from '../../reusable/buttons/IconOnlyOverviewButton';
import PlayersListTile from './PlayersListTile';

function PlayersList({ setGamePhase, setUser }) {

    const [users, setUsers] = useState([]);

    let sound = useSound();
    const auth = useAuth();

    const getAllUsers = async () => {
        let response = await getUsers();
        setUsers(response)
    }

    useEffect(() => {
        getAllUsers();
    }, [])

    return (
        <div className="upper-layer">
            <Sidebar type={"left"}>
                <div>
                    <h3>Zarejestrowani gracze</h3>
                    <p align="justify"><br />
                        Na tej stronie możesz wybrać, przeciwko
                        któremu z graczy chcesz zagrać. <br /><br />
                    </p>

                    <p align="justify"> Możesz powrócić do wyboru rodzaju gracza klikając
                        <IconOnlyOverviewButton
                            Icon={IoChevronBackSharp}
                            color={"rgba(18, 66, 87, 0.2)"}
                            shadow={"no-shadow"}
                            type={"back"} />
                        .
                    </p>
                </div>
            </Sidebar>
            <CenteredContainer>

                <IconOnlyButton
                    Icon={IoChevronBackSharp}
                    color={"rgba(18, 66, 87, 0.2)"}
                    onClick={() => { sound.playPick(); setGamePhase("player-type-choice") }}
                    disabled={false}
                    position={"top-left"}
                    shadow={"no-shadow"}
                    type={"back"} />

                <div className="upper section">
                    <h2>Zarejestrowani gracze</h2>
                </div>
                <div className="middle section column-centered">
                    <div className="players-table">
                        {users.map((user) => {

                            if (user.username === auth.user.username) {
                                // eslint-disable-next-line array-callback-return
                                return;
                            }

                            return (
                                <PlayersListTile
                                    key={`players-list-tile-${user.username}`}
                                    setUser={setUser}
                                    user={user}
                                    setGamePhase={setGamePhase} />
                            )
                        })}
                    </div>
                </div>
            </CenteredContainer>
        </div>
    )
}

PlayersList.propTypes = {
    setGamePhase: PropTypes.func,
    setUser: PropTypes.func
}

export default PlayersList;