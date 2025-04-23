import Texture from "../../Engine/Utils/texture.js";
import Vector2D from "../../Engine/Utils/vector2d.js";
import Keyboard from "../../Engine/Inputs/keyboard.js";
import KeysState from "../../Engine/Enums/key-state.js";
import Animator from "../../Engine/Animator/animator.js";
import AnimatorManager from "../../Engine/Animator/animator-manager.js";

export default class Player {
    /**
     * @param {Texture} texture
     * @param {Vector2D} position
     */
    constructor(texture, position, keyboard) {
        this.texture = texture;
        this.texture.scale = 4;
        this.position = position;
        this.keyboard = keyboard;
        this.speed = new Vector2D(5, 5);

        this.animations = {
            walk: new Animator('walk', this.texture, 32, 32, 0, 0, 8, 10),
            idle: new Animator('idle', this.texture, 32, 32, 0, 0, 1, 0)
        }

        this.currentAnim = this.animations.idle;
        this.currentAnim.play();
    }

    #setAction(name) {
        if (this.currentAnim.name == name) return;

        this.currentAnim.stop();
        this.currentAnim = this.animations[name];
        this.currentAnim.play();
    }

    #move() {
        let direction = Vector2D.zero();
        let moving = false;

        if (this.keyboard.isKey("ArrowLeft") == KeysState.PRESSED || this.keyboard.isKey("KeyA") == KeysState.PRESSED) {
            this.texture.flipX = true;
            moving = true;
            direction.x -= 1;
        }
        
        if (this.keyboard.isKey("ArrowRight") == KeysState.PRESSED) {
            this.texture.flipX = false;
            moving = true;
            direction.x += 1;
        }

        if (this.keyboard.isKey("ArrowUp") == KeysState.PRESSED) {
            moving = true;
            direction.y -= 1;
        }

        if (this.keyboard.isKey("ArrowDown") == KeysState.PRESSED) {
            moving = true;
            direction.y += 1;
        }

        if (moving) {
            this.#setAction('walk');
            direction = direction.normalize();
    
            this.position.x += direction.x * this.speed.x;
            this.position.y += direction.y * this.speed.y;
        } else {
            this.#setAction('idle');
        }
    }

    update(deltaTime) {
        this.#move();

        this.currentAnim.update(deltaTime);
    }

    /** @param {CanvasRenderingContext2D} ctx */
    draw(ctx) {
        this.currentAnim.draw(ctx, this.position);
    }
}