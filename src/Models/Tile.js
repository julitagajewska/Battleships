export class Tile {
    constructor(key, id, shipType, shipElementId, user, state) {
        this.key = key;
        this.id = id;
        this.shipType = shipType;
        this.shipElementId = shipElementId;
        this.user = user;
        this.state = state;
    }
}