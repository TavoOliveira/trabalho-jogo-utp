import Icons from "../HUD/icons.js";
import Vector2D from "../../Engine/Utils/vector2d.js";

export default class InventoryMenu{
    /**
     * @param {Vector2D} position -Posição na tela
     * @param {Vector2D} size     -tamanho do menu de inventario 
     * @param {number}   playerId -Id do player
     */
    constructor(position,size,playerId){
        this.position    = position;               
        this.size        = size;  
        this.playerId    = playerId;    
        
        this.inventIcons = [];
        this.inventSize  = 0;

        //SELECT
        this.selectedSlotIndex = 0;  
        this.selectionIcon = new Icons(new Vector2D(0, 0), new Vector2D(65, 65), 'icon-select-0', 4);
        
        //SLOTS E MENUS
        this.centralMenu  = new Icons(this.position,this.size,'menu-1',4);        
        this.weaponsSlots = new Icons(new Vector2D(this.position.x + 200,this.position.y + 370),new Vector2D(300,180),'slotMenu-1',4);        

        //INVENTARIO
        this.inventMenu   = new Icons(new Vector2D(this.position.x + 700,this.position.y + 100),new Vector2D(450,500),'menu-1',4)
        this.inventSlots  = new Icons(new Vector2D(this.position.x + 750,this.position.y + 180),new Vector2D(350,350),'slots-1',5);            

        //PLAYER
        this.playerMenu = new Icons(new Vector2D(this.position.x + 150,this.position.y + 100),new Vector2D(400,500),'menu-1',4);
        this.playerName = new Icons(new Vector2D(this.position.x + 240,this.position.y + 335),new Vector2D(220,30),'mn-btn-style-1',4);
        this.playerIcon = new Icons(new Vector2D(this.position.x + 315,this.position.y + 210),new Vector2D(70,80),`bd-${this.playerId}`,3);
        this.playerSlot = new Icons(new Vector2D(this.position.x + 287,this.position.y + 170),new Vector2D(130,160),'slot-1',5);

        //ARMADURA
        this.armor_H = new Icons(new Vector2D(this.position.x + 235,this.position.y + 190),new Vector2D(50,50),'slot-1',5);
        this.armor_T = new Icons(new Vector2D(this.position.x + 235,this.position.y + 260),new Vector2D(50,50),'slot-1',5);
        this.armor_B = new Icons(new Vector2D(this.position.x + 418,this.position.y + 190),new Vector2D(50,50),'slot-1',5);
        this.armor_C = new Icons(new Vector2D(this.position.x + 418,this.position.y + 260),new Vector2D(50,50),'slot-1',5);

        this.null_armorIcon_H = new Icons(new Vector2D(this.position.x + 248,this.position.y + 201),new Vector2D(25,25),'null-H',3);
        this.null_armorIcon_T = new Icons(new Vector2D(this.position.x + 248,this.position.y + 271),new Vector2D(25,25),'null-T',3);
        this.null_armorIcon_B = new Icons(new Vector2D(this.position.x + 430,this.position.y + 201),new Vector2D(25,25),'null-B',3);
        this.null_armorIcon_C = new Icons(new Vector2D(this.position.x + 430,this.position.y + 271),new Vector2D(25,25),'null-C',3);

        this.armorIcon_H = new Icons(new Vector2D(this.position.x + 243,this.position.y + 197),new Vector2D(35,35),'',0);
        this.armorIcon_T = new Icons(new Vector2D(this.position.x + 243,this.position.y + 267),new Vector2D(35,35),'',0);
        this.armorIcon_B = new Icons(new Vector2D(this.position.x + 428,this.position.y + 195),new Vector2D(35,35),'',0);
        this.armorIcon_C = new Icons(new Vector2D(this.position.x + 425,this.position.y + 270),new Vector2D(35,35),'',0);

		//AJUDA
		this.equipHelp   = new Icons(new Vector2D(this.position.x + 155,this.position.y + 620),new Vector2D(40,40),'e',0);
		this.discartHelp = new Icons(new Vector2D(this.position.x + 490,this.position.y + 620),new Vector2D(40,40),'r',0);
		this.infoHelp    = new Icons(new Vector2D(this.position.x + 820,this.position.y + 620),new Vector2D(40,40),'d',0);

        //ARMAS                
        this.weapon1 = new Icons(new Vector2D(this.position.x + 255, this.position.y + 440), new Vector2D(50,50), `${this.playerId}-wp-1`,2);
        this.weapon2 = new Icons(new Vector2D(this.position.x + 390, this.position.y + 440), new Vector2D(50,50), `${this.playerId}-wp-2`,2);

        this.cansee = false;

        //ATUALIZAÇÃO:
        this.cooldown = 4 * 12.5;                 
        this.timer    = 0;   
        
        // Animação de respiração
		this.breathTime = 0;
		this.iconBaseY  = this.playerIcon.position.y;

        this.setSlots();
    }        

