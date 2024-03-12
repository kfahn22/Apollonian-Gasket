class Circle {
  constructor(bend, x, y) {
    this.center = new Complex(x, y);
    this.bend = bend;
    this.radius = abs(1 / this.bend);
  }

  show(c) {
    let col = color(93, 81, 121);
    let col2 = color(162, 250, 163);
    // logarithmic mapping because radius decreases exponentially
    let mycol = lerpColor(
      col, // defined in setup
      col2,
      map(Math.log2(this.radius), 3.4, Math.log2(100), 1, 0)
    );
    stroke(87, 31, 78);
    strokeWeight(2);

    noFill();
    fill(mycol);
    circle(this.center.a, this.center.b, this.radius * 2);
  }
  // show() {
  //   stroke(0);
  //   noFill();
  //   push();
  //   translate(this.center.a, this.center.b);
  //   circle(0, 0, this.radius * 2);
  //   pop();
  // }

  dist(other) {
    return dist(this.center.a, this.center.b, other.center.a, other.center.b);
  }
}
