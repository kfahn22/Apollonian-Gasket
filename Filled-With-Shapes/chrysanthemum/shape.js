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
  "#FCEE21",
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

  // Not working yet
  // showButterfly() {
  //   stroke(this.color);
  //   strokeWeight(0.2);
  //   //fill(this.color);
  //   push();
  //   setCenter(this.center.a, this.center.b);
  //   polarButterfly(0, this.radius * 2, this.radius);
  //   pop();
  // }

  showCircle() {
    stroke(255);
    noFill();
    circle(this.center.a, this.center.b, this.radius * 2);
  }

  showFlower() {
    stroke(255, 255, 255, 100);
    let sw = map(Math.log2(this.radius), 3.4, Math.log2(100), 0.3, 2);
    strokeWeight(sw);
    //strokeWeight(0.2*pow(this.radius, 0.3));
    push();
    setCenter(this.center.a, this.center.b);
    polarFlower(0, this.radius * 2, this.radius);
    pop();
  }

  showPhyllotaxis() {
    let sw = map(Math.log2(this.radius), 3.4, Math.log2(100), 0.3, 2);
    strokeWeight(sw);
    push();
    fill(221,183,113);
    noStroke();
    setCenter(this.center.a, this.center.b);
    phyllotaxis(0, this.radius * 2, this.radius);
    pop();
  }

  dist(other) {
    return dist(this.center.a, this.center.b, other.center.a, other.center.b);
  }
}
