import React from 'react';
import './Grid.css';
import { ImCross } from 'react-icons/im';
import { useSound } from '../../utils/Sound';
import { RxThickArrowLeft } from 'react-icons/rx';

export default function Grid(props) {

    let sound = useSound();

    const dragEnter = (e) => {
        let mouseOverTile = e.target;
        if (props.tilesNotAllowed.includes(parseInt(mouseOverTile.id))) {
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

        if (props.orientation === 'horizontal') {
            firstElementId = parseInt(droppedOnTile.id) - draggedElementId;
            lastElementId = firstElementId + shipLength - 1;

            if (props.canDrop(parseInt(droppedOnTile.id), firstElementId, lastElementId, props.orientation) === false) {
                sound.playBlocked();
                e.preventDefault();
                return;
            }

            for (let i = firstElementId; i <= lastElementId; i++) {
                let newArray = props.tiles;
                newArray[i].shipType = shipType;
                newArray[i].shipElementId = shipElementCounter;
                newArray[i].user = shipOwner;
                newArray[i].orientation = props.orientation;

                coordinates.push(i);
                props.setShipsGrid(props.player, props.setState, newArray);
                shipElementCounter++;
            }

        } else {
            firstElementId = parseInt(droppedOnTile.id) - (draggedElementId * 10)
            lastElementId = firstElementId + (shipLength * 10) - 10;

            if (props.canDrop(parseInt(droppedOnTile.id), firstElementId, lastElementId, props.orientation) === false) {
                sound.playBlocked();
                e.preventDefault();
                return;
            }

            shipElementCounter = 0;
            for (let i = firstElementId; i <= lastElementId; i = i + 10) {
                let newArray = props.tiles;
                newArray[i].shipType = shipType;
                newArray[i].shipElementId = shipElementCounter;
                newArray[i].orientation = props.orientation;

                shipElementCounter++;
                coordinates.push(i);
                props.setShipsGrid(props.player, props.setState, newArray);
            }

        }

        sound.playPick();
        props.setAllowRandom(false);
        props.setCoordinates(props.player, props.setState, shipType, coordinates);
        props.setAdjacentTiles(props.player);
        props.setTilesNotAllowedEmpty([]);
        props.toggleAdjacentVisibility(false);
        e.target.classList.remove('grabbing');
    }

    if (props.type === 'placement') {
        return (
            <div className={`${props.type}-grid`}>
                {props.tiles.map((tile) => {

                    let visibilityClass = "";

                    if (props.adjecentVisibility === true && props.adjacentTiles.includes(tile.id)) {
                        visibilityClass = "taken"
                    }

                    let shipLength;

                    if (tile.shipType === "destroyer") { shipLength = 2 }
                    if (tile.shipType === "submarine") { shipLength = 3 }
                    if (tile.shipType === "cruiser") { shipLength = 3 }
                    if (tile.shipType === "battleship") { shipLength = 4 }
                    if (tile.shipType === "carrier") { shipLength = 5 }

                    return (
                        <div className={`tile-back`}>
                            <div
                                className={`tile ${tile.shipType} ${visibilityClass} ${tile.orientation}
                                ${tile.shipElementId === 0 ? `first-${tile.orientation}` : ''}
                                ${tile.shipElementId === shipLength - 1 ? `last-${tile.orientation}` : ''}
                                ${tile.shipElementId !== 0 && tile.shipElementId !== shipLength - 1 ? 'inside' : ''}`}
                                key={tile.id}
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

    console.log(props.animation)

    if (props.type === 'ships-overview-left') {

        let animationState = props.animation === true ? 'animate-left-out' : 'animate-left-in';
        return (
            <div className={`ships-overview-container-left ${animationState}`}>
                <h3>Podgląd statków</h3>
                <div className={`overview-grid`}>
                    {props.shipTiles.map((tile) => {

                        let shipLength;

                        if (tile.shipType === "destroyer") { shipLength = 2 }
                        if (tile.shipType === "submarine") { shipLength = 3 }
                        if (tile.shipType === "cruiser") { shipLength = 3 }
                        if (tile.shipType === "battleship") { shipLength = 4 }
                        if (tile.shipType === "carrier") { shipLength = 5 }

                        if (props.battleTiles[tile.id].state === 'miss') {
                            return (
                                <div className="overview-grid-tile-back">
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

                        if (props.battleTiles[tile.id].state === 'hit') {
                            return (
                                <div className="overview-grid-tile-back">
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

                        if (props.battleTiles[tile.id].state === 'sink') {
                            return (
                                <div className="overview-grid-tile-back">
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
                            <div className="overview-grid-tile-back">
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

    if (props.type === 'ships-overview-right') {

        let animationState = props.animation === true ? 'animate-right-out' : 'animate-right-in';

        return (
            <div className={`ships-overview-container-right ${animationState}`}>
                <h3>Podgląd statków</h3>
                <div className="overview-grid">
                    {props.shipTiles.map((tile) => {

                        let shipLength;

                        if (tile.shipType === "destroyer") { shipLength = 2 }
                        if (tile.shipType === "submarine") { shipLength = 3 }
                        if (tile.shipType === "cruiser") { shipLength = 3 }
                        if (tile.shipType === "battleship") { shipLength = 4 }
                        if (tile.shipType === "carrier") { shipLength = 5 }

                        if (props.battleTiles[tile.id].state === 'miss') {
                            return (
                                <div className="overview-grid-tile-back">
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

                        if (props.battleTiles[tile.id].state === 'hit') {
                            return (
                                <div className="overview-grid-tile-back">
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

                        if (props.battleTiles[tile.id].state === 'sink') {
                            return (
                                <div className="overview-grid-tile-back">
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
                            <div className="overview-grid-tile-back">
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

    if (props.type === 'battle') {
        return (
            <div className={`battle-grid`}>
                {props.tiles.map((tile) => {
                    return (
                        <div className={`tile-back`}>
                            <div
                                className={`tile ${tile.state}
                                    ${props.shotFired === true ? "blocked" : ""}
                                    ${tile.state !== null ? "blocked" : ""}`}
                                key={`battle-grid-${tile.id}`}
                                id={tile.id}
                                onClick={(e) => {
                                    if (props.shotFired !== true) {
                                        props.shoot(e, props.player, props.enemy, props.setPlayer, props.setEnemy);
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