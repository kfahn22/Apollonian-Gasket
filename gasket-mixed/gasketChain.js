class GasketChain {
  constructor(x, y, r, sw, color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.sw = sw;
    this.col = color;
    this.gaskets = new Gasket(this.x, this.y, this.r, 3, this.col);
    this.chains = [];
  }

  init() {
    //console.log(this.gaskets[0])
    let circleArray = this.gaskets[0].allCircles;
    console.log(circleArray);
    let len = circleArray.length;
    for (let i = 0; i < len / 2; i++) {
      // choose a random gasket to replace
      let index = int(random(1, circleArray.length));
      let c = circleArray[index];

      // Replace a gasket with a chain
      this.chains.push(
        new SteinerChain(c.radius, c.center.a, c.center.b, 1, col)
      );
      // Find the original gasket and delete
      circleArray.splice(index, 1);
    }

    for (let n = 0; n < 1; n++) {
      for (let i = this.gaskets.length - 1; i >= 0; i--) {
        let nextG = this.gaskets[i].recurse();
        if (nextG) this.gaskets.push(...nextG);
      }
    }
  }
  show() {
    stroke(this.col);
    //let sw2 = map(this.radius, 0, width / 2, 1, 5);
    strokeWeight(3);
    noFill();
    circle(this.x, this.y, this.radius * 2);
  }

//   show() {
//     for (let gasket of this.gaskets) {
//       gasket.show();
//       //gasket.nextGeneration();
//     }
//     //translate(width/2, height/2)
//     for (let chain of this.chains) {
//       chain.show();
//     }
 // }
}
