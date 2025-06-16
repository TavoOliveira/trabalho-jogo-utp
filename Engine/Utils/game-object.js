import Vector2D from "./vector2d.js";
import Texture from "./texture.js";


export default class GameObject {
    /**
     * @param {Texture} texture
     * @param {Vector2D} position 
     */
    constructor(texture, position) {
        this.texture = texture;
        this.position = position;
    }

    update(deltaTime) { }
    draw(ctx) { }
}