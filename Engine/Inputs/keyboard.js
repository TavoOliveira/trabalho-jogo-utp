import KeysState from "../Enums/key-state.js";

export default class Keyboard {
    constructor() {
        this.key = {};

        window.addEventListener("keydown", e => {
            this.key[e.code] = KeysState.PRESSED;
        });

        window.addEventListener("keyup", e => {
            this.key[e.code] = KeysState.RELEASE;
        });
    }

    isKey(keyCode) {
        return this.key[keyCode];
    }
}