// === / VARIAVEIS GLOBAIS - ENUMS GERAIS / ===
import Enums from "../HUD/HUD-enums/HUD_Enums.js";
import GlobalVars from "../H\UD/HUD-Vars/HUDGlobalVars.js";

// === / UTILIDADES / ===
import Vector2D from "../../Engine/Utils/vector2d.js";
import Animator from "../../Engine/Animator/animator.js";
import GameObject from "../../Engine/Utils/game-object.js";
import { RectHitbox } from "../../Engine/Collision/index.js";

export default class Enemy extends GameObject {
    constructor(texture, position,enemyId) {
        super(texture, position);

        // === ENEMY ===
        this.enemyId    = enemyId;
        this.live       = 5;
        this.level      = 1;
        this.AttackMode = false;
        this.rewardGive = false;
        this.effects    = {shocked: false,poisoned: false,bleeding: false,immunity:false};        
        this.moveDir    = Vector2D.zero();    
                
        this.sprites_offset = Enums.sprites_offset[`e-${this.enemyId}`];
        
        // === HITBOX / ANIMATIONS / TIMES / COUNTER === 
        this.Counters          = {die: 0, attack: 0, HB: 0,hit: 0}; 
        this.playerInFieldView = false;   
        this.playerPosition    = new Vector2D(0,0);            
        switch (this.enemyId) {
            case 1: //ORC
                // === / VIZUALIZAÇÃO / ===
                this.viewField        = new RectHitbox(this, new Vector2D(-400,-400), 800, 800,"blue");

                // === / AREA DE ATAQUE E DAR DANO / ===
                this.enemyattackbox   = new RectHitbox(this, new Vector2D(-40,-40), 80, 80,"green");
                this.hitbox           = new RectHitbox(this, new Vector2D(-10,-10), 20, 20,"red");

                // === / AREA DE TOMAR DANO
                this.HBhitbox         = new RectHitbox(this, new Vector2D(-30,-30), 60, 60,"orange");                
                this.playerattackbox  = new RectHitbox(this, new Vector2D(-25,-25), 50, 50,"yellow");                
                
                this.animations = {
                    hit:      new Animator('hit',      this.texture, 100, 100, 0, 400, 4,  5),
                    die:      new Animator('die',      this.texture, 100, 100, 0, 500, 4,  4),
                    idle:     new Animator('idle',     this.texture, 100, 100, 0, 0,   6,  8),
                    walk:     new Animator('walk',     this.texture, 100, 100, 0, 100, 8, 12),
                    attack_1: new Animator('attack_1', this.texture, 100, 100, 0, 300, 6, 12),
                };
                this.times = {attack: 2,die: 6,hit: 4,timedead: 30};
                this.speed = Vector2D.one(0.6);
                break;
            case 2: //GOLEMS
                // === / VIZUALIZAÇÃO / ===
                this.viewField        = new RectHitbox(this, new Vector2D(-400,-400), 800, 800,"blue");

                // === / AREA DE ATAQUE E DAR DANO / ===
                this.enemyattackbox   = new RectHitbox(this, new Vector2D(-50,-50), 100, 100,"green");
                this.hitbox           = new RectHitbox(this, new Vector2D(-20,-20), 40, 40,"red");

                // === / AREA DE TOMAR DANO
                this.HBhitbox         = new RectHitbox(this, new Vector2D(-45,-45), 90, 90,"orange");                
                this.playerattackbox  = new RectHitbox(this, new Vector2D(-35,-35), 70, 70,"yellow");                
                
                this.animations = {
                    hit:      new Animator('hit',      this.texture, 90, 64, 0, 128,  4,  5),
                    die:      new Animator('die',      this.texture, 90, 64, 0, 64,  13,  9),
                    idle:     new Animator('idle',     this.texture, 90, 64, 0, 192,  8,  7),
                    walk:     new Animator('walk',     this.texture, 90, 64, 0, 256, 10, 12),
                    attack_1: new Animator('attack_1', this.texture, 90, 64, 0, 0,   11, 14),
                };
                this.times = {attack: 4,die: 8,hit: 4,timedead: 20};
                this.speed = Vector2D.one(0.4);
                break;
            case 3: //BAT
                // === / VIZUALIZAÇÃO / ===
                this.viewField        = new RectHitbox(this, new Vector2D(-400,-400), 800, 800,"blue");

                // === / AREA DE ATAQUE E DAR DANO / ===
                this.enemyattackbox   = new RectHitbox(this, new Vector2D(-55,-55), 110, 110,"green");
                this.hitbox           = new RectHitbox(this, new Vector2D(-20,-20), 40, 40,"red");

                // === / AREA DE TOMAR DANO
                this.HBhitbox         = new RectHitbox(this, new Vector2D(-45,-45), 90, 90,"orange");                
                this.playerattackbox  = new RectHitbox(this, new Vector2D(-35,-35), 70, 70,"yellow");                
                
                this.animations = {
                    hit:      new Animator('hit',      this.texture, 64, 64, 0, 192,  5,  5),
                    die:      new Animator('die',      this.texture, 64, 64, 0, 128, 10,  9),
                    idle:     new Animator('idle',     this.texture, 64, 64, 0, 256,  9,  8),
                    walk:     new Animator('walk',     this.texture, 64, 64, 0, 320,  8, 12),
                    attack_1: new Animator('attack_1', this.texture, 64, 64, 0, 0,    8, 10),
                };
                this.times = {attack: 4,die: 10,hit: 4,timedead: 16};
                this.speed = Vector2D.one(0.8);
                break;
            case 4: //NECROMANCER
                // === / VIZUALIZAÇÃO / ===
                this.viewField        = new RectHitbox(this, new Vector2D(-450,-450), 900, 900,"blue");

                // === / AREA DE ATAQUE E DAR DANO / ===
                this.enemyattackbox   = new RectHitbox(this, new Vector2D(-55,-55), 110, 110,"green");
                this.hitbox           = new RectHitbox(this, new Vector2D(-20,-20), 40, 40,"red");

                // === / AREA DE TOMAR DANO
                this.HBhitbox         = new RectHitbox(this, new Vector2D(-50,-50), 100, 100,"orange");                
                this.playerattackbox  = new RectHitbox(this, new Vector2D(-40,-40), 80, 80,"yellow");                
                
                this.animations = {
                    hit:      new Animator('hit',      this.texture, 160, 128, 0, 640,  5,  5),
                    die:      new Animator('die',      this.texture, 160, 128, 0, 768,  8,  8),
                    idle:     new Animator('idle',     this.texture, 160, 128, 0, 0,    8,  8),
                    walk:     new Animator('walk',     this.texture, 160, 128, 0, 128,  8, 12),
                    attack_1: new Animator('attack_1', this.texture, 160, 128, 0, 256, 11, 14),
                };
                this.times = {attack: 5,die: 10,hit: 4,timedead: 10};
                this.speed = Vector2D.one(0.9);
                break;
            default:
                this.hitbox     = new RectHitbox(this, new Vector2D(0,0), 0, 0);
                this.animations = {};
                this.times      = {attack: 0,die: 0,hit: 0}; 
                break;
        }   
        
        this.currentAnim = this.animations.idle;
        this.currentAnim.play();
    }

