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

  show() {
    stroke(0);
    noFill();
    circle(this.center.a, this.center.b, this.radius * 2);
  }

  showGear() {
    stroke(this.color);
    //fill(this.color);
    push();
    setCenter(this.center.a, this.center.b);
    polarGear(0, this.radius * 2, this.radius);
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

  showPhyllotaxis() {
    //stroke(255)
    // strokeWeight(0.05);
    fill(this.color);
    push();
    setCenter(this.center.a, this.center.b);
    phyllotaxis(0, this.radius * 2, this.radius);
    pop();
  }

  showClock() {
    stroke(this.color);
    push();
    setCenter(this.center.a, this.center.b);
    clock(-90, this.radius * 2, this.radius);
    circle(0, 0, this.radius * 1.99);
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

  showSpheres() {
    stroke(126, 63, 143);
    //fill(this.color);
    push();
    setCenter(2 * this.center.a, 2 * this.center.b);
    shiftRotate(0, 0);
    polarSphere(0, this.radius * 2, this.radius);
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
    polarPentagons(8, this.radius / 3, this.radius / 1.5);
    pop();
  }

  dist(other) {
    return dist(this.center.a, this.center.b, other.center.a, other.center.b);
  }
}
