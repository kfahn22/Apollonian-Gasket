let allCircles = [];
let queue = [];
let epsilon = 0.01;
let inc;
let frames = 60;

// Daniel Shiffman's short on creating the perfect GIF loop
// https://www.youtube.com/shorts/CEnfKhs6wLg

function keyPressed() {
  if (key == "s") {
    const options = {
      units: "frames",
      delay: 0,
    };
    saveGif("GIF/logo.gif", frames, options);
  }
}

function setup() {
  createCanvas(600, 600);
  c1 = new Circle(-1 / (width / 2), width / 2, height / 2);
  r2 = random(100, c1.radius / 2);
  let v = p5.Vector.fromAngle(random(TWO_PI));
  v.setMag(c1.radius - r2);
  c2 = new Circle(1 / r2, width / 2 + v.x, height / 2 + v.y);
  r3 = v.mag();
  v.rotate(PI);
  v.setMag(c1.radius - r3);
  c3 = new Circle(1 / r3, width / 2 + v.x, height / 2 + v.y);
  allCircles = [c1, c2, c3];
  queue = [[c1, c2, c3]];
}

function draw() {
  background(0);

  let len1 = allCircles.length;
  nextGeneration();
  let len2 = allCircles.length;
  // only added so initial circles don't slow animation
  if (len1 == len2) {
    allCircles.splice(1);
  }

  allCircles[0].showCircle();

  if (r2 < c1.radius / 2) {
    allCircles = updateRadius(c1, r2, r3);
    queue = [allCircles];
    for (let i = 1; i < allCircles.length; i++) {
      for (let i = 1; i < allCircles.length; i++) {
        if (allCircles[i].radius > 30) {
          allCircles[i].showLogo();
        } else {
          allCircles[i].showCircle();
        }
      }
      nextGeneration();
    }
  }
  allCircles.splice(1);
  // if (r2 != isNaN && r2 < c1.radius / 2) {
  //   r2 += 20;
  // } else if ((r2 = c1.radius)) {
  //   noLoop();
  // }
}

function updateRadius(c1, r2, r3) {
  let c2, c3;
  if (r2 != isNaN && r2 < c1.radius / 2) {
    r2 += 20;
  } else if ((r2 = c1.radius)) {
    noLoop();
  }
  let v = p5.Vector.fromAngle(random(TWO_PI));
  v.setMag(c1.radius - r2);
  c2 = new Circle(1 / r2, c1.center.a + v.x, c1.center.b + v.y);
  r3 = v.mag();
  v.rotate(PI);
  v.setMag(c1.radius - r3);
  c3 = new Circle(1 / r3, c1.center.a + v.x, c1.center.b + v.y);

  return [c1, c2, c3];
}

function mousePressed() {
  save("apollonian.jpg");
}
// Start of functions
function validate(c4, c1, c2, c3) {
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

function isTangent(c1, c2) {
  let d = c1.dist(c2);
  let r1 = c1.radius;
  let r2 = c2.radius;

  let a = abs(d - (r1 + r2)) < epsilon;
  let b = abs(d - abs(r2 - r1)) < epsilon;
  return a || b;
}

function nextGeneration() {
  let nextQueue = [];
  for (let triplet of queue) {
    let [c1, c2, c3] = triplet;
    let k4 = descartes(c1, c2, c3);
    let newCircles = complexDescartes(c1, c2, c3, k4);

    for (let newCircle of newCircles) {
      if (validate(newCircle, c1, c2, c3)) {
        allCircles.push(newCircle);
        let t1 = [c1, c2, newCircle];
        let t2 = [c1, c3, newCircle];
        let t3 = [c2, c3, newCircle];
        nextQueue = nextQueue.concat([t1, t2, t3]);
      }
    }
  }
  queue = nextQueue;
}

function complexDescartes(c1, c2, c3, k4) {
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

function descartes(c1, c2, c3) {
  let k1 = c1.bend;
  let k2 = c2.bend;
  let k3 = c3.bend;

  let sum = k1 + k2 + k3;
  let product = abs(k1 * k2 + k2 * k3 + k1 * k3);
  let root = 2 * sqrt(product);
  return [sum + root, sum - root];
}
