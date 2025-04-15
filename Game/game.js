import KeysState from "./Enums/key-state.js";
import Keyboard from "./Inputs/keyboard.js";
import Texture from "./Utils/texture.js";

export default class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");

        this.width = document.documentElement.clientWidth;
        this.height = document.documentElement.clientHeight;

        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.keyboard = new Keyboard();

        this.castelo = new Texture("https://5500-idx-trabalho-jogo-utp-1744387627420.cluster-qhrn7lb3szcfcud6uanedbkjnm.cloudworkstations.dev/Game/castelo.jpg");

        this.loop();
    }

    loop() {
        this.draw(this.ctx);

        requestAnimationFrame(this.loop.bind(this));
    }

    /** @param {CanvasRenderingContext2D} ctx */
    draw(ctx) {
        ctx.clearRect(0, 0, this.width, this.height);
        
        this.castelo.draw(ctx, 0, 0);
    }
}