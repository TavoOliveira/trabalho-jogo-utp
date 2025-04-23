import Scene from "./scene.js";
import UIButton from "../UI/UIButton.js";
import UIManager from "../UI/UIManager.js";

export default class GameScene extends Scene{
    onEnter() {
        let ui = new UIManager();
            
        let button = new UIButton("lutar", 20, 20, "", {background: "red"});
        ui.add(button);
    }
}