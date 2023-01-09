import React, { Component } from 'react'
import EnterName from './EnterName';
import './GameClass.css'
import GameModeChoice from './GameModeChoice';
import Grid from './Grid';
import Score from './Score';
import UserSidebar from './UserSidebar';
import PlayerTypeChoice from './PlayerTypeChoice';
import PlayersList from './PlayersList';

class User {
    constructor(username, ships, battleGrid, shipsGrid, score) {
        this.username = username;
        this.ships = ships;
        this.battleGrid = battleGrid;
        this.shipsGrid = shipsGrid;
        this.score = score
    }
}

class Ship {
    constructor(key, shipType, shipLength, hits, coordinates) {
        this.key = key;
        this.shipType = shipType;
        this.shipLength = shipLength;
        this.hits = hits;
        this.coordinates = coordinates;
    }
}

class Tile {
    constructor(key, id, shipType, shipElementId, user, state) {
        this.key = key;
        this.id = id;
        this.shipType = shipType;
        this.shipElementId = shipElementId;
        this.user = user;
        this.state = state;
    }
}

let gridWidth = 10;
let usernameA = "user_A";
let usernameB = "computer";

export default class Game extends Component {

    constructor() {
        super();

        this.state = {
            gameMode: '',
            gamePhase: 'game-mode-choice',
            orientation: 'horizontal',
            users: [new User(
                usernameA,
                this.generateShips(usernameA),
                this.generateTiles(usernameA, "battle_grid"),
                this.generateTiles(usernameA, "ships_grid"),
                0),
            new User(
                usernameB,
                this.generateShips(usernameB),
                this.generateTiles(usernameB, "battle_grid"),
                this.generateTiles(usernameB, "ships_grid"),
                0)],
            tilesNotAllowed: [],
            displayAdjacent: false,
            adjacent: [],
            shotFired: false,
            cursorDisabled: false
        }

        // Choose game mode phase
        this.setGameMode = this.setGameMode.bind(this);
        this.setGamePhase = this.setGamePhase.bind(this);

        // Enter enemy username phase
        this.setUserB = this.setUserB.bind(this);
        this.setUserA = this.setUserA.bind(this);

        // Ships placement phase
        this.canDrop = this.canDrop.bind(this);
        this.removeShip = this.removeShip.bind(this);
        this.resetShips = this.resetShips.bind(this);
        this.readyPlayerA = this.readyPlayerA.bind(this);
        this.readyPlayerB = this.readyPlayerB.bind(this);
        this.setShipsGrid = this.setShipsGrid.bind(this);
        this.setCoordinates = this.setCoordinates.bind(this);
        this.setAdjacentTiles = this.setAdjacentTiles.bind(this);
        this.toggleOrientation = this.toggleOrientation.bind(this);
        this.setTilesNotAllowed = this.setTilesNotAllowed.bind(this);
        this.setTilesNotAllowedEmpty = this.setTilesNotAllowedEmpty.bind(this);
        this.toggleAdjacentVisibility = this.toggleAdjacentVisibility.bind(this);
        this.randomShipPlacement = this.randomShipPlacement.bind(this);


        // Shooting phase
        this.switchPlayer = this.switchPlayer.bind(this);
        this.shoot = this.shoot.bind(this);
    }

    // // Game mode
    // setGameMode(mode) {

    //     if (mode === 'pvc') {
    //         this.setState((prevState) => ({
    //             gameMode: mode,
    //             gamePhase: 'placement-user_A',
    //             adjacent: [],
    //             notAllowed: []
    //         }))

    //         return
    //     }

    //     this.setState((prevState) => ({
    //         gameMode: mode,
    //         gamePhase: 'player-type-choice'
    //     }))
    // }

    // // Users
    // setUserA(user) {
    //     let newUsers = this.state.users;

    //     newUsers[0].username = user.username;
    //     newUsers[0].ships = this.generateShips(user.username);
    //     newUsers[0].battleGrid = this.generateTiles(user.username, "battle_grid");
    //     newUsers[0].shipsGrid = this.generateTiles(user.username, "ships_grid");

