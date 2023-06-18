import React from 'react'

import { IoChevronBackSharp } from 'react-icons/io5';

import Sidebar from './Sidebar'
import IconOnlyOverviewButton from '../buttons/IconOnlyOverviewButton'


export default function RegisterInfo() {
    return (
        <Sidebar type="left" overflow="overflow-auto">
            <div className="info-align-left">
                <h3>REJESTRACJA</h3>
                <div>
                    <p align="justify">Na tej stronie możesz utworzyć swój własny profil. Poniżej znajdują się wymagania dotyczące wprowadzanych w formularzu danych.<br /><br /></p>
                </div>

                <p>
                    <b>Nazwa użytkownika</b> </p>
                <ul>
                    <li>3 - 10 znaków</li>
                    <li>Nie może zawierać spacji</li>
                    <li>Nie może zawierać znaków specjalnych</li>
                    <li>Może zawierać:</li>
                    <ul>
                        <li>
                            Małe i wielkie litery
                        </li>
                        <li>Cyfry</li>
                        <li>Dozwolone znaki: _ -</li>
                    </ul>
                </ul>

                <b>Adres e-mail</b>
                <ul>
                    <li>Musi być w formacie: abc@def.xyz</li>
                </ul>

                <b>Hasło</b>
                <ul>
                    <li>Musi zawierać:</li>
                    <ul>
                        <li>Małą literę</li>
                        <li>Wielką literę</li>
                        <li>Znak specjalny</li>
                        <li>Cyfrę</li>
                    </ul>
                    <li>3 - 15 znaków</li>
                    <li>Nie może  zawierać spacji</li>
                </ul>

                <p align="justify"><br />Hasło oraz jego potwierdzenie muszą być takie same.<br /><br /></p>

                <p align="justify"> Możesz powrócić do ekranu logowania klikając
                    <IconOnlyOverviewButton
                        Icon={IoChevronBackSharp}
                        color={"rgba(18, 66, 87, 0.2)"}
                        shadow={"no-shadow"}
                        type={"back"} />
                    .
                </p>
            </div>
        </Sidebar>
    )
}
