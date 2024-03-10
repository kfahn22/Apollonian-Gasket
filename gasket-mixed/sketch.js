let chains = [];
let gaskets = [];

function setup() {
  createCanvas(400, 400);

  let col = color(255, 0, 0);
  gaskets.push(new Gasket(width / 2, width / 2, height / 2, 3, col));
  let circleArray = gaskets[0].allCircles;
  let len = circleArray.length;
  //console.log(len); // 161
  for (let i = 0; i < len / 6; i++) {
    // choose a random gasket to replace
    c = random(circleArray);
    // Replace a gasket with a chain
    chains.push(new SteinerChain(c.radius, c.center.a, c.center.b, 1, col));
    // Find the original gasket and delete
    const index = circleArray.indexOf(c);
    circleArray.splice(index, 1);
  }

  for (let n = 0; n < 1; n++) {
    for (let i = gaskets.length - 1; i >= 0; i--) {
      let nextG = gaskets[i].recurse();
      if (nextG) gaskets.push(...nextG);
    }
  }
}

function draw() {
  background(255);

  scale(1);

  for (let gasket of gaskets) {
    gasket.show();
    //gasket.nextGeneration();
  }
  //translate(width/2, height/2)
  for (let chain of chains) {
    push();
    //translate(chain.x, chain.y);
    chain.show();
    pop();
  }
}
