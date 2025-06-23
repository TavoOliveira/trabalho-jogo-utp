import Icons from "../HUD/icons.js";
import Vector2D from "../../Engine/Utils/vector2d.js";

export default class menu{
    /**
     * @param {Vector2D} position -Posição na tela
     * @param {Vector2D} size       -tamanho do menu     
     */
    constructor(position,size){
        this.position     = position;        
        this.size         = size;                        
        
        this.centralMenu  = new Icons(this.position,this.size,'menu-1',4);
        this.hoverbtn1    = false;
        this.btn1         = new Icons(new Vector2D(this.position.x + 70,this.position.y + 120),new Vector2D(210,50),`mn-btn-style-${this.hoverbtn1 ? '0' : '1'}`,4);

        this.hoverbtn2    = false;
        this.btn2         = new Icons(new Vector2D(this.position.x + 70,this.position.y + 200),new Vector2D(210,50),`mn-btn-style-${this.hoverbtn2 ? '0' : '1'}`,4);

        this.hoverbtn3    = false;
        this.btn3         = new Icons(new Vector2D(this.position.x + 70,this.position.y + 280),new Vector2D(210,50),`mn-btn-style-${this.hoverbtn3 ? '0' : '1'}`,4);

        this.cansee       = false;
    }        

    updateSee(cansee){
        this.cansee = cansee;
    }

    switchHover(objId, SwitchValue) {
        switch (objId) {
            case 'btn1':
                if (this.hoverbtn1 !== SwitchValue) {
                    this.hoverbtn1 = SwitchValue;
                    this.btn1.switchKey(`mn-btn-style-${this.hoverbtn1 ? '0' : '1'}`);
                }
                break;
            case 'btn2':
                if (this.hoverbtn2 !== SwitchValue) {
                    this.hoverbtn2 = SwitchValue;
                    this.btn2.switchKey(`mn-btn-style-${this.hoverbtn2 ? '0' : '1'}`);
                }
                break;
            case 'btn3':
                if (this.hoverbtn3 !== SwitchValue) {
                    this.hoverbtn3 = SwitchValue;
                    this.btn3.switchKey(`mn-btn-style-${this.hoverbtn3 ? '0' : '1'}`);
                }
                break;
        }
    }    

    updateOnresize(){
        this.btn1.position.set(this.position.x + 70,this.position.y + 120);
        this.btn2.position.set(this.position.x + 70,this.position.y + 200);
        this.btn3.position.set(this.position.x + 70,this.position.y + 280);
    }

    draw(ctx){         
        if(this.cansee){
            this.centralMenu.draw(ctx); 
            this.btn1.draw(ctx);  
            this.btn2.draw(ctx);     
            this.btn3.draw(ctx);  

            if(ctx != null){
                ctx.font = "2rem MONOGRAM";
                ctx.fillStyle = "white";
                ctx.textBaseline = "top";
                ctx.fillText(`PAUSA`, this.position.x + 142, this.position.y + 10);  //TOPO
                ctx.fillText(`VOLTAR`, this.position.x + 139, this.position.y + 125);   //BOTÃO 1
                ctx.fillText(`CONFIG`, this.position.x + 139, this.position.y + 205); //BOTÃO 2
                ctx.fillText(`SAIR`, this.position.x + 152, this.position.y + 285);   //BOTÃO 3
            }
        }
    }
}