    //     this.setState((prevState) => ({
    //         users: newUsers,
    //         gamePhase: 'placement-user_A'
    //     }))

    // }

    // setUserB(user) {
    //     let newUsers = this.state.users;

    //     newUsers[1].username = user.username;
    //     newUsers[1].ships = this.generateShips(user.username);
    //     newUsers[1].battleGrid = this.generateTiles(user.username, "battle_grid");
    //     newUsers[1].shipsGrid = this.generateTiles(user.username, "ships_grid");

    //     this.setState((prevState) => ({
    //         users: newUsers,
    //         gamePhase: 'placement-user_A'
    //     }))

    // }

    // generateShips(username) {
    //     let newShips = [];

    //     newShips.push(new Ship(username + '-destroyer', 'destroyer', 2, [false, false], []));
    //     newShips.push(new Ship(username + '-submarine', 'submarine', 3, [false, false, false], []));
    //     newShips.push(new Ship(username + '-cruiser', 'cruiser', 3, [false, false, false], []));
    //     newShips.push(new Ship(username + '-battleship', 'battleship', 4, [false, false, false, false], []));
    //     newShips.push(new Ship(username + '-carrier', 'carrier', 5, [false, false, false, false, false], []));

    //     return newShips
    // }


    // generateTiles(username, gridType) {
    //     let grid = [];

    //     for (let i = 0; i < gridWidth * gridWidth; i++) {
    //         grid.push(new Tile(`${username}-${gridType}-${i}`, i, '', null, '', null));
    //     }

    //     return grid;
    // }

    // setBattleGrid(tilesArray, username) {
    //     let newUsers = this.state.users.filter((user) => {
    //         if (user.username === username) {
    //             user.battleGrid = tilesArray
    //         }
    //         return user;
    //     })

    //     this.setState((prevState) => ({
    //         users: newUsers
    //     }));
    // }

    // setShipsGrid(tilesArray, username) {
    //     let newUsers = this.state.users.filter((user) => {
    //         if (user.username === username) {
    //             user.shipsGrid = tilesArray
    //         }
    //         return user;
    //     })

    //     this.setState((prevState) => ({
    //         users: newUsers
    //     }));
    // }

    // -------------------------------- //

    // Ship placement
    // setCoordinates(shipOwner, shipType, coordinates) {
    //     let newUsers = this.state.users;

    //     newUsers.filter((user) => {
    //         if (user.username === shipOwner) {
    //             user.ships.filter((ship) => {
    //                 if (ship.shipType === shipType) {
    //                     ship.coordinates = coordinates;
    //                 }
    //                 return null;
    //             })

    //             return null;
    //         }

    //         return null;
    //     })

    //     this.setState((prevState) => ({
    //         users: newUsers
    //     }))
    // }

    toggleOrientation() {
        if (this.state.orientation === 'horizontal') {
            this.setState(prevState => ({
                orientation: 'vertical'
            }))
        } else {
            this.setState(prevState => ({
                orientation: 'horizontal'
            }))
        }

    }

    removeShip(username, shipType) {

        let newUsers = this.state.users.filter((user) => {
            if (user.username === username) {
                user.ships = user.ships.filter((ship) => {
                    return ship.shipType !== shipType;
                })
            }
            return user;
        })

        this.setState((prevState) => ({
            users: newUsers
        }));

    }

    setTilesNotAllowedEmpty() {
        this.setState(prevState => ({
            tilesNotAllowed: []
        }))
    }

    setAdjacentTiles(shipOwner) {

        let tiles = this.state.users.filter(user => {
            return user.username === shipOwner
        })[0].shipsGrid

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

        this.setState((prevState) => ({
            adjacent: adjacent
        }))
    }

    toggleAdjacentVisibility(visibility) {

        this.setState((prevState) => ({
            displayAdjacent: visibility
        }))

    }

    // getTilesNotAllowed(shipLength, draggedShipElementId, orientation) {
    //     let rightEdge = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99];
    //     let leftEdge = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
    //     let topEdge = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    //     let bottomEdge = [90, 91, 99, 92, 93, 94, 95, 96, 97, 98, 99];

    //     let tilesLeft, tilesRight, tilesTop, tilesBottom, notAllowed;

