// https://editor.p5js.org/codingtrain/sketches/D4ty3DgZB

class Particle {
  constructor(_x, _y, _radius) {
    this.x = _x;
    this.y = _y;
    this.radius = _radius;

    let v = p5.Vector.fromAngle(random(-TWO_PI / 4, TWO_PI / 4));
    v.setMag(this.radius * 0.95);
    this.vx = random(-v.x, v.x);
    this.vy = random(-v.y, v.y);

    //this.adj = map(this.radius, 0, Math.log2(width/2), 0.3, 2);
    this.alpha = 255;
  }

  finished() {
    //return (this.x == this.radius) || (this.y == this.radius);
    return this.alpha < 0;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    
    let d = dist(this.x, this.y, 0, 0);
    //this.alpha = map(d, 0, this.radius, 255, 100);
    this.alpha -= 10;
  }

  show(r) {
    noStroke();

    fill(255, 255, 255, this.alpha);
    ellipse(this.x, this.y, r);
  }
}
