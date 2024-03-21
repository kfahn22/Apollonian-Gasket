// Created by evilryu - evilryu/2017
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
// https://www.shadertoy.com/view/WlXXWj


#ifdef GL_ES
precision mediump float;
#endif

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
// uniform float iTime;
uniform vec2 iMouse;
// uniform float iFrame;
// uniform sampler2D tex0;

vec2 rot(vec2 p, float r)
{
    vec2 q;
    q.x = p.x * cos(r) - p.y * sin(r);
    q.y = p.x * sin(r) + p.y * cos(r);
    return q;
}

vec3 apollonian(vec2 p)
{
    //p = rot(p, iTime*0.1);
    float scale = 1.0;
    float t0 = 1., t1 = 1.;
    for(int i = 0; i < 5; ++i)
    {
        p = -1. + 2.*fract(p*.5+0.5);
        float k=(1.+iMouse.x/u_resolution.x)/dot(p,p);
        p*=k;
        
        t0 = min(t0, dot(p,p));
        t1 = min(t1, max(abs(p.x), abs(p.y)));
        scale*=k;

    }
    float d=0.25*abs(p.y)/scale;
    d=smoothstep(0.001, 0.002,d);
    
    float c0=pow(clamp(t0, 0.0, 1.0), 1.5); 
    float c1=pow(clamp(t1, 0.0, 1.0), 2.);
    vec3 col0=0.5+0.5*sin(1.0+3.4*c0+vec3(2.,1.3, 0.)); 
	vec3 col1=0.5+0.5*sin(3.7*c1+vec3(2.,1.5, 0.)); 

    vec3 col = vec3(d);//sqrt(d*col1*col0)*3.;
    
    return col;
}


vec2 getsubpixel(int id,vec2 uv)
{
	vec2 aa=vec2(floor((float(id)+0.1)*0.5),mod(float(id),2.0));
	return vec2((2.0*uv+aa-u_resolution.xy)/u_resolution.y);
}

void main()
{
	vec2 q = gl_FragCoord.xy / u_resolution.xy;
    vec2 p = q * 2.0 - 1.0;
    p.x *= u_resolution.x/u_resolution.y;
    vec3 col = vec3(0.0);
    for(int i=0;i<4;++i)
    {
        vec2 p = getsubpixel(i,gl_FragCoord.xy);
        //p*=exp(sin(iTime*0.2)*0.2);
        p+=1.;
        col += apollonian(p);
    }
    //col/=4.0;
    //col=col*0.6+0.4*col*col*(3.0-2.0*col);  // contrast
   	//col*=0.5+.5*pow(16.0*q.x*q.y*(1.0-q.x)*(1.0-q.y),0.25);  // vigneting
	gl_FragColor.xyz = col;
}