import Player from "./Entities/player.js";
import Vector2D from "../Engine/Utils/vector2d.js";
import Texture from "../Engine/Utils/texture.js";
import Keyboard from "../Engine/Inputs/keyboard.js";

export default class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");

        this.width = document.documentElement.clientWidth;
        this.height = document.documentElement.clientHeight;

        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.keyboard = new Keyboard();
        
        this.player = new Player(new Texture("Game/Assets/global.png"), new Vector2D(300, 300), this.keyboard);

        this.loop();
    }

    loop() {
        this.draw(this.ctx);

        this.player.update();

        requestAnimationFrame(this.loop.bind(this));
    }

    /** @param {CanvasRenderingContext2D} ctx */
    draw(ctx) {
        ctx.clearRect(0, 0, this.width, this.height);

        this.player.draw(ctx);
    }

    
}