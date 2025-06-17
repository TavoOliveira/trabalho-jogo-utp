import Texture from "../../Engine/Utils/texture.js";

const bar_type = Object.freeze({
    1: 21, //tipo - 1 - azul
    2: 37, //tipo - 2 - verde
    3: 53, //tipo - 3 - cinza
    4: 85  //tipo - 4 - roxo
})

export default class HealthBar{
    constructor(position,type){
        this.position      = position;
        this.healthtexture = new Texture("/Game/Assets/HUD/HeathBar.png");

        this.bartype = type;

        this.startX = 3;        
    }

    addStartX() {
        this.startX += 48;        
    }

    subStartX() {
        this.startX -= 48;                
    }

    draw(ctx){                
        this.healthtexture.draw(ctx, this.position.x,this.position.y,350,50,this.startX,bar_type[this.bartype],42,7); 
    }
}