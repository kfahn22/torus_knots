// Code based on 3D Knot coding challenge
// Coding Train / Daniel Shiffman
// https://thecodingtrain.com/challenges/87-3d-knots
// https://youtu.be/r6YMKr1X0VA
// Javascript transcription: Chuck England

// Code from challenge: https://editor.p5js.org/codingtrain/sketches/fa1rAWng9

// Equation for Torus knots from
// https://home.adelphi.edu/~stemkoski/knotgallery/

// Attempt at object oriented approach not working 
// Note that it is not easy to intuitively figure out how changing 
// parameters to translate functions affect orbit of torus
// Torus can easily end up offscreen


let angle = 0;
let beta = 0;
let knot;
let p = 9;
let q = 8;
let r = 50; // will determine scale of knot
let h = 2;
let x, y;
let ox = 50; // as ox increases height/radius of orbit increases 
let oy = 0.3; // affects y position of orbit

function setup() {
    createCanvas(400, 400, WEBGL);
    // 
    let x = width*oy; 
    let y = height*oy; 
    r = 6;
    knot = new TorusKnot(x, y, p, q, r, h);
    //heart = new Heart4(x, y, 50);
}

function draw() {
    background('#701616');
    rotateY(angle);

    // translate will determine orbit of torus
    translate(ox, -ox);
    
    knot.oneKnot();
    knot.show();
    angle += 0.01;
}