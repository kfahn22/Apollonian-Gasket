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
  let col = color("#2DC5F4");
  chains.push(
    new SteinerChain(width / 2, width / 2, height / 2, 3, color("#2DC5F4"))
  );

  let circleArray = chains[0].allCircles;
  let len = circleArray.length;
  for (let i = 0; i < len; i++) {
    let c = circleArray[i];
    console.log(c);
    // Replace a gasket with a chain
    gaskets.push(
      new Gasket(c.center.a, c.center.b, c.radius, 3, color("#2DC5F4"))
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
  stroke(255);
  strokeWeight(3);
  circle(width / 2, height / 2, (width / 2) * 2);
}
