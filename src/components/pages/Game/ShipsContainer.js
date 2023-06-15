import React from 'react';
import PropTypes from 'prop-types';

import './ShipsContainer.css';

function ShipsContainer({
    setTilesNotAllowed,
    setTilesNotAllowedEmpty,
    orientation,
    ships,
    username
}) {

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

        setTilesNotAllowed(shipLength, draggedElementId);
        // toggleAdjacentVisibility(true);

    }

    const mouseDown = (e) => {
        draggedShipElement = e.target;
    }

    const dragEnd = (e) => {
        e.target.classList.remove('grabbing');
        setTilesNotAllowedEmpty([]);
    }

    return (
        <div className={`${'ships-container-' + orientation}`} id="ships-container">
            {ships.map((ship) => {

                let shipElements = []
                let shipElementId = 0;

                if (ship.coordinates.length !== 0) {
                    return (<div key={username + '-' + ship.shipType + '-' + shipElementId}></div>);
                }

                for (let i = 0; i < ship.shipLength; i++) {

                    let shipElement = (
                        <div
                            className={`${ship.shipType} ship-element ${i === 0 ? 'first' : 'inside'} ${i === ship.shipLength - 1 ? 'last' : 'inside'}`}
                            key={username + '-' + ship.shipType + '-' + shipElementId}
                            id={username + '-' + ship.shipType + '-' + shipElementId}
                            onMouseDown={mouseDown}>
                        </div>
                    );

                    shipElements.push(shipElement);
                    shipElementId++;
                }

                let shipContainer = (
                    <div
                        key={username + '-' + ship.shipType}
                        className={`
                            ${ship.shipType} 
                            ${'ship-container-' + orientation} 
                            ${orientation} 
                            ${ship.shipLength}
                            ${username}
                            ${'ship-container-draggable'}`}
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

ShipsContainer.propTypes = {
    setTilesNotAllowed: PropTypes.func,
    setTilesNotAllowedEmpty: PropTypes.func,
    orientation: PropTypes.string,
    ships: PropTypes.array,
    username: PropTypes.string
}

export default ShipsContainer;
