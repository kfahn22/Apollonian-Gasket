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
    this.particles = [];
    this.finished = false;
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
    // let sw = map(Math.log2(this.radius), 3.4, Math.log2(100), 0, 3);
    // strokeWeight(sw);
    stroke(255);
    noFill();
    circle(this.center.a, this.center.b, this.radius * 1.8);
  }

  // initStars() {
  //   for (let i = 0; i < 5; i++) {
  //     let p = new Particle(this.center.a, this.center.b, this.radius);
  //     this.particles.push(p);
  //   }
  // }
  showStars(n) {
    //let a = map(Math.log2(this.radius), 3.4, Math.log2(100), 255, 0);
    stroke(255, 255, 255);
    noFill();
    let numpart = map(Math.log2(this.radius), 3.4, Math.log2(100), 0, 3);
    //strokeWeight(sw);
    let r = map(Math.log2(this.radius), 3.4, Math.log2(100), 0.1, 3);

    for (let i = 0; i < n; i++) {
      this.particles[i] = [];
      push();
      //setCenter(this.center.a, this.center.b);
      for (let j = 0; j < numpart; j++) {
        this.particles[i][j] = [];
        this.particles[i][j] = new Particle(
          this.center.a,
          this.center.b,
          this.radius
        );
      }
      //console.log(this.particles[i])
      pop();
      for (let j = this.particles[i].length - 1; j >= 0; j--) {
        this.particles[i][j].update();
        this.particles[i][j].show(r);

        if (this.particles[i][j].finished()) {
          // remove this particle
          this.particles[i][j].splice(1);
        }
      }
    }
  }

  dist(other) {
    return dist(this.center.a, this.center.b, other.center.a, other.center.b);
  }
}
