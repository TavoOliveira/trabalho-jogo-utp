import Hitbox from "./hitbox.js";
import Vector2D from "../Utils/vector2d.js";
import GameObject from "../Utils/game-object.js";

export default class RectHitbox extends Hitbox {
    /**
     * @param {GameObject} owner
     * @param {Vector2D} offset
     * @param {number} width
     * @param {number} height
     */
    constructor(owner, offset, width, height, color = "red", id = "") {
        super(owner, color, id);
        this.offset = offset;
        this.width = width;
        this.height = height;
    }

    /**
     * @returns { { x: number, y: number, width: number, height: number } }
     */
    get bounds() {
        return {
            x: this.owner.position.x + this.offset.x,
            y: this.owner.position.y + this.offset.y,
            width: this.width,
            height: this.height
        }
    }

    draw(ctx) {
        const b = this.bounds;
        ctx.strokeStyle = this.color;
        ctx.strokeRect(b.x, b.y, b.width, b.height);
    }
}