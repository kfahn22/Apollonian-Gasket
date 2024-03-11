let allCircles = [];
let apollCircles = [];
let apollOuters = [];
let outers = [];
let queue = []; // for Apollonian
let SteinerQueue = [];
//let newCenters = [];
let n = 6;
let minRadius = 60;
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
  outerLen = outers.length;
  for (let i = 1; i < outerLen; i++) {
    let prob = random(1);
    if (outers[i].radius > minRadius && prob < 0.2) {
      addApollonion(outers[i], minRadius);
      apollCircles.push(outers[i]);
    } else {
      addSteiner(outers[i]);
    }
  }
}

function draw() {
  background(255);
  let len1 = apollCircles.length;
  console.log(apollOuters.length);
  for (let i = 0; i < apollOuters.length; i++) {
    //console.log(apollOuters[i])
    apollOuters[i].nextGeneration();
  }

  for (let i = 0; i < SteinerQueue.length; i++) {
    let prob = random(1);
    addSteiner(SteinerQueue[i]);
  }

  let len2 = apollCircles.length;
  if (len1 == len2) {
    console.log("done");
    noLoop();
  }
  for (let i = 0; i < allCircles.length; i++) {
    allCircles[i].show();
  }

  for (let i = 0; i < apollCircles.length; i++) {
    apollCircles[i].show();
  }
}

function addSteiner(c) {
  let newC = new Steiner(new Circle(-1 / c.radius, c.center.a, c.center.b), n);
  newC.init();
  let nn = newC.allCircles.length;
  for (let i = 1; i < nn; i++) {
    let cc = newC.allCircles[i];
    //console.log(cc)
    let prob = random(1);
    if (allCircles.length < 2801 && cc.radius > 2) {
      SteinerQueue.push(cc);
      allCircles.push(cc);
    }
  }
}

function addApollonion(c, midRadius) {
  let newC = new Apollonian(
    new Circle(-1 / c.radius, c.center.a, c.center.b),
    minRadius
  );
  // Add to list of outer Apollonians
  apollOuters.push(newC);
  // Add inner circles
  newC.setOuter();
  apollCircles = newC.allCircles;
  queue = newC.queue;

  // let nn = newC.allCircles.length;
  // for (let i = 1; i < nn; i++) {
  //   let cc = newC.allCircles[i];
  //   if (cc.radius > 2) {
  //     queue = cc.queue;
  //     //console.log(cc)
  //     apollCircles.push(cc);
  //   }
  //}
}
