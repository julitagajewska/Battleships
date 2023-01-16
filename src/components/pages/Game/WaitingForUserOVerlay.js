import React from 'react';

import { useSound } from '../../utils/Sound';
import { BsCheckLg } from 'react-icons/bs';

import Overlay from '../../reusable/ui/Overlay';
import LargeButton from '../../reusable/buttons/LargeButton';
import CenteredContainerLight from '../../reusable/containers/CenteredContainerLight';
import ProfilePictureMedium from '../../reusable/images/ProfilePictureMedium';

export default function WaitingForUserOverlay(props) {

    let sound = useSound();

    return (
        <Overlay>
            <CenteredContainerLight>
                <div className='upper section'>
                    <h3>OCZEKIWANIE NA GRACZA</h3>
                </div>

                <div className='middle section wiating-for-user-middle'>
                    <ProfilePictureMedium
                        src={props.player.user.image} />
                    <h2>{props.username}</h2>
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
                            props.ready();
                            props.setWaitingOverlay(false);
                        }} />
                </div>
            </CenteredContainerLight>


        </Overlay>
    )
}
