// Polar shapes from the p5.Polar.js library
// https://github.com/liz-peng/p5.Polar/tree/master

let colorsCT = [
  "#70327E",
  "#9253A1",
  "#A42963",
  "#EC015A",
  "#F063A4",
  "#F16164",
  "#F89E4F",
  "#2DC5F4",
];

class Circle {
  constructor(bend, x, y) {
    this.center = new Complex(x, y);
    this.bend = bend;
    this.radius = abs(1 / this.bend);
    this.color = color(random(colorsCT));
  }

  shiftRotate(_angle, _distance) {
    const _radians = this.radians(_angle);
    this.translate(
      this.sin(_radians) * _distance,
      this.cos(_radians) * -_distance
    );
    this.rotate(this.radians(_angle));
  }

  setCenter(x, y) {
    if (this.center === undefined) {
      this.center = { x, y };
    }
    translate((this.center.x = x), (this.center.y = y));
  }

  showCircle() {
    let sw = map(Math.log2(this.radius), 3.4, Math.log2(100), 0.3, 4);
    strokeWeight(sw);
    stroke(this.color);
    noFill();
    circle(this.center.a, this.center.b, this.radius * 2);
  }

  showGear(angle) {
    stroke(this.color);
    let sw = map(Math.log2(this.radius), 3.4, Math.log2(100), 0.3, 4);
    strokeWeight(sw);
    //strokeWeight(0.5 * pow(this.radius, 0.3));
    push();
    setCenter(this.center.a, this.center.b);
    polarGear(0, this.radius * 2, this.radius, 20);
    pop();
  }

  showClock() {
    let sw = map(Math.log2(this.radius), 3.4, Math.log2(100), 0.3, 6);
    strokeWeight(sw);
    stroke(this.color);
    push();
    setCenter(this.center.a, this.center.b);
    clock(-90, this.radius * 2, this.radius);
    //circle(0, 0, this.radius * 1.99);
    pop();
  }
  dist(other) {
    return dist(this.center.a, this.center.b, other.center.a, other.center.b);
  }
}
