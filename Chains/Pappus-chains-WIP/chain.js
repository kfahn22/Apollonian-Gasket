// This is probably not all necessary but planning to try to intergrate at some point
// https://www.shadertoy.com/view/MtG3WV

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

class Chain {
  constructor(_r, _x, _y, _n) {
    this.x = _x;
    this.y = _y;
    this.r = _r;
    this.allCircles = [];
    this.queue = [];
    this.n = _n;
    let c1 = new Circle(this.r, this.x, this.y);
    // this.allCircles.push(c1);
    let r2 = random(c1.r / 4, c1.r / 2);
    let v = p5.Vector.fromAngle(random(TWO_PI));
    v.setMag(c1.r - r2);
    let c2 = new Circle(r2, this.x + v.x, this.y + v.y);
    this.queue.push(c2);
    this.allCircles = [c1, c2];
    // r is ratio of diameter of enclosed circle to diameter of outer (unit) circle
    // not sure how to scale properly
    // https://en.wikipedia.org/wiki/Pappus_chain
    let r = r2 / c1.r;
    //let r = 2/3 * c1.r;
    for (let i = 0; i < n; i++) {
      let x = ((1 + r) * r) / (2 * (pow(i, 2) * pow(1 - r, 2) + r));
      let y = ((1 + r) * i * r) / (pow(i, 2) * pow(1 - r, 2) + r);
      let rn = (((1 - r) * r) / 2) * (pow(i, 2) * pow(1 - r, 2) + r);
      let v = createVector(x, y);
      v.setMag(c1.r);
      let c = new Circle(rn, x, y);
      this.allCircles.push(c);
      this.queue.push(c);
    }

    // this.allCircles = [c1, c2, c3];
    // this.queue = [[c1, c2, c3]];
    //

    // let theta = PI / this.n;
    // let v = p5.Vector.fromAngle(random(TWO_PI));
    // Adding Steiner chain first
    // let r2 = (c1.r * sin(theta)) / (1 + sin(theta));
    // for (let i = 0; i < this.n; i++) {
    //   v.rotate(TWO_PI / this.n);
    //   v.setMag(c1.r - r2);
    //   let c = new Circle(r2, this.x + v.x, this.y + v.y);
    //   this.allCircles.push(c);
    //   this.queue.push(c);
    // }
    // let r3 = c1.r - 2 * r2;
    // let c3 = new Circle(r3, this.x, this.y);
    // this.allCircles.push(c3);
    // this.queue.push(c3);
    // this.recursed = false;
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
    //fill(mycol);
    noFill();
    let sw = map(Math.log2(this.r), 3.4, Math.log2(50), 0.5, 2);
    strokeWeight(sw);
    circle(this.x, this.y, 2 * this.r);
  }
}
