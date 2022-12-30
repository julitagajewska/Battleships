import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import './Game.css';
import UserSidebar from './UserSidebar';

const gridWidth = 10;
let tilesNotAllowed = [];

class Tile {
    constructor(key, id, shipType, shipElementId) {
        this.key = key;
        this.id = id;
        this.shipType = shipType;
        this.shipElementId = shipElementId;
    }
}

class Ship {
    constructor(key, shipType, shipLength, orientation, owner) {
        this.key = key;
        this.shipType = shipType;
        this.shipLength = shipLength;
        this.orientation = orientation;
        this.owner = owner;

    }
}

class Player {
    constructor(username, ships) {
        this.username = username;
        this.ships = ships;
    }
}

const generateShips = (username) => {

    let newShips = [];
    newShips.push(new Ship(username + '-destroyer', 'destroyer', 2, 'horizontal', username));
    newShips.push(new Ship(username + '-submarine', 'submarine', 3, 'horizontal', username));
    newShips.push(new Ship(username + '-cruiser', 'cruiser', 3, 'horizontal', username));
    newShips.push(new Ship(username + '-battleship', 'battleship', 4, 'horizontal', username));
    newShips.push(new Ship(username + '-carrier', 'carrier', 5, 'horizontal', username));

    return newShips
}

export default function Game() {

    let [clickedTile] = useState(null);
    let [tiles, setTiles] = useState([]);
    let [shipsA, setShipsA] = useState([]);
    let [shipsB, setShipsB] = useState([]);
    let [ships, setShips] = useState(() => {
        let userAShips = generateShips("user_A");
        let userBShips = generateShips("user_B");
        return userAShips.concat(userBShips);
    });

    // let [ships, setShips] = useState([]);

    let [orientation, setOrientation] = useState('horizontal');

    useEffect(() => {
        generateTiles("userA");
    }, [])

    useEffect(() => {
        console.log("Render ships A and B")
        setShipsA(ships.filter(ship => {
            return ship.owner === 'user_A'
        }))

        setShipsB(ships.filter(ship => {
            return ship.owner === 'user_B'
        }))

    }, [ships])

    const onTileClick = (e) => {
        clickedTile = e.target;
        clickedTile.classList.add("clicked");
    }

    const generateTiles = (gridName) => {
        let newTiles = [];
        for (let i = 0; i < gridWidth * gridWidth; i++) {
            newTiles.push(new Tile(gridName + i, i, '', null));
        }

        setTiles(newTiles);
    }

    let dragDrop = (e) => {

        let droppedOnTile = e.target;

        let shipLength = parseInt(e.dataTransfer.getData("ship-length"));
        let draggedElementId = parseInt(e.dataTransfer.getData("dragged-element-id"));
        let shipOwner = e.dataTransfer.getData("ship-owner");
        let shipType = e.dataTransfer.getData("ship-type");

        let firstElementId, lastElementId;

        if (orientation === 'horizontal') {
            firstElementId = parseInt(droppedOnTile.id) - draggedElementId;
            lastElementId = firstElementId + shipLength - 1;

            if (canDrop(parseInt(droppedOnTile.id)) === false) {
                e.preventDefault();
                return;
            }

            for (let i = firstElementId; i <= lastElementId; i++) {
                let newArray = [...tiles];
                newArray[i].shipType = shipType;

                setTiles(newArray);
            }

            droppedOnTile.classList.add(shipType);

        } else {
            firstElementId = parseInt(droppedOnTile.id) - (draggedElementId * 10)
            lastElementId = firstElementId + (shipLength * 10) - 10;

            console.log(`First element: ${firstElementId}`)
            console.log(`Last element: ${lastElementId}`)

            for (let i = firstElementId; i <= lastElementId; i = i + 10) {
                let newArray = [...tiles];
                newArray[i].shipType = shipType;
                setTiles(newArray);
            }
        }

        let newShips = [];

        ships.forEach(ship => {
            if (ship.shipType === shipType && ship.owner === shipOwner) {
            } else {
                newShips.push(ship)
            }
        })

        setShips(ships.filter(ship => {
            return !(ship.shipType === shipType && ship.owner === shipOwner)
        }));

        console.log(ships);

        shipsA = ships.filter(ship => {
            return ship.owner === 'user_A'
        })

        shipsB = ships.filter(ship => {
            return ship.owner === 'user_B'
        })

    }

    const canDrop = (tileId) => {
        if (tilesNotAllowed.includes(tileId)) {
            return false;
        }

        return true;
    }

    let dragEnter = (e) => {

        let mouseOverTile = e.target;

        if (tilesNotAllowed.includes(parseInt(mouseOverTile.id))) {
            mouseOverTile.classList.add('disabled');
        } else {
            mouseOverTile.classList.remove('disabled');
            e.preventDefault();
        }

    }

    let setEdges = (elementId, shipOrientation, shipLength) => {
        let rightEdge = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99];
        let leftEdge = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
        let topEdge = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        let bottomEdge = [90, 91, 99, 92, 93, 94, 95, 96, 97, 98, 99];

        let tilesLeft, tilesRight, tilesTop, tilesBottom;

        if (orientation === 'horizontal') {
            tilesRight = shipLength - (elementId + 1);
            tilesLeft = elementId;

            rightEdge.forEach(edgeElement => {
                for (let i = 0; i < tilesRight; i++) {
                    if (!rightEdge.includes(edgeElement - i)) {
                        rightEdge.push(edgeElement - i);
                    }
                }
            });

            leftEdge.forEach(edgeElement => {
                for (let i = 0; i < tilesLeft; i++) {
                    if (!leftEdge.includes(edgeElement + i)) {
                        leftEdge.push(edgeElement + i);
                    }
                }
            })

            if (tilesRight === 0) { rightEdge = [] }
            if (tilesLeft === 0) { leftEdge = [] }

            tilesNotAllowed = rightEdge.concat(leftEdge);
        } else {

        }


    }

    let rotateShips = () => {

        if (orientation === 'horizontal') {
            setOrientation('vertical');
        } else {
            setOrientation('horizontal');
        }

    }

    return (
        <div className="game">

            <UserSidebar
                username="PLAYER_A"
                ships={shipsA}
                setEdges={setEdges}
                orientation={orientation}
                rotateShips={rotateShips}
            />

            <div className="grid">
                {tiles.map((tile) => (
                    <div
                        className={`tile ${tile.shipType}`}
                        key={tile.id}
                        id={tile.id}
                        onClick={(e) => onTileClick(e)}
                        onDragOver={(e) => e.preventDefault()}
                        onDragEnter={dragEnter}
                        onDragLeave={(e) => e.preventDefault()}
                        onDrop={dragDrop}
                    ></div>
                ))}
            </div>

            <UserSidebar
                username="PLAYER_B"
                ships={shipsB}
                setEdges={setEdges}
                orientation={orientation}
                rotateShips={rotateShips} />

        </div>
    );
}