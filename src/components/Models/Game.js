export class Game {
    constructor(id, usernameA, usernameB, score, shipsGridA, shipsGridB, battleGridA, battleGridB) {
        super();

        this.id = id;
        this.usernameA = usernameA;
        this.usernameB = usernameB;
        this.score = score;
        this.shipsGridA = shipsGridA;
        this.shipsGridB = shipsGridB;
        this.battleGridA = battleGridA;
        this.battleGridB = battleGridB;
    }
}