    //     if (orientation === 'horizontal') {
    //         tilesRight = shipLength - draggedShipElementId - 1;
    //         tilesLeft = parseInt(draggedShipElementId);

    //         rightEdge.forEach(edgeElement => {
    //             for (let i = 0; i < tilesRight; i++) {
    //                 if (!rightEdge.includes(edgeElement - i)) {
    //                     rightEdge.push(edgeElement - i);
    //                 }
    //             }
    //         });

    //         leftEdge.forEach(edgeElement => {
    //             for (let i = 0; i < tilesLeft; i++) {
    //                 if (!leftEdge.includes(edgeElement + i)) {
    //                     leftEdge.push(edgeElement + i);
    //                 }
    //             }
    //         })

    //         if (tilesRight === 0) { rightEdge = [] }
    //         if (tilesLeft === 0) { leftEdge = [] }

    //         notAllowed = rightEdge.concat(leftEdge);

    //         return notAllowed;

    //     } else {
    //         tilesTop = parseInt(draggedShipElementId);
    //         tilesBottom = shipLength - draggedShipElementId - 1;

    //         topEdge.forEach(edgeElement => {
    //             for (let i = 0; i < tilesTop; i++) {
    //                 if (!topEdge.includes(edgeElement + i * 10)) {
    //                     topEdge.push(edgeElement + i * 10);
    //                 }
    //             }
    //         });

    //         bottomEdge.forEach(edgeElement => {
    //             for (let i = 0; i < tilesBottom; i++) {
    //                 if (!bottomEdge.includes(edgeElement - i * 10)) {
    //                     bottomEdge.push(edgeElement - i * 10);
    //                 }
    //             }
    //         })


    //         if (tilesTop === 0) { topEdge = [] }
    //         if (tilesBottom === 0) { bottomEdge = [] }

    //         notAllowed = topEdge.concat(bottomEdge);

    //         return notAllowed;
    //     }
    // }

    // getAdjacentTiles(shipsGrid) {
    //     let tiles = shipsGrid;

    //     let rightEdge = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99];
    //     let leftEdge = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];

    //     let adjacent = [];

    //     tiles.forEach((tile) => {
    //         if (tile.shipType === '') { return; }

    //         if (rightEdge.includes(tile.id)) {
    //             adjacent.push(tile.id, tile.id - 1, tile.id - 10, tile.id + 10, tile.id - 11, tile.id + 9);
    //             return;
    //         }

    //         if (leftEdge.includes(tile.id)) {
    //             adjacent.push(tile.id, tile.id + 1, tile.id + 11, tile.id - 9, tile.id - 10, tile.id + 10);
    //             return;
    //         }

    //         adjacent.push(tile.id, tile.id - 1, tile.id + 1, tile.id + 11, tile.id - 9, tile.id - 10, tile.id + 10, tile.id - 11, tile.id + 9);

    //     });

    //     return adjacent;
    // }

    // canPlaceRandomShip(tileId, firstElementId, lastElementId, orientation, adjacent, notAllowed) {
    //     if (notAllowed.includes(tileId)) {
    //         return false;
    //     }

    //     if (orientation === 'horizontal') {
    //         for (let i = firstElementId; i <= lastElementId; i++) {
    //             if (adjacent.includes(i)) { return false }
    //         }
    //     } else {
    //         for (let i = firstElementId; i <= lastElementId; i = i + 10) {
    //             if (adjacent.includes(i)) { return false }
    //         }
    //     }

    //     return true;
    // }

    // setTilesNotAllowed(shipLength, draggedShipElementId, orientation) {

    //     let rightEdge = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99];
    //     let leftEdge = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
    //     let topEdge = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    //     let bottomEdge = [90, 91, 99, 92, 93, 94, 95, 96, 97, 98, 99];

    //     let tilesLeft, tilesRight, tilesTop, tilesBottom, notAllowed;

    //     if (orientation === 'horizontal') {
    //         tilesRight = shipLength - draggedShipElementId - 1;
    //         tilesLeft = parseInt(draggedShipElementId);

