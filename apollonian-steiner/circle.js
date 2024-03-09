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
    //translate(this.center.a, this.center.b);
    circle(this.center.a, this.center.b, this.radius * 2);
    pop();
  }

  apollonian() {
    stroke(0);
    noFill();

    push();
    //translate(this.center.a, this.center.b);
    centers.push(
      new Apollonian(new Circle(-1 / this.radius, this.center.a, this.center.b))
    );
    pop();
  }

  dist(other) {
    return dist(this.center.a, this.center.b, other.center.a, other.center.b);
  }
}
