import Scene from "./scene.js";
import UIButton from "../UI/UIButton.js";
import UIManager from "../UI/UIManager.js";
import GameScene from "./game-scene.js";

export default class MenuScene extends Scene{
    onEnter() {
        this.ui = new UIManager();
            
        let button = new UIButton("click", 10, 10, "", {background: "pink"});
        button.on("click", () => {
            this.nextScene = new GameScene();
            console.log("Menu Click");
        });
        
        ui.add(button);
    }

    onExit() {
        this.ui.removeAll();
        console.log("Menu Saiu");
    }

}