export default class UIElement {
    constructor(tag, options = {}) {
        /** @type {HTMLElement} */
        this.el = document.createElement(tag);
        this.el.style.position = "absolute";
        this.el.style.zIndex = "10";
        this.setStyles(options.styles || {});
        if (options.text) this.el.textContent = options.text;
        if (options.id) this.el.id = options.id;
        if (options.classes) this.el.classList.add(...options.classes.split(" "));
    }

    setStyles(styles) {
        Object.assign(this.el.style, styles);
    }

    setPosition(x, y) {
        this.el.style.left = `${x}px`;
        this.el.style.top = `${y}px`;
    }

    setText(text) {
        this.el.textContent = text;
    }

    on(event, callback) {
        this.el.addEventListener(event, callback);
    }

    show() {
        this.el.style.display = "block";
    }

    hide() {
        this.el.style.display = "none";
    }

    remove() {
        this.el.remove();
    }
}