// Code based on 3D Knot coding challenge
// Coding Train / Daniel Shiffman
// https://thecodingtrain.com/challenges/87-3d-knots
// https://youtu.be/r6YMKr1X0VA
// Javascript transcription: Chuck England

// Code from challenge: https://editor.p5js.org/codingtrain/sketches/fa1rAWng9

// Equation for Torus knots from
// https://home.adelphi.edu/~stemkoski/knotgallery/


let angle = 0;
let beta = 0;
let knots = [];
let p = 9;
let q = 8;
let r = 5; // will determine scale of knot
let h = 2;

function setup() {
    createCanvas(600, 600, WEBGL);
    knots.push(new TorusKnot(p, q, r, h));
}

function draw() {
    background('#701f2e');
    translate(width / 2, height / 2);
    rotateY(angle);
    angle += 0.01;
    knots[0].knot();
    knots[0].show(angle);


}