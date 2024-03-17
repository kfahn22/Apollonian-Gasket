let n = 8;
let chains = [];
let gaskets = [];

function setup() {
  createCanvas(800, 800);

  gaskets.push(new Gasket(width / 2, height / 2, height / 2, 3));

  let circleArray = gaskets[0].allCircles;
  let len = circleArray.length;
  for (let i = 1; i < len; i++) {
    // choose a random gasket to replace
    let index = int(random(1, circleArray.length));
    let c = circleArray[index];

    // Replace a gasket with a chain
    gaskets.push(new SteinerChain(c.radius, c.center.a, c.center.b, 7));
    // Find original gasket and delete
    circleArray.splice(index, 1);
  }

  for (let n = 0; n < 1; n++) {
    for (let i = gaskets.length - 1; i >= 0; i--) {
      let nextG = gaskets[i].recurse();
      if (nextG) gaskets.push(...nextG);
    }
  }
  for (let i = 0; i < gaskets.length; i++) {
    let newArray = gaskets[i].allCircles;
    for (let j = 0; j < newArray.length; j++) {
      let c = newArray[j];
      if (c.radius > 2) {
        gaskets.push(new SteinerChain(c.radius, c.center.a, c.center.b, n));
      }
    }
  }
}

function draw() {
  background("#F89E4F");
  
  for (let gasket of gaskets) {
    gasket.show();
  }
  // for (let chain of chains) {
  //   // Not sure why, but get more color variation with push and pop
  //   push();
  //   chain.show();
  //   pop();
  // }
}

function mousePressed() {
  save("mix.jpg");
}
