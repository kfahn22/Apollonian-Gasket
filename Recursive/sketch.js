let allCircles = [];
let centers = [];
let newCenters = [];
let queue = [];

function setup() {
  createCanvas(800, 800);
  centers.push(
    new Apollonian(new Circle(-1 / (width / 2), width / 2, height / 2))
  );
  centers[0].addInitialCircles();
  // First two inner circles
  allCircles = centers[0].allCircles;
  //console.log(allCircles.length)
  queue = centers[0].queue;
  //console.log(queue[0]);
  nested(allCircles);
  nested(queue);
  //  console.log(newCenters[0]);
  //  for (i = 0; i < newCenters.length; i++) {
  //    nested(newCenters[i]);
  //    centers.concat(newCenters[i][1]);
  //    centers.concat(newCenters[i][2]);
  //  }
  // console.log(centers.length);
}

function draw() {
  background(255);
  let len1 = allCircles.length;
  for (let i = 0; i < centers.length; i++) {
    centers[i].nextGeneration();
  }

  let len2 = allCircles.length;
  if (len1 == len2) {
    console.log("done");
    noLoop();
  }
  for (let i = 0; i < centers.length; i++) {
    centers[i].showCircles();
  }
}

function nest(c) {
  centers.push(
    new Apollonian(new Circle(-1 / c.radius, c.center.a, c.center.b))
  );
  // centers.concat(new Apollonian(new Circle(-1 / c.radius, c.center.a, c.center.b)));
}

function nested(arr) {
  for (i = 1; i < arr.length; i++) {
    //let c = arr[i];
    nest(arr[i]);
    allCircles.concat(centers[i].addCircles());
    queue.concat(centers[i].addCircles());

    newCenters.push(centers[i].allCircles);
    nested(queue);
    //centers.push(centers[i].allCircles);
  }
}

function mousePressed() {
  save("recursive.jpg");
}
