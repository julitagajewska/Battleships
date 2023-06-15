import React from 'react';
import PropTypes from 'prop-types';

import { useSound } from '../../utils/Sound';

import ProfilePictureSmall from '../../reusable/images/ProfilePictureSmall';

function PlayersListTile({ setUser, user, setGamePhase }) {

    let sound = useSound();

    const onClick = () => {
        sound.playPick();
        setUser(user);
        setGamePhase("placement-player-A");
    }


    return (
        <div key={`registered-user-tile-${user.id}`} className="user-entry" onClick={() => onClick()}>
            <ProfilePictureSmall
                key={`registered-user-tile-picture-${user.id}`}
                src={user.image}
                alt={"User's minature profile avatar"}
                imgKey={`registered-user-tile-picture-image-${user.id}`} />

            <p key={`registered-username-${user.id}`}>{user.username}</p>
        </div>
    )
}

PlayersListTile.propTypes = {
    setUser: PropTypes.func,
    user: PropTypes.object,
    setGamePhase: PropTypes.func
}

export default PlayersListTile
