class Logo {
  constructor(_x, _y) {
    this.x = _x;
    this.y = _y;
    // this.logoW = 235;
    // this.logoH = 135;
  }

  logo(sw) {
    stroke("#70327E");
    strokeWeight(sw);
    line(this.x + 13, this.y + 66, this.x + 13, this.y + 25);
    line(this.x + 13, this.y + 25, this.x, this.y + 25);
    line(this.x, this.y + 25, this.x, this.y);
    line(this.x, this.y, this.x + 108, this.y);
    line(this.x + 108, this.y, this.x + 108, this.y + 46);

    // chimney
    stroke("#30C5F3");
    strokeWeight(sw);
    line(this.x + 139, this.y + 46, this.x + 131, this.y);
    line(this.x + 131, this.y, this.x + 182, this.y);
    line(this.x + 182, this.y, this.x + 175, this.y + 46);

    //front
    stroke("#EF63A4");
    strokeWeight(sw);
    line(this.x + 223, this.y + 154, this.x + 199, this.y + 125);
    line(this.x + 199, this.y + 125, this.x + 215, this.y + 83);
    line(this.x + 215, this.y + 83, this.x + 199, this.y + 46);

    // back wheel
    noFill();
    stroke("#70327E");
    strokeWeight(sw);
    //circle(this.x+50,this.y+123, 53);
    circle(this.x + 54, this.y + 123, 105);

    //frontwheel1
    stroke("#30C5F3");
    strokeWeight(sw);
    circle(this.x + 131, this.y + 158, 36);

    //frontwheel1
    strokeWeight(sw);
    circle(this.x + 182, this.y + 158, 36);

    // lines
    stroke("#F89E4F");
    strokeWeight(sw);
    line(this.x + 177, this.y + 66, this.x + 177, this.y + 101);
    line(this.x + 157, this.y + 66, this.x + 157, this.y + 101);
    line(this.x + 137, this.y + 66, this.x + 137, this.y + 101);
    line(this.x + 182, this.y + 124, this.x + 131, this.y + 124);
  }
}
