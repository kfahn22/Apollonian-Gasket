class Apollonian {
  constructor(_c) {
    this.outer = _c;
    this.allCircles = [];
    this.queue = [];
    this.epsilon = 0.2;
  }

  addCircles() {
    let c1 = this.outer;
    let r2 = random(100, c1.radius / 2);
    let v = p5.Vector.fromAngle(random(TWO_PI));
    v.setMag(c1.radius - r2);
    let c2 = new Circle(1 / r2, c1.radius + v.x, c1.radus + v.y);
    let r3 = v.mag();
    v.rotate(PI);
    v.setMag(c1.radius - r3);
    let c3 = new Circle(1 / r3, c1.radius + v.x, c1.radius + v.y);
    this.allCircles = [c1, c2, c3];
    //this.queue = [[c1, c2, c3]];
    //return [this.allCircles, this.queue];
    return this.allCircles;
  }

  validate(c4, c1, c2, c3) {
    if (c4.radius < 2) return false;

    for (let other of this.allCircles) {
      let d = c4.dist(other);
      let radiusDiff = abs(c4.radius - other.radius);
      if (d < this.epsilon && radiusDiff < this.epsilon) {
        return false;
      }
    }

    // Check if all 4 circles are mututally tangential
    if (!this.isTangent(c4, c1)) return false;
    if (!this.isTangent(c4, c2)) return false;
    if (!this.isTangent(c4, c3)) return false;

    return true;
  }

  isTangent(c1, c2) {
    let d = c1.dist(c2);
    let r1 = c1.radius;
    let r2 = c2.radius;

    let a = abs(d - (r1 + r2)) < this.epsilon;
    let b = abs(d - abs(r2 - r1)) < this.epsilon;
    return a || b;
  }

  nextGeneration() {
    let nextQueue = [];
    for (let triplet of this.queue) {
      let [c1, c2, c3] = triplet;
      let k4 = this.descartes(c1, c2, c3);
      let newCircles = this.complexDescartes(c1, c2, c3, k4);

      for (let newCircle of newCircles) {
        if (this.validate(newCircle, c1, c2, c3)) {
          this.allCircles.push(newCircle);
          let t1 = [c1, c2, newCircle];
          let t2 = [c1, c3, newCircle];
          let t3 = [c2, c3, newCircle];
          nextQueue = nextQueue.concat([t1, t2, t3]);
        }
      }
    }
    this.queue = nextQueue;
  }

  complexDescartes(c1, c2, c3, k4) {
    let k1 = c1.bend;
    let k2 = c2.bend;
    let k3 = c3.bend;
    let z1 = c1.center;
    let z2 = c2.center;
    let z3 = c3.center;

    let zk1 = z1.scale(k1);
    let zk2 = z2.scale(k2);
    let zk3 = z3.scale(k3);
    let sum = zk1.add(zk2).add(zk3);

    let root = zk1.mult(zk2).add(zk2.mult(zk3)).add(zk1.mult(zk3));
    root = root.sqrt().scale(2);
    let center1 = sum.add(root).scale(1 / k4[0]);
    let center2 = sum.sub(root).scale(1 / k4[0]);
    let center3 = sum.add(root).scale(1 / k4[1]);
    let center4 = sum.sub(root).scale(1 / k4[1]);

    return [
      new Circle(k4[0], center1.a, center1.b),
      new Circle(k4[0], center2.a, center2.b),
      new Circle(k4[1], center3.a, center3.b),
      new Circle(k4[1], center4.a, center4.b),
    ];
  }

  descartes(c1, c2, c3) {
    let k1 = c1.bend;
    let k2 = c2.bend;
    let k3 = c3.bend;

    let sum = k1 + k2 + k3;
    let product = abs(k1 * k2 + k2 * k3 + k1 * k3);
    let root = 2 * sqrt(product);
    return [sum + root, sum - root];
  }

  showCircles() {
    for (let c of this.allCircles) {
      c.show();
    }
  }
}
