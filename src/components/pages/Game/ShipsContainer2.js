import React from 'react'
import './ShipsContainer.css'

export default function ShipsContainer(props) {

    let draggedShip;
    let draggedShipElement;

    const dragStart = (e) => {
        draggedShip = e.target;

        let shipType = draggedShip.classList[0];
        let shipLength = draggedShip.classList[3];
        let shipOwner = draggedShip.classList[4];

        let draggedElementId = draggedShipElement.id.split('-')[2];

        e.dataTransfer.setData("ship-type", shipType);
        e.dataTransfer.setData("ship-length", shipLength);
        e.dataTransfer.setData("dragged-element-id", draggedElementId);
        e.dataTransfer.setData("ship-owner", shipOwner);

        props.setTilesNotAllowed(shipLength, draggedElementId);
        // props.toggleAdjacentVisibility(true);

    }

    const mouseDown = (e) => {
        draggedShipElement = e.target;
    }

    const dragEnd = (e) => {
        props.setTilesNotAllowedEmpty([]);
        props.toggleAdjacentVisibility(false);
    }

    return (
        <div className={`${'ships-container-' + props.orientation}`} id="ships-container">
            {props.ships.map((ship) => {

                let shipElements = []
                let shipElementId = 0;

                if (ship.coordinates.length !== 0) {
                    return (<div key={props.username + '-' + ship.shipType + '-' + shipElementId}></div>);
                }

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
                        className={`
                            ${ship.shipType} 
                            ${'ship-container-' + props.orientation} 
                            ${props.orientation} 
                            ${ship.shipLength}
                            ${props.username}`}
                        draggable={true}
                        onDragStart={dragStart}
                        onDragEnd={dragEnd}
                        onMouseDown={(e) => {
                            draggedShip = e.target;
                        }}>

                        {shipElements}
                    </div>);

                return (
                    shipContainer
                )
            })}
        </div >
    )
}
