import React from 'react';
import './Grid.css'

export default function Grid(props) {

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
                e.preventDefault();
                return;
            }

            for (let i = firstElementId; i <= lastElementId; i++) {
                let newArray = props.tiles;
                newArray[i].shipType = shipType;
                newArray[i].shipElementId = shipElementCounter;
                newArray[i].user = shipOwner;

                coordinates.push(i);
                props.setShipsGrid(newArray, shipOwner);
                shipElementCounter++;
            }

            droppedOnTile.classList.add(shipType);

        } else {
            firstElementId = parseInt(droppedOnTile.id) - (draggedElementId * 10)
            lastElementId = firstElementId + (shipLength * 10) - 10;

            if (props.canDrop(parseInt(droppedOnTile.id), firstElementId, lastElementId, props.orientation) === false) {
                e.preventDefault();
                return;
            }

            for (let i = firstElementId; i <= lastElementId; i = i + 10) {
                let newArray = props.tiles;
                newArray[i].shipType = shipType;

                coordinates.push(i);
                props.setShipsGrid(newArray, shipOwner);
            }

            droppedOnTile.classList.add(shipType);
        }

        props.setCoordinates(shipOwner, shipType, coordinates);
        props.setAdjacentTiles(shipOwner, droppedOnTile);
        props.setTilesNotAllowedEmpty([]);
        props.toggleAdjacentVisibility(false);
    }


    if (props.type === 'placement') {
        return (
            <div className={`${props.type}-grid`}>
                {props.tiles.map((tile) => {

                    let visibilityClass = "";

                    if (props.adjecentVisibility === true && props.adjacentTiles.includes(tile.id)) {
                        visibilityClass = "taken"
                    }

                    return (
                        <div
                            className={`tile ${tile.shipType} ${visibilityClass}`}
                            key={tile.id}
                            id={tile.id}
                            onDragOver={(e) => e.preventDefault()}
                            onDragLeave={(e) => e.preventDefault()}
                            onDragEnter={dragEnter}
                            onDrop={dragDrop}>
                        </div>
                    )
                })}
            </div>
        )
    }

    if (props.type === 'ships-overview') {
        return (
            <div className='ships-overview-container'>
                SHIPS OVERVIEW
                <div className="overview-grid">
                    {props.shipTiles.map((tile) => {

                        if (props.battleTiles[tile.id].state === 'miss') {
                            return (
                                <div key={`${tile.key}-overview-${tile.id}`} className={`overview-grid-tile overview-miss`}>
                                    X
                                </div>
                            );
                        }

                        if (props.battleTiles[tile.id].state === 'hit') {
                            return (
                                <div key={`${tile.key}-overview-${tile.id}`} className={`overview-grid-tile overview-hit ${tile.shipType}`}>
                                    X
                                </div>
                            );
                        }

                        if (props.battleTiles[tile.id].state === 'sink') {
                            return (
                                <div key={`${tile.key}-overview-${tile.id}`} className={`overview-grid-tile overview-sink`}>
                                    X
                                </div>
                            );
                        }

                        return (
                            <div key={`${tile.key}-overview-${tile.id}`} className={`overview-grid-tile ${tile.shipType}`}>

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
                {/* {console.log(props.tiles)} */}
                {/* {console.log(`Battlegrid: ${props.username}`)} */}
                {props.tiles.map((tile) => {
                    return (
                        <div
                            className={`tile ${tile.state}
                             ${props.shotFired === true ? "blocked" : ""}
                             ${tile.state !== null ? "blocked" : ""}`}
                            key={`battle-grid-${tile.id}`}
                            id={tile.id}
                            onClick={(e) => props.shoot(e)}
                        >
                        </div>
                    )
                })}
            </div>
        )
    }

}