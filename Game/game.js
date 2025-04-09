import KeysState from "./Enums/key-state.js";
import Keyboard from "./Inputs/keyboard.js";

export default class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");

        this.canvas.width = document.documentElement.clientWidth;
        this.canvas.height = document.documentElement.clientHeight;

        this.keyboard = new Keyboard();

        this.loop();
    }

    loop() {
        this.draw(this.ctx);

        requestAnimationFrame(this.loop.bind(this));
    }

    /** @param {CanvasRenderingContext2D} */
    draw(ctx) {
        
    }
}