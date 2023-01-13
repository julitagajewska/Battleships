/* eslint-disable default-case */
import React, { useState, useEffect } from 'react';
import { Ship } from '../../../Models/Ship';
import { Tile } from '../../../Models/Tile';
import { Player } from '../../../Models/Player';
import { User } from '../../../Models/User';

import { useAuth } from '../../utils/auth';
import { useSound } from '../../utils/Sound';

import WaitingForUserOVerlay from './WaitingForUserOVerlay';
import GameModeChoice from './GameModeChoice';
import PlayerTypeChoice from './PlayerTypeChoice';
import PlayersList from './PlayersList';
import EnterName from './EnterName';
import UserSidebar from './UserSidebar';
import Grid from './Grid';
import Score from './Score';

import './Game.css';
import GameOver from './GameOver';

export default function Game(props) {

    // Constant varaibles
    const gridWidth = 10;
    const auth = useAuth();
    const sound = useSound();


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
    const [shotFired, setShotFired] = useState(false);
    const [cursorDisabled, setCursorDisabled] = useState(false);

    const [toggleOverlay, setToggleOverlay] = useState(true);



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
            "Komputer",
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
            grid.push(new Tile(`${username}-${gridType}-${i}`, i, '', null, '', null, ''));
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

    const setCoordinates = (player, setState, shipType, coordinates) => {
        player.ships.filter((ship) => {
            if (ship.shipType === shipType) {
                ship.coordinates = coordinates;
            }
        })

        setState(player);
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

                console.log("Ble");

                if (canPlaceRandomShip(randomTile, randomTile, lastTile, orientation, adjacent, notAllowed) === true) {
                    setCoordinates(player, setState, ship.shipType, coordinates);

                    let counter = 0;
                    coordinates.forEach((coordinate) => {
                        shipsGrid[coordinate].shipType = ship.shipType;
                        shipsGrid[coordinate].shipElementId = counter;
                        shipsGrid[coordinate].orientation = orientation;
                        counter++;
                    })
                    break;
                }
            }

            player.shipsGrid = shipsGrid;
        })

        setState(player);
        setAdjacent([]);
        setTilesNotAllowed([]);
    }

    // Ship placement
    const toggleOrientation = () => {
        if (orientation === 'horizontal') {
            setOrientation('vertical')
        } else {
            setOrientation('horizontal')
        }
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
        console.log(player);
        player.ships = generateShips(player.user.username);
        player.shipsGrid = generateTiles(player.user.username, "ships_grid");

        setAdjacent([]);
        setTilesNotAllowed([]);
        setState(player);
        setAllowRandom(true);
    }

    const setTilesNotAllowedEmpty = () => {
        setTilesNotAllowed([]);
    }

    const readyPlayerA = () => {
        if (gameMode === 'pvp' && gamePhase === 'placement-player-A') {
            setTilesNotAllowed([]);
            setAdjacent([]);
            setAllowRandom(true);
            setGamePhase("placement-player-B");
        }

        if (gameMode === 'pvp' && gamePhase === 'turn-0') {
            setGamePhase("waiting-for-player-B");
        }

        if (gameMode === 'pvp' && gamePhase === 'waiting-for-player-A') {
            setShotFired(false);
            setGamePhase('turn-0');
        }

        if (gameMode === 'pvc' && gamePhase === 'placement-player-A') {
            setGamePhase('turn-0');
        }

        if (gameMode === 'pvc' && gamePhase === 'turn-0') {
            setShotFired(false);
            setGamePhase('turn-1');
            computerShot();
        }
    }

    const readyPlayerB = () => {
        if (gamePhase === 'placement-player-B') {
            setGamePhase(`turn-${randomTurn()}`);
        }

        if (gamePhase === 'waiting-for-player-B') {
            setShotFired(false);
            setGamePhase('turn-1');
        }

        if (gamePhase === 'turn-1') {
            setGamePhase('waiting-for-player-A');
        }
    }

    const randomTurn = () => {
        let choice = Math.floor(Math.random() * 2);
        return choice;
    }

    const setAdjacentTiles = (player) => {
        let tiles = player.shipsGrid;

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

        setAdjacent(adjacent);
    }

    const setShipsGrid = (player, setState, shipsGrid) => {
        player.shipsGrid = shipsGrid;
        setState(player);
    }

    const removeShip = (player, setState, shipType) => {
        player.ships.filter((ship) => {
            return ship.shipType !== shipType;
        })

        setState(player);
    }

    const canDrop = (tileId, firstElementId, lastElementId, orientation) => {
        if (tilesNotAllowed.includes(tileId)) {
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

    // Game loop

    const shoot = (e, player, enemy, setPlayer, setEnemy) => {

        if (shotFired === true) {
            sound.playBlocked();
            return;
        }

        if (e.target.classList[1] !== 'null') {
            sound.playBlocked();
            return;
        }

        sound.playPick();

        let clickedTile = e.target;

        // Miss
        if (enemy.shipsGrid[clickedTile.id].shipType === '') {

            player.battleGrid[clickedTile.id].state = 'miss';
            setPlayer(player);
            setShotFired(true);
            return;

        }

        // Hit
        if (enemy.shipsGrid[clickedTile.id].shipType !== '') {

            player.battleGrid[clickedTile.id].state = 'hit';
            setShotFired(true);

            enemy.ships.filter((ship) => {
                if (ship.shipType === enemy.shipsGrid[clickedTile.id].shipType) {
                    ship.hits[enemy.shipsGrid[clickedTile.id].shipElementId] = true;
                }
            })

            setPlayer(player);
            setEnemy(enemy);

            // Sink
            if (checkIfSunk(enemy, enemy.shipsGrid[clickedTile.id].shipType) === true) {

                let coordinates;

                enemy.ships.forEach((ship) => {
                    if (ship.shipType === enemy.shipsGrid[clickedTile.id].shipType) {
                        coordinates = ship.coordinates;
                        player.score = player.score + ship.shipLength;
                        if (player.score === 17) {
                            setGamePhase('game-over');
                        }
                    }
                })

                player.battleGrid.forEach((tile) => {
                    if (coordinates.includes(tile.id)) {
                        tile.state = 'sink'
                    }
                })
            }

            setPlayer(player);
            setEnemy(enemy);

            return;

        }
    }

    const checkIfSunk = (player, shipType) => {
        let isSunk = true;

        player.ships.filter((ship) => {
            if (ship.shipType === shipType) {
                ship.hits.filter((hit) => {
                    if (hit === false) {
                        isSunk = false;
                    }
                })
            }
        })

        return isSunk;
    }

    const delay = (time) => {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    const computerShot = async () => {

        let clickedTileId;

        while (1) {
            clickedTileId = Math.floor(Math.random() * 100);

            if (computer.battleGrid[clickedTileId].state === null && adjacent.includes(clickedTileId) === false) {
                break;
            }
        }

        console.log(`Computer shoots: [${clickedTileId}] State: ${playerA.shipsGrid[clickedTileId].state}`);

        await delay(1000);
        sound.playPick();

        // Miss
        if (playerA.shipsGrid[clickedTileId].shipType === '') { // miss

            computer.battleGrid[clickedTileId].state = 'miss'

            setShotFired(false);
            setComputer(computer);
            setPlayerA(playerA);
            setGamePhase('turn-0');

            return;
        }

        // Hit
        if (playerA.shipsGrid[clickedTileId].shipType !== '') { // miss

            computer.battleGrid[clickedTileId].state = 'hit'

            playerA.ships.filter((ship) => {
                if (ship.shipType === playerA.shipsGrid[clickedTileId].shipType) {
                    ship.hits[playerA.shipsGrid[clickedTileId].shipElementId] = true;
                }
            })

            // setShotFired(false);
            setComputer(computer);
            setPlayerA(playerA);
            setGamePhase('turn-0');


            // Sink
            if (checkIfSunk(playerA, playerA.shipsGrid[clickedTileId].shipType) === true) {

                let coordinates;

                playerA.ships.forEach((ship) => {
                    if (ship.shipType === playerA.shipsGrid[clickedTileId].shipType) {
                        coordinates = ship.coordinates;
                        computer.score = computer.score + ship.shipLength;
                        if (computer.score === 17) {
                            setGamePhase('game-over');
                        }
                    }
                })

                computer.battleGrid.forEach((tile) => {
                    if (coordinates.includes(tile.id)) {
                        tile.state = 'sink'
                    }
                })
            }

            // setShotFired(false);
            setComputer(computer);
            setPlayerA(playerA);
            setGamePhase('turn-0');
            return;
        }

    }

    // Game phases

    if (gamePhase === 'game-mode-choice') {
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
                <div className="panel-left">
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
                        playerReady={readyPlayerA}
                        randomShipPlacement={randomShipPlacement}
                        allowRandom={allowRandom}
                        setAllowRandom={setAllowRandom} />
                </div>
                <Grid
                    type={"placement"}
                    player={playerA}
                    setState={setPlayerA}
                    tiles={playerA.shipsGrid}
                    tilesNotAllowed={tilesNotAllowed}
                    adjacentTiles={adjacent}
                    canDrop={canDrop}
                    orientation={orientation}
                    removeShip={removeShip}
                    setShipsGrid={setShipsGrid}
                    setAdjacentTiles={setAdjacentTiles}
                    setTilesNotAllowedEmpty={setTilesNotAllowedEmpty}
                    toggleAdjacentVisibility={toggleAdjacentVisibility}
                    setCoordinates={setCoordinates}
                    adjecentVisibility={displayAdjacent}
                    setAllowRandom={setAllowRandom} />
            </div>

        );
    }

    if (gamePhase === 'placement-player-B') {
        return (
            <div className='game-container'>
                <div className="panel-left">
                    <Grid
                        type={"placement"}
                        player={playerB}
                        setState={setPlayerB}
                        tiles={playerB.shipsGrid}
                        tilesNotAllowed={tilesNotAllowed}
                        adjacentTiles={adjacent}
                        canDrop={canDrop}
                        orientation={orientation}
                        removeShip={removeShip}
                        setShipsGrid={setShipsGrid}
                        setAdjacentTiles={setAdjacentTiles}
                        setTilesNotAllowedEmpty={setTilesNotAllowedEmpty}
                        toggleAdjacentVisibility={toggleAdjacentVisibility}
                        setCoordinates={setCoordinates}
                        adjecentVisibility={displayAdjacent}
                        allowRandom={allowRandom}
                        setAllowRandom={setAllowRandom} />
                </div>
                <div>
                    <UserSidebar
                        player={playerB}
                        setState={setPlayerB}
                        type={"placement-player-B"}
                        ships={playerB.ships}
                        orientation={orientation}
                        toggleOrientation={toggleOrientation}
                        setNotAllowed={setNotAllowed}
                        resetShips={resetShips}
                        setTilesNotAllowedEmpty={setTilesNotAllowedEmpty}
                        toggleAdjacentVisibility={toggleAdjacentVisibility}
                        playerReady={readyPlayerB}
                        randomShipPlacement={randomShipPlacement}
                        allowRandom={allowRandom}
                        setAllowRandom={setAllowRandom} />
                </div>
            </div>
        );
    }

    if (gamePhase === 'turn-0' && gameMode === 'pvp') {
        return (
            <div className='container'>
                <div className='score-container'>
                    <Score
                        playerA={playerA}
                        playerB={playerB} />
                </div>


                <div className='game-container'>
                    <div className="panel-left">
                        <UserSidebar
                            type="my-turn-A"
                            player={playerA}
                            switchPlayer={readyPlayerA}
                            shotFired={shotFired} />
                        <Grid
                            type="ships-overview-right"
                            shipTiles={playerA.shipsGrid}
                            battleTiles={playerB.battleGrid} />
                    </div>

                    <Grid
                        username={playerA.user.username}
                        player={playerA}
                        setPlayer={setPlayerA}
                        enemy={playerB}
                        setEnemy={setPlayerB}
                        type={"battle"}
                        tiles={playerA.battleGrid}
                        shoot={shoot}
                        shotFired={shotFired} />

                    <div className="panel-right">
                        <UserSidebar
                            type="not-my-turn-B"
                            player={playerB} />
                    </div>
                </div>
            </div>
        )
    }

    if (gamePhase === 'turn-1' && gameMode === 'pvp') {
        return (
            <div className='container'>
                <div className='score-container'>
                    <Score
                        playerA={playerA}
                        playerB={playerB} />
                </div>

                <div className='game-container'>

                    <div>
                        <UserSidebar
                            type="not-my-turn-A"
                            player={playerA} />
                    </div>

                    <Grid
                        username={playerB.user.username}
                        player={playerB}
                        setPlayer={setPlayerB}
                        enemy={playerA}
                        setEnemy={setPlayerA}
                        type={"battle"}
                        tiles={playerB.battleGrid}
                        shoot={shoot}
                        shotFired={shotFired} />

                    <div className="panel-right">
                        <UserSidebar
                            type="my-turn-B"
                            player={playerB}
                            switchPlayer={readyPlayerB}
                            shotFired={shotFired} />
                        <Grid
                            type="ships-overview-left"
                            shipTiles={playerB.shipsGrid}
                            battleTiles={playerA.battleGrid} />
                    </div>
                </div>
            </div>
        )
    }

    if (gamePhase === 'turn-0' && gameMode === 'pvc') {
        return (
            <div className='container'>
                <div className='score-container'>
                    <Score
                        playerA={playerA}
                        playerB={computer} />
                </div>

                <div className='game-container'>
                    <div className="panel-left">
                        <UserSidebar
                            type="my-turn-A"
                            player={playerA}
                            switchPlayer={readyPlayerA}
                            shotFired={shotFired} />
                        <Grid
                            type="ships-overview-right"
                            shipTiles={playerA.shipsGrid}
                            battleTiles={computer.battleGrid} />
                    </div>

                    <Grid
                        username={playerA.user.username}
                        player={playerA}
                        setPlayer={setPlayerA}
                        enemy={computer}
                        setEnemy={setComputer}
                        type={"battle"}
                        tiles={playerA.battleGrid}
                        shoot={shoot}
                        shotFired={shotFired} />

                    <div className="panel-right">
                        <UserSidebar
                            type="not-my-turn-B"
                            player={computer} />
                    </div>
                </div>
            </div>
        )

    }

    if (gamePhase === 'turn-1' && gameMode === 'pvc') {
        return (
            <div className='container'>
                <div className='score-container'>
                    <Score
                        playerA={playerA}
                        playerB={computer} />
                </div>

                <div className='game-container'>
                    <div className="panel-left">
                        <UserSidebar
                            type="not-my-turn-A"
                            player={playerA}
                            switchPlayer={readyPlayerA}
                            shotFired={shotFired} />
                        <Grid
                            type="ships-overview-right"
                            shipTiles={playerA.shipsGrid}
                            battleTiles={computer.battleGrid} />
                    </div>

                    <Grid
                        username={playerA.user.username}
                        player={playerA}
                        setPlayer={setPlayerA}
                        enemy={computer}
                        setEnemy={setComputer}
                        type={"battle"}
                        tiles={playerA.battleGrid}
                        shoot={shoot}
                        shotFired={true} />

                    <div className="panel-right">
                        <UserSidebar
                            type="computer-turn"
                            player={computer}
                            computerShot={computerShot} />
                    </div>
                </div>
            </div>
        )
    }

    if (gamePhase === 'waiting-for-player-B') {
        return (
            <WaitingForUserOVerlay
                overlayVisible={toggleOverlay}
                username={playerB.user.username}
                ready={readyPlayerB} />
        )

    }

    if (gamePhase === 'waiting-for-player-A') {
        return (
            <WaitingForUserOVerlay
                overlayVisible={toggleOverlay}
                username={playerA.user.username}
                ready={readyPlayerA} />
        )
    }

    if (gamePhase === 'game-over') {
        return (
            <GameOver playerA={playerA} playerB={playerB} />
        );
    }


    return (
        <div className="upper-layer">
            Game
        </div>
    )
}
