// === / UTILIDADES / ===
import Texture  from "../../Engine/Utils/texture.js";

// === / ENUMS GLOBAIS / ===
import Enums from "./HUD-enums/HUD_Enums.js";

export default class HealthBar{
    constructor(position,type){
        this.position      = position;
        this.healthtexture = new Texture("/Game/Assets/HUD/HeathBar.png");

        this.bartype = Enums.bar_type[type];

        this.startX = 3;        
    }

    addOrSubStartX(type) {
        if(type)
            this.startX += 48;        
        else
            this.startX -= 48;    
    }

    setStarX(live){
        switch (live) {
            case 0:   
                this.startX = 195;                           
                break;
            case 1:   
                this.startX = 147; 
                break;
            case 2:                
                this.startX = 99;                 
                break;
            case 3:                              
                this.startX = 51;                 
                break;
            case 4:     
                this.startX = 3;                            
                break;
            default:
                break;
        }
    }

    draw(ctx){                
        this.healthtexture.draw(ctx, this.position.x,this.position.y,350,50,this.startX,this.bartype,42,7); 
    }
}