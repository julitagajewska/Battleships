import React from 'react';
import { useState } from 'react';
import './ShipsContainer.css';

export default function ShipsContainer(props) {

    let draggedShip;
    let draggedShipElement;

    let [ships] = useState(props.ships);
    let [shipContainers] = useState([]);

    function dragStart(e) {
        draggedShip = e.target;

        let shipType = draggedShip.classList[0];
        let shipOrientation = draggedShip.classList[2];
        let shipLength = draggedShip.classList[3];
        let shipOwner = draggedShip.classList[4];

        let draggedElementId;

        let draggedElementIdArray = draggedShipElement.id.split('-');
        draggedElementId = draggedElementIdArray[2];

        e.dataTransfer.setData("ship-type", shipType);
        e.dataTransfer.setData("ship-length", shipLength);
        e.dataTransfer.setData("ship-orientation", shipOrientation);
        e.dataTransfer.setData("dragged-element-id", draggedElementId);
        e.dataTransfer.setData("ship-owner", shipOwner);

        // props.setEdges(parseInt(draggedElementId), shipOrientation, parseInt(shipLength));
    }

    const dragEnd = (e) => {

    }

    const dragDrop = (e) => {

    }

    const mouseDown = (e) => {
        draggedShipElement = e.target;
    }

    return (
        <div className={`${'ships-container-' + props.orientation}`} id="ships-container">
            {props.ships.map((ship) => {
                let shipElements = []
                let shipElementId = 0;

                for (let i = 0; i < ship.shipLength; i++) {

                    let shipElement = (
                        <div
                            className={`${ship.shipType} ship-element`}
                            key={props.username + '-' + ship.shipType + '-' + shipElementId}
                            id={props.username + '-' + ship.shipType + '-' + shipElementId}
                            onMouseDown={mouseDown}>
                        </div>
                    );

                    shipElements.push(shipElement);
                    shipElementId++;
                }

                let shipContainer = (
                    <div
                        key={props.username + '-' + ship.shipType}
                        className={`${ship.shipType} 
                            ${'ship-container-' + props.orientation} 
                            ${props.orientation} 
                            ${ship.shipLength}
                            ${props.username}
                            `}
                        draggable={true}
                        onDragStart={dragStart}
                        onDrop={dragDrop}
                        onDragEnd={dragEnd}
                        onMouseDown={(e) => {
                            draggedShip = e.target;
                        }}>
                        {shipElements}
                    </div>);

                shipContainers.push(shipContainer);

                return (
                    shipContainer
                );
            })}
        </div>
    );
}