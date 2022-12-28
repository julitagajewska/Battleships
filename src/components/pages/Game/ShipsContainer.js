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
        let draggedElementId;

        let draggedElementIdArray = draggedShipElement.id.split('-');
        draggedElementId = draggedElementIdArray[2];

        console.log(shipOrientation);
        e.dataTransfer.setData("ship-type", shipType);
        e.dataTransfer.setData("ship-length", shipLength);
        e.dataTransfer.setData("ship-orientation", shipOrientation);
        e.dataTransfer.setData("dragged-element-id", draggedElementId);
    }

    const dragEnd = (e) => {
        // let newShipContainers = shipContainers.filter((element) => {
        //     return element.props.className !== draggedShip.className
        // })
        // shipContainers = newShipContainers;
        // console.log('ble');
        // console.log(shipContainers);
        // console.log(draggedShip);

    }

    const dragDrop = (e) => {

        const notAllowedHorizontal = [];
        const notAllowedVertical = [];

        let shipNotAllowedHorizontal = [];
        let shipNotAllowedVertical = [];

    }

    const mouseDown = (e) => {
        draggedShipElement = e.target;
    }

    return (
        <div className='ships-container' id="ships-container">
            {ships.map((ship) => {
                let shipElements = []
                let shipElementId = 0;

                for (let i = 0; i < ship.shipLength; i++) {

                    let shipElement = (
                        <div
                            className={`${ship.name} ship-element`}
                            key={props.username + '-' + ship.name + '-' + shipElementId}
                            id={props.username + '-' + ship.name + '-' + shipElementId}
                            onMouseDown={mouseDown}>
                        </div>
                    );

                    shipElements.push(shipElement);
                    shipElementId++;
                }

                let shipContainer = (
                    <div
                        key={props.username + '-' + ship.name}
                        className={`${ship.name} ship-container ${ship.orientation} ${ship.shipLength}`}
                        draggable={true}
                        onDragStart={dragStart}
                        onDrop={dragDrop}
                        onDragEnd={dragEnd}
                        onMouseDown={(e) => {
                            draggedShip = e.target;
                            console.log(ship.orientation)
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