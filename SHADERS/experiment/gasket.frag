// https://www.shadertoy.com/view/3lGGD3
#ifdef GL_ES
precision mediump float;
#endif

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
// uniform float iTime;
// uniform vec2 iMouse;
// uniform float iFrame;
// uniform sampler2D tex0;

#define ITERATIONS 5

float ApollonianGasket(vec3 p)
{
    float scale = 1.0;

    for (int i = 0; i < ITERATIONS; i++)
    {        
        p = 2.0 * clamp(p, -vec3(1.0), vec3(1.0)) - p;

        float sqrRadius = dot(p, p);

        p /= sqrRadius;
        scale /= sqrRadius;
    }

    return 0.2 * abs(p.y) / scale;
}

void main()
{
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
    
    float res = ApollonianGasket(vec3(uv, 0.0));    
    
    res = smoothstep(0.0009, 0.0001, res);    
    
    gl_FragColor = vec4(vec3(res), 1.0);
}