import Icons from "../HUD/icons.js";
import Vector2D from "../../Engine/Utils/vector2d.js";

export default class mainMenu {
    constructor(position, size) {
        this.position = position;
        this.size = size;

        this.onLoadSlot = null;

        this.centerBackground = new Icons(this.position, this.size, "", 6);
        this.removeCenterBKG = false;

        this.centralMenu = new Icons(this.position, this.size, 'menu-1', 4);
        this.savesMenu   = new Icons(new Vector2D(this.position.x + 750,this.position.y + 400), new Vector2D(700,400), 'menu-1', 4);
        
        this.buttons = [
            { label: "NOVO JOGO", icon: null, hover: false },
            { label: "CONTINUAR", icon: null, hover: false },
            { label: "SAIR",      icon: null, hover: false },
        ];

        this.subSlotsSelect = false;
        this.subSlots = [
            { label: "Slot 1", hover: false },
            { label: "Slot 2", hover: false },
            { label: "Slot 3", hover: false },
        ];
        
        this.buttons.forEach((btn, i) => {
            btn.icon = new Icons(
                new Vector2D(this.position.x + 200, this.position.y + 250 + (i * 150)),
                new Vector2D(500, 100),
                `mn-btn-style-1`, 4
            );
        });

        this.subSlots.forEach((slot, i) => {
            slot.icon = new Icons(
                new Vector2D(this.position.x + 850, this.position.y + 480 + (i * 100)),
                new Vector2D(500, 60),
                `mn-btn-style-1`, 4
            );
        });

        //SELECT
        this.selectedSlotIndex = 0;  		
        this.selectionIcon = new Icons(new Vector2D(0, 0), new Vector2D(0, 0), 'pointer-1', 3);

        this.cansee = false;
        this.selectionIndex = 0;
        this.blinkTimer = 0;
        this.blinkVisible = true;
    }

    updateSee(cansee) {
        this.cansee = cansee;

        if(!cansee)
            this.resetHoverStates();
    }

    updateIntro(intro) {
        this.removeCenterBKG = intro;
    }

    getSlotInfo(slotIndex) {
        const saveData = localStorage.getItem(`saveSlot${slotIndex}`);
        if (!saveData) return "vazio";

        try {
            const data = JSON.parse(saveData);
            const p1 = data.players?.[1]?.LevelId ?? 0;
            const p2 = data.players?.[2]?.LevelId ?? 0;
            const p4 = data.players?.[4]?.LevelId ?? 0;
            return `P1:${p1} P2:${p2} P4:${p4}`;
        } catch (e) {
            return "corrompido";
        }
    }

    switchHover(index, isSlot = false) {
        const list = isSlot ? this.subSlots : this.buttons;

        list.forEach((item, i) => {
            const hover = i == index;
            if (item.hover != hover) {
                item.hover = hover;
                item.icon.switchKey(`mn-btn-style-${hover ? '0' : '1'}`);
            }
            
            if (hover && item.icon) {
                this.selectionIcon.position = new Vector2D(
                    item.icon.position.x - 50,
                    item.icon.position.y + 10
                );

                this.selectionIcon.size = new Vector2D(
                    64,
                    64
                );
            }
        });
    }

    update(deltaTime) {
        this.blinkTimer += deltaTime;
        if (this.blinkTimer > 500) {
            this.blinkVisible = !this.blinkVisible;
            this.blinkTimer   = 0;

            const newkey = `pointer-${this.blinkVisible ? 1 : 3}`;

            if(newkey != this.selectionIcon.keyId){
                this.selectionIcon.switchKey(newkey);                                   
            }
        }
    }

