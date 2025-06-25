// === / INIMIGOS / ===
import Enemy from "./enemy.js";

// === / UTILIDADES / ===
import Texture from "../../Engine/Utils/texture.js";
import Vector2D from "../../Engine/Utils/vector2d.js";

export default class Entities {
    constructor(maxEntities = 16) {
        this.maxEntities = maxEntities;
        this.entities    = [];        

        /** INIMIGOS
         * ORC:         Game/Assets/enemys/Orc100x100.png
         * GOLEM B:     Game/Assets/enemys/golemBlue64x90.png
         * GOLEM O:     Game/Assets/enemys/golemOrange64x90.png
         * BAT:         Game/Assets/enemys/bat64x64.png
         * NECROMANCER: Game/Assets/enemys/necromancer128x160.png
         */

        //this.texture = new Texture("Game/Assets/enemys/golemOrange64x90.png");
    }

    /** @param {Vector2D} centerPos */
    spawnWave(centerPos) {
        this.entities = [];

        for (let i = 0; i < this.maxEntities; i++) {
            const offsetX = Math.random() * 100 - 400;
            const offsetY = Math.random() * 100 - 400;

            const position = new Vector2D(centerPos.x + offsetX, centerPos.y + offsetY);
            //spawm golem
            //const texture  = new Texture((i % 2 == 0 ? "Game/Assets/enemys/golemOrange64x90.png" : "Game/Assets/enemys/golemBlue64x90.png"));
            const texture  = new Texture("Game/Assets/enemys/necromancer128x160.png");
            const enemy    = new Enemy(texture, position, 4);
            this.entities.push(enemy);
        }                
    }

    updateAll(deltaTime, player) {
        const minDistance = 30;

        this.entities = this.entities.filter(entity => 
            entity.live > 0 || (entity.currentAnim.name == 'die' && entity.times.timedead > entity.Counters.die)
        );

        for (let i = 0; i < this.entities.length; i++) {
            const e1 = this.entities[i];

            if(e1.currentAnim.name != 'die' && e1.currentAnim.name != 'hit'){
                for (let j = i + 1; j < this.entities.length; j++) {
                    const e2 = this.entities[j];

                    const dx = e2.position.x - e1.position.x;
                    const dy = e2.position.y - e1.position.y;
                    const dist = Math.hypot(dx, dy);

                    if (dist < minDistance && dist > 0.001) {
                        const pushStrength = 0.5;

                        const nx = dx / dist;
                        const ny = dy / dist;

                        const pushX = nx * (minDistance - dist) * pushStrength;
                        const pushY = ny * (minDistance - dist) * pushStrength;

                        e1.position.x -= pushX / 2;
                        e1.position.y -= pushY / 2;

                        e2.position.x += pushX / 2;
                        e2.position.y += pushY / 2;
                    }
                }
            }                        

            e1.updatePlayerPosition(player.position);
            e1.update(deltaTime);
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
