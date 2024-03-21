let n = 8;
let allCircles = [];
let queue = [];
//let factor = 400;
//let canvas
function setup() {
  createCanvas(400, 400);
  // W = width * factor;
  // H = height * factor;
  // canvas = createGraphics(W, H);
  let c = new Chain(width / 2, height / 2, height / 2, n);
  let circleArray = c.allCircles;
  for (let i = 0; i < circleArray.length; i++) {
    allCircles.push(circleArray[i]);
  }
  //console.log(allCircles)
  for (let i = allCircles.length - 1; i >= 1; i--) {
    let c = new Chain(allCircles[i].r, allCircles[i].x, allCircles[i].y, n);
    //addChains(c);
  }
}

function draw() {
  background(50, 41, 47);
  //console.log(allCircles);
  for (let i = 0; i < 5; i++) {
    allCircles[i].show();
  }

  let r2 = allCircles[1].r;
  let r3 = allCircles[2].r;
  let elllipseD = 4 * r2 + 2 * r3;
  let Erw = 2 * r2 + r3;
  ellipse(Erw / 2, height / 2, Erw, Erw);
  line(0, height / 2, width, height / 2);
  //ellipse()
  // for (let c of allCircles) {
  //   c.show();
  // }
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