    updateSee(cansee){
        this.cansee = cansee;
    } 
    
    updateIcons() {
		if (!this.cansee) {
			return;
		}		                
		
		if (this.timer >= this.cooldown) {			
			this.timer = 0;
                        
            const amplitude = 3;          
            const speed     = 2; 
            let   offsetY   = 0.0;  
            if(this.breathTime == 0){
                this.breathTime = 1
                offsetY   = Math.sin(2 * speed) * amplitude
            } else {
                this.breathTime = 0
                offsetY   = Math.sin(-2 * speed) * amplitude
            }                                

            const newkey = `icon-select-${this.breathTime}`;

            if(newkey != this.selectionIcon.keyId){
                this.selectionIcon.switchKey(`icon-select-${this.breathTime}`);                                   
            }

            this.playerIcon.position.set(this.playerIcon.position.x,this.iconBaseY + offsetY);
		} else {
			this.timer++;
		}
	}

    updateInventoryIcons(inventory) {        
        const items = inventory.getItems();

        const slotsPerRow = 4;
        const slotSize    = new Vector2D(50, 50);        

        const slotAreaSize = 79; 
        const startX = this.position.x + 770;
        const startY = this.position.y + 195;

        if(this.inventSize != items.length){
            this.inventIcons   = [];       
            
            this.maxScroll = Math.max(0, (Math.ceil(items.length / slotsPerRow) * slotAreaSize) - this.inventSlots.size.y);

            items.forEach((itemId, index) => {
                const col = index % slotsPerRow;
                const row = Math.floor(index / slotsPerRow);

                const slotX = startX + (col * slotAreaSize);
                const slotY = startY + (row * slotAreaSize);
                
                const posX = slotX + ((slotAreaSize - slotSize.x) / 2);
                const posY = slotY + ((slotAreaSize - slotSize.y) / 2);                

                const icon = new Icons(new Vector2D(posX, posY), slotSize, `${itemId.keyID}`, itemId.textureId);
                this.inventIcons.push(icon);
            });

            this.inventSize = items.length;
        }
    }

    updateSelectionIcon() {
        if (this.slotPositions.length > 0 && this.selectedSlotIndex >= 0 && this.selectedSlotIndex < this.slotPositions.length) {
            const targetPos = this.slotPositions[this.selectedSlotIndex];
            this.selectionIcon.position.set(
                targetPos.x + (50 / 2) - (70 / 2),  
                targetPos.y + (50 / 2) - (65 / 2)  
            );
        }
    }

    updateOnresize(){  		
		this.inventMenu.position.set(this.position.x + 700,this.position.y + 100);
        this.inventSlots.position.set(this.position.x + 750,this.position.y + 180);

		this.weaponsSlots.position.set(this.position.x + 200,this.position.y + 370);

        //PLAYER
        this.playerMenu.position.set(this.position.x + 150,this.position.y + 100);
        this.playerName.position.set(this.position.x + 240,this.position.y + 335);
        this.playerIcon.position.set(this.position.x + 315,this.position.y + 210); 
        this.playerSlot.position.set(this.position.x + 287,this.position.y + 170); 

        //ARMADURA
        this.armor_H.position.set(this.position.x + 235,this.position.y + 190);
        this.armor_T.position.set(this.position.x + 235,this.position.y + 260);
        this.armor_B.position.set(this.position.x + 418,this.position.y + 190);
        this.armor_C.position.set(this.position.x + 418,this.position.y + 260);

        this.null_armorIcon_H.position.set(this.position.x + 248,this.position.y + 201);
        this.null_armorIcon_T.position.set(this.position.x + 248,this.position.y + 271);
        this.null_armorIcon_B.position.set(this.position.x + 430,this.position.y + 201);
        this.null_armorIcon_C.position.set(this.position.x + 430,this.position.y + 271);

        this.armorIcon_H.position.set(this.position.x + 243,this.position.y + 197);
        this.armorIcon_T.position.set(this.position.x + 243,this.position.y + 267);
        this.armorIcon_B.position.set(this.position.x + 428,this.position.y + 195);
        this.armorIcon_C.position.set(this.position.x + 425,this.position.y + 270);

		//AJUDA
		this.equipHelp.position.set(this.position.x + 155,this.position.y + 620);
		this.discartHelp.position.set(this.position.x + 490,this.position.y + 620);
		this.infoHelp.position.set(this.position.x + 820,this.position.y + 620);

        //ARMAS                
        this.weapon1.position.set(this.position.x + 255,this.position.y + 440);
        this.weapon2.position.set(this.position.x + 390,this.position.y + 440);

		this.inventSize 	   = 0;
		this.selectedSlotIndex = 0;

		this.setSlots();
    }

