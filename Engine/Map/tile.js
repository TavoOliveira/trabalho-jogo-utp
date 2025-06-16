import Texture from "../Utils/texture.js";
import Vector2D from "../Utils/vector2d.js";

export default class Tile {
    /**
     * Representa um Tile de uma tilemap
     * @param {Texture} texture 
     * @param {Vector2D} position
     */
    constructor(texture, position) {
        this.texture = texture;
        this.position = position;
    }

    /**
     * Desenha o Tile na tela
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {
        this.texture.draw(ctx, this.position);
    }
} 
