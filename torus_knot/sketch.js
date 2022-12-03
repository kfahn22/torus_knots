// This sketch draws a torus knot using a shader.  
// This version is a port of code from The Art of Code tutorial 
// Torus Knots, Explained in ShaderToy

// a shader variable
let theShader;
let oldTime;
let shaderNdx = 0;
const shaders = [];

function preload(){
  // load the shader
  img = loadImage('ice.jpeg');
  shaders.push(loadShader('shader.vert', 'shader1.frag'));
  shaders.push(loadShader('shader.vert', 'shader2.frag'));
  shaders.push(loadShader('shader.vert', 'shader3.frag'));
  shaders.push(loadShader('shader.vert', 'shader3.frag'));
  theShader = shaders[0]; // start with the first shader
}

function setup() {
  pixelDensity(1);
  // shaders require WEBGL mode to work
  createCanvas(800, 450, WEBGL);
  noStroke();
}

function draw() { 
  background(0);
  let time = performance.now() / 1000 | 0; // convert to seconds
  if (oldTime !== time) {
    oldTime = time;
    // increment shader index to the next shader but wrap around 
    // back to 0 at then of the array of shaders
    shaderNdx = (shaderNdx + 1) % shaders.length;
    theShader = shaders[shaderNdx]
  }
 
  
 // let theShader = shaders[3];
  // send resolution of sketch into shader
  theShader.setUniform('u_resolution', [width, height]);
  theShader.setUniform("iMouse", [mouseX, map(mouseY, 0, height, height, 0)]);
  theShader.setUniform("iFrame", frameCount);
  theShader.setUniform("iTime", millis()/1000.);
  theShader.setUniform("utex0", img);
 
  // shader() sets the active shader with our shader
  shader(theShader);
  // rect gives us some geometry on the screen
  rect(0,0,width, height);
  
}