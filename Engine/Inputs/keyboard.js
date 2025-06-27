import KeysState from "../Enums/key-state.js";

export default class Keyboard {
    constructor() {
        this.key = {};

        window.addEventListener("keydown", e => {
            if (this.key[e.code] !== KeysState.PRESSED) {
                this.key[e.code] = KeysState.PRESSED;
            }
        });

        window.addEventListener("keyup", e => {
            if (this.key[e.code] === KeysState.PRESSED) {
                this.key[e.code] = KeysState.CLICKED;
            }
        });
    }

    isKey(keyCode) {
        return this.key[keyCode] ?? KeysState.RELEASE;
    }

    anyKeyPressed() {
        return Object.values(this.key).some(state => state === KeysState.CLICKED);
    }
    
    reset() {
        for (let key in this.key) {
            if (this.key[key] === KeysState.CLICKED) {
                this.key[key] = KeysState.RELEASE;
            }
        }
    }
}
