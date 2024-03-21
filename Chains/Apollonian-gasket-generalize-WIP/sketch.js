let gaskets = [];
let seed;
let n = 8;

let col1, col2;

function setup() {
  createCanvas(800, 800);

  col1 = color(113, 47, 121);
  col2 = color(247, 153, 110);

  seed = int(random(100000));
  //console.log(seed);

  gaskets.push(new Gasket(400, 400, 400, color(0), seed, n));
  console.log(gaskets[0].queue);
  for (let n = 0; n < 6; n++) {
    for (let i = gaskets.length - 1; i >= 0; i--) {
      let nextG = gaskets[i].recurse();
      if (nextG) gaskets.push(...nextG);
    }
  }
}

function draw() {
  background(151, 99, 145);

  for (let gasket of gaskets) {
    gasket.show();
  }
}
