import Vector2D from "../Utils/vector2d.js";

export default class Particles {
    /** 
     * @param {Vector2D} position 
     */
    constructor(position) {
        this.position = position;
        this.radius = Math.random() * 3 + 2;
        this.speed = new Vector2D((Math.random() - 0.5) * 4);
        this.alpha = 1;
        this.decay = Math.random() * 0.01 + 0.01;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    }

    update() {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
        this.alpha -= this.decay;
    }

    /**
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }

    isLife() {
        return this.alpha > 0;
    }
}