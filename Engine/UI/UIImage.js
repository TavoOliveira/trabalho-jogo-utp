import UIElement from "./UIElement.js";

export default class UIImage extends UIElement {
    constructor(src, x, y, classes = "", styles = {}) {
        super("img", {
            classes: classes,
            styles: styles
        });

        this.setPosition(x, y);
        this.el.src = src;
    }
}