    //         rightEdge.forEach(edgeElement => {
    //             for (let i = 0; i < tilesRight; i++) {
    //                 if (!rightEdge.includes(edgeElement - i)) {
    //                     rightEdge.push(edgeElement - i);
    //                 }
    //             }
    //         });

    //         leftEdge.forEach(edgeElement => {
    //             for (let i = 0; i < tilesLeft; i++) {
    //                 if (!leftEdge.includes(edgeElement + i)) {
    //                     leftEdge.push(edgeElement + i);
    //                 }
    //             }
    //         })

    //         if (tilesRight === 0) { rightEdge = [] }
    //         if (tilesLeft === 0) { leftEdge = [] }

    //         notAllowed = rightEdge.concat(leftEdge);


    //         this.setState(prevState => ({
    //             tilesNotAllowed: notAllowed
    //         }))

    //     } else {
    //         tilesTop = parseInt(draggedShipElementId);
    //         tilesBottom = shipLength - draggedShipElementId - 1;

    //         topEdge.forEach(edgeElement => {
    //             for (let i = 0; i < tilesTop; i++) {
    //                 if (!topEdge.includes(edgeElement + i * 10)) {
    //                     topEdge.push(edgeElement + i * 10);
    //                 }
    //             }
    //         });

    //         bottomEdge.forEach(edgeElement => {
    //             for (let i = 0; i < tilesBottom; i++) {
    //                 if (!bottomEdge.includes(edgeElement - i * 10)) {
    //                     bottomEdge.push(edgeElement - i * 10);
    //                 }
    //             }
    //         })


    //         if (tilesTop === 0) { topEdge = [] }
    //         if (tilesBottom === 0) { bottomEdge = [] }

    //         notAllowed = topEdge.concat(bottomEdge);

    //         this.setState(prevState => ({
    //             tilesNotAllowed: notAllowed
    //         }))

    //     }

    // }

    canDrop(tileId, firstElementId, lastElementId, orientation) {

        if (this.state.tilesNotAllowed.includes(tileId)) {
            return false;
        }

        if (orientation === 'horizontal') {
            for (let i = firstElementId; i <= lastElementId; i++) {
                if (this.state.adjacent.includes(i)) { return false }
            }
        } else {
            for (let i = firstElementId; i <= lastElementId; i = i + 10) {
                if (this.state.adjacent.includes(i)) { return false }
            }
        }

        return true;
    }

    // resetShips(username) {
    //     let users = this.state.users.filter(user => {
    //         if (user.username === username) {
    //             user.ships = this.generateShips(user.username);
    //             user.shipsGrid = this.generateTiles(usernameA, "ships_grid");
    //         }
    //         return user;
    //     })

    //     this.setState((prevState) => ({
    //         users: users,
    //         tilesNotAllowed: [],
    //         displayAdjacent: false,
    //         adjacent: []
    //     }));

    // }

    readyPlayerA() {

        if (this.state.gameMode === 'pvc') {

            this.setState((prevState) => ({
                gamePhase: `turn-0`,
                shotFired: false,
                adjacent: []
            }));
            return;
        }

        this.setState((prevState) => ({
            gamePhase: 'placement-user_B',
            tilesNotAllowed: [],
            displayAdjacent: false,
            adjacent: []
        }));
    }

    readyPlayerB() {
        this.setState((prevState) => ({
            gamePhase: `turn-${this.randomTurn()}`,
            tilesNotAllowed: [],
            displayAdjacent: false,
            adjacent: []
        }));
        console.log(this.state.users)
    }

    randomTurn() {
        let choice = Math.floor(Math.random() * 2);
        return choice;
    }

    switchPlayer() {

        if (this.state.shotFired === false) {
            return;
        }

        if (this.state.gameMode === 'pvc') {

            this.computerShot();

            this.setState((prevState) => ({
                gamePhase: `turn-0`,
                shotFired: false
            }));
            return;
        }

        if (this.state.gamePhase === 'turn-0') {
            this.setState((prevState) => ({
                gamePhase: `turn-1`,
                shotFired: false
            }));

        } else {
            this.setState((prevState) => ({
                gamePhase: `turn-0`,
                shotFired: false
            }));
        }
    }

