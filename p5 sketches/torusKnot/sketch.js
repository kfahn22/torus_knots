// Code based on 3D Knot coding challenge
// Coding Train / Daniel Shiffman
// https://thecodingtrain.com/challenges/87-3d-knots
// https://youtu.be/r6YMKr1X0VA
// Javascript transcription: Chuck England

// Code from challenge: https://editor.p5js.org/codingtrain/sketches/fa1rAWng9

// Equation for Torus knots from
// https://home.adelphi.edu/~stemkoski/knotgallery/

// Here are some common parameter settings
// (3,2) = trefoil torus knot,
// (5,2) Cinquefoil/Solomon's torus knot
// (4,3) 
// (11,6) 
// (8,9)
let angle = 0;
let beta = 0;
let vectors = [];
let p = 9;
let q = 8;
let r = 45; // will determine scale of knot
let sc = 3;

function setup() {
    knot = createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
    background('#701616');
    rotateY(angle);
    angle += 0.01;
    // phi and theta for torus knot
    let phi = p * beta;
    let theta = q * beta;
    x = r * cos(theta) * (sc + cos(phi)) ;//- 3*cos((p-q)*phi);
    y = r * sin(theta) * (sc + cos(phi)) ;// - 3*sin((p-q)*phi);
    z = r * sin(phi);
    //z = - sin(phi); //results in a plane
    vectors.push(createVector(x, y, z));

    beta += 0.01;

    noFill();
    strokeWeight(4);
    beginShape();
    for (let i = 0; i < vectors.length; i++) {
        let v = vectors[i];
        let d = v.mag();
        stroke(d, 255, d);
        vertex(v.x, v.y, v.z);
    }
    endShape();
}