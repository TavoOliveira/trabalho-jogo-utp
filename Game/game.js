import Player from "./Entities/player.js";
import Enemy from "./Entities/enemy.js";
import inventory from "../Game/HUD/inventory.js"
import Vector2D from "../Engine/Utils/vector2d.js";
import Texture from "../Engine/Utils/texture.js";
import Keyboard from "../Engine/Inputs/keyboard.js";
import Mouse from "../Engine/Inputs/mouse.js";
import { Collision } from "../Engine/Collision/index.js";
import TileMap from "../Engine/Map/tile-map.js";
import JsonLoader from "../Engine/Utils/json-loader.js";
import Camera from "../Engine/Utils/camera.js";
import KeysState from "../Engine/Enums/key-state.js";

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

        //Inputs
        this.keyboard = new Keyboard();
        this.mouse    = new Mouse();  

        //inventario
        this.inventory = new inventory();

        //Players
        this.sharedPosition = new Vector2D(this.width / 2, this.height / 2);
                
        this.player1 = new Player(new Texture("Game/Assets/global.png"), this.sharedPosition, this.keyboard,this.mouse,1,this.inventory);
        this.player2 = new Player(new Texture("Game/Assets/global.png"), this.sharedPosition, this.keyboard,this.mouse,2,this.inventory);
        this.player4 = new Player(new Texture("Game/Assets/global.png"), this.sharedPosition, this.keyboard,this.mouse,4,this.inventory);
        this.player1.switchPlayer(true);        

        //inimgos
        this.enemy = new Enemy(null, new Vector2D(100, 100));

        //minimapa e camera
        this.camera    = new Camera(new Vector2D(0,0).position, 3);
        this.minMapCam = new Camera(new Vector2D(0,0).position, 0.3);        

        this.tilemap     = null;
        this.tilemapMini = null;

        JsonLoader.load("Game/Maps/teste.json")
        .then(data => {
            this.tilemap     = new TileMap(data);
            this.tilemapMini = new TileMap(data);;
        });

        this.lastTime = 0;

        window.addEventListener('resize', () => this.onResize());

        this.loop(0);             
    }
    
    loop(timestamp) {
        if (!this.lastTime) this.lastTime = timestamp;

        let deltaTime = Math.min(timestamp - this.lastTime, 100);

        this.lastTime = timestamp;        
        
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
        hudctx.fillRect(this.currentPlayer.MinimapLayout.position.x,this.currentPlayer.MinimapLayout.position.y,250,250)             

        //=== MINIMAPA ===
        this.adjustmentMinimap(hudctx);          

        //=== CAMERA PRINCIPAL ===
        this.camera.setPosition(this.currentPlayer.position);
        this.camera.applyTransform(ctx, this.canvas.width, this.canvas.height);                  

        if (this.tilemap != null)
            this.tilemap.draw(ctx);         

        this.currentPlayer.draw(ctx, hudctx);        
        this.enemy.draw(ctx);                      

        this.camera.resetTransform(ctx, this.canvas.width, this.canvas.height);            
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
        const minimapOffset = 250 - this.currentPlayer.currentAnim.width / 2; //tamanho do mapa - tamanho da animação do player

        ctx.save();
        
        ctx.beginPath();
        ctx.rect(minimapX, minimapY, minimapOffset, minimapOffset);
        ctx.clip();

        ctx.translate(minimapX, minimapY);        
        
        this.minMapCam.setPosition(this.currentPlayer.position);

        this.minMapCam.applyTransform(ctx, minimapOffset, minimapOffset);

        if (this.tilemapMini != null)
            this.tilemapMini.draw(ctx);
        
        this.enemy.draw(ctx);

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

        this.player1.onResizeHUD(this.width, this.height);
        this.player2.onResizeHUD(this.width, this.height);
        this.player4.onResizeHUD(this.width, this.height);
    }

}