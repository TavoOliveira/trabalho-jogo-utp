import Scene from "./scene.js";
import UIButton from "../UI/UIButton.js";
import UIManager from "../UI/UIManager.js";
import GameScene from "./game-scene.js";

export default class MenuScene extends Scene{
    onEnter() {
        this.ui = new UIManager();
            
        let button = new UIButton("click", 100, 100, "btn", {background: "blue"});
        button.on("click", () => {
            this.nextScene = new GameScene();
            console.log("Menu Click");
        });
        
        this.ui.add(button);
    }

    onExit() {
        this.ui.removeAll();
        console.log("Menu Saiu");
    }

}