// https://www.shadertoy.com/view/4s2czK
#ifdef GL_ES
precision mediump float;
#endif

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float iTime;

#define PI 3.14159265359

vec3 hsv2rgb( in vec3 c ) {
    vec3 rgb = clamp( abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0 );
	rgb = smoothstep(vec3(0), vec3(1), rgb);
	return c.z * mix( vec3(1.0), rgb, c.y);
}

mat2 rot( in float a ) {
    vec2 v = sin(vec2(PI*0.5, 0) + a);
    return mat2(v, -v.y, v.x);
}

// http://mathworld.wolfram.com/TrilinearCoordinates.html
// http://mathworld.wolfram.com/TriangleCenterFunction.html
// http://mathworld.wolfram.com/InnerSoddyCircle.html

// triangle center function of an equal detour point
float equalDetourPoint(float a, float b, float c, float area2) {
    return 1.0 + area2 / (a*(b+c-a));
}

// center of a soddy's circle
vec2 soddy( in vec2 aP, in float aR, in vec2 bP, in float bR, in vec2 cP, in float cR ) {
    // length of each sides
    float a = distance(bP, cP);
    float b = distance(aP, cP);
    float c = distance(aP, bP);
    // twice the area
    float area2 = abs(cross(vec3(aP-bP, 0), vec3(aP-cP, 0)).z);
    // find the trilinear coordinates of the center of the inner soddy's circle
    float alpha = equalDetourPoint(a, b, c, area2);
    float beta  = equalDetourPoint(b, c, a, area2);
    float gamma = equalDetourPoint(c, a, b, area2);
    // then the barycentric coordinates from that, renormalized
    return (a*alpha*aP + b*beta*bP + c*gamma*cP) / (a*alpha+b*beta+c*gamma);
}

// distance to an apollonian gasket
vec3 map( vec2 p ) {
    
    // inner circle
    vec2 aP = floor(p)+0.5;
    float aR = length(vec2(0.5))-0.5;
    
    // outer circles
    vec2 inA = p-aP;
	vec2 diag = vec2(inA.x+inA.y, inA.x-inA.y);
    vec2 s = step(0.0, diag)*2.0-1.0;
    vec2 bP = aP + vec2(1, +1)*s.x*0.5;
    vec2 cP = aP + vec2(1, -1)*s.y*0.5;
    float bR = 0.5;
    float cR = 0.5;
    
    // picked level
    float level = 0.0;
    // distance accumulator, start with the 3 enclosing circles
    float d  = distance(p, aP) - (aR-0.0001);
    d = min(d, distance(p, bP) - (bR-0.0001));
    d = min(d, distance(p, cP) - (cR-0.0001));
    if ( d < 0.0 ) level = 1.0;
    
    #define LEVELS 10
    for (int i = 0 ; i < LEVELS ; i++) {
        
        // add the fourth circle
        vec2 sod = soddy(aP, aR, bP, bR, cP, cR);
        float r = distance(sod, aP) - aR;
        float distToCircle = distance(sod, p) - (r-0.0001);
        if (distToCircle < 0.0) level = float(i+2);
        d = min(d, distToCircle);
        
        // then continue unto the next level
        
        // select which circle is the furthest from p
        float aD = distance(p, aP)-aR;
        float bD = distance(p, bP)-bR;
        float cD = distance(p, cP)-cR;
        
        // then update the furthest circle
        if (aD > bD && aD > cD) {
            aP = sod;
            aR = r;
        } else if (bD > cD) {
            bP = sod;
            bR = r;
        } else {
            cP = sod;
            cR = r;
        }
    }
    
    // color with HSV
    vec3 color = hsv2rgb( vec3(level*0.1 + iTime*0.1, min(1.0, level*0.1), 0.9) );
    // black color outside
    if (level == 0.0) color = vec3(0);
    
    return color;
}


void main() {
    
    gl_FragColor.a = 1.0;
    gl_FragColor.rgb = vec3(0);
    
    // super-sampling AA
    #define SS 2
    for (int i = 0 ; i < SS ; i++)
    for (int j = 0 ; j < SS ; j++) {
        vec2 offset = (vec2(i, j) + 0.5) / float(SS) - 0.5;
        vec2 fragCoordSamp = gl_FragCoord.xy + offset;
        vec2 uv = fragCoordSamp - u_resolution.xy * 0.5;
        uv /= u_resolution.y;
	
        float theta = iTime*0.05;
        vec2 center = vec2(cos(theta), sin(theta))*0.5;
        uv *= 0.05;
        uv *= rot(-iTime*0.1);
        
        gl_FragColor.rgb += map(center+uv);
    }
    
    gl_FragColor.rgb /= float(SS*SS);
    
    // vignette
    vec2 p = gl_FragCoord.xy / u_resolution.xy * 2.0 - 1.0;
    gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0), dot(p, p)*0.3);
    
}