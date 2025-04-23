import Texture from "../../Engine/Utils/texture.js";
import Vector2D from "../../Engine/Utils/vector2d.js";
import Keyboard from "../../Engine/Inputs/keyboard.js";
import KeysState from "../../Engine/Enums/key-state.js";

export default class Player {
    /**
     * @param {Texture} texture
     * @param {Vector2D} position
     */
    constructor(texture, position, keyboard) {
        this.texture = texture;
        this.position = position;
        this.keyboard = keyboard;
        this.speed = new Vector2D(5, 5);
    }

    move() {
        let direction = Vector2D.zero();

        if (this.keyboard.isKey("ArrowLeft") == KeysState.PRESSED || this.keyboard.isKey("KeyA") == KeysState.PRESSED) {
            direction.x -= 1;
        }
        
        if (this.keyboard.isKey("ArrowRight") == KeysState.PRESSED) {
            direction.x += 1;
        }

        if (this.keyboard.isKey("ArrowUp") == KeysState.PRESSED) {
            direction.y -= 1;
        }

        if (this.keyboard.isKey("ArrowDown") == KeysState.PRESSED) {
            direction.y += 1;
        }

        if (direction.x !== 0 || direction.y !== 0) {
            direction = direction.normalize();
    
            this.position.x += direction.x * this.speed.x;
            this.position.y += direction.y * this.speed.y;
        }
    }

    update() {
        this.move();
    }

    /** @param {CanvasRenderingContext2D} ctx */
    draw(ctx) {
        this.texture.draw(ctx, this.position.x, this.position.y, 0, 0, 32, 32, 32, 32);
    }
}