    setSlots() {
        this.slotPositions = [];

        const slotsPerRow = 4;
        const slotSize = new Vector2D(50, 50);
        const slotAreaSize = 79;
        const startX = this.position.x + 770;
        const startY = this.position.y + 195;

        for (let i = 0; i < 16; i++) {
            const col = i % slotsPerRow;
            const row = Math.floor(i / slotsPerRow);

            const slotX = startX + (col * slotAreaSize);
            const slotY = startY + (row * slotAreaSize);

            const posX = slotX + ((slotAreaSize - slotSize.x) / 2);
            const posY = slotY + ((slotAreaSize - slotSize.y) / 2);

            this.slotPositions.push(new Vector2D(posX, posY));
        }
    }

    draw(ctx){         
        if(this.cansee){
            //=== MENUS E SLOTS ===
            this.centralMenu.draw(ctx);
            this.playerMenu.draw(ctx);
            this.inventMenu.draw(ctx);

            this.playerSlot.draw(ctx);
            this.playerName.draw(ctx);
            this.weaponsSlots.draw(ctx);            
            this.inventSlots.draw(ctx);             
            
            //ARMADURAS
            this.armor_H.draw(ctx);
            this.null_armorIcon_H.draw(ctx);
			this.armorIcon_H.draw(ctx);

            this.armor_T.draw(ctx);
            this.null_armorIcon_T.draw(ctx);
			this.armorIcon_T.draw(ctx);

            this.armor_B.draw(ctx);
            this.null_armorIcon_B.draw(ctx);
			this.armorIcon_B.draw(ctx);

            this.armor_C.draw(ctx); 
            this.null_armorIcon_C.draw(ctx);                           
			this.armorIcon_C.draw(ctx);

            //INFORMATIVOS
            this.playerIcon.draw(ctx);

            //=== ARMAS E ITENS ===
            this.weapon1.draw(ctx);
            this.weapon2.draw(ctx);

			//AJUDA
			this.equipHelp.draw(ctx);
			this.discartHelp.draw(ctx);
			this.infoHelp.draw(ctx);

            this.inventIcons.forEach(icon => {
                const originalY = icon.position.y;
                icon.position.y = originalY - this.scrollOffset;
                icon.draw(ctx);
                icon.position.y = originalY; 
            });

            this.selectionIcon.draw(ctx);

            if(ctx != null){
                ctx.font         = "4rem MONOGRAM";//tiulos
                ctx.fillStyle    = "white";
                ctx.textBaseline = "top";

                ctx.fillText(`INVENTARIO`, this.position.x + 520, this.position.y+5);  //TOPO    
                
                ctx.font = "3rem MONOGRAM"; //sub titulos

				//=== AJUDA ===
				ctx.fillText(`- EQUIPAR ITEM`, this.position.x + 210, this.position.y + 615);  //- ajuda
				ctx.fillText(`- REMOVER ITEM`, this.position.x + 540, this.position.y + 615);  //- ajuda
				ctx.fillText(`- DADOS DO ITEM`, this.position.x + 870, this.position.y + 615);  //- ajuda

				//PLAYER E ITENS
                ctx.fillText(`JOGADOR`, this.position.x + 283, this.position.y + 105);  //- player
                ctx.fillText(`ITENS`, this.position.x + 880, this.position.y + 105);    //- Itens

                ctx.font = "2rem MONOGRAM"; //textos
                ctx.fillText(`ARMAS`, this.position.x + 319, this.position.y + 368);  //- player
                ctx.fillText(`${this.playerId == 1 ? "Gustren" :
                                this.playerId == 2 ? "Otavion" : 
                                this.playerId == 4 ? "Nikarel" : ""}`, this.position.x + 305, this.position.y + 330); //TOPO - player Name
            }
        }
    }
}