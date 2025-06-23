export default class Mouse {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.isLeft = false;
    this.isRight = false;

    this.scrollUp = false;
    this.scrollDown = false;

    window.addEventListener('wheel', e => {
      if (e.deltaY < 0) {
        this.scrollUp = true;
      } else if (e.deltaY > 0) {
        this.scrollDown = true;
      }
    });

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

  /**
   * @param {{x: number, y: number, sW: number, height: sH}} obj -tamanho em {-x,-y,-sX,-sW}
   * @returns {boolean} 
   */
  isOver(obj) {
    return (
      this.x >= obj.x          &&
      this.x <= obj.x + obj.sW &&
      this.y >= obj.y          &&
      this.y <= obj.y + obj.sH
    );
  }

  /**
   * @param {{x: number, y: number, sW: number, height: sH}} obj -tamanho em {-x,-y,-sX,-sW}
   * @param {number} type -tipo: 0 - esquerda / 1 - direita
   * @returns {boolean} 
   */
  isClick(obj,type) {
    if(type == 0)
      return this.isOver(obj) && this.isLeft;   
    else if(type == 1)
      return this.isOver(obj) && this.isRight;   
    else
      return false;
  }

  resetScroll() {
    this.scrollUp = false;
    this.scrollDown = false;
  }
}