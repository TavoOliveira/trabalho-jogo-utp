import Player from "./Entities/player.js";
import Enemy from "./Entities/enemy.js";
import Vector2D from "../Engine/Utils/vector2d.js";
import Texture from "../Engine/Utils/texture.js";
import Keyboard from "../Engine/Inputs/keyboard.js";
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

        this.width = document.documentElement.clientWidth;
        this.height = document.documentElement.clientHeight;

        this.canvas.width  = this.width;
        this.canvas.height = this.height;

        this.HUDCanvas.width  = this.width;
        this.HUDCanvas.height = this.height;

        this.keyboard = new Keyboard();        
        
        this.player = new Player(new Texture("Game/Assets/global.png"), new Vector2D(300, 300), this.keyboard);

        this.enemy = new Enemy(null, new Vector2D(100, 100));

        this.camera = new Camera(this.player.position, 4);

        this.tilemap = null;

        JsonLoader.load("Game/Maps/teste.json")
        .then(data => {
            this.tilemap = new TileMap(data);
        });

        this.lastTime = 0;

        this.loop(0);             
    }

    loop(timestamp) {
        if (!this.lastTime) this.lastTime = timestamp;

        let deltaTime = Math.min(timestamp - this.lastTime, 100);

        this.lastTime = timestamp;

        this.draw(this.ctx, this.HUDctx);

        this.player.update(deltaTime);        

        requestAnimationFrame(this.loop.bind(this));
    }

    /** @param {CanvasRenderingContext2D} ctx */
    draw(ctx, hudctx) {
        ctx.clearRect(0, 0, this.width, this.height);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, this.width, this.height);

        this.camera.setPosition(this.player.position);
        this.camera.applyTransform(ctx, this.canvas);

        if (this.tilemap != null)
            this.tilemap.draw(ctx);

        this.player.draw(ctx,hudctx);
        this.enemy.draw(ctx);        

        this.camera.resetTransform(ctx, this.canvas);
    }

    
}