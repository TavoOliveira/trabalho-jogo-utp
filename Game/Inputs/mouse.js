class Mouse {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.pressedButtons = '';

    window.addEventListener('mousedown', this.onMouseDown.bind(this));
    window.addEventListener('mouseup', this.onMouseUp.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
  }

  onMouseDown(event) {
    this.pressedButtons[event.button] = true;
  }

  onMouseUp(event) {
    this.pressedButtons[event.button] = false;
  }

  onMouseMove(event) {
    this.x = event.clientX;
    this.y = event.clientY;
  }

  isButtonPressed(button) {
    return !!this.pressedButtons[button];
  }

  isButtonReleased(button) {
    return !this.pressedButtons[button];
  }

  getPosition() {
    return { x: this.x, y: this.y };
  }
}