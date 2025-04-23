export default class Texture extends Image {
    constructor(src) {
        super();
        this.src = src;
        this.scale = 1;
        this.flipX = false;
        this.flipY = false;

        this.loaded = false;

        this.onload = () =>
            this.loaded = true;
    }

    isLoaded() {
        return this.loaded;
    }

    /** @param {CanvasRenderingContext2D} ctx */
    draw(ctx, x, y, width = this.width, height = this.height, sx = 0, sy = 0, sWidth = this.width, sHeight = this.height) {
        if (!this.loaded) return;

        ctx.save();
        ctx.imageSmoothingEnabled = false;

        const scaleX = this.flipX ? -1 : 1;
        const scaleY = this.flipY ? -1 : 1;

        ctx.scale(scaleX, scaleY);

        const drawX = this.flipX ? -(x + width * this.scale) : x;
        const drawY = this.flipY ? -(y + height * this.scale) : y;

        ctx.drawImage(
            this,
            sx,
            sy,
            sWidth,
            sHeight,
            drawX,
            drawY,
            width * this.scale,
            height * this.scale
        );

        ctx.restore();
    }
}