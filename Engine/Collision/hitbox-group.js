import Hitbox from "./hitbox.js";

export default class HitboxGroup {
    /**
     * @param {Hitbox[]} hitboxes 
     */
    constructor(hitboxes = [], color = "red", id = "") {
        this.hitboxes = hitboxes;
        this.color = color;
        this.id = id;
    }

    /**
     * @param {Hitbox} hitbox
     */
    add(hitbox) {
        this.hitboxes.push(hitbox);
    }

    clear() {
        this.hitboxes.length = 0;
    }

    /**
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {
        for (const hitbox of this.hitboxes) {
            hitbox.draw(ctx);
        }
    }
}