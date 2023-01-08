import { createContext, useContext } from "react";
import pick from '../assets/pick2.mp3';
import blocked from '../assets/stop2.mp3'
import { Howl, Howler } from 'howler';

const SoundContext = createContext(null);

export const SoundProvider = ({ children }) => {

    let pickSound = pick;
    let blockedSound = blocked;

    const callTheSound = (src) => {
        const sound = new Howl({
            src,
            html5: true
        });

        sound.play();
    }

    const playPick = () => {
        callTheSound(pickSound)
    }

    const playBlocked = () => {
        callTheSound(blockedSound)
    }

    return <SoundContext.Provider value={{ playPick, playBlocked, callTheSound }}>{children}</SoundContext.Provider>
}

export const useSound = () => {
    return useContext(SoundContext)
}