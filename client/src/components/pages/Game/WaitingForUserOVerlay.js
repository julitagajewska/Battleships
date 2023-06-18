import React from 'react';
import PropTypes from 'prop-types';

import { useSound } from '../../utils/Sound';
import { BsCheckLg } from 'react-icons/bs';

import Overlay from '../../reusable/ui/Overlay';
import LargeButton from '../../reusable/buttons/LargeButton';
import CenteredContainerLight from '../../reusable/containers/CenteredContainerLight';
import ProfilePictureMedium from '../../reusable/images/ProfilePictureMedium';

function WaitingForUserOverlay({ ready, setWaitingOverlay, player, username }) {

    let sound = useSound();

    return (
        <Overlay>
            <CenteredContainerLight>
                <div className='upper section'>
                    <h3>OCZEKIWANIE NA GRACZA</h3>
                </div>

                <div className='middle section wiating-for-user-middle'>
                    <ProfilePictureMedium
                        src={player.user.image} />
                    <h2>{username}</h2>
                </div>

                <div className='lower section'>
                    <LargeButton
                        IconLeft={BsCheckLg}
                        IconRight={null}
                        content="gotowy"
                        color="var(--gradient-2)"
                        disabled={false}
                        onClick={() => {
                            sound.playPick();
                            ready();
                            setWaitingOverlay(false);
                        }} />
                </div>
            </CenteredContainerLight>
        </Overlay>
    )
}

WaitingForUserOverlay.propTypes = {
    ready: PropTypes.func,
    setWaitingOverlay: PropTypes.func,
    player: PropTypes.object,
    username: PropTypes.string
}

export default WaitingForUserOverlay;