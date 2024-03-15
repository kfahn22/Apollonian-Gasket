// Base code for the gasket from Daniel Shiffman's Apollonian Coding Challenge
// https://thecodingtrain.com/challenges/182-apollonian-gasket

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

// Fudge factor for different number of initial circles
let dict = {
  3: 0.071,
  4: 0.17,
  5: 0.26,
  6: 0.33,
  7: 0.39,
  8: 0.44,
  9: 0.49,
  10: 0.53,
  11: 0.56,
  12: 0.58,
};

function setup() {
  createCanvas(400, 400);
  let col = color("#2DC5F4");

  // r, x, y, n, adj, color
  chains.push(
    new SteinerChain(width / 2, width / 2, height / 2, 8, dict["8"], col)
  );

  let circleArray = chains[0].allCircles;
  let len = circleArray.length;
  for (let i = 0; i < len; i++) {
    let c = circleArray[i];
    //console.log(c);
    // Replace a gasket with a chain

    gaskets.push(
      new Gasket(c.center.a, c.center.b, c.radius, color("#2DC5F4"))
    );
  }

  for (let n = 0; n < 1; n++) {
    for (let i = gaskets.length - 1; i >= 0; i--) {
      let nextG = gaskets[i].recurse();
      if (nextG) gaskets.push(...nextG);
    }
  }
}

function draw() {
  background(0);

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
  stroke("#2DC5F4");
  strokeWeight(3);
  circle(width / 2, height / 2, (width / 2) * 2);
}
