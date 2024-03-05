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
    stroke(0);
    noFill();
    circle(this.center.a, this.center.b, this.radius * 2);
  }

  showClock() {
    stroke(this.color);
    push();
    setCenter(this.center.a, this.center.b);
    clock(-90, this.radius * 2, this.radius);
    circle(0, 0, this.radius * 1.99);
    pop();
  }

  showFlower() {
    //stroke(this.color);
    stroke(255, 255, 255, 100);
    strokeWeight(0.2);
    //fill(this.color);
    push();
    setCenter(this.center.a, this.center.b);
    polarFlower(0, this.radius * 2, this.radius);
    pop();
  }

  showGear() {
    stroke(this.color);
    //fill(this.color);
    push();
    setCenter(this.center.a, this.center.b);
    polarGear(0, this.radius * 2, this.radius);
    pop();
  }

  showPhyllotaxis() {
    //stroke(255)
    // strokeWeight(0.05);
    fill(this.color);
    push();
    setCenter(this.center.a, this.center.b);
    phyllotaxis(0, this.radius * 2, this.radius);
    pop();
  }

  showPolygon() {
    //stroke(255, 0, 0, 50);
    noStroke();
    fill(this.color);
    push();
    setCenter(this.center.a, this.center.b);
    polarPolygon(6, this.radius * 2, this.radius);
    pop();
  }

  showTriangles() {
    noStroke();
    fill(this.color);
    //stroke(this.color);
    push();
    setCenter(this.center.a, this.center.b);
    shiftRotate(0, 0);
    polarTriangles(6, this.radius / 3, this.radius / 1.5);
    pop();
  }

  showPentagons() {
    noStroke();
    fill(this.color);
    //stroke(this.color);
    push();
    setCenter(this.center.a, this.center.b);
    shiftRotate(0, 0);
    polarPentagons(6, this.radius / 3, this.radius / 1.5);
    pop();
  }

  dist(other) {
    return dist(this.center.a, this.center.b, other.center.a, other.center.b);
  }
}
