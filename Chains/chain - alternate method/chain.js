// This is probably not all necessary but planning to try to intergrate at some point

// https://en.wikipedia.org/wiki/Steiner_chain

function isTangent(c1, c2) {
  let d = c1.dist(c2);
  let r1 = c1.radius;
  let r2 = c2.radius;

  let a = abs(d - (r1 + r2)) < epsilon;
  let b = abs(d - abs(r2 - r1)) < epsilon;
  return a || b;
}

function validate(c4, c1, c2, c3, allCircles) {
  if (c4.radius < 2) return false;

  for (let other of allCircles) {
    let d = c4.dist(other);
    let radiusDiff = abs(c4.radius - other.radius);
    if (d < epsilon && radiusDiff < epsilon) {
      return false;
    }
  }

  // Check if all 4 circles are mututally tangential
  if (!isTangent(c4, c1)) return false;
  if (!isTangent(c4, c2)) return false;
  if (!isTangent(c4, c3)) return false;

  return true;
}
// trying a different method
// https://archive.lib.msu.edu/crcmath/math/math/s/s706.htm
class Chain {
  constructor(_r, _x, _y, _n, _d) {
    this.x = _x;
    this.y = _y;
    this.r = _r;
    this.allCircles = [];
    this.queue = [];
    this.n = _n;
    this.d = _d;
    this.r = _r;
    // let rnew = this.r / (pow(this.r, 2) - pow(this.d, 2));
    //  console.log(rnew);
    let c1 = new Circle(this.r, this.x, this.y);
    this.allCircles.push(c1);
    let theta = PI / this.n;
    // central circle
    let r2 = this.r * ((1 - sin(theta)) / (1 + sin(theta)));
    // let r2new = abs(r2 / (pow(this.d, 2) - pow(this.r2, 2)));
    let v = p5.Vector.fromAngle(random(TWO_PI));
    let c2 = new Circle(r2, this.x, this.y);
    this.allCircles.push(c2);
    this.queue.push(c2);
    // smaller circles
    let r3 = 0.5 * (this.r - r2);
    for (let i = 0; i < this.n; i++) {
      v.rotate(TWO_PI / this.n);
      v.setMag(c1.r - r3);
      let c = new Circle(r3, this.x + v.x, this.y + v.y);
      this.allCircles.push(c);
      this.queue.push(c);
    }

    this.recursed = false;
  }

  show() {
    for (let c of this.allCircles) {
      c.show();
    }
  }
}

class Circle {
  constructor(r, x, y) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  show() {
    let col = color(87, 83, 102);
    let col2 = color(208, 256, 26);
    let mycol = lerpColor(
      col,
      col2,
      map(Math.log2(this.r), 3.4, Math.log2(50), 1, 0)
    );
    stroke(87, 98, 213);
    fill(mycol);
    let sw = map(Math.log2(this.r), 3.4, Math.log2(50), 0.5, 2);
    strokeWeight(sw);
    circle(this.x, this.y, 2 * this.r);
  }
}
