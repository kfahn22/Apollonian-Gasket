let allCircles = [];
let outers = [];
let queue = [];
let newCenters = [];
let n = 6;
let len;
let outerLen;

function setup() {
  createCanvas(400, 400);

  let c1 = new Steiner(new Circle(-1 / (width / 2), width / 2, height / 2), n);
  c1.init();
  outers.push(c1.outer);
  allCircles.push(c1);
  // First inner circles
  allCircles = c1.allCircles;
  //console.log(allCircles.length)
  // Set the inner circles as outer circles for fractal recursion
  for (i = 1; i < allCircles.length; i++) {
    c = new Steiner(
      new Circle(
        -1 / allCircles[i].radius,
        allCircles[i].center.a,
        allCircles[i].center.b
      ),
      n
    );
    // Create next round of inner circles
    c.init();
    // Add center to list of outers
    outers.push(c.outer);
    //console.log(c.allCircles);
    allCircles.concat(c.allCircles);
  }
  //console.log(allCircles.length);
  outerLen = outers.length;
}

function draw() {
  background(255);
  let len1 = allCircles.length;

  //centers[1].nextGeneration();

  for (let i = 1; i < outerLen; i++) {
    let prob = random(1);
    nest(outers[i], prob);
  }

  for (let i = 0; i < queue.length; i++) {
    let prob = random(1);
    nest(queue[i], prob);
  }
  //console.log(allCircles.length)

  let len2 = allCircles.length;

  for (let i = 0; i < allCircles.length; i++) {
    allCircles[i].show();
  }
  //queue = [];
  if (allCircles.length > 106) {
    noLoop();
  }
  //noLoop();
}

function nest(c, prob) {
  let newC = new Steiner(new Circle(-1 / c.radius, c.center.a, c.center.b), n);
  newC.init();
  let nn = newC.allCircles.length;
  for (let i = 1; i < nn; i++) {
    let cc = newC.allCircles[i];
    if (prob > 0.0 && cc.radius > 2) {
      queue.push(cc);
      allCircles.push(cc);
      //console.log(cc)
    }
  }
  //console.log(queue.length);
  //console.log(allCircles.length);
}

// function nest(c, prob) {
//   if (prob < 0.5) {
//     outers.push(
//       new Apollonian(new Circle(-1 / c.radius, c.center.a, c.center.b))
//     );
//   } else {
//     outers.push(new Steiner(new Circle(-1 / c.radius, c.center.a, c.center.b), n));
//   }
// }

function nested(arr) {
  for (i = 1; i < arr.length; i++) {
    //let c = arr[i];
    nest(arr[i]);
    allCircles.concat(outers[i].steiner());
    queue.concat(outers[i].steiner());
    console.log(allCircles);
    //newCenters.push(centers[i].allCircles);
    //console.log(newCenters)
    //nested(queue);
    //centers.push(centers[i].allCircles);
  }
}
