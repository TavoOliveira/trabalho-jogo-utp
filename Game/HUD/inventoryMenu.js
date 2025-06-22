import Icons from "../HUD/icons.js";
import Vector2D from "../../Engine/Utils/vector2d.js";

export default class InventoryMenu{
    /**
     * @param {Vector2D} position -Posição na tela
     * @param {Vector2D} size     -tamanho do menu de inventario    
     */
    constructor(position,size){
        this.position     = position;        
        this.size         = size;                                 
        
        this.centralMenu  = new Icons(this.position,this.size,'menu-1',4);    

        this.cansee       = false;
    }        

    updateSee(cansee){
        this.cansee = cansee;
    }      

    updateOnresize(){        
    }

    draw(ctx){         
        if(this.cansee){
            this.centralMenu.draw(ctx);
        }
    }
}