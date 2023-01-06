import React from 'react'
import { BiChevronDown } from 'react-icons/bi';
import './LastGameOverview.css'

export default function LastGameOverview() {
    return (
        <div className="last-game-overview-container">
            <div className="section-usernames">PFoo vs Marcin</div>
            <div className="section">17 : 5</div>
            <div className="section">Wygrana</div>
            <BiChevronDown className="last-game-overview-icon" size={"28px"} />
        </div>
    )
}
