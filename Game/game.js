import KeysState from "./Enums/key-state.js";
import Keyboard from "./Inputs/keyboard.js";
import Mouse from "./Inputs/mouse.js";
import UIButton from "./UI/UIButton.js";
import UIImage from "./UI/UIImage.js";
import UIManager from "./UI/UIManager.js";
import SceneManager from "./Scenes/scene-manager.js";
import MenuScene from "./Scenes/menu-scene.js";

export default class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");

        this.width = document.documentElement.clientWidth;
        this.height = document.documentElement.clientHeight;

        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.sceneManager = new SceneManager();
        this.sceneManager.changeScene(new MenuScene());
        

        this.loop();
    }

    loop() {
        this.draw(this.ctx);

        this.sceneManager.update();

        requestAnimationFrame(this.loop.bind(this));
    }

    /** @param {CanvasRenderingContext2D} ctx */
    draw(ctx) {
        ctx.clearRect(0, 0, this.width, this.height);

        this.sceneManager.draw(ctx);
    }

    
}