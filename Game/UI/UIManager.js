export default class UIManager {
  constructor(container = document.body) {
    this.elements = [];
    this.container = container;
  }

  add(element) {
    this.elements.push(element);
    this.container.appendChild(element.el);
  }

  removeAll() {
    for (const element of this.elements) {
      if (element.el) {
        this.container.removeChild(element.el);
      }
    }
    this.elements = [];
  }
}
