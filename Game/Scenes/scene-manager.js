import Scene from "./scene.js";

export default class SceneManager {
    constructor() {
        /** @type {Scene} */
        this.currentScene = null;
    }

    /** @param {Scene} newScene */
    changeScene(newScene) {
        if (this.currentScene) this.currentScene.onExit();
        this.currentScene = newScene;
        this.currentScene.onEnter();
    }

    update() {
        if (this.currentScene) this.currentScene.update();

        const next = this.currentScene.getNextScene();

        if (next) {
            this.changeScene(next);
        }
    }

    draw(ctx) {
        if (this.currentScene) this.currentScene.draw(ctx);
    }
    

    
}
