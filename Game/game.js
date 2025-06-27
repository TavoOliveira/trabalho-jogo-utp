// === / PLAYER - ENEMY / ===
import Player from "./Entities/player.js";
import Entities from "./Entities/entities.js";

// === / MAPA / ===
import TileMap from "../Engine/Map/tile-map.js";

// === / INPUTS / ===
import Keyboard from "../Engine/Inputs/keyboard.js";
import Mouse from "../Engine/Inputs/mouse.js";

// === / COMBATE - INVENTARIO / ===
import combat from "../Game/combat/combat.js";
import inventory from "../Game/HUD/inventory.js"

// === / MENU PRINCIPAL / ===
import mainMenu from "../Game/HUD/mainManu.js"

// === / UTILIDADES / ===
import Camera from "../Engine/Utils/camera.js";
import Texture from "../Engine/Utils/texture.js";
import Vector2D from "../Engine/Utils/vector2d.js";
import KeysState from "../Engine/Enums/key-state.js";
import JsonLoader from "../Engine/Utils/json-loader.js";

export default class Game {
    constructor(canvasId) {
        this.canvas    = document.getElementById(canvasId);
        this.HUDCanvas = document.getElementById('HUDCanvas');              

        this.HUDctx = this.HUDCanvas.getContext("2d");        
        this.ctx    = this.canvas.getContext("2d");

        this.width  = document.documentElement.clientWidth;
        this.height = document.documentElement.clientHeight;        

        this.canvas.width  = this.width;
        this.canvas.height = this.height;

        this.HUDCanvas.width  = this.width;
        this.HUDCanvas.height = this.height;

        // === / SALVAMENTO / ===  
        this.autoSaveCooldown = 2000;  
        this.autoSaveTimer    = 0;
        this.autoSaveSlot     = 1;      

        // === / MENU PRINCIPAL / ===
        this.mainMenu  = new mainMenu(new Vector2D(-60,-60),new Vector2D(this.width + 120,this.height + 120));
        this.showIntro = true;
        this.mainMenu.updateSee(true);
        this.mainMenu.onLoadSlot = (slot) => this.loadGame(slot);

        // === / INPUTS / ===
        this.keyboard = new Keyboard();
        this.mouse    = new Mouse();  

        // === / INVENTARIO / ===
        this.inventory = new inventory();

        // === / COMBATE / ===
        this.combat = new combat();

        // === / PLAYER / ===
        this.sharedPosition = new Vector2D(this.width / 2 + 300, this.height / 2);        
                
        this.player1 = new Player(new Texture("Game/Assets/players/Soldier100x100.png"),  this.sharedPosition, this.keyboard,this.mouse,1,this.inventory,this.mainMenu);
        this.player2 = new Player(new Texture("Game/Assets/players/mushroom64x80.png"),   this.sharedPosition, this.keyboard,this.mouse,2,this.inventory,this.mainMenu);
        this.player4 = new Player(new Texture("Game/Assets/players/NightBorne80x80.png"), this.sharedPosition, this.keyboard,this.mouse,4,this.inventory,this.mainMenu);
        this.player1.switchPlayer(true);

        // === / INIMIGOS - BOSSES / ===
        this.entities = new Entities();
        this.entities.setRandomMode(true);

        // === / MINIMAPA - CAMERA ===
        this.camera    = new Camera(new Vector2D(0,0).position, 3);
        this.minMapCam = new Camera(new Vector2D(0,0).position, 0.5);        

        // === MAPA ===
        this.tilemap     = null;
        this.tilemapMini = null;

        JsonLoader.load("Game/Maps/teste.json")
        .then(data => {
            this.tilemap     = new TileMap(data);
            this.tilemapMini = new TileMap(data);                     
        });
            
        this.lastTime = 0;

        window.addEventListener('resize', () => this.onResize());

        window.GameInstance = this;

        this.loop(0);             
    }
    
