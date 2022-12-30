import React, { Component } from 'react'
import './GameClass.css'
import Grid from './Grid';
import UserSidebar from './UserSidebar';

class User {
    constructor(username, ships, battleGrid, shipGrid) {
        this.username = username;
        this.ships = ships;
        this.battleGrid = battleGrid;
        this.shipsGrid = shipGrid;
    }
}

class Ship {
    constructor(key, shipType, shipLength) {
        this.key = key;
        this.shipType = shipType;
        this.shipLength = shipLength;
    }
}

class Tile {
    constructor(key, id, shipType, shipElementId) {
        this.key = key;
        this.id = id;
        this.shipType = shipType;
        this.shipElementId = shipElementId;
    }
}

let gridWidth = 10;
let usernameA = "user_A";
let usernameB = "user_B";

export default class Game extends Component {

    constructor() {
        super();

        this.state = {
            orientation: 'horizontal',
            users: [new User(
                usernameA,
                this.generateShips(usernameA),
                this.generateTiles(usernameA, "battle_grid"),
                this.generateTiles(usernameA, "ships_grid")),
            new User(
                usernameB,
                this.generateShips(usernameB),
                this.generateTiles(usernameB, "battle_grid"),
                this.generateTiles(usernameB, "ships_grid"))],
            tilesNotAllowed: [],
            displayAdjacent: false,
            adjacent: []
        }

        this.toggleOrientation = this.toggleOrientation.bind(this);
        this.setTilesNotAllowed = this.setTilesNotAllowed.bind(this);
        this.setTilesNotAllowedEmpty = this.setTilesNotAllowedEmpty.bind(this);
        this.canDrop = this.canDrop.bind(this);
        this.removeShip = this.removeShip.bind(this);
        this.setShipsGrid = this.setShipsGrid.bind(this);
        this.resetShips = this.resetShips.bind(this);
        this.setAdjacentTiles = this.setAdjacentTiles.bind(this);
        this.toggleAdjacentVisibility = this.toggleAdjacentVisibility.bind(this);
    }

    generateShips(username) {
        let newShips = [];

        newShips.push(new Ship(username + '-destroyer', 'destroyer', 2));
        newShips.push(new Ship(username + '-submarine', 'submarine', 3));
        newShips.push(new Ship(username + '-cruiser', 'cruiser', 3));
        newShips.push(new Ship(username + '-battleship', 'battleship', 4));
        newShips.push(new Ship(username + '-carrier', 'carrier', 5));

        return newShips
    }

    generateTiles(username, gridType) {
        let grid = [];

        for (let i = 0; i < gridWidth * gridWidth; i++) {
            grid.push(new Tile(`${username}-${gridType}-${i}`, i, '', null));
        }

        return grid;
    }

    toggleOrientation() {
        if (this.state.orientation === 'horizontal') {
            this.setState(prevState => ({
                orientation: 'vertical'
            }))
            console.log(this.state.orientation)
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

    setAdjacentTiles(shipOwner, droppedOnTile) {

        let tiles = this.state.users.filter(user => {
            return user.username === shipOwner
        })[0].shipsGrid

        let rightEdge = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99];
        let leftEdge = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
        let topEdge = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        let bottomEdge = [90, 91, 99, 92, 93, 94, 95, 96, 97, 98, 99];

        let adjacent = [];

        tiles.forEach((tile) => {
            if (tile.shipType === '') { return; }

            console.log(tile.id);

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

    setTilesNotAllowed(shipLength, draggedShipElementId, shipOwner) {

        let rightEdge = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99];
        let leftEdge = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
        let topEdge = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        let bottomEdge = [90, 91, 99, 92, 93, 94, 95, 96, 97, 98, 99];

        let tilesLeft, tilesRight, tilesTop, tilesBottom, notAllowed;

        if (this.state.orientation === 'horizontal') {
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

            this.setState(prevState => ({
                tilesNotAllowed: notAllowed
            }))

            console.log(`
            Ship length: ${shipLength}
            Dragged ship element id: ${draggedShipElementId}
            Tiles on the left: ${tilesLeft}`)
            console.log(notAllowed)

        } else {
            tilesTop = parseInt(draggedShipElementId);
            tilesBottom = shipLength - draggedShipElementId - 1;

            console.log(`Tiles top: ${tilesTop} Tiles bottom: ${tilesBottom}`);

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
            // notAllowed = notAllowed.concat(adjecent);

            this.setState(prevState => ({
                tilesNotAllowed: notAllowed
            }))


        }
    }

    canDrop(tileId, firstElementId, lastElementId) {

        if (this.state.tilesNotAllowed.includes(tileId)) {
            return false;
        }

        if (this.state.orientation === 'horizontal') {
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

    setBattleGrid(tilesArray, username) {
        let newUsers = this.state.users.filter((user) => {
            if (user.username === username) {
                user.battleGrid = tilesArray
            }
            return user;
        })

        this.setState((prevState) => ({
            users: newUsers
        }));
    }

    setShipsGrid(tilesArray, username) {
        let newUsers = this.state.users.filter((user) => {
            if (user.username === username) {
                user.shipsGrid = tilesArray
            }
            return user;
        })

        this.setState((prevState) => ({
            users: newUsers
        }));
    }

    resetShips(username) {
        let users = this.state.users.filter(user => {
            if (user.username === username) {
                user.ships = this.generateShips(user.username);
                user.shipsGrid = this.generateTiles(usernameA, "ships_grid");
            }
            return user;
        })

        this.setState((prevState) => ({
            users: users,
            tilesNotAllowed: [],
            displayAdjacent: false,
            adjacent: []
        }));

    }

    render() {

        return (
            <div className='container'>

                <div>
                    <UserSidebar
                        username={usernameA}
                        ships={this.state.users[0].ships}
                        orientation={this.state.orientation}
                        toggleOrientation={this.toggleOrientation}
                        setTilesNotAllowed={this.setTilesNotAllowed}
                        resetShips={this.resetShips}
                        setTilesNotAllowedEmpty={this.setTilesNotAllowedEmpty}
                        toggleAdjacentVisibility={this.toggleAdjacentVisibility} />
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
                    adjecentVisibility={this.state.displayAdjacent} />

            </div>
        )
    }
}
