import React from 'react';
import PropTypes from 'prop-types';

import { HiCheck } from 'react-icons/hi';
import { ImCross } from 'react-icons/im';

import OverviewButton from '../buttons/OverviewButton';
import IconOnlyOverviewButton from '../buttons/IconOnlyOverviewButton';

function BattleInfo({ side }) {

    let shipOverviewInfo = side === "left" ? "lewym" : "prawym";

    return (
        <div>
            <h3>Oddanie strzału</h3>
            <p align="justify" style={{ lineHeight: '1.5' }}>Aby oddać strzał kliknij na jedno z pól na planszy znajdującej się na środku ekranu. <br /><br />
                Po kliknięciu na pole, pojawi się jeden z poniższych symboli: <br /> </p>

            <IconOnlyOverviewButton
                Icon={null}
                color={"rgb(211, 211, 211, 0.7)"}
                disabled={false} /> nie trafiono <br />

            <IconOnlyOverviewButton
                Icon={null}
                color={"rgb(139, 0, 0, 0.7)"}
                disabled={false} /> trafiono w element statku <br />

            <IconOnlyOverviewButton
                Icon={null}
                color={"rgba(0, 56, 0, 0.7)"}
                disabled={false} /> zatopiono cały statek<br /><br />

            Aby przejść do tury przeciwnika, po oddaniu strzału, naciśnij
            <OverviewButton
                IconLeft={HiCheck}
                IconRight={null}
                content="Gotowe"
                color={"var(--gradient-1)"} />

            <h3>Podgląd statków</h3>
            <p align="justify" style={{ lineHeight: '1.5' }}>Na planszy w {shipOverviewInfo} dolnym rogu ekranu zaznaczone są Twoje statki, oraz strzały Twojego przeciwnika.</p>

            <IconOnlyOverviewButton
                Icon={ImCross}
                color={"rgba(30, 105, 138, 0.35)"}
                iconColor={"rgb(211, 211, 211, 0.7)"}
                disabled={false}
                shape={"square"}
                shadow={"no-shadow"} /> nie trafiono <br />

            <IconOnlyOverviewButton
                Icon={ImCross}
                animation={"animated"}
                color={"rgba(30, 105, 138, 0.35)"}
                iconColor={"rgb(139, 0, 0, 0.7)"}
                disabled={false}
                shape={"square"}
                shadow={"no-shadow"} /> trafiono w element statku <br />

            <IconOnlyOverviewButton
                Icon={ImCross}
                color={"rgba(0, 56, 0, 0.7)"}
                iconColor={"white"}
                disabled={false}
                shape={"square"}
                shadow={"no-shadow"} /> zatopiono Twój statek<br />

        </div>
    )
}

BattleInfo.propTypes = {
    side: PropTypes.string
}

export default BattleInfo;