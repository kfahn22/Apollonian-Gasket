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
// Adjustment factor for different number of initial circles
let dict = [
  { key: "3", value: "0.46" },
  { key: "4", value: "0.41" },
  { key: "5", value: "0.37" },
  { key: "6", value: "0.33" },
  { key: "7", value: "0.3" },
  { key: "8", value: "0.27" },
  { key: "9", value: "0.25" },
  { key: "10", value: "0.23" },
  { key: "11", value: "0.22" },
  { key: "12", value: "0.2" },
];
function setup() {
  createCanvas(400, 400);
  let col = color("#2DC5F4");
  // console.log(dict[key=="3"]);
  // r, x, y, n, adj, color
  chains.push(
    new SteinerChain(
      width / 2,
      width / 2,
      height / 2,
      4,
      dict[1].value,
      col
    )
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
  stroke(255);
  strokeWeight(3);
  circle(width / 2, height / 2, (width / 2) * 2);
}
