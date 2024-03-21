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

class Chain {
  constructor(_r, _x, _y, _n) {
    this.x = _x;
    this.y = _y;
    this.r = _r;
    this.allCircles = [];
    this.queue = [];
    this.n = _n;
    let c1 = new Circle(this.r, this.x, this.y);
    this.allCircles.push(c1);
    let theta = PI / this.n;
    let v = p5.Vector.fromAngle(random(TWO_PI));
    // Adding Steiner chain first
    let r2 = (c1.r * sin(theta)) / (1 + sin(theta));
    for (let i = 0; i < this.n; i++) {
      v.rotate(TWO_PI / this.n);
      v.setMag(c1.r - r2);
      let c = new Circle(r2, this.x + v.x, this.y + v.y);
      this.allCircles.push(c);
      this.queue.push(c);
    }
    let r3 = c1.r - 2 * r2;
    let c3 = new Circle(r3, this.x, this.y);
    this.allCircles.push(c3);
    this.queue.push(c3);
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
    let gradient = createRadialGradient(0, this.r, this.x, this.y);
    // let col = color(97,48,75);
    // let col2 = color(148,191,190);
    // let col3 = color(133,124,141);
     let col = color(76,76,157);
     let col2 = color(247,153,110);
     let col3 = color(113,47,121);
    gradient.colors(0, col, 0.5, col2, 1, col3);
    //stroke(92,0,41);
    stroke(76,76,157)
    fillGradient(gradient);
    let sw = map(Math.log2(this.r), 3.4, Math.log2(50), 0.5, 2);
    strokeWeight(sw);
    ellipse(this.x, this.y, 2 * this.r, 2 * this.r);
  }
}
