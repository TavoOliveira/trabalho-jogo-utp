import GameObject from "../../Engine/Utils/game-object.js";
import { RectHitbox } from "../../Engine/Collision/index.js";
import Vector2D from "../../Engine/Utils/vector2d.js";

export default class Enemy extends GameObject {
    constructor(texture, position,enemyId) {
        super(texture, position);

        this.enemyId = enemyId;

        this.speed    = Vector2D.one(2);
        this.moveDir  = Vector2D.zero();        

        this.hitbox = new RectHitbox(this, new Vector2D(400, 400), 128, 128, "red");
    }

    draw(ctx) {
        this.hitbox.draw(ctx);
    }
}