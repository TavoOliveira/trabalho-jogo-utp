export default class UIManager {
    constructor(container = document.body) {
        this.elements = [];
        this.container = container;
    }

    add(element) {
        this.elements.push(element);
        this.container.appendChild(element.el);
    }
}