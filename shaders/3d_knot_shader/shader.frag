// Code ported from The Art of Code Tutorial
// Torus Knots Explained 
// 
// YouTube: youtube.com/TheArtOfCodeIsCool
// Ray marching starting point
// https://www.shadertoy.com/view/WtGXDD

// Used "RayMarching starting point" as base
// by Martijn Steinrucken aka The Art of Code/BigWings - 2020
// The MIT License
// YouTube: youtube.com/TheArtOfCodeIsCool


// Solomon's Seal

#ifdef GL_ES
precision mediump float;
#endif

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float iTime;
uniform vec2 iMouse;
uniform float iFrame;

#define MAX_STEPS 100
#define MAX_DIST 100.
#define SURF_DIST .001

#define S smoothstep
#define T iTime
#define PI 3.14159


#define PURPLE vec3(146,83,161) / 255.
#define RED vec3(191, 18, 97) / 255.
#define ORANGE vec3(248,158,79) / 255.
#define BLUE vec3(118, 212, 229) / 255.
#define TEAL vec3(11, 106, 136) / 255.
#define FUSHIA vec3(236,1,90) / 255.

// Function to add color to shape using x,y,z dimensions
vec3 colXYZ( vec3 col1, vec3 col2, vec3 col3, vec3 n)
  {
        vec3 colXY = col1;  // front and back insdie and outside
        vec3 colXZ = col2;  // top and bottom
        vec3 colYZ = col3;  //  left and right inside and outside
      
       // Tri-planar mapping
        n = abs(n);  // take absolute value to get all faces of cube
        n *= pow(n, vec3(5.));
        n /= n.x + n.y + n.z; // add normalization 
      
       vec3 col = colXZ*n.y + colXY*n.z + colYZ*n.x ; 
       return col;
}

vec3 colorGradient(vec2 uv, vec3 col1, vec3 col2, float m) {
  float k = uv.y*m + m;
  vec3 col = mix(col1, col2, k);
  return col;
}  

float N21( vec2 p) {
    return fract( sin(p.x*100. + p.y*6574.)*5674. );
}

float Hash21(vec2 p) {
    p = fract(p*vec2(345.567, 123.45));
    p *= dot(p, p*456.75);
    return fract(p.x * p.y);
}


mat2 Rot(float a) {
    float s=sin(a), c=cos(a);
    return mat2(c, -s, s, c);
}

float sdSphere( vec3 p, float s )
{
  return length(p)-s;
}

//  let phi = p * beta;
//     let theta = q * beta;
float GetDist( vec3 p ) {
  float d = 0.0;
   vec3 v;
   float beta = clamp(cos(iFrame*0.01), 0.0, PI);
   //float r = 0.01 * (0.8 + 1.6 * sin(6.0 * PI*0.01));
   float r = 1. * (0.8 + 1.6 * sin(6.0 * beta));
   float theta = 2.0 * beta;
   float phi = 0.6 * PI * sin(12.0 * beta);
   v.x = r * cos(phi) * cos(theta);
   v.y = r * cos(phi) * sin(theta);
   v.z = r * sin(phi);
   d = mix(d, sdSphere(p-v, 0.1), 0.5);
   return d;
}

float RayMarch(vec3 ro, vec3 rd) {
	float dO=0.;
    
    for(int i=0; i<MAX_STEPS; i++) {
    	vec3 p = ro + rd*dO;
        float dS = GetDist(p);
        dO += dS;
        if(dO>MAX_DIST || abs(dS)<SURF_DIST) break;
    }
    
    return dO;
}

vec3 GetNormal(vec3 p) {
	float d = GetDist(p);
    vec2 e = vec2(.001, 0);
    
    vec3 n = d - vec3(
        GetDist(p-e.xyy),
        GetDist(p-e.yxy),
        GetDist(p-e.yyx));
    
    return normalize(n);
}

vec3 GetRayDir(vec2 uv, vec3 p, vec3 l, float z) {
    vec3 f = normalize(l-p),
        r = normalize(cross(vec3(0,1,0), f)),
        u = cross(f,r),
        c = f*z,
        i = c + uv.x*r + uv.y*u,
        d = normalize(i);
    return d;
}

// Function to create a nice background color
vec3 Bg(vec3 rd) {
    float k = rd.y*0.5+ 0.5;
    vec3 col = mix(ORANGE, PURPLE, k);
    return col;
}

void main()
{
    vec2 uv = (gl_FragCoord.xy - .5*u_resolution.xy)/u_resolution.y;
	vec2 m = iMouse.xy/u_resolution.xy;
    vec3 col = vec3(0);
    vec3 ro = vec3(0, 3, -3);
    // ro.yz *= Rot(-m.y*3.14+1.);
    // ro.xz *= Rot(-m.x*6.2831);
    
   // Last parameter--lens of camera
   // Increase to zoom in
    vec3 rd = GetRayDir(uv, ro, vec3(0,0.,0), 0.5); 
    
    col += colorGradient(uv, PURPLE, TEAL, 0.4);

    float d = RayMarch(ro, rd);

    if(d<MAX_DIST) {
        vec3 p = ro + rd * d;
        vec3 n = GetNormal(p);
        vec3 r = reflect(rd, n);
        
        float spec = pow(max(0.0, r.y), 25.); // add specular highlight
        float dif = dot(n, normalize(vec3(1,2,3)))*.5+.5;
         col = mix(FUSHIA, vec3(dif), 0.1)+spec;
    }
    
    col = pow(col, vec3(.4545));	// gamma correction
    
    gl_FragColor = vec4(col,1.0);
}