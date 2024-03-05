//       ____   ____       _
//  _ __| ___| |  _ \ ___ | | __ _ _ __
// | '_ \___ \ | |_) / _ \| |/ _` | '__|
// | |_) |__) ||  __/ (_) | | (_| | |
// | .__/____(_)_|   \___/|_|\__,_|_|
// |_|
//
// https://github.com/liz-peng/p5.Polar
// Created by Liz Peng
// Version 2.3 Sep 5th 2023

// let each sketches have their center point
p5.prototype.setCenter = function (x, y) {
  if (this.center === undefined) {
    this.center = { x, y };
  }
  this.translate((this.center.x = x), (this.center.y = y));
};

// Internal helper for shifting/and orienting the drawing location to a portion on the circle
p5.prototype.shiftRotate = function (_angle, _distance) {
  const _radians = this.radians(_angle);
  this.translate(
    this.sin(_radians) * _distance,
    this.cos(_radians) * -_distance
  );
  this.rotate(this.radians(_angle));
};

// Generic drawing function: shifts the drawing area to the appropriate angle/distance on the circle, then calls the callback to draw whatever shape you want
// Callback arguments: shape index (incremented per iteration: 1 to num), angle degrees per iteration, radius, distance
p5.prototype.polarDrawCallback = function (
  _num,
  _radius,
  _distance,
  drawCallback
) {
  const _angle = 360 / _num;
  for (let i = 1; i <= _num; i++) {
    this.push();
    this.shiftRotate(i * _angle, _distance);
    drawCallback(i, _angle, _radius, _distance);
    this.pop();
  }
};

// Functions added to Polar.js
p5.prototype.hyperbolicTan = function (_theta) {
  let e = 2.71828;
  let l = pow(e, 2 * _theta);
  return (l - 1) / (l + 1);
};

// Chrysanthmum Flower
// https://paulbourke.net/geometry/chrysanthemum/
p5.prototype.polarFlower = function (_angle, _radius, _distance) {
  this.push();
  angleMode(RADIANS);
  //this.shiftRotate(_angle, _distance);
  this.beginShape();
  // 7560 when angle mode radians i+=2
  for (let i = 0; i < 21 * PI; i += 0.01) {
    let r =
      5 * (1 + sin((11 * i) / 5)) -
      4 * pow(sin((17 * i) / 3), 4) +
      pow(sin(2 * cos(3 * i) - 28 * i), 8);
    this.vertex(
      this.cos(i) * r * _radius * 0.04,
      -this.sin(i) * r * _radius * 0.04
    );
  }
  this.endShape(this.CLOSE);
  this.pop();
};

// Butterfly
p5.prototype.polarButterfly = function (_angle, _radius, _distance) {
  const e = 2.71828;
  this.push();
  //this.shiftRotate(_angle, _distance);
  this.beginShape();
  // 7560 when angle mode radians
  for (let i = 0; i < 1440; i += 10 / this.TWO_PI) {
    let r = pow(e, sin(i)) - 2 * cos(4 * i) + pow(sin((2 * i - PI) / 24), 5);
    this.vertex(
      this.cos((this.TWO_PI * i) / 360) * r * _radius * 0.1,
      -this.sin((this.TWO_PI * i) / 360) * r * _radius * 0.1
    );
  }
  this.endShape(this.CLOSE);
  this.pop();
};

// Clock
p5.prototype.clock = function (_angle, _radius, _distance) {
  let hr = hour();
  let mn = minute();
  let sc = second();
  let sw = pow(_radius, 0.2);
  strokeWeight(sw);
  this.push();
  //translate(this.x,this.y);
  rotate(-90);
  stroke(255, 100, 150);
  noFill();
  let secondAngle = map(sc, 0, 60, 0, 360);
  //arc(0, 0, 300, 300, 0, secondAngle);

  stroke(150, 100, 255);
  let minuteAngle = map(mn, 0, 60, 0, 360);
  //arc(0, 0, 280, 280, 0, minuteAngle);

  stroke(150, 255, 100);
  let hourAngle = map(hr % 12, 0, 12, 0, 360);
  //arc(0, 0, 260, 260, 0, hourAngle);

  this.push();
  rotate(secondAngle);
  stroke(255, 100, 150);
  line(0, 0, _radius / 4, 0);
  this.pop();

  this.push();
  rotate(minuteAngle);
  stroke(150, 100, 255);
  line(0, 0, _radius / 8, 0);
  this.pop();

  this.push();
  rotate(hourAngle);
  stroke(150, 255, 100);
  line(0, 0, _radius / 12, 0);
  this.pop();

  this.push();
  stroke(255);
  point(0, 0);
  this.pop();
  this.pop();
};

