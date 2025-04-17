import KeysState from "../Enums/key-state.js";

export default class Keyboard {
    constructor() {
        this.key = '';
        this.KeysState = null;

        window.addEventListener("keydown", e => {
            this.key = e.code;
            this.KeysState = KeysState.PRESSED;
        });

        window.addEventListener("keyup", e => {
            this.key = e.code;
            this.KeysState = KeysState.RELEASE;
        });
    }

    isKey(keyCode) {
        if (this.key === keyCode) {
            return this.KeysState;
        }
        return null;
    }
}