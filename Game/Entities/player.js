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

//Util
import Texture from "../../Engine/Utils/texture.js";
import Vector2D from "../../Engine/Utils/vector2d.js";
import KeysState from "../../Engine/Enums/key-state.js";
import Animator from "../../Engine/Animator/animator.js";
import GameObject from "../../Engine/Utils/game-object.js";
import { Hitbox, RectHitbox } from "../../Engine/Collision/index.js";

export default class Player extends GameObject {
    /**
     * @param {Texture} texture
     * @param {Vector2D} position
     */
    constructor(texture, position, keyboard, mouse, playerId) {
        const global_width    = document.documentElement.clientWidth;
        const global_height   = document.documentElement.clientHeight;        

        super(texture, position);
        this.keyboard = keyboard;
        this.mouse    = mouse;
        this.speed    = Vector2D.one(2);
        this.moveDir  = Vector2D.zero();

        this.animations = {
            walk: new Animator('walk', this.texture, 32, 32, 0, 0, 8, 10),
            idle: new Animator('idle', this.texture, 32, 32, 0, 0, 1, 0)
        }

        this.hitbox = new RectHitbox(this, new Vector2D(10, 12), 12, 20);

        this.currentAnim = this.animations.idle;
        this.currentAnim.play();

        //player
        this.PlayerId      = playerId;
        this.currentPlayer = false;

        this.LevelId  = 1;
        this.XPNum    = 0.0; 

        this.live    = 5;                   
        
        // HUD  
        this.Mousedot = new mouse_dots(new Texture(Enums.dots_Id[this.PlayerId]),35);   
        
        //armas
        this.currentWeapon = new Weapons(1);
        
        //Barra Superior
        this.CharacterLayout = new Layout(new Vector2D(global_width * 0.01, global_height * 0.02), 70, this.PlayerId, 1);
        this.CharacterIcon   = new Icons(new Vector2D(global_width * 0.015, global_height * 0.035), 50, this.PlayerId, 3);
        this.HealthBar       = new HealthBar(new Vector2D(global_width * 0.07, global_height * 0.01), this.PlayerId);                
        this.XPBar           = new XPBar(new Vector2D(global_width * 0.07, global_height * 0.08),this.LevelId,this.XPNum);         
                
        //Barra Inferior

        // Poção de Cura
        this.icon_potion       = new Icons(new Vector2D(GlobalVars.potionX + GlobalVars.potionIconOffset, GlobalVars.potionY - 30),20,"v",0);
        this.layoutHB_potion   = new Layout(new Vector2D(GlobalVars.potionX, GlobalVars.potionY),50,this.PlayerId);      
        this.iconCancel_potion = new Icons(new Vector2D(GlobalVars.potionX + GlobalVars.potionOffset, GlobalVars.potionY + GlobalVars.potionOffset),30,"x",2);
        this.iconHB_potion     = new Icons(new Vector2D(GlobalVars.potionX + GlobalVars.potionOffset, GlobalVars.potionY + GlobalVars.potionOffset),30,"hpt",2);
        this.loadingHB_potion  = new loadingicon(new Vector2D(GlobalVars.potionX + GlobalVars.potionOffset, GlobalVars.potionY + GlobalVars.potionOffset),30);

        this.iconCancel_potion.updateSee(false);//Desliga o aviso de cancelado

        // Icone de Botão no D-Pad      
        this.icon_up    = new Icons(new Vector2D(GlobalVars.dpad_centerX + GlobalVars.icon_offset, GlobalVars.dpad_centerY - GlobalVars.offset - GlobalVars.icon_vertical_spacing), 30, "q",0);
        this.icon_down  = new Icons(new Vector2D(GlobalVars.dpad_centerX + GlobalVars.icon_offset, GlobalVars.dpad_centerY + GlobalVars.offset - GlobalVars.icon_vertical_spacing), 30, "x",0);
        this.icon_left  = new Icons(new Vector2D(GlobalVars.dpad_centerX - GlobalVars.offset + GlobalVars.icon_offset, GlobalVars.dpad_centerY - GlobalVars.icon_vertical_spacing), 30, "z",0);
        this.icon_right = new Icons(new Vector2D(GlobalVars.dpad_centerX + GlobalVars.offset + GlobalVars.icon_offset, GlobalVars.dpad_centerY - GlobalVars.icon_vertical_spacing), 30, "e",0);

        // Layout do D-Pad
        this.layoutHB_up    = new Layout(new Vector2D(GlobalVars.dpad_centerX, GlobalVars.dpad_centerY - GlobalVars.offset), 70, this.PlayerId);
        this.layoutHB_down  = new Layout(new Vector2D(GlobalVars.dpad_centerX, GlobalVars.dpad_centerY + GlobalVars.offset), 70, this.PlayerId);
        this.layoutHB_left  = new Layout(new Vector2D(GlobalVars.dpad_centerX - GlobalVars.offset, GlobalVars.dpad_centerY), 70, this.PlayerId);
        this.layoutHB_right = new Layout(new Vector2D(GlobalVars.dpad_centerX + GlobalVars.offset, GlobalVars.dpad_centerY), 70, this.PlayerId);                

        //Icones das habilidades - itens
        this.iconHB_up    = new Icons(new Vector2D(GlobalVars.dpad_centerX + GlobalVars.loading_offset, GlobalVars.dpad_centerY - GlobalVars.offset + GlobalVars.loading_offset), 50, `${this.PlayerId}-q`,2);
        this.iconHB_down  = new Icons(new Vector2D(GlobalVars.dpad_centerX + GlobalVars.loading_offset, GlobalVars.dpad_centerY + GlobalVars.offset + GlobalVars.loading_offset), 50, `${this.PlayerId}-x`,2);
        this.iconHB_left  = new Icons(new Vector2D(GlobalVars.dpad_centerX - GlobalVars.offset + GlobalVars.loading_offset, GlobalVars.dpad_centerY + GlobalVars.loading_offset), 50, `${this.PlayerId}-z`,2);
        this.iconHB_right = new Icons(new Vector2D(GlobalVars.dpad_centerX + GlobalVars.offset + GlobalVars.loading_offset, GlobalVars.dpad_centerY + GlobalVars.loading_offset), 50, `${this.PlayerId}-wp-${this.currentWeapon.WeaponId}`,2);

        // Loadings centralizado
        this.loadingHB_up    = new loadingicon(new Vector2D(GlobalVars.dpad_centerX + GlobalVars.loading_offset, GlobalVars.dpad_centerY - GlobalVars.offset + GlobalVars.loading_offset), 50);
        this.loadingHB_down  = new loadingicon(new Vector2D(GlobalVars.dpad_centerX + GlobalVars.loading_offset, GlobalVars.dpad_centerY + GlobalVars.offset + GlobalVars.loading_offset), 50);
        this.loadingHB_left  = new loadingicon(new Vector2D(GlobalVars.dpad_centerX - GlobalVars.offset + GlobalVars.loading_offset, GlobalVars.dpad_centerY + GlobalVars.loading_offset), 50);
        this.loadingHB_right = new loadingicon(new Vector2D(GlobalVars.dpad_centerX + GlobalVars.offset + GlobalVars.loading_offset, GlobalVars.dpad_centerY + GlobalVars.loading_offset), 50);                
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

    switchPlayer(setCurrent = false){        
        this.currentPlayer = setCurrent;
    }    

    update(deltaTime) {        
        this.Mousedot.setMousePos(this.mouse.x, this.mouse.y);

        //Prioridade - MOUSE
        this.#updateFacing();

        if(!this.keyboard.isKey("AltLeft") == KeysState.PRESSED){
            this.#move();                                
            this.currentAnim.update(deltaTime);  
        }

        //=== / MENU / ===
        if(this.keyboard.isKey("Escape") == KeysState.CLICKED){
            console.log('entra');            
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
        
        this.keyboard.reset();
    }

    /** @param {CanvasRenderingContext2D} ctx */
    draw(ctx, hudctx) {                    
        this.hitbox.draw(ctx);
        this.currentAnim.draw(ctx, this.position);      
        
        //VIDA e XP - barrra superior
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
        
        //MOUSE
        this.Mousedot.draw(hudctx);
    }
}