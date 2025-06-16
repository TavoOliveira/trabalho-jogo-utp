import Vector2D from "./vector2d.js";

export default class Camera {
    /**
     * @param { Vector2D } position 
     * @param { number } zoom 
     */
    constructor(position, zoom = 1) {
        this.position = position;
        this.zoom = zoom;
    }

    /**
     * @param { Vector2D } position 
     */
    setPosition(position) {
        this.position = position;
    }

    move(dx, dy) {
        this.position.x += dx;
        this.position.y += dy;
    }

    setZoom(zoom) {
        this.zoom = Math.max(0.1, zoom);
    }

    zoomIn(amount = 0.1) {
        this.zoom += amount;
    }

    zoomOut(amount = 0.1) {
        this.zoom = Math.max(0.1, this.zoom - amount);
    }

    /**
     * @param { CanvasRenderingContext2D } ctx
     * @param { HTMLCanvasElement } canvas
     */
    applyTransform(ctx, canvas) {
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.scale(this.zoom, this.zoom);
        ctx.translate(-this.position.x, -this.position.y);
    }

    /**
     * @param { CanvasRenderingContext2D } ctx
     * @param { HTMLCanvasElement } canvas
     */
    resetTransform(ctx, canvas) {
        ctx.translate(this.position.x, this.position.y);
        ctx.scale(1 / this.zoom, 1 / this.zoom);
        ctx.translate(-canvas.width / 2, -canvas.height / 2);
    }
}