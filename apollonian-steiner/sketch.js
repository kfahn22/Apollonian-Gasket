let allCircles = [];
let centers = [];
let queue = [];
let newCenters = [];

function setup() {
  createCanvas(400, 400);
  centers.push(
    new Steiner(new Circle(-1 / (width / 2), width / 2, height / 2))
  );
  centers[0].init();
  // First two inner circles
  allCircles = centers[0].allCircles;
  //queue = centers[0].queue;

  // See the first two inner circles as outer circles for fractal recursion
  // for (i = 1; i < allCircles.length; i++) {
  //   centers.push(
  //     new Apollonian(
  //       new Circle(
  //         -1 / allCircles[i].radius,
  //         allCircles[i].center.a,
  //         allCircles[i].center.b
  //       )
  //     )
  //   );
  //   centers[i].setOuter();
  //   allCircles.concat(centers[i].setOuter());
  //   queue.concat(centers[i].setOuter());
  // console.log(newCenters.length)
  //}
}

function draw() {
  background(255);
  let len1 = allCircles.length;
  // for (let i = 0; i < centers.length; i++) {
  //   centers[i].nextGeneration();

  //}

  let len2 = allCircles.length;
  if (len1 == len2) {
    console.log("done");
    noLoop();
  }
  for (let c of allCircles) {
    c.show();
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
    allCircles.concat(centers[i].steiner());
    queue.concat(centers[i].steiner());
    console.log(allCircles);
    //newCenters.push(centers[i].allCircles);
    //console.log(newCenters)
    //nested(queue);
    //centers.push(centers[i].allCircles);
  }
}
