export default class Mouse {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.isLeft = false;
    this.isRight = false;

    window.addEventListener('mousedown', e => {
      if (e.button === 0) {
        this.isLeft = true;
      } else if (e.button === 2) {
        this.isRight = true;
      }
    });

    window.addEventListener('mouseup', e => {
      if (e.button === 0) {
        this.isLeft = false;
      } else if (e.button === 2) {
        this.isRight = false;
      }
    });

    window.addEventListener('mousemove', e => {
      this.x = e.clientX;
      this.y = e.clientY;
    });
  }

  getPosition() {
    return { x: this.x, y: this.y };
  }
}