import GameObject from "../Utils/game-object.js";

export default class Hitbox {
    /**
     * @param {GameObject} owner 
     */
    constructor(owner, color, id) {
        this.owner = owner;
        this.color = color;
        this.id = id;
    }

    draw(ctx) {

    }
} 