    computerShot() {
        console.log(this.state.adjacent)
        let battleGrid = this.state.users[1].battleGrid;
        let enemyShipsGrid = this.state.users[0].shipsGrid;

        let newUsersArray = this.state.users;
        let username = 'computer';

        let clickedTileId;

        let adjacent = this.state.adjacent;

        while (1) {
            clickedTileId = Math.floor(Math.random() * 100);

            if (battleGrid[clickedTileId].state === null && this.state.adjacent.includes(clickedTileId) === false) {
                break;
            }
        }

        console.log(`Computer shoots: [${clickedTileId}] State: ${enemyShipsGrid[clickedTileId].state}`)

        if (enemyShipsGrid[clickedTileId].shipType === '') { // miss

            battleGrid[clickedTileId].state = 'miss'

            newUsersArray[1].battleGrid = battleGrid;

            this.setState((prevState) => ({
                users: newUsersArray,
                shotFired: true
            }));

            console.log(this.state.users)

            return;
        }

        if (enemyShipsGrid[clickedTileId].shipType !== '') { // hit

            battleGrid[clickedTileId].state = 'hit'

            newUsersArray[1].battleGrid = battleGrid;

            newUsersArray[0].ships.filter((ship) => {
                if (ship.shipType === enemyShipsGrid[clickedTileId].shipType) {
                    ship.hits[enemyShipsGrid[clickedTileId].shipElementId] = true;
                }
                return null;
            });

            this.setState((prevState) => ({
                users: newUsersArray,
                shotFired: true
            }));

            if (this.checkIfSunk(enemyShipsGrid[clickedTileId].shipType, this.state.users[0].username) === true) { // sink

                let coordinates;
                this.state.users[0].ships.forEach((ship) => {
                    if (ship.shipType === this.state.users[0].shipsGrid[clickedTileId].shipType) {
                        coordinates = ship.coordinates;

                        this.setScore(username, ship.shipLength)
                    }
                })

                coordinates.forEach((coordinate) => {
                    adjacent.push(
                        coordinate - 11, coordinate - 10, coordinate - 9,
                        coordinate - 1, coordinate, coordinate + 1,
                        coordinate + 9, coordinate + 10, coordinate + 11)
                })

                newUsersArray[1].battleGrid.forEach((tile) => {
                    if (coordinates.includes(tile.id)) {
                        tile.state = 'sink'
                    }
                })
            }

            this.setState((prevState) => ({
                users: newUsersArray,
                shotFired: true,
                adjacent: adjacent
            }));

            return;
        }

    }

