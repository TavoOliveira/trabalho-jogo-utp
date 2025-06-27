import Texture from "../Utils/texture.js";

export default class TileMap {
    constructor(mapData) {
        this.tileSize = mapData.tileSize;
        this.tileset = new Texture(mapData.tileset);
        this.tileDefinitions = mapData.tileDefinitions;
        this.tiles = mapData.tiles;

        this.height = this.tiles.length;
        this.width = this.tiles[0]?.length || 0;

        // Cache otimizado
        this.tileCache = this._generateTileCache();
    }

    _generateTileCache() {
        return this.tiles.map(row =>
            row.map(tileId => this.tileDefinitions[tileId] || null)
        );
    }

    /**
     * Desenha os tiles visíveis na viewport.
     * @param {CanvasRenderingContext2D} ctx 
     * @param {number} offsetX 
     * @param {number} offsetY 
     * @param {number} viewportWidth 
     * @param {number} viewportHeight 
     */
    draw(ctx, offsetX = 0, offsetY = 0, viewportWidth = ctx.canvas.width, viewportHeight = ctx.canvas.height) {
        const tileSize = this.tileSize;
        const tileset = this.tileset;

        const startCol = Math.max(0, (offsetX * -1) / tileSize | 0);
        const endCol = Math.min(this.width, ((viewportWidth - offsetX) / tileSize) | 0 + 1);

        const startRow = Math.max(0, (offsetY * -1) / tileSize | 0);
        const endRow = Math.min(this.height, ((viewportHeight - offsetY) / tileSize) | 0 + 1);

        for (let y = startRow; y < endRow; y++) {
            const row = this.tileCache[y];
            for (let x = startCol; x < endCol; x++) {
                const def = row[x];
                if (!def) continue;

                tileset.draw(
                    ctx,
                    x * tileSize + offsetX,
                    y * tileSize + offsetY,
                    tileSize,
                    tileSize,
                    def.sx,
                    def.sy,
                    tileSize,
                    tileSize
                );
            }
        }
    }
}
