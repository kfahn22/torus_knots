// This sketch draws a torus knot using a shader.  
// This version is a port of code from The Art of Code tutorial 
// Torus Knots, Explained in ShaderToy

// a shader variable
let theShader;
let shaders = [];

function preload(){
  // load the shader
  shaders[0] = loadShader('shader.vert', 'shader1.frag');
  shaders[1] = loadShader('shader.vert', 'shader2.frag');
  shaders[2] = loadShader('shader.vert', 'shader3.frag');
}

function setup() {
  pixelDensity(1);
  // shaders require WEBGL mode to work
  createCanvas(800, 450, WEBGL);
  noStroke();
}

function draw() {  
  background(0);
  let theShader = shaders[0];
  // send resolution of sketch into shader
  theShader.setUniform('u_resolution', [width, height]);
  theShader.setUniform("iMouse", [mouseX, map(mouseY, 0, height, height, 0)]);
  theShader.setUniform("iFrame", frameCount);
  theShader.setUniform("iTime", millis()/1000.);
 
  
  // shader() sets the active shader with our shader
  shader(theShader);
  //model(cubeObj);
  // rect gives us some geometry on the screen
  rect(0,0,width, height);
  
}