    shoot(e) {

        if (e.target.classList[1] !== 'null') {
            return;
        }

        if (this.state.shotFired === true) {
            this.setState((prevState) => ({
                shotFired: true
            }));
            return;
        }

        let battleGrid, enemyShipsGrid;
        let clickedTile = e.target;
        let newUsersArray = this.state.users;
        clickedTile.classList.add("clicked");
        let username = '';
        let enemyUsername = '';

        if (this.state.gamePhase === 'turn-0') {
            username = this.state.users[0].username;
            battleGrid = this.state.users[0].battleGrid;
            enemyShipsGrid = this.state.users[1].shipsGrid;
            enemyUsername = this.state.users[1].username;
        } else {
            username = this.state.users[1].username;
            battleGrid = this.state.users[1].battleGrid;
            enemyShipsGrid = this.state.users[0].shipsGrid;
            enemyUsername = this.state.users[0].username;
        }

        if (enemyShipsGrid[clickedTile.id].shipType === '') { // miss

            battleGrid[clickedTile.id].state = 'miss'

            if (this.state.gamePhase === 'turn-0') {
                newUsersArray[0].battleGrid = battleGrid;
            } else {
                newUsersArray[1].battleGrid = battleGrid;
            }

            this.setState((prevState) => ({
                users: newUsersArray,
                shotFired: true
            }));

            return;
        }

        if (enemyShipsGrid[clickedTile.id].shipType !== '') { // hit

            battleGrid[clickedTile.id].state = 'hit'

            if (this.state.gamePhase === 'turn-0') {

                newUsersArray[0].battleGrid = battleGrid;

                newUsersArray[1].ships.filter((ship) => {
                    if (ship.shipType === enemyShipsGrid[clickedTile.id].shipType) {
                        ship.hits[enemyShipsGrid[clickedTile.id].shipElementId] = true;
                    }
                    return null;
                });

            } else {

                newUsersArray[1].battleGrid = battleGrid;

                newUsersArray[0].ships.filter((ship) => {
                    if (ship.shipType === enemyShipsGrid[clickedTile.id].shipType) {
                        ship.hits[enemyShipsGrid[clickedTile.id].shipElementId] = true;
                    }
                    return null;
                });

            }

            this.setState((prevState) => ({
                users: newUsersArray,
                shotFired: true
            }));

            if (this.checkIfSunk(enemyShipsGrid[clickedTile.id].shipType, enemyUsername) === true) { // sink

                let coordinates;

                if (this.state.gamePhase === 'turn-0') {

                    this.state.users[1].ships.forEach((ship) => {
                        if (ship.shipType === this.state.users[1].shipsGrid[clickedTile.id].shipType) {
                            coordinates = ship.coordinates;

                            this.setScore(username, ship.shipLength)
                        }
                    })

                    newUsersArray[0].battleGrid.forEach((tile) => {
                        if (coordinates.includes(tile.id)) {
                            tile.state = 'sink'
                        }
                    })

                } else {
                    this.state.users[0].ships.forEach((ship) => {
                        if (ship.shipType === this.state.users[0].shipsGrid[clickedTile.id].shipType) {
                            coordinates = ship.coordinates;

                            this.setScore(username, ship.shipLength)
                        }
                    })

                    newUsersArray[1].battleGrid.forEach((tile) => {
                        if (coordinates.includes(tile.id)) {
                            tile.state = 'sink'
                        }
                    })

                }
            }

            this.setState((prevState) => ({
                users: newUsersArray,
                shotFired: true
            }));

            return;
        }

    }

    setShipCoordinates(coordinates, username, shipType) {

        let newUsers = this.state.users;

        this.newUsers.filter((user) => {
            if (user.username === username) {
                user.ships = user.ships.filter((ship) => {
                    if (ship.shipType === shipType) {
                        ship.coordinates = coordinates;
                    }

                    return (ship);
                })
            }
            return (user);
        })

        this.setState((prevState) => ({
            users: newUsers
        }))
    }

    checkIfSunk(shipType, username) {

        console.log(username)

        let shipsArray;
        let isSunk = true;


        this.state.users.filter((user) => {
            if (user.username === username) {
                console.log(this.state.users)
                shipsArray = user.ships;
            }
            return user;
        })

        shipsArray.filter((ship) => {
            if (ship.shipType !== shipType) {
                return null;
            }

            ship.hits.filter((hit) => {
                if (hit === false) {
                    isSunk = false;
                }

                return null;
            })

            return null;
        })

        return isSunk;
    }

    // randomShipPlacement(username) {
    //     let newUsers = this.state.users;
    //     let adjacent = [];
    //     let notAllowed = [];

    //     newUsers.filter((user) => {
    //         let shipsGrid = user.shipsGrid;
    //         if (user.username === username) {
    //             user.ships.forEach((ship) => {

    //                 while (1) {
    //                     let orientationNumber = Math.floor(Math.random() * 2);
    //                     let orientation = ''
    //                     let randomTile = Math.floor(Math.random() * 100);
    //                     let lastTile;
    //                     let coordinates = [];


    //                     // eslint-disable-next-line default-case
    //                     switch (orientationNumber) {
    //                         case 0:
    //                             orientation = 'horizontal'
    //                             lastTile = randomTile + ship.shipLength;
    //                             for (let i = randomTile; i < lastTile; i++) {
    //                                 coordinates.push(i);
    //                             }
    //                             break;
    //                         case 1:
    //                             orientation = 'vertical'
    //                             lastTile = randomTile + ship.shipLength * 10;
    //                             for (let i = randomTile; i < lastTile; i = i + 10) {
    //                                 coordinates.push(i);
    //                             }
    //                             break;
    //                     }

