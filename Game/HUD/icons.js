import Texture  from "../../Engine/Utils/texture.js";
import Enums from "./HUD-enums/HUD_Enums.js";

export default class Icons{
    /**     
     * @param {Vector2D} position -Posição na tela
     * @param {number}   size     -tamanho do icone
     * @param {any}      key      -KEY - Minusculo ou numerico    
     * @param {number}   type     - 0-Teclado / 1-Mouse / 2-Icones uteis / 3-icones personagens     
     */
    constructor(position,size,key, type){
        this.position     = position;        
        this.size         = size; 
        this.typeId       = type;    
        this.keyId        = key;                  

        //Valor nulo padrão        
        this.icontexture = new Texture("/Game/Assets/HUD/iconset.png"); 
        this.KeyMap      = {x: 0,y: 0,sW: 0,sH: 0};            

        //Tempo e vizualização
        this.cansee   = true;
        this.counter  = 0;
        this.cooldown = 0;  
        this.timer    = 0;         

        this.setKeyMapAndTexture(this.typeId);
    }

    updateIconTimer(){
        if(!this.cansee){
            ctx.clearRect(this.position.x, this.position.y, this.size, this.size);
            return
        }

        if(this.timer == this.cooldown){
            this.counter++;  
            this.timer = 0            
        } else
            this.timer++;

        if(this.counter == 5){   
            this.counter  = 0;                     
            this.cooldown = 0;
            this.cansee   = false;
        }
    }

    /** @param {number} cooldown -tempo em Segundos */
    startCooldown(cooldown){
        this.cooldown = cooldown * 12,5;
        this.cansee   = true;

        this.updateIconTimer();
    }

    setKeyMapAndTexture(Type){
        switch(Type)
        {
            case 0:
                this.icontexture = new Texture("/Game/Assets/HUD/Icon_Keyboard.png");
                this.KeyMap      = Enums.Key_type[this.keyId];
                break;
            case 1:
                this.icontexture = new Texture("/Game/Assets/HUD/Icon_Mouse.png");
                this.KeyMap      = Enums.Key_type[this.keyId];
                break;
            case 2:
                this.icontexture = new Texture("/Game/Assets/HUD/iconset.png");                
                this.KeyMap      = Enums.icons[this.keyId];                
                break;
            case 3:
                this.icontexture = new Texture("/Game/Assets/HUD/PlayersIcons.png");
                this.KeyMap = Enums.playerIcon[this.keyId];
                break;
            default:
                this.icontexture = new Texture("/Game/Assets/HUD/iconset.png");
                this.KeyMap = {x: 0,y: 0,sW: 0,sH: 0};
                break;
        }

        if(this.KeyMap == null || this.KeyMap == undefined){
            this.KeyMap = {x: 0,y: 0,sW: 0,sH: 0};
        }
    }

    switchKey(newKey) {
        this.keyId = newKey;

        this.setKeyMapAndTexture(this.typeId)
    }

    updateSee(cansee){
        this.cansee = cansee;
    }

    draw(ctx){     
        if(this.cansee)                       
            this.icontexture.draw(ctx, this.position.x,this.position.y,
                                       this.size,this.size,
                                       this.KeyMap.x,this.KeyMap.y,
                                       this.KeyMap.sW,this.KeyMap.sH);                     
    }
}