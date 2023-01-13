import React from 'react';

import { useSound } from '../../utils/Sound';
import { BsCheckLg } from 'react-icons/bs';

import Overlay from '../../reusable/ui/Overlay';
import LargeButton from '../../reusable/buttons/LargeButton';

export default function WaitingForUserOVerlay(props) {

    let sound = useSound();

    if (props.overlayVisible === true) {
        return (
            <Overlay>
                <h3 align="center"> OCZEKIWANIE NA GRACZA {props.username} </h3>
                <LargeButton
                    IconLeft={BsCheckLg}
                    IconRight={null}
                    content="gotowy"
                    color="var(--gradient-1)"
                    disabled={false}
                    onClick={() => { sound.playPick(); props.ready(); }} />
            </Overlay>
        )
    }

    return (
        <>
        </>
    )
}
