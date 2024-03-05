/ https:/ / github.com / DainArtz / Apollonian_Gasket / blob / main / main.cpp;
// https://www.mathworks.com/matlabcentral/fileexchange/15987-2d-apollonian-gasket-with-n-identical-circles

// 3D shadertoy version
// https://www.shadertoy.com/view/WtdSDf
// https://www.shadertoy.com/view/tty3D3

// Colorful
// https://www.shadertoy.com/view/tsScDt

// clocks
// https://www.shadertoy.com/view/lljfRD

// a shader variable
let theShader;

function preload() {
  // load the shader

  theShader = loadShader("gasket.vert", "apollonian2.frag");
}

function setup() {
  pixelDensity(1);
  // shaders require WEBGL mode to work
  createCanvas(900, 600, WEBGL);
  noStroke();
}

function draw() {
  background(0);

  // send resolution of sketch into shader
  theShader.setUniform("u_resolution", [width, height]);
  theShader.setUniform("iMouse", [mouseX, map(mouseY, 0, height, height, 0)]);
  theShader.setUniform("iFrame", frameCount);
  theShader.setUniform("iTime", millis() / 1000);

  // shader() sets the active shader with our shader
  shader(theShader);
  //model(cubeObj);
  // rect gives us some geometry on the screen
  rect(0, 0, width, height);
}