    #setAction(name) {
        if (this.currentAnim.name == name && name != 'hit') return;

        this.currentAnim.stop();
        this.currentAnim = this.animations[name];
        this.currentAnim.play();        
    }    

    /**
     * @param {Array}   names -array de nomes a serem verificados     
     */
    #checkCurrentAnimation(names) {
        if (names.length == 0) return true;                 

        return names.includes(this.currentAnim.name); 
    }

    #previousIdleCheck(){
        let ret = true;
        
        if((this.currentAnim.name == 'attack_1') && this.times.attack >= this.Counters.attack)
            ret = false;              
        else if((this.currentAnim.name == 'hit') && this.times.hit >= this.Counters.hit)
            ret = false;        

        return ret;
    }

    #move() {
        if (this.live <= 0) return;

        if(!this.#checkCurrentAnimation(['die','hit'])){
            if (this.playerInFieldView) {
                const direction = this.playerPosition.sub(this.position).normalize();                

                this.moveDir.copy(direction);
                
                this.position.x += direction.x * this.speed.x;
                this.position.y += direction.y * this.speed.y;
                
                this.texture.flipX = (this.enemyId != 3 ? direction.x < 0 : direction.x > 0);

                if(this.currentAnim.name != 'attack_1' || this.Counters.attack > this.times.attack)
                    this.#setAction('walk');
            } else {
                this.moveDir.set(0, 0);
                this.#setAction('idle');
            }
        } else {
            if(this.#previousIdleCheck()){
                this.moveDir.set(0, 0);
                this.#setAction('idle');
            }
        } 
    }  

    update(deltaTime) {
        if(this.currentAnim.name == 'attack_1'){
            this.Counters.attack += deltaTime * 0.006;
        } else if(this.currentAnim.name == 'hit'){
            this.Counters.hit += deltaTime * 0.005;
        } else if(this.currentAnim.name == 'die'){
            this.Counters.die += deltaTime * 0.01;
        }

        if(this.AttackMode){
            if(this.Counters.attack > this.times.attack)
                this.AttackMode = false                
            else{                
                this.#setAction('attack_1')
            }

            this.Counters.attack = 0;
        }

        this.#move();           

        if(this.live > 0 || this.times.die > this.Counters.die)
            this.currentAnim.update(deltaTime);                    
    }

    draw(ctx) {
        if(GlobalVars.devMode){
            this.hitbox.draw(ctx);
            this.viewField.draw(ctx);
            this.enemyattackbox.draw(ctx);
            this.playerattackbox.draw(ctx);
            this.HBhitbox.draw(ctx);
        }

        this.currentAnim.draw(ctx, new Vector2D(this.position.x - this.sprites_offset,this.position.y - this.sprites_offset));

        if (ctx) {
            ctx.font = "0.6rem MONOGRAM";
            ctx.textBaseline = "top";

            const x = this.position.x - 30;
            const y = this.position.y - 20;
            
            ctx.fillStyle = "white";
            ctx.fillText(`Nivel: ${this.level}`, x, y);
            
            const levelWidth = ctx.measureText(`Nivel: ${this.level}`).width;
            
            ctx.fillStyle = "red";
            ctx.fillText(` Vida: ${this.live}`, x + levelWidth, y);
        }

    }

    //Utilidades
    subEnemyLife(playerPosition,deltaTime){
        if (!this.#checkCurrentAnimation(['hit','die'])) {            
            if (this.live > 0) {
                this.live--;

                if (this.live == 0) {
                    this.Counters.die = 0;
                    this.#setAction('die');
                } else {
                    this.Counters.hit = 0;
                    this.#setAction('hit');
                }

                this.currentAnim.update(deltaTime);

                const knockbackForce = 5;
                const dx = this.position.x - playerPosition.x;
                const dy = this.position.y - playerPosition.y;
                const magnitude = Math.sqrt(dx * dx + dy * dy) || 1;

                this.position.x += (dx / magnitude) * knockbackForce;
                this.position.y += (dy / magnitude) * knockbackForce;

            } else {
                this.live = 0;

                if (this.live == 0) {
                    this.Counters.die = 0;
                    this.#setAction('die');
                } else {
                    this.Counters.hit = 0;
                    this.#setAction('hit');
                }

                this.currentAnim.update(deltaTime);
            }                                                
        }
    }

    setRewardGive(varValue){
        this.rewardGive = varValue;
    }

    setAttack(insideCollision){
        this.AttackMode      = insideCollision;        
    }

    setEnemyLive(levelId,Exponent){
        this.live  = 2 * Math.floor(Math.pow(levelId, Exponent));
        this.level =  levelId + Math.floor(Math.random() * 2)
    }

    /**
     * @param {string}  effectId  - Nome do efeito a ser manipulado
     * @param {boolean} value - atribuir ou desatribuir efeito
     */
    handleEffect(effectId,value){
        this.effects[effectId] = value;        
    }

    switchPlayerInFieldView(hasPlayer){
        this.playerInFieldView = hasPlayer;
    }

    updatePlayerPosition(playerPos){
        this.playerPosition.copy(playerPos);
    }
}