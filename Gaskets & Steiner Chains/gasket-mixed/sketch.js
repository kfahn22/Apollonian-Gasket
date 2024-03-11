let chains = [];
let gasketChains = [];

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
  let col = random(colorsCT);
  gasketChains.push(new GasketChain(width / 2, width / 2, height / 2, 3, col));
  //console.log(gasketChains[0]);
}

function draw() {
  background("#66D334");

  scale(1);

  for (gasket of gasketChains) {
    gasket.show();
  }
}