    loop(timestamp) {
        if (!this.lastTime) this.lastTime = timestamp;

        let deltaTime = Math.min(timestamp - this.lastTime, 100);

        this.lastTime = timestamp; 
        
        if (this.showIntro) {
            this.mainMenu.update(deltaTime);
            this.mainMenu.draw(this.HUDctx);

            if (this.keyboard.anyKeyPressed()) { 
                this.showIntro = false;
                this.mainMenu.updateIntro(true);
                this.mainMenu.switchHover(0);       
            }

            this.keyboard.reset();

            requestAnimationFrame(this.loop.bind(this));
            return;
        }
        
        if(this.mainMenu.cansee){ 
            this.movimentMenu(deltaTime);
            this.draw(this.ctx, this.HUDctx);
            this.keyboard.reset();
        } else {
            //=== / Player-Switch / ===
            if(!this.currentPlayer.mainMenu.cansee && !this.currentPlayer.InventoryMenu.cansee){
                if(this.keyboard.isKey("AltLeft") == KeysState.PRESSED || this.keyboard.isKey("AltRight") == KeysState.PRESSED){
                    if(this.keyboard.isKey("ArrowUp") == KeysState.CLICKED){
                        if(!this.player1.currentPlayer)
                            this.clearSwitches(1);
                    } else if(this.keyboard.isKey("ArrowLeft") == KeysState.CLICKED){
                        if(!this.player2.currentPlayer)
                            this.clearSwitches(2);               
                    } else if(this.keyboard.isKey("ArrowRight") == KeysState.CLICKED){
                        if(!this.player4.currentPlayer)
                            this.clearSwitches(4);       
                    }
                }      
            }  

            this.draw(this.ctx, this.HUDctx);
                    
            this.player1.update(deltaTime);
            this.player2.update(deltaTime);
            this.player4.update(deltaTime);

            if(!this.currentPlayer.mainMenu.cansee && !this.currentPlayer.InventoryMenu.cansee){
                for (const enemy of this.entities.getEnemies()) {
                    this.combat.checkCollisions(this.currentPlayer, enemy, deltaTime);
                }

                if(this.entities.entities.length == 0){
                    this.entities.setEnemysNum(this.currentPlayer.LevelId * 3);
                    this.entities.spawnWave(this.currentPlayer.position,(this.player1.LevelId + this.player2.LevelId + this.player4.LevelId));
                }

                this.entities.updateAll(deltaTime, this.currentPlayer);        

                this.autoSaveTimer += deltaTime;

                if (this.autoSaveTimer >= this.autoSaveCooldown) {
                    this.saveGame(this.autoSaveSlot);
                    this.autoSaveTimer = 0;
                }
            }            
        }

        requestAnimationFrame(this.loop.bind(this));
    }    

    /** @param {CanvasRenderingContext2D} ctx */
    draw(ctx, hudctx) {
        //=== LIMPA TELA PRINCIPAL ===
        ctx.clearRect(0, 0, this.width, this.height);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, this.width, this.height);        

        hudctx.clearRect(0,0,this.width,this.height)

        //=== PREENCHE O FUNDO DO MINIMAPA ===
        hudctx.fillStyle = "black";     
        hudctx.fillRect(this.currentPlayer.MinimapLayout.position.x,this.currentPlayer.MinimapLayout.position.y,250,250);

        //=== MINIMAPA ===
        this.adjustmentMinimap(hudctx);                  

        //=== CAMERA PRINCIPAL ===        
        this.camera.setPosition(this.currentPlayer.position);
        this.camera.applyTransform(ctx, this.canvas.width, this.canvas.height);   
                
        this.tilemap.draw(ctx);        

        this.currentPlayer.draw(ctx, hudctx);        
        this.entities.drawAll(ctx);              
        
        this.mainMenu.draw(hudctx);

