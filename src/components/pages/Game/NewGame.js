/* eslint-disable default-case */
import React, { useState, useEffect } from 'react';
import { Ship } from '../../../Models/Ship';
import { Tile } from '../../../Models/Tile';
import { Player } from '../../../Models/Player';
import { useAuth } from '../../utils/auth';

import GameModeChoice from './GameModeChoice';
import PlayerTypeChoice from './PlayerTypeChoice';
import PlayersList from './PlayersList';
import EnterName from './EnterName';
import UserSidebar from './UserSidebar';

import './GameClass.css';
import { User } from '../../../Models/User';

export default function Game(props) {

    // Constant varaibles
    const gridWidth = 10;
    const auth = useAuth();


    // Game state
    const [gameMode, setGameMode] = useState('');
    const [gamePhase, setGamePhase] = useState('game-mode-choice');
    const [orientation, setOrientation] = useState('horizontal');

    // Users
    const [playerA, setPlayerA] = useState(null);
    const [playerB, setPlayerB] = useState(null);
    const [computer, setComputer] = useState(null);

    // Ship placement
    const [tilesNotAllowed, setTilesNotAllowed] = useState([]);

    const [adjacent, setAdjacent] = useState([]);
    const [displayAdjacent, setDisplayAdjacent] = useState(false);

    const [allowRandom, setAllowRandom] = useState(true);

    // Gameplay
    const [shotfired, setShotFired] = useState(false);
    const [cursorDisabled, setCursorDisabled] = useState(false);



    // Initialize known players
    useEffect(() => {
        let player = new Player(
            auth.user,
            generateShips(auth.user.username),
            generateTiles(auth.user.username, "battle_grid"),
            generateTiles(auth.user.username, "ships_grid"),
            0
        )

        setPlayerA(player);

        let computerUser = new User(
            null,
            "Computer",
            null,
            null,
            null,
            null
        );

        let computerPlayer = new Player(
            computerUser,
            generateShips(computerUser.username),
            generateTiles(computerUser.username, "battle_grid"),
            generateTiles(computerUser.username, "ships_grid"),
            0
        );

        setComputer(computerPlayer);
    }, [])

    // Assign user to playerB
    const assingPlayerB = (user) => {
        let player = new Player(
            user,
            generateShips(user.username),
            generateTiles(user.username, "battle_grid"),
            generateTiles(user.username, "ships_grid"),
            0
        )

        setPlayerB(player);
    }





    const generateShips = (username) => {
        let newShips = [];

        newShips.push(new Ship(username + '-destroyer', 'destroyer', 2, [false, false], []));
        newShips.push(new Ship(username + '-submarine', 'submarine', 3, [false, false, false], []));
        newShips.push(new Ship(username + '-cruiser', 'cruiser', 3, [false, false, false], []));
        newShips.push(new Ship(username + '-battleship', 'battleship', 4, [false, false, false, false], []));
        newShips.push(new Ship(username + '-carrier', 'carrier', 5, [false, false, false, false, false], []));

        return newShips
    }

    const generateTiles = (username, gridType) => {
        let grid = [];

        for (let i = 0; i < gridWidth * gridWidth; i++) {
            grid.push(new Tile(`${username}-${gridType}-${i}`, i, '', null, '', null));
        }

        return grid;
    }


    // Returns an array of ids, where dragged ship element can't be dropped.
    // Function dedicated only for random ship placement generator.
    const getTilesNotAllowed = (shipLength, draggedShipElementId, orientation) => {
        let rightEdge = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99];
        let leftEdge = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
        let topEdge = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        let bottomEdge = [90, 91, 99, 92, 93, 94, 95, 96, 97, 98, 99];

        let tilesLeft, tilesRight, tilesTop, tilesBottom, notAllowed;

        if (orientation === 'horizontal') {
            tilesRight = shipLength - draggedShipElementId - 1;
            tilesLeft = parseInt(draggedShipElementId);

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

            notAllowed = rightEdge.concat(leftEdge);

            return notAllowed;

        } else {
            tilesTop = parseInt(draggedShipElementId);
            tilesBottom = shipLength - draggedShipElementId - 1;

            topEdge.forEach(edgeElement => {
                for (let i = 0; i < tilesTop; i++) {
                    if (!topEdge.includes(edgeElement + i * 10)) {
                        topEdge.push(edgeElement + i * 10);
                    }
                }
            });

            bottomEdge.forEach(edgeElement => {
                for (let i = 0; i < tilesBottom; i++) {
                    if (!bottomEdge.includes(edgeElement - i * 10)) {
                        bottomEdge.push(edgeElement - i * 10);
                    }
                }
            })


            if (tilesTop === 0) { topEdge = [] }
            if (tilesBottom === 0) { bottomEdge = [] }

            notAllowed = topEdge.concat(bottomEdge);

            return notAllowed;
        }

    }


    // Returns an array of tiles adjacent to ships already placed in passed grid.
    // None of the ships' elements can be dropped on these tiles.
    // Function dedicated only for random ship placement generator.
    const getAdjacentTiles = (shipsGrid) => {
        let tiles = shipsGrid;

        let rightEdge = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99];
        let leftEdge = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];

        let adjacent = [];

        tiles.forEach((tile) => {
            if (tile.shipType === '') { return; }

            if (rightEdge.includes(tile.id)) {
                adjacent.push(tile.id, tile.id - 1, tile.id - 10, tile.id + 10, tile.id - 11, tile.id + 9);
                return;
            }

            if (leftEdge.includes(tile.id)) {
                adjacent.push(tile.id, tile.id + 1, tile.id + 11, tile.id - 9, tile.id - 10, tile.id + 10);
                return;
            }

            adjacent.push(tile.id, tile.id - 1, tile.id + 1, tile.id + 11, tile.id - 9, tile.id - 10, tile.id + 10, tile.id - 11, tile.id + 9);

        });

        return adjacent;
    }

    // Checks if the random ship placement is acceptable.
    const canPlaceRandomShip = (tileId, firstElementId, lastElementId, orientation, adjacent, notAllowed) => {
        if (notAllowed.includes(tileId)) {
            return false;
        }

        if (orientation === 'horizontal') {
            for (let i = firstElementId; i <= lastElementId; i++) {
                if (adjacent.includes(i)) { return false }
            }
        } else {
            for (let i = firstElementId; i <= lastElementId; i = i + 10) {
                if (adjacent.includes(i)) { return false }
            }
        }

        return true;
    }

    const setCoordinates = (player, shipType, coordinates) => {
        player.ships.filter((ship) => {
            if (ship.shipType === shipType) {
                ship.coordinates = coordinates;
            }
        })
    }

    const randomShipPlacement = (player, setState) => {
        let adjacent = [];
        let notAllowed = [];

        player.ships.forEach((ship) => {

            let shipsGrid = player.shipsGrid;

            while (1) {
                let orientationNumber = Math.floor(Math.random() * 2);
                let orientation = ''
                let randomTile = Math.floor(Math.random() * 100);
                let lastTile;
                let coordinates = [];

                switch (orientationNumber) {
                    case 0:
                        orientation = 'horizontal'
                        lastTile = randomTile + ship.shipLength;
                        for (let i = randomTile; i < lastTile; i++) {
                            coordinates.push(i);
                        }
                        break;
                    case 1:
                        orientation = 'vertical'
                        lastTile = randomTile + ship.shipLength * 10;
                        for (let i = randomTile; i < lastTile; i = i + 10) {
                            coordinates.push(i);
                        }
                        break;
                }


                // ------ //

                notAllowed = getTilesNotAllowed(ship.shipLength, 0, orientation);
                adjacent = getAdjacentTiles(shipsGrid);

                if (canPlaceRandomShip(randomTile, randomTile, lastTile, orientation, adjacent, notAllowed) === true) {
                    setCoordinates(player, ship.shipType, coordinates);

                    let counter = 0;
                    coordinates.forEach((coordinate) => {
                        shipsGrid[coordinate].shipType = ship.shipType;
                        shipsGrid[coordinate].shipElementId = counter;
                        counter++;
                    })
                    break;
                }
            }

            player.shipsGrid = shipsGrid;
        })

        setState(player);
    }

    // Ship placement
    const toggleOrientation = () => {
        setOrientation(!orientation)
    }

    const toggleAdjacentVisibility = (visibility) => {
        setDisplayAdjacent(visibility);
    }

    const setNotAllowed = (shipLength, draggedShipElementId) => {
        let rightEdge = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99];
        let leftEdge = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
        let topEdge = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        let bottomEdge = [90, 91, 99, 92, 93, 94, 95, 96, 97, 98, 99];

        let tilesLeft, tilesRight, tilesTop, tilesBottom, notAllowed;

        if (orientation === 'horizontal') {
            tilesRight = shipLength - draggedShipElementId - 1;
            tilesLeft = parseInt(draggedShipElementId);

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

            notAllowed = rightEdge.concat(leftEdge);

            setTilesNotAllowed(notAllowed);

        } else {
            tilesTop = parseInt(draggedShipElementId);
            tilesBottom = shipLength - draggedShipElementId - 1;

            topEdge.forEach(edgeElement => {
                for (let i = 0; i < tilesTop; i++) {
                    if (!topEdge.includes(edgeElement + i * 10)) {
                        topEdge.push(edgeElement + i * 10);
                    }
                }
            });

            bottomEdge.forEach(edgeElement => {
                for (let i = 0; i < tilesBottom; i++) {
                    if (!bottomEdge.includes(edgeElement - i * 10)) {
                        bottomEdge.push(edgeElement - i * 10);
                    }
                }
            })

            if (tilesTop === 0) { topEdge = [] }
            if (tilesBottom === 0) { bottomEdge = [] }

            notAllowed = topEdge.concat(bottomEdge);

            setTilesNotAllowed(notAllowed);
        }
    }

    const resetShips = (player, setState) => {
        player.ships = generateShips(player.username);
        player.shipsGrid = generateTiles(player, "ships_grid");

        setState(player)
    }

    const setTilesNotAllowedEmpty = () => {
        setTilesNotAllowed([]);
    }

    const readyPlayerA = () => {
        setGamePhase("placement-player-B");
    }

    // Game phases

    if (gamePhase === 'game-mode-choice') {
        console.log(playerA);
        console.log(computer);
        return (
            <GameModeChoice
                setGameMode={setGameMode}
                setState={setComputer}
                randomShipPlacement={randomShipPlacement}
                player={computer}
                setGamePhase={setGamePhase} />
        );
    }

    if (gamePhase === 'player-type-choice') {
        return (
            <PlayerTypeChoice
                setGamePhase={setGamePhase} />
        );
    }

    if (gamePhase === 'players-list') {
        return (
            <PlayersList
                setGamePhase={setGamePhase}
                setUser={assingPlayerB} />
        );
    }

    if (gamePhase === 'enter-name-player-B') {
        return (
            <EnterName
                setUser={assingPlayerB}
                setGamePhase={setGamePhase} />
        );
    }

    if (gamePhase === 'placement-player-A') {
        return (
            <div className='game-container'>
                <div>
                    <UserSidebar
                        player={playerA}
                        setState={setPlayerA}
                        type={"placement-player-A"}
                        ships={playerA.ships}
                        orientation={orientation}
                        toggleOrientation={toggleOrientation}
                        setNotAllowed={setNotAllowed}
                        resetShips={resetShips}
                        setTilesNotAllowedEmpty={setTilesNotAllowedEmpty}
                        toggleAdjacentVisibility={toggleAdjacentVisibility}
                        readyPlayerA={readyPlayerA}
                        randomShipPlacement={randomShipPlacement} />
                </div>
            </div>
        );
    }


    console.log(playerA);
    console.log(playerB);

    return (
        <div className="upper-layer">
            Game
        </div>
    )
}
