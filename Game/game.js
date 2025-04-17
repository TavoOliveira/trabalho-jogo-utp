import KeysState from "./Enums/key-state.js";
import Keyboard from "./Inputs/keyboard.js";
import Mouse from "./Inputs/mouse.js";
import UIButton from "./UI/UIButton.js";
import UIImage from "./UI/UIImage.js";
import UIManager from "./UI/UIManager.js";

export default class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");

        this.width = document.documentElement.clientWidth;
        this.height = document.documentElement.clientHeight;

        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.keyboard = new Keyboard();
        this.mouse = new Mouse();
        
        let button = new UIButton("Click me!", 100, 100, "btn btn-start", { background: "Red" });
        button.on("click", () => {
            button.setText("Clicado");
        });

        //let image = new UIImage("https://casa.abril.com.br/wp-content/uploads/2021/03/tipos-de-flores-para-decorar-seu-ambiente-casa.com-7-jacinto.jpg", 0, 0, "", { width: "100%", height: "100%" });

        this.ui = new UIManager();
        this.ui.add(button);
        //this.ui.add(image);

        this.loop();
    }

    loop() {
        this.draw(this.ctx);

        requestAnimationFrame(this.loop.bind(this));
    }

    /** @param {CanvasRenderingContext2D} ctx */
    draw(ctx) {
        ctx.clearRect(0, 0, this.width, this.height);
    }
}