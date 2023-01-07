import { createContext, useContext } from "react";
import pick from '../assets/pick2.mp3';
import { Howl, Howler } from 'howler';

const SoundContext = createContext(null);

export const SoundProvider = ({ children }) => {

    let pickSound = pick;

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

    return <SoundContext.Provider value={{ playPick, callTheSound }}>{children}</SoundContext.Provider>
}

export const useSound = () => {
    return useContext(SoundContext)
}