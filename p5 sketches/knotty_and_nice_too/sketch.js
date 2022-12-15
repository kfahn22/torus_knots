// Code based on 3D Knot coding challenge
// Coding Train / Daniel Shiffman
// https://thecodingtrain.com/challenges/87-3d-knots
// https://youtu.be/r6YMKr1X0VA
// Javascript transcription: Chuck England

// Code from challenge: https://editor.p5js.org/codingtrain/sketches/fa1rAWng9

// Equation for Torus knots from
// https://home.adelphi.edu/~stemkoski/knotgallery/

// https://github.com/davepagurek/p5.Framebuffer

// Adjusting p & q don't affect rendering so no longer truely a torus knot?

let angle = 0;
let beta = 0;
let knots = [];
let p = 9;
let q = 8;
let r; // will determine scale of knot
let h = 4;
let x, y;
let num = 30;
let adj;
let ox = 50; // as ox increases height/radius of orbit increases 
let oy = 0.3; // affects y position of orbit
let blurRenderer;
let colorOptions1 = ['#9ad5ca', '#acdde7', '#3adb9e3', '#a379c9'];
let colorOptions2 = ['#caf7e2', '#58b09c', '#386150', '#4a442d'];
let colorOptions3 = ['#fdfffc', '#caf7e2', '#58b09c', '#386150'];
let colorOptions4 = ['#054a29', '#137547', '#2a9134', '#3fa34d'];
let colorOptions5 = [
    [239,45,86],
    [237,125,58],
    [140,216,103],
    [47,191,113], //#363537 for bakckground
]
let colorOptions6 = [
    [232,215,241],
    [211,188,204],
    [161,103,165],
    [74,48,109],
    [14,39,60]
]

function setup() {
    createCanvas(400, 400, WEBGL);
    angleMode(DEGREES);
    //https://p5js.org/reference/#/p5/blendMode
    blendMode(BLEND);
    
    //lights();
    // There's a bug in Firefox where you can only make floating point textures
    // if they're RGBA, and it breaks if it's just RGB
    //blurRenderer = createGaussianBlurRenderer()
    blurRenderer = createBlurRenderer();
    blurRenderer.setIntensity(0.15);
    blurRenderer.setSamples(10);
    blurRenderer.setDof(40);
    
    for (i = 0; i < num; i++) {
        oy = 0.01 * random(i);
        adj = 0.895; 
        r = i * (1-adj); // for spheres
        //r = i; // for torus knots
        //r = i*0.2; //.25
        let mr = map(r, 0, num, height/2, 2*r);
        x = 0;
        y = mr;
        let c = colorOptions6[i % 4];
        knots.push(new TorusKnot(x, y, p, q, r, h, c));
    }
}

function draw() {
   //translate(0, -height/2, 0); // for regular torus knot
   translate(0, -height*adj, 0); // for spheres
    blurRenderer.draw(() => {
        clear();
        push();
        background(colorOptions6[4]); // colorOptions5
        noStroke();
        push();
        translate(0,-height/4,0);
        blurRenderer.focusHere();
        pop();
        push();
        for (let i = 0; i < knots.length; i++) {
            rotateY(angle + i / 90);
            knots[i].oneKnot();
            // use .show() for regular torusknot or .showSphere() for spheres 
            //knots[i].show();
            knots[i].showSphere();
            angle += 0.01;
        }
        pop();
        pop();
    })
    translate(0,height/2,0);
    noStroke();
    fill(47,191,113);
    //sphere(5);
}