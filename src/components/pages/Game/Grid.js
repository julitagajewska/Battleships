import React from 'react';
import GridRow from './GridRow';
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

        if (props.orientation === 'horizontal') {
            firstElementId = parseInt(droppedOnTile.id) - draggedElementId;
            lastElementId = firstElementId + shipLength - 1;

            if (props.canDrop(parseInt(droppedOnTile.id), firstElementId, lastElementId) === false) {
                e.preventDefault();
                return;
            }

            for (let i = firstElementId; i <= lastElementId; i++) {
                let newArray = props.tiles;
                newArray[i].shipType = shipType;

                props.setShipsGrid(newArray, shipOwner);
            }

            droppedOnTile.classList.add(shipType);

        } else {
            firstElementId = parseInt(droppedOnTile.id) - (draggedElementId * 10)
            lastElementId = firstElementId + (shipLength * 10) - 10;

            if (props.canDrop(parseInt(droppedOnTile.id), firstElementId, lastElementId) === false) {
                e.preventDefault();
                return;
            }

            for (let i = firstElementId; i <= lastElementId; i = i + 10) {
                let newArray = props.tiles;
                newArray[i].shipType = shipType;

                props.setShipsGrid(newArray, shipOwner);
            }

            droppedOnTile.classList.add(shipType);
        }

        props.removeShip(shipOwner, shipType);
        props.setAdjacentTiles(shipOwner, droppedOnTile);
        props.setTilesNotAllowedEmpty([]);
        props.toggleAdjacentVisibility(false);
    }



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