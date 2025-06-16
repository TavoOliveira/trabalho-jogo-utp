import GameObject from "../Utils/game-object.js";
import Vector2D from "../Utils/vector2d.js";
import Hitbox from "./hitbox.js";

export default class CircleHitbox extends Hitbox {
    /**
     * @param {GameObject} owner 
     * @param {Vector2D} offset 
     * @param {number} radius 
     */
    constructor(owner, offset, radius, color = "red", id = "") {
        super(owner, color, id);
        this.offset = offset;
        this.radius = radius;
    }

    /**
     * @returns { { x: number, y: number } }
     */
    get center() {
        return {
            x: this.owner.position.x + this.offset.x,
            y: this.owner.position.y + this.offset.y
        }
    }

    /**
     * @param {CanvasRenderingContext2D} ctx
     */
    draw(ctx) {
        const c = this.center;
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.arc(c.x, c.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
    }
}