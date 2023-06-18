import { createContext, useContext, useState } from "react";
import pick from '../assets/pick2.mp3';
import blocked from '../assets/stop2.mp3'
import { Howl } from 'howler';

const SoundContext = createContext(null);

export const SoundProvider = ({ children }) => {

    let [soundOn, setSoundOn] = useState(true);

    let pickSound = pick;
    let blockedSound = blocked;

    const callTheSound = (src) => {
        const sound = new Howl({
            src,
            html5: true
        });

        if (soundOn) {
            sound.play();
        }

    }

    const playPick = () => {
        callTheSound(pickSound)
    }

    const playBlocked = () => {
        callTheSound(blockedSound)
    }

    const toggleSound = () => {
        setSoundOn(!soundOn)
    }

    return <SoundContext.Provider value={{ playPick, playBlocked, callTheSound, toggleSound, soundOn }}>{children}</SoundContext.Provider>
}

export const useSound = () => {
    return useContext(SoundContext)
}