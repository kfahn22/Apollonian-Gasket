class Circle {
  constructor(bend, x, y, index) {
    this.center = new Complex(x, y);
    this.bend = bend;
    this.radius = abs(1 / this.bend);
    this.index = index;
  }

  show(c) {
    // logarithmic mapping because radius decreases exponentially
    let col = lerpColor(
      col1,
      col2,
      map(Math.log2(this.radius), 3.4, Math.log2(100), 1, 0)
    );
    //stroke(252, 238, 33);
    stroke(0)
    strokeWeight(1);
    //fill(col);
    circle(this.center.a, this.center.b, this.radius * 2);
  }

  dist(other) {
    return dist(this.center.a, this.center.b, other.center.a, other.center.b);
  }
}
