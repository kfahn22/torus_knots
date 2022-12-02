// Code based on 3D Knot coding challenge
// Daniel Shiffman
// https://thecodingtrain.com/challenges/87-3d-knots

// 3D Knot
// Video: https://youtu.be/r6YMKr1X0VA

// Equation for Torus knots from
// https://home.adelphi.edu/~stemkoski/knotgallery/
//(3,2) = trefoil knot,  (5,2) Solomon's knot

let angle = 0;
let beta = 0;
let vectors = [];
let p = 5;
let q = 2;
let r = 45;
function setup() {
    knot = createCanvas(800, 450, WEBGL);
}

function draw() {
    background('#0B6A88');
    //texture(knot);
    rotateY(angle);
    angle += 0.03;
    x = r * cos(q * beta) * (3 + cos(p * beta));
    y = r * sin(q * beta) * (3 + cos(p * beta))
    z = r * sin(p * beta);
    vectors.push(createVector(x, y, z));

    beta += 0.01;

    noFill();
    //stroke(255);
    strokeWeight(8);
    beginShape();
    for (let i = 0; i < vectors.length; i++) {
        let v = vectors[i];
        let d = v.mag();
        stroke(255, d, 255);
        vertex(v.x, v.y, v.z);
    }
    endShape();
}