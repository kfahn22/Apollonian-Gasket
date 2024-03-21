let n = 8;
let allCircles = [];
let queue = [];
let angle = 0;

function setup() {
  createCanvas(600, 600, WEBGL);

  //let c = new Chain(0, 0, 0, width / 2, n);
  let c = new Chain(width / 2, height / 2, 0, width / 2, n);
  console.log(c);
  let circleArray = c.allSpheres;
  for (let i = 0; i < circleArray.length; i++) {
    allCircles.push(circleArray[i]);
  }

  for (let i = allCircles.length - 1; i >= 1; i--) {
    let c = new Chain(
      allCircles[i].r,
      allCircles[i].x,
      allCircles[i].y,
      allCircles[i].z,
      n
    );
    addChains(c);
  }
}

function draw() {
  background(50, 41, 47);
  //console.log(allCircles);
  translate(-width / 2, -height / 2);
  rotateX(180);
  for (let i = 1; i < 10; i++) {
    push();
    //translate(0, 0);
    allCircles[i].show();
    pop();
  }
  //   for (let c of allCircles) {
  //     c.show();
  //   }
  angle += 0.01;
}

function mousePressed() {
  save("chains.jpg");
}

function addChains(c) {
  let newCircles = c.queue;
  //allCircles[0].show();
  for (cir of newCircles) {
    if (cir.r > 4) {
      allCircles.push(cir);
      c = new Chain(cir.r, cir.x, cir.y, n);
      addChains(c);
    }
  }
}
