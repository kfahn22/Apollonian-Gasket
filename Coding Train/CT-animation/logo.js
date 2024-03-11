class Logo {
  constructor(_x, _y, _frames) {
    this.x = _x;
    this.y = _y;
    this.alpha = map(frameCount, 0, 60, 0, 255);
  }

  show(alph) {
    stroke(112, 50, 126, this.alpha);
    line(this.x + 13, this.y + 66, this.x + 13, this.y + 25);
    line(this.x + 13, this.y + 25, this.x, 25);
    line(this.x, 25, this.x, this.y);
    line(this.x, this.y, this.x + 108, this.y);
    line(this.x + 108, this.y, this.x + 108, this.y + 46);

    // chimney
    stroke(48, 197, 243, this.alpha);
    line(this.x + 139, this.y + 46, this.x + 131, this.y);
    line(this.x + 131, this.y, this.x + 182, this.y);
    line(this.x + 182, this.y, this.x + 175, this.y + 46);

    //front
    stroke(239, 99, 164, this.alpha);
    line(this.x + 223, this.y + 154, this.x + 199, this.y + 125);
    line(this.x + 199, this.y + 125, this.x + 215, this.y + 83);
    line(this.x + 215, this.y + 83, this.x + 199, this.y + 46);

    // back wheel
    noFill();
    stroke(112, 50, 126, this.alpha);
    //circle(this.x+50,this.y+123, 53);
    circle(this.x + 54, this.y + 123, 105);

    //frontwheel1
    stroke(48, 197, 243, this.alpha);
    circle(this.x + 131, this.y + 158, 36);

    //frontwheel1
    circle(this.x + 182, this.y + 158, 36);

    // lines
    stroke(248, 158, 79, this.alpha);
    line(this.x + 177, this.y + 66, this.x + 177, this.y + 101);
    line(this.x + 157, this.y + 66, this.x + 157, this.y + 101);
    line(this.x + 137, this.y + 66, this.x + 137, this.y + 101);
    line(this.x + 182, this.y + 124, this.x + 131, this.y + 124);
  }
}
