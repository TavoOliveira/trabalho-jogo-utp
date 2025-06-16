import Texture from "../Utils/texture.js";

export default class TileMap {
    constructor(mapData) {
        this.tileSize = mapData.tileSize;
        this.tileset = new Texture(mapData.tileset);
        this.tileDefinitions = mapData.tileDefinitions;
        this.tiles = mapData.tiles;
        this.width = this.tiles[0].length;
        this.height = this.tiles.length;
    }

    draw(ctx) {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const tileId = this.tiles[y][x];

                if (this.tileDefinitions[tileId]) {
                    const { sx, sy } = this.tileDefinitions[tileId];

                    this.tileset.draw(
                        ctx,
                        x * this.tileSize,
                        y * this.tileSize,
                        this.tileSize,
                        this.tileSize,
                        sx,
                        sy,
                        this.tileSize,
                        this.tileSize
                    );
                }
            }
        }
    }
}