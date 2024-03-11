class Steiner {
  constructor(_c) {
    this.outer = _c;
    this.allCircles = [];
    this.centers = [];
    this.queue = [];
    this.epsilon = 0.1;
    this.n = 6;
  }

  init() {
    this.allCircles = [];
    this.queue = [];
    let c1 = this.outer;
    let r2 = c1.radius / 3;
    let v = p5.Vector.fromAngle(random(TWO_PI));
    v.setMag(c1.radius - r2);
    let c2 = new Circle(1 / r2, c1.center.a, c1.center.b);
    let r3 = v.mag() - r2;
    this.allCircles = [c1, c2];
    for (let i = 0; i < this.n; i++) {
      v.rotate(TWO_PI / this.n);
      v.setMag(c1.radius - r3);
      this.allCircles.push(
        new Circle(1 / r3, c1.center.a + v.x, c1.center.b + v.y)
      );
    }
  }

  add() {
    this.init(this.outer);
    for (let i = 0; i < allCircles.length; i++) {
      let c = allCircles[i];
      if (c.radius > 100) {
        this.init(c);
      }
    }
  }

  showCircles() {
    for (let c of this.allCircles) {
      c.show();
    }
  }
}
