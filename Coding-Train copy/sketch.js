let allCircles = [];
let queue = [];
// let epsilon = 0.1;
let center = [];

function setup() {
  createCanvas(800, 800);
  center.push(
    new Apollonian(new Circle(-1 / (width / 2), width / 2, height / 2))
  );

  allCircles.push(center[0].addCircles());
  //queue = [allCircles];
  // console.log(allCircles[0][1].radius)
  // for (let i = 1; i < allCircles.length; i++) {
  //   console.log(allCircles[0][i].radius);
  //   let newOuter = new Circle(
  //     -1 / allCircles[0][i].radius,
  //     allCircles[0][i].center.x,
  //     allCircles[0][i].center.y
  //   );
  //   console.log(newOuter)
  //   center[i].push(newOuter);
  // }

  // Add the next circles as outer circles for fractal recursion
  if (center.length < 5) {
    center.push(
      new Apollonian(
        new Circle(
          -1 / allCircles[0][1].radius,
          allCircles[0][1].center.x,
          allCircles[0][1].center.y
        )
      )
    );
    center.push(
      new Apollonian(
        new Circle(
          -1 / allCircles[0][2].radius,
          allCircles[0][2].center.x,
          allCircles[0][2].center.y
        )
      )
    );
  }

  for (let i = 1; i < 3; i++) {
    let c1 = center[i];
    let nextGen = c1.addCircles();
    console.log(nextGen);
    for (let j = 0; j < nextGen.length; i++) {
      allCircles.push(nextGen[j]);
      console.log(allCircles);
    }
    // queue.push(allCircles);
  }
  // console.log(queue);
  // console.log(allCircles.length)
}

function draw() {
  background(255);
  let len1 = allCircles.length;
  center[0].nextGeneration();
  // for (let i = 1; i < center.length; i++) {
  //    center[i].nextGeneration();
  // }

  let len2 = allCircles.length;
  if (len1 == len2) {
    console.log("done");
    noLoop();
  }
  center[0].showCircles();
  for (let c of allCircles) {
    c.show();
  }
}

// function outerCircle(newouter) {
//   newc1 = new Circle(-1 / newouter.radius, newouter.radius, newouter.radius);
//   let r2 = random(100, newc1.radius / 2);
//   let v = p5.Vector.fromAngle(random(TWO_PI));
//   v.setMag(newc1.radius - r2);
//   let c2 = new Circle(1 / r2, width / 2 + v.x, height / 2 + v.y);
//   let r3 = v.mag();
//   v.rotate(PI);
//   v.setMag(newc1.radius - r3);
//   let c3 = new Circle(1 / r3, width / 2 + v.x, height / 2 + v.y);
//   allCircles = [newc1, c2, c3];
//   queue = [[newc1, c2, c3]];
// }

// function validate(c4, c1, c2, c3) {
//   if (c4.radius < 2) return false;

//   for (let other of allCircles) {
//     let d = c4.dist(other);
//     let radiusDiff = abs(c4.radius - other.radius);
//     if (d < epsilon && radiusDiff < epsilon) {
//       return false;
//     }
//   }

//   // Check if all 4 circles are mututally tangential
//   if (!isTangent(c4, c1)) return false;
//   if (!isTangent(c4, c2)) return false;
//   if (!isTangent(c4, c3)) return false;

//   return true;
// }

// function isTangent(c1, c2) {
//   let d = c1.dist(c2);
//   let r1 = c1.radius;
//   let r2 = c2.radius;

//   let a = abs(d - (r1 + r2)) < epsilon;
//   let b = abs(d - abs(r2 - r1)) < epsilon;
//   return a || b;
// }

// function nextGeneration() {
//   let nextQueue = [];
//   for (let triplet of queue) {
//     let [c1, c2, c3] = triplet;
//     let k4 = descartes(c1, c2, c3);
//     let newCircles = complexDescartes(c1, c2, c3, k4);

