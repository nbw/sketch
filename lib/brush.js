class Brush {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this._x = x;
    this._y = y;
    this.consumed = true;
  }

  setX(x) {
    this.x = x;
  }

  setY(y) {
    this.y = y;
  }

  add(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  changed() {
    return (this.x != this._x) || (this.y != this._y);
  }

  normalize() {
    this._x = this.x;
    this._y = this.y;
  }
}

export default Brush;


