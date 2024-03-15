let n = 8;
let chains = [];
let gaskets = [];
let colorsCT = [
  "#70327E",
  "#9253A1",
  "#A42963",
  "#EC015A",
  "#F063A4",
  "#F16164",
  "#F89E4F",
  "#2DC5F4",
];

function setup() {
  createCanvas(400, 400);
  let col = color("#F063A4");
  gaskets.push(new Gasket(width / 2, width / 2, height / 2, 3, col));
  let circleArray = gaskets[0].allCircles;
  let len = circleArray.length;
  for (let i = 0; i < len / 2; i++) {
    // choose a random gasket to replace
    let index = int(random(1, circleArray.length));
    let c = circleArray[index];

    // Replace a gasket with a chain
    chains.push(new SteinerChain(c.radius, c.center.a, c.center.b, n, col));
    // Find the original gasket and delete
    circleArray.splice(index, 1);
  }

  for (let n = 0; n < 1; n++) {
    for (let i = gaskets.length - 1; i >= 0; i--) {
      let nextG = gaskets[i].recurse();
      if (nextG) gaskets.push(...nextG);
    }
  }
  //console.log(chains.length);
  let perc = 0.98;
  for (let i = 0; i < chains.length * perc; i++) {
    let newArray = chains[i].allCircles;
    for (let j = 0; j < newArray.length; j++) {
      let c = newArray[j];
      if (c.radius > 2) {
        chains.push(new SteinerChain(c.radius, c.center.a, c.center.b, n, col));
      }
    }
  }
}

function draw() {
  background(0);

  scale(1);

  for (let gasket of gaskets) {
    gasket.show();
  }
  for (let chain of chains) {
    push();
    chain.show();
    pop();
  }
}

function mousePressed() {
  save("mix.jpg");
}
