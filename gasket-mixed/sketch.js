let chains = [];
let gaskets = [];

function setup() {
  createCanvas(400, 400);

  let col = color(255, 0, 0);
  gaskets.push(new Gasket(width / 2, height / 2, width / 2, 3, col));
  let c = gaskets[0];
  
  console.log(c.allCircles);
  //let c1 = random(c.allCircles);
  let c1 = c.allCircles[1];
  console.log(c1);
  console.log(c1.center.a)
  chains.push(new SteinerChain(c1.radius, c1.center.a, c1.center.b, 3, col));
  for (let n = 0; n < 1; n++) {
    for (let i = gaskets.length - 1; i >= 0; i--) {
      let nextG = gaskets[i].recurse();
      if (nextG) gaskets.push(...nextG);
    }
  }

}

function draw() {
  background(255);

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
    pop()
  }
}
