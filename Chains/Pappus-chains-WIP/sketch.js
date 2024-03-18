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
  console.log(allCircles)
  for (let i = allCircles.length - 1; i >= 1; i--) {
    let c = new Chain(allCircles[i].r, allCircles[i].x, allCircles[i].y, n);
    //addChains(c);
  }
}

function draw() {
  background(50, 41, 47);
  console.log(allCircles);
  for (let c of allCircles) {
    c.show();
  }
}

function mousePressed() {
  save("chains.jpg");
}

function addChains(c) {
  let newCircles = c.queue;
  for (cir of newCircles) {
    if (cir.r > 2) {
      allCircles.push(cir);
      c = new Chain(cir.r, cir.x, cir.y, n);
      addChains(c);
    }
  }
}
