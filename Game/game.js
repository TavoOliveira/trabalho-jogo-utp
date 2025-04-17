import KeysState from "./Enums/key-state.js";
import Keyboard from "./Inputs/keyboard.js";
import Mouse from "./Inputs/mouse.js";

export default class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");

        this.canvas.width = document.documentElement.clientWidth;
        this.canvas.height = document.documentElement.clientHeight;

        this.keyboard = new Keyboard();
        this.mouse = new Mouse();

        this.loop();
    }

    loop() {
        this.draw(this.ctx);

        console.log(this.mouse.getPosition());

        requestAnimationFrame(this.loop.bind(this));
    }

    /** @param {CanvasRenderingContext2D} */
    draw(ctx) {
        
    }
}