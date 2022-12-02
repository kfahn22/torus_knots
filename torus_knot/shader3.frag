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
#define RED vec3(218, 18, 14) / 255.
#define ORANGE vec3(248,158,79) / 255.
#define BLUE vec3(118, 212, 229) / 255.
#define TEAL vec3(11, 106, 136) / 255.
#define GREEN vec3(36,87,4) / 255.
#define GREY vec3(164,167,162) / 255.
#define GOLD vec3(181, 130, 0) /255.

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

float SmoothNoise(vec2 uv) {
   // lv goes from 0,1 inside each grid
   // check out interpolation for dummies
    vec2 lv = fract(uv);
   
   //vec2 lv = smoothstep(0., 1., fract(uv*10.));  // create grid of boxes 
    vec2 id = floor(uv); // find id of each of the boxes
     lv = lv*lv*(3.-2.*lv); 
    
    // get noise values for each of the corners
    // Use mix function to join together
    float bl = N21(id);
    float br = N21(id+vec2(1,0));
    float b = mix (bl, br, lv.x);
    
    
    float tl = N21(id + vec2(0,1));
    float tr = N21(id+vec2(1,1));
    float t = mix (tl, tr, lv.x);
    
    return mix(b, t, lv.y);
}

float SmoothNoise2 (vec2 uv) {
   float c = SmoothNoise(uv*4.);
     // Layer(or octave) of noise
    // Double frequency of noise; half the amplitude
    c += SmoothNoise(uv*8.)*.5;
    c += SmoothNoise(uv*16.)*.25;
    c += SmoothNoise(uv*32.)*.125;
    c += SmoothNoise(uv*64.)*.0625;
    
    return c/ 2.;  // have to normalize or could go past 1
  
}
mat2 Rot(float a) {
    float s=sin(a), c=cos(a);
    return mat2(c, -s, s, c);
}

// function to extract polar coordinates
// from Daniel Shiffman
vec3 Spherical( in vec3 pos) 
{
   float r = sqrt(pos.x*pos.x + pos.y*pos.y + pos.z*pos.z);
   float theta = atan( sqrt(pos.x*pos.x + pos.y*pos.y), pos.z);
   float phi = atan(pos.y, pos.x);
   vec3 w = vec3(r, theta, phi);
   return w;
}

float Knot( vec3 p ) {
   float beta = 0.01; // beta < PI
   float dd = 0.0;
   float d;
   for (int i = 0; i < 4; i ++)
      {
      vec3 offset;
      float r = 0.01 * (0.8 + 1.6 * sin(6.0 * beta));
      float theta = 2.0 * beta;
      float phi = 0.6 * PI * sin(12.0 * beta);
      vec3 w = vec3(r, theta, phi);
      offset.x = r * cos(phi) * cos(theta);
      offset.y = r * cos(phi) * sin(theta);
      offset.z = r * sin(phi);
      d = length(p)-0.05;
      dd = max(dd, d);
      beta += 0.1;
      }
   return dd;
}

float sdBox(vec2 p, vec2 s) {
    p = abs(p) - s;
    return length(max(p, 0.0)) + min(max(p.x, p.y), 0.0);
}

float GetDist(vec3 pos) {
    //p.xz *= Rot(iTime*.1);
    // torus
    float a = atan(pos.x, pos.z);

    float r1 = 1.0;
    float r2 = 0.5;
    // Slice of the torus we are looking at 
    // Revolving a 2d circle 
    vec2 cp = vec2(length(pos.xz)-r1, pos.y);
    vec2 cp2 = cp;
    // multiply angle by whole number get one long knot
    // multiply by non-whole number get interconnected tori
    float p = 5.0;
    float q = 2.0;
    // (3,2) trefoil knot, (5,2) Solomon's seal knot, 
    cp *= Rot(a*(3./2.));  
    cp2 *= Rot(a*(5./2.));  
    cp.y = abs(cp.y)-0.1;
    cp2.y = abs(cp2.y)- 0.1;
   // cp = abs(cp) - 0.5;
    // get two tori by adding & subtraction by a vec2
   // float d = min(length(cp1-vec2(0.0, 0.4)), length(cp1-vec2(0.0, -0.4)))- r2;
    // float d = length(cp- vec2(0.0, 0.0))-0.4;
    // float d2 = length(cp2)-0.1;
   // d = min(d,d2);
   //float d2 = length(cp2- vec2(0.0, 0.0))-r2;
   //d = mix(d,d2, 0.5) - 0.1;
    // create ribbon like efect
    // multiply times sin(a)*0.5 + 0.5 to vary radius of torus 
    float d = sdBox(cp, vec2(0.11, 1.0*(sin(a)*0.5+ 0.5))) - 0.11; // create a ribbon-like effect
    float d2 = sdBox(cp2, vec2(0.049, 1.0*(sin(a)*0.5 + 0.5))) - 0.049; // create a ribbon-like effect
   
    d = mix(d, d2, 0.5);
    //return d*0.7; // adjustment to fix broken distance function
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
    vec3 col = mix(RED, GREEN, 0.8);
    return col;
}

void main()
{
    vec2 uv = (gl_FragCoord.xy - .5*u_resolution.xy)/u_resolution.y;
	vec2 m = iMouse.xy/u_resolution.xy;
    vec3 col = vec3(ORANGE);
    vec3 ro = vec3(0, 3, -3);
    ro.yz *= Rot(-m.y*3.14+1.);
    ro.xz *= Rot(-m.x*6.2831);
    
   // Last parameter--lens of camera
   // Increase to zoom in
    vec3 rd = GetRayDir(uv, ro, vec3(0,0.,0), 1.5); 
    
    //col += Bg(rd);

    float d = RayMarch(ro, rd);

    if(d<MAX_DIST) {
        vec3 p = ro + rd * d;
        vec3 n = GetNormal(p);
        vec3 r = reflect(rd, n);
        
        float spec = pow(max(0.0, r.y), 30.); // add specular highlight
        float dif = dot(n, normalize(vec3(1,2,3)))*.5+.5;
        col = mix(PURPLE, vec3(dif), 0.5)+spec;
    }
    
    col = pow(col, vec3(.4545));	// gamma correction
    
    gl_FragColor = vec4(col,1.0);
}