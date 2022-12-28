import React from 'react';
import { useState, useEffect } from 'react';
import './Game.css';
import UserSidebar from './UserSidebar';

const gridWidth = 10;

class Tile {
    constructor(key, id, shipType, shipElementId) {
        this.key = key;
        this.id = id;
        this.shipType = shipType;
        this.shipElementId = shipElementId;
    }
}

class Ship {
    constructor(key, name, shipLength, orientation, coordinates) {
        this.key = key;
        this.name = name;
        this.shipLength = shipLength;
        this.orientation = orientation;
        this.coordinates = coordinates;
    }
}

class Player {
    constructor(username, ships) {
        this.username = username;
        this.ships = ships;
    }
}

export default function Game() {

    let [clickedTile] = useState(null);
    let [tiles, setTiles] = useState([]);

    let shipsA = [];

    function generateShips(username) {
        let ships = [
            new Ship(username + '-destroyer', 'destroyer', 2, 'horizontal', []),
            new Ship(username + '-submarine', 'submarine', 3, 'horizontal', []),
            new Ship(username + '-cruiser', 'cruiser', 3, 'horizontal', []),
            new Ship(username + '-battleship', 'battleship', 4, 'horizontal', []),
            new Ship(username + '-carrier', 'carrier', 5, 'horizontal', [])
        ];

        return ships;
    }

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

    useEffect(() => {
        generateTiles("userA");
    }, [])


    shipsA = generateShips("userA");

    let dragDrop = (e) => {
        let droppedOnTile = e.target;

        let shipLength = parseInt(e.dataTransfer.getData("ship-length"));
        let draggedElementId = parseInt(e.dataTransfer.getData("dragged-element-id"));
        console.log(draggedElementId);

        let firstElementId = parseInt(droppedOnTile.id) - draggedElementId;
        let lastElementId = firstElementId + shipLength - 1;

        console.log(firstElementId);
        console.log(lastElementId);

        for (let i = firstElementId; i <= lastElementId; i++) {
            // setTiles(tiles.map(tile => {
            //     if (tile.id === i) {
            //         return { ...tile, shipType: e.dataTransfer.getData("ship-type") }
            //     } else {
            //         return tile
            //     }
            // }))
            // console.log(`Changed tile with id: ${i}`);
            // console.log(tiles);

            let newArray = [...tiles];
            newArray[i].shipType = e.dataTransfer.getData("ship-type");

            setTiles(newArray);
        }


        console.log(e.dataTransfer.getData("ship-type"));
        droppedOnTile.classList.add(e.dataTransfer.getData("ship-type"));
        console.log(droppedOnTile);
    }

    return (
        <div className="game">

            <UserSidebar username="PLAYER 1" ships={shipsA} />

            <div className="grid">
                {tiles.map((tile) => (
                    <div
                        className={`tile ${tile.shipType}`}
                        key={tile.id}
                        id={tile.id}
                        onClick={(e) => onTileClick(e)}
                        onDragOver={(e) => e.preventDefault()}
                        onDragEnter={(e) => e.preventDefault()}
                        onDragLeave={(e) => e.preventDefault()}
                        onDrop={dragDrop}
                    ></div>
                ))}
            </div>

            <UserSidebar username="PLAYER 2" ships={shipsA} />

        </div>
    );
}