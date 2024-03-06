// Nested Apollonian Gasket by Richard Bourne
// https://openprocessing.org/sketch/1878906

// a lot of code taken from this sketch, helped me to learn javascript!
// https://www.openprocessing.org/sketch/389913
// note that his code only works for his hard-coded case, don't forget the hard circles!
// http://code.activestate.com/recipes/578029-generalized-apollonian-gasket-fractal/
// shout out to this guy for explaining the full algorithm!

/* ------- CONSTANTS AND VARIABLES ------- */

const min_radius = 0.5; // the smallest radius we will allow
const min_nesting_radius = 2; // the smallest radius we will allow
const tolerance = 1.0; // for circle's being equal

let col_u; // the color for circles near the top of the screen [0,55,255] [100,255,119]
let col_l; // the color for circles near the bottom of the screen [255,0,0] [126,255,247]
let period; // variables for the radiating color after all circles have been rendered
let offset = 0;
let propagation = 2 / 60 / 3;

let circles = []; // a list of all the circles
let next_outer_z; // the outer circle for the next gasket
let next_outer_k; // must be pre-scaling integer k

let scale_f; // determined in setup to enlarge circles to screen size
let dim_min; // the smaller dimension of wither width or height
let intNow = new Date().getTime();

let Y_AXIS;

/* ------- INITIALIZING ------- */

function setup() {
  //console.log("back to functions");

  createCanvas(800, 450);
  smooth(8);

  // choose 3 inital k values (largest to smallest radius) DO NOT CHANGE THESE
  let k1 = 3; // 3
  let k2 = 6; // 6
  let k3 = 7; // 7

  // determine 3 center points to comply with the k values
  // distances between centers
  let a = 1 / k1 + 1 / k3;
  let b = 1 / k1 + 1 / k2;
  let c = 1 / k2 + 1 / k3;
  let z2 = new Complex(0, 0); // 2nd largest at origin
  let z1 = new Complex(0, b); // largest directly below it
  // use law of cosines to find the third center
  let theta = acos((a * a - b * b - c * c) / (-2 * b * c));
  // smallest circle connects to the right
  let z3 = new Complex(c * sin(theta), c * cos(theta));

  // make 3 circles with kn and zn
  let c1 = new Circle(k1, z1);
  let c2 = new Circle(k2, z2);
  let c3 = new Circle(k3, z3);
  // create our external and internal circles c4 and c5
  let inner_outer = descartes(c1, c2, c3);
  let c4 = inner_outer[0];
  let c5 = inner_outer[1];
  // initialize our circles array with our three initial circles
  circles = [c5, c1, c2, c3, c4];
  // set our next outer circle k for the nesting functionality
  next_outer_k = k1;

  // scale such that the outer circle is 0.8*size
  dim_min = width < height ? width : height;
  scale_f = (dim_min * 0.9) / c5.r / 2;
  // translate such that the outer circle is in the center
  let center = new Complex(
    width / 2 - c5.z.x * scale_f,
    height / 2 - c5.z.y * scale_f
  );
  // translate to the center of the screen and enlarge
  circles.map((c) => trans(c, center));
  // set our next outer circle z
  next_outer_z = z1;
  period = circles[0].r;

  //frameRate(120);
  noFill();
  col_u = color("#EC015A");
  col_l = color("#66D334");
  // col_u = color(255, 255, 255);
  // col_l = color(255, 255, 255);

  // draw the circles!
  drawBackground();

  circles.map((c) => c.drawc());
}

function trans(c, translate) {
  // enlarge a circle by scale factor and translate
  c.k /= scale_f;
  c.r *= scale_f;
  c.z.x *= scale_f;
  c.z.y *= scale_f;
  c.z.x += translate.x;
  c.z.y += translate.y;
  c.zs = c.z.scale(c.k); // reset zs when z changes
}

/* ------- LOOP ------- */

// set to true when all the circles have been evaluated
let ring_complete = false;
let all_complete = false;

function draw() {
  // let c1 = color(0);
  // let c2 = color("#9253A1");
  // setGradient(0, 0, 800, 450, c1, c2, Y_AXIS);
  if (!ring_complete) {
    // construct the circles
    construct_circles();
  } else if (!all_complete) {
    // add another nested ring
    init_ring();
  } else {
    offset += propagation;

    // draw the circles!
    drawBackground();
    circles.map((c) => c.drawRadial());
  }
  saveImage(ring_complete, all_complete);
}

function saveImage(ring_complete, all_complete) {
  if (ring_complete && all_complete) {
    save("nested.jpg");
  }
}

