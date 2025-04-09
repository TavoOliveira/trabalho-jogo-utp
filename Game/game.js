export default class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");

        this.canvas.width = 800;
        this.canvas.height = 600;

        this.loop();
    }

    loop() {
        console.log("Loop");

        this.draw(this.ctx);

        requestAnimationFrame(this.loop.bind(this));
    }

    /** @param {CanvasRenderingContext2D} */
    draw(ctx) {

    }
}