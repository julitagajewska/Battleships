import React from 'react';

import { RiUser5Line } from 'react-icons/ri';
import { FaPlus } from 'react-icons/fa';

import IconOnlyOverviewButton from '../buttons/IconOnlyOverviewButton';

export default function MenuInfo() {
    return (
        <div>
            <h3>Menu gry</h3>
            <p>Witaj w menu głównym gry Staćki!</p><br />

            <h3>Sterowanie</h3>
            <p align="justify" style={{ lineHeight: "2" }}>
                Kliknięcie w ikonę użytkownika
                <IconOnlyOverviewButton
                    Icon={RiUser5Line}
                    color="transparent"
                    shadow="no-shadow" />
                , znajdującą się po prawej stronie ekranu,
                wyświetli podgląd profilu użytkownika. <br /><br />
            </p>

            <h3>Profil użytkownika</h3>

            <p align="justify" style={{ lineHeight: "2" }}><b>Edycja zdjęcia użytkownika</b><br />
                Zdjęcie użytkownika może zostać zmienione poprzez klikniecie w przycisk
                <IconOnlyOverviewButton
                    Icon={FaPlus}
                    color="var(--gradient-1)"
                    shadow="no-shadow" />
                , znajduący się w prawej dolnej części obecnego zdjęcia profilowego.<br />
                Po kliknieciu pojawi się okno, w którym można podać adres URL nowego zdjęcia.
            </p>

            <p align="justify" style={{ lineHeight: "2" }}>
                <b>Edycja danych użytkownika</b><br />
                Dane użytkownika takie jak: </p>
            <ul>
                <li> nazwa użytkownika </li>
                <li> adres e-mail </li>
                <li> hasło </li>
            </ul>

            <p align="justify" style={{ lineHeight: "2" }}>
                mogą zostać zmienione w zakładce "Dane użytkownika". <br /><br />
                Aby zmienić wybraną informację, kliknij symbol <IconOnlyOverviewButton
                    Icon={FaPlus}
                    color="var(--gradient-1)"
                    shadow="no-shadow" /> i wprowadź odpowiednie dane. <br /><br />
                Kliknięcie przycisku <IconOnlyOverviewButton
                    Icon={FaPlus}
                    color="var(--gradient-1)"
                    shadow="no-shadow" /> bez wprowadzenia nowych danych,
                spowoduje zachowanie dotychczasowej wartości.

            </p>
            <p align="justify" style={{ lineHeight: "2" }}><b>Podgląd rozgrywek</b><br />
                W tej części profilu możesz podejrzeć wynik swoich trzech ostatnich gier.</p>
        </div>
    )
}
