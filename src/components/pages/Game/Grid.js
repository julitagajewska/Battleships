import React from 'react';
import PropTypes from 'prop-types';

import { useSound } from '../../utils/Sound';

import { ImCross } from 'react-icons/im';

import './Grid.css';

function Grid({
    tilesNotAllowed,
    orientation,
    canDrop,
    tiles,
    setShipsGrid,
    player,
    setState,
    setAllowRandom,
    setCoordinates,
    setAdjacentTiles,
    setTilesNotAllowedEmpty,
    toggleAdjacentVisibility,
    type,
    adjecentVisibility,
    adjacentTiles,
    animation,
    shipTiles,
    battleTiles,
    shotFired,
    shoot,
    enemy,
    setPlayer,
    setEnemy
}) {

    let sound = useSound();

    const dragEnter = (e) => {
        let mouseOverTile = e.target;
        if (tilesNotAllowed.includes(parseInt(mouseOverTile.id))) {
            mouseOverTile.classList.add('disabled');
        } else {
            mouseOverTile.classList.remove('disabled');
            e.preventDefault();
        }
    }

    const dragDrop = (e) => {

        let droppedOnTile = e.target;

        let shipLength = parseInt(e.dataTransfer.getData("ship-length"));
        let draggedElementId = parseInt(e.dataTransfer.getData("dragged-element-id"));
        let shipOwner = e.dataTransfer.getData("ship-owner");
        let shipType = e.dataTransfer.getData("ship-type");

        let firstElementId, lastElementId;
        let shipElementCounter = 0;
        let coordinates = [];

        if (orientation === 'horizontal') {
            firstElementId = parseInt(droppedOnTile.id) - draggedElementId;
            lastElementId = firstElementId + shipLength - 1;

            if (canDrop(parseInt(droppedOnTile.id), firstElementId, lastElementId, orientation) === false) {
                sound.playBlocked();
                e.preventDefault();
                return;
            }

            for (let i = firstElementId; i <= lastElementId; i++) {
                let newArray = tiles;
                newArray[i].shipType = shipType;
                newArray[i].shipElementId = shipElementCounter;
                newArray[i].user = shipOwner;
                newArray[i].orientation = orientation;

                coordinates.push(i);
                setShipsGrid(player, setState, newArray);
                shipElementCounter++;
            }

        } else {
            firstElementId = parseInt(droppedOnTile.id) - (draggedElementId * 10)
            lastElementId = firstElementId + (shipLength * 10) - 10;

            if (canDrop(parseInt(droppedOnTile.id), firstElementId, lastElementId, orientation) === false) {
                sound.playBlocked();
                e.preventDefault();
                return;
            }

            shipElementCounter = 0;
            for (let i = firstElementId; i <= lastElementId; i = i + 10) {
                let newArray = tiles;
                newArray[i].shipType = shipType;
                newArray[i].shipElementId = shipElementCounter;
                newArray[i].orientation = orientation;

                shipElementCounter++;
                coordinates.push(i);
                setShipsGrid(player, setState, newArray);
            }

        }

        sound.playPick();
        setAllowRandom(false);
        setCoordinates(player, setState, shipType, coordinates);
        setAdjacentTiles(player);
        setTilesNotAllowedEmpty([]);
        toggleAdjacentVisibility(false);
        e.target.classList.remove('grabbing');
    }

    if (type === 'placement') {
        return (
            <div className={`${type}-grid`}>
                {tiles.map((tile) => {

                    let visibilityClass = "";

                    if (adjecentVisibility === true && adjacentTiles.includes(tile.id)) {
                        visibilityClass = "taken"
                    }

                    let shipLength;

                    if (tile.shipType === "destroyer") { shipLength = 2 }
                    if (tile.shipType === "submarine") { shipLength = 3 }
                    if (tile.shipType === "cruiser") { shipLength = 3 }
                    if (tile.shipType === "battleship") { shipLength = 4 }
                    if (tile.shipType === "carrier") { shipLength = 5 }

                    return (
                        <div key={`placement-tile-back-${tile.id}`} className={`tile-back`}>
                            <div
                                className={`tile ${tile.shipType} ${visibilityClass} ${tile.orientation}
                                ${tile.shipElementId === 0 ? `first-${tile.orientation}` : ''}
                                ${tile.shipElementId === shipLength - 1 ? `last-${tile.orientation}` : ''}
                                ${tile.shipElementId !== 0 && tile.shipElementId !== shipLength - 1 ? 'inside' : ''}`}
                                key={`placement-tile-${tile.id}`}
                                id={tile.id}
                                onDragOver={(e) => e.preventDefault()}
                                onDragLeave={(e) => e.preventDefault()}
                                onDragEnter={dragEnter}
                                onDrop={dragDrop}>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    if (type === 'ships-overview-left') {

        let animationState = animation === true ? 'animate-left-out' : 'animate-left-in';
        return (
            <div className={`ships-overview-container-left ${animationState}`}>
                <h3>Podgląd statków</h3>
                <div className={`overview-grid`}>
                    {shipTiles.map((tile) => {

                        let shipLength;

                        if (tile.shipType === "destroyer") { shipLength = 2 }
                        if (tile.shipType === "submarine") { shipLength = 3 }
                        if (tile.shipType === "cruiser") { shipLength = 3 }
                        if (tile.shipType === "battleship") { shipLength = 4 }
                        if (tile.shipType === "carrier") { shipLength = 5 }

                        if (battleTiles[tile.id].state === 'miss') {
                            return (
                                <div key={`${tile.key}-overview-${tile.id}-container`} className="overview-grid-tile-back">
                                    <div key={`${tile.key}-overview-${tile.id}`} className={`
                                        overview-grid-tile
                                        ${tile.shipType}
                                        ${tile.orientation}
                                        ${tile.shipElementId === 0 ? `first-${tile.orientation}` : ''}
                                        ${tile.shipElementId === shipLength - 1 ? `last-${tile.orientation}` : ''}
                                        ${tile.shipElementId !== 0 && tile.shipElementId !== shipLength - 1 ? 'inside' : ''}`}>

                                        <div key={`${tile.key}-overview-${tile.id}`} className={`overview-grid-tile overview-miss`}>
                                            <ImCross size="12" />
                                        </div>

                                    </div>
                                </div>
                            );
                        }

                        if (battleTiles[tile.id].state === 'hit') {
                            return (
                                <div key={`${tile.key}-overview-${tile.id}-container`} className="overview-grid-tile-back">
                                    <div key={`${tile.key}-overview-${tile.id}`} className={`
                                        overview-grid-tile transparent
                                        ${tile.shipType}
                                        ${tile.orientation}
                                        ${tile.shipElementId === 0 ? `first-${tile.orientation}` : ''}
                                        ${tile.shipElementId === shipLength - 1 ? `last-${tile.orientation}` : ''}
                                        ${tile.shipElementId !== 0 && tile.shipElementId !== shipLength - 1 ? 'inside' : ''}`}>

                                        <div key={`${tile.key}-overview-${tile.id}`} className={`overview-grid-tile overview-hit`}>
                                            <ImCross size="12" />
                                        </div>

                                    </div>
                                </div>
                            );
                        }

                        if (battleTiles[tile.id].state === 'sink') {
                            return (
                                <div key={`${tile.key}-overview-${tile.id}-container`} className="overview-grid-tile-back">
                                    <div key={`${tile.key}-overview-${tile.id}`} className={`
                                        overview-grid-tile black
                                        ${tile.shipType}
                                        ${tile.orientation}
                                        ${tile.shipElementId === 0 ? `first-${tile.orientation}` : ''}
                                        ${tile.shipElementId === shipLength - 1 ? `last-${tile.orientation}` : ''}
                                        ${tile.shipElementId !== 0 && tile.shipElementId !== shipLength - 1 ? 'inside' : ''}`}>

                                        <div key={`${tile.key}-overview-${tile.id}`} className={`overview-grid-tile overview-sink`}>
                                            <ImCross size="12" />
                                        </div>

                                    </div>
                                </div>
                            );
                        }

                        return (
                            <div key={`${tile.key}-overview-back-${tile.id}`} className="overview-grid-tile-back">
                                <div key={`${tile.key}-overview-${tile.id}`} className={`
                                overview-grid-tile
                                ${tile.shipType}
                                ${tile.orientation}
                                ${tile.shipElementId === 0 ? `first-${tile.orientation}` : ''}
                                ${tile.shipElementId === shipLength - 1 ? `last-${tile.orientation}` : ''}
                                ${tile.shipElementId !== 0 && tile.shipElementId !== shipLength - 1 ? 'inside' : ''}`}>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    if (type === 'ships-overview-right') {

        let animationState = animation === true ? 'animate-right-out' : 'animate-right-in';

        return (
            <div className={`ships-overview-container-right ${animationState}`}>
                <h3>Podgląd statków</h3>
                <div className="overview-grid">
                    {shipTiles.map((tile) => {

                        let shipLength;

                        if (tile.shipType === "destroyer") { shipLength = 2 }
                        if (tile.shipType === "submarine") { shipLength = 3 }
                        if (tile.shipType === "cruiser") { shipLength = 3 }
                        if (tile.shipType === "battleship") { shipLength = 4 }
                        if (tile.shipType === "carrier") { shipLength = 5 }

                        if (battleTiles[tile.id].state === 'miss') {
                            return (
                                <div key={`overview-gird-tile-back-${tile.id}`} className="overview-grid-tile-back">
                                    <div key={`${tile.key}-overview-${tile.id}`} className={`
                                        overview-grid-tile
                                        ${tile.shipType}
                                        ${tile.orientation}
                                        ${tile.shipElementId === 0 ? `first-${tile.orientation}` : ''}
                                        ${tile.shipElementId === shipLength - 1 ? `last-${tile.orientation}` : ''}
                                        ${tile.shipElementId !== 0 && tile.shipElementId !== shipLength - 1 ? 'inside' : ''}`}>

                                        <div key={`${tile.key}-overview-${tile.id}`} className={`overview-grid-tile overview-miss`}>
                                            <ImCross size="12" />
                                        </div>

                                    </div>
                                </div>
                            );
                        }

                        if (battleTiles[tile.id].state === 'hit') {
                            return (
                                <div key={`gird-tile-back-${tile.id}`} className="overview-grid-tile-back">
                                    <div key={`${tile.key}-overview-${tile.id}`} className={`
                                        overview-grid-tile transparent
                                        ${tile.shipType}
                                        ${tile.orientation}
                                        ${tile.shipElementId === 0 ? `first-${tile.orientation}` : ''}
                                        ${tile.shipElementId === shipLength - 1 ? `last-${tile.orientation}` : ''}
                                        ${tile.shipElementId !== 0 && tile.shipElementId !== shipLength - 1 ? 'inside' : ''}`}>

                                        <div key={`${tile.key}-overview-${tile.id}`} className={`overview-grid-tile overview-hit`}>
                                            <ImCross size="12" />
                                        </div>

                                    </div>
                                </div>
                            );
                        }

                        if (battleTiles[tile.id].state === 'sink') {
                            return (
                                <div key={`gird-tile-back-${tile.id}`} className="overview-grid-tile-back">
                                    <div key={`${tile.key}-overview-${tile.id}`} className={`
                                        overview-grid-tile black
                                        ${tile.shipType}
                                        ${tile.orientation}
                                        ${tile.shipElementId === 0 ? `first-${tile.orientation}` : ''}
                                        ${tile.shipElementId === shipLength - 1 ? `last-${tile.orientation}` : ''}
                                        ${tile.shipElementId !== 0 && tile.shipElementId !== shipLength - 1 ? 'inside' : ''}`}>

                                        <div key={`${tile.key}-overview-${tile.id}`} className={`overview-grid-tile overview-sink`}>
                                            <ImCross size="12" />
                                        </div>

                                    </div>
                                </div>
                            );
                        }

                        return (
                            <div key={`gird-tile-back-${tile.id}`} className="overview-grid-tile-back">
                                <div key={`${tile.key}-overview-${tile.id}`} className={`
                                    overview-grid-tile
                                    ${tile.shipType}
                                    ${tile.orientation}
                                    ${tile.shipElementId === 0 ? `first-${tile.orientation}` : ''}
                                    ${tile.shipElementId === shipLength - 1 ? `last-${tile.orientation}` : ''}
                                    ${tile.shipElementId !== 0 && tile.shipElementId !== shipLength - 1 ? 'inside' : ''}`}>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    if (type === 'battle') {
        return (
            <div className={`battle-grid`}>
                {tiles.map((tile) => {
                    return (
                        <div key={`gird-tile-back-${tile.id}`} className={`tile-back`}>
                            <div
                                className={`tile ${tile.state}
                                    ${shotFired === true ? "blocked" : ""}
                                    ${tile.state !== null ? "blocked" : ""}`}
                                key={`battle-grid-${tile.id}`}
                                id={tile.id}
                                onClick={(e) => {
                                    if (shotFired !== true) {
                                        shoot(e, player, enemy, setPlayer, setEnemy);
                                    } else {
                                        sound.playBlocked();
                                    }
                                }}
                            >
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

}

Grid.propTypes = {
    tilesNotAllowed: PropTypes.array,
    orientation: PropTypes.string,
    canDrop: PropTypes.func,
    tiles: PropTypes.array,
    setShipsGrid: PropTypes.func,
    player: PropTypes.object,
    setState: PropTypes.func,
    setAllowRandom: PropTypes.func,
    setCoordinates: PropTypes.func,
    setAdjacentTiles: PropTypes.func,
    setTilesNotAllowedEmpty: PropTypes.func,
    toggleAdjacentVisibility: PropTypes.func,
    type: PropTypes.string,
    adjecentVisibility: PropTypes.bool,
    adjacentTiles: PropTypes.array,
    animation: PropTypes.bool,
    shipTiles: PropTypes.array,
    battleTiles: PropTypes.array,
    shotFired: PropTypes.bool,
    shoot: PropTypes.func,
    enemy: PropTypes.object,
    setPlayer: PropTypes.func,
    setEnemy: PropTypes.func
}

export default Grid;