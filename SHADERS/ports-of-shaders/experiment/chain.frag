// https://danielilett.com/2020-02-19-tut3-8-crazy-kaleidoscopes/

#ifdef GL_ES
precision mediump float;
#endif

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
// uniform float iTime;
// uniform vec2 iMouse;
// uniform float iFrame;
// uniform sampler2D tex0;

#define PLATFORM_WEBGL
#define TAU 6.2831853071795864769252867665590

// #include "lygia/animation/easing.glsl"
// #include "lygia/color/mixOklab.glsl"
// #include "lygia/color/palette/spectral.glsl"
// #include "lygia/color/pigments.glsl"
// #include "lygia/color/blend.glsl"
// #include "lygia/draw/fill.glsl"
//#include "lygia/math/rotate2d.glsl"
#include "lygia/math/const.glsl"
//#include "lygia/math/smootherstep.glsl"
// #include "lygia/sdf/superShapeSDF.glsl"
#include "lygia/sdf/circleSDF.glsl"
//#include "lydia/space/kaleidoscope.glsl"

// Colors
#define ORANGE vec3(240, 128, 60) / 255.
#define PURPLE vec3(100, 1, 128) / 255.
#define RED vec3(140, 0, 26) / 255.
#define BLUE vec3(58, 110, 165) / 255.
#define MINT vec3(22, 186, 197) / 255.

#define ITERATIONS 5
#define PI 3.14159

//From Inigo Quilez
float sdCircle( vec2 uv, float r) {
  return length(uv) - r;
} 


// Spherical function modified from Daniel Shiffman
vec2 Spherical( vec2 pos) 
{
   float r = sqrt(pos.x*pos.x + pos.y*pos.y);
   float theta = atan(pos.y, pos.x);
   vec2 w = vec2(r, theta);
   return w;
}

// let theta = PI / this.n;
    // this.queue = [c1];
    // let v = p5.Vector.fromAngle(random(TWO_PI));
    // // Adding Steiner chain first
    // let r2 = (c1.radius * sin(theta)) / (1 + sin(theta));
    // for (let i = 0; i < this.n; i++) {
    //   v.rotate(TWO_PI / this.n);
    //   v.setMag(c1.radius - r2);
    //   let c = new GasketCircle(1 / r2, this.x + v.x, this.y + v.y);

// vec2 Chain(vec2 uv, vec2 pos, float r, float n){

//     float c = circleSDF(uv) - r;
//    n = 6.0;
//    float theta = PI / n;
//    float r2 = (r * sin(theta))/ (1.0 + sin(theta));

   

// }


float Chain(vec2 uv)
{
    // Try for reflection ***
    vec2 sp = Spherical(uv);
    float angle = sp.x;
    float n = 8.0;
    float segmentAngle = TWO_PI / n;
    float scale = 1.0;
    angle -= segmentAngle * floor(angle / segmentAngle);

    angle = min(angle, segmentAngle - angle);

    uv = vec2(cos(angle), sin(angle)) * radius;
   // ***
   float d = abs(sdCircle(uv,0.2)) - 0.0005;
   //float d = sdCircle(uv, 0.3);
   float c = smoothstep( .01, .0, d);
  
    // for (int i = 0; i < ITERATIONS; i++)
    // {        
       
    // }

    return c;
}

void main()
{
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
    
    // float c = Chain(uv);
    uv = kaleidescope(gl_FragCoord.xy/u_resolution.y);
    //float c = Chain(uv);
    float c = circleSDF(uv) - 0.5;
    vec3 col = c * vec3(1., 0., 0.);
    
    gl_FragColor = vec4(col, 1.0);
}