export default class Texture extends Image {
    constructor(src) {
        super();
        this.src = src;

        this.loaded = false;

        this.onload = () => 
            this.loaded = true;
    }

    isLoaded() {
        return this.loaded;
    }

    /** @param {CanvasRenderingContext2D} ctx */
    draw(ctx, x, y, width = this.width, height = this.height) {
        if (!this.loaded) return;

        ctx.drawImage(this, x, y, width, height);
    }
}