    draw(ctx) {
        if (!this.cansee) 
            return;

        if (!this.removeCenterBKG) {
            this.centerBackground.draw(ctx);

            if (ctx && this.blinkVisible) {
                ctx.font = "5rem MONOGRAM";
                ctx.fillStyle = "white";
                ctx.textBaseline = "top";
                ctx.fillText(`DIGITE PARA CONTINUAR`,
                    document.documentElement.clientWidth / 2 - 320,
                    document.documentElement.clientHeight / 2 + 150
                );
            }
        } else {
            this.centralMenu.draw(ctx);            
            this.buttons.forEach((btn) => btn.icon.draw(ctx));
            this.selectionIcon.draw(ctx);
            
            this.savesMenu.draw(ctx)

            if (ctx) {
                ctx.fillStyle    = "white";
                ctx.textBaseline = "top";                                

                ctx.font = "10rem MONOGRAM";   
                ctx.fillText('SIGNAL', this.position.x + 940, this.position.y + 120);
                ctx.font = "8rem MONOGRAM";                             
                ctx.fillText('LOST', this.position.x + 1000, this.position.y + 220);                

                ctx.font = "4rem MONOGRAM";

                this.buttons.forEach((btn, i) => {                    
                    const textX = this.position.x + (i != 2 ? 350 : 400);
                    const textY = this.position.y + 260 + (i * 150);
                    ctx.fillText(btn.label, textX, textY);
                });                

                ctx.font = "3rem MONOGRAM";                
                ctx.fillText('JOGOS SALVOS', this.position.x + 990, this.position.y + 397);

                this.subSlots.forEach((slot, i) => {
                    slot.icon.draw(ctx);
                    const slotText = this.getSlotInfo(i + 1);
                    ctx.fillText(`${slot.label}: ${slotText}`, this.position.x + 900, this.position.y + 480 + (i * 100));
                });
            }
        }
    }
    
    navigate(direction) {
        if (this.subSlotsSelect) {
            if (direction === 'up') this.selectionIndex = (this.selectionIndex - 1 + 3) % 3;
            if (direction === 'down') this.selectionIndex = (this.selectionIndex + 1) % 3;
            this.switchHover(this.selectionIndex, true);
        } else {
            if (direction === 'up') this.selectionIndex = (this.selectionIndex - 1 + 3) % 3;
            if (direction === 'down') this.selectionIndex = (this.selectionIndex + 1) % 3;
            this.switchHover(this.selectionIndex, false);
        }
    }

    resetHoverStates() {
        this.buttons.forEach((btn) => {
            btn.hover = false;
            btn.icon.switchKey('mn-btn-style-1');
        });

        this.subSlots.forEach((slot) => {
            slot.hover = false;
            slot.icon.switchKey('mn-btn-style-1'); 
        });
    }
    
    confirmSelection() {
        if (this.subSlotsSelect) {
            const slot = this.selectionIndex + 1;            
            if (this.onLoadSlot) this.onLoadSlot(slot);          
        } else {
            const selected = this.buttons[this.selectionIndex].label;
            switch (selected) {
                case "NOVO JOGO":
                    if (typeof window.GameInstance?.startNewGame === 'function') {
                        window.GameInstance.startNewGame();
                    }
                    break;
                case "CONTINUAR":
                    this.subSlotsSelect = true;
                    this.selectionIndex = 0;
                    this.switchHover(0, true);
                    break;
                case "SAIR":
                    window.close();
                    break;
            }
        }
    }

    cancelSubMenu() {
        if (this.subSlotsSelect) {
            this.resetHoverStates();           
            this.subSlotsSelect = false;
            this.selectionIndex = 1; 
            this.switchHover(this.selectionIndex, false);
        }
    }

    deleteSlot(slotIndex) {
        localStorage.removeItem(`saveSlot${slotIndex}`);
    }

    onResize(newPosition, newSize) {
        this.position = newPosition;
        this.size = newSize;
        
        this.centerBackground.position = this.position;
        this.centerBackground.size     = this.size;

        this.centralMenu.position = this.position;
        this.centralMenu.size     = this.size;

        this.savesMenu.position = new Vector2D(this.position.x + 750, this.position.y + 400);
        this.savesMenu.size     = new Vector2D(700, 400);
        
        this.buttons.forEach((btn, i) => {
            btn.icon.position = new Vector2D(this.position.x + 200, this.position.y + 250 + (i * 150));
            btn.icon.size     = new Vector2D(500, 100);
        });
        
        this.subSlots.forEach((slot, i) => {
            slot.icon.position = new Vector2D(this.position.x + 850, this.position.y + 480 + (i * 100));
            slot.icon.size     = new Vector2D(500, 60);
        });

        this.switchHover(this.selectionIndex, this.subSlotsSelect);
    }

}
