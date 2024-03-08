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
    this.logo = new Logo(0, 0);
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

  // figure out size of logo
  showLogo() {
    let sc = map(this.radius, 0, width / 2, 0, 1.7);
    circle(this.center.a, this.center.b, this.radius * 2);
    push();
    translate(
      this.center.a - this.radius * 0.54,
      this.center.b - this.radius * 0.54
    );
    scale(sc);
    strokeWeight(0.5 * pow(this.radius, 0.5));
    this.logo.logo();
    pop();
  }

  showCircle() {
    stroke(this.color);
    noFill();
    circle(this.center.a, this.center.b, this.radius * 2);
  }

  dist(other) {
    return dist(this.center.a, this.center.b, other.center.a, other.center.b);
  }
}
