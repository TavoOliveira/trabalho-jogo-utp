import GameObject from "../../Engine/Utils/game-object.js";
import { RectHitbox } from "../../Engine/Collision/index.js";
import Vector2D from "../../Engine/Utils/vector2d.js";

export default class Enemy extends GameObject {
    constructor(texture, position) {
        super(texture, position);

        this.hitbox = new RectHitbox(this, new Vector2D(400, 400), 128, 128, "red");
    }

    draw(ctx) {
        this.hitbox.draw(ctx);
    }
}