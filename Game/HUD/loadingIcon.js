import Texture  from "../../Engine/Utils/texture.js";

export default class loadingicon{
    /**
     * @param {Vector2D} position -Posição na tela
     * @param {number} size -tamanho do loading
     */
    constructor(position,size){
        this.position     = position;        
        this.size         = size;
        this.cooldown     = 0;
        this.icontexture  = new Texture("/Game/Assets/HUD/loadingIcons.png");        

        this.startX  = 3;    
        this.counter = 0;  
        this.timer   = 0;  
        
        this.loading = false;
    }

    updateIconTimer(){
        if(!this.loading){
            ctx.clearRect(this.position.x, this.position.y, this.size, this.size);
            return
        }

        if(this.timer == this.cooldown){
            this.counter++;  
            this.timer = 0
            this.addStartX();
        } else
            this.timer++;

        if(this.counter == 5){
            this.startX   = 3;
            this.counter  = 0;
            this.cooldown = 0;
            this.loading  = false;
        }
    }

    /** @param {number} cooldown -tempo em Segundos */
    startCooldown(cooldown){
        this.cooldown = cooldown * 12,5;
        this.loading  = true;

        this.updateIconTimer();
    }

    addStartX() {
        this.startX += 48;        
    }

    draw(ctx){      
        if(this.loading)          
            this.icontexture.draw(ctx, this.position.x,this.position.y,this.size,this.size,this.startX,51,42,42);                                         
    }
}