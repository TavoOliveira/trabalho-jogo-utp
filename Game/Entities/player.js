//HUD
import XPBar from "../HUD/XPBar.js";
import Icons from "../HUD/icons.js";
import Layout from "../HUD/Layout.js";
import Weapons from "../HUD/weapons.js"
import mouse_dots from "../HUD/dots.js";
import HealthBar from "../HUD/HealthBar.js";
import loadingicon from "../HUD/loadingIcon.js";
import Enums from "../HUD/HUD-enums/HUD_Enums.js";
import GlobalVars from "../HUD/HUD-Vars/HUDGlobalVars.js";

//Menus gerais
import menu from "../HUD/menu.js";
import InventoryMenu from "../HUD/inventoryMenu.js"

//Util
import Texture from "../../Engine/Utils/texture.js";
import Vector2D from "../../Engine/Utils/vector2d.js";
import KeysState from "../../Engine/Enums/key-state.js";
import Animator from "../../Engine/Animator/animator.js";
import GameObject from "../../Engine/Utils/game-object.js";
import { Hitbox, RectHitbox } from "../../Engine/Collision/index.js";

export default class Player extends GameObject {
    /**
     * @param {Texture}   texture
     * @param {Vector2D}  position
     * @param {keyboard}  keyboard
     * @param {mouse}     mouse
     * @param {number}    playerId
     * @param {inventory} inventory
     */
    constructor(texture, position, keyboard, mouse, playerId, inventory) {
        const global_width    = document.documentElement.clientWidth;
        const global_height   = document.documentElement.clientHeight;        

        super(texture, position);
        this.keyboard = keyboard;
        this.mouse    = mouse;
        this.speed    = Vector2D.one(5); //5 para testes
        this.moveDir  = Vector2D.zero();

        this.animations = {
            walk: new Animator('walk', this.texture, 32, 32, 0, 0, 8, 10),
            idle: new Animator('idle', this.texture, 32, 32, 0, 0, 1, 0)
        }

        this.hitbox = new RectHitbox(this, new Vector2D(10, 12), 12, 20);

        this.currentAnim = this.animations.idle;
        this.currentAnim.play();

        //inventario
        this.inventory = inventory;        

        //player
        this.PlayerId      = playerId;
        this.currentPlayer = false;

        this.LevelId  = 1;
        this.XPNum    = 0.0; 

        this.live    = 5;                   
        
        // MENUS
        this.mainMenu      = new menu(new Vector2D((global_width / 2) - 200,(global_height / 2) - 250),new Vector2D(350,500));
        this.InventoryMenu = new InventoryMenu(new Vector2D((global_width / 2) - 650,(global_height / 2) - 370),new Vector2D(1300,750),this.PlayerId);

        // HUD  
        this.Mousedot = new mouse_dots(new Texture(Enums.dots_Id[this.PlayerId]),35);   
        
        //armas
        this.currentWeapon = new Weapons(1);
        
        // === BARRA SUPERIOR ===
        this.CharacterLayout = new Layout(new Vector2D(global_width * 0.01, global_height * 0.02), 70, this.PlayerId, 1);
        this.CharacterIcon   = new Icons(new Vector2D(global_width * 0.015, global_height * 0.035),new Vector2D(50,50), this.PlayerId, 3);
        this.HealthBar       = new HealthBar(new Vector2D(global_width * 0.07, global_height * 0.01), this.PlayerId);                
        this.XPBar           = new XPBar(new Vector2D(global_width * 0.07, global_height * 0.08),this.LevelId,this.XPNum);
        
        this.MinimapLayout      = new Layout(new Vector2D(global_width * 0.8, global_height * 0.04), 250, `m-${this.PlayerId}`, 0);
        this.minimapCenter_icon = new Icons(new Vector2D((global_width * 0.8) + (250 / 2) - 15, (global_height * 0.04) + (250 / 2) - 15),new Vector2D(30,30), 'map-icon', 2);        
                
        // === BARRA INFERIOR ===
        // Poção de Cura
        this.icon_potion       = new Icons(new Vector2D(GlobalVars.potionX + GlobalVars.potionIconOffset, GlobalVars.potionY - 30),new Vector2D(20,20),"v",0);
        this.layoutHB_potion   = new Layout(new Vector2D(GlobalVars.potionX, GlobalVars.potionY),50,this.PlayerId);      
        this.iconCancel_potion = new Icons(new Vector2D(GlobalVars.potionX + GlobalVars.potionOffset, GlobalVars.potionY + GlobalVars.potionOffset),new Vector2D(30,30),"x",2);
        this.iconHB_potion     = new Icons(new Vector2D(GlobalVars.potionX + GlobalVars.potionOffset, GlobalVars.potionY + GlobalVars.potionOffset),new Vector2D(30,30),"hpt",2);
        this.loadingHB_potion  = new loadingicon(new Vector2D(GlobalVars.potionX + GlobalVars.potionOffset, GlobalVars.potionY + GlobalVars.potionOffset),30);

        this.iconCancel_potion.updateSee(false);//Desliga o aviso de cancelado

        // Icone de Botão no D-Pad      
        this.icon_up    = new Icons(new Vector2D(GlobalVars.dpad_centerX + GlobalVars.icon_offset, GlobalVars.dpad_centerY - GlobalVars.offset - GlobalVars.icon_vertical_spacing), new Vector2D(30,30), "q",0);
        this.icon_down  = new Icons(new Vector2D(GlobalVars.dpad_centerX + GlobalVars.icon_offset, GlobalVars.dpad_centerY + GlobalVars.offset - GlobalVars.icon_vertical_spacing), new Vector2D(30,30), "x",0);
        this.icon_left  = new Icons(new Vector2D(GlobalVars.dpad_centerX - GlobalVars.offset + GlobalVars.icon_offset, GlobalVars.dpad_centerY - GlobalVars.icon_vertical_spacing), new Vector2D(30,30), "z",0);
        this.icon_right = new Icons(new Vector2D(GlobalVars.dpad_centerX + GlobalVars.offset + GlobalVars.icon_offset, GlobalVars.dpad_centerY - GlobalVars.icon_vertical_spacing), new Vector2D(30,30), "e",0);

        // Layout do D-Pad
        this.layoutHB_up    = new Layout(new Vector2D(GlobalVars.dpad_centerX, GlobalVars.dpad_centerY - GlobalVars.offset), 70, this.PlayerId);
        this.layoutHB_down  = new Layout(new Vector2D(GlobalVars.dpad_centerX, GlobalVars.dpad_centerY + GlobalVars.offset), 70, this.PlayerId);
        this.layoutHB_left  = new Layout(new Vector2D(GlobalVars.dpad_centerX - GlobalVars.offset, GlobalVars.dpad_centerY), 70, this.PlayerId);
        this.layoutHB_right = new Layout(new Vector2D(GlobalVars.dpad_centerX + GlobalVars.offset, GlobalVars.dpad_centerY), 70, this.PlayerId);                

        //Icones das habilidades - itens
        this.iconHB_up    = new Icons(new Vector2D(GlobalVars.dpad_centerX + GlobalVars.loading_offset, GlobalVars.dpad_centerY - GlobalVars.offset + GlobalVars.loading_offset), new Vector2D(50,50), `${this.PlayerId}-q`,2);
        this.iconHB_down  = new Icons(new Vector2D(GlobalVars.dpad_centerX + GlobalVars.loading_offset, GlobalVars.dpad_centerY + GlobalVars.offset + GlobalVars.loading_offset), new Vector2D(50,50), `${this.PlayerId}-x`,2);
        this.iconHB_left  = new Icons(new Vector2D(GlobalVars.dpad_centerX - GlobalVars.offset + GlobalVars.loading_offset, GlobalVars.dpad_centerY + GlobalVars.loading_offset), new Vector2D(50,50), `${this.PlayerId}-z`,2);
        this.iconHB_right = new Icons(new Vector2D(GlobalVars.dpad_centerX + GlobalVars.offset + GlobalVars.loading_offset, GlobalVars.dpad_centerY + GlobalVars.loading_offset), new Vector2D(50,50), `${this.PlayerId}-wp-${this.currentWeapon.WeaponId}`,2);

        // Loadings centralizado
        this.loadingHB_up    = new loadingicon(new Vector2D(GlobalVars.dpad_centerX + GlobalVars.loading_offset, GlobalVars.dpad_centerY - GlobalVars.offset + GlobalVars.loading_offset), 50);
        this.loadingHB_down  = new loadingicon(new Vector2D(GlobalVars.dpad_centerX + GlobalVars.loading_offset, GlobalVars.dpad_centerY + GlobalVars.offset + GlobalVars.loading_offset), 50);
        this.loadingHB_left  = new loadingicon(new Vector2D(GlobalVars.dpad_centerX - GlobalVars.offset + GlobalVars.loading_offset, GlobalVars.dpad_centerY + GlobalVars.loading_offset), 50);
        this.loadingHB_right = new loadingicon(new Vector2D(GlobalVars.dpad_centerX + GlobalVars.offset + GlobalVars.loading_offset, GlobalVars.dpad_centerY + GlobalVars.loading_offset), 50);                

        //Player Switch      
        this.switchMode = false;
        
        //Centro
        this.layoutSwitch_center   = new Layout(new Vector2D(GlobalVars.dpad2_centerX, GlobalVars.dpad_centerY + GlobalVars.offset),70,this.PlayerId);
        this.iconSwitch_center     = new Icons(new Vector2D(GlobalVars.dpad2_centerX + GlobalVars.icon_offset, GlobalVars.dpad_centerY + 90 - 40),new Vector2D(30,30),"alt",0);                        
        this.CharacterIcon_Center  = new Icons(new Vector2D(GlobalVars.dpad2_centerX + 10, GlobalVars.dpad_centerY + 100),new Vector2D(50,50),'switch',2);

        //Cima - player 1
        this.layoutSwitch_up       = new Layout(new Vector2D(GlobalVars.dpad2_centerX + 5, GlobalVars.dpad_centerY - GlobalVars.offset + 70),60,1,1);
        this.iconSwitch_ArrowUp    = new Icons(new Vector2D(GlobalVars.dpad2_centerX + GlobalVars.icon_offset, GlobalVars.dpad_centerY + 90 - 40),new Vector2D(30,30),"up",0);        
        this.CharacterIcon_Up      = new Icons(new Vector2D(GlobalVars.dpad2_centerX + 15, GlobalVars.dpad_centerY - 5),new Vector2D(40,40),1,3);
        this.iconCancel_player1    = new Icons(new Vector2D(GlobalVars.dpad2_centerX + 15, GlobalVars.dpad_centerY - 5),new Vector2D(40,40),"x",2);
        if(this.PlayerId != 1) this.iconCancel_player1.updateSee(false);

        //Esquerda - player 2 
        this.layoutSwitch_left     = new Layout(new Vector2D(GlobalVars.dpad2_centerX - GlobalVars.dpad2_offsetX * 1.8, GlobalVars.dpad_centerY + GlobalVars.offset),60,2,1);
        this.iconSwitch_ArrowLeft  = new Icons(new Vector2D(GlobalVars.dpad2_centerX - GlobalVars.dpad2_offsetX + GlobalVars.icon_offset, GlobalVars.dpad_centerY + 110), new Vector2D(30,30),"left",0);                
        this.CharacterIcon_Left    = new Icons(new Vector2D(GlobalVars.dpad2_centerX - 95, GlobalVars.dpad_centerY + GlobalVars.offset + 15),new Vector2D(40,40),2,3);
        this.iconCancel_player2    = new Icons(new Vector2D(GlobalVars.dpad2_centerX - 95, GlobalVars.dpad_centerY + GlobalVars.offset + 15),new Vector2D(40,40),"x",2);
        if(this.PlayerId != 2) this.iconCancel_player2.updateSee(false);

        //Direita - player 4
        this.layoutSwitch_Right    = new Layout(new Vector2D(GlobalVars.dpad2_centerX + GlobalVars.dpad2_offsetX * 2, GlobalVars.dpad_centerY + GlobalVars.offset),60,4,1);
        this.iconSwitch_ArrowRight = new Icons(new Vector2D(GlobalVars.dpad2_centerX + GlobalVars.dpad2_offsetX + GlobalVars.icon_offset, GlobalVars.dpad_centerY + 110), new Vector2D(30,30), "right",0);                
        this.CharacterIcon_Right   = new Icons(new Vector2D(GlobalVars.dpad2_centerX + 125, GlobalVars.dpad_centerY + GlobalVars.offset + 15),new Vector2D(40,40),4,3);
        this.iconCancel_player4    = new Icons(new Vector2D(GlobalVars.dpad2_centerX + 130, GlobalVars.dpad_centerY + GlobalVars.offset + 15),new Vector2D(40,40),"x",2);
        if(this.PlayerId != 4) this.iconCancel_player4.updateSee(false);

        this.updateSwtichDesign();

    }

