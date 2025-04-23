import UIElement from "./UIElement.js";

export default class UIButton extends UIElement {
    constructor(text, x, y, classes = "", styles = {}) {
        super("button", {
            text,
            styles: styles,
            classes: classes
        });

        this.setPosition(x, y);
    }
}