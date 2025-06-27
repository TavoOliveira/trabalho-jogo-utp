import Texture from "../Utils/texture.js";

export default class TileMap {
    constructor(mapData) {
        console.log(mapData.Tiles[0][0].length);

        this.tileSize = mapData.TileSize;
        this.tileset = new Texture(mapData.TileSet);
        this.tileDefinitions = mapData.TileDefinitions;
        this.tiles = mapData.Tiles;

        // Calcula largura e altura a partir da primeira camada
        this.layerCount = this.tiles.length;
        this.height = this.tiles[0].length;
        this.width = this.tiles[0][0].length;
    }

    draw(ctx) {
        for (let layer = 0; layer < this.layerCount; layer++) {
            for (let y = 0; y < this.height; y++) {
                for (let x = 0; x < this.width; x++) {
                    const tileId = this.tiles[layer][y][x];

                    // Ignora null ou indefinido
                    if (tileId == null || this.tileDefinitions[tileId] == null) continue;

                    const { Sx, Sy } = this.tileDefinitions[tileId];

                    this.tileset.draw(
                        ctx,
                        x * this.tileSize,
                        y * this.tileSize,
                        this.tileSize,
                        this.tileSize,
                        Sx * this.tileSize,
                        Sy * this.tileSize,
                        this.tileSize,
                        this.tileSize
                    );
                }
            }
        }
    }
}