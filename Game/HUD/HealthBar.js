import Texture  from "../../Engine/Utils/texture.js";
import Enums from "./HUD-enums/HUDEnums.js";

export default class HealthBar{
    constructor(position,type){
        this.position      = position;
        this.healthtexture = new Texture("/Game/Assets/HUD/HeathBar.png");

        this.bartype = Enums.bar_type[type];

        this.startX = 3;        
    }

    addStartX() {
        this.startX += 48;        
    }

    subStartX() {
        this.startX -= 48;                
    }

    draw(ctx){                
        this.healthtexture.draw(ctx, this.position.x,this.position.y,350,50,this.startX,this.bartype,42,7); 
    }
}