    //                     notAllowed = this.getTilesNotAllowed(ship.shipLength, 0, orientation);
    //                     adjacent = this.getAdjacentTiles(shipsGrid);

    //                     if (this.canPlaceRandomShip(randomTile, randomTile, lastTile, orientation, adjacent, notAllowed) === true) {
    //                         this.setCoordinates(username, ship.shipType, coordinates);

    //                         let counter = 0;
    //                         coordinates.forEach((coordinate) => {
    //                             shipsGrid[coordinate].shipType = ship.shipType;
    //                             shipsGrid[coordinate].shipElementId = counter;
    //                             counter++;
    //                         })
    //                         break;
    //                     }
    //                 }
    //             })

    //             user.shipsGrid = shipsGrid

    //         }
    //         return user;
    //     })

    //     this.setState((prevState) => ({
    //         users: newUsers,
    //         adjacent: adjacent,
    //         tilesNotAllowed: notAllowed
    //     }))

    //     console.log(this.state.users)
    // }

    setScore(username, points) {

        let newUsers = this.state.users;

        newUsers.filter((user) => {
            if (user.username === username) {
                user.score = user.score + points
            }

            return user;
        })

        this.setState((prevState) => ({
            users: newUsers
        }))

        console.log(this.state.users)
    }

    // setGamePhase(phase) {
    //     this.setState((prevState) => ({
    //         gamePhase: phase
    //     }))
    // }

