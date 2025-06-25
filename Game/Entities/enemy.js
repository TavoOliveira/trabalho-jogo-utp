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
        this.AttackMode = false;
        this.effects    = {shocked: false,poisoned: false,bleeding: false,immunity:false};

        this.speed    = Vector2D.one(0.5);
        this.moveDir  = Vector2D.zero();    
                
        this.sprites_offset = Enums.sprites_offset[`e-${this.enemyId}`];
        
        // === HITBOX / ANIMATIONS / TIMES / COUNTER === 
        this.Counters          = {die: 0, attack: 0, HB: 0,hit: 0}; 
        this.playerInFieldView = false;   
        this.playerPosition    = new Vector2D(0,0);            
        switch (this.enemyId) {
            case 1:
                this.viewField  = new RectHitbox(this, new Vector2D(-400,-400), 800, 800,"blue");
                this.HBhitbox   = new RectHitbox(this, new Vector2D(-50,-50), 100, 100,"orange");
                this.attackbox  = new RectHitbox(this, new Vector2D(-45,-45), 90, 90,"yellow");
                this.hitbox     = new RectHitbox(this, new Vector2D(-15,-15), 30, 30,"red");
                this.animations = {
                    hit:      new Animator('hit',      this.texture, 100, 100, 0, 400, 4,  5),
                    die:      new Animator('die',      this.texture, 100, 100, 0, 500, 4,  4),
                    idle:     new Animator('idle',     this.texture, 100, 100, 0, 0,   6,  8),
                    walk:     new Animator('walk',     this.texture, 100, 100, 0, 100, 8, 12),
                    attack_1: new Animator('attack_1', this.texture, 100, 100, 0, 300, 6, 12),
                };
                this.times = {attack: 2,die: 6,hit: 4};
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
                
                this.texture.flipX = direction.x < 0;

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
                this.Counters.attack = 0;
                this.#setAction('attack_1')
            }
        }

        this.#move();           

        if(this.live > 0 || this.times.die > this.Counters.die)
            this.currentAnim.update(deltaTime);                    
    }

    draw(ctx) {
        if(GlobalVars.devMode){
            this.hitbox.draw(ctx);
            this.viewField.draw(ctx);
            this.attackbox.draw(ctx);
            this.HBhitbox.draw(ctx);
        }
        this.currentAnim.draw(ctx, new Vector2D(this.position.x - 50,this.position.y - 50));
    }

    //Utilidades
    subEnemyLife(playerPosition,deltaTime){
        if (!this.#checkCurrentAnimation(['hit', 'die'])) {            
            if (this.live > 0) {
                this.live--;

                // Knockback
                const knockbackForce = 50;
                const dx = this.position.x - playerPosition.x;
                const dy = this.position.y - playerPosition.y;
                const magnitude = Math.sqrt(dx * dx + dy * dy) || 1;

                this.position.x += (dx / magnitude) * knockbackForce;
                this.position.y += (dy / magnitude) * knockbackForce;

            } else {
                this.live = 0;
            }

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

    setAttack(insideCollision){
        this.AttackMode = insideCollision;
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
