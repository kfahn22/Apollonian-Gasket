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

// #include "lygia/animation/easing.glsl"
// #include "lygia/color/mixOklab.glsl"
// #include "lygia/color/palette/spectral.glsl"
// #include "lygia/color/pigments.glsl"
// #include "lygia/color/blend.glsl"
// #include "lygia/draw/fill.glsl"
//#include "lygia/math/rotate2d.glsl"
#include "lygia/math/const.glsl"
#include "lygia/math/smootherstep.glsl"
// #include "lygia/sdf/superShapeSDF.glsl"
#include "lygia/sdf/circleSDF.glsl"
#include "lygia/space/kaleidoscope.glsl"

// Colors
#define ORANGE vec3(240, 128, 60) / 255.
#define PURPLE vec3(100, 1, 128) / 255.
#define RED vec3(140, 0, 26) / 255.
#define BLUE vec3(58, 110, 165) / 255.
#define MINT vec3(22, 186, 197) / 255.

#define ITERATIONS 5


//From Inigo Quilez
float sdCircle( vec2 uv, float r) {
  return length(uv) - r;
} 

vec2 fold(vec2 st, float ang){
    vec2 dir=vec2(cos(-ang),sin(-ang));
    st-=2.0*min(0.,dot(st,dir))*dir;
	return st;
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
    float radius = sp.x;
    float angle = sp.y;
    float n = 3.0;
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

// float Chain2(vec2 st, vec2 pixel, int N) {
//     st -= vec2(0.5);
//     st = st*2.0;
//     st = fold(st, PI/3.);
// }

void main()
{
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
    
    
    uv = kaleidoscope(gl_FragCoord.xy/u_resolution.y);
    //float c = Chain(uv);
    float c = circleSDF(uv) - 0.1;
     float m = smootherstep(0.001, 0.0, c);
    
//     float d = abs(sdCircle(uv,0.5)) - 0.05;
//    float c = smoothstep( .1, .0, d);
    vec3 col = c * vec3(1., 0., 0.);
    
    gl_FragColor = vec4(col, 1.0);
}