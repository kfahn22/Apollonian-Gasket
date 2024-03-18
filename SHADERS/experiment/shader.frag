// Built on top of https://www.shadertoy.com/view/ctByWz (shadertoyjiang)


#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_tex0;

#define PLATFORM_WEBGL

#include "lygia/animation/easing.glsl"
#include "lygia/color/mixOklab.glsl"
#include "lygia/color/palette/spectral.glsl"
#include "lygia/color/pigments.glsl"
#include "lygia/color/blend.glsl"
#include "lygia/draw/fill.glsl"
#include "lygia/math/rotate2d.glsl"
#include "lygia/math/const.glsl"
#include "lygia/math/smootherstep.glsl"
#include "lygia/sdf/superShapeSDF.glsl"
#include "lygia/sdf/circleSDF.glsl"


// Colors
#define ORANGE vec3(240, 128, 60) / 255.
#define PURPLE vec3(100, 1, 128) / 255.
#define RED vec3(140, 0, 26) / 255.
#define BLUE vec3(58, 110, 165) / 255.
#define MINT vec3(22, 186, 197) / 255.


float tieDye( vec2 st, float speed, float zoom, int N) {
    #ifdef CENTER_2D
    st -= CENTER_2D;
    #else
    st -= 0.5;
    #endif
    vec3 r = u_resolution.xxx;
    vec3 uv = vec3((2.0 * st.xyy- r)/r.x * zoom);
    uv.z = sineIn(u_time*speed);
	uv *= 0.5;
	#ifdef PLATFORM_WEBGL
    for (int i = 0; i< 10; i++) {
        if (i >= N) break;
    #else
    for (int i = 0; i< N; i++) {
    #endif
        uv = abs(uv) / dot( uv, uv) - atan(uv.z, length(uv.xy))-atan(length(uv.xy), uv.z);
        uv = length( uv )*( uv + 1.3 ); 
	}
    uv = vec3(dot( uv, uv ) * 0.5);
    return clamp(uv.x, 0.0, 1.0);
}
  
vec3 tye_dye( vec2 st, float speed,  float zoom, int N, vec3 color1, vec3 color2, vec3 color3, vec3 color4) {
    #ifdef CENTER_2D
    st -= CENTER_2D;
    #else
    st -= 0.5;
    #endif
    vec3 r = u_resolution.xxx;
    vec3 u = vec3((2.0 * st.xyy- r)/r.x * zoom);
    u.z = sineIn(u_time*speed);
    
	u *= 0.5;
	#ifdef PLATFORM_WEBGL
    for (int i = 0; i< 10; i++) {
        if (i >= N) break;
    #else
    for (int i = 0; i< N; i++) {
    #endif
        u = abs(u) / dot( u, u) - atan(u.z, (u.x*u.x + u.y*u.y))-atan( (u.x*u.x + u.y*u.y), u.z);
        u = length( u )*( u + 1.3 );
       
	}
    u = vec3(dot( u, u ) * 0.5);
    vec3 col1 = mix(color1, color2, u.x);
    vec3 col2 = mix(color3, color4, u.x);
    return mix(col1, col2, u.x);
   // return u.x;
}
  
void main()
{
    vec2 st = gl_FragCoord.xy;
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    vec2 mouse = u_mouse.xy;
    vec4 color = vec4(vec3(0), 1.);
  
    float f = tieDye(st, 0.1, 3.0, 6); // 3.0, 6
    // color.rgb = mixOklab(COBALT_VIOLET, CADMIUM_ORANGE, f);
    // f = tieDye(st, 0.1, 5.0, 5);// 5.0, 7
    // color.rgb += mixOklab(COBALTE_BLUE, COBALT_VIOLET, f);
    
  color.rgb = mixOklab(CADMIUM_ORANGE, COBALT_VIOLET, f);
    f = tieDye(st, 0.1, 5.0, 5);// 5.0, 7
    color.rgb += mixOklab(COBALT_VIOLET, COBALTE_BLUE,  f);
  
   // Filling a shape
    float sdf = circleSDF(uv) - 0.9;
    //float sdf = superShapeSDF( uv, 2.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0);
    float s = smootherstep(0.0, 0.1, sdf);
    color.rgb = (1.0-s)*color.rgb + s * PURPLE;
  
    gl_FragColor = color;
}