// This is probably not all necessary but planning to try to intergrate at some point

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
  constructor(r, x, y, n) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.allCircles = [];
    this.queue = [];
    this.n = n;
    let c1 = new Circle(this.r, this.x, this.y);
    this.allCircles.push(c1);
    let theta = PI / this.n;
    //this.queue = [c1];
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
    // this.startC = this.allCircles.shift();

    let len = -1;
    // while (this.allCircles.length !== len) {
    //   len = this.allCircles.length;
    //   this.nextGeneration();
    // }
  }

  recurse() {
    //if (this.recursed) return;
    this.queue = [];
    for (let i = 0; i < this.allCircles.length; i++) {
      let c = this.allCircles[i];
      if (c.r > 20) {
        let newChain = new Chain(c.r, c.x, c.y, this.n);
        this.queue = newChain.queue;
        this.allCircles.push(this.queue);
      }
    }
  }

  nextGeneration() {
    let nextQueue = [];
    nextQueue = nextQueue.concat(this.queue);
    this.queue = nextQueue;
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
    let col = color(160, 236, 208);
    let col2 = color(113, 73, 85);
    let mycol = lerpColor(
      col,
      col2,
      map(Math.log2(this.r), 3.4, Math.log2(100), 1, 0)
    );
    stroke(mycol);
    let sw = map(Math.log2(this.r), 3.4, Math.log2(100), 0.5, 2);
    strokeWeight(sw);
    noFill();
    circle(this.x, this.y, 2 * this.r);
  }
}