// Phyllotaxis
p5.prototype.phyllotaxis = function (_angle, _radius, _distance) {
  this.push();
  //this.shiftRotate(_angle, _distance);
  let c = 3;
  //let start = 0;
  this.beginShape();
  for (let i = 0; i < 80; i++) {
    let a = i * 137.5;
    let r = c * sqrt(i / 360);
    // let x = r * cos(a);
    // let y = r * sin(a);
    let x = this.cos((this.TWO_PI * a) / 360) * r * _radius * 0.33;
    let y = this.sin((this.TWO_PI * a) / 360) * r * _radius * 0.33;
    ellipse(x, y, c * pow(_radius, 0.8) * 0.05, c * pow(_radius, 0.8) * 0.05);
  }
  //start += 0.1;
  this.pop();
};

// Gear
p5.prototype.polarGear = function (_angle, _radius, _distance) {
  this.push();
  //this.shiftRotate(_angle, _distance);
  this.beginShape();
  for (let i = 0; i <= 360; i++) {
    let r = 1 + (1 / 10) * this.hyperbolicTan(10 * sin(i));
    this.vertex(
      this.cos((this.TWO_PI * i) / 360) * r * _radius * 0.45,
      this.sin((this.TWO_PI * i) / 360) * r * _radius * 0.45
    );
  }
  this.endShape(this.CLOSE);
  this.pop();
};
// end of added functions

// Triangle
p5.prototype.polarTriangle = function (_angle, _radius, _distance) {
  this.push();
  this.shiftRotate(_angle, _distance);
  this.triangle(
    this.sin(0),
    this.cos(0) * -_radius,
    this.sin((this.TWO_PI * 1) / 3) * _radius,
    this.cos((this.TWO_PI * 1) / 3) * -_radius,
    this.sin((this.TWO_PI * 2) / 3) * _radius,
    this.cos((this.TWO_PI * 2) / 3) * -_radius
  );
  this.pop();
};

p5.prototype.polarTriangles = function (_num, _radius, _distance, callback) {
  const _angle = 360 / _num;
  for (let i = 1; i <= _num; i++) {
    if (callback) {
      const _result = callback(i, _angle, _radius, _distance);
      this.polarTriangle(_result[0] * _result[1], _result[2], _result[3]);
    } else this.polarTriangle(i * _angle, _radius, _distance);
  }
};

// Ellipse
p5.prototype.polarEllipse = function (_angle, _radiusW, _radiusH, _distance) {
  this.push();
  this.shiftRotate(_angle, _distance);
  this.ellipse(0, 0, _radiusW * 2, _radiusH * 2);
  this.pop();
};

p5.prototype.polarEllipses = function (
  _num,
  _radiusW,
  _radiusH,
  _distance,
  callback
) {
  const _angle = 360 / _num;
  for (let i = 1; i <= _num; i++) {
    if (callback) {
      const _result = callback(i, _angle, _radiusW, _radiusH, _distance);
      this.polarEllipse(
        _result[0] * _result[1],
        _result[2],
        _result[3],
        _result[4]
      );
    } else this.polarEllipse(i * _angle, _radiusW, _radiusH, _distance);
  }
};

// Line
p5.prototype.polarLine = function (_angle, _radius, _distance) {
  this.push();
  this.shiftRotate(_angle, _distance);
  this.line(0, _radius, 0, -_radius);
  this.pop();
};

p5.prototype.polarLines = function (_num, _radius, _distance, callback) {
  const _angle = 360 / _num;
  for (let i = 1; i <= _num; i++) {
    if (callback) {
      const _result = callback(i, _angle, _radius, _distance);
      this.polarLine(_result[0] * _result[1], _result[2], _result[3]);
    } else this.polarLine(i * _angle, _radius, _distance);
  }
};

// Square
p5.prototype.polarSquare = function (_angle, _radius, _distance) {
  this.push();
  this.shiftRotate(_angle, _distance);
  this.square(-_radius, -_radius, _radius * 2);
  this.pop();
};

p5.prototype.polarSquares = function (_num, _radius, _distance, callback) {
  const _angle = 360 / _num;
  for (let i = 1; i <= _num; i++) {
    if (callback) {
      const _result = callback(i, _angle, _radius, _distance);
      this.polarSquare(_result[0] * _result[1], _result[2], _result[3]);
    } else this.polarSquare(i * _angle, _radius, _distance);
  }
};

