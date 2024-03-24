let gaskets = [];
let seed;
let n = 6;

let col1, col2;

function setup() {
  createCanvas(800, 800);

  col1 = color(113, 47, 121);
  col2 = color(247, 153, 110);

  seed = int(random(100000));
  //console.log(seed);
  let theta = PI / n;
  let r1 = width / 2;
  if (random(1) < 0.5) {
    let r2 = r1 * ((1 - sin(theta)) / (1 + sin(theta)));
  } else {
    r2 = r1 / 2;
  }
  gaskets.push(new Gasket(width / 2, height / 2, color(0), seed, n));
  console.log(gaskets[0].queue);
  // for (let n = 0; n < 6; n++) {
  //   for (let i = gaskets.length - 1; i >= 0; i--) {
  //     let nextG = gaskets[i].recurse();
  //     if (nextG) gaskets.push(...nextG);
  //   }
  // }
}

function draw() {
  background(72, 99, 156);

  for (let gasket of gaskets) {
    gasket.show();
  }
}