function construct_circles() {
  // add sub circles
  let incompleteCircles = circles.filter(
    (c) => 0 < c.tangent_circles.length && c.tangent_circles.length < 5
  );
  let completion = incompleteCircles.reduce(function (acc, obj) {
    return concat(acc, apollonian(obj));
  }, []);
  circles = circles.concat(completion);

  if (completion.length == 0) ring_complete = true;
  // draw new circles!
  completion.map((c) => c.drawc());
}

function setGradient(x, y, w, h, col1, col2, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(col1, col2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(col1, col2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}

function drawBackground() {
  // draws a background with a nice gradient!
  background(0);
  let background_start = color(0);
  let background_end = color("#9253A1");

  for (let i = 0; i < height; i++) {
    strokeWeight(1);
    let inter = map(i, 0, height, 0, 1);
    let c = lerpColor(background_start, background_end, inter);
    stroke(c);
    line(0, i, width, i);
  }
}

/* ------- NESTING GASKETS ------- */

function init_ring() {
  // create new outer circle using values from previous itteration
  let c_outer = new Circle(-next_outer_k / scale_f, next_outer_z);

  // determine 3 other k values (largest to smallest radius)
  let k1 = next_outer_k + 1; // n + 1
  let k2 = next_outer_k * k1; // n(n + 1)
  let k3 = k2 + 1; // n(n + 1) + 1
  // set our next outer circle k for the nesting functionality
  next_outer_k = k1;
  // scale up
  k1 /= scale_f;
  k2 /= scale_f;
  k3 /= scale_f;

  // stop nesting once c2 gets too small
  if (1 / k2 < min_nesting_radius) {
    ring_complete = true;
    all_complete = true;

    // update colors for radiating functionality
    col_u = color("#FCEE21"); // yellow
    col_l = color("#66D334"); // green
    return;
  }

  // determine 3 center points to comply with the k values
  // distances between centers
  let a = 1 / k1 + 1 / k3;
  let b = 1 / k1 + 1 / k2;
  let c = 1 / k2 + 1 / k3;
  // fit c1 and c2 inside c4
  let z1 = new Complex(c_outer.z.x, c_outer.z.y + c_outer.r - 1 / k1); // below
  let z2 = new Complex(c_outer.z.x, c_outer.z.y - c_outer.r + 1 / k2); // above
  // use law of cosines to find the third center
  let theta = acos((c * c - b * b - a * a) / (-2 * a * b));
  // smallest circle connects to the right
  let z3 = new Complex(z1.x + a * sin(theta), z1.y - a * cos(theta));

  // make 3 circles with kn and zn
  let c1 = new Circle(k1, z1);
  let c2 = new Circle(k2, z2);
  let c3 = new Circle(k3, z3);
  // create our internal circle c5
  let inner_outer = descartes(c1, c2, c3);
  let c4 = inner_outer[0];
  let c5 = inner_outer[1];
  // add our new circles to the array
  let new_circles = [c5, c1, c2, c3, c4];
  circles = circles.concat(new_circles);

  // set our next outer circle z
  next_outer_z = z1;
  // draw new circles!
  new_circles.map((c) => c.drawc());
  // this new ring has got to be processed
  ring_complete = false;
}

/* ------- APOLLONIAN GASKET ALGORITHM ------- */

function apollonian(c) {
  // itterate the apollonian gasket algorithm to make a pretty fractal!
  // https://en.wikipedia.org/wiki/Apollonian_gasket

  c1 = c.tangent_circles[0];
  c2 = c.tangent_circles[1];
  c3 = c.tangent_circles[2];

  //Each call to decartes returns a pair of circles.
  //One we already have, so we filter it out. We'll also filter out circles that are too small.
  let c23 = descartes(c, c2, c3).filter(
    (x) => !c1.isEqual(x) && x.r > min_radius
  );
  let c13 = descartes(c, c1, c3).filter(
    (x) => !c2.isEqual(x) && x.r > min_radius
  );
  let c12 = descartes(c, c1, c2).filter(
    (x) => !c3.isEqual(x) && x.r > min_radius
  );

  return concat(c23, concat(c12, c13));
}

/* ------- DESCARTES' THEOREM ------- */

function descartes(c1, c2, c3) {
  // returns two circles of the 4 possible outcomes of Descartes' theorem
  // https://en.wikipedia.org/wiki/Descartes%27_theorem#Complex_Descartes_theorem

  // these now have a full set so they can be reset
  c1.tangent_circles = [];
  c2.tangent_circles = [];
  c3.tangent_circles = [];

  // two curvature values:
  // discriminent (gets set to 0 if negative)
  let disc_k = c1.k * c2.k + c1.k * c3.k + c2.k * c3.k;
  disc_k = disc_k < 0 ? 0 : disc_k;
  // calculate 2 k values
  let k_p = c1.k + c2.k + c3.k + 2 * sqrt(disc_k);
  let k_m = c1.k + c2.k + c3.k - 2 * sqrt(disc_k);

  // two center points:
  let v12 = c1.zs.mult(c2.zs);
  let v13 = c1.zs.mult(c3.zs);
  let v23 = c2.zs.mult(c3.zs);
  // sum term
  let sum = c1.zs.add(c2.zs.add(c3.zs));
  // sqrt term
  let disc_z = v12.add(v13.add(v23));
  disc_z = disc_z.sqrtz().scale(2);

  // pp and mm circles:
  let z_pp = sum.add(disc_z).scale(1 / k_p);
  let z_mm = sum.sub(disc_z).scale(1 / k_m);
  let c_pp = new Circle(k_p, z_pp);
  let c_mm = new Circle(k_m, z_mm);
  c_pp.tangent_circles = [c1, c2, c3];
  c_mm.tangent_circles = [c1, c2, c3];
  if (is_connected(c_pp, c1, c2, c3) && is_connected(c_mm, c1, c2, c3))
    return [c_pp, c_mm];

  // else pm and mp circles:
  let z_pm = sum.sub(disc_z).scale(1 / k_p);
  let z_mp = sum.add(disc_z).scale(1 / k_m);
  let c_pm = new Circle(k_p, z_pm);
  let c_mp = new Circle(k_m, z_mp);
  c_pm.tangent_circles = [c1, c2, c3];
  c_mp.tangent_circles = [c1, c2, c3];
  return [c_pm, c_mp];
}

function is_connected(c, c1, c2, c3) {
  // is c tangent to c1, c2 and c3?
  return is_tangent(c, c1) && is_tangent(c, c2) && is_tangent(c, c3);
}

function is_tangent(c1, c2) {
  // are these two circles tangental to each other?
  let z12 = c2.z.sub(c1.z);
  let mod = z12.modulus();
  // to be tangental: mag(z1 - z2) == r1 + r2
  let internal = abs(mod - (c1.r + c2.r)) < tolerance;
  // or: mag(z1 - z2) == abs(r1 - r2)
  let external = abs(mod - abs(c1.r - c2.r)) < tolerance;
  return internal || external;
}

/* ------- CIRCLE CLASS ------- */
let colorsCT = [
  "#70327E",
  "#9253A1",
  "#A42963",
  "#EC015A",
  "#F063A4",
  "#F16164",
  "#F89E4F",
  "#2DC5F4",
];

class Circle {
  constructor(k, z) {
    this.k = k; // circle curvature = 1 / radius
    this.r = 1 / abs(k); // radius
    this.z = z; // center of the circle represented by a complex number
    this.zs = z.scale(k); // scaled z variable used in Descartes' theorem
    this.tangent_circles = [];
    this.color = random(colorsCT);
  }

  isEqual(c) {
    let equalR = abs(this.r - c.r) < tolerance;
    let equalX = abs(this.z.x - c.z.x) < tolerance;
    let equalY = abs(this.z.y - c.z.y) < tolerance;
    return equalR && equalX && equalY;
  }

  drawc() {
    // adjust the colors...
    stroke(lerpColor(col_u, col_l, this.z.y / height));
    // draw the circle!
    ellipse(this.z.x, this.z.y, 2 * this.r, 2 * this.r);
  }
  drawRadial() {
    // distance from focus
    let vector = new Complex(
      next_outer_z.x - this.z.x,
      next_outer_z.y - this.z.y
    );
    let distance = vector.modulus();
    let lerp = distance / period + offset;
    letlerp = (lerp - Math.floor(lerp)) * 2; // same as % operator
    lerp = lerp < 1 ? lerp : 2 - lerp;

    // adjust the colors...
    stroke(lerpColor(col_l, col_u, lerp));

    // draw the circle!
    ellipse(this.z.x, this.z.y, 2 * this.r, 2 * this.r);
  }
}
/* ------- COMPLEX NUMBER CLASS ------- */

class Complex {
  constructor(_x, _y) {
    this.x = _x;
    this.y = _y;
  }

  add(z) {
    return new Complex(this.x + z.x, this.y + z.y);
  }

  sub(z) {
    return new Complex(this.x - z.x, this.y - z.y);
  }

  mult(z) {
    return new Complex(
      this.x * z.x - this.y * z.y,
      this.x * z.y + this.y * z.x
    );
  }

  scale(s) {
    return new Complex(this.x * s, this.y * s);
  }

  sq() {
    return this.mult(this);
  }

  modulus() {
    return sqrt(this.x * this.x + this.y * this.y);
  }

  sqrtz() {
    let r = sqrt(sqrt(this.x * this.x + this.y * this.y));
    let arg = atan2(this.y, this.x) / 2.0;
    return new Complex(r * cos(arg), r * sin(arg));
  }
}

/* ------- APPLY PROTOTYPES ------- */

// complex_functions.call(complex.prototype);
// circle_functions.c;