//     for (let newCircle of newCircles) {
//       if (validate(newCircle, c1, c2, c3)) {
//         allCircles.push(newCircle);
//         let t1 = [c1, c2, newCircle];
//         let t2 = [c1, c3, newCircle];
//         let t3 = [c2, c3, newCircle];
//         nextQueue = nextQueue.concat([t1, t2, t3]);
//       }
//     }
//   }
//   queue = nextQueue;
// }

// function complexDescartes(c1, c2, c3, k4) {
//   let k1 = c1.bend;
//   let k2 = c2.bend;
//   let k3 = c3.bend;
//   let z1 = c1.center;
//   let z2 = c2.center;
//   let z3 = c3.center;

//   let zk1 = z1.scale(k1);
//   let zk2 = z2.scale(k2);
//   let zk3 = z3.scale(k3);
//   let sum = zk1.add(zk2).add(zk3);

//   let root = zk1.mult(zk2).add(zk2.mult(zk3)).add(zk1.mult(zk3));
//   root = root.sqrt().scale(2);
//   let center1 = sum.add(root).scale(1 / k4[0]);
//   let center2 = sum.sub(root).scale(1 / k4[0]);
//   let center3 = sum.add(root).scale(1 / k4[1]);
//   let center4 = sum.sub(root).scale(1 / k4[1]);

//   return [
//     new Circle(k4[0], center1.a, center1.b),
//     new Circle(k4[0], center2.a, center2.b),
//     new Circle(k4[1], center3.a, center3.b),
//     new Circle(k4[1], center4.a, center4.b),
//   ];
// }

// function descartes(c1, c2, c3) {
//   let k1 = c1.bend;
//   let k2 = c2.bend;
//   let k3 = c3.bend;

//   let sum = k1 + k2 + k3;
//   let product = abs(k1 * k2 + k2 * k3 + k1 * k3);
//   let root = 2 * sqrt(product);
//   return [sum + root, sum - root];
// }

// function init_ring() {
//   // create new outer circle using values from previous itteration
//   let c_outer = new Circle(-next_outer_k / scale_f, next_outer_z);

//   // determine 3 other k values (largest to smallest radius)
//   let k1 = next_outer_k + 1; // n + 1
//   let k2 = next_outer_k * k1; // n(n + 1)
//   let k3 = k2 + 1; // n(n + 1) + 1
//   // set our next outer circle k for the nesting functionality
//   next_outer_k = k1;
//   // scale up
//   k1 /= scale_f;
//   k2 /= scale_f;
//   k3 /= scale_f;

//   // stop nesting once c2 gets too small
//   if (1 / k2 < min_nesting_radius) {
//     ring_complete = true;
//     all_complete = true;

//     // update colors for radiating functionality
//     col_u = color("#FCEE21"); // yellow
//     col_l = color("#66D334"); // green
//     return;
//   }

//   // determine 3 center points to comply with the k values
//   // distances between centers
//   let a = 1 / k1 + 1 / k3;
//   let b = 1 / k1 + 1 / k2;
//   let c = 1 / k2 + 1 / k3;
//   // fit c1 and c2 inside c4
//   let z1 = new Complex(c_outer.z.x, c_outer.z.y + c_outer.r - 1 / k1); // below
//   let z2 = new Complex(c_outer.z.x, c_outer.z.y - c_outer.r + 1 / k2); // above
//   // use law of cosines to find the third center
//   let theta = acos((c * c - b * b - a * a) / (-2 * a * b));
//   // smallest circle connects to the right
//   let z3 = new Complex(z1.x + a * sin(theta), z1.y - a * cos(theta));

//   // make 3 circles with kn and zn
//   let c1 = new Circle(k1, z1);
//   let c2 = new Circle(k2, z2);
//   let c3 = new Circle(k3, z3);
//   // create our internal circle c5
//   let inner_outer = descartes(c1, c2, c3);
//   let c4 = inner_outer[0];
//   let c5 = inner_outer[1];
//   // add our new circles to the array
//   let new_circles = [c5, c1, c2, c3, c4];
//   circles = circles.concat(new_circles);

//   // set our next outer circle z
//   next_outer_z = z1;
//   // draw new circles!
//   new_circles.map((c) => c.drawc());
//   // this new ring has got to be processed
//   ring_complete = false;
// }
