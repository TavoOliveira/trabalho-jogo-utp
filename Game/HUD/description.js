import Icons from "../HUD/icons.js";
import Vector2D from "../../Engine/Utils/vector2d.js";
import Enums from "./HUD-enums/HUD_Enums.js";

export default class descriptions{
    /**
     * @param {Vector2D} position -Posição na tela
     * @param {Vector2D} size     -tamanho do menu de informações 
     * @param {any}      itemId   -Id do item
     */
    constructor(position,size,itemId){
        this.position = position;
        this.size     = size;
        this.itemId   = itemId;        

        this.descriptionLayout = new Icons(this.position,this.size,'menu-1',4);
        this.escButton         = new Icons(new Vector2D(this.position.x + 550,this.position.y + 7),new Vector2D(25,25),'esc',0); 

        this.cansee = false;
    }

    /**
     * @param {any} newItemId - Identificação do Item (Nulo = 'not' - Aviso que não pode ser removido)
    */
    switchItemId(newItemId = 'not'){
        this.itemId = newItemId;
    }

    /**
     * @param {boolean} canSee - True - a descrição ira aparecer / false - a descrição não ira aparecer
    */
    updateSee(canSee = false){
        this.cansee = canSee;
    }

    OnResize(){
        this.descriptionLayout.position.set(this.position);
        this.escButton.position.set(this.position.x + 550, this.position.y + 7);
    }

    draw(ctx){
        if(this.cansee){
            this.descriptionLayout.draw(ctx);
            this.escButton.draw(ctx);

            if(ctx){
                ctx.font         = "3rem MONOGRAM";//textos
                ctx.fillText('DADOS',this.position.x + 245,this.position.y - 5);

                ctx.font         = "2rem MONOGRAM";//textos
                ctx.fillStyle    = "white";
                ctx.textBaseline = "top";

                this.drawTextWithWrap(
                    ctx,
                    Enums.descriptions[this.itemId] || "Ninguem fez texto pro item ¯\\_(ツ)_/¯",
                    this.position.x + 60,
                    this.position.y + 70,
                    490, 
                    35   
                );
            }
        }
    }

    drawTextWithWrap(ctx, text, x, y, maxWidth, lineHeight) {
        if(text){
            const paragraphs = text.split('\n');
            let currentY = y;

            for (let p = 0; p < paragraphs.length; p++) {
                const words = paragraphs[p].split(' ');
                let line = '';

                for (let n = 0; n < words.length; n++) {
                    const testLine = line + words[n] + ' ';
                    const testWidth = ctx.measureText(testLine).width;

                    if (testWidth > maxWidth && line !== '') {
                        ctx.fillText(line, x, currentY);
                        line = words[n] + ' ';
                        currentY += lineHeight;
                    } else {
                        line = testLine;
                    }
                }
                ctx.fillText(line, x, currentY);
                currentY += lineHeight;
            }
        }
    }

}