let gaskets = [];
let seed;
let n = 8;

let col1, col2;

function setup() {
  createCanvas(800, 800);
  col1 = color(112, 50, 126);
  col2 = color(45, 197, 244);

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
  background("#F89E4F");
  // for (let i = 0; i < 5; i++) {
  //   gaskets[i].show();
  // }

  for (let gasket of gaskets) {
    gasket.show();
  }
}
