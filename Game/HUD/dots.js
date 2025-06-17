import Vector2D from "../../Engine/Utils/vector2d.js";

export default class MouseDots {
    /**
     * @param {Texture} texture
     * @param {number} size
     */
    constructor(texture, size) {
        this.texture  = texture;
        this.size     = size;                
        this.mousePos = new Vector2D(0, 0);
    }

    setMousePos(x, y) {
        this.mousePos.set(x, y);
    }

    draw(ctx) {                
        this.texture.draw(ctx,this.mousePos.x,this.mousePos.y,this.size,this.size,19,99,9,9);
    }
}
