// Coding Train / Daniel Shiffman
// https://thecodingtrain.com/challenges/87-3d-knots
// https://youtu.be/r6YMKr1X0VA
// Javascript transcription: Chuck England

// Code from challenge: https://editor.p5js.org/codingtrain/sketches/fa1rAWng9

let angle = 0;
let beta = 0;
let knot;
const l = 30; // determines fineness of lace
const f = 0.05; // deterine tightness of weave
let vectors = [];

function setup() {
    createCanvas(800, 450, WEBGL);
}

function draw() {
    //background('#0B6A88');
    background('#701f2e');
    rotateY(angle);
    angle += 0.03;

    let r = 100 * (0.8 + 1.2 * sin(6.0 * beta));
    let theta = 2 * beta;
    let phi = 0.6 * PI * sin(12 * beta);
    let x = r * cos(phi) * cos(theta);
    let y = r * cos(phi) * sin(theta);
    let z = r * sin(phi);
    //let z = -sin(phi); // results in a plane
    
    vectors.push(createVector(x, y, z));

    //beta += 0.01;
    beta += f + (TWO_PI / l);

    noFill();
    strokeWeight(1);
    beginShape();
    for (let i = 0; i < vectors.length; i++) {
        let v = vectors[i];
        let d = v.mag();
        let m = map(v.mag(), min(d), max(d), 0, 255);
        //console.log(d);
        stroke('#feee8f');
        vertex(v.x, v.y, v.z);
    }
    endShape();
}
