// This sketch draws a "wreath" like shape by intertwining two torus knots
// Based in part on The Art of Code YouTube tutorial Torus Knots, Explained
// Still working on adding decorations to the wreath

// a shader variable
let theShader;
let shaders = [];

function preload(){
  // load the shader
  shaders.push(loadShader('shader.vert', 'shader1.frag'));
  shaders.push(loadShader('shader.vert', 'shader2.frag'));
  theShader = shaders[0];
}

function setup() {
  pixelDensity(1);
  // shaders require WEBGL mode to work
  createCanvas(400, 400, WEBGL);
  buffer = createGraphics(400, 400, WEBGL);
  current = createGraphics(400, 400, WEBGL);
  img = createImage(400, 400);
  img.loadPixels();
  for (let i = 0; i < img.pixels.length; i += 4) {
      let val = 0;
     // if (random(1) < 0.01) val = 255;
      img.pixels[i + 0] = 0;
      img.pixels[i + 1] = 0;
      img.pixels[i + 2] = 0;
      img.pixels[i + 3] = 255;
  }
  img.updatePixels();
  noStroke();
}

function draw() {  
  background(0);

  // send resolution of sketch into shader
  theShader.setUniform('u_resolution', [width, height]);
  theShader.setUniform("iMouse", [mouseX, map(mouseY, 0, height, height, 0)]);
  theShader.setUniform("iFrame", frameCount);
  theShader.setUniform("iTime", millis()/1000.);
 
  // shader() sets the active shader with our shader
  shader(theShader);
 
  // rect gives us some geometry on the screen
  rect(-width,-height,width, height);
  
}