// Pentagon
p5.prototype.polarPentagon = function (_angle, _radius, _distance) {
  this.push();
  const _radians = this.radians(_angle);
  this.translate(
    this.sin(_radians) * _distance,
    this.cos(_radians) * -_distance
  );
  this.rotate(this.radians(_angle) + 60);
  this.beginShape();
  for (let i = 1; i <= 5; i++) {
    this.vertex(
      this.cos((this.TWO_PI * i) / 5) * _radius,
      this.sin((this.TWO_PI * i) / 5) * _radius
    );
  }
  this.endShape(this.CLOSE);
  this.pop();
};

p5.prototype.polarPentagons = function (_num, _radius, _distance, callback) {
  const _angle = 360 / _num;
  for (let i = 1; i <= _num; i++) {
    if (callback) {
      const _result = callback(i, _angle, _radius, _distance);
      this.polarPentagon(_result[0] * _result[1], _result[2], _result[3]);
    } else this.polarPentagon(i * _angle, _radius, _distance);
  }
};

// Hexagon
p5.prototype.polarHexagon = function (_angle, _radius, _distance) {
  this.push();
  this.shiftRotate(_angle, _distance);
  this.beginShape();
  for (let i = 0; i < 6; i++) {
    this.vertex(
      this.cos((this.TWO_PI * i) / 6) * _radius,
      this.sin((this.TWO_PI * i) / 6) * _radius
    );
  }
  this.endShape(this.CLOSE);
  this.pop();
};

p5.prototype.polarHexagons = function (_num, _radius, _distance, callback) {
  const _angle = 360 / _num;
  for (let i = 1; i <= _num; i++) {
    if (callback) {
      const _result = callback(i, _angle, _radius, _distance);
      this.polarHexagon(_result[0] * _result[1], _result[2], _result[3]);
    } else this.polarHexagon(i * _angle, _radius, _distance);
  }
};

// Heptagon
p5.prototype.polarHeptagon = function (_angle, _radius, _distance) {
  this.push();
  const _radians = this.radians(_angle);
  this.translate(
    this.sin(_radians) * _distance,
    this.cos(_radians) * -_distance
  );
  this.rotate(this.radians(_angle) + 11);
  this.beginShape();
  for (let i = 1; i <= 7; i++) {
    this.vertex(
      this.cos((this.TWO_PI * i) / 7) * _radius,
      this.sin((this.TWO_PI * i) / 7) * _radius
    );
  }
  this.endShape(this.CLOSE);
  this.pop();
};

p5.prototype.polarHeptagons = function (_num, _radius, _distance, callback) {
  const _angle = 360 / _num;
  for (let i = 1; i <= _num; i++) {
    if (callback) {
      const _result = callback(i, _angle, _radius, _distance);
      this.polarHeptagon(_result[0] * _result[1], _result[2], _result[3]);
    } else this.polarHeptagon(i * _angle, _radius, _distance);
  }
};

// Octagon
p5.prototype.polarOctagon = function (_angle, _radius, _distance) {
  this.push();
  this.shiftRotate(_angle, _distance);
  this.beginShape();
  for (let i = 1; i <= 8; i++) {
    this.vertex(
      this.cos((this.TWO_PI * i) / 8) * _radius,
      this.sin((this.TWO_PI * i) / 8) * _radius
    );
  }
  this.endShape(this.CLOSE);
  this.pop();
};

p5.prototype.polarOctagons = function (_num, _radius, _distance, callback) {
  const _angle = 360 / _num;
  for (let i = 1; i <= _num; i++) {
    if (callback) {
      const _result = callback(i, _angle, _radius, _distance);
      this.polarOctagon(_result[0] * _result[1], _result[2], _result[3]);
    } else this.polarOctagon(i * _angle, _radius, _distance);
  }
};

// Polygon
p5.prototype.polarPolygon = function (_edge, _angle, _radius, _distance) {
  this.push();
  this.shiftRotate(_angle, _distance);
  this.beginShape();
  for (let i = 1; i <= _edge; i++) {
    this.vertex(
      this.cos((this.TWO_PI * i) / _edge) * _radius,
      this.sin((this.TWO_PI * i) / _edge) * _radius
    );
  }
  this.endShape(this.CLOSE);
  this.pop();
};

p5.prototype.polarPolygons = function (
  _num,
  _edge,
  _radius,
  _distance,
  callback
) {
  const _angle = 360 / _num;
  for (let i = 1; i <= _num; i++) {
    if (callback) {
      const _result = callback(i, _angle, _edge, _radius, _distance);
      this.polarPolygon(
        _result[2],
        _result[0] * _result[1],
        _result[3],
        _result[4]
      );
    } else this.polarPolygon(_edge, i * _angle, _radius, _distance);
  }
};
