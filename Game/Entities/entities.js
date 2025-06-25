// === / INIMIGOS / ===
import Enemy from "./enemy.js";

// === / UTILIDADES / ===
import Texture from "../../Engine/Utils/texture.js";
import Vector2D from "../../Engine/Utils/vector2d.js";

export default class Entities {
    constructor(maxEntities = 16) {
        this.maxEntities = maxEntities;
        this.entities = [];

        this.texture = new Texture("Game/Assets/enemys/Orc100x100.png");
    }

    /** @param {Vector2D} centerPos */
    spawnWave(centerPos) {
        this.entities = [];

        for (let i = 0; i < this.maxEntities; i++) {
            const offsetX = Math.random() * 100 - 400;
            const offsetY = Math.random() * 100 - 400;

            const position = new Vector2D(centerPos.x + offsetX, centerPos.y + offsetY);
            const enemy    = new Enemy(this.texture, position, 1);
            this.entities.push(enemy);
        }                
    }

    updateAll(deltaTime, player) {
        for (const enemy of this.entities) {
            enemy.updatePlayerPosition(player.position);
            enemy.update(deltaTime);
        }
    }

    drawAll(ctx) {
        for (const enemy of this.entities) {
            enemy.draw(ctx);
        }
    }

    getEnemies() {
        return this.entities;
    }
}
