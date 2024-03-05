// ChatGPT port of https://code.activestate.com/recipes/578765-circle-inversion-fractals/?in=user-4172570

let img;
let imgx = 512;
let imgy = 512;
let n, a, r, h, xa, xb, ya, yb;
let cx = [];
let cy = [];
let cr = [];
let maxIt = 2000000;
let x, y;

function setup() {
  createCanvas(imgx, imgy);
  background(11, 106, 136);
  img = createImage(imgx, imgy);
  n = int(random(3, 7)); // of main circles
  a = TWO_PI / n;
  r = sin(a) / sin((PI - a) / 2.0) / 2.0; // r of main circles
  h = sqrt(1.0 - r * r);
  xa = -h;
  xb = h;
  ya = -h;
  yb = h; // viewing area
  cx.push(0.0);
  cy.push(0.0);
  cr.push(1.0 - r); // center circle
  // add slight adjustment to other circles so they close(ish)
  //r = r + 0.002*n;
  r = r + 0.002 * n;
  for (let i = 0; i < n; i++) {
    // add main circles
    cx.push(cos(a * i));
    cy.push(sin(a * i));
    cr.push(r);
  }
  x = -2.0;
  y = -2.0; // initial point (outside of the circles)
  for (let i = 0; i < maxIt; i++) {
    let k = int(random(0, n + 1)); // selected circle for inversion
    let dx = x - cx[k];
    let dy = y - cy[k];
    let d = sqrt(dx * dx + dy * dy);
    dx /= d;
    dy /= d;
    let dnew = pow(cr[k], 2.0) / d;
    x = dnew * dx + cx[k];
    y = dnew * dy + cy[k];
    let kx = int(((imgx - 1) * (x - xa)) / (xb - xa));
    let ky = int(((imgy - 1) * (y - ya)) / (yb - ya));
    if (kx >= 0 && kx < imgx && ky >= 0 && ky < imgy) {
      img.set(kx, ky, color(241, 97, 100));
    }
  }
  img.updatePixels();
  image(img, 0, 0);
  //save("image.jpg");
}