        this.camera.resetTransform(ctx, this.canvas.width, this.canvas.height);                        
    }

    //menu
    movimentMenu(deltaTime){ 
        this.mainMenu.update(deltaTime); 
        
        if (this.keyboard.isKey("ArrowUp") == KeysState.CLICKED) {
            this.mainMenu.navigate("up");
        }
        if (this.keyboard.isKey("ArrowDown") == KeysState.CLICKED) {
            this.mainMenu.navigate("down");
        }
        
        if (this.keyboard.isKey("Enter") == KeysState.CLICKED) {
            this.mainMenu.confirmSelection();
        }
        
        if (this.keyboard.isKey("Escape") == KeysState.CLICKED || this.keyboard.isKey("ArrowLeft") == KeysState.CLICKED) {
            this.mainMenu.cancelSubMenu();
        }   
        
        if (this.keyboard.isKey("Backspace") === KeysState.CLICKED && this.mainMenu.subSlotsSelect) {
            const slot = this.mainMenu.selectionIndex + 1;
            localStorage.removeItem(`saveSlot${slot}`);
            console.log(`Slot ${slot} apagado`);
        }
    }

    //carregar Jogo e salvar
    loadGame(slotIndex) {
        const saveData = localStorage.getItem(`saveSlot${slotIndex}`);        
        
        if (!saveData) {            
            return;
        }

        const data = JSON.parse(saveData); 

        let Pos = (data.activePlayerId == 1) ? data.players[1].position : (data.activePlayerId == 1) ? data.players[2].position : data.players[3].position;
        
        this.inventory = inventory.deserialize(data.inventory);
        
        this.player1 = Player.deserialize(
            data.players[1],
            new Texture("Game/Assets/players/Soldier100x100.png"),
            this.keyboard,
            this.mouse,
            this.inventory,
            this.mainMenu,
            Pos
        );

        this.player2 = Player.deserialize(
            data.players[2],
            new Texture("Game/Assets/players/mushroom64x80.png"),
            this.keyboard,
            this.mouse,
            this.inventory,
            this.mainMenu,
            Pos
        );

        this.player4 = Player.deserialize(
            data.players[4],
            new Texture("Game/Assets/players/NightBorne80x80.png"),
            this.keyboard,
            this.mouse,
            this.inventory,
            this.mainMenu,
            Pos
        );

        if(data.activePlayerId == 1)
            this.player1.switchPlayer(true);
        else if(data.activePlayerId == 2)
            this.player2.switchPlayer(true);
        else
            this.player4.switchPlayer(true);
                
        this.entities.deserialize(data.entities);
        
        this.showIntro = data.showIntro;
        
        this.mainMenu.updateSee(false);
        this.mainMenu.subSlotsSelect = false;        
    }

    saveGame(slotIndex) {
        const saveData = {
            activePlayerId: this.currentPlayer.PlayerId,

            players: {
                1: this.player1.serialize(),
                2: this.player2.serialize(),
                4: this.player4.serialize()
            },

            inventory: this.inventory.serialize(),
            entities: this.entities.serialize(),

            showIntro: this.showIntro,            
        };

        this.autoSaveSlot = slotIndex;

        localStorage.setItem(`saveSlot${slotIndex}`, JSON.stringify(saveData));        
    }

    startNewGame() {
        let freeSlot = null;
        for (let i = 1; i <= 3; i++) {
            if (!localStorage.getItem(`saveSlot${i}`)) {
                freeSlot = i;
                break;
            }
        }
        
        if (!freeSlot) {
            console.warn("Todos os slots estão ocupados. Substituindo o Slot 1.");
            freeSlot = 1;
        }

        this.inventory = new inventory();

        this.player1 = new Player(
            new Texture("Game/Assets/players/Soldier100x100.png"),
            new Vector2D(this.width / 2 + 300, this.height / 2),
            this.keyboard, this.mouse, 1,
            this.inventory, this.mainMenu
        );

        this.player2 = new Player(
            new Texture("Game/Assets/players/mushroom64x80.png"),
            new Vector2D(this.width / 2 + 300, this.height / 2),
            this.keyboard, this.mouse, 2,
            this.inventory, this.mainMenu
        );

        this.player4 = new Player(
            new Texture("Game/Assets/players/NightBorne80x80.png"),
            new Vector2D(this.width / 2 + 300, this.height / 2),
            this.keyboard, this.mouse, 4,
            this.inventory, this.mainMenu
        );
        
        this.player1.switchPlayer(true);

        this.entities = new Entities();
        this.entities.setRandomMode(true);

        this.autoSaveSlot = freeSlot;
        this.saveGame(freeSlot);

        this.showIntro = false;
        this.mainMenu.updateIntro(true);
        this.mainMenu.updateSee(false);
    }

    //utilidades
    get currentPlayer() {
        if (this.player1.currentPlayer) return this.player1;
        if (this.player2.currentPlayer) return this.player2;
        if (this.player4.currentPlayer) return this.player4;
        return this.player1;  // padrão inicial
    }    

    adjustmentMinimap(ctx) {
        const minimapX      = this.currentPlayer.MinimapLayout.position.x;
        const minimapY      = this.currentPlayer.MinimapLayout.position.y; 
        const diff          = this.currentPlayer.PlayerId == 4 ? 40 : this.currentPlayer.PlayerId == 1 ? 50 : 35;           
        const minimapOffset = 250 - this.currentPlayer.currentAnim.width / 2 + diff; //tamanho do mapa - tamanho da animação do player

        ctx.save();
        
        ctx.beginPath();
        ctx.rect(minimapX, minimapY, minimapOffset, minimapOffset);
        ctx.clip();

        ctx.translate(minimapX, minimapY);        
        
        this.minMapCam.setPosition(this.currentPlayer.position);

        this.minMapCam.applyTransform(ctx, minimapOffset, minimapOffset);

        if (this.tilemapMini != null)
            this.tilemapMini.draw(ctx);
        
        this.entities.drawAll(ctx);

        this.minMapCam.resetTransform(ctx, minimapOffset, minimapOffset);

        ctx.restore();
    }

    clearSwitches(refChar){
        this.player1.switchPlayer(refChar == 1 ? true : false);
        this.player2.switchPlayer(refChar == 2 ? true : false);
        this.player4.switchPlayer(refChar == 4 ? true : false);
    }

    onResize(){
        this.width  = document.documentElement.clientWidth;
        this.height = document.documentElement.clientHeight;

        this.canvas.width  = this.width;
        this.canvas.height = this.height;

        this.HUDCanvas.width  = this.width;
        this.HUDCanvas.height = this.height;
        
        this.mainMenu.size.set(this.width + 120,this.height + 120);
        this.mainMenu.onResize(this.mainMenu.position,this.mainMenu.size);

        this.player1.onResizeHUD(this.width, this.height);
        this.player2.onResizeHUD(this.width, this.height);
        this.player4.onResizeHUD(this.width, this.height);
    }

}