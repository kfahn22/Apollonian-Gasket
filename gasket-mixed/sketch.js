let chains = [];
let gaskets = [];

function setup() {
  createCanvas(400, 400);

  let col = color(255, 0, 0);
  //gaskets.push(new Gasket(width / 2, height / 2, width / 2, 3, col));
  gaskets.push(new SteinerChain(width / 2, height / 2, width / 2, 3, col));
  // for (let n = 0; n < 1; n++) {
  //   for (let i = gaskets.length - 1; i >= 0; i--) {
  //     let nextG = gaskets[i].recurse();
  //     if (nextG) gaskets.push(...nextG);
  //   }
  // }
}

function draw() {
  background(255);
  //translate(width / 2, height / 2);
  scale(1);

  for (let gasket of gaskets) {
    gasket.show();
    //gasket.nextGeneration();
  }
}