    render() {

        this.randomTurn();

        //  jeśli PvC
        //      - rozmieszczenie statków gracza
        //      - losu losu kto zaczyna
        //      - ruch P
        //      - ruch C
        //  jeśli PvP
        //      - rozmieszczenie statków gracza_A
        //      - rozmieszczenie statków gracza_B
        //      - losu losu kto zaczyna
        //      - ruch A
        //      - ruch B


        if (this.state.users[0].score === 17) {
            return (
                <div>Koniec gry! Wygrywa {this.state.users[0].username}</div>
            );
        }


        if (this.state.users[1].score === 17) {
            return (
                <div>Koniec gry! Wygrywa {this.state.users[1].username}</div>
            );
        }


        if (this.state.gamePhase === 'game-over') {

        }

        // if (this.state.gamePhase === 'game-mode-choice') {
        //     return (
        //         <GameModeChoice
        //             setUser={this.setUserA}
        //             setGameMode={this.setGameMode}
        //             randomShipPlacement={this.randomShipPlacement} />
        //     );
        // }

        // if (this.state.gamePhase === 'player-type-choice') {
        //     return (
        //         <PlayerTypeChoice
        //             setGamePhase={this.setGamePhase} />
        //     );
        // }

        // if (this.state.gamePhase === 'players-list') {
        //     return (
        //         <PlayersList
        //             setGamePhase={this.setGamePhase}
        //             setUser={this.setUserB} />
        //     );
        // }

        // if (this.state.gamePhase === 'enter-name-player-B') {
        //     return (
        //         <EnterName
        //             setUser={this.setUserB} />
        //     );
        // }

        if (this.state.gamePhase === 'placement-user_A') {
            return (
                <div className='game-container'>

                    <div>
                        <UserSidebar
                            type={"placement_user_A"}
                            username={this.state.users[0].username}
                            ships={this.state.users[0].ships}
                            orientation={this.state.orientation}
                            toggleOrientation={this.toggleOrientation}
                            setTilesNotAllowed={this.setTilesNotAllowed}
                            resetShips={this.resetShips}
                            setTilesNotAllowedEmpty={this.setTilesNotAllowedEmpty}
                            toggleAdjacentVisibility={this.toggleAdjacentVisibility}
                            readyPlayerA={this.readyPlayerA}
                            randomShipPlacement={this.randomShipPlacement} />
                    </div>

                    <Grid
                        type={"placement"}
                        tiles={this.state.users[0].shipsGrid}
                        tilesNotAllowed={this.state.tilesNotAllowed}
                        adjacentTiles={this.state.adjacent}
                        canDrop={this.canDrop}
                        orientation={this.state.orientation}
                        removeShip={this.removeShip}
                        setShipsGrid={this.setShipsGrid}
                        setAdjacentTiles={this.setAdjacentTiles}
                        setTilesNotAllowedEmpty={this.setTilesNotAllowedEmpty}
                        toggleAdjacentVisibility={this.toggleAdjacentVisibility}
                        setCoordinates={this.setCoordinates}
                        adjecentVisibility={this.state.displayAdjacent} />

                </div>
            )
        }

        if (this.state.gamePhase === 'placement-user_B') {
            if (this.gameMode === 'pvc') {
                return (
                    <Grid
                        type="ships-overview"
                        shipTiles={this.state.users[1].shipsGrid}
                        battleTiles={this.state.users[0].battleGrid} />
                );
            }

            return (
                <div className='game-container'>

                    <Grid
                        type={"placement"}
                        tiles={this.state.users[1].shipsGrid}
                        tilesNotAllowed={this.state.tilesNotAllowed}
                        adjacentTiles={this.state.adjacent}
                        canDrop={this.canDrop}
                        orientation={this.state.orientation}
                        removeShip={this.removeShip}
                        setShipsGrid={this.setShipsGrid}
                        setAdjacentTiles={this.setAdjacentTiles}
                        setTilesNotAllowedEmpty={this.setTilesNotAllowedEmpty}
                        toggleAdjacentVisibility={this.toggleAdjacentVisibility}
                        setCoordinates={this.setCoordinates}
                        adjecentVisibility={this.state.displayAdjacent} />

                    <div>
                        <UserSidebar
                            type={"placement_user_B"}
                            username={this.state.users[1].username}
                            ships={this.state.users[1].ships}
                            orientation={this.state.orientation}
                            toggleOrientation={this.toggleOrientation}
                            setTilesNotAllowed={this.setTilesNotAllowed}
                            resetShips={this.resetShips}
                            setTilesNotAllowedEmpty={this.setTilesNotAllowedEmpty}
                            toggleAdjacentVisibility={this.toggleAdjacentVisibility}
                            readyPlayerB={this.readyPlayerB}
                            randomShipPlacement={this.randomShipPlacement} />
                    </div>

                </div>
            )
        }

        if (this.state.gamePhase === 'turn-0') {

            return (
                <div className='container'>
                    <Score
                        user_A={this.state.users[0]}
                        user_B={this.state.users[1]} />

                    <div className='game-container'>
                        <div>
                            <UserSidebar
                                type="my-turn"
                                username={this.state.users[0].username}
                                switchPlayer={this.switchPlayer}
                                shotFired={this.state.shotFired} />
                            <Grid
                                type="ships-overview"
                                shipTiles={this.state.users[0].shipsGrid}
                                battleTiles={this.state.users[1].battleGrid} />
                        </div>

                        <Grid
                            username={this.state.users[0].username}
                            type={"battle"}
                            tiles={this.state.users[0].battleGrid}
                            shoot={this.shoot}
                            shotFired={this.state.shotFired} />

                        <div>
                            <UserSidebar
                                type="not-my-turn"
                                username={this.state.users[1].username} />
                        </div>
                    </div>
                </div>

            );

        }

        if (this.state.gamePhase === 'turn-1') {
            return (
                <div className='container'>
                    <Score
                        user_A={this.state.users[0]}
                        user_B={this.state.users[1]} />

                    <div className='game-container'>
                        <div>
                            <UserSidebar
                                type="not-my-turn"
                                username={this.state.users[0].username} />
                        </div>

                        <Grid
                            type={"battle"}
                            tiles={this.state.users[1].battleGrid}
                            shoot={this.shoot}
                            shotFired={this.state.shotFired}
                            username={this.state.users[1].username} />

                        <div>
                            <UserSidebar
                                type="my-turn"
                                username={this.state.users[1].username}
                                switchPlayer={this.switchPlayer}
                                shotFired={this.state.shotFired} />
                            <Grid
                                type="ships-overview"
                                shipTiles={this.state.users[1].shipsGrid}
                                battleTiles={this.state.users[0].battleGrid} />
                        </div>
                    </div>
                </div>

            );

        }
    }
}