    #setAction(name) {
        if (this.currentAnim.name == name) return;

        this.currentAnim.stop();
        this.currentAnim = this.animations[name];
        this.currentAnim.play();
    }

    #updateFacing() {
        if(this.currentAnim.name != 'idle') return;

        const mouseX  = this.mouse.x;
        const CenterX = document.documentElement.clientWidth / 2 + (32*2);                

        this.texture.flipX = mouseX < CenterX;
    }

    #move() {
        let direction = Vector2D.zero();
        let moving    = false;    

        if (this.keyboard.isKey("ArrowLeft") == KeysState.PRESSED || this.keyboard.isKey("KeyA") == KeysState.PRESSED) {
            this.texture.flipX = true;
            moving = true;
            direction.x -= 1;
        }

        if (this.keyboard.isKey("ArrowRight") == KeysState.PRESSED || this.keyboard.isKey("KeyD") == KeysState.PRESSED) {
            this.texture.flipX = false;
            moving = true;
            direction.x += 1;
        }

        if (this.keyboard.isKey("ArrowUp") == KeysState.PRESSED || this.keyboard.isKey("KeyW") == KeysState.PRESSED) {
            moving = true;
            direction.y -= 1;
        }

        if (this.keyboard.isKey("ArrowDown") == KeysState.PRESSED || this.keyboard.isKey("KeyS") == KeysState.PRESSED) {
            moving = true;
            direction.y += 1;
        }                

        if (moving) {
            this.#setAction('walk');
            direction = direction.normalize();
            this.moveDir.copy(direction);
            this.position.x += direction.x * this.speed.x;
            this.position.y += direction.y * this.speed.y;
        } else {
            this.moveDir.set(0, 0);
            this.#setAction('idle');
        }        
    }

    update(deltaTime) {
        this.Mousedot.setMousePos(this.mouse.x, this.mouse.y);  
        
        // === MENUS ===
        if(this.mainMenu.cansee){ //Menu de pausa
            //botão 1
            const btn1_data = {x:this.mainMenu.btn1.position.x,y:this.mainMenu.btn1.position.y,sW:this.mainMenu.btn1.size.x,sH:this.mainMenu.btn1.size.y}
            if(this.mouse.isOver(btn1_data)){
                if(this.mouse.isClick(btn1_data,0))
                    this.mainMenu.updateSee(false); 

                this.mainMenu.switchHover('btn1',true);
            } else {
                this.mainMenu.switchHover('btn1',false);
            } 

            //botão 2
            const btn2_data = {x:this.mainMenu.btn2.position.x,y:this.mainMenu.btn2.position.y,sW:this.mainMenu.btn2.size.x,sH:this.mainMenu.btn2.size.y}
            if(this.mouse.isOver(btn2_data)){
                if(this.mouse.isClick(btn2_data,0))
                    console.log('não tem configurações');
                    
                this.mainMenu.switchHover('btn2',true);
            } else {
                this.mainMenu.switchHover('btn2',false);
            } 

            //botão 3
            const btn3_data = {x:this.mainMenu.btn3.position.x,y:this.mainMenu.btn3.position.y,sW:this.mainMenu.btn3.size.x,sH:this.mainMenu.btn3.size.y}
            if(this.mouse.isOver(btn3_data)){
                if(this.mouse.isClick(btn3_data,0))
                    window.close();

                this.mainMenu.switchHover('btn3',true);
            } else {
                this.mainMenu.switchHover('btn3',false);
            } 
        } else if (this.InventoryMenu.cansee) { //Menu do inventario
            const selectedRow = Math.floor(this.InventoryMenu.selectedSlotIndex / 4);
            const visibleRows = 4; 

            // Mantém visível
            const scrollTarget = Math.max(0, (selectedRow - visibleRows + 1) * 79); 

            this.InventoryMenu.scrollOffset = Math.min(scrollTarget, this.InventoryMenu.maxScroll);

            this.InventoryMenu.updateIcons();
            this.InventoryMenu.updateInventoryIcons(this.inventory);

            if (this.keyboard.isKey("ArrowRight") == KeysState.CLICKED) {
                this.InventoryMenu.selectedSlotIndex++;
            }
            if (this.keyboard.isKey("ArrowLeft") == KeysState.CLICKED) {
                this.InventoryMenu.selectedSlotIndex--;
            }
            if (this.keyboard.isKey("ArrowDown") == KeysState.CLICKED) {
                this.InventoryMenu.selectedSlotIndex += 4;
            }
            if (this.keyboard.isKey("ArrowUp") == KeysState.CLICKED) {
                this.InventoryMenu.selectedSlotIndex -= 4;
            }

            const max = this.InventoryMenu.slotPositions.length - 1;
            if (this.InventoryMenu.selectedSlotIndex < 0) this.InventoryMenu.selectedSlotIndex = 0;
            if (this.InventoryMenu.selectedSlotIndex > max) this.InventoryMenu.selectedSlotIndex = max;

            this.InventoryMenu.updateSelectionIcon();            
        }

        // === ATUALIZAÇÕES PRINCIPAIS ===
        if(!this.currentPlayer){
            if(this.loadingHB_potion.loading) this.loadingHB_potion.updateIconTimer() //poção
            if(this.loadingHB_up.loading)     this.loadingHB_up.updateIconTimer()     //habilidade rapida
            if(this.loadingHB_right.loading)  this.loadingHB_right.updateIconTimer()  //arma
            if(this.loadingHB_left.loading)   this.loadingHB_left.updateIconTimer()   //Habilidade 1
            if(this.loadingHB_down.loading)   this.loadingHB_down.updateIconTimer()   //Habilidade 2

            return;
        } else if(this.mainMenu.cansee && this.keyboard.isKey("Escape") != KeysState.CLICKED){
            this.mouse.resetScroll();
            this.keyboard.reset();
            return;                    
        } else if(this.InventoryMenu.cansee && (this.keyboard.isKey("KeyI") != KeysState.CLICKED && this.keyboard.isKey("Escape") != KeysState.CLICKED)){
            this.mouse.resetScroll();
            this.keyboard.reset();
            return;                    
        }             

        // === MENU - INVENTARIO  E PAUSA ===                  
        if (this.InventoryMenu.cansee && this.keyboard.isKey("Escape") == KeysState.CLICKED) {
            this.InventoryMenu.updateSee(false);
        } else if (this.keyboard.isKey("KeyI") == KeysState.CLICKED) {
            if (!this.isMenuBlocking('inventory')) {
                this.InventoryMenu.updateSee(!this.InventoryMenu.cansee);
            }
        } else if (this.keyboard.isKey("Escape") == KeysState.CLICKED) {
            if (!this.isMenuBlocking('pause')) {
                this.mainMenu.updateSee(!this.mainMenu.cansee);
            }
        }                      

        //Prioridade - MOUSE
        this.#updateFacing();        

        //Player Swtich            
        if(!this.keyboard.isKey("AltLeft") == KeysState.PRESSED && !this.keyboard.isKey("AltRight") == KeysState.PRESSED){
            this.#move();                                
            this.currentAnim.update(deltaTime);  
            this.updateSwtichDesign()
        } else {                            
            this.updateSwtichDesign(true);
        }

        if(this.switchMode){
            this.layoutSwitch_up.updateIcon();
            this.layoutSwitch_left.updateIcon();
            this.layoutSwitch_Right.updateIcon();
        }                              
        
        //Barra superior        
        this.CharacterLayout.updateIcon();  
        
        //=== / Poção de cura / ===
        //KEY
        if(this.keyboard.isKey("KeyV") == KeysState.CLICKED){
            if(!this.loadingHB_potion.loading){
                if(this.live <= 4){  
                    this.HealthBar.addOrSubStartX(false);                
                    this.live++;                
                    this.loadingHB_potion.startCooldown(10)
                } else {
                    this.iconCancel_potion.startCooldown(1);
                }                
            }
        }

        //Update     
        this.layoutHB_potion.updateIcon();
        if(this.iconCancel_potion.cansee){
            this.iconCancel_potion.updateIconTimer();
        }
                
        if(this.loadingHB_potion.loading){
            this.loadingHB_potion.updateIconTimer()
            this.layoutHB_potion.setMoving(false);
        } else {
            this.layoutHB_potion.setMoving(true);
        }
        
        //=== / D-Pad - Up / ===
        //KEY
        if(this.keyboard.isKey("KeyQ") == KeysState.CLICKED){
            if(!this.loadingHB_up.loading){
                this.loadingHB_up.startCooldown(3); 
            }
        }

        //Update       
        this.layoutHB_up.updateIcon();
        if(this.loadingHB_up.loading){
            this.loadingHB_up.updateIconTimer()
            this.layoutHB_up.setMoving(false);
        } else {
            this.layoutHB_up.setMoving(true);
        }

        //=== / D-Pad - Right / ===
        //KEY
        if(this.keyboard.isKey("KeyE") == KeysState.CLICKED){
            if(!this.loadingHB_right.loading){
                this.currentWeapon.nextWeapon();
                this.iconHB_right.switchKey(`${this.PlayerId}-wp-${this.currentWeapon.WeaponId}`);
                this.loadingHB_right.startCooldown(1)
            }
        }

        //Update
        this.layoutHB_right.updateIcon();
        if(this.loadingHB_right.loading){
            this.loadingHB_right.updateIconTimer()
            this.layoutHB_right.setMoving(false);
        } else {
            this.layoutHB_right.setMoving(true);
        }

        //=== / D-Pad - Left / ===
        //KEY
        if(this.keyboard.isKey("KeyZ") == KeysState.CLICKED)
            this.loadingHB_left.startCooldown(8); 

        //Update
        this.layoutHB_left.updateIcon();
        if(this.loadingHB_left.loading){
            this.loadingHB_left.updateIconTimer()
            this.layoutHB_left.setMoving(false);
        } else {
            this.layoutHB_left.setMoving(true);
        }

        //D-Pad - Down
        //KEY
        if(this.keyboard.isKey("KeyX") == KeysState.CLICKED)
            this.loadingHB_down.startCooldown(15)

        //Update
        this.layoutHB_down.updateIcon();
        if(this.loadingHB_down.loading){
            this.loadingHB_down.updateIconTimer()
            this.layoutHB_down.setMoving(false);
        } else {
            this.layoutHB_down.setMoving(true);
        }                
        
        //=== / teste - XP / ===
        if (this.keyboard.isKey("KeyJ") == KeysState.PRESSED) {
            this.XPNum++;
            this.XPBar.updateXPNum(this.XPNum);

            if(this.LevelId != this.XPBar.levelId){
                this.LevelId = this.XPBar.levelId;
                this.XPNum   = this.XPBar.xpnum;
            }
        }   

        //=== / Teste - VIDA / ===
        if (this.keyboard.isKey("KeyO") == KeysState.CLICKED) {
            this.HealthBar.addOrSubStartX(true);                                             
            this.live--;            
        }        

        if(this.live == 0)
            console.log('morte');  
        
        this.mouse.resetScroll();
        this.keyboard.reset();
    }

    /** @param {CanvasRenderingContext2D} ctx */
    draw(ctx, hudctx) {
        this.hitbox.draw(ctx);
        this.currentAnim.draw(ctx, this.position);                   
        
        //VIDA e XP - barrra superior
        this.MinimapLayout.draw(hudctx);
        this.minimapCenter_icon.draw(hudctx);
        this.CharacterLayout.draw(hudctx);
        this.CharacterIcon.draw(hudctx);
        this.HealthBar.draw(hudctx);        
        this.XPBar.draw(hudctx);        
        
        // Poção de cura
        this.icon_potion.draw(hudctx);
        this.layoutHB_potion.draw(hudctx);
        this.iconHB_potion.draw(hudctx);
        this.iconCancel_potion.draw(hudctx);
        this.loadingHB_potion.draw(hudctx);

        // D-Pad - Up
        this.icon_up.draw(hudctx);
        this.layoutHB_up.draw(hudctx);        
        this.iconHB_up.draw(hudctx);
        this.loadingHB_up.draw(hudctx);

        // D-Pad - Right
        this.icon_right.draw(hudctx);
        this.layoutHB_right.draw(hudctx);   
        this.iconHB_right.draw(hudctx);     
        this.loadingHB_right.draw(hudctx);

        // D-Pad - Left
        this.icon_left.draw(hudctx);
        this.layoutHB_left.draw(hudctx);
        this.iconHB_left.draw(hudctx);
        this.loadingHB_left.draw(hudctx);

        // D-Pad - Down
        this.icon_down.draw(hudctx);
        this.layoutHB_down.draw(hudctx); 
        this.iconHB_down.draw(hudctx);       
        this.loadingHB_down.draw(hudctx);   

        //Player Switch
        //Centro
        this.iconSwitch_center.draw(hudctx);
        this.layoutSwitch_center.draw(hudctx);
        this.CharacterIcon_Center.draw(hudctx);

        //Cima
        this.iconSwitch_ArrowUp.draw(hudctx);
        this.layoutSwitch_up.draw(hudctx);
        this.CharacterIcon_Up.draw(hudctx);
        this.iconCancel_player1.draw(hudctx);

        //Esquerda
        this.iconSwitch_ArrowLeft.draw(hudctx);
        this.layoutSwitch_left.draw(hudctx);
        this.CharacterIcon_Left.draw(hudctx);
        this.iconCancel_player2.draw(hudctx);

        //Direita
        this.iconSwitch_ArrowRight.draw(hudctx);
        this.layoutSwitch_Right.draw(hudctx);
        this.CharacterIcon_Right.draw(hudctx);
        this.iconCancel_player4.draw(hudctx);        

        //MENU 
        this.mainMenu.draw(hudctx);
        this.InventoryMenu.draw(hudctx);

        //MOUSE
        this.Mousedot.draw(hudctx);
    }

    drawWorld(ctx) {
        this.hitbox.draw(ctx);
        this.currentAnim.draw(ctx, this.position);
    }

    //utilidades
    isMenuBlocking(input){
        if(input == 'pause' && this.InventoryMenu.cansee) return true;
        if(input == 'inventory' && this.mainMenu.cansee) return true;
        return false;
    }

    switchPlayer(setCurrent = false) {
        this.currentPlayer = setCurrent;

        this.updateSwtichDesign();
    }    

    updateSwtichDesign(cansee = false) {
        this.switchMode = cansee;
        
        this.iconSwitch_center.updateSee(!cansee);       

        //Cima
        this.iconSwitch_ArrowUp.updateSee(cansee);
        this.layoutSwitch_up.updateSee(cansee);
        this.CharacterIcon_Up.updateSee(cansee);
        if(this.PlayerId == 1) this.iconCancel_player1.updateSee(cansee);

        //Esquerda
        this.iconSwitch_ArrowLeft.updateSee(cansee);
        this.layoutSwitch_left.updateSee(cansee);
        this.CharacterIcon_Left.updateSee(cansee);
        if(this.PlayerId == 2) this.iconCancel_player2.updateSee(cansee);

        //Direita
        this.iconSwitch_ArrowRight.updateSee(cansee);
        this.layoutSwitch_Right.updateSee(cansee);
        this.CharacterIcon_Right.updateSee(cansee);
        if(this.PlayerId == 4) this.iconCancel_player4.updateSee(cansee);
    }

    onResizeHUD(newWidth, newHeight) {
        GlobalVars.updateVars(newWidth, newHeight);

        //Menus
        this.mainMenu.position.set(newWidth/2 - 200,newHeight/2 - 250);
        this.mainMenu.updateOnresize();

        this.InventoryMenu.position.set(newWidth/2 - 650,newHeight/2 - 370);
        this.InventoryMenu.updateOnresize();

        // Atualiza HUD barra superior        
        this.CharacterLayout.position.set(newWidth * 0.01, newHeight * 0.02);
        this.CharacterIcon.position.set(newWidth * 0.015, newHeight * 0.035);
        this.HealthBar.position.set(newWidth * 0.07, newHeight * 0.01);
        this.XPBar.position.set(newWidth * 0.07, newHeight * 0.08);

        this.MinimapLayout.position.set(newWidth * 0.8, newHeight * 0.04);
        this.minimapCenter_icon.position.set((newWidth * 0.8) + (250 / 2) - 15, (newHeight * 0.04) + (250 / 2) - 15);        

        // Poção
        this.layoutHB_potion.position.set(GlobalVars.potionX, GlobalVars.potionY);
        this.icon_potion.position.set(GlobalVars.potionX + GlobalVars.potionIconOffset, GlobalVars.potionY - 30);
        this.iconHB_potion.position.set(GlobalVars.potionX + GlobalVars.potionOffset, GlobalVars.potionY + GlobalVars.potionOffset);
        this.iconCancel_potion.position.set(GlobalVars.potionX + GlobalVars.potionOffset, GlobalVars.potionY + GlobalVars.potionOffset);
        this.loadingHB_potion.position.set(GlobalVars.potionX + GlobalVars.potionOffset, GlobalVars.potionY + GlobalVars.potionOffset);

        // D-Pad principal
        this.layoutHB_up.position.set(GlobalVars.dpad_centerX, GlobalVars.dpad_centerY - GlobalVars.offset);
        this.layoutHB_down.position.set(GlobalVars.dpad_centerX, GlobalVars.dpad_centerY + GlobalVars.offset);
        this.layoutHB_left.position.set(GlobalVars.dpad_centerX - GlobalVars.offset, GlobalVars.dpad_centerY);
        this.layoutHB_right.position.set(GlobalVars.dpad_centerX + GlobalVars.offset, GlobalVars.dpad_centerY);

        this.icon_up.position.set(GlobalVars.dpad_centerX + GlobalVars.icon_offset, GlobalVars.dpad_centerY - GlobalVars.offset - GlobalVars.icon_vertical_spacing);
        this.icon_down.position.set(GlobalVars.dpad_centerX + GlobalVars.icon_offset, GlobalVars.dpad_centerY + GlobalVars.offset - GlobalVars.icon_vertical_spacing);
        this.icon_left.position.set(GlobalVars.dpad_centerX - GlobalVars.offset + GlobalVars.icon_offset, GlobalVars.dpad_centerY - GlobalVars.icon_vertical_spacing);
        this.icon_right.position.set(GlobalVars.dpad_centerX + GlobalVars.offset + GlobalVars.icon_offset, GlobalVars.dpad_centerY - GlobalVars.icon_vertical_spacing);

        this.iconHB_up.position.set(GlobalVars.dpad_centerX + GlobalVars.loading_offset, GlobalVars.dpad_centerY - GlobalVars.offset + GlobalVars.loading_offset);
        this.iconHB_down.position.set(GlobalVars.dpad_centerX + GlobalVars.loading_offset, GlobalVars.dpad_centerY + GlobalVars.offset + GlobalVars.loading_offset);
        this.iconHB_left.position.set(GlobalVars.dpad_centerX - GlobalVars.offset + GlobalVars.loading_offset, GlobalVars.dpad_centerY + GlobalVars.loading_offset);
        this.iconHB_right.position.set(GlobalVars.dpad_centerX + GlobalVars.offset + GlobalVars.loading_offset, GlobalVars.dpad_centerY + GlobalVars.loading_offset);

        this.loadingHB_up.position.set(GlobalVars.dpad_centerX + GlobalVars.loading_offset, GlobalVars.dpad_centerY - GlobalVars.offset + GlobalVars.loading_offset);
        this.loadingHB_down.position.set(GlobalVars.dpad_centerX + GlobalVars.loading_offset, GlobalVars.dpad_centerY + GlobalVars.offset + GlobalVars.loading_offset);
        this.loadingHB_left.position.set(GlobalVars.dpad_centerX - GlobalVars.offset + GlobalVars.loading_offset, GlobalVars.dpad_centerY + GlobalVars.loading_offset);
        this.loadingHB_right.position.set(GlobalVars.dpad_centerX + GlobalVars.offset + GlobalVars.loading_offset, GlobalVars.dpad_centerY + GlobalVars.loading_offset);

        // Switch Center
        this.layoutSwitch_center.position.set(GlobalVars.dpad2_centerX, GlobalVars.dpad_centerY + GlobalVars.offset);
        this.iconSwitch_center.position.set(GlobalVars.dpad2_centerX + GlobalVars.icon_offset, GlobalVars.dpad_centerY + 90 - 40);
        this.CharacterIcon_Center.position.set(GlobalVars.dpad2_centerX + 10, GlobalVars.dpad_centerY + 100);

        // Switch Up - Player 1
        this.layoutSwitch_up.position.set(GlobalVars.dpad2_centerX + 5, GlobalVars.dpad_centerY - GlobalVars.offset + 70);
        this.iconSwitch_ArrowUp.position.set(GlobalVars.dpad2_centerX + GlobalVars.icon_offset, GlobalVars.dpad_centerY + 90 - 40);
        this.CharacterIcon_Up.position.set(GlobalVars.dpad2_centerX + 15, GlobalVars.dpad_centerY - 5);
        this.iconCancel_player1.position.set(GlobalVars.dpad2_centerX + 15, GlobalVars.dpad_centerY - 5);

        // Switch Left - Player 2
        this.layoutSwitch_left.position.set(GlobalVars.dpad2_centerX - GlobalVars.dpad2_offsetX * 1.8, GlobalVars.dpad_centerY + GlobalVars.offset);
        this.iconSwitch_ArrowLeft.position.set(GlobalVars.dpad2_centerX - GlobalVars.dpad2_offsetX + GlobalVars.icon_offset, GlobalVars.dpad_centerY + 110);
        this.CharacterIcon_Left.position.set(GlobalVars.dpad2_centerX - 95, GlobalVars.dpad_centerY + GlobalVars.offset + 15);
        this.iconCancel_player2.position.set(GlobalVars.dpad2_centerX - 95, GlobalVars.dpad_centerY + GlobalVars.offset + 15);

        // Switch Right - Player 4
        this.layoutSwitch_Right.position.set(GlobalVars.dpad2_centerX + GlobalVars.dpad2_offsetX * 2, GlobalVars.dpad_centerY + GlobalVars.offset);
        this.iconSwitch_ArrowRight.position.set(GlobalVars.dpad2_centerX + GlobalVars.dpad2_offsetX + GlobalVars.icon_offset, GlobalVars.dpad_centerY + 110);
        this.CharacterIcon_Right.position.set(GlobalVars.dpad2_centerX + 125, GlobalVars.dpad_centerY + GlobalVars.offset + 15);
        this.iconCancel_player4.position.set(GlobalVars.dpad2_centerX + 130, GlobalVars.dpad_centerY + GlobalVars.offset + 15);
    }

}