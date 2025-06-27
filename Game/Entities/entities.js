// === / INIMIGOS / ===
import Enemy from "./enemy.js";

// === / UTILIDADES / ===
import Texture from "../../Engine/Utils/texture.js";
import Vector2D from "../../Engine/Utils/vector2d.js";

export default class Entities {
    constructor(maxEntities = 16) {
        this.maxEntities = maxEntities;
        this.entities    = [];   
        this.randomMode  = false;     

        /** INIMIGOS
         * 1-ORC:         Game/Assets/enemys/Orc100x100.png
         * 2-GOLEM B:     Game/Assets/enemys/golemBlue64x90.png
         * 2-GOLEM O:     Game/Assets/enemys/golemOrange64x90.png
         * 3-BAT:         Game/Assets/enemys/bat64x64.png
         * 4-NECROMANCER: Game/Assets/enemys/necromancer128x160.png
         */

        //this.texture = new Texture("Game/Assets/enemys/golemOrange64x90.png");
    }    

    /** @param {Vector2D} centerPos */
    spawnWave(centerPos,currentLevel) {
        this.entities = [];

        for (let i = 0; i < this.maxEntities; i++) {
            const offsetX = ((Math.floor(Math.random() * 2) + 1) % 2 == 0) ? Math.random() * 100 - 200 : Math.random() * 100 + 200;
            const offsetY = ((Math.floor(Math.random() * 2) + 1) % 2 == 0) ? Math.random() * 100 - 200 : Math.random() * 100 + 200;

            const position = new Vector2D(centerPos.x + offsetX, centerPos.y + offsetY);
            let   infoSet  = {texture: null,key: null};

            if(this.randomMode){
                switch (Math.floor(Math.random() * 4) + 1) {
                    case 1: //spawm orc
                        infoSet.texture = new Texture("Game/Assets/enemys/Orc100x100.png");
                        infoSet.key     = 1;
                        break;
                    case 2: //spawm golem
                        infoSet.texture = new Texture((i % 2 == 0 ? "Game/Assets/enemys/golemOrange64x90.png" : "Game/Assets/enemys/golemBlue64x90.png"));
                        infoSet.key     = 2;
                        break;
                    case 3: //spawm Bat
                        infoSet.texture = new Texture("Game/Assets/enemys/bat64x64.png");
                        infoSet.key     = 3;                     
                        break;
                    case 4: //spawm Necromance
                        infoSet.texture = new Texture("Game/Assets/enemys/necromancer128x160.png");
                        infoSet.key     = 4;                       
                        break;                                        
                    default:
                        break;
                }

            } else { //por mapa
                infoSet.texture = new Texture("Game/Assets/enemys/Orc100x100.png");
                infoSet.key     = 1;
            }            
                                    
            const enemy    = new Enemy(infoSet.texture, position, infoSet.key);

            enemy.setEnemyLive(currentLevel,1.2);
            this.entities.push(enemy);
        }                
    }

    setRandomMode(varValue){
        this.randomMode = varValue;
    }

    setEnemysNum(EnemysNum){
        this.maxEntities = EnemysNum;
    }

    updateAll(deltaTime, player) {
        const minDistance = 40;

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

    //LOAD E SAVE
    serialize() {
        return {
            maxEntities: this.maxEntities,
            randomMode: this.randomMode,
            entities: this.entities.map(e => ({
                key: e.enemyId,
                live: e.live,
                level: e.level,
                position: { x: e.position.x, y: e.position.y },
                anim: e.currentAnim.name,
                counterDie: e.Counters.die,
            }))
        };
    }

    deserialize(data) {
        const entities = new Entities(data.maxEntities);
        entities.randomMode = data.randomMode;

        entities.entities = data.entities.map(eData => {
            let count    = 0
            let infoSet  = {texture: null,key: null};
            
            switch (eData.key) {
                case 1: //spawm orc
                    infoSet.texture = new Texture("Game/Assets/enemys/Orc100x100.png");
                    infoSet.key     = 1;
                    break;
                case 2: //spawm golem
                    infoSet.texture = new Texture((count % 2 == 0 ? "Game/Assets/enemys/golemOrange64x90.png" : "Game/Assets/enemys/golemBlue64x90.png"));
                    infoSet.key     = 2;
                    break;
                case 3: //spawm Bat
                    infoSet.texture = new Texture("Game/Assets/enemys/bat64x64.png");
                    infoSet.key     = 3;                     
                    break;
                case 4: //spawm Necromance
                    infoSet.texture = new Texture("Game/Assets/enemys/necromancer128x160.png");
                    infoSet.key     = 4;                       
                    break;                                        
                default:
                    break;
            }    
            
            count++;
            
            const position = new Vector2D(eData.position.x, eData.position.y);
            const enemy = new Enemy(infoSet.texture, position, infoSet.key);

            enemy.live = eData.live;
            enemy.level = eData.level;
            enemy.setEnemyLive(eData.level, 1.2);
            enemy.Counters.die = eData.counterDie;
            
            if (enemy.animations[eData.anim]) {
                enemy.currentAnim = enemy.animations[eData.anim];
                enemy.currentAnim.play();
            }

            return enemy;
        });

        return entities;
    }

}
