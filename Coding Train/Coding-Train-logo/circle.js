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

  showLogo() {
    noFill();
    // Scale logo because size is hardcoded
    let sc = map(this.radius, 0, width / 2, 0, 1.7);
    circle(this.center.a, this.center.b, this.radius * 2);
    push();
    // Slight adjustment to try to center logo in center of circle
    translate(
      this.center.a - this.radius * 0.54,
      this.center.b - this.radius * 0.54
    );
    // Adjust strokeweight to radius of circle
    let sw = map(Math.log2(this.radius), 3.4, Math.log2(100), 0.3, 6);
    scale(sc);
    this.logo.logo(sw);
    pop();
  }

  showCircle(fillCircle) {
    //stroke(this.color);
    //lerp between purple and orange
    // let col = color("#F89E4F");
    // let col2 = color("#70327E");

    let col = color("#30C5F3");
    let col2 = color("#EF63A4");
    let mycol = lerpColor(
      col,
      col2,
      map(Math.log2(this.radius), 3.4, Math.log2(100), 1, 0)
    );
    let sw = map(Math.log2(this.radius), 3.4, Math.log2(100), 1, 3);
    //stroke(mycol);
    stroke(0);
    strokeWeight(sw);
    if (!fillCircle) {
      noFill();
      circle(this.center.a, this.center.b, this.radius * 2);
    } else {
      stroke(0);
      fill(mycol);
      circle(this.center.a, this.center.b, this.radius * 1.95);
    }
  }

  dist(other) {
    return dist(this.center.a, this.center.b, other.center.a, other.center.b);
  }
}
