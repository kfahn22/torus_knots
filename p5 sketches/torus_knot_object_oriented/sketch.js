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
let knots = [];
let p = 9;
let q = 8;
let r = 50; // will determine scale of knot
let h = 2;
let x, y;
let ox = 50; // as ox increases height/radius of orbit increases 
let oy = 0.3; // affects y position of orbit

function setup() {
    createCanvas(400, 400, WEBGL);
    colorMode(HSB, 1, 1, 1, 1);
    angleMode(DEGREES);
    blendMode();

    //r = 6;
    for (i = 0; i < 10; i++) {
        oy = 0.01 * random(i);
        x = width * oy;
        y = height * oy;
        r = 4 * i;
        let c = i; 
        knots.push(new TorusKnot(x, y, p, q, r, h, c));
    }
    //heart = new Heart4(x, y, 50);
}

function draw() {
    background(0);


    // translate will determine orbit of torus
   // translate(ox, -ox);
    for (let i = 0; i < knots.length; i++) {
        rotateY(angle + i/90);
        knots[i].oneKnot();
        knots[i].show();
    }
    angle += 1;
}