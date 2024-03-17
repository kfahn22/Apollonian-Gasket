let n = 8;
let allCircles = [];
let queue = [];

function setup() {
  createCanvas(400, 400);

  let c = new Chain(width / 2, height / 2, height / 2, n);
  let circleArray = c.allCircles;
  for (let i = 0; i < circleArray.length; i++) {
    allCircles.push(circleArray[i]);
  }
  queue = c.queue;

  // for (let i = allCircles.length - 1; i >= 0; i--) {
  //   let newC = new Chain(allCircles[i].r, allCircles[i].x, allCircles[i].y, n);
  //   allCircles.push(newC.queue);

  //   newC.recurse();
  //   //if (newC) newC.push(...newC);
  // }

  for (let i = 0; i < queue.length; i++) {
    let newC = new Chain(queue[i].r, queue[i].x, queue[i].y, n);

    allCircles.push(newC.queue);
    newC.recurse();
  }

  // allCircles = [c1, c2, c3];
  // queue = [[c1, c2, c3]];
}

function draw() {
  background(50, 41, 47);

  //allCircles[0].show()
  for (let c of allCircles) {
    push();
    c.show();
    pop();
  }
}

function mousePressed() {
  save("chains.jpg");
}
