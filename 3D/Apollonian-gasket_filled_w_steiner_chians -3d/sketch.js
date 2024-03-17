let n = 8;
let ang = 0;
let chains = [];
let gaskets = [];
let rotation = true;

function setup() {
  createCanvas(600, 600, WEBGL);

  gaskets.push(new Gasket(0, 0, height / 2, 3));

  let circleArray = gaskets[0].allCircles;
  let len = circleArray.length;
  for (let i = 1; i < len; i++) {
    // choose a random gasket to replace
    let index = int(random(1, circleArray.length));
    let c = circleArray[index];

    // Replace a gasket with a chain
    chains.push(
      new SteinerChain(c.radius, c.center.a, c.center.b, int(random(4, 12)))
    );
    // Find original gasket and delete
    circleArray.splice(index, 1);
  }

  for (let n = 0; n < 1; n++) {
    for (let i = gaskets.length - 1; i >= 0; i--) {
      let nextG = gaskets[i].recurse();
      if (nextG) gaskets.push(...nextG);
    }
  }
  for (let i = 0; i < chains.length; i++) {
    let newArray = chains[i].allCircles;
    for (let j = 0; j < newArray.length; j++) {
      let c = newArray[j];
      if (c.radius > 2) {
        chains.push(new SteinerChain(c.radius, c.center.a, c.center.b, n));
      }
    }
  }
}

function draw() {
  background("#F89E4F");
  pixelDensity(1);
  orbitControl();
  rotateX(ang);
  rotateY(ang);
  rotateZ(ang);
  //ambientLight("#F89E4F");

  scale(0.5);

  for (let chain of chains) {
    push();
    chain.show();
    pop();
  }
  if (rotation) {
    ang += 1;
  }
}

function mousePressed() {
  save("mix.jpg");
}
