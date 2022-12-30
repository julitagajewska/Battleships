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
let usernameB = "user_B"

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
                this.generateTiles(usernameB, "ships_grid"))]
        }

        this.toggleOrientation = this.toggleOrientation.bind(this);
    }

    updateData() {
        this.setState({
            ship: this.state.ship + 1
        });
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




    render() {

        console.log(this.state.users[0])

        return (
            <div className='container'>

                <div>
                    <UserSidebar
                        username={usernameA}
                        ships={this.state.users[0].ships}
                        orientation={this.state.orientation}
                        toggleOrientation={this.toggleOrientation} />
                </div>

                <Grid
                    type={"placement"}
                    tiles={this.state.users[0].shipsGrid} />

            </div>
        )
    }
}
