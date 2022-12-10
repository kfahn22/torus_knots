// This sketch draws a "wreath" like shape by intertwining two torus knots
// Based in part on The Art of Code YouTube tutorial Torus Knots, Explained
// Still working on adding decorations to the wreath

// a shader variable
let theShader;
let shaders = [];

function preload(){
  // load the shader
  shaders.push(loadShader('shader.vert', 'shader.frag'));
  shaders.push(loadShader('shader.vert', 'balls.frag'));
}

function setup() {
  pixelDensity(1);
  // shaders require WEBGL mode to work
  createCanvas(800, 450, WEBGL);
  noStroke();
}

function draw() {  
  background(0);
  theShader = shaders[0];
  // send resolution of sketch into shader
  theShader.setUniform('u_resolution', [width, height]);
  theShader.setUniform("iMouse", [mouseX, map(mouseY, 0, height, height, 0)]);
  theShader.setUniform("iFrame", frameCount);
  theShader.setUniform("iTime", millis()/1000.);
 
  // shader() sets the active shader with our shader
  shader(theShader);

  // rect gives us some geometry on the screen
  rect(0,0,width, height);
  
}