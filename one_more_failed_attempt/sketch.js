// This sketch draws a torus knot using a shader.  
// This version is a port of code from The Art of Code tutorial 
// Torus Knots, Explained in ShaderToy

// a shader variable
let myShader;

function preload(){
  // load the shader
  
  myShader = loadShader('shader.vert', 'shader1.frag');
}

function setup() {
  pixelDensity(1);
  // shaders require WEBGL mode to work
  createCanvas(800, 450, WEBGL);
  noStroke();
}

function draw() { 
  background(0);
 
 // let theShader = shaders[3];
  // send resolution of sketch into shader
  myShader.setUniform('u_resolution', [width, height]);
  myShader.setUniform("iMouse", [mouseX, map(mouseY, 0, height, height, 0)]);
  myShader.setUniform("iFrame", frameCount);
  myShader.setUniform("iTime", millis()/1000.);
 
  // shader() sets the active shader with our shader
  shader(myShader);
  // rect gives us some geometry on the screen
  rect(0,0,width, height);
  
}