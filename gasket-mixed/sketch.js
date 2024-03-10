let allCircles = [];
let center = [];
let queue = [];

function setup() {
  createCanvas(800, 800);
  center.push(
    new Apollonian(new Circle(-1 / (width / 4), width / 2, height / 2))
  );
  center[0].addCircles();
  // First two inner circles
  allCircles = center[0].allCircles;
  queue = center[0].queue;

  // See the first two inner circles as outer circles for fractal recursion
  // center.push(
  //   new Apollonian(
  //     new Circle(
  //       -1 / allCircles[1].radius,
  //       allCircles[1].center.x,
  //       allCircles[1].center.y
  //     )
  //   )
  // );
  // center.push(
  //   new Apollonian(
  //     new Circle(
  //       -1 / allCircles[2].radius,
  //       allCircles[2].center.x,
  //       allCircles[2].center.y
  //     )
  //   )
  // );
  //console.log(center);
  //for (let i = 1; i < 3; i++) {
  // let nextGen = center[1].addCircles();

  //console.log(nextGen)
  // concat
  //allCircles.push(...nextGen);
  //allCircles.push(...center[1].addCircles())
  //console.log(allCircles);

  // for (let j = 0; j < nextGen.length; j++) {
  //   allCircles.push(nextGen[j]);
  //   console.log(allCircles);
  // }
  // queue.push(allCircles);
  // }
  queue = allCircles;
  // console.log(queue);
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
  //center[1].showCircles();
  // for (let c of allCircles) {
  //   c.showCircles();
  // }
  //noLoop();
}
