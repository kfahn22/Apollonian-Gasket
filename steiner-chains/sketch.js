// Richardy Bourne https://openprocessing.org/sketch/902213

var a = 100;
var b = 90;
var t = 0;
var K = 30;
var T = 255;
let lapse = 0; // mouse timer

function setup() {
  createCanvas(1112, 834);
  background(10);
}

function draw() {
  //noStroke();
  fill(10);
  rect(0, 0, 1112, 834);
  rotate(PI / 2);
  translate(-120, -1075);
  scale(1.8);
  var c = 2 * a - 2 * sqrt(a * a - b * b);
  var ks = floor(K * (ceil(t / 500) - t / 500));
  var kc = 0;
  for (k = ks; k < K + ks; k++) {
    th = (t / 500 + k / K) * TWO_PI + PI;
    x = a * cos(th);
    y = b * sin(th) + 300;
    s = 2 * dist(x + 2 * a - sqrt(a * a - b * b), y, c, 300) - 90;
    //
    C1 = (sin(th + t / 100) * 125) / 2 + 125;
    C2 = (sin(th + t / 200) * 125) / 2 + 125;
    fill(C1, 255 - C2, 220, T);
    ellipse(y, -x + 4 * a - sqrt(a * a - b * b) - 140, s, s);
    // fill(C1, 255 - C2, 220, T);
    // ellipse(600 - y, x + 2 * a - sqrt(a * a - b * b) + 200 - 10 + 10, s, s);
    kc++;
  }
  t++;
}

function mousePressed() {
  // prevents mouse press from registering twice
  if (millis() - lapse > 500) {
    save("pix.jpg");
    lapse = millis();
  }
}

function keyPressed(event) {
  if (T == 255) {
    T = 255 / 3;
  } else {
    T = 255;
  }
}
