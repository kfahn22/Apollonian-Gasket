class SteinerChain {
  constructor(r, x, y, n) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.allCircles = [];
    this.queue = [];
    this.n = n;
    let c1 = new GasketCircle(-1 / this.r, this.x, this.y);
    this.allCircles.push(c1);
    let theta = PI / this.n;
    this.queue = [c1];
    let v = p5.Vector.fromAngle(random(TWO_PI));
    // Adding Steiner chain first
    let r2 = (c1.radius * sin(theta)) / (1 + sin(theta));
    for (let i = 0; i < this.n; i++) {
      v.rotate(TWO_PI / this.n);
      v.setMag(c1.radius - r2);
      let c = new GasketCircle(1 / r2, this.x + v.x, this.y + v.y);
      this.allCircles.push(c);
      this.queue.push(c);
    }
    let r3 = c1.radius - 2 * r2;
    let c3 = new GasketCircle(1 / r3, this.x, this.y);
    this.allCircles.push(c3);
    this.queue.push(c3);
    this.recursed = false;
    this.startC = this.allCircles.shift();

    let len = -1;
    while (this.allCircles.length !== len) {
      len = this.allCircles.length;
      this.nextGeneration();
    }
  }

  recurse() {
    if (this.recursed) return;
    this.recursed = true;
    let newChains = [];
    for (let i = 0; i < this.allCircles.length; i++) {
      let c = this.allCircles[i];
      if (c.radius < 4) continue;
      newChains.push(
        new SteinerChain(c.center.a, c.center.b, c.radius, this.n)
      );
    }
    return newChains;
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
