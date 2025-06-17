import Texture  from "../../Engine/Utils/texture.js";
import Enums from "./HUD-enums/HUDEnums.js";

export default class InfoIcons{
    /**
     * @param {Vector2D} position -Posição na tela
     * @param {number} size       -tamanho do icone
     * @param {number} key        -KEY - Minusculo
     * @param {number} type       -tipo (0-Teclado,1-Mouse)
     */
    constructor(position,size,key,type){
        this.position     = position;        
        this.size         = size;        
        this.icontexture  = new Texture(type == 0 ? "/Game/Assets/HUD/Icon_Keyboard.png" : "/Game/Assets/HUD/Icon_Mouse.png");        

        this.KeyMap       = Enums.Key_type[key.toLowerCase()];                          
    }

    draw(ctx){                            
        this.icontexture.draw(ctx, this.position.x,this.position.y,
                                    this.size,this.size * 1,
                                    this.KeyMap.x,this.KeyMap.y,
                                    this.KeyMap.sW,this.KeyMap.sH);                     
    }
}