import React from 'react';

import { RxRotateCounterClockwise } from 'react-icons/rx';
import { RxCross2 } from 'react-icons/rx';
import { BsDice5 } from 'react-icons/bs';
import { VscChromeClose } from 'react-icons/vsc';

import IconOnlyOverviewButton from '../buttons/IconOnlyOverviewButton'

export default function ShipPlacementInfo() {

    return (
        <div>
            <h3>Rozmieszczenie statków</h3>
            <p align="justify"> <br />Aby umieścić statek na planszy przeciągnij go z panelu "dostępne statki". <br /><br />
                W promieniu jednego pola wokół umieszczonego statku nie mogą znaleźć się inne statki. <br /><br />
                Statki nie mogą przenikać krawędzi ani siebie nawzajem. <br /><br />
                Wszystkie z dostępnych statków muszą zostać umieszczone na planszy. <br /><br />
            </p>

            <h3> Sterowanie </h3>
            <IconOnlyOverviewButton
                Icon={RxRotateCounterClockwise}
                color={"var(--gradient-1)"}
                id="uneven-overview" /> obrócenie dostępnych statków <br /><br />

            <IconOnlyOverviewButton
                Icon={RxCross2}
                color={"var(--gradient-2)"} /> zresetowanie statków <br /><br />

            <IconOnlyOverviewButton
                Icon={BsDice5}
                color={"var(--gradient-3)"} /> losowe ustawienie statków <br /><br />

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
