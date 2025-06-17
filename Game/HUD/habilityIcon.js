import Texture  from "../../Engine/Utils/texture.js";
import Enums from "./HUD-enums/HUDEnums.js";

export default class habilityIcon{
    /**
     * @param {Vector2D} position -Posição na tela
     * @param {number} size -tamanho do loading
     * @param {number} type -tipo do estilo
     */
    constructor(position,size,type){
        this.position     = position;        
        this.size         = size;        
        this.icontexture  = new Texture("/Game/Assets/HUD/UtilityIcons.png");        

        this.typeMap      = Enums.UtilityIcon_type[type];                
        this.startX       = this.typeMap.x;
        this.startY       = this.typeMap.y;      
                
        //tempo padrão de atualização
        this.cooldown     = 2 * 12,5;
        this.counter      = 0;
        this.timer        = 0;
        
        this.moving       = false
    }

    addStartX() {
        this.startX += 16;        
    }

    setMoving(mode){
        this.moving = mode;        
    }
    
    updateIcon(){     
        if(this.moving){
            this.startX = this.typeMap.x;            
            return;
        }
        
        if(this.timer == this.cooldown){
            this.counter++;  
            this.timer = 0
            this.addStartX();
        } else
            this.timer++;

        if(this.counter == 4){
            this.startX  = this.typeMap.x;
            this.counter = 0;                       
        }    
    }

    draw(ctx){                            
        this.icontexture.draw(ctx, this.position.x,this.position.y,this.size,this.size,this.startX,this.startY,16,16);                     
    }
}