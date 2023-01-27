import React from 'react';
import PropTypes from 'prop-types';

import './Score.css';

function Score({ playerA, playerB }) {
    return (
        <div className="score-component-container">
            <p>{playerA.score} : {playerB.score}</p>
        </div>
    )
}

Score.propTypes = {
    playerA: PropTypes.object,
    playerB: PropTypes.object
}

export default Score;
