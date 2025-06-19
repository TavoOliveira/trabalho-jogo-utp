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
        this.KeyMap = {x: 0,y: 0,sW: 0,sH: 0};            

        this.setKeyMapAndTexture(this.typeId);
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
    }

    switchKey(newKey) {
        this.keyId = newKey;

        this.setKeyMapAndTexture(this.typeId)
    }

    draw(ctx){                            
        this.icontexture.draw(ctx, this.position.x,this.position.y,
                                   this.size,this.size,
                                   this.KeyMap.x,this.KeyMap.y,
                                   this.KeyMap.sW,this.KeyMap.sH);                     
    }
}