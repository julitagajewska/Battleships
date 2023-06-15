import React from 'react';

import { RxCross2 } from 'react-icons/rx';
import { HiCheck } from 'react-icons/hi';
import { VscChromeClose } from 'react-icons/vsc';

import IconOnlyOverviewButton from '../buttons/IconOnlyOverviewButton'
import OverviewButton from '../buttons/OverviewButton';

export default function AllShipsPlaced() {
    return (
        <div>
            <h3>Rozmieszczono wszystkie statki!</h3>
            <p align="justify">Wszystkie z Twoich staktów zostały umieszczone na planszy.<br /><br /></p>

            <h3> Sterowanie </h3>
            <OverviewButton
                IconLeft={RxCross2}
                IconRight={null}
                content="resetuj"
                color={"var(--gradient-1)"}
                id={"font-light"} /> usuń statki z planszy <br />
            <OverviewButton
                IconLeft={HiCheck}
                IconRight={null}
                content="gotowe"
                color={"var(--gradient-3)"}
                id={"font-light"} /> zapisz rozmieszczenie <br /><br />

            <h3>Wyjście</h3>
            <p align="justify">
                Przycisk

                <IconOnlyOverviewButton
                    Icon={VscChromeClose}
                    color={"rgba(18, 66, 87, 0.2)"}
                    iconColor={"black"}
                    disabled={false}
                    shadow={"no-shadow"} />

                w prawym górnym rogu pozwala Ci opuścić grę. <br /> <br />
                Jeśli wyjdziesz w trakcie rozgrywki, jej aktualny stan zostanie zapisany do Twojej historii.
            </p>
        </div>
    )
}
