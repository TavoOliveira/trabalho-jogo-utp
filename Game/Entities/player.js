//HUD
import XPBar from "../HUD/XPBar.js";
import mouse_dots from "../HUD/dots.js";
import InfoIcons from "../HUD/InfoIcons.js";
import HealthBar from "../HUD/HealthBar.js";
import DPadLayout from "../HUD/DPadLayout.js";
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
    constructor(texture, position, keyboard) {
        const global_width = document.documentElement.clientWidth;
        const global_height = document.documentElement.clientHeight;

        super(texture, position);
        this.keyboard = keyboard;
        this.speed = Vector2D.one(2);
        this.moveDir = Vector2D.zero();

        this.animations = {
            walk: new Animator('walk', this.texture, 32, 32, 0, 0, 8, 10),
            idle: new Animator('idle', this.texture, 32, 32, 0, 0, 1, 0)
        }

        this.hitbox = new RectHitbox(this, new Vector2D(10, 12), 12, 20);

        this.currentAnim = this.animations.idle;
        this.currentAnim.play();

        this.PlayerId = 4;
        this.LevelId  = 1;
        this.XPNum    = 0.0; 

        this.live    = 5;   
        this.counter = 0;           
        
        // HUD  
        this.Mousedot = new mouse_dots(new Texture(Enums.dots_Id[this.PlayerId]),35);                
        
        this.HealthBar  = new HealthBar(new Vector2D(global_width * 0.01, global_height * 0.03), this.PlayerId);                
        this.XPBar      = new XPBar(new Vector2D(global_width * 0.01, global_height * 0.1),this.LevelId,this.XPNum);

        // Icone de Botão no D-Pad      
        this.icon_up    = new InfoIcons(new Vector2D(GlobalVars.dpad_centerX + GlobalVars.icon_offset, GlobalVars.dpad_centerY - GlobalVars.offset - GlobalVars.icon_vertical_spacing), 30, "q", 0);
        this.icon_down  = new InfoIcons(new Vector2D(GlobalVars.dpad_centerX + GlobalVars.icon_offset, GlobalVars.dpad_centerY + GlobalVars.offset - GlobalVars.icon_vertical_spacing), 30, "x", 0);
        this.icon_left  = new InfoIcons(new Vector2D(GlobalVars.dpad_centerX - GlobalVars.offset + GlobalVars.icon_offset, GlobalVars.dpad_centerY - GlobalVars.icon_vertical_spacing), 30, "z", 0);
        this.icon_right = new InfoIcons(new Vector2D(GlobalVars.dpad_centerX + GlobalVars.offset + GlobalVars.icon_offset, GlobalVars.dpad_centerY - GlobalVars.icon_vertical_spacing), 30, "e", 0);

        // Layout do D-Pad
        this.layoutHB_up    = new DPadLayout(new Vector2D(GlobalVars.dpad_centerX, GlobalVars.dpad_centerY - GlobalVars.offset), 70, this.PlayerId);
        this.layoutHB_down  = new DPadLayout(new Vector2D(GlobalVars.dpad_centerX, GlobalVars.dpad_centerY + GlobalVars.offset), 70, this.PlayerId);
        this.layoutHB_left  = new DPadLayout(new Vector2D(GlobalVars.dpad_centerX - GlobalVars.offset, GlobalVars.dpad_centerY), 70, this.PlayerId);
        this.layoutHB_right = new DPadLayout(new Vector2D(GlobalVars.dpad_centerX + GlobalVars.offset, GlobalVars.dpad_centerY), 70, this.PlayerId);

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

    #updateFacing(moving) {
        if (moving) return;

        const mouseX = this.Mousedot.mousePos.x;        
        const playerX = this.position.x;

        this.texture.flipX = mouseX < playerX;
    }

    #move() {
        let direction = Vector2D.zero();
        let moving = false;    

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

        this.#updateFacing(moving);
    }

    update(deltaTime) {        
        this.#move();                                
        this.currentAnim.update(deltaTime);   
        
        this.Mousedot.setMousePos(GlobalVars.mousePOS.xPos, GlobalVars.mousePOS.yPOS);
        
        //D-Pad - Up
        //KEY
        if(this.keyboard.isKey("KeyQ") == KeysState.PRESSED)
            this.loadingHB_up.startCooldown(1); 

        //Update
        this.layoutHB_up.updateIcon();
        if(this.loadingHB_up.loading){
            this.loadingHB_up.updateIconTimer()
            this.layoutHB_up.setMoving(false);
        } else {
            this.layoutHB_up.setMoving(true);
        }

        //D-Pad - Right
        //KEY
        if(this.keyboard.isKey("KeyE") == KeysState.PRESSED)
            this.loadingHB_right.startCooldown(1)

        //Update
        this.layoutHB_right.updateIcon();
        if(this.loadingHB_right.loading){
            this.loadingHB_right.updateIconTimer()
            this.layoutHB_right.setMoving(false);
        } else {
            this.layoutHB_right.setMoving(true);
        }

        //D-Pad - Left
        //KEY
        if(this.keyboard.isKey("KeyZ") == KeysState.PRESSED)
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
        if(this.keyboard.isKey("KeyX") == KeysState.PRESSED)
            this.loadingHB_down.startCooldown(15)

        //Update
        this.layoutHB_down.updateIcon();
        if(this.loadingHB_down.loading){
            this.loadingHB_down.updateIconTimer()
            this.layoutHB_down.setMoving(false);
        } else {
            this.layoutHB_down.setMoving(true);
        }                
        
        //teste - XP
        if (this.keyboard.isKey("KeyJ") == KeysState.PRESSED) {
            this.XPNum++;
            this.XPBar.updateXPNum(this.XPNum);

            if(this.LevelId != this.XPBar.levelId){
                this.LevelId = this.XPBar.levelId;
                this.XPNum   = this.XPBar.xpnum;
            }
        }   

        //Teste - vida
        if (this.keyboard.isKey("KeyO") == KeysState.PRESSED && this.counter == 0) {
            this.HealthBar.addStartX();                                             
            this.live--;
            this.counter = 1
        } else{            
            this.counter = 0
        }

        if(this.live == 0)
            console.log('morte');            
    }

    /** @param {CanvasRenderingContext2D} ctx */
    draw(ctx, hudctx) {         
        //mouse - PRIORIDADE
        this.Mousedot.draw(hudctx);

        this.hitbox.draw(ctx);
        this.currentAnim.draw(ctx, this.position);      
        
        //VIDA e XP
        this.HealthBar.draw(hudctx);        
        this.XPBar.draw(hudctx);

        // D-Pad - Up
        this.layoutHB_up.draw(hudctx);
        this.icon_up.draw(hudctx);
        this.loadingHB_up.draw(hudctx);

        // D-Pad - Right
        this.layoutHB_right.draw(hudctx);
        this.icon_right.draw(hudctx);
        this.loadingHB_right.draw(hudctx);

        // D-Pad - Left
        this.layoutHB_left.draw(hudctx);
        this.icon_left.draw(hudctx);
        this.loadingHB_left.draw(hudctx);

        // D-Pad - Down
        this.layoutHB_down.draw(hudctx);
        this.icon_down.draw(hudctx);
        this.loadingHB_down.draw(hudctx);                  
    }
}