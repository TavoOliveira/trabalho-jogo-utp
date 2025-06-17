import HealthBar from "../HUD/HealthBar.js";
import Texture from "../../Engine/Utils/texture.js";
import Vector2D from "../../Engine/Utils/vector2d.js";
import KeysState from "../../Engine/Enums/key-state.js";
import Animator from "../../Engine/Animator/animator.js";
import GameObject from "../../Engine/Utils/game-object.js";
import { Hitbox, RectHitbox } from "../../Engine/Collision/index.js";

export default class Player extends GameObject {
    /**
     * @param {Texture} texture
     * @param {Vector2D} position
     */
    constructor(texture, position, keyboard) {
        super(texture, position);
        this.keyboard = keyboard;
        this.speed = Vector2D.one(2);
        this.moveDir = Vector2D.zero();

        this.animations = {
            walk: new Animator('walk', this.texture, 32, 32, 0, 0, 8, 10),
            idle: new Animator('idle', this.texture, 32, 32, 0, 0, 1, 0)
        }

        this.hitbox = new RectHitbox(this, new Vector2D(10, 12), 12, 20);

        this.currentAnim = this.animations.idle;
        this.currentAnim.play();

        this.live    = 5;
        this.counter = 0;   

        this.HealthBar = new HealthBar(new Vector2D(10,10), 3);
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

        if (this.keyboard.isKey("ArrowRight") == KeysState.PRESSED || this.keyboard.isKey("KeyD") == KeysState.PRESSED) {
            this.texture.flipX = false;
            moving = true;
            direction.x += 1;
        }

        if (this.keyboard.isKey("ArrowUp") == KeysState.PRESSED || this.keyboard.isKey("KeyW") == KeysState.PRESSED) {
            moving = true;
            direction.y -= 1;
        }

        if (this.keyboard.isKey("ArrowDown") == KeysState.PRESSED || this.keyboard.isKey("KeyS") == KeysState.PRESSED) {
            moving = true;
            direction.y += 1;
        }

        if (moving) {
            this.#setAction('walk');
            direction = direction.normalize();
            this.moveDir.copy(direction);
            this.position.x += direction.x * this.speed.x;
            this.position.y += direction.y * this.speed.y;
        } else {
            this.moveDir.set(0, 0);
            this.#setAction('idle');
        }
    }

    update(deltaTime) {
        this.#move();
        
        this.currentAnim.update(deltaTime);

        if (this.keyboard.isKey("KeyO") == KeysState.PRESSED && this.counter == 0) {
            this.HealthBar.addStartX();                                
            this.live--;
            this.counter = 1
        } else{            
        }

        if(this.live == 0)
            console.log('morte');            
    }

    /** @param {CanvasRenderingContext2D} ctx */
    draw(ctx, hudctx) {
        this.hitbox.draw(ctx);
        this.currentAnim.draw(ctx, this.position);      
        
        this.HealthBar.draw(hudctx);
    }
}