class Circle {
  constructor(bend, x, y) {
    this.center = new Complex(x, y);
    this.bend = bend;
    this.radius = abs(1 / this.bend);
  }

  show() {
    stroke(0);
    noFill();
    push();
    translate(this.center.a, this.center.b);
    circle(0, 0, this.radius * 2);
    pop();
  }

  dist(other) {
    return dist(this.center.a, this.center.b, other.center.a, other.center